import { Context } from './Context';
declare class UToLinkShortenerError extends Error {
    isUToLinkShortenerError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { UToLinkShortenerError };
