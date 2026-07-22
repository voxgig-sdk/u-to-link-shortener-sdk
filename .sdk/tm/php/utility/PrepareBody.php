<?php
declare(strict_types=1);

// UToLinkShortener SDK utility: prepare_body

class UToLinkShortenerPrepareBody
{
    public static function call(UToLinkShortenerContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
