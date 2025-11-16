# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling & commands

### Dependency installation

- Use a single package manager consistently.
- The repo includes both `package-lock.json` and `pnpm-lock.yaml`; prefer one flow and stick to it:
  - Using npm: `npm install`
  - Using pnpm: `pnpm install`

### Local development

- Start the TypeScript dev server (via `tsx`):
  - `npm run dev`
- This runs `src/server.ts`, which bootstraps the Express app defined in `src/app.ts`.

### Build & run

- Build TypeScript to JavaScript (outputs to `dist/`):
  - `npm run build`
- Run the compiled server from `dist/server.js`:
  - `npm start`

### Prisma & database

- Prisma is configured via `prisma.config.ts` with schema at `prisma/schema.prisma` and migrations under `prisma/migrations/`.
- Environment variable `DATABASE_URL` (from `.env`) controls the datasource connection.
- Common Prisma CLI usage from this repo root (adjust subcommands as needed):
  - Run migrations in dev: `npx prisma migrate dev`
  - Inspect DB visually: `npx prisma studio`

### Tests & linting

- There is currently no real test setup; the `test` script is a placeholder that exits with an error:
  - `npm test`
- No explicit linting or formatting scripts/configuration are defined in this repo yet.

### Environment configuration

Configuration is centralized in `src/app/config/index.ts` and loaded from `.env` using `dotenv`:

- Server:
  - `PORT`, `NODE_ENV`
- JWT/auth:
  - `JWT_SECRET`, `EXPIRES_IN`
  - `REFRESH_TOKEN_SECRET`, `REFRESH_TOKEN_SECRET_EXPIRES_IN`
  - `RESET_PASS_TOKEN`, `RESET_PASS_TOKEN_EXPIRES_IN`
  - `RESET_PASS_LINK` (base URL used in password reset emails)
- Email (Nodemailer):
  - `EMAIL`, `APP_PASS` (Gmail-style app password)
- Cloudinary:
  - `CLOUDINARY_API`, `CLOUDINARY_SECRET`

The server will not function correctly without these values being set.

## High-level architecture

### Entry points & HTTP stack

- Runtime entry: `src/server.ts`
  - Loads config from `src/app/config/index.ts`.
  - Starts an HTTP server on `config.port || 3000` using the Express app.
- Express app composition: `src/app.ts`
  - Creates the `express()` application.
  - Global middleware:
    - `cors()`
    - `cookieParser()`
    - `express.json()` and `express.urlencoded({ extended: true })`
  - Health/root route: `GET /` → simple text: "Green Leaf is running".
  - Mounts versioned API router at `/api/v1` using `src/app/routes/index.ts`.
  - Attaches `globalErrorHandler` as the last error-handling middleware.
  - Adds a final 404 handler that returns a standardized JSON "API NOT FOUND" response.

### Routing & module organization

- Aggregated routing: `src/app/routes/index.ts`
  - Creates a shared router and mounts module routers under:
    - `/user` → `UserRoutes`
    - `/admin` → `AdminRoutes`
    - `/auth` → `AuthRoutes`
    - `/specialties` → `SpecialtiesRoutes`
    - `/doctors` → `DoctorRoutes`
- Each domain/module follows a conventional structure under `src/app/modules/<Domain>/` (e.g. `User`, `Admin`, `Doctor`, `Specialties`, `Auth`):
  - `*.routes.ts` — Express routes, wiring:
    - HTTP verbs + paths
    - `auth` middleware (role-based access control using `UserRole` from Prisma)
    - `validateRequest` (Zod-based request validation) where applicable
    - Controller handlers
  - `*.controller.ts` — HTTP-facing logic:
    - Reads `req` (including `req.user` from auth middleware and pagination/filter query params).
    - Delegates work to the corresponding service.
    - Uses `catchAsync` to centralize async error propagation.
    - Uses `sendResponse` to shape consistent JSON responses (status, message, optional `meta`, `data`).
  - `*.service.ts` — business/data access logic:
    - Uses the shared Prisma client (`src/shared/prisma.ts`) to read/write the database.
    - Encapsulates transactions for multi-table operations (e.g., creating user + admin/doctor/patient; soft deletes that also update related `user` records).
    - Implements search and pagination using helpers (`paginationHelpers`, module-specific `*SearchAbleFields`).
  - `*.validation.ts` & `*.constant.ts` / `*.constants.ts` — zod schemas and module-specific constants, such as allowed filter/search fields.
  - `*.interface.ts` — TypeScript interfaces describing filter payloads and other module-level contracts.

This results in a clear separation: **routes → controllers → services → Prisma DB access**, with cross-cutting concerns in helpers and middlewares.

### Shared utilities & helpers

- `src/app/middlewares/`
  - `auth.ts`
    - Factory `auth(...roles: string[])` that verifies JWT from `Authorization` header via `jwtHelpers.verifyToken`.
    - Attaches the decoded user payload to `req.user`.
    - Enforces role-based authorization; throws `ApiError` with `UNAUTHORIZED`/`FORBIDDEN` as appropriate.
  - `validateRequest.ts`
    - Zod-based request validator: given a schema, parses `req.body` and forwards or passes validation errors to the error handler.
  - `globalErrorHandler.ts`
    - Central error middleware that returns a generic 500 JSON response with `success: false`, a message, and the raw error.
- `src/app/errors/ApiErrors.ts`
  - Custom `ApiError` extends `Error` with an HTTP `statusCode`, used by middlewares/services for controlled failures.
- `src/app/config/index.ts`
  - Loads `.env` values (via `dotenv` + `path`) and exposes a typed config object for JWT, email, Cloudinary, and port.
- `src/app/utils/emailSender.ts`
  - Nodemailer-based email transport using the configured email credentials.
  - Intended for password reset and similar flows; used by `auth.service` when sending reset links.

- `src/helpers/`
  - `jwtHelper.ts`
    - `generateToken(payload, secret, expiresIn)` wraps `jwt.sign`.
    - `verifyToken(token, secret)` wraps `jwt.verify` and returns a `JwtPayload`.
    - Used by auth flows (login, refresh, password reset) and authorization middleware.
  - `paginationHelpers.ts`
    - Computes `page`, `limit`, `skip`, `sortBy`, `sortOrder` from query options.
    - Shared across services to provide consistent pagination & sorting.
  - `fileUpload.ts`
    - Configures a `multer` disk storage to an `uploads/` directory.
    - Provides `upload` middleware for file uploads.
    - Provides `uploadToCloudinary(file)` which:
      - Configures Cloudinary via `config.cloudinary`.
      - Uploads the file and then removes it from disk.
    - `fileUploadrer` (export) is used by user-related services to upload profile photos and attach Cloudinary URLs into the request payload before persistence.

- `src/shared/`
  - `prisma.ts`
    - Instantiates and exports a singleton `PrismaClient` for use throughout services.
  - `catchAsync.ts`
    - Higher-order wrapper for async Express handlers that forwards thrown errors to `next`.
  - `sendResponse.ts`
    - Standardizes JSON response structure (`success`, `message`, optional `meta`, `data`).
  - `pick.ts`
    - Utility to pick allowed keys from an object; controllers use this to extract filter/pagination parameters from `req.query`.

### Authentication & authorization flow

- Login, refresh, and password management are handled in the `Auth` module:
  - `auth.controller.ts`:
    - `loginUser` reads credentials, calls `authServices.loginUser`, sets the `refreshToken` cookie, and returns `accessToken` + `needPasswordChange`.
    - `refreshToken` reads `refreshToken` from cookies and returns a new access token and associated flags.
    - `changePassword`, `forgetPassword`, `resetPassword` orchestrate the various password flows.
  - `auth.service.ts`:
    - Uses Prisma to verify user existence and `UserStatus.ACTIVE`.
    - Compares passwords with `bcrypt`.
    - Issues JWTs via `jwtHelpers` using secrets from `config.jwt`.
    - Sends password reset emails using `emailSender` and `config.reset_pass_link`.

- Protected routes in other modules depend on the `auth` middleware to populate `req.user` and to enforce role-based access, then services such as `userService.getMyProfile` and `userService.updateMyProfile` use that identity to fetch/update the appropriate records.

### Data model & Prisma usage

- Prisma models (see `prisma/schema.prisma`) represent core domain entities such as `User`, `Admin`, `Doctor`, `Patient`, and `Specialties`.
- Services commonly:
  - Use `prisma.$transaction` to keep user + domain-specific records in sync (e.g., creating an `Admin` also creates a `User` record with `UserRole.ADMIN`).
  - Implement soft-delete patterns (e.g., `AdminService.softDeleteFromDb` marks `admin.isDeleted` and updates corresponding `user.status`).
  - Filter and search using `Prisma.WhereInput` conditions built from query parameters and module-specific search fields.

This architecture is designed so future changes typically involve updating or adding a module (routes/controller/service/validation) while reusing shared infrastructure for configuration, database access, authentication, validation, and error handling.
