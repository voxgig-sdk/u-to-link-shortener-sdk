<?php
declare(strict_types=1);

// UToLinkShortener SDK utility: result_body

class UToLinkShortenerResultBody
{
    public static function call(UToLinkShortenerContext $ctx): ?UToLinkShortenerResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
