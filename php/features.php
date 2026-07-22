<?php
declare(strict_types=1);

// UToLinkShortener SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UToLinkShortenerFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UToLinkShortenerBaseFeature();
            case "test":
                return new UToLinkShortenerTestFeature();
            default:
                return new UToLinkShortenerBaseFeature();
        }
    }
}
