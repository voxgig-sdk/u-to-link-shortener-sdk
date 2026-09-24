

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UToLinkShortenerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('LinkShorteningEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when U_TO_LINK_SHORTENER_TEST_LIVE=TRUE.
  afterEach(liveDelay('U_TO_LINK_SHORTENER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UToLinkShortenerSDK.test()
    const ent = testsdk.LinkShortening()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.U_TO_LINK_SHORTENER_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'link_shortening.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"original_url":{"a":true,"fo":"uri","h":"Original Url","n":"original_url","r":false,"sh":"The original URL that was shortened","t":"`$STRING`","key$":"original_url","index$":0},"short_link":{"a":true,"fo":"uri","h":"Short Link","n":"short_link","r":false,"sh":"The shortened URL","t":"`$STRING`","key$":"short_link","index$":1},"url":{"a":true,"fo":"uri","h":"Url","n":"url","r":true,"sh":"The URL to be shortened","t":"`$STRING`","key$":"url","index$":2}},"name":"link_shortening","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /shorten/","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/shorten/","q":{},"r":{},"s":[{"lit":"shorten"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"link_shortening","name__orig":"link_shortening","Name":"LinkShortening","name_":"link_shortening","name-":"link-shortening","NAME":"LINK_SHORTENING","index$":0}, {"active":true,"entity":"link_shortening","key$":"BasicLinkShorteningFlow","kind":"basic","name":"BasicLinkShorteningFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"link_shortening_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'LinkShortening', {"POST /shorten/":{"protocol":"http","operationId":"getShortenedLink","requestBody":{"required":true,"content":{"application/json":{"schema":{"type":"object","required":["url"],"properties":{"url":{"type":"string","format":"uri","description":"The URL to be shortened","example":"http://tvs.tv","key$":"url"}},"index$":1},"examples":{"basic":{"summary":"Basic URL shortening","value":{"url":"http://tvs.tv"}}}}}},"responses":{"200":{"description":"Successfully shortened the URL","content":{"application/json":{"schema":{"type":"object","properties":{"short_link":{"type":"string","format":"uri","description":"The shortened URL","example":"https://u.to/abc123","key$":"short_link"},"original_url":{"type":"string","format":"uri","description":"The original URL that was shortened","example":"http://tvs.tv","key$":"original_url"}},"index$":0},"examples":{"success":{"summary":"Successful shortening","value":{"short_link":"https://u.to/abc123","original_url":"http://tvs.tv"}}}}}},"400":{"description":"Bad request - invalid URL provided","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Invalid URL format"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message","example":"Server error occurred"}}}}}}},"parameters":[],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const link_shortening_ref01_ent = client.LinkShortening()
    let link_shortening_ref01_data = setup.data.new.link_shortening['link_shortening_ref01']

    link_shortening_ref01_data = (await link_shortening_ref01_ent.create(link_shortening_ref01_data)).data()
    assert(null != link_shortening_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/link_shortening/LinkShorteningTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UToLinkShortenerSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['link_shortening01','link_shortening02','link_shortening03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID': idmap,
    'U_TO_LINK_SHORTENER_TEST_LIVE': 'FALSE',
    'U_TO_LINK_SHORTENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID']

  const live = 'TRUE' === env.U_TO_LINK_SHORTENER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UToLinkShortenerSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.U_TO_LINK_SHORTENER_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
