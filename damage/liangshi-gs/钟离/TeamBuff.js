import { TeamArtifact } from '../artifact/TeamCalc.js'
import { WeaponTeamPolearm } from '../weapon/index.js'
import { TeamJson } from '../index.js'

let TeamData = TeamJson("钟离")

export const TeamBuff_Zhong_Li = [
{
  check: ({ params }) => params.team === true && params.Zhong_Li === true,
  title: '钟离天赋：[悬岩宸断] 玉璋护盾受到伤害时提升护盾强效5.0%,至多提高[shield]%',
  data: {
    shield: 25
  }
},
{
  check: ({ params }) => params.team === true && params.Zhong_Li === true,
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有抗性降低[kx]%',
  data: {
    kx: 20
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