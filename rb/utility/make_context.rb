# UToLinkShortener SDK utility: make_context
require_relative '../core/context'
module UToLinkShortenerUtilities
  MakeContext = ->(ctxmap, basectx) {
    UToLinkShortenerContext.new(ctxmap, basectx)
  }
end
