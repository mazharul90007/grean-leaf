export declare const authServices: {
    loginUser: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
        needPasswordChange: boolean;
    }>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
        needPasswordChange: boolean;
    }>;
    changePassword: (user: any, payload: any) => Promise<{
        message: string;
    }>;
    forgetPassword: (payload: {
        email: string;
    }) => Promise<void>;
    resetPassword: (token: string, payload: {
        email: "string";
        password: string;
    }) => Promise<void>;
};
//# sourceMappingURL=auth.service.d.ts.map