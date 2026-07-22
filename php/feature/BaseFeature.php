<?php
declare(strict_types=1);

// UToLinkShortener SDK base feature

class UToLinkShortenerBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UToLinkShortenerContext $ctx, array $options): void {}
    public function PostConstruct(UToLinkShortenerContext $ctx): void {}
    public function PostConstructEntity(UToLinkShortenerContext $ctx): void {}
    public function SetData(UToLinkShortenerContext $ctx): void {}
    public function GetData(UToLinkShortenerContext $ctx): void {}
    public function GetMatch(UToLinkShortenerContext $ctx): void {}
    public function SetMatch(UToLinkShortenerContext $ctx): void {}
    public function PrePoint(UToLinkShortenerContext $ctx): void {}
    public function PreSpec(UToLinkShortenerContext $ctx): void {}
    public function PreRequest(UToLinkShortenerContext $ctx): void {}
    public function PreResponse(UToLinkShortenerContext $ctx): void {}
    public function PreResult(UToLinkShortenerContext $ctx): void {}
    public function PreDone(UToLinkShortenerContext $ctx): void {}
    public function PreUnexpected(UToLinkShortenerContext $ctx): void {}
}
