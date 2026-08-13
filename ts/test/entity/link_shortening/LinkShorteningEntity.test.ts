
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { UToLinkShortenerSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


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
      if (maybeSkipControl(t, 'entityOp', 'link_shortening.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID JSON to run live')
      return
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID': idmap,
    'U_TO_LINK_SHORTENER_TEST_LIVE': 'FALSE',
    'U_TO_LINK_SHORTENER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID']

  const live = 'TRUE' === env.U_TO_LINK_SHORTENER_TEST_LIVE

  if (live) {
    client = new UToLinkShortenerSDK(merge([
      {
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
