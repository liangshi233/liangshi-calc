import { LSconfig } from '#liangshi'
import { ObTalentName } from '../index.js'

let CharacterName = "塔利雅"
let cfg = LSconfig.getConfig('user', 'config')
let TalentName = ObTalentName(CharacterName)
let AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 4, NormalDmg: 4, phy: true },
  dmg: ({ talent }, dmg) => {
    let a = dmg(talent.a['三段伤害2'][0], 'a', 'phy')
    return {
      dmg: a.dmg * 2,
      avg: a.avg * 2
    }
  }
},
{
  title: `${TalentName.aName}四段伤害`,
  dmgKey: 'a',
  params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.a2Name}伤害`,
  dmgKey: 'z',
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, phy: true },
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['重击伤害2'][0], 'a2', 'phy')
    return {
      dmg: z.dmg * 2,
      avg: z.avg * 2
    }
  }
},
{
  title: `${TalentName.a3Name}期间伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `低空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `高空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${TalentName.eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}蒸发`,
  params: { FireAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.qName}伤害`,
  dmgKey: 'q',
  params: { EnergyDetermine: 0, EnergyUse: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}蒸发`,
  params: { FireAttachment: true, EnergyDetermine: 0, EnergyUse: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  title: `${TalentName.qName}护盾量`,
  params: { ShieldTime: 6, EnergyDetermine: 0, EnergyUse: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1, Favonian_Favor: true },
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { shield }) => shield(calc(attr.hp) * talent.q['圣眷护盾吸收量2'][0] / 100 + talent.q['圣眷护盾吸收量2'][1])
}
]


let CalcData
if (cfg.calcLiangK) {
  CalcData = AllCalc //自定义
} else if (cfg.calcLiangQ) {
  CalcData = AllCalc
} else if (cfg.calcLiangT) {
  CalcData = false
} else if (cfg.calcLiangJ) {
  CalcData = [
    AllCalc[12]
  ]
} else if (cfg.calcLiang) {
  CalcData = [
    AllCalc[0],
    AllCalc[3],
    AllCalc[8],
    AllCalc[9],
    AllCalc[10],
    AllCalc[11],
    AllCalc[12]
  ]
} else {
  CalcData = false
}

export const CalcMeasure = CalcData
