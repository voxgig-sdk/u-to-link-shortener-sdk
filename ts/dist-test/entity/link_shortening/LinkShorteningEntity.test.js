"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('LinkShorteningEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when U_TO_LINK_SHORTENER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('U_TO_LINK_SHORTENER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UToLinkShortenerSDK.test();
        const ent = testsdk.LinkShortening();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.U_TO_LINK_SHORTENER_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'link_shortening.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "format": "uri", "name": "original_url", "req": false, "short": "The original URL that was shortened", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "uri", "name": "short_link", "req": false, "short": "The shortened URL", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "uri", "name": "url", "req": true, "short": "The URL to be shortened", "type": "`$STRING`", "index$": 2 }], "name": "link_shortening", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /shorten/", "json": "{\"operationId\":\"getShortenedLink\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"examples\":{\"basic\":{\"summary\":\"Basic URL shortening\",\"value\":{\"url\":\"http://tvs.tv\"}}},\"schema\":{\"properties\":{\"url\":{\"description\":\"The URL to be shortened\",\"example\":\"http://tvs.tv\",\"format\":\"uri\",\"type\":\"string\"}},\"required\":[\"url\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"success\":{\"summary\":\"Successful shortening\",\"value\":{\"original_url\":\"http://tvs.tv\",\"short_link\":\"https://u.to/abc123\"}}},\"schema\":{\"properties\":{\"original_url\":{\"description\":\"The original URL that was shortened\",\"example\":\"http://tvs.tv\",\"format\":\"uri\",\"type\":\"string\"},\"short_link\":{\"description\":\"The shortened URL\",\"example\":\"https://u.to/abc123\",\"format\":\"uri\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successfully shortened the URL\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Invalid URL format\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - invalid URL provided\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"example\":\"Server error occurred\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/shorten/", "segments": [{ "lit": "shorten" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "link_shortening", "name__orig": "link_shortening", "Name": "LinkShortening", "name_": "link_shortening", "name-": "link-shortening", "NAME": "LINK_SHORTENING", "index$": 0 }, { "active": true, "entity": "link_shortening", "key$": "BasicLinkShorteningFlow", "kind": "basic", "name": "BasicLinkShorteningFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "link_shortening_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'LinkShortening');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const link_shortening_ref01_ent = client.LinkShortening();
        let link_shortening_ref01_data = setup.data.new.link_shortening['link_shortening_ref01'];
        link_shortening_ref01_data = (await link_shortening_ref01_ent.create(link_shortening_ref01_data)).data();
        (0, node_assert_1.default)(null != link_shortening_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/link_shortening/LinkShorteningTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UToLinkShortenerSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['link_shortening01', 'link_shortening02', 'link_shortening03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID': idmap,
        'U_TO_LINK_SHORTENER_TEST_LIVE': 'FALSE',
        'U_TO_LINK_SHORTENER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID'];
    const live = 'TRUE' === env.U_TO_LINK_SHORTENER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['U_TO_LINK_SHORTENER_TEST_LINK_SHORTENING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.UToLinkShortenerSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.U_TO_LINK_SHORTENER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=LinkShorteningEntity.test.js.map