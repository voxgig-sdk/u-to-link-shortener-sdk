# UToLinkShortener SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "UToLinkShortener",
            "slug": "u-to-link-shortener",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://u.to/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "link_shortening": {},
            },
        },
        "entity": {
      "link_shortening": {
        "fields": [
          {
            "format": "uri",
            "name": "original_url",
            "short": "The original URL that was shortened",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "short_link",
            "short": "The shortened URL",
            "type": "`$STRING`",
          },
          {
            "format": "uri",
            "name": "url",
            "req": True,
            "short": "The URL to be shortened",
            "type": "`$STRING`",
          },
        ],
        "name": "link_shortening",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "POST",
                "orig": "/shorten/",
                "segments": [
                  {
                    "lit": "shorten",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "shorten",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
