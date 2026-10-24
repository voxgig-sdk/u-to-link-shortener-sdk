import { LinkShorteningEntity } from './entity/LinkShorteningEntity';
export type * from './UToLinkShortenerTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { UToLinkShortenerEntityBase } from './UToLinkShortenerEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class UToLinkShortenerSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    LinkShortening(entopts?: Record<string, any>): LinkShorteningEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): UToLinkShortenerSDK;
    tester(testopts?: any, sdkopts?: any): UToLinkShortenerSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof UToLinkShortenerSDK;
export { stdutil, config, BaseFeature, UToLinkShortenerEntityBase, UToLinkShortenerSDK, SDK, };
export type { DirectResult };
