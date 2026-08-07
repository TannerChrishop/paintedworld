#!/usr/bin/env python3
import re, json, sys, pathlib

def main():
    p = pathlib.Path('index.html')
    if not p.exists():
        print('index.html not found')
        return 2
    s = p.read_text(encoding='utf-8')
    m = re.search(r'<script\s+type=["\']application/ld\+json["\']\s*>(.*?)</script>', s, flags=re.S|re.I)
    if not m:
        print('NO_SCRIPT_FOUND')
        return 2
    js = m.group(1).strip()
    try:
        parsed = json.loads(js)
    except Exception as e:
        print('JSON_ERROR', e)
        return 3
    print('VALID_JSON')
    area = parsed.get('areaServed')
    if area is None:
        print('areaServed: None')
    else:
        print('areaServed:')
        for a in area:
            print(' -', a.get('name') if isinstance(a, dict) else a)
    return 0

if __name__ == '__main__':
    sys.exit(main())
