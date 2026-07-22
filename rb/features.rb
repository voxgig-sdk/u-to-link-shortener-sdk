# UToLinkShortener SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UToLinkShortenerFeatures
  def self.make_feature(name)
    case name
    when "base"
      UToLinkShortenerBaseFeature.new
    when "test"
      UToLinkShortenerTestFeature.new
    else
      UToLinkShortenerBaseFeature.new
    end
  end
end
