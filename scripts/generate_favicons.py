from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
TARGETS = [
    ROOT / "users" / "public" / "favicon",
    ROOT / "admin" / "public" / "favicon",
]

NAVY = "#05070d"
NAVY_2 = "#071426"
CYAN = "#22d3ee"
BLUE = "#3b82f6"
WHITE = "#eaf6ff"


def rounded_rect_mask(size, radius):
    mask = Image.new("L", (size, size), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def render_icon(size):
    scale = size / 512
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))

    bg = Image.new("RGBA", (size, size), NAVY)
    bg_draw = ImageDraw.Draw(bg)
    for i in range(size):
        t = i / max(size - 1, 1)
        r = int(5 + 2 * t)
        g = int(7 + 13 * t)
        b = int(13 + 25 * t)
        bg_draw.line((0, i, size, i), fill=(r, g, b, 255))

    mask = rounded_rect_mask(size, int(112 * scale))
    canvas.alpha_composite(Image.composite(bg, Image.new("RGBA", (size, size), (0, 0, 0, 0)), mask))
    draw = ImageDraw.Draw(canvas)

    inset = int(28 * scale)
    draw.rounded_rectangle(
        (inset, inset, size - inset, size - inset),
        radius=int(88 * scale),
        outline=(34, 211, 238, 46),
        width=max(1, int(5 * scale)),
    )

    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.ellipse(
        (int(210 * scale), int(74 * scale), int(520 * scale), int(382 * scale)),
        fill=(34, 211, 238, 60),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(int(42 * scale)))
    canvas.alpha_composite(glow)

    mark = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mark_draw = ImageDraw.Draw(mark)

    def pts(values):
        return [(int(x * scale), int(y * scale)) for x, y in values]

    # Geometric K: premium developer mark with a subtle security-shield silhouette.
    mark_draw.rounded_rectangle(
        (int(142 * scale), int(118 * scale), int(194 * scale), int(394 * scale)),
        radius=int(20 * scale),
        fill=WHITE,
    )
    mark_draw.polygon(
        pts([(224, 248), (336, 122), (398, 122), (283, 258), (410, 394), (340, 394)]),
        fill=CYAN,
    )
    mark_draw.polygon(
        pts([(206, 238), (254, 238), (332, 394), (278, 394)]),
        fill=BLUE,
    )
    mark_draw.line(
        pts([(365, 144), (395, 166), (395, 222)]),
        fill=(234, 246, 255, 180),
        width=max(2, int(10 * scale)),
        joint="curve",
    )

    mark_glow = mark.filter(ImageFilter.GaussianBlur(int(10 * scale)))
    glow_tint = Image.new("RGBA", (size, size), (34, 211, 238, 82))
    canvas.alpha_composite(Image.composite(glow_tint, Image.new("RGBA", (size, size), (0, 0, 0, 0)), mark_glow.split()[3]))
    canvas.alpha_composite(mark)

    shine = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    shine_draw = ImageDraw.Draw(shine)
    shine_draw.arc(
        (int(70 * scale), int(62 * scale), int(442 * scale), int(434 * scale)),
        start=212,
        end=300,
        fill=(255, 255, 255, 34),
        width=max(1, int(4 * scale)),
    )
    canvas.alpha_composite(shine)

    return canvas


def manifest():
    return """{
  "name": "Krish Portfolio",
  "short_name": "Krish",
  "description": "Premium full-stack developer and application security engineer portfolio.",
  "icons": [
    {
      "src": "/favicon/favicon-16x16.png",
      "sizes": "16x16",
      "type": "image/png"
    },
    {
      "src": "/favicon/favicon-32x32.png",
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "/favicon/apple-touch-icon.png",
      "sizes": "180x180",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "theme_color": "#05070d",
  "background_color": "#05070d",
  "display": "standalone"
}
"""


def main():
    source = render_icon(1024)
    sizes = {
        "favicon-16x16.png": 16,
        "favicon-32x32.png": 32,
        "apple-touch-icon.png": 180,
    }
    ico_sizes = [16, 32, 48, 64, 128, 256]

    for target in TARGETS:
        target.mkdir(parents=True, exist_ok=True)

        rendered = {}
        for name, size in sizes.items():
            image = source.resize((size, size), Image.Resampling.LANCZOS)
            image.save(target / name)
            rendered[size] = image

        source.save(target / "favicon.ico", format="ICO", sizes=[(size, size) for size in ico_sizes])
        (target / "site.webmanifest").write_text(manifest(), encoding="utf-8")


if __name__ == "__main__":
    main()
