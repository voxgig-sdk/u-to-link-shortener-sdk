-- UToLinkShortener SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UToLinkShortener",
      slug = "u-to-link-shortener",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://u.to/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["link_shortening"] = {},
      },
    },
    entity = {
      ["link_shortening"] = {
        ["fields"] = {
          {
            ["format"] = "uri",
            ["name"] = "original_url",
            ["short"] = "The original URL that was shortened",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "short_link",
            ["short"] = "The shortened URL",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "uri",
            ["name"] = "url",
            ["req"] = true,
            ["short"] = "The URL to be shortened",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "link_shortening",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/shorten/",
                ["segments"] = {
                  {
                    ["lit"] = "shorten",
                  },
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "shorten",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
