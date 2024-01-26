/**
 *
 * @param slugStr name of slug creation document
 * @param collection database collection name
 * @returns
 */
export declare const generateSlug: (slugStr: string, collection: string, count?: number) => Promise<string>;
