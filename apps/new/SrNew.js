import { LSconfig } from '#liangshi'
import { New as NewNanoka, CharacterNew as CharacterNewNanoka, WeaponNew as WeaponNewNanoka, ArtifactNew as ArtifactNewNanoka, MonsterNew as MonsterNewNanoka, ItemNew as ItemNewNanoka } from './StarRail/SRnanoka.js'
import { New as NewHakush, CharacterNew as CharacterNewHakush, WeaponNew as WeaponNewHakush, ArtifactNew as ArtifactNewHakush, MonsterNew as MonsterNewHakush, ItemNew as ItemNewHakush } from './StarRail/SRhakush.js';
import { New as NewHuroka, CharacterNew as CharacterNewHuroka, WeaponNew as WeaponNewHuroka, ArtifactNew as ArtifactNewHuroka, MonsterNew as MonsterNewHuroka, ItemNew as ItemNewHuroka } from './StarRail/SRhuroka.js';
import { New as NewYatta, CharacterNew as CharacterNewYatta, WeaponNew as WeaponNewYatta, ArtifactNew as ArtifactNewYatta, MonsterNew as MonsterNewYatta, ItemNew as ItemNewYatta } from './StarRail/SRyatta.js';
import { New as NewNeonteam, CharacterNew as CharacterNewNeonteam, WeaponNew as WeaponNewNeonteam, ArtifactNew as ArtifactNewNeonteam, MonsterNew as MonsterNewNeonteam, ItemNew as ItemNewNeonteam } from './StarRail/SRneonteam.js';

/**
 * 星铁API索引
 */

export async function SrNew (e, type, api) {
  let cfg = LSconfig.getConfig('user', 'config')
  if (api) cfg.srApi = Number(api); if (cfg.srApi === 0 || !cfg.srApi) cfg.srApi = 4 //预留自动配置
  if (cfg.srApi === 1) { //mihoyo.com
    e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false
  } else if (cfg.srApi === 2) { //neonteam.dev
    if (type === "All") { await NewNeonteam(e); return true }
    if (type === "Cha") { await CharacterNewNeonteam(e); return true }
    if (type === "Wea") { await WeaponNewNeonteam(e); return true }
    if (type === "Art") { await ArtifactNewNeonteam(e); return true }
    if (type === "Mon") { await MonsterNewNeonteam(e); return true }
    if (type === "Ite") { await ItemNewNeonteam(e); return true }
    return true
  } else if (cfg.srApi === 3) { //yatta.moe
    if (type === "All") { await NewYatta(e); return true }
    if (type === "Cha") { await CharacterNewYatta(e); return true }
    if (type === "Wea") { await WeaponNewYatta(e); return true }
    if (type === "Art") { await ArtifactNewYatta(e); return true }
    if (type === "Mon") { await MonsterNewYatta(e); return true }
    if (type === "Ite") { await ItemNewYatta(e); return true }
    return true
  } else if (cfg.srApi === 4) { //nanoka.cc
    if (type === "All") { await NewNanoka(e); return true }
    if (type === "Cha") { await CharacterNewNanoka(e); return true }
    if (type === "Wea") { await WeaponNewNanoka(e); return true }
    if (type === "Art") { await ArtifactNewNanoka(e); return true }
    if (type === "Mon") { await MonsterNewNanoka(e); return true }
    if (type === "Ite") { await ItemNewNanoka(e); return true }
    return true
  } else if (cfg.srApi === 5) { //huroka.com
    if (type === "All") { await NewHuroka(e); return true }
    if (type === "Cha") { await CharacterNewHuroka(e); return true }
    if (type === "Wea") { await WeaponNewHuroka(e); return true }
    if (type === "Art") { await ArtifactNewHuroka(e); return true }
    if (type === "Mon") { await MonsterNewHuroka(e); return true }
    if (type === "Ite") { await ItemNewHuroka(e); return true }
    return true
  } else if (cfg.srApi === 9) { //hakush.in
    if (type === "All") { await NewHakush(e); return true }
    if (type === "Cha") { await CharacterNewHakush(e); return true }
    if (type === "Wea") { await WeaponNewHakush(e); return true }
    if (type === "Art") { await ArtifactNewHakush(e); return true }
    if (type === "Mon") { await MonsterNewHakush(e); return true }
    if (type === "Ite") { await ItemNewHakush(e); return true }
    return true
  } else {
    e.reply('[liangshi-calc]设置的API格式错误,请在设置中重新设置')
    return false
  }
}
