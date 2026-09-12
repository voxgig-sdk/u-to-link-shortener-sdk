import { UToLinkShortenerEntityBase } from '../UToLinkShortenerEntityBase';
import type { UToLinkShortenerSDK } from '../UToLinkShortenerSDK';
import type { Control } from '../types';
import type { LinkShortening, LinkShorteningCreateData } from '../UToLinkShortenerTypes';
declare class LinkShorteningEntity extends UToLinkShortenerEntityBase<LinkShortening> {
    constructor(client: UToLinkShortenerSDK, entopts: any);
    make(this: LinkShorteningEntity): LinkShorteningEntity;
    create(this: any, reqdata?: LinkShorteningCreateData, ctrl?: Control): Promise<LinkShorteningEntity>;
}
export { LinkShorteningEntity };
