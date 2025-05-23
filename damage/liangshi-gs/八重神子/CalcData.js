import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "八重神子"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.aName}一段激化`,
  params: { GrassAttachment: true, NormalElement: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'aggravate')
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.aName}二段激化`,
  params: { GrassAttachment: true, NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'aggravate')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, NormalElement: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.aName}三段激化`,
  params: { GrassAttachment: true, NormalUse: 3, NormalHit: 3, NormalDmg: 3, NormalElement: 3 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'aggravate')
},
{
  title: `${TalentName.a2Name}单段伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.a2Name}单段激化`,
  params: { GrassAttachment: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'aggravate')
},
{
  title: `${TalentName.a3Name}期间伤害`,
  params: { PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
},
{
  title: `低空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: `高空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3 },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  check: ({ cons }) => cons < 2,
  title: `壹阶${TalentName.eName}伤害`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·壹阶'], 'e')
},
{
  check: ({ cons }) => cons < 2,
  title: `壹阶${TalentName.eName}激化`,
  params: { GrassAttachment: true },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·壹阶'], 'e', 'aggravate')
},
{
  title: `贰阶${TalentName.eName}伤害`,
  params: { SkillsUse: 2, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·贰阶'], 'e')
},
{
  title: `贰阶${TalentName.eName}激化`,
  params: { GrassAttachment: true, SkillsUse: 2, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·贰阶'], 'e', 'aggravate')
},
{
  title: `叁阶${TalentName.eName}伤害`,
  params: { SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·叁阶'], 'e')
},
{
  title: `叁阶${TalentName.eName}激化`,
  params: { GrassAttachment: true, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6 },
  dmgKey: 'e',
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
},
{
  check: ({ cons }) => cons >= 2,
  title: `肆阶${TalentName.eName}伤害`,
  params: { SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6 },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·肆阶'], 'e')
},
{
  check: ({ cons }) => cons >= 2,
  title: `肆阶${TalentName.eName}激化`,
  params: { GrassAttachment: true, SkillsUse: 3, SkillsHit: 6, SkillsDmg: 6 },
  dmgKey: 'e',
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate')
},
{
  title: `满阶${TalentName.eNameT}完整伤害`,
  params: { SkillsUse: 3, SkillsHit: 8, SkillsDmg: 8 },
  dmg: ({ talent, cons }, dmg) => {
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    return {
      dmg: e1.dmg * 15,
      avg: e1.avg * 15
    }
  }
},
{
  title: `满阶${TalentName.eNameT}完整激化`,
  params: { GrassAttachment: true, SkillsUse: 3, SkillsHit: 8, SkillsDmg: 8 },
  dmg: ({ talent, cons }, dmg) => {
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let e2 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate') : dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
    return {
      dmg: e1.dmg * 10 + e2.dmg * 5,
      avg: e1.avg * 10 + e2.avg * 5
    }
  }
},
{
  title: `${TalentName.qName}伤害`,
  params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}激化`,
  params: { GrassAttachment: true, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
},
{
  title: '天狐霆雷伤害',
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q')
},
{
  title: '天狐霆雷激化',
  params: { GrassAttachment: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
},
{
  title: `${TalentName.qName}完整伤害`,
  params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q')
    return {
      dmg: q1.dmg + q2.dmg * 3,
      avg: q1.avg + q2.avg * 3
    }
  }
},
{
  title: `${TalentName.qName}完整激化`,
  params: { GrassAttachment: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
    return {
      dmg: q1.dmg + q2.dmg * 3,
      avg: q1.avg + q2.avg * 3
    }
  }
},
{
  title: '超绽放伤害',
  params: { NormalUse: 12, NormalHit: 12, NormalDmg: 12, SkillsUse: 3, SkillsHit: 10, SkillsDmg: 10, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('hyperBloom')
},
{
  title: '单人站场22秒',
  params: { NormalUse: 12, NormalHit: 12, NormalDmg: 12, SkillsUse: 3, SkillsHit: 10, SkillsDmg: 10, BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmg: ({ talent, cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q')
    let aDmg = (a1.dmg + a2.dmg + a3.dmg) * 8
    let aAvg = (a1.avg + a2.avg + a3.avg) * 8
    let eDmg = e1.dmg * 18
    let eAvg = e1.avg * 18
    let qDmg = q1.dmg + q2.dmg * 3
    let qAvg = q1.avg + q2.avg * 3
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人站场22秒激化',
  params: { GrassAttachment: true, NormalUse: 12, NormalHit: 12, NormalDmg: 12, SkillsUse: 3, SkillsHit: 10, SkillsDmg: 10, BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmgKey: 'dph',
  dmg: ({ talent, cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'aggravate')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let aj3 = dmg(talent.a['三段伤害'], 'a', 'aggravate')
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let e2 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate') : dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
    let aDmg = (a1.dmg + a2.dmg) * 8 + a3.dmg * 6 + aj3.dmg * 2
    let aAvg = (a1.avg + a2.avg) * 8 + a3.avg * 6 + aj3.dmg * 2
    let eDmg = e1.dmg * 12 + e2.dmg * 6
    let eAvg = e1.avg * 12 + e2.avg * 6
    let qDmg = q1.dmg + q2.dmg * 3
    let qAvg = q1.avg + q2.avg * 3
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
 	title: '单人循环流畅度',
  params: { NormalUse: 12, NormalHit: 12, NormalDmg: 12, SkillsUse: 3, SkillsHit: 10, SkillsDmg: 10, BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmg: ({ attr, weapon, cons, artis }) => {
    let ConsRestore = cons >= 1 ? (8 * 3) : 0
    let a = EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, 0, 3, 6, 24)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  title: '单人站场DPS',
  params: { NormalUse: 12, NormalHit: 12, NormalDmg: 12, SkillsUse: 3, SkillsHit: 10, SkillsDmg: 10, BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmg: ({ talent, calc, attr, weapon, cons, artis }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q')
    let ConsRestore = cons >= 1 ? (8 * 3) : 0
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, 0, 3, 6, 24))
    let aDmg = (a1.dmg + a2.dmg + a3.dmg) * 8
    let aAvg = (a1.avg + a2.avg + a3.avg) * 8
    let eDmg = e1.dmg * 18
    let eAvg = e1.avg * 18
    let qDmg = (q1.dmg + q2.dmg * 3) * qcn
    let qAvg = (q1.avg + q2.avg * 3) * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 22,
      avg: (aAvg + eAvg + qAvg) / 22
    }
  }
},
{
  title: '单人站场DPS激化',
  dmgKey: 'dps',
  params: { GrassAttachment: true, NormalUse: 12, NormalHit: 12, NormalDmg: 12, SkillsUse: 3, SkillsHit: 10, SkillsDmg: 10, BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
  dmg: ({ talent, calc, attr, weapon, cons, artis }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'aggravate')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let aj3 = dmg(talent.a['三段伤害'], 'a', 'aggravate')
    let e1 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e') : dmg(talent.e['杀生樱伤害·叁阶'], 'e')
    let e2 = cons * 1 >= 2 ? dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate') : dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
    let q1 = dmg(talent.q['技能伤害'], 'q', 'aggravate')
    let q2 = dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
    let ConsRestore = cons >= 1 ? (8 * 3) : 0
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, 0, 3, 6, 24))
    let aDmg = (a1.dmg + a2.dmg) * 8 + a3.dmg * 6 + aj3.dmg * 2
    let aAvg = (a1.avg + a2.avg) * 8 + a3.avg * 6 + aj3.dmg * 2
    let eDmg = e1.dmg * 12 + e2.dmg * 6
    let eAvg = e1.avg * 12 + e2.avg * 6
    let qDmg = (q1.dmg + q2.dmg * 3) * qcn
    let qAvg = (q1.avg + q2.avg * 3) * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 22,
      avg: (aAvg + eAvg + qAvg) / 22
    }
  }
}]


