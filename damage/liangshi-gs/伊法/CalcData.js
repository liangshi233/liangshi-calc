import { Format, LSconfig } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "伊法"
let cfg = LSconfig.getConfig('user', 'config')
let TalentName = ObTalentName(CharacterName)
let AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { Nightsoul: false, SkillsUse: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, Nightsoul: false, SkillsUse: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, Nightsoul: false, SkillsUse: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.a2Name}伤害`,
  dmgKey: 'z',
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, Nightsoul: false, SkillsUse: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.a3Name}期间伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
},
{
  title: `低空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: `高空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: `${TalentName.eName}后${TalentName.aName}伤害`,
  dmgKey: 'a',
  params: { NormalUse: 1, NormalHit: 3, NormalDmg: 3, HealNumber: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['秘药弹伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后长按${TalentName.aName}完整伤害`,
  params: { NormalUse: 1, NormalHit: 6, NormalDmg: 6, HealNumber: 6 },
  dmg: ({ talent, cons }, dmg) => {
    let a = dmg(talent.e['秘药弹伤害'], 'a')
    let c = dmg(120, 'a')
    return {
      avg: a.avg * 12 + c.avg * 6 * (cons >= 6 ? 1 : 0),
      dmg: a.dmg * 12 + c.dmg * 6 * (cons >= 6 ? 1 : 0)
    }
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}治疗`,
  dmgKey: 'h',
  params: { NormalUse: 1, NormalHit: 6, NormalDmg: 6, HealNumber: 6 },
  dmg: ({ talent, attr, calc }, { heal }) => heal(calc(attr.mastery) / 100 * talent.e['秘药弹命中治疗量2'][0] + talent.e['秘药弹命中治疗量2'][1] * 1)
},
{
  title: `${TalentName.qName}伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}附加伤害`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, EnergyDetermine: 0, EnergyUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['镇静标记伤害'], 'q', 'scene')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.c6Name}附加伤害`,
  params: { NormalUse: 1, NormalHit: 6, NormalDmg: 6, HealNumber: 6 },
  dmg: ({ talent }, dmg) => dmg(120, 'a')
},
{
  title: '感电反应伤害',
  dmg: ({}, { reaction }) => reaction('electroCharged')
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
}]

let CalcData
if (cfg.calcLiangK) {
  CalcData = AllCalc //自定义
} else if (cfg.calcLiangQ) {
  CalcData = AllCalc
} else if (cfg.calcLiangT) {
  CalcData = false
} else if (cfg.calcLiangJ) {
  CalcData = [
    AllCalc[9]
  ]
} else if (cfg.calcLiang) {
  CalcData = [
    AllCalc[7],
    AllCalc[8],
    AllCalc[9],
    AllCalc[10],
    AllCalc[11],
    AllCalc[12],
    AllCalc[13],
    AllCalc[14]
  ]
} else {
  CalcData = false
}

export const CalcMeasure = CalcData
