import json
import re
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = (ROOT / "index.html").read_text(encoding="utf-8")
API = (ROOT / "api" / "meta-event.js").read_text(encoding="utf-8")


class MetaCapiContractTests(unittest.TestCase):
    def test_replaces_old_pixel_without_duplicate(self):
        self.assertNotIn("972457912589476", INDEX)
        self.assertEqual(INDEX.count("fbq('init', '1855466265797087')"), 1)
        self.assertEqual(INDEX.count("tr?id=1855466265797087"), 1)

    def test_browser_and_server_share_event_id(self):
        self.assertIn("{eventID: metaEventId}", INDEX)
        self.assertIn("eventId: metaEventId", INDEX)
        self.assertIn("event_id: eventId", API)

    def test_token_is_server_only(self):
        self.assertNotIn("META_CAPI_ACCESS_TOKEN", INDEX)
        self.assertIn("process.env.META_CAPI_ACCESS_TOKEN", API)
        self.assertNotRegex(API, r"EAA[A-Za-z0-9]+")

    def test_server_targets_selected_dataset(self):
        self.assertIn("const DATASET_ID = '1855466265797087';", API)
        self.assertIn("/${DATASET_ID}/events", API)

    def test_endpoint_validates_source_and_event(self):
        self.assertIn("eventName !== 'PageView'", API)
        self.assertIn("source.host.toLowerCase() !== requestHost", API)
        self.assertIn("source.protocol !== 'https:'", API)

    def test_test_event_code_is_environment_scoped(self):
        self.assertIn("process.env.META_CAPI_TEST_EVENT_CODE", API)


if __name__ == "__main__":
    unittest.main()
