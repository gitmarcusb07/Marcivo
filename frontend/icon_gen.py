"""Generate MARCIVO launcher icons + splash art (neon-on-black style).

Run: python icon_gen.py
Overwrites: mipmap-*/ic_launcher.png, ic_launcher_round.png,
ic_launcher_foreground.png and drawable/splash.png
"""
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

RES = r"C:\Marcivo\frontend\android\app\src\main\res"
SCRIPT_FONT = r"C:\Windows\Fonts\BRUSHSCI.TTF"   # brush script, close to the concept
SANS_BOLD = r"C:\Windows\Fonts\arialbd.ttf"
BG = (11, 11, 14, 255)
RED = (229, 9, 20)


def glow_spot(size, center, radius, color, max_alpha=110):
    """Soft radial glow layer (RGBA)."""
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx, cy = center
    steps = 24
    for i in range(steps, 0, -1):
        a = int(max_alpha * (1 - i / (steps + 1)) ** 1.6)
        r = radius * i / steps
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color + (a,))
    return layer.filter(ImageFilter.GaussianBlur(8))


def wordmark(width, text_h, font_path, font_size, glow=18, stroke=7):
    """Render neon wordmark on transparent canvas sized to fit."""
    font = ImageFont.truetype(font_path, font_size)
    tmp = Image.new("RGBA", (width * 2, text_h * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(tmp)
    bbox = d.textbbox((0, 0), "marcivo", font=font, stroke_width=stroke)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    canvas = Image.new("RGBA", (tw + glow * 4, th + glow * 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    x, y = glow * 2 - bbox[0], glow * 2 - bbox[1]
    # outer glow: blurred white silhouette
    mask = Image.new("L", canvas.size, 0)
    md = ImageDraw.Draw(mask)
    md.text((x, y), "marcivo", font=font, fill=255, stroke_width=stroke, stroke_fill=255)
    blurred = mask.filter(ImageFilter.GaussianBlur(glow))
    canvas.paste(Image.new("RGBA", canvas.size, (255, 255, 255, 255)), (0, 0), blurred)
    # crisp sticker: white outline, near-black fill
    d.text((x, y), "marcivo", font=font, fill=(12, 12, 16, 255),
           stroke_width=stroke, stroke_fill=(255, 255, 255, 255))
    # faint top highlight for depth
    hi = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    hd = ImageDraw.Draw(hi)
    hd.text((x, y - max(1, font_size // 60)), "marcivo", font=font,
            fill=(255, 255, 255, 70), stroke_width=0)
    canvas = Image.alpha_composite(canvas, hi)
    return canvas


def rounded_bg(size, radius):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=BG)
    return img


def purple_gradient(size):
    top = (128, 30, 195)
    mid = (94, 10, 160)
    bottom = (22, 2, 46)
    img = Image.new("RGBA", (size, size))
    d = ImageDraw.Draw(img)
    for y in range(size):
        t = y / max(1, size - 1)
        if t < 0.45:
            u = t / 0.45
            c = tuple(int(top[i] + (mid[i] - top[i]) * u) for i in range(3)) + (255,)
        else:
            u = (t - 0.45) / 0.55
            c = tuple(int(mid[i] + (bottom[i] - mid[i]) * u) for i in range(3)) + (255,)
        d.line([(0, y), (size, y)], fill=c)
    # bright aura behind the wordmark, like the reference art
    aura = glow_spot((size, size), (size // 2, int(size * 0.46)), int(size * 0.34), (235, 200, 255), 120)
    return Image.alpha_composite(img, aura)


def neon_wordmark(width, text_h, text, font_size, glow_color, fill_color,
                  stroke_color, glow=18, stroke=7):
    font = ImageFont.truetype(SCRIPT_FONT, font_size)
    tmp = Image.new("RGBA", (width * 2, text_h * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(tmp)
    bbox = d.textbbox((0, 0), text, font=font, stroke_width=stroke)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    canvas = Image.new("RGBA", (tw + glow * 4, th + glow * 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(canvas)
    x, y = glow * 2 - bbox[0], glow * 2 - bbox[1]
    mask = Image.new("L", canvas.size, 0)
    md = ImageDraw.Draw(mask)
    md.text((x, y), text, font=font, fill=255, stroke_width=stroke, stroke_fill=255)
    blurred = mask.filter(ImageFilter.GaussianBlur(glow))
    glow_alpha = blurred.point(lambda v: int(v * 0.85))
    canvas.paste(Image.new("RGBA", canvas.size, glow_color + (255,)), (0, 0), glow_alpha)
    d.text((x, y), text, font=font, fill=fill_color,
           stroke_width=stroke, stroke_fill=stroke_color)
    return canvas


def purple_master(size=1024):
    bg = purple_gradient(size)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size - 1, size - 1],
                                           radius=int(size * 0.225), fill=255)
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    img.paste(bg, (0, 0), mask)
    img = Image.alpha_composite(
        img, glow_spot((size, size), (size // 2, size // 2), int(size * 0.45), (224, 170, 255), 80))
    wm = neon_wordmark(size, size, "Marcivo", int(size * 0.30),
                       glow_color=(224, 170, 255), fill_color=(26, 4, 46, 255),
                       stroke_color=(245, 230, 255, 255))
    wm = wm.resize((int(size * 0.84), int(wm.height * size * 0.84 / wm.width)), Image.LANCZOS)
    img = Image.alpha_composite(img, _centered(img, wm, dy=int(size * 0.02)))
    return img.convert("RGB")


def purple_fg(size=432):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas = Image.alpha_composite(
        canvas, glow_spot((size, size), (size // 2, size // 2), int(size * 0.42), (224, 170, 255), 60))
    wm = neon_wordmark(size, size, "Marcivo", int(size * 0.30),
                       glow_color=(224, 170, 255), fill_color=(26, 4, 46, 255),
                       stroke_color=(245, 230, 255, 255))
    target_w = int(size * 0.78)
    wm = wm.resize((target_w, int(wm.height * target_w / wm.width)), Image.LANCZOS)
    return Image.alpha_composite(canvas, _centered(canvas, wm))


def purple_splash(w=720, h=1280):
    img = Image.new("RGBA", (w, h), (8, 2, 16, 255))
    img = Image.alpha_composite(
        img, glow_spot((w, h), (w // 2, h // 2 - 60), 300, (150, 60, 220), 90))
    img = Image.alpha_composite(
        img, glow_spot((w, h), (w // 2, h - 80), 320, (120, 30, 190), 60))
    wm = neon_wordmark(w, h, "Marcivo", 150,
                       glow_color=(224, 170, 255), fill_color=(26, 4, 46, 255),
                       stroke_color=(245, 230, 255, 255))
    target_w = int(w * 0.78)
    wm = wm.resize((target_w, int(wm.height * target_w / wm.width)), Image.LANCZOS)
    img = Image.alpha_composite(img, _centered(img, wm, dy=-40))
    bar = red_underline(200, 8)
    # recolor bar purple
    px = bar.load()
    for yy in range(bar.height):
        for xx in range(bar.width):
            r, g, b, a = px[xx, yy]
            if a:
                px[xx, yy] = (170, 80, 255, a)
    img = Image.alpha_composite(img, _centered(img, bar, dy=110))
    font = ImageFont.truetype(SANS_BOLD, 26)
    d = ImageDraw.Draw(img)
    spaced = " ".join(list("DEVELOPED BY MARCUS")).replace("   ", "  ")
    bbox = d.textbbox((0, 0), spaced, font=font)
    tw = bbox[2] - bbox[0]
    d.text(((w - tw) // 2, h // 2 + 150), spaced, font=font, fill=(190, 160, 210, 255))
    return img.convert("RGB")


def red_underline(w, h=10):
    bar = Image.new("RGBA", (w, h * 4), (0, 0, 0, 0))
    d = ImageDraw.Draw(bar)
    d.rounded_rectangle([0, h, w, h * 2], radius=h // 2, fill=RED + (255,))
    return bar.filter(ImageFilter.GaussianBlur(2))


def master_icon(size=1024):
    img = rounded_bg(size, int(size * 0.225))
    img = Image.alpha_composite(
        img, glow_spot((size, size), (size // 2, size // 3), int(size * 0.42), (255, 255, 255), 70))
    img = Image.alpha_composite(
        img, glow_spot((size, size), (size // 2, int(size * 0.85)), int(size * 0.4), RED, 55))
    wm = wordmark(size, size, SCRIPT_FONT, int(size * 0.30))
    wm = wm.resize((int(size * 0.78), int(wm.height * size * 0.78 / wm.width)), Image.LANCZOS)
    img = Image.alpha_composite(img, _centered(img, wm, dy=int(size * 0.01)))
    bar = red_underline(int(size * 0.34), max(6, size // 110))
    img = Image.alpha_composite(img, _centered(img, bar, dy=int(size * 0.20)))
    return img.convert("RGB")


def _centered(base, layer, dy=0):
    canvas = Image.new("RGBA", base.size, (0, 0, 0, 0))
    canvas.alpha_composite(layer, ((base.width - layer.width) // 2,
                                   (base.height - layer.height) // 2 + dy))
    return canvas


def foreground(size=432):
    """Transparent adaptive foreground: glow wordmark only."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas = Image.alpha_composite(
        canvas, glow_spot((size, size), (size // 2, size // 2), int(size * 0.42), (255, 255, 255), 60))
    wm = wordmark(size, size, SCRIPT_FONT, int(size * 0.30))
    target_w = int(size * 0.72)
    wm = wm.resize((target_w, int(wm.height * target_w / wm.width)), Image.LANCZOS)
    canvas = Image.alpha_composite(canvas, _centered(canvas, wm))
    bar = red_underline(int(size * 0.30), max(4, size // 130))
    canvas = Image.alpha_composite(canvas, _centered(canvas, bar, dy=int(size * 0.17)))
    return canvas


def splash(w=720, h=1280):
    img = Image.new("RGBA", (w, h), BG)
    img = Image.alpha_composite(
        img, glow_spot((w, h), (w // 2, h // 2 - 60), 300, (255, 255, 255), 80))
    img = Image.alpha_composite(
        img, glow_spot((w, h), (w // 2, h - 80), 320, RED, 60))
    wm = wordmark(w, h, SCRIPT_FONT, 150)
    target_w = int(w * 0.72)
    wm = wm.resize((target_w, int(wm.height * target_w / wm.width)), Image.LANCZOS)
    img = Image.alpha_composite(img, _centered(img, wm, dy=-40))
    bar = red_underline(200, 8)
    img = Image.alpha_composite(img, _centered(img, bar, dy=110))
    # credit line
    font = ImageFont.truetype(SANS_BOLD, 26)
    d = ImageDraw.Draw(img)
    txt = "DEVELOPED BY MARCUS"
    bbox = d.textbbox((0, 0), txt, font=font)
    tw = bbox[2] - bbox[0]
    # letterspace manually
    spaced = " ".join(list(txt)).replace("   ", "  ")
    bbox = d.textbbox((0, 0), spaced, font=font)
    tw = bbox[2] - bbox[0]
    d.text(((w - tw) // 2, h // 2 + 150), spaced, font=font, fill=(160, 160, 170, 255))
    return img.convert("RGB")


DENS = {"mipmap-mdpi": 48, "mipmap-hdpi": 72, "mipmap-xhdpi": 96,
        "mipmap-xxhdpi": 144, "mipmap-xxxhdpi": 192}
FG = {"mipmap-mdpi": 108, "mipmap-hdpi": 162, "mipmap-xhdpi": 216,
      "mipmap-xxhdpi": 324, "mipmap-xxxhdpi": 432}

SKETCH_FONT = r"C:\Windows\Fonts\arialbd.ttf"


def sketch_art(size, with_bg=True):
    """Hand-sketch concept: red play button center, MARCIVO letters orbiting."""
    if with_bg:
        img = rounded_bg(size, int(size * 0.225))
        img = Image.alpha_composite(
            img, glow_spot((size, size), (size // 2, size // 3), int(size * 0.42), (255, 255, 255), 55))
        img = Image.alpha_composite(
            img, glow_spot((size, size), (size // 2, int(size * 0.85)), int(size * 0.4), RED, 50))
    else:
        img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cx, cy = size * 0.5, size * 0.45
    # red play button: rounded disc + triangle
    disc_r = size * 0.155
    disc = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    dd = ImageDraw.Draw(disc)
    dd.ellipse([cx - disc_r, cy - disc_r, cx + disc_r, cy + disc_r], fill=(20, 20, 24, 255),
               outline=RED + (255,), width=max(2, size // 128))
    tw, th = disc_r * 0.95, disc_r * 1.15
    px = cx - tw * 0.35
    dd.polygon([(px, cy - th / 2), (px, cy + th / 2), (px + tw, cy)], fill=RED + (255,))
    disc = disc.filter(ImageFilter.GaussianBlur(1))
    img = Image.alpha_composite(img, glow_spot((size, size), (cx, cy), disc_r * 1.6, RED, 70))
    img = Image.alpha_composite(img, disc)
    # orbiting letters: (char, x_frac, y_frac) per the sketch
    spots = [("M", 0.20, 0.52), ("V", 0.40, 0.19), ("O", 0.56, 0.12),
             ("I", 0.68, 0.17), ("R", 0.80, 0.37), ("A", 0.74, 0.62), ("C", 0.47, 0.82)]
    fs = int(size * 0.115)
    font = ImageFont.truetype(SKETCH_FONT, fs)
    glow_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_layer)
    txt_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    td = ImageDraw.Draw(txt_layer)
    for ch, fx, fy in spots:
        x, y = size * fx, size * fy
        gd.text((x, y), ch, font=font, fill=(255, 255, 255, 255), anchor="mm")
        td.text((x, y), ch, font=font, fill=(245, 245, 248, 255), anchor="mm",
                stroke_width=max(1, size // 256), stroke_fill=(10, 10, 12, 255))
    img = Image.alpha_composite(img, glow_layer.filter(ImageFilter.GaussianBlur(size // 90)))
    img = Image.alpha_composite(img, txt_layer)
    return img


def sketch_master(size=1024):
    return sketch_art(size, with_bg=True).convert("RGB")


def sketch_fg(size=432):
    return sketch_art(size, with_bg=False)


def play_symbol(size, disc_r_frac=0.30):
    """Single-symbol play mark: dark disc, red ring + red triangle, red glow.
    No white, no text — reads at any icon size."""
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    cx = cy = size // 2
    disc_r = int(size * disc_r_frac)
    img = Image.alpha_composite(
        img, glow_spot((size, size), (cx, cy), int(disc_r * 1.9), RED, 90))
    d = ImageDraw.Draw(img)
    d.ellipse([cx - disc_r, cy - disc_r, cx + disc_r, cy + disc_r],
              fill=(22, 22, 28, 255), outline=RED + (255,),
              width=max(2, size // 96))
    tw, th = disc_r * 0.95, disc_r * 1.15
    px = cx - tw * 0.38
    d.polygon([(px, cy - th / 2), (px, cy + th / 2), (px + tw, cy)],
              fill=RED + (255,))
    return img


def play_master(size=1024):
    """Launcher master: play symbol on near-black rounded tile + red aura."""
    img = rounded_bg(size, int(size * 0.225))
    img = Image.alpha_composite(
        img, glow_spot((size, size), (size // 2, int(size * 0.80)), int(size * 0.42), RED, 55))
    sym = play_symbol(size, 0.30)
    img = Image.alpha_composite(img, _centered(img, sym, dy=-int(size * 0.02)))
    return img.convert("RGB")


def play_fg(size=432):
    """Transparent adaptive foreground: play symbol only."""
    return play_symbol(size, 0.34)


def play_splash(w=720, h=1280):
    img = Image.new("RGBA", (w, h), BG)
    img = Image.alpha_composite(
        img, glow_spot((w, h), (w // 2, h // 2 - 120), 300, RED, 80))
    sym = play_symbol(min(w, h), 0.30)
    img = Image.alpha_composite(img, _centered(img, sym, dy=-140))
    font = ImageFont.truetype(SANS_BOLD, 64)
    d = ImageDraw.Draw(img)
    txt = "MARCIVO"
    bbox = d.textbbox((0, 0), txt, font=font)
    tw = bbox[2] - bbox[0]
    d.text(((w - tw) // 2, h // 2 + 120), txt, font=font, fill=RED + (255,))
    font2 = ImageFont.truetype(SANS_BOLD, 26)
    spaced = " ".join(list("DEVELOPED BY MARCUS")).replace("   ", "  ")
    bbox = d.textbbox((0, 0), spaced, font=font2)
    tw = bbox[2] - bbox[0]
    d.text(((w - tw) // 2, h // 2 + 210), spaced, font=font2, fill=(160, 160, 170, 255))
    return img.convert("RGB")


def m_bold_master(size=1024):
    """Netflix-style launcher: one bold red M on a near-black tile."""
    img = rounded_bg(size, int(size * 0.225))
    img = Image.alpha_composite(
        img, glow_spot((size, size), (size // 2, int(size * 0.78)), int(size * 0.40), RED, 60))
    font = ImageFont.truetype(SANS_BOLD, int(size * 0.62))
    tmp = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(tmp)
    bbox = d.textbbox((0, 0), "M", font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.text(((size - tw) // 2 - bbox[0], (size - th) // 2 - bbox[1]), "M", font=font, fill=255)
    glow = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    glow.paste(Image.new("RGBA", (size, size), RED + (255,)), (0, 0),
               mask.filter(ImageFilter.GaussianBlur(max(1, size // 512))))
    img = Image.alpha_composite(img, glow)
    # crisp red-gradient M core (no white anywhere)
    shade = _m_shade(size, gloss_alpha=45)
    img.paste(shade, (0, 0), mask)
    return img.convert("RGB")


def m_bold_fg(size=432):
    """Transparent adaptive foreground: bold red M only."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    font = ImageFont.truetype(SANS_BOLD, int(size * 0.58))
    tmp = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(tmp)
    bbox = d.textbbox((0, 0), "M", font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x, y = (size - tw) // 2 - bbox[0], (size - th) // 2 - bbox[1]
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).text((x, y), "M", font=font, fill=255)
    canvas = Image.alpha_composite(
        canvas, glow_spot((size, size), (size // 2, size // 2), int(size * 0.40), RED, 70))
    shade = _m_shade(size, gloss_alpha=40)
    canvas.paste(shade, (0, 0), mask)
    return canvas


def m_bold_splash(w=720, h=1280):
    img = Image.new("RGBA", (w, h), BG)
    img = Image.alpha_composite(
        img, glow_spot((w, h), (w // 2, h // 2 - 120), 320, RED, 85))
    font = ImageFont.truetype(SANS_BOLD, 340)
    d = ImageDraw.Draw(img)
    bbox = d.textbbox((0, 0), "M", font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x, y = (w - tw) // 2 - bbox[0], (h - th) // 2 - bbox[1] - 140
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).text((x, y), "M", font=font, fill=255)
    tile = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    tile.paste(_m_shade(h, gloss_alpha=45).crop((0, 0, w, h)), (0, 0), mask)
    img = Image.alpha_composite(img, tile)
    font2 = ImageFont.truetype(SANS_BOLD, 64)
    d2 = ImageDraw.Draw(img)
    txt = "MARCIVO"
    bbox = d2.textbbox((0, 0), txt, font=font2)
    tw = bbox[2] - bbox[0]
    d2.text(((w - tw) // 2, h // 2 + 160), txt, font=font2, fill=RED + (255,))
    font3 = ImageFont.truetype(SANS_BOLD, 26)
    spaced = " ".join(list("DEVELOPED BY MARCUS")).replace("   ", "  ")
    bbox = d2.textbbox((0, 0), spaced, font=font3)
    tw = bbox[2] - bbox[0]
    d2.text(((w - tw) // 2, h // 2 + 250), spaced, font=font3, fill=(160, 160, 170, 255))
    return img.convert("RGB")


def main():
    # Netflix-style set: one bold red M on near-black, no white anywhere.
    master = m_bold_master()
    for d, px in DENS.items():
        p = os.path.join(RES, d)
        os.makedirs(p, exist_ok=True)
        master.resize((px, px), Image.LANCZOS).save(os.path.join(p, "ic_launcher.png"))
        # round variant
        r = master.resize((px, px), Image.LANCZOS).convert("RGBA")
        mask = Image.new("L", (px, px), 0)
        ImageDraw.Draw(mask).ellipse([0, 0, px - 1, px - 1], fill=255)
        rp = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        rp.paste(r, (0, 0), mask)
        ring = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        ImageDraw.Draw(ring).ellipse([1, 1, px - 2, px - 2], outline=(255, 255, 255, 90), width=max(1, px // 96))
        rp = Image.alpha_composite(rp, ring)
        rp.save(os.path.join(p, "ic_launcher_round.png"))
        print("icon", d, px)
    for d, px in FG.items():
        m_bold_fg(px).save(os.path.join(RES, d, "ic_launcher_foreground.png"))
        print("foreground", d, px)
    m_bold_splash().save(os.path.join(RES, "drawable", "splash.png"))
    print("splash done")


# ---------------------------------------------------------------------------
# Red-M app logo (matches the in-app MLogo mark): glossy red block "M" with
# dark side folds on black. Geometry defined in 0..1000 space, scaled to fit.
# ---------------------------------------------------------------------------
M_POLY = [(200, 150), (350, 150), (500, 450), (650, 150), (800, 150),
          (800, 850), (650, 850), (650, 300), (500, 600), (350, 300),
          (350, 850), (200, 850)]
FOLD_L = [(140, 190), (200, 150), (200, 850), (140, 810)]
FOLD_R = [(860, 190), (800, 150), (800, 850), (860, 810)]
RED_TOP = (255, 42, 51)
RED_MID = (229, 9, 20)
RED_BOT = (150, 6, 13)
FOLD_C = (110, 4, 10, 255)


def _fit_pts(pts, size, span_lo, span_hi):
    lo = span_lo * size
    scale = (span_hi - span_lo) * size / 1000.0
    return [(lo + x * scale, lo + y * scale) for x, y in pts]


def _m_shade(size, gloss_alpha=70, h=None):
    """Vertical red gradient + white top gloss (RGBA, full-canvas)."""
    h = h or size
    shade = Image.new("RGBA", (size, h))
    d = ImageDraw.Draw(shade)
    for y in range(h):
        t = y / max(1, h - 1)
        if t < 0.55:
            u = t / 0.55
            c = tuple(int(RED_TOP[i] + (RED_MID[i] - RED_TOP[i]) * u) for i in range(3))
        else:
            u = (t - 0.55) / 0.45
            c = tuple(int(RED_MID[i] + (RED_BOT[i] - RED_MID[i]) * u) for i in range(3))
        d.line([(0, y), (size, y)], fill=c + (255,))
    if gloss_alpha:
        gl = Image.new("RGBA", (size, h), (0, 0, 0, 0))
        gd = ImageDraw.Draw(gl)
        gh = int(h * 0.45)
        for y in range(gh):
            a = int(gloss_alpha * (1 - y / max(1, gh)))
            gd.line([(0, y), (size, y)], fill=(255, 255, 255, a))
        shade = Image.alpha_composite(shade, gl)
    return shade


def red_m_master(size=1024):
    """Launcher master: M on black rounded tile."""
    img = rounded_bg(size, int(size * 0.225))
    img = Image.alpha_composite(
        img, glow_spot((size, size), (size // 2, size // 3), int(size * 0.42), (255, 255, 255), 55))
    img = Image.alpha_composite(
        img, glow_spot((size, size), (size // 2, int(size * 0.85)), int(size * 0.4), RED, 50))
    lo, hi = 0.17, 0.83
    d = ImageDraw.Draw(img)
    d.polygon(_fit_pts(FOLD_L, size, lo, hi), fill=FOLD_C)
    d.polygon(_fit_pts(FOLD_R, size, lo, hi), fill=FOLD_C)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).polygon(_fit_pts(M_POLY, size, lo, hi), fill=255)
    img.paste(_m_shade(size), (0, 0), mask)
    return img.convert("RGB")


def red_m_fg(size=432):
    """Transparent adaptive foreground: M ribbon only."""
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    canvas = Image.alpha_composite(
        canvas, glow_spot((size, size), (size // 2, size // 2), int(size * 0.40), (255, 60, 70), 55))
    lo, hi = 0.10, 0.90
    mask = Image.new("L", (size, size), 0)
    md = ImageDraw.Draw(mask)
    md.polygon(_fit_pts(FOLD_L, size, lo, hi), fill=200)
    md.polygon(_fit_pts(FOLD_R, size, lo, hi), fill=200)
    md.polygon(_fit_pts(M_POLY, size, lo, hi), fill=255)
    shade = _m_shade(size, gloss_alpha=60)
    # folds darker: rebuild shade with darker reds under fold areas
    fold_mask = Image.new("L", (size, size), 0)
    fmd = ImageDraw.Draw(fold_mask)
    fmd.polygon(_fit_pts(FOLD_L, size, lo, hi), fill=255)
    fmd.polygon(_fit_pts(FOLD_R, size, lo, hi), fill=255)
    dark = Image.new("RGBA", (size, size), (110, 4, 10, 255))
    shade.paste(dark, (0, 0), fold_mask)
    canvas.paste(shade, (0, 0), mask)
    return canvas


def red_m_splash(w=720, h=1280):
    img = Image.new("RGBA", (w, h), BG)
    img = Image.alpha_composite(
        img, glow_spot((w, h), (w // 2, h // 2 - 60), 300, (255, 255, 255), 70))
    img = Image.alpha_composite(
        img, glow_spot((w, h), (w // 2, h - 80), 340, RED, 65))
    s = 560
    tile = red_m_master(1024).resize((s, s), Image.LANCZOS).convert("RGBA")
    img = Image.alpha_composite(img, _centered(img, tile, dy=-120))
    font = ImageFont.truetype(SANS_BOLD, 64)
    d = ImageDraw.Draw(img)
    txt = "MARCIVO"
    bbox = d.textbbox((0, 0), txt, font=font)
    tw = bbox[2] - bbox[0]
    d.text(((w - tw) // 2, h // 2 + 220), txt, font=font, fill=(229, 9, 20, 255))
    font2 = ImageFont.truetype(SANS_BOLD, 26)
    d2 = ImageDraw.Draw(img)
    spaced = " ".join(list("DEVELOPED BY MARCUS")).replace("   ", "  ")
    bbox = d2.textbbox((0, 0), spaced, font=font2)
    tw = bbox[2] - bbox[0]
    d2.text(((w - tw) // 2, h // 2 + 310), spaced, font=font2, fill=(160, 160, 170, 255))
    return img.convert("RGB")


if __name__ == "__main__":
    main()
