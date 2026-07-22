
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UToLinkShortenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UToLinkShortenerSDK.test()
    equal(null !== testsdk, true)
  })

})
