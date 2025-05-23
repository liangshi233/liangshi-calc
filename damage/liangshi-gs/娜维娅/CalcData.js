import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'

let CharacterName = "娜维娅"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 5, NormalDmg: 5, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['三段伤害2'][0], 'a', 'phy')
    return {
      dmg: 3 * z.dmg,
      avg: 3 * z.avg
    }
  }
},
{
  title: `${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 6, NormalDmg: 46, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.a2Name}循环伤害`,
  params: { ChargedUse: 1, ChargedHit: 3, ChargedDmg: 3, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'phy')
},
{
  title: `${TalentName.a2Name}终结伤害`,
  params: { ChargedUse: 1, ChargedHit: 6, ChargedDmg: 6, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'phy')
},
{
  title: `${TalentName.a3Name}期间伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `低空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `高空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段伤害`,
  params: { NormalElement: 1, RockDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2, RockDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 4, NormalDmg: 4, NormalElement: 4, RockDmg: 5 },
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['三段伤害2'][0], 'a', 'phy')
    return {
      dmg: 3 * z.dmg,
      avg: 3 * z.avg
    }
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 6, NormalDmg: 6, NormalElement: 6, RockDmg: 7 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}循环`,
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, RockDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}终结`,
  params: { ChargedUse: 1, ChargedHit: 5, ChargedDmg: 5, RockDmg: 6 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2')
},
{
  title: `${TalentName.eNameT}后${TalentName.a3Name}期间伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, RockDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
},
{
  title: `${TalentName.eNameT}后低空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, RockDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: `${TalentName.eNameT}后高空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, RockDmg: 2 },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: `0消耗${TalentName.eName}释放伤害`,
  params: { NormalElement: 1, CrystallizeNumber: 0, RockDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'], 'e')
},
{
  title: `1消耗${TalentName.eName}释放伤害`,
  params: { CrystallizeNumber: 1, RockDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * (2 - (4 * (1 / 6))), 'e')
},
{
  title: `2消耗${TalentName.eName}释放伤害`,
  params: { CrystallizeNumber: 2, RockDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * (2 - (2 * (1 / 6))), 'e')
},
{
  title: `3消耗${TalentName.eName}释放伤害`,
  params: { NormalUse: 5, NormalHit: 7, NormalDmg: 7, CrystallizeNumber: 3, RockDmg: 8 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `4消耗${TalentName.eName}释放伤害`,
  params: { NormalUse: 8, NormalHit: 10, NormalDmg: 10, CrystallizeNumber: 4, RockDmg: 11 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `5消耗${TalentName.eName}释放伤害`,
  params: { NormalUse: 11, NormalHit: 13, NormalDmg: 13, CrystallizeNumber: 5, RockDmg: 14 },
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `6消耗${TalentName.eName}释放伤害`,
  params: { NormalUse: 13, NormalHit: 16, NormalDmg: 16, CrystallizeNumber: 6, RockDmg: 17 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { RockDmg: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}炮击伤害`,
  params: { RockDmg: 5, BurstUse: 1, BurstHit: 5, BurstDmg: 5 },
  dmg: ({ talent }, dmg) => dmg(talent.q['支援炮击伤害'], 'q')
},
{
  title: `${TalentName.qName}完整伤害`,
  params: { RockDmg: 9, BurstUse: 1, BurstHit: 9, BurstDmg: 9 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['支援炮击伤害'], 'q')
    let q2 = dmg(talent.q['技能伤害'], 'q')
    return {
      dmg: q2.dmg + 17 * q1.dmg ,
      avg: q2.avg + 17 * q1.avg
    }
  }
},
{
  title: '结晶护盾吸收量',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('crystallize')
},
{
  title: '单人站场18秒',
  dmgKey: 'dph',
  params: { NormalUse: 13, NormalHit: 16, NormalDmg: 16, CrystallizeNumber: 6, RockDmg: 17, BurstUse: 1, BurstHit: 9, BurstDmg: 9 },
  dmg: ({ talent, attr, calc }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害2'][0], 'a')
    let a4 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a6 = dmg(talent.a['三段伤害2'][0], 'a', 'phy')
    let a7 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
    let q1 = dmg(talent.q['支援炮击伤害'], 'q')
    let q2 = dmg(talent.q['技能伤害'], 'q')
    let aDmg = 2 * (a1.dmg * 2 + a2.dmg * 2 + a3.dmg * 3) + 3 * (a4.dmg + a5.dmg + a6.dmg * 3 + a7.dmg)
    let aAvg = 2 * (a1.avg * 2 + a2.avg * 2 + a3.avg * 3) + 3 * (a4.avg + a5.avg + a6.avg * 3 + a7.avg)
    let eDmg = 2 * e1.dmg
    let eAvg = 2 * e1.avg
    let qDmg = q2.dmg + 17 * q1.dmg
    let qAvg = q2.avg + 17 * q1.avg
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ attr, weapon, cons, artis }) => {
    let ConsRestore = cons >= 1 ? (9 * 2) : 0
    let a = EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, 0, 2, 0, 22)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  title: '单人站场期望DPS',
  params: { NormalUse: 13, NormalHit: 16, NormalDmg: 16, CrystallizeNumber: 6, RockDmg: 17, BurstUse: 1, BurstHit: 9, BurstDmg: 9 },
  dmgKey: 'dps',
  dmg: ({ talent, attr, calc, cons, weapon, artis }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害2'][0], 'a')
    let a4 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a6 = dmg(talent.a['三段伤害2'][0], 'a', 'phy')
    let a7 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
    let q1 = dmg(talent.q['支援炮击伤害'], 'q')
    let q2 = dmg(talent.q['技能伤害'], 'q')
    let ConsRestore = cons >= 1 ? (9 * 2) : 0
    let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, 0, 2, 0, 22)), 1)
    let aDmg = 2 * (a1.dmg * 2 + a2.dmg * 2 + a3.dmg * 3) + 3 * (a4.dmg + a5.dmg + a6.dmg * 3 + a7.dmg)
    let aAvg = 2 * (a1.avg * 2 + a2.avg * 2 + a3.avg * 3) + 3 * (a4.avg + a5.avg + a6.avg * 3 + a7.avg)
    let eDmg = 2 * e1.dmg
    let eAvg = 2 * e1.avg
    let qDmg = (q2.dmg + 17 * q1.dmg) * qcn
    let qAvg = (q2.avg + 17 * q1.avg) * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 18,
      avg: (aAvg + eAvg + qAvg) / 18
    }
  }
},
{
  title: `娜夜芙琴 6消耗${TalentName.eNameT}`,
  params: { ChangeHp: 12, HealNumber: 5, NormalUse: 13, NormalHit: 16, NormalDmg: 16, CrystallizeNumber: 6, RockDmg: 17, team: true, ElementRockTeam: 1, ElementWaterTeam: 2, ElementWindTeam: 2, ElementSame: 1, ElementDifferent: 3, EnergyTeammate: 270, Ye_Lan: true, Furina: true, Jean: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
},
{
  title: `娜夜芙琴 ${TalentName.eNameT}${TalentName.aNameT}${TalentName.aNameT}${TalentName.aNameT}冲${TalentName.aNameT}${TalentName.aNameT}两轮`,
  params: { ChangeHp: 12, HealNumber: 5, NormalUse: 13, NormalHit: 16, NormalDmg: 16, CrystallizeNumber: 6, RockDmg: 17, team: true, ElementRockTeam: 1, ElementWaterTeam: 2, ElementWindTeam: 2, ElementSame: 1, ElementDifferent: 3, EnergyTeammate: 270, Ye_Lan: true, Furina: true, Jean: true },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e = dmg(talent.e['玫瑰晶弹基础伤害'] * 2, 'e')
    let e_Arkhe = dmg(talent.e['流涌之刃伤害'], 'e')
    return {
      dmg: e.dmg * 2 + e_Arkhe.dmg + 2 * (2 * a1.dmg + 2 * a2.dmg + a3.dmg),
      avg: e.avg * 2 + e_Arkhe.avg + 2 * (2 * a1.avg + 2 * a2.avg + a3.avg)
    }
  }
}]
