
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UToLinkShortenerSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = UToLinkShortenerSDK.test()
    equal(testsdk instanceof UToLinkShortenerSDK, true,
      'UToLinkShortenerSDK.test() must return a client synchronously')
  })

})
