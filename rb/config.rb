# UToLinkShortener SDK configuration

module UToLinkShortenerConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "UToLinkShortener",
        "slug" => "u-to-link-shortener",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
          "transport" => "base",
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
              "name" => "original_url",
              "short" => "The original URL that was shortened",
              "type" => "`$STRING`",
            },
            {
              "name" => "short_link",
              "short" => "The shortened URL",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "req" => true,
              "short" => "The URL to be shortened",
              "type" => "`$STRING`",
            },
          ],
          "name" => "link_shortening",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
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
                },
              ],
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
