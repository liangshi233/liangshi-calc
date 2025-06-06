import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "珊瑚宫心海"
let a1Dmg = { dmg: 0 , avg: 0 }
let a2Dmg = { dmg: 0 , avg: 0 }
let a3Dmg = { dmg: 0 , avg: 0 }
let a1zDmg = { dmg: 0 , avg: 0 }
let e1Dmg = { dmg: 0 , avg: 0 }
let e2Dmg = { dmg: 0 , avg: 0 }
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => {
    a1Dmg = dmg(talent.a['一段伤害'], 'a')
    return a1Dmg
  }
},
{
  title: `${TalentName.aName}一段蒸发`,
  params: { FireAttachment: true, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => {
    a1zDmg = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    return a1zDmg
  }
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => {
    a2Dmg = dmg(talent.a['二段伤害'], 'a')
    return a2Dmg
  }
},
{
  title: `${TalentName.aName}二段蒸发`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, FireAttachment: true, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => {
    a3Dmg = dmg(talent.a['三段伤害'], 'a')
    return a3Dmg
  }
},
{
  title: `${TalentName.aName}三段蒸发`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, FireAttachment: true, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
},
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.a2Name}蒸发`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, FireAttachment: true, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${TalentName.eName}伤害`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4, Ceremonial_Garment: false },
  dmg: ({ attr, talent }, dmg) => {
    e1Dmg = dmg(talent.e['波纹伤害'], 'e')
    return e1Dmg
  }
},
{
  title: `${TalentName.eName}蒸发`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4, Ceremonial_Garment: false, FireAttachment: true },
  dmg: ({ attr, talent }, dmg) => {
    e2Dmg = dmg(talent.e['波纹伤害'], 'e', 'vaporize')
    return e2Dmg
  }
},
{
  title: `${TalentName.eName}完整伤害`,
  dmg: ({}) => {
    return {
      dmg: e1Dmg.dmg * 7,
      avg: e1Dmg.avg * 7,
    }
  }
},
{
  title: `${TalentName.eName}完整蒸发`,
  dmg: ({}) => {
    return {
      dmg: e2Dmg.dmg * 7,
      avg: e2Dmg.avg * 7,
    }
  }
},
{
  title: `半血${TalentName.eName}每跳治疗`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4, Ceremonial_Garment: false, OwnHp: 25 },
  dmgKey: 'h',
  dmg: ({ attr, talent, calc, cons }, { heal }) => heal(calc(attr.hp) / 100 * talent.e['治疗量2'][0] + talent.e['治疗量2'][1] * 1) + (calc(attr.hp) * (cons * 1 >= 2 ? 0.045 : 0))
},
{
  title: `${TalentName.qName}伤害`,
  dmgKey: 'q',
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
},
{
  title: `${TalentName.qName}蒸发`,
  params: { FireAttachment: true, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
},
{
  title: `半血${TalentName.qNameT}后${TalentName.aName}治疗`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 7, NormalUse: 3, NormalHit: 3, NormalDmg: 3, OwnHp: 25 },
  dmg: ({ attr, talent, calc, cons }, { heal }) => heal(calc(attr.hp) / 100 * talent.q['命中治疗量2'][0] + talent.q['命中治疗量2'][1] * 1) + (calc(attr.hp) * (cons * 1 >= 2 ? 0.006 : 0))
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}一段伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}一段蒸发`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1, FireAttachment: true },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}二段伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 2, NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}二段蒸发`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 2, NormalUse: 2, NormalHit: 2, NormalDmg: 2, FireAttachment: true },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}三段伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 3, NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.qNameT}后${TalentName.aName}三段蒸发`,
  dmgKey: 'a',
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 3, NormalUse: 3, NormalHit: 3, NormalDmg: 3, FireAttachment: true },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
},
{
  check: ({ cons }) => cons >= 1,
  title: `${TalentName.c1Name}附加伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 3, NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * 30 / 100, '')
},
{
  check: ({ cons }) => cons >= 1,
  title: `${TalentName.c1Name}附加蒸发`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 3, NormalUse: 3, NormalHit: 3, NormalDmg: 3, FireAttachment: true },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * 30 / 100, '', 'vaporize')
},
{
  title: `${TalentName.qNameT}后${TalentName.a2Name}伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.qNameT}后${TalentName.a2Name}蒸发`,
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, HealNumber: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${TalentName.qNameT}后${TalentName.eName}伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmgKey: 'e',
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['波纹伤害'], 'e')
},
{
  title: `${TalentName.qNameT}后${TalentName.eName}蒸发`,
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['波纹伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.qNameT}后${TalentName.eName}完整伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['波纹伤害'], 'e')
    let e2 = e1Dmg
    return {
      dmg: e2.dmg + e1.dmg * 5,
      avg: e2.avg + e1.avg * 5,
    }
  }
},
{
  title: `${TalentName.qNameT}后${TalentName.eName}完整蒸发`,
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 4 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['波纹伤害'], 'e', 'vaporize')
    let e2 = e2Dmg
    return {
      dmg: e2.dmg + e1.dmg * 5 ,
      avg: e2.avg + e1.avg * 5 ,
    }
  }
},
{
  title: '单人站场18秒',
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 17, NormalUse: 12, NormalHit: 12, NormalDmg: 12 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let a1 = basic(calc(attr.atk) / 100 * talent.a['一段伤害'], 'a')
    let a2 = basic(calc(attr.atk) / 100 * talent.a['二段伤害'], 'a')
    let a3 = basic(calc(attr.atk) / 100 * talent.a['三段伤害'], 'a')
    let e1 = basic(calc(attr.atk) / 100 * talent.e['波纹伤害'], 'e')
    let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
    let c1 = basic(calc(attr.hp) * 30 / 100, '')
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + (cons * 1 >= 1 ? 1 : 0) * c1.dmg) * 5 + 4 * (a1Dmg.dmg + a2Dmg.dmg + a3Dmg.dmg) + (cons * 1 >= 4 ? 2 : 0) * (a1.dmg - a1Dmg.dmg)
    let aAvg = (a1.avg + a2.avg + a3.avg + (cons * 1 >= 1 ? 1 : 0) * c1.avg) * 5 + 4 * (a1Dmg.avg + a2Dmg.avg + a3Dmg.avg) + (cons * 1 >= 4 ? 2 : 0) * (a1.avg - a1Dmg.avg)
    let eDmg = e1Dmg.dmg * 5 + e1.dmg * 5
    let eAvg = e1Dmg.avg * 5 + e1.avg * 5
    let qDmg = q1.dmg
    let qAvg = q1.avg
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人站场18秒蒸发',
  dmgKey: 'dph',
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 17, NormalUse: 12, NormalHit: 12, NormalDmg: 12 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let a1 = basic(calc(attr.atk) / 100 * talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = basic(calc(attr.atk) / 100 * talent.a['二段伤害'], 'a')
    let a3 = basic(calc(attr.atk) / 100 * talent.a['三段伤害'], 'a')
    let e1 = basic(calc(attr.atk) / 100 * talent.e['波纹伤害'], 'e', 'vaporize')
    let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
    let c1 = basic(calc(attr.hp) * 30 / 100, '', 'vaporize')
    let aDmg = 5 * (a1.dmg + a2.dmg + a3.dmg + (cons * 1 >= 1 ? 1 : 0) * c1.dmg) + 4 * (a1zDmg.dmg + a2Dmg.dmg + a3Dmg.dmg) + (cons * 1 >= 4 ? 1 : 0) * (a1.dmg - a1zDmg.dmg + a2.dmg - a2Dmg.dmg)
    let aAvg = 5 * (a1.avg + a2.avg + a3.avg + (cons * 1 >= 1 ? 1 : 0) * c1.avg) + 4 * (a1zDmg.avg + a2Dmg.avg + a3Dmg.avg) + (cons * 1 >= 4 ? 1 : 0) * (a1.avg - a1zDmg.avg + a2.avg - a2Dmg.avg)
    let eDmg = e2Dmg.dmg * 5 + e1.dmg * 5
    let eAvg = e2Dmg.avg * 5 + e1.avg * 5
    let qDmg = q1.dmg
    let qAvg = q1.avg
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人站场18秒治疗',
  dmgKey: 'hph',
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 17, NormalUse: 12, NormalHit: 12, NormalDmg: 12 },
  dmg: ({ attr, talent, calc, cons }, { heal }) => {
    let e1 = calc(attr.hp) / 100 * talent.e['治疗量2'][0] + talent.e['治疗量2'][1] * 1
    let q1 = calc(attr.hp) / 100 * talent.q['命中治疗量2'][0] + talent.q['命中治疗量2'][1] * 1
    let hpe = cons * 1 >= 2 ? (calc(attr.hp) * 0.045) : 0
    let hpq = (cons * 1 >= 4 ? 17 : 15) * calc(attr.hp) * 0.006
    let zll = 5 * 2 * (e1 + hpe) + cons4 * (q1 + hpq)
    return heal(zll)
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ attr, weapon, cons, artis }) => {
    let ConsSpeed = cons >= 4 ? 2 : 0
    let ConsRestore = cons >= 4 ? (0.8 * 21) : 0
    let a = EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, ConsSpeed, 1, 10, 27)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  title: '单人站场期望DPS',
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 17, NormalUse: 12, NormalHit: 12, NormalDmg: 12 },
  dmg: ({ talent, calc, attr, weapon, cons, artis }, { basic }) => {
    let a1 = basic(calc(attr.atk) / 100 * talent.a['一段伤害'], 'a')
    let a2 = basic(calc(attr.atk) / 100 * talent.a['二段伤害'], 'a')
    let a3 = basic(calc(attr.atk) / 100 * talent.a['三段伤害'], 'a')
    let e1 = basic(calc(attr.atk) / 100 * talent.e['波纹伤害'], 'e')
    let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
    let c1 = basic(calc(attr.hp) * 30 / 100, '')
    let ConsSpeed = cons >= 4 ? 2 : 0
    let ConsRestore = cons >= 4 ? (0.8 * 21) : 0
    let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, ConsSpeed, 1, 10, 27)), 1)
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + (cons * 1 >= 1 ? 1 : 0) * c1.dmg * qcn) * 5 + 4 * (a1Dmg.dmg + a2Dmg.dmg + a3Dmg.dmg) + (cons * 1 >= 4 ? 2 : 0) * (a1.dmg - a1Dmg.dmg)
    let aAvg = (a1.avg + a2.avg + a3.avg + (cons * 1 >= 1 ? 1 : 0) * c1.avg * qcn) * 5 + 4 * (a1Dmg.avg + a2Dmg.avg + a3Dmg.avg) + (cons * 1 >= 4 ? 2 : 0) * (a1.avg - a1Dmg.avg)
    let eDmg = e1Dmg.dmg * 5 + e1.dmg * 5
    let eAvg = e1Dmg.avg * 5 + e1.avg * 5
    let qDmg = q1.dmg * qcn - ((a1.dmg - a1Dmg.dmg) * (cons * 1 >= 4 ? 17 : 15) * qcn)
    let qAvg = q1.avg * qcn - ((a1.avg - a1Dmg.avg) * (cons * 1 >= 4 ? 17 : 15) * qcn)
    return {
      dmg: (aDmg + eDmg + qDmg) / 18,
      avg: (aAvg + eAvg + qAvg) / 18
    }
  }
},
{
  title: '单人站场期望DPS蒸发',
  params: { FireAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 17, NormalUse: 12, NormalHit: 12, NormalDmg: 12 },
  dmgKey: 'dps',
  dmg: ({ talent, calc, attr, cons, weapon, artis }, { basic }) => {
    let a1 = basic(calc(attr.atk) / 100 * talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = basic(calc(attr.atk) / 100 * talent.a['二段伤害'], 'a')
    let a3 = basic(calc(attr.atk) / 100 * talent.a['三段伤害'], 'a')
    let e1 = basic(calc(attr.atk) / 100 * talent.e['波纹伤害'], 'e', 'vaporize')
    let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
    let c1 = basic(calc(attr.hp) * 30 / 100, '', 'vaporize')
    let ConsSpeed = cons >= 4 ? 2 : 0
    let ConsRestore = cons >= 4 ? (0.8 * 21) : 0
    let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, ConsSpeed, 1, 10, 27)), 1)
    let aDmg = 5 * (a1.dmg + a2.dmg + a3.dmg + (cons * 1 >= 1 ? 1 : 0) * c1.dmg * qcn) + 4 * (a1zDmg.dmg + a2Dmg.dmg + a3Dmg.dmg) + (cons * 1 >= 4 ? 1 : 0) * (a1.dmg - a1zDmg.dmg + a2.dmg - a2Dmg.dmg)
    let aAvg = 5 * (a1.avg + a2.avg + a3.avg + (cons * 1 >= 1 ? 1 : 0) * c1.avg * qcn) + 4 * (a1zDmg.avg + a2Dmg.avg + a3Dmg.avg) + (cons * 1 >= 4 ? 1 : 0) * (a1.avg - a1zDmg.avg + a2.avg - a2Dmg.avg)
    let eDmg = e2Dmg.dmg * 5 + e1.dmg * 5
    let eAvg = e2Dmg.avg * 5 + e1.avg * 5
    let qDmg = q1.dmg * qcn - (((a1.dmg - a1Dmg.dmg) * (cons * 1 >= 4 ? 6 : 5) + ((a2.dmg - a2Dmg.dmg) * (cons * 1 >= 4 ? 11 : 10))) * qcn)
    let qAvg = q1.avg * qcn - (((a1.avg - a1Dmg.avg) * (cons * 1 >= 4 ? 6 : 5) + ((a2.avg - a2Dmg.avg) * (cons * 1 >= 4 ? 11 : 10))) * qcn)
    return {
      dmg: (aDmg + eDmg + qDmg) / 18,
      avg: (aAvg + eAvg + qAvg) / 18
    }
  }
},
{
  title: '单人站场期望HPS',
  dmgKey: 'hps',
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, SkillsUse: 1, SkillsHit: 5, SkillsDmg: 5, HealNumber: 17, NormalUse: 12, NormalHit: 12, NormalDmg: 12 },
  dmg: ({ attr, talent, calc, cons, weapon, artis }, { heal }) => {
    let ConsSpeed = cons >= 4 ? 2 : 0
    let ConsRestore = cons >= 4 ? (0.8 * 21) : 0
    let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, ConsSpeed, 1, 10, 27)), 1)
    let e1 = calc(attr.hp) / 100 * talent.e['治疗量2'][0] + talent.e['治疗量2'][1] * 1
    let q1 = calc(attr.hp) / 100 * talent.q['命中治疗量2'][0] + talent.q['命中治疗量2'][1] * 1
    let hpe = cons * 1 >= 2 ? (calc(attr.hp) * 0.045) : 0
    let hpq = (cons * 1 >= 4 ? 17 : 15) * calc(attr.hp) * 0.006
    let zll = (5 * (1 + qcn) * (e1 + hpe) + (q1 + hpq) * qcn) / 18
    return heal(zll)
  }
},
{
  title: '心夜万芙 水母治疗',
  dmgKey: 'h',
  params: { teamA: true },
  dmg: ({ attr, talent, calc, cons }, { heal }) => {
    let e1 = calc(attr.hp) / 100 * talent.e['治疗量2'][0]
    let e2 = talent.e['治疗量2'][1] * 1
    let hp = calc(attr.hp) * 0.045
    let cons2 = cons * 1 >= 2 ? 1 : 0
    let zll = e1 + e2 + hp * cons2
    return heal(zll)
  }
},
{
  title: '心夜万芙 开Q普攻三段',
  dmgKey: 'a',
  params: { teamA: true },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: '心莫万夜 开Q重击',
  dmgKey: 'z',
  params: { teamA: true },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}]