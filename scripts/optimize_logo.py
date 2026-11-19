#!/usr/bin/env python3
"""Lossless PNG optimization for the official site logo."""
# Re-run optimizer after workflow activation.
from pathlib import Path
from PIL import Image
import os
import tempfile

logo = Path(__file__).resolve().parents[1] / "assets" / "images" / "logo.png"
if not logo.is_file() or logo.stat().st_size == 0:
    raise SystemExit("Official logo is missing or empty")

before = logo.stat().st_size
with Image.open(logo) as source:
    source.load()
    image = source.copy()
    # Keep original pixel dimensions, color mode, and alpha channel.
    fd, temp_name = tempfile.mkstemp(suffix=".png", dir=logo.parent)
    os.close(fd)
    temp = Path(temp_name)
    try:
        image.save(temp, format="PNG", optimize=True, compress_level=9)
        after = temp.stat().st_size
        if after < before:
            temp.replace(logo)
            print(f"Optimized logo: {before} -> {after} bytes")
        else:
            temp.unlink(missing_ok=True)
            print(f"Original is already smaller: {before} bytes; no change")
    finally:
        temp.unlink(missing_ok=True)
