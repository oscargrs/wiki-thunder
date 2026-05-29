import urllib.request
import os
import time

API_BASE = "https://wtvehiclesapi.duckdns.org"
SAVE_DIR = r"C:\Users\Oscar\Documents\GitHub\wiki-thunder\public\assets\img\vehicles"

# Lista de todos os identificadores faltando (nome do arquivo sem .png, com _)
FALTANDO = [
    # Israel
    "il_m_51_w", "il_magach_2", "il_magach_6", "il_magach_5",
    "il_magach_3_idf", "il_magach_3", "p_51d_20_na_iaf", "b_17g_iaf",
    "f_84f_israel_iaf", "f_4e_iaf", "f_4e_kurnass_2000",
    # Suécia
    "arado-196a-5", "ju_88a_4_finland", "p_51b_7_sweden", "p_51d_20_na_j26",
    "bf_109g_2_finland", "bf_109g_6_finland", "bf_109g_6_erla_finland", "f_5ag_norway",
    # França
    "h_75a_1_france", "pby_5a_late_france", "h_75a_4_france", "a_35b",
    "p_40f_5_france_ep", "f6f_5_france", "p_39q_25_france", "p_47d_22_re_france",
    "p_51c_10_france", "p_63c_5_france", "yak_9t_france", "f6f_5n_france",
    "pb4y_2_france", "yak_3_france", "fw_190a_8_france", "f4u_7",
    "f_84g_france", "f_84f_france", "f_84f_iaf", "f_86k_late",
    "f_100d_france", "f_8e_fn", "f_104g_belgium",
    # Itália
    "ju_87r_2_italy", "ju_87d_3_italy", "hs_129b_2_romania_italy", "mc_202_d",
    "mc_202_italy", "mc_205_serie1", "bf_109f_4_hungary", "mc_202_ec",
    "bf_109g_2_hungary", "mc_205_n2", "mc_205_serie3", "il_10_1946_hungary",
    "p_47d_30_italy", "yak_9p_hungary", "bf_109g_14as", "tu_2_postwar_late_hungary",
    "f_84g_italy", "f_86_cl_13_mk4_italy", "f_84f_italy", "mig_15bis_nr23_hungary",
    "mig_17pf_hungary", "f_86k_late_italy", "mig_21_mf_hungary", "f_104g_italy",
    "mig_21_bis_sau_hungary", "f_104s", "f_104s_cb", "f_104s_asa",
    # China
    "i_15bis_china", "hs_123a_1_china", "i_16_type5_1935_china", "i_16_chung_28",
    "ki_27_otsu_china", "i_16_type10_china", "h_75m_china", "p_40c_china",
    "i_153_m62_china", "ki_45_hei_tei_china", "p_66", "p_40e_china",
    "p_43a_1_china", "i_16_type17_china", "p_47d_23_ra_china_rocaf", "p_51c_11_nt_china",
    "p_51d_20_china", "pb4y_2_china", "pe_2_359_china", "p_38l_1_china_rocaf",
    "p_47d_30_china", "p_51k", "il_10_1946_china", "la_11_china",
    "tu_2_postwar_china", "la_9_china", "mig_9_china", "mig_9_late_china",
    "f_84g_china", "f_84g_31_re_china", "f_86f_30_china", "mig_15bis_nr23_china",
    "mig_17_china", "f_86f_40_china", "mig_17_f5", "f_104a_china",
    "mig_19j_6a", "f_100a_china", "f_5a_china", "f_104g_china", "f_5e_aidc",
    # Japão
    "ki_45_tei", "ki_27_otsu", "ki_27_otsu_ep", "ki_45_hei", "ki_45_otsu",
    "ki_45_ko", "bf_109e_3_japan", "f4u_1a_japan", "ki_49_1", "ki_49_2a",
    "ki_49_2b", "ki_49_2b_late", "ki_96", "p_51c_11_nt_japan", "fw_190a_5_japan",
    "b_17e_japan", "ki_83", "f_84g_thailand", "f_86f_30_japan", "f_86f_40_japan",
    "f_86f_40_japan_blue_impulse", "f_104j", "f_5a_thailand", "f_4ej",
    "f_4ej_adtw", "f_5e_fcu_thailand", "f_5t_thailand", "f_4ej_kai", "f_5th_thailand",
    # Grã-Bretanha
    "pby_5a_raf", "f4f_4_martlet_mk4", "p_51b", "f_4jk", "f_4k",
    "f_4m_fgr2", "mig_21_bison",
    # URSS
    "i_15_1934", "i_15_1935", "i_15_1935_moscow", "i_15bis", "i_15bis_krasnolutsky",
    "mbr_2", "po_2", "po_2m", "bb_1", "i_16_type5", "pby_5a_ussr", "su_2_mv5",
    "i_16_type10", "lagg_3_11", "lagg_3_8", "pe_3", "pe_3_early", "su_2_tss1",
    "yak_4", "i_153_m62", "i_153_m62_zhukovskiy", "i_16_type18", "lagg_3_23",
    "lagg_3_34", "lagg_3_35", "lagg_3_4", "yak_1_early", "i_153p", "i_16_type24",
    "il_4", "lagg_3_66", "p_39k_1", "p_40e_ussr", "pe_3_bis", "su_2_m82",
    "yak_7b", "il_2i", "la_5_type37_early", "lagg_i_301", "p_39n_su", "yak_1b",
    "yak_9", "yak_9b", "er_2_m105_mv3", "i_16_type27", "i_16_type28", "il_2m",
    "il_2m_mstitel", "la_5_type39", "p_39q_15", "p_63a_5_ussr", "pe_2_1",
    "pe_2_31", "pe_2_83", "er_2_m105_tat", "er_2_m105r_lu2b", "er_2_m105r_tat",
    "la_5fn", "pe_2_110", "pe_2_205", "yak_9m", "p_63a_10_ussr", "p_63c_5_ussr",
    "yak_9k", "yak_9t", "er_2_ach30b_early", "er_2_ach30b_late", "p_47d_ussr",
    "pe_2_359", "pe_8_m82", "su_6_m71", "yak_3_eremin", "la_7", "la_7_dolgushin",
    "su_6_am42", "su_8", "tu_2_early", "yak_3", "yak_9u", "fw_190d_9_ussr",
    "il_10", "il_10_1946", "la_7b_20", "yak_3p", "yak_3t", "yak_9p", "la_11",
    "tu_1", "tu_2", "tu_2_postwar", "tu_2_postwar_late", "yak_3_vk107", "yak_3u",
    "yak_9ut", "la_9", "yak_15_early", "yak_15", "yak_17", "su_9", "mig_9",
    "mig_9_ussr", "su_11", "la_15", "mig_15_ns23", "mig_15bis_ish", "mig_15",
    "yak_23", "yak_30d", "mig_17", "mig_17_cuba", "yak_28b", "mig_19pt",
    "mig_21_f13", "mig_21_pfm", "su_7b", "su_7bkl", "su_7bmk", "yak_38",
    "yak_38m", "mig_21_s", "mig_21_smt", "mig_21_bis", "mig_21_bis_event",
    # Alemanha
    "hs_123a_1", "ju_87b_2", "arado_196a_3", "bf_109b_2", "bf_109a_1",
    "ju_87g_1", "ju_87r_2", "ju_87r_2_snake", "bf_109c_1", "bf_109c_1_promo",
    "bv_138c_1", "ju_87g_2", "he_111h_2", "hs_129b_3", "ju_87d_3", "ju_88a_1",
    "bf_109e_1", "bf_109e_3", "fw_189a_1", "hs_129b_2", "hs_129b_2_romania",
    "ju_88c_6", "bf_109f_1", "bf_110c_4", "h_75a_2_finland", "he_111h_6",
    "me_410a_1_u4", "bf_109e_4", "bf_109e_7", "bf_109f_2", "bf_110c_6",
    "bf_110f_2", "fw_190a_1", "he_111h_16_winter", "ju_88a_4", "mc_202",
    "me_410b_2_u4", "yak_1b_luftwaffe", "ju_87d_5", "me_410a_1", "bf_110g_2",
    "bv_155b_1", "bv_238", "la_5fn_luftwaffe", "me_410a_1_u2", "me_410b_1",
    "p_47d_16_re_germany", "bf_109f_4", "bf_109f_4_trop", "fw_190a_4",
    "fw_190a_5_u2", "bf_109g_2", "bf_109g_2_romania", "fw_190a_5",
    "fw_190a_5_cannons", "ju_388j", "me_410b_1_u2", "p_47d_luftwaffe",
    "bf_109g_6", "bf_109z", "fw_190c", "fw_190d_12", "fw_190d_13", "fw_190d_9",
    "fw_190f_8", "me_410b_6_r3", "bf_109g_14", "fw_190a_8", "ju_188a_2",
    "bf_109g_10", "bf_109k_4", "he_162a_1", "he_162a_2", "he_177a_3",
    "he_177a_5", "ju_288c", "ta_152h_1", "arado_234", "me_262a_1a_u4",
    "ta_152c", "me_262a_2a", "me_262a_1a", "me_262a_1a_early", "arado_234c_3",
    "me_262a1_u1", "me_262c_1a", "me_262c_2b", "me_163b", "f_84f_germany",
    "me_163b_0", "mig_15bis_nr23_german", "f_86_canadair_german", "mig_17p_lim_5p",
    "f_86_cl_13b_mk6", "f_86k_late_german", "mig_19s", "mig_21_sps_k",
    "mig_21_mf", "f_4f", "f_104g", "f_4f_late", "f_5e_switzerland",
    "mig_21_bis_lazur", "mig_21_bis_sau", "f_4f_kws_lv",
    # USA
    "p_26a_33", "p_26a_34", "p_26a_34_m2", "p_26b_35", "sb2u_2", "tbd_1_1938",
    "f3f_2", "f3f_2_galer", "p_36a", "p_36a_rasmussen", "pby_5", "p_36c",
    "p_36c_rb", "pby_5a", "sb2u_3", "tbf_1c", "f2a_1", "f2a_1_thach", "p_400",
    "sbd_3", "f2a_3", "f4f_3", "p_40c", "a_20g", "f4u_1a", "p_36g", "p_39n",
    "p_39q_5", "p_40e", "p_40e_td", "p_40f_10", "p_43a_1", "p_51_a_36",
    "f4f_4", "f4u_1a_usmc", "f4u_1d", "p_38e", "p_51a_tl", "yp_38", "f6f_3",
    "p_38g", "p_38g_metal", "p_63a_5", "p_47d_22_re", "p_51_mk1a_usaaf",
    "p_51c_10_nt", "p_61a_1", "bf_109f_4_usa", "btd_1", "p_51d_20_na",
    "p_51d_5", "p_61c_1", "p_63a_10", "p_63c_5", "p_63c_5_kingcobra_animal_version",
    "xp_50", "f4u_4", "f6f_5n", "p_38j", "p_38j_marge", "p_47d", "p_51d_10",
    "xp_55", "b_17e", "f4u_1c", "p_38l", "p_47d_28", "p_47n_15", "pb4y_2",
    "a_26b_10", "b_17e_late", "b_17g", "p_51d_30_usaaf_korea", "a_26b", "a_26c",
    "a_26c_45_dt", "f_82e", "fw_190a_8_usa", "p_38k", "f4u_4b", "f4u_4b_vmf_214",
    "f4u_6_au_1", "p_47m_1_re", "p_47m_1_re_boxted", "p_59a", "f2g_1",
    "p_51h_5_na", "b_29", "f_80a", "f_84b", "f_89b", "f_89d", "f2h_2",
    "f_84g", "f_80", "f_86a_5", "f9f_2", "f9f_5", "b_57", "b_57b", "f_84f",
    "f_86f_25", "f_86f_35", "f9f_8", "f_86f_2", "f3h_2", "f_100d", "f_104a",
    "f_104c", "f_105d", "f_4c", "f8u_2", "f_5a", "f_5c", "f_8e", "f_5e",
    "f_4e", "f_4j", "f_4s",
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

    # nome na API sempre usa - onde tem - no identifier original
    # mas a URL da API usa o identifier original da API (que pode ter - ou _)
    image_url = f"{API_BASE}/assets/images/{identifier.replace(chr(95), chr(45))}.png"

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
