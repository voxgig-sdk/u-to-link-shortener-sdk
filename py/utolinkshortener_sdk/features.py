# UToLinkShortener SDK feature factory

from utolinkshortener_sdk.feature.base_feature import UToLinkShortenerBaseFeature
from utolinkshortener_sdk.feature.ratelimit_feature import UToLinkShortenerRatelimitFeature
from utolinkshortener_sdk.feature.retry_feature import UToLinkShortenerRetryFeature
from utolinkshortener_sdk.feature.test_feature import UToLinkShortenerTestFeature
from utolinkshortener_sdk.feature.timeout_feature import UToLinkShortenerTimeoutFeature


_FEATURES = {
    "base": lambda: UToLinkShortenerBaseFeature(),
    "ratelimit": lambda: UToLinkShortenerRatelimitFeature(),
    "retry": lambda: UToLinkShortenerRetryFeature(),
    "test": lambda: UToLinkShortenerTestFeature(),
    "timeout": lambda: UToLinkShortenerTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
