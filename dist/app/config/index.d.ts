import type { Secret } from "jsonwebtoken";
declare const _default: {
    env: string | undefined;
    port: string | undefined;
    jwt: {
        jwt_secret: Secret;
        expires_in: unknown;
        refresh_token_secret: Secret;
        refresh_token_expires_in: unknown;
        reset_pass_secret: Secret;
        reset_pass_secret_expires_in: unknown;
    };
    reset_pass_link: string | undefined;
    emailSender: {
        email: string | undefined;
        app_pass: string | undefined;
    };
    cloudinary: {
        cloudinary_api: string;
        cloudinary_secret: string;
    };
    ssl: {
        storeId: string | undefined;
        storePass: string | undefined;
        successUrl: string | undefined;
        cancelUrl: string | undefined;
        failUrl: string | undefined;
        sslPaymentApi: string;
        sslValidationApi: string | undefined;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map