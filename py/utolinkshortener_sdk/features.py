# UToLinkShortener SDK feature factory

from utolinkshortener_sdk.feature.base_feature import UToLinkShortenerBaseFeature
from utolinkshortener_sdk.feature.test_feature import UToLinkShortenerTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UToLinkShortenerBaseFeature(),
        "test": lambda: UToLinkShortenerTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
