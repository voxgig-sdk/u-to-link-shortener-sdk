-- UToLinkShortener SDK error

local UToLinkShortenerError = {}
UToLinkShortenerError.__index = UToLinkShortenerError


function UToLinkShortenerError.new(code, msg, ctx)
  local self = setmetatable({}, UToLinkShortenerError)
  self.is_sdk_error = true
  self.sdk = "UToLinkShortener"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UToLinkShortenerError:error()
  return self.msg
end


function UToLinkShortenerError:__tostring()
  return self.msg
end


return UToLinkShortenerError
