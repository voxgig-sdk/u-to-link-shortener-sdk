export interface LinkShortening {
    original_url?: string;
    short_link?: string;
    url: string;
}
export interface LinkShorteningCreateData {
    url: string;
}
