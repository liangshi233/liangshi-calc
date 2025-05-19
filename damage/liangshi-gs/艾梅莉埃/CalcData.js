import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'

let CharacterName = "艾梅莉埃"
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1q1Dmg = { avg: 0, dmg: 0 }
let T1t1Dmg = { avg: 0, dmg: 0 }
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qNameT}后${TalentName.aName}一段伤害`,
  params: { BurstAfter: 3, NormalElement: 1, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qNameT}后${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, BurstAfter: 3, NormalElement: 2, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qNameT}后${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, BurstAfter: 3, NormalElement: 3, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4, phy: true },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qNameT}后${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4, BurstAfter: 3, NormalElement: 4, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, phy: true },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${TalentName.qNameT}后${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, BurstAfter: 3, NormalElement: 1, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
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
  title: `${TalentName.eName}释放伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}一阶伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e')
},
{
  title: `${TalentName.eName}一阶激化`,
  params: { BurningDetermine: false, GrassAttachment: true, FireAttachment: false, SkillsUse: 1, SkillsHit: 7, SkillsDmg: 7 },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e', 'spread')
},
{
  title: `${TalentName.eName}完整伤害`,
  params: { BurningDetermine: false, SkillsUse: 1, SkillsHit: 7, SkillsDmg: 7 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e')
    return {
      dmg: e1.dmg * 14,
      avg: e1.avg * 14
    }
  }
},
{
  title: `${TalentName.eName}二阶单枚伤害`,
  params: { SkillsUse: 1, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·二阶攻击伤害2'][0], 'e')
},
{
  title: `${TalentName.eName}完整燃烧伤害`,
  params: { SkillsUse: 1, SkillsHit: 11, SkillsDmg: 11 },
  dmgKey: 'e',
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e3 = basic(calc(attr.atk) * 500 / 100, '')
    return {
      dmg: e1.dmg * (cons >= 1 ? 1 : 2) + e2.dmg * (cons >= 1 ? 13 : 12) * 2 + e3.dmg * 2 * (cons >= 1 ? 2 : 1),
      avg: e1.avg * (cons >= 1 ? 1 : 2) + e2.avg * (cons >= 1 ? 13 : 12) * 2 + e3.avg * 2 * (cons >= 1 ? 2 : 1)
    }
  }
},
{
  title: '浸析伤害',
  params: { SkillsUse: 1, SkillsHit: 8, SkillsDmg: 8 },
  dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 500 / 100, '')
},
{
  title: `${TalentName.eName}三阶伤害`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
},
{
  title: `${TalentName.eName}三阶激化`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, BurningDetermine: false, GrassAttachment: true, FireAttachment: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q', 'spread')
},
{
  title: `${TalentName.qName}完整伤害`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, BurningDetermine: false },
  dmg: ({ talent , cons }, dmg) => {
    let q1 = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
    let cons4 = cons >= 4 ? 12 : 4
    return {
      dmg: q1.dmg * cons4,
      avg: q1.avg * cons4
    }
  }
},
{
  title: `${TalentName.qName}完整激化`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2, BurningDetermine: false, GrassAttachment: true, FireAttachment: false },
  dmg: ({ talent , cons }, dmg) => {
    let q1 = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
    let q2 = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q', 'spread')
    let cons4 = cons >= 4 ? 7 : 2
    let consj4 = cons >= 4 ? 5 : 2
    return {
      dmg: q1.dmg * cons4 + q2.dmg * consj4,
      avg: q1.avg * cons4 + q2.avg * consj4
    }
  }
},
{
  title: `${TalentName.qName}完整燃烧伤害`,
  params: { BurstUse: 1, BurstHit: 2, BurstDmg: 2 },
  dmgKey: 'q',
  dmg: ({ talent , cons }, dmg) => {
    let q1 = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
    let cons4 = cons >= 4 ? 12 : 4
    return {
      dmg: q1.dmg * cons4,
      avg: q1.avg * cons4
    }
  }
},
{
  title: '燃烧反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('burning')
},
{
  title: '单人站场14秒',
  params: ({ cons }) => ({ NormalElement: cons >= 6 ? 4 : 0, BurningDetermine: false, GrassAttachment: true, FireAttachment: false, NormalUse: 16, NormalHit: 16, NormalDmg: 16, SkillsUse: 1, SkillsHit: cons >= 6 ? 11 : 5, SkillsDmg: cons >= 6 ? 11 : 5, BurstUse: 1, BurstHit: cons >= 6 ? 12 : 4, BurstDmg: cons >= 6 ? 12 : 4 }),
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e')
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e3 = basic(calc(attr.atk) * 500 / 100, '')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = (cons >= 6 ? (e2.dmg * 4 * 2 + e1.dmg) : (e1.dmg * 5)) + e3.dmg * (cons >= 6 ? 1 : 0) + e0.dmg
    let eAvg = (cons >= 6 ? (e2.avg * 4 * 2 + e1.avg) : (e1.avg * 5)) + e3.avg * (cons >= 6 ? 1 : 0) + e0.avg
    let qDmg = q1.dmg * (cons >= 4 ? 12 : 4)
    let qAvg = q1.avg * (cons >= 4 ? 12 : 4)
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人站场14秒激化',
  params: ({ cons }) => ({ NormalElement: cons >= 6 ? 4 : 0, BurningDetermine: false, GrassAttachment: true, FireAttachment: false, NormalUse: 16, NormalHit: 16, NormalDmg: 16, SkillsUse: 1, SkillsHit: cons >= 6 ? 11 : 6, SkillsDmg: cons >= 6 ? 11 : 5, BurstUse: 1, BurstHit: cons >= 6 ? 12 : 4, BurstDmg: cons >= 6 ? 12 : 4 }),
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a', 'spread')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a', 'spread')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e', 'spread')
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e', 'spread')
    let e3 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e4 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e', 'spread')
    let e5 = basic(calc(attr.atk) * 500 / 100, '', 'spread')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let q2 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q', 'spread')
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = (cons >= 6 ? (e2.dmg + e4.dmg * 2 + e3.dmg * 6) : (e1.dmg * 2 + e2.dmg * 3)) + e0.dmg + e5.dmg * (cons >= 6 ? 1 : 0)
    let eAvg = (cons >= 6 ? (e2.avg + e4.avg * 2 + e3.avg * 6) : (e1.avg * 2 + e2.avg * 3)) + e0.avg + e5.avg * (cons >= 6 ? 1 : 0)
    let qDmg = q1.dmg * (cons >= 4 ? 8 : 2) + q2.dmg * (cons >= 4 ? 4 : 2)
    let qAvg = q1.avg * (cons >= 4 ? 8 : 2) + q2.avg * (cons >= 4 ? 4 : 2)
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人站场14秒燃烧',
  params: ({ cons }) => ({ NormalElement: cons >= 6 ? 4 : 0, SkillsUse: 1, SkillsHit: cons >= 6 ? 16 : 11, SkillsDmg: cons >= 6 ? 16 : 11, BurstUse: 1, BurstHit: cons >= 6 ? 12 : 4, BurstDmg: cons >= 6 ? 12 : 4 }),
  dmgKey: 'dph',
  dmg: ({ talent, calc, attr, cons }, { basic, reaction }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e3 = basic(calc(attr.atk) * 500 / 100, '')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let rs = reaction('burning')
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = e2.dmg * 5 * 2 + e3.dmg * (cons >= 1 ? (cons >= 6 ? 5 : 3) : 1) + e0.dmg
    let eAvg = e2.avg * 5 * 2 + e3.avg * (cons >= 1 ? (cons >= 6 ? 5 : 3) : 1) + e0.avg
    let qDmg = q1.dmg * (cons >= 4 ? 12 : 4)
    let qAvg = q1.avg * (cons >= 4 ? 12 : 4)
    return {
      dmg: aDmg + eDmg + qDmg + rs.avg * 4 * 14,
      avg: aAvg + eAvg + qAvg + rs.avg * 4 * 14
    }
  }
},
{
  title: '单人循环流畅度',
  params: ({ cons }) => ({ NormalElement: cons >= 6 ? 4 : 0, SkillsUse: 1, SkillsHit: cons >= 6 ? 16 : 11, SkillsDmg: cons >= 6 ? 16 : 11, BurstUse: 1, BurstHit: cons >= 6 ? 12 : 4, BurstDmg: cons >= 6 ? 12 : 4 }),
  dmg: ({ attr, weapon, artis }) => {
    let a = EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 1, 5, 16)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  title: '单人站场DPS',
  params: ({ cons }) => ({ NormalElement: cons >= 6 ? 4 : 0, BurningDetermine: false, GrassAttachment: true, FireAttachment: false, NormalUse: 16, NormalHit: 16, NormalDmg: 16, SkillsUse: 1, SkillsHit: cons >= 6 ? 11 : 5, SkillsDmg: cons >= 6 ? 11 : 5, BurstUse: 1, BurstHit: cons >= 6 ? 12 : 4, BurstDmg: cons >= 6 ? 12 : 4 }),
  dmg: ({ talent, calc, attr, cons, weapon, artis }, { basic }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e')
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e3 = basic(calc(attr.atk) * 500 / 100, '')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 1, 5, 16))
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = (cons >= 6 ? (e2.dmg * 4 * 2 + e1.dmg) : (e1.dmg * 5)) + e3.dmg * (cons >= 6 ? 1 : 0) + e0.dmg
    let eAvg = (cons >= 6 ? (e2.avg * 4 * 2 + e1.avg) : (e1.avg * 5)) + e3.avg * (cons >= 6 ? 1 : 0) + e0.avg
    let qDmg = q1.dmg * (cons >= 4 ? 12 : 4) * qcn
    let qAvg = q1.avg * (cons >= 4 ? 12 : 4) * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 14,
      avg: (aAvg + eAvg + qAvg) / 14
    }
  }
},
{
  title: '单人站场DPS激化',
  params: ({ cons }) => ({ NormalElement: cons >= 6 ? 4 : 0, BurningDetermine: false, GrassAttachment: true, FireAttachment: false, NormalUse: 16, NormalHit: 16, NormalDmg: 16, SkillsUse: 1, SkillsHit: cons >= 6 ? 11 : 6, SkillsDmg: cons >= 6 ? 11 : 5, BurstUse: 1, BurstHit: cons >= 6 ? 12 : 4, BurstDmg: cons >= 6 ? 12 : 4 }),
  dmg: ({ talent, calc, attr, cons, weapon, artis }, { basic }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a', 'spread')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a', 'spread')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e', 'spread')
    let e1 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·一阶攻击伤害'] / 100, 'e', 'spread')
    let e3 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e4 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e', 'spread')
    let e5 = basic(calc(attr.atk) * 500 / 100, '', 'spread')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let q2 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q', 'spread')
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 1, 5, 16))
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = (cons >= 6 ? (e2.dmg + e4.dmg * 2 + e3.dmg * 6) : (e1.dmg * 2 + e2.dmg * 3)) + e0.dmg + e5.dmg * (cons >= 6 ? 1 : 0)
    let eAvg = (cons >= 6 ? (e2.avg + e4.avg * 2 + e3.avg * 6) : (e1.avg * 2 + e2.avg * 3)) + e0.avg + e5.avg * (cons >= 6 ? 1 : 0)
    let qDmg = q1.dmg * (cons >= 4 ? 8 : 2) + q2.dmg * (cons >= 4 ? 4 : 2) * qcn
    let qAvg = q1.avg * (cons >= 4 ? 8 : 2) + q2.avg * (cons >= 4 ? 4 : 2) * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 14,
      avg: (aAvg + eAvg + qAvg) / 14
    }
  }
},
{
  title: '单人站场DPS燃烧',
  params: ({ cons }) => ({ NormalElement: cons >= 6 ? 4 : 0, SkillsUse: 1, SkillsHit: cons >= 6 ? 16 : 11, SkillsDmg: cons >= 6 ? 16 : 11, BurstUse: 1, BurstHit: cons >= 6 ? 12 : 4, BurstDmg: cons >= 6 ? 12 : 4 }),
  dmgKey: 'dps',
  dmg: ({ talent, calc, attr, cons, weapon, artis }, { basic, reaction }) => {
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a1c = basic(calc(attr.atk) * (talent.a['一段伤害'] + 300) / 100, 'a')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a2c = basic(calc(attr.atk) * (talent.a['二段伤害'] + 300) / 100, 'a')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a3c = basic(calc(attr.atk) * (talent.a['三段伤害'] + 300) / 100, 'a')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let a4c = basic(calc(attr.atk) * (talent.a['四段伤害'] + 300) / 100, 'a')
    let e0 = basic(calc(attr.atk) * talent.e['技能伤害'] / 100, 'e')
    let e2 = basic(calc(attr.atk) * talent.e['柔灯之匣·二阶攻击伤害2'][0] / 100, 'e')
    let e3 = basic(calc(attr.atk) * 500 / 100, '')
    let q1 = basic(calc(attr.atk) * talent.q['柔灯之匣·三阶攻击伤害'] / 100, 'q')
    let rs = reaction('burning')
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 1, 5, 16))
    let aDmg = (a1.dmg + a2.dmg + a3.dmg + a4.dmg) * (cons >= 6 ? 3 : 4) + (a1c.dmg + a2c.dmg + a3c.dmg + a4c.dmg) * (cons >= 6 ? 1 : 0)
    let aAvg = (a1.avg + a2.avg + a3.avg + a4.avg) * (cons >= 6 ? 3 : 4) + (a1c.avg + a2c.avg + a3c.avg + a4c.avg) * (cons >= 6 ? 1 : 0)
    let eDmg = e2.dmg * 5 * 2 + e3.dmg * (cons >= 1 ? (cons >= 6 ? 5 : 3) : 1) + e0.dmg * qcn
    let eAvg = e2.avg * 5 * 2 + e3.avg * (cons >= 1 ? (cons >= 6 ? 5 : 3) : 1) + e0.avg * qcn
    let qDmg = q1.dmg * (cons >= 4 ? 12 : 4)
    let qAvg = q1.avg * (cons >= 4 ? 12 : 4)
    return {
      dmg: (aDmg + eDmg + qDmg + rs.avg * 4 * 14) / 14,
      avg: (aAvg + eAvg + qAvg + rs.avg * 4 * 14) / 14
    }
  }
},
{
  title: `阿千艾钟 ${TalentName.eNameT}释放伤害`, //默认角色挂在后台，护盾永续，强制目标燃烧
  params: { Lingering_Fragrance: true, ShieldTime: 12, FightTime: 2, BurningDetermine: true, GrassAttachment: true, FireAttachment: true, ElementSame: 1, ElementDifferent: 3, ElementFireTeam: 1, ElementGrassTeam: 1, ElementRockTeam: 2, TeamRockDmg: 20, FontaineTeammate: 1, LiyueTeammate: 1, EnergyTeammate: 200, PrimordialDetermine: true, Chiori: true, Arlecchino: true, Zhong_Li: true, team: true },
  dmg: ({ talent }, dmg) => {
    T1e1Dmg = dmg(talent.e['技能伤害'], 'e')
    return T1e1Dmg
  }
},
{
  title: `阿千艾钟 ${TalentName.eNameT}二阶单枚伤害`, //默认角色挂在后台，护盾永续，强制目标燃烧
  dmgKey: 'e',
  params: { Lingering_Fragrance: true, ShieldTime: 12, TruceTime: 5, BurningDetermine: true, GrassAttachment: true, FireAttachment: true, ElementSame: 1, ElementDifferent: 3, ElementFireTeam: 1, ElementGrassTeam: 1, ElementRockTeam: 2, TeamRockDmg: 20, FontaineTeammate: 1, LiyueTeammate: 1, EnergyTeammate: 200, PrimordialDetermine: true, Chiori: true, Arlecchino: true, Zhong_Li: true, team: true },
  dmg: ({ talent, uid, weapon, artis }, dmg) => {
    T1e2Dmg = dmg(talent.e['柔灯之匣·二阶攻击伤害2'][0], 'e')
    return T1e2Dmg
  }
},
{
  title: `阿千艾钟 ${TalentName.eNameT}三阶伤害`,
  params: { ShieldTime: 12, TruceTime: 5, BurningDetermine: true, GrassAttachment: true, FireAttachment: true, ElementSame: 1, ElementDifferent: 3, ElementFireTeam: 1, ElementGrassTeam: 1, ElementRockTeam: 2, TeamRockDmg: 20, FontaineTeammate: 1, LiyueTeammate: 1, EnergyTeammate: 200, PrimordialDetermine: true, Chiori: true, Arlecchino: true, Zhong_Li: true, team: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => {
    T1q1Dmg = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
    return T1q1Dmg
  }
},
{
  title: '阿千艾钟 浸析伤害',
  params: { Lingering_Fragrance: true, ShieldTime: 12, TruceTime: 5, BurningDetermine: true, GrassAttachment: true, FireAttachment: true, ElementSame: 1, ElementDifferent: 3, ElementFireTeam: 1, ElementGrassTeam: 1, ElementRockTeam: 2, TeamRockDmg: 20, FontaineTeammate: 1, LiyueTeammate: 1, EnergyTeammate: 200, PrimordialDetermine: true, Chiori: true, Arlecchino: true, Zhong_Li: true, team: true },
  dmg: ({ calc, attr, level, cons, talent, weapon, artis, uid }, { basic }) => {
    T1t1Dmg = basic(calc(attr.atk) * 500 / 100, '')
    let TData = {base:{Tcharacter:{level, cons, talent}, artis, weapon}, dmg:{T1:{T1e1Dmg, T1e2Dmg, T1q1Dmg, T1t1Dmg}, T2:{}}}
    recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
    return T1t1Dmg
  }
}]