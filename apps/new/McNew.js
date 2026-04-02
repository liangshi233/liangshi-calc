import { LSconfig } from '#liangshi'
import { New as AllNewEncore, CharacterNew as CharacterNewEncore, WeaponNew as WeaponNewEncore, ArtifactNew as ArtifactNewEncore, MonsterNew as MonsterNewEncore, ItemNew as ItemNewEncore } from './WutheringWaves/MCencore.js';
import { New as AllNewHakush, CharacterNew as CharacterNewHakush, WeaponNew as WeaponNewHakush, ArtifactNew as ArtifactNewHakush, MonsterNew as MonsterNewHakush, ItemNew as ItemNewHakush } from './WutheringWaves/MChakush.js';
import { New as AllNewNanoka, CharacterNew as CharacterNewNanoka, WeaponNew as WeaponNewNanoka, ArtifactNew as ArtifactNewNanoka, MonsterNew as MonsterNewNanoka, ItemNew as ItemNewNanoka } from './WutheringWaves/MCnanoka.js'

/**
 * 鸣潮API索引
 */

export async function McNew (e, type, api) {
  let cfg = LSconfig.getConfig('user', 'config')
  if (api) cfg.mcApi = Number(api); if (cfg.mcApi === 0 || !cfg.mcApi) cfg.mcApi = 2 //预留自动配置
  if (cfg.mcApi === 1) { //kurobbs.com
    e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false
  } else if (cfg.mcApi === 2) { //encore.moe
    if (type === "All") { await AllNewEncore(e); return true }
    if (type === "Cha") { await CharacterNewEncore(e); return true }
    if (type === "Wea") { await WeaponNewEncore(e); return true }
    if (type === "Art") { await ArtifactNewEncore(e); return true }
    if (type === "Mon") { await MonsterNewEncore(e); return true }
    if (type === "Ite") { await ItemNewEncore(e); return true }
    return true
  } else if (cfg.mcApi === 3) { //nanoka.cc
    if (type === "All") { await AllNewNanoka(e); return true }
    if (type === "Cha") { await CharacterNewNanoka(e); return true }
    if (type === "Wea") { await WeaponNewNanoka(e); return true }
    if (type === "Art") { await ArtifactNewNanoka(e); return true }
    if (type === "Mon") { await MonsterNewNanoka(e); return true }
    if (type === "Ite") { await ItemNewNanoka(e); return true }
    return true
  } else if (cfg.mcApi === 4) { //wuwa.wiki
    e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false
  } else if (cfg.mcApi === 5) { //wuwaflex.com
    e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false
  } else if (cfg.mcApi === 9) { //hakush.in
    if (type === "All") { await AllNewHakush(e); return true }
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
