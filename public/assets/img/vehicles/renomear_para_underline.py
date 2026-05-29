import os

IMAGES_DIR = r"C:\Users\Oscar\Documents\GitHub\wiki-thunder\public\src\img\vehicles"

renamed  = 0
deletado = 0
pulou    = 0
erro     = 0

for filename in os.listdir(IMAGES_DIR):
    if not filename.endswith(".png"):
        continue

    new_name = filename.replace("-", "_")

    if new_name == filename:
        pulou += 1
        continue

    old_path = os.path.join(IMAGES_DIR, filename)
    new_path = os.path.join(IMAGES_DIR, new_name)

    if os.path.exists(new_path):
        tamanho = os.path.getsize(new_path)
        if tamanho < 5000:
            # arquivo inválido (JSON de erro), deleta e renomeia
            os.remove(new_path)
            deletado += 1
            print(f"  [DEL] {new_name} ({tamanho} bytes, inválido)")
        else:
            print(f"  [CONFLITO] {filename} → {new_name} já existe e parece válido, pulando.")
            erro += 1
            continue

    os.rename(old_path, new_path)
    print(f"  [OK] {filename} → {new_name}")
    renamed += 1

print(f"\nConcluído!")
print(f"  {renamed} renomeadas  |  {deletado} inválidos deletados  |  {pulou} sem alteração  |  {erro} conflitos")
