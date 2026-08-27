
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'UToLinkShortener',
        slug: "u-to-link-shortener",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://u.to/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      link_shortening: {
      },

    }
  }


  entity = {
    "link_shortening": {
      "fields": [
        {
          "name": "original_url",
          "short": "The original URL that was shortened",
          "type": "`$STRING`"
        },
        {
          "name": "short_link",
          "short": "The shortened URL",
          "type": "`$STRING`"
        },
        {
          "name": "url",
          "req": true,
          "short": "The URL to be shortened",
          "type": "`$STRING`"
        }
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
              "parts": [
                "shorten"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

