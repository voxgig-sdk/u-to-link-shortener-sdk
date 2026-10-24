# UToLinkShortener SDK utility: prepare_body
require_relative 'media'
module UToLinkShortenerUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return UToLinkShortenerUtilities.raw_body(ctx.reqdata) if UToLinkShortenerUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
