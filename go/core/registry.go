package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewLinkShorteningEntityFunc func(client *UToLinkShortenerSDK, entopts map[string]any) UToLinkShortenerEntity

