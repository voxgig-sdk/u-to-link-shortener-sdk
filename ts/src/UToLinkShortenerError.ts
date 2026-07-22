
import { Context } from './Context'


class UToLinkShortenerError extends Error {

  isUToLinkShortenerError = true

  sdk = 'UToLinkShortener'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UToLinkShortenerError
}

