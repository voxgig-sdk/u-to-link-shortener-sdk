# UToLinkShortener SDK exists test

import pytest
from utolinkshortener_sdk import UToLinkShortenerSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UToLinkShortenerSDK.test(None, None)
        assert testsdk is not None
