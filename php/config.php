<?php
declare(strict_types=1);

// UToLinkShortener SDK configuration

class UToLinkShortenerConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "UToLinkShortener",
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
              'active' => true,
              'name' => 'original_url',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'short_link',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'url',
              'req' => true,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
          ],
          'name' => 'link_shortening',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'active' => true,
                  'args' => [],
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
                  'index$' => 0,
                ],
              ],
              'key$' => 'create',
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
