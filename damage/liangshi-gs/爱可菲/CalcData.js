import { Format, LSconfig } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "爱可菲"
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
  dmgKey: 'a',
  params: { NormalUse: 3, NormalHit: 4, NormalDmg: 4, phy: true },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['三段伤害'] / 2, 'a', 'phy')
    return {
      dmg: a1.dmg * 2,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${TalentName.a2Name}伤害`,
  dmgKey: 'z',
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  title: '下落期间伤害',
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
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}融化`,
  params: { FireAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: `${TalentName.eName}协同伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['冻霜芭菲伤害'], 'e')
},
{
  title: `${TalentName.eName}完整协同`,
  dmgKey: 'e',
  params: { SkillsUse: 1, SkillsHit: 10, SkillsDmg: 10 },
  dmg: ({ talent }, dmg) => {
    let e = dmg(talent.e['冻霜芭菲伤害'], 'e')
    return {
      dmg: e.dmg * 20,
      avg: e.avg * 20
    }
  }
},
{
  title: `${TalentName.eName}协同融化`,
  params: { FireAttachment: true, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['冻霜芭菲伤害'], 'e', 'melt')
},
{
  title: `${TalentName.eName}完整协同融化`,
  params: { SkillsUse: 1, SkillsHit: 10, SkillsDmg: 10 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['冻霜芭菲伤害'], 'e')
    let e2 = dmg(talent.e['冻霜芭菲伤害'], 'e', 'melt')
    return {
      dmg: e1.dmg * 13 + e2.dmg * 7,
      avg: e1.avg * 13 + e2.dmg * 7
    }
  }
},
{
  title: `${TalentName.qName}伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1, HealNumber: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}融化`,
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1, HealNumber: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
},
{
  title: `${TalentName.qName}治疗量`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, HealNumber: 1 },
  dmgKey: 'h',
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1)
},
{
  title: `${TalentName.tName}治疗量`,
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, HealNumber: 2 },
  dmg: ({ attr, calc }, { heal }) => heal(138.24 * calc(attr.atk) / 100)
},
{
  title: `${TalentName.c6Name}协同伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(500, 'e')
},
{
  title: `${TalentName.c6Name}协同融化`,
  params: { FireAttachment: true, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(500, 'e', 'melt')
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
    AllCalc[9],
    AllCalc[10],
    AllCalc[11],
    AllCalc[12],
    AllCalc[13],
    AllCalc[14],
    AllCalc[15],
    AllCalc[17],
  ]
} else {
  CalcData = false
}

export const CalcMeasure = CalcData
