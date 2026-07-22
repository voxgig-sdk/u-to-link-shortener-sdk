# frozen_string_literal: true

# Typed models for the UToLinkShortener SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# LinkShortening entity data model.
#
# @!attribute [rw] original_url
#   @return [String, nil]
#
# @!attribute [rw] short_link
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String]
LinkShortening = Struct.new(
  :original_url,
  :short_link,
  :url,
  keyword_init: true
)

# Request payload for LinkShortening#create.
#
# @!attribute [rw] original_url
#   @return [String, nil]
#
# @!attribute [rw] short_link
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String]
LinkShorteningCreateData = Struct.new(
  :original_url,
  :short_link,
  :url,
  keyword_init: true
)

