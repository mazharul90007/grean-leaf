import type { NextFunction, Request, Response } from "express";
declare const auth: (...roles: string[]) => (req: Request & {
    user?: any;
}, res: Response, next: NextFunction) => Promise<void>;
export default auth;
//# sourceMappingURL=auth.d.ts.map