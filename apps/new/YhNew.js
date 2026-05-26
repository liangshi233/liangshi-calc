import { LSconfig } from '#liangshi'
import { New as NewNanoka, CharacterNew as CharacterNewNanoka, WeaponNew as WeaponNewNanoka, ArtifactNew as ArtifactNewNanoka, MonsterNew as MonsterNewNanoka, ItemNew as ItemNewNanoka } from './NevernessToEverness/YHnanoka.js'

/**
 * 异环API索引
 */

export async function YhNew (e, type, api) {
  let cfg = LSconfig.getConfig('user', 'config')
  if (api) cfg.yhApi = Number(api); if (cfg.yhApi === 0 || !cfg.yhApi) cfg.yhApi = 2 //预留自动配置
  if (cfg.yhApi === 1) { //tajiduo.com
    e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false
  } else if (cfg.yhApi === 2) { //nanoka.cc
    if (type === "All") { await NewNanoka(e); return true }
    if (type === "Cha") { await CharacterNewNanoka(e); return true }
    if (type === "Wea") { await WeaponNewNanoka(e); return true }
    if (type === "Art") { await ArtifactNewNanoka(e); return true }
    if (type === "Mon") { await MonsterNewNanoka(e); return true }
    if (type === "Ite") { await ItemNewNanoka(e); return true }
    return true
  } else {
    e.reply('[liangshi-calc]设置的API格式错误,请在设置中重新设置')
    return false
  }
}
