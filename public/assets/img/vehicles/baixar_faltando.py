import urllib.request
import os
import time

API_BASE = "https://wtvehiclesapi.duckdns.org"
SAVE_DIR = r"C:\Users\Oscar\Documents\GitHub\wiki-thunder\public\assets\img\vehicles"

# Lista de todos os identificadores faltando (nome do arquivo sem .png, com _)
FALTANDO = [
    # Israel
    "il-m-51_w", "il-magach-2", "il-magach-6", "il-magach-5",
    "il-magach-3_idf", "il-magach-3", "p-51d-20-na-iaf", "b-17g-iaf",
    "f-84f-israel_iaf", "f-4e-iaf", "f-4e-kurnass_2000",
    # Suécia
    "arado-196a-5", "ju-88a-4_finland", "p-51b-7_sweden", "p-51d-20_na_j26",
    "bf-109g-2_finland", "bf-109g-6_finland", "bf-109g-6_erla_finland", "f-5ag-norway",
    # França
    "h-75a-1_france", "pby-5a-late_france", "h-75a-4_france", "a-35b",
    "p-40f-5_france_ep", "f6f-5-france", "p-39q-25_france", "p-47d-22_re_france",
    "p-51c_10_france", "p-63c_5_france", "yak-9t_france", "f6f-5n_france",
    "pb4y-2_france", "yak-3_france", "fw-190a_8_france", "f4u-7",
    "f-84g_france", "f-84f_france", "f-84f_iaf", "f-86k_late",
    "f-100d_france", "f-8e_fn", "f-104g_belgium",
    # Itália
    "ju-87r_2_italy", "ju-87d_3_italy", "hs-129b_2_romania_italy", "mc-202_d",
    "mc-202_italy", "mc-205_serie1", "bf-109f_4_hungary", "mc-202_ec",
    "bf-109g_2_hungary", "mc-205_n2", "mc-205_serie3", "il-10_1946_hungary",
    "p-47d_30_italy", "yak-9p_hungary", "bf-109g_14as", "tu-2_postwar_late_hungary",
    "f-84g_italy", "f-86_cl_13_mk4_italy", "f-84f_italy", "mig-15bis_nr23_hungary",
    "mig-17pf_hungary", "f-86k_late_italy", "mig-21_mf_hungary", "f-104g_italy",
    "mig-21_bis_sau_hungary", "f-104s", "f-104s_cb", "f-104s_asa",
    # China
    "i-15bis_china", "hs-123a_1_china", "i-16_type5_1935_china", "i-16_chung_28",
    "ki-27_otsu_china", "i-16_type10_china", "h-75m_china", "p-40c_china",
    "i-153_m62_china", "ki-45_hei_tei_china", "p-66", "p-40e_china",
    "p-43a_1_china", "i-16_type17_china", "p-47d_23_ra_china_rocaf", "p-51c_11_nt_china",
    "p-51d_20_china", "pb4y-2_china", "pe-2_359_china", "p-38l_1_china_rocaf",
    "p-47d_30_china", "p-51k", "il-10_1946_china", "la-11_china",
    "tu-2_postwar_china", "la-9_china", "mig-9_china", "mig-9_late_china",
    "f-84g_china", "f-84g_31_re_china", "f-86f_30_china", "mig-15bis_nr23_china",
    "mig-17_china", "f-86f_40_china", "mig-17_f5", "f-104a_china",
    "mig-19j_6a", "f-100a_china", "f-5a_china", "f-104g_china", "f-5e_aidc",
    # Japão
    "ki-45_tei", "ki-27_otsu", "ki-27_otsu_ep", "ki-45_hei", "ki-45_otsu",
    "ki-45_ko", "bf-109e_3_japan", "f4u-1a_japan", "ki-49_1", "ki-49_2a",
    "ki-49_2b", "ki-49_2b_late", "ki-96", "p-51c_11_nt_japan", "fw-190a_5_japan",
    "b-17e_japan", "ki-83", "f-84g_thailand", "f-86f_30_japan", "f-86f_40_japan",
    "f-86f_40_japan_blue_impulse", "f-104j", "f-5a_thailand", "f-4ej",
    "f-4ej_adtw", "f-5e_fcu_thailand", "f-5t_thailand", "f-4ej_kai", "f-5th_thailand",
    # Grã-Bretanha
    "pby-5a_raf", "f4f-4_martlet_mk4", "p-51b", "f-4jk", "f-4k",
    "f-4m_fgr2", "mig-21_bison",
    # URSS
    "i-15_1934", "i-15_1935", "i-15_1935_moscow", "i-15bis", "i-15bis_krasnolutsky",
    "mbr-2", "po-2", "po-2m", "bb-1", "i-16_type5", "pby-5a_ussr", "su-2_mv5",
    "i-16_type10", "lagg-3_11", "lagg-3_8", "pe-3", "pe-3_early", "su-2_tss1",
    "yak-4", "i-153_m62", "i-153_m62_zhukovskiy", "i-16_type18", "lagg-3_23",
    "lagg-3_34", "lagg-3_35", "lagg-3_4", "yak-1_early", "i-153p", "i-16_type24",
    "il-4", "lagg-3_66", "p-39k_1", "p-40e_ussr", "pe-3_bis", "su-2_m82",
    "yak-7b", "il-2i", "la-5_type37_early", "lagg-i_301", "p-39n_su", "yak-1b",
    "yak-9", "yak-9b", "er-2_m105_mv3", "i-16_type27", "i-16_type28", "il-2m",
    "il-2m_mstitel", "la-5_type39", "p-39q_15", "p-63a_5_ussr", "pe-2_1",
    "pe-2_31", "pe-2_83", "er-2_m105_tat", "er-2_m105r_lu2b", "er-2_m105r_tat",
    "la-5fn", "pe-2_110", "pe-2_205", "yak-9m", "p-63a_10_ussr", "p-63c_5_ussr",
    "yak-9k", "yak-9t", "er-2_ach30b_early", "er-2_ach30b_late", "p-47d_ussr",
    "pe-2_359", "pe-8_m82", "su-6_m71", "yak-3_eremin", "la-7", "la-7_dolgushin",
    "su-6_am42", "su-8", "tu-2_early", "yak-3", "yak-9u", "fw-190d_9_ussr",
    "il-10", "il-10_1946", "la-7b_20", "yak-3p", "yak-3t", "yak-9p", "la-11",
    "tu-1", "tu-2", "tu-2_postwar", "tu-2_postwar_late", "yak-3_vk107", "yak-3u",
    "yak-9ut", "la-9", "yak-15_early", "yak-15", "yak-17", "su-9", "mig-9",
    "mig-9_ussr", "su-11", "la-15", "mig-15_ns23", "mig-15bis_ish", "mig-15",
    "yak-23", "yak-30d", "mig-17", "mig-17_cuba", "yak-28b", "mig-19pt",
    "mig-21_f13", "mig-21_pfm", "su-7b", "su-7bkl", "su-7bmk", "yak-38",
    "yak-38m", "mig-21_s", "mig-21_smt", "mig-21_bis", "mig-21_bis_event",
    # Alemanha
    "hs-123a_1", "ju-87b_2", "arado-196a_3", "bf-109b_2", "bf-109a_1",
    "ju-87g_1", "ju-87r_2", "ju-87r_2_snake", "bf-109c_1", "bf-109c_1_promo",
    "bv-138c_1", "ju-87g_2", "he-111h_2", "hs-129b_3", "ju-87d_3", "ju-88a_1",
    "bf-109e_1", "bf-109e_3", "fw-189a_1", "hs-129b_2", "hs-129b_2_romania",
    "ju-88c_6", "bf-109f_1", "bf-110c_4", "h-75a_2_finland", "he-111h_6",
    "me-410a_1_u4", "bf-109e_4", "bf-109e_7", "bf-109f_2", "bf-110c_6",
    "bf-110f_2", "fw-190a_1", "he-111h_16_winter", "ju-88a_4", "mc-202",
    "me-410b_2_u4", "yak-1b_luftwaffe", "ju-87d_5", "me-410a_1", "bf-110g_2",
    "bv-155b_1", "bv-238", "la-5fn_luftwaffe", "me-410a_1_u2", "me-410b_1",
    "p-47d_16_re_germany", "bf-109f_4", "bf-109f_4_trop", "fw-190a_4",
    "fw-190a_5_u2", "bf-109g_2", "bf-109g_2_romania", "fw-190a_5",
    "fw-190a_5_cannons", "ju-388j", "me-410b_1_u2", "p-47d_luftwaffe",
    "bf-109g_6", "bf-109z", "fw-190c", "fw-190d_12", "fw-190d_13", "fw-190d_9",
    "fw-190f_8", "me-410b_6_r3", "bf-109g_14", "fw-190a_8", "ju-188a_2",
    "bf-109g_10", "bf-109k_4", "he-162a_1", "he-162a_2", "he-177a_3",
    "he-177a_5", "ju-288c", "ta-152h_1", "arado-234", "me-262a_1a_u4",
    "ta-152c", "me-262a_2a", "me-262a_1a", "me-262a_1a_early", "arado-234c_3",
    "me-262a1_u1", "me-262c_1a", "me-262c_2b", "me-163b", "f-84f_germany",
    "me-163b_0", "mig-15bis_nr23_german", "f-86_canadair_german", "mig-17p_lim_5p",
    "f-86_cl_13b_mk6", "f-86k_late_german", "mig-19s", "mig-21_sps_k",
    "mig-21_mf", "f-4f", "f-104g", "f-4f_late", "f-5e_switzerland",
    "mig-21_bis_lazur", "mig-21_bis_sau", "f-4f_kws_lv",
    # USA
    "p-26a_33", "p-26a_34", "p-26a_34_m2", "p-26b_35", "sb2u-2", "tbd-1_1938",
    "f3f-2", "f3f-2_galer", "p-36a", "p-36a_rasmussen", "pby-5", "p-36c",
    "p-36c_rb", "pby-5a", "sb2u-3", "tbf-1c", "f2a-1", "f2a-1_thach", "p-400",
    "sbd-3", "f2a-3", "f4f-3", "p-40c", "a-20g", "f4u-1a", "p-36g", "p-39n",
    "p-39q_5", "p-40e", "p-40e_td", "p-40f_10", "p-43a_1", "p-51_a_36",
    "f4f-4", "f4u-1a_usmc", "f4u-1d", "p-38e", "p-51a_tl", "yp-38", "f6f-3",
    "p-38g", "p-38g_metal", "p-63a_5", "p-47d_22_re", "p-51_mk1a_usaaf",
    "p-51c_10_nt", "p-61a_1", "bf-109f_4_usa", "btd-1", "p-51d_20_na",
    "p-51d_5", "p-61c_1", "p-63a_10", "p-63c_5", "p-63c_5_kingcobra_animal_version",
    "xp-50", "f4u-4", "f6f-5n", "p-38j", "p-38j_marge", "p-47d", "p-51d_10",
    "xp-55", "b-17e", "f4u-1c", "p-38l", "p-47d_28", "p-47n_15", "pb4y-2",
    "a-26b_10", "b-17e_late", "b-17g", "p-51d_30_usaaf_korea", "a-26b", "a-26c",
    "a-26c_45_dt", "f-82e", "fw-190a_8_usa", "p-38k", "f4u-4b", "f4u-4b_vmf_214",
    "f4u-6_au_1", "p-47m_1_re", "p-47m_1_re_boxted", "p-59a", "f2g-1",
    "p-51h_5_na", "b-29", "f-80a", "f-84b", "f-89b", "f-89d", "f2h-2",
    "f-84g", "f-80", "f-86a_5", "f9f-2", "f9f-5", "b-57", "b-57b", "f-84f",
    "f-86f_25", "f-86f_35", "f9f-8", "f-86f_2", "f3h-2", "f-100d", "f-104a",
    "f-104c", "f-105d", "f-4c", "f8u-2", "f-5a", "f-5c", "f-8e", "f-5e",
    "f-4e", "f-4j", "f-4s",
]

os.makedirs(SAVE_DIR, exist_ok=True)

ok    = 0
erro  = 0
pulou = 0

print(f"Baixando {len(FALTANDO)} imagens...\n")

for identifier in FALTANDO:
    filename = identifier + ".png"
    filepath = os.path.join(SAVE_DIR, filename)

    if os.path.exists(filepath):
        pulou += 1
        continue

    # Agora a URL usa o identifier puro, mantendo os underlines (_)
    image_url = f"{API_BASE}/assets/images/{identifier}.png"

    try:
        req = urllib.request.Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as r:
            
            # Valida se o que voltou é uma imagem de verdade
            content_type = r.info().get_content_type()
            if "image" not in content_type:
                print(f"  [ERRO] {filename}: Erro 404 oculto. O servidor retornou texto/HTML ({content_type}).")
                erro += 1
                continue
                
            # Salva o arquivo binário da imagem
            with open(filepath, "wb") as f:
                f.write(r.read())
                
        print(f"  [OK] {filename}")
        ok += 1
        time.sleep(0.05)  # Um leve delay para não dar block na API
        
    except Exception as e:
        print(f"  [ERRO EXCEÇÃO] {filename}: {e}")
        erro += 1

print(f"\nConcluído!")
print(f"  {ok} baixadas  |  {pulou} já existiam  |  {erro} com erro")