export declare class ApiFeatures {
    query: any;
    queryString: any;
    constructor(query: any, queryString: any);
    filtering(): this;
    pagination(): this;
    fieldsLimiting(): this;
    sorting(defaultSort: string): this;
    searching(fields: string[]): this;
    getCount(): this;
}
