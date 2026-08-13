# UToLinkShortener SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UToLinkShortenerUtility.registrar = ->(u) {
  u.clean = UToLinkShortenerUtilities::Clean
  u.done = UToLinkShortenerUtilities::Done
  u.make_error = UToLinkShortenerUtilities::MakeError
  u.feature_add = UToLinkShortenerUtilities::FeatureAdd
  u.feature_hook = UToLinkShortenerUtilities::FeatureHook
  u.feature_init = UToLinkShortenerUtilities::FeatureInit
  u.fetcher = UToLinkShortenerUtilities::Fetcher
  u.make_fetch_def = UToLinkShortenerUtilities::MakeFetchDef
  u.make_context = UToLinkShortenerUtilities::MakeContext
  u.make_options = UToLinkShortenerUtilities::MakeOptions
  u.make_request = UToLinkShortenerUtilities::MakeRequest
  u.make_response = UToLinkShortenerUtilities::MakeResponse
  u.make_result = UToLinkShortenerUtilities::MakeResult
  u.make_point = UToLinkShortenerUtilities::MakePoint
  u.make_spec = UToLinkShortenerUtilities::MakeSpec
  u.make_url = UToLinkShortenerUtilities::MakeUrl
  u.param = UToLinkShortenerUtilities::Param
  u.prepare_auth = UToLinkShortenerUtilities::PrepareAuth
  u.prepare_body = UToLinkShortenerUtilities::PrepareBody
  u.prepare_headers = UToLinkShortenerUtilities::PrepareHeaders
  u.prepare_method = UToLinkShortenerUtilities::PrepareMethod
  u.prepare_params = UToLinkShortenerUtilities::PrepareParams
  u.prepare_path = UToLinkShortenerUtilities::PreparePath
  u.prepare_query = UToLinkShortenerUtilities::PrepareQuery
  u.graphql_body = UToLinkShortenerUtilities::GraphqlBody
  u.graphql_errors = UToLinkShortenerUtilities::GraphqlErrors
  u.result_basic = UToLinkShortenerUtilities::ResultBasic
  u.result_body = UToLinkShortenerUtilities::ResultBody
  u.result_headers = UToLinkShortenerUtilities::ResultHeaders
  u.transform_request = UToLinkShortenerUtilities::TransformRequest
  u.transform_response = UToLinkShortenerUtilities::TransformResponse
}
