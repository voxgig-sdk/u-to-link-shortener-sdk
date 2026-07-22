# UToLinkShortener SDK utility: make_context

from core.context import UToLinkShortenerContext


def make_context_util(ctxmap, basectx):
    return UToLinkShortenerContext(ctxmap, basectx)
