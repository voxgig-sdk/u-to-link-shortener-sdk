"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UToLinkShortenerError = void 0;
class UToLinkShortenerError extends Error {
    isUToLinkShortenerError = true;
    sdk = 'UToLinkShortener';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.UToLinkShortenerError = UToLinkShortenerError;
//# sourceMappingURL=UToLinkShortenerError.js.map