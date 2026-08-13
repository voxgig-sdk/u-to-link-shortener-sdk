# UToLinkShortener SDK configuration

module UToLinkShortenerConfig
  def self.make_config
    {
      "main" => {
        "name" => "UToLinkShortener",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://u.to/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "link_shortening" => {},
        },
      },
      "entity" => {
        "link_shortening" => {
          "fields" => [
            {
              "active" => true,
              "name" => "original_url",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "short_link",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "url",
              "req" => true,
              "type" => "`$STRING`",
              "index$" => 2,
            },
          ],
          "name" => "link_shortening",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/shorten/",
                  "parts" => [
                    "shorten",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    UToLinkShortenerFeatures.make_feature(name)
  end
end
