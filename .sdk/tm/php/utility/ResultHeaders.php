<?php
declare(strict_types=1);

// UToLinkShortener SDK utility: result_headers

class UToLinkShortenerResultHeaders
{
    public static function call(UToLinkShortenerContext $ctx): ?UToLinkShortenerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
