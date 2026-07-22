package voxgigutolinkshortenersdk

import (
	"github.com/voxgig-sdk/u-to-link-shortener-sdk/go/core"
	"github.com/voxgig-sdk/u-to-link-shortener-sdk/go/entity"
	"github.com/voxgig-sdk/u-to-link-shortener-sdk/go/feature"
	_ "github.com/voxgig-sdk/u-to-link-shortener-sdk/go/utility"
)

// Type aliases preserve external API.
type UToLinkShortenerSDK = core.UToLinkShortenerSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UToLinkShortenerEntity = core.UToLinkShortenerEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UToLinkShortenerError = core.UToLinkShortenerError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewLinkShorteningEntityFunc = func(client *core.UToLinkShortenerSDK, entopts map[string]any) core.UToLinkShortenerEntity {
		return entity.NewLinkShorteningEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewUToLinkShortenerSDK = core.NewUToLinkShortenerSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewUToLinkShortenerSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *UToLinkShortenerSDK  { return NewUToLinkShortenerSDK(nil) }
func Test() *UToLinkShortenerSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
