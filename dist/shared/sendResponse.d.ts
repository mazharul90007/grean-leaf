import type { Response } from "express";
declare const sendResponse: <T>(res: Response, jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
        page: number;
        limit: number;
        total: number;
    };
    data: T | null | undefined;
}) => void;
export default sendResponse;
//# sourceMappingURL=sendResponse.d.ts.map