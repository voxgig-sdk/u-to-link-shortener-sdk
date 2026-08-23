<?php
declare(strict_types=1);

// UToLinkShortener SDK configuration

class UToLinkShortenerConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "UToLinkShortener",
                "slug" => "u-to-link-shortener",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://u.to/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "link_shortening" => [],
                ],
            ],
            "entity" => [
        'link_shortening' => [
          'fields' => [
            [
              'name' => 'original_url',
              'short' => 'The original URL that was shortened',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'short_link',
              'short' => 'The shortened URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'req' => true,
              'short' => 'The URL to be shortened',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'link_shortening',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/shorten/',
                  'parts' => [
                    'shorten',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return UToLinkShortenerFeatures::make_feature($name);
    }
}
