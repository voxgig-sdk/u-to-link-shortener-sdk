// Typed models for the UToLinkShortener SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface LinkShortening {
  original_url?: string
  short_link?: string
  url: string
}

export interface LinkShorteningCreateData {
  original_url?: string
  short_link?: string
  url: string
}

