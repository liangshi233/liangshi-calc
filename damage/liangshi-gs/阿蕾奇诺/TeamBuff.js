import { TeamArtifact } from '../artifact/TeamCalc.js'
import { WeaponTeamPolearm } from '../weapon/index.js'
import { TeamJson } from '../index.js'

let TeamData = TeamJson("阿蕾奇诺")

export const TeamBuff_Arlecchino = [
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