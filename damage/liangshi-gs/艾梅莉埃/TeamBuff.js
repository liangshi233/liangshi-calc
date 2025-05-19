import { TeamArtifact } from '../artifact/TeamCalc.js'
import { WeaponTeamPolearm } from '../weapon/index.js'
import { TeamJson } from '../index.js'

let TeamData = TeamJson("艾梅莉埃")

export const TeamBuff_Emilie = [
{
  check: ({ params }) => params.team === true && params.Emilie === true,
  title: '艾梅莉埃2命：[湖光顶调] 撷萃调香、香氛演绎或固有天赋「余薰」的清露香氛（需解锁该固有天赋）命中敌人时，元素抗性降低[kx]%',
  cons: 2,
  data: {
    kx: ({ element, params }) => ['草'].includes(element) ? (params.phy === true ? 0 : 30) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Emilie === true,
  title: '艾梅莉埃天赋：[顶空集香] 场上存在艾梅莉埃自己创造的柔灯之匣时,队伍中附近的所有角色对燃烧伤害的火元素抗性提升[_res]%',
  data: {
    _res: 85
  }
},
({ uid }) => {
  let WeaponBuff
  let Tweapon = TeamData[uid].base?.Tweapon
  let name = Tweapon?.name
  if (name) {
    WeaponBuff = WeaponTeamPolearm[name]
  } else {
    WeaponBuff = false
  }
  return WeaponBuff
},
({ uid }) => {
  let ArtisBuff
  let Tartis = TeamData[uid].base?.Tartis
  let name = Object.keys(Tartis)[0]
  if (TeamData[uid].base?.Tartis[name] === 4) {
    ArtisBuff = TeamArtifact[name]
  } else {
    ArtisBuff = false
  }
  return ArtisBuff
}]