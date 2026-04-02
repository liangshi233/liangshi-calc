import { LSconfig } from '#liangshi'
import { New as NewLunaris, CharacterNew as CharacterNewLunaris, WeaponNew as WeaponNewLunaris, ArtifactNew as ArtifactNewLunaris, MonsterNew as MonsterNewLunaris, ItemNew as ItemNewLunaris } from './GenshinImpact/GSlunaris.js';
import { New as NewYatta, CharacterNew as CharacterNewYatta, WeaponNew as WeaponNewYatta, ArtifactNew as ArtifactNewYatta, MonsterNew as MonsterNewYatta, ItemNew as ItemNewYatta } from './GenshinImpact/GSyatta.js';
import { New as NewNanoka, CharacterNew as CharacterNewNanoka, WeaponNew as WeaponNewNanoka, ArtifactNew as ArtifactNewNanoka, MonsterNew as MonsterNewNanoka, ItemNew as ItemNewNanoka } from './GenshinImpact/GSnanoka.js'
import { New as NewHakush, CharacterNew as CharacterNewHakush, WeaponNew as WeaponNewHakush, ArtifactNew as ArtifactNewHakush, MonsterNew as MonsterNewHakush, ItemNew as ItemNewHakush } from './GenshinImpact/GShakush.js'

/**
 * 原神API索引
 */

export async function GsNew (e, type, api) {
  let cfg = LSconfig.getConfig('user', 'config')
  if (api) cfg.gsApi = Number(api); if (cfg.gsApi === 0 || !cfg.gsApi) cfg.gsApi = 2 //预留自动配置
  if (cfg.gsApi === 1) { //mihoyo.com
    e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false
  } else if (cfg.gsApi === 2) { //lunaris.moe
    if (type === "All") { await NewLunaris(e); return true }
    if (type === "Cha") { await CharacterNewLunaris(e); return true }
    if (type === "Wea") { await WeaponNewLunaris(e); return true }
    if (type === "Art") { await ArtifactNewLunaris(e); return true }
    if (type === "Mon") { await MonsterNewLunaris(e); return true }
    if (type === "Ite") { await ItemNewLunaris(e); return true }
    return true
  } else if (cfg.gsApi === 3) { //yatta.moe
    if (type === "All") { await NewYatta(e); return true }
    if (type === "Cha") { await CharacterNewYatta(e); return true }
    if (type === "Wea") { await WeaponNewYatta(e); return true }
    if (type === "Art") { await ArtifactNewYatta(e); return true }
    if (type === "Mon") { await MonsterNewYatta(e); return true }
    if (type === "Ite") { await ItemNewYatta(e); return true }
    return true
  } else if (cfg.gsApi === 4) { //nanoka.cc
    if (type === "All") { await NewNanoka(e); return true }
    if (type === "Cha") { await CharacterNewNanoka(e); return true }
    if (type === "Wea") { await WeaponNewNanoka(e); return true }
    if (type === "Art") { await ArtifactNewNanoka(e); return true }
    if (type === "Mon") { await MonsterNewNanoka(e); return true }
    if (type === "Ite") { await ItemNewNanoka(e); return true }
    return true
  } else if (cfg.gsApi === 9) { //hakush.in
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
