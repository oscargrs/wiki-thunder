import urllib.request
import json
import os
import time

API_BASE  = "https://wtvehiclesapi.duckdns.org"
IMAGES_DIR = r"C:\Users\Oscar\Documents\GitHub\wiki-thunder\public\assets\img\vehicles"
PAGE_SIZE = 200

TIPOS_DELETAR = {
    'utility_helicopter',
    'attack_helicopter',
    'boat',
    'heavy_boat',
    'battleship',
    'destroyer',
    'light_cruiser',
    'heavy_cruiser',
    'frigate',
    'barge',
    'battlecruiser'
}

def fetch_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())

# busca todos os veículos
all_vehicles = []
page = 0

print("Buscando veículos...")
while True:
    url = f"{API_BASE}/api/vehicles?limit={PAGE_SIZE}&page={page}"
    data = fetch_json(url)
    if not isinstance(data, list) or len(data) == 0:
        break
    all_vehicles.extend(data)
    if len(data) < PAGE_SIZE:
        break
    page += 1
    time.sleep(0.1)

print(f"{len(all_vehicles)} veículos encontrados.\n")

deletado = 0
nao_encontrado = 0

for v in all_vehicles:
    if v.get("vehicle_type") not in TIPOS_DELETAR:
        continue

    identifier = v.get("identifier", "")
    filename   = identifier.replace("-", "_") + ".png"
    filepath   = os.path.join(IMAGES_DIR, filename)

    if os.path.exists(filepath):
        os.remove(filepath)
        print(f"  [DEL] {filename}")
        deletado += 1
    else:
        nao_encontrado += 1

print(f"\nConcluído!")
print(f"  {deletado} imagens deletadas  |  {nao_encontrado} não encontradas na pasta")
