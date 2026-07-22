# UToLinkShortener SDK exists test

require "minitest/autorun"
require_relative "../UToLinkShortener_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = UToLinkShortenerSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
