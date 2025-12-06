type IOptions = {
    page?: number;
    limit?: number;
    sortOrder?: string | undefined;
    sortBy?: string | undefined;
};
type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
};
declare const calculatePagination: (options: IOptions) => IOptionsResult;
export default calculatePagination;
//# sourceMappingURL=paginationHelpers.d.ts.map