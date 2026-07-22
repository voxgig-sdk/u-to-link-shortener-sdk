<?php
declare(strict_types=1);

// LinkShortening entity test

require_once __DIR__ . '/../utolinkshortener_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class LinkShorteningEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = UToLinkShortenerSDK::test(null, null);
        $ent = $testsdk->LinkShortening(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = link_shortening_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["create"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "link_shortening." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set UTOLINKSHORTENER_TEST_LINK_SHORTENING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // CREATE
        $link_shortening_ref01_ent = $client->LinkShortening(null);
        $link_shortening_ref01_data = Helpers::to_map(Vs::getprop(
            Vs::getpath($setup["data"], "new.link_shortening"), "link_shortening_ref01"));

        $link_shortening_ref01_data_result = $link_shortening_ref01_ent->create($link_shortening_ref01_data, null);
        $link_shortening_ref01_data = Helpers::to_map($link_shortening_ref01_data_result);
        $this->assertNotNull($link_shortening_ref01_data);

    }
}

function link_shortening_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/link_shortening/LinkShorteningTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = UToLinkShortenerSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["link_shortening01", "link_shortening02", "link_shortening03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("UTOLINKSHORTENER_TEST_LINK_SHORTENING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "UTOLINKSHORTENER_TEST_LINK_SHORTENING_ENTID" => $idmap,
        "UTOLINKSHORTENER_TEST_LIVE" => "FALSE",
        "UTOLINKSHORTENER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["UTOLINKSHORTENER_TEST_LINK_SHORTENING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["UTOLINKSHORTENER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new UToLinkShortenerSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["UTOLINKSHORTENER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["UTOLINKSHORTENER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
