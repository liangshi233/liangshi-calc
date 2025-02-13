import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

//默认打冻结，携带冰风4但不想打冻结的可以将FreezeDetermine改为false，重击蓄力按瞄准常开计时，重击计时与元素爆发全部命中帧速率均按60帧/秒

let CharacterName = "甘雨"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { FreezeDetermine: true, ElementSame: 1, ElementIceTeam: 1, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: '霜华矢绽放伤害',
  params: { ChargedUse: 2, ChargedHit: 4, ChargedDmg: 4, ChargedTime: 2.01 },
  dmg: ({ talent }, dmg) => dmg(talent.a['霜华矢·霜华绽发伤害'], 'a2')
},
{
  title: '霜华矢绽发融化',
  params: { FreezeDetermine: false, FireAttachment: true, ChargedUse: 2, ChargedHit: 4, ChargedDmg: 4, ChargedTime: 2.01 },
  dmg: ({ talent }, dmg) => dmg(talent.a['霜华矢·霜华绽发伤害'], 'a2', 'melt')
},
{
  title: `${TalentName.a2Name}总伤害`,
  params: { ChargedUse: 2, ChargedHit: 4, ChargedDmg: 4, ChargedTime: 2.01 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let z1 = dmg(talent.a['霜华矢·霜华绽发伤害'], 'a2')
    let z2 = dmg(talent.a['霜华矢命中伤害'], 'a2')
    return {
      dmg: z1.dmg + z2.dmg,
      avg: z1.avg + z2.avg
    }
  }
},
{
  title: `${TalentName.a2Name}总融化`,
  params: { FreezeDetermine: false, FireAttachment: true, ChargedUse: 2, ChargedHit: 4, ChargedDmg: 4, ChargedTime: 2.01 },
  dmg: ({ talent }, dmg) => {
    let z1 = dmg(talent.a['霜华矢·霜华绽发伤害'], 'a2', 'melt')
    let z2 = dmg(talent.a['霜华矢命中伤害'], 'a2', 'melt')
    return {
      dmg: z1.dmg + z2.dmg,
      avg: z1.avg + z2.avg
    }
  }
},
{
  title: `${TalentName.eName}伤害`,
  params: { ChargedUse: 2, ChargedHit: 4, ChargedDmg: 4 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.qName}冰凌伤害`,
  dmgKey: 'q',
  params: { Celestial_Shower: true, EnergyDetermine: 0, BurstUse:1, BurstHit: 5, BurstDmg: 5, ChargedUse: 2, ChargedHit: 4, ChargedDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰棱伤害'], 'q')
},
{
  title: `${TalentName.qName}冰凌融化`,
  params: { Celestial_Shower: true, FreezeDetermine: false, FireAttachment: true, EnergyDetermine: 0, BurstUse:1, BurstHit: 5, BurstDmg: 5, ChargedUse: 2, ChargedHit: 4, ChargedDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰棱伤害'], 'q', 'melt')
},
{
  title: `${TalentName.qName}全部命中`,
  dmgKey: 'q',
  params: { Celestial_Shower: true, EnergyDetermine: 0, BurstUse:1, BurstHit: 51, BurstDmg: 51, ChargedUse: 2, ChargedHit: 4, ChargedDmg: 4 },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['冰棱伤害'], 'q')
    return {
      dmg: q1.dmg * 51,
      avg: q1.avg * 51
    }
  }
}]
