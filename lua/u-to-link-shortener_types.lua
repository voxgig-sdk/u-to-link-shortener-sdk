-- Typed models for the UToLinkShortener SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class LinkShortening
---@field original_url? string
---@field short_link? string
---@field url string

---@class LinkShorteningCreateData
---@field original_url? string
---@field short_link? string
---@field url string

local M = {}

return M
