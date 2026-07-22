<?php
declare(strict_types=1);

// Typed models for the UToLinkShortener SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** LinkShortening entity data model. */
class LinkShortening
{
    public ?string $original_url = null;
    public ?string $short_link = null;
    public string $url;
}

/** Request payload for LinkShortening#create. */
class LinkShorteningCreateData
{
    public ?string $original_url = null;
    public ?string $short_link = null;
    public string $url;
}

