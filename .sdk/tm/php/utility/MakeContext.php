<?php
declare(strict_types=1);

// UToLinkShortener SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UToLinkShortenerMakeContext
{
    public static function call(array $ctxmap, ?UToLinkShortenerContext $basectx): UToLinkShortenerContext
    {
        return new UToLinkShortenerContext($ctxmap, $basectx);
    }
}
