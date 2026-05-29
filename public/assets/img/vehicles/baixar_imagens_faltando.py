import urllib.request
import json
import time
import os

API_BASE   = "https://wtvehiclesapi.duckdns.org"
SAVE_DIR   = r"C:\Users\Oscar\Documents\GitHub\wiki-thunder\public\src\img\vehicles"
PAGE_SIZE  = 200

def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())

os.makedirs(SAVE_DIR, exist_ok=True)

# arquivos que já existem na pasta
existentes = set(os.listdir(SAVE_DIR))

# ---------- busca todos os veículos ----------
all_vehicles = []
page = 0

print("Buscando lista de veículos...")

while True:
    url = f"{API_BASE}/api/vehicles?limit={PAGE_SIZE}&page={page}"
    data = fetch_json(url)

    if not isinstance(data, list) or len(data) == 0:
        break

    all_vehicles.extend(data)
    print(f"  Página {page}: {len(data)} veículos | Total: {len(all_vehicles)}")

    if len(data) < PAGE_SIZE:
        break

    page += 1
    time.sleep(0.1)

print(f"\n{len(all_vehicles)} veículos encontrados. Verificando imagens faltando...\n")

# ---------- baixa só as que faltam ----------
ok     = 0
pulou  = 0
erro   = 0

for v in all_vehicles:
    identifier = v.get("identifier", "")
    image_url  = v.get("images", {}).get("image", "")

    if not identifier or not image_url:
        continue

    filename = identifier + ".png"
    filepath = os.path.join(SAVE_DIR, filename)

    if filename in existentes or os.path.exists(filepath):
        pulou += 1
        continue

    try:
        req = urllib.request.Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            with open(filepath, "wb") as f:
                f.write(r.read())
        print(f"  [OK] {filename}")
        ok += 1
        time.sleep(0.05)
    except Exception as e:
        print(f"  [ERRO] {filename}: {e}")
        erro += 1

print(f"\nConcluído!")
print(f"  {ok} baixadas  |  {pulou} já existiam  |  {erro} com erro")
