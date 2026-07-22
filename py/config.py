# UToLinkShortener SDK configuration


def make_config():
    return {
        "main": {
            "name": "UToLinkShortener",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "active": True,
            "name": "original_url",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "short_link",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "url",
            "req": True,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "link_shortening",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/shorten/",
                "parts": [
                  "shorten",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
