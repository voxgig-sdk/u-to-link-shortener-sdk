# UToLinkShortener SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UToLinkShortenerFeatures
  def self.make_feature(name)
    case name
    when "base"
      UToLinkShortenerBaseFeature.new
    when "ratelimit"
      UToLinkShortenerRatelimitFeature.new
    when "retry"
      UToLinkShortenerRetryFeature.new
    when "test"
      UToLinkShortenerTestFeature.new
    when "timeout"
      UToLinkShortenerTimeoutFeature.new
    else
      UToLinkShortenerBaseFeature.new
    end
  end
end
