from pathlib import Path
from PIL import Image

public = Path(__file__).resolve().parents[1] / 'public'
images = sorted(public.glob('*.*'))
print('Converting images in', public)
for img_path in images:
    if img_path.suffix.lower() not in ['.jpg', '.jpeg', '.png']:
        continue
    print('-', img_path.name)
    im = Image.open(img_path)
    im = im.convert('RGB')
    out_webp = img_path.with_suffix('.webp')
    im.save(out_webp, 'WEBP', quality=80, method=6)
    widths = []
    if img_path.name.startswith('hero-bg'):
        widths = [640, 1280]
    elif img_path.name.startswith('profile'):
        widths = [400, 800, 1200]
    elif 'portofolio' in img_path.name or img_path.name.startswith('portfolio'):
        widths = [640, 1280]
    for w in widths:
        if im.width <= w:
            continue
        ratio = w / im.width
        new_h = int(im.height * ratio)
        resized = im.resize((w, new_h), Image.LANCZOS)
        out_name = img_path.with_name(f"{img_path.stem}-{w}.webp")
        resized.save(out_name, 'WEBP', quality=80, method=6)
        print('  ->', out_name.name)
print('Done')
