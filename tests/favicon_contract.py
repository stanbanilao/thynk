from pathlib import Path
import re
import struct


ROOT = Path(__file__).resolve().parents[1]
KEY_PAGES = (
    "index.html",
    "about.html",
    "services.html",
    "industries.html",
    "work.html",
    "rpa.html",
    "contact.html",
)


def png_dimensions(path: Path) -> tuple[int, int]:
    data = path.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n", f"{path.name} is not a PNG"
    return struct.unpack(">II", data[16:24])


def main() -> None:
    png = ROOT / "favicon.png"
    ico = ROOT / "favicon.ico"
    assert png.is_file(), "root /favicon.png is missing"
    assert ico.is_file(), "root /favicon.ico is missing"

    width, height = png_dimensions(png)
    assert width == height, "favicon.png must be square"
    assert width >= 48 and width % 48 == 0, "favicon.png must be a >=48px multiple of 48"
    assert ico.read_bytes()[:4] == b"\x00\x00\x01\x00", "favicon.ico is not an ICO file"

    for page in KEY_PAGES:
        html = (ROOT / page).read_text(encoding="utf-8")
        assert re.search(
            r'<link\s+rel="icon"\s+type="image/png"\s+sizes="(?:48x48|96x96|144x144|192x192)"\s+href="/favicon\.png">',
            html,
            re.IGNORECASE,
        ), f"{page} does not advertise the root PNG favicon"
        assert re.search(
            r'<link\s+rel="icon"\s+href="/favicon\.ico">',
            html,
            re.IGNORECASE,
        ), f"{page} does not advertise the root ICO favicon"

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    assert re.search(r"(?im)^Allow:\s*/\s*$", robots), "robots.txt must allow homepage and favicon crawling"


if __name__ == "__main__":
    main()
