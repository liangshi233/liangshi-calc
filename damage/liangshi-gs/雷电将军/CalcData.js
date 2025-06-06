import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { ObTalentName } from '../index.js'

let CharacterName = "雷电将军"
let q1Dmg = { dmg: 0 , avg: 0 }
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
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
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5, phy: true },
  dmg: ({ talent }, dmg) => {
    let a4 = dmg(talent.a['四段伤害2'][0], 'a', 'phy')
    return {
      dmg: a4.dmg * 2,
      avg: a4.avg * 2
    }
  }
},
{
  title: `${TalentName.aName}五段伤害`,
  params: { NormalUse: 5, NormalHit: 6, NormalDmg: 6, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
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
  title: `${TalentName.eName}协同攻击`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['协同攻击伤害'], 'e')
},
{
  title: `${TalentName.eName}完整伤害`,
  params: { SkillsUse: 1, SkillsHit: 20, SkillsDmg: 20 },
  dmg: ({ talent }, dmg) => {
    let e1Dmg = dmg(talent.e['技能伤害'], 'e')
    let e2Dmg = dmg(talent.e['协同攻击伤害'], 'e')
    return {
      dmg: e1Dmg.dmg + e2Dmg.dmg * 25,
      avg: e1Dmg.avg + e2Dmg.dmg * 25
    }
  }
},
{
  title: '超绽放伤害',
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('hyperBloom')
},
{
  title: `零愿力${TalentName.qName}`,
  params: { Musou_Isshin: 0, Resolve: 0, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q')
},
{
  title: `满愿力${TalentName.qName}`,
  dmgKey: 'q',
  params: { Musou_Isshin: 0, Resolve: 60, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q')
},
{
  title: `满愿力${TalentName.qName}激化`,
  params: { GrassAttachment: true, Musou_Isshin: 0, Resolve: 60, EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q','aggravate')
},
{
  title: `零愿力${TalentName.qNameT}后${TalentName.aName}一段`,
  params: { Musou_Isshin: 1, Resolve: 0, BurstUse: 1, BurstHit: 2, BurstDmg: 2, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['一段伤害'], 'q')
},
{
  title: `满愿力${TalentName.qNameT}后${TalentName.aName}一段`,
  params: { Musou_Isshin: 1, Resolve: 60, BurstUse: 1, BurstHit: 2, BurstDmg: 2, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['一段伤害'], 'q')
},
{
  title: `零愿力${TalentName.qNameT}后${TalentName.aName}二段`,
  params: { Musou_Isshin: 1, Resolve: 0, BurstUse: 1, BurstHit: 3, BurstDmg: 3, NormalUse: 2, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['二段伤害'], 'q')
},
{
  title: `满愿力${TalentName.qNameT}后${TalentName.aName}二段`,
  params: { Musou_Isshin: 1, Resolve: 60, BurstUse: 1, BurstHit: 3, BurstDmg: 3, NormalUse: 2, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['二段伤害'], 'q')
},
{
  title: `零愿力${TalentName.qNameT}后${TalentName.aName}三段`,
  params: { Musou_Isshin: 1, Resolve: 0, BurstUse: 1, BurstHit: 4, BurstDmg: 4, NormalUse: 3, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['三段伤害'], 'q')
},
{
  title: `满愿力${TalentName.qNameT}后${TalentName.aName}三段`,
  params: { Musou_Isshin: 1, Resolve: 60, BurstUse: 1, BurstHit: 4, BurstDmg: 4, NormalUse: 3, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['三段伤害'], 'q')
},
{
  title: `零愿力${TalentName.qNameT}后${TalentName.aName}四段`,
  params: { Musou_Isshin: 1, Resolve: 0, BurstUse: 1, BurstHit: 6, BurstDmg: 6, NormalUse: 4, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => {
    let qa4 = dmg(talent.q['四段伤害2'][0], 'q')
    return {
      dmg: qa4.dmg * 2,
      avg: qa4.avg * 2
    }
  }
},
{
  title: `满愿力${TalentName.qNameT}后${TalentName.aName}四段`,
  params: { Musou_Isshin: 1, Resolve: 60, BurstUse: 1, BurstHit: 6, BurstDmg: 6, NormalUse: 4, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => {
    let qa4 = dmg(talent.q['四段伤害2'][0], 'q')
    return {
      dmg: qa4.dmg * 2 ,
      avg: qa4.avg * 2
    }
  }
},
{
  title: `零愿力${TalentName.qNameT}后${TalentName.aName}五段`,
  params: { Musou_Isshin: 1, Resolve: 0, BurstUse: 1, BurstHit: 7, BurstDmg: 7, NormalUse: 5, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => dmg(talent.q['五段伤害'], 'q')
},
{
  title: `满愿力${TalentName.qNameT}后${TalentName.aName}五段`,
  params: { Musou_Isshin: 1, Resolve: 60, BurstUse: 1, BurstHit: 7, BurstDmg: 7, NormalUse: 5, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.q['五段伤害'], 'q')
},
{
  title: `零愿力${TalentName.qNameT}后${TalentName.a2Name}`,
  params: { Musou_Isshin: 1, Resolve: 0, BurstUse: 1, BurstHit: 3, BurstDmg: 3, ChargedUse: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg) => {
    let qz1 = dmg(talent.q['重击伤害2'][0], 'q')
    let qz2 = dmg(talent.q['重击伤害'][1], 'q')
    return {
      dmg: qz1.dmg + qz2.dmg,
      avg: qz1.avg + qz2.avg
    }
  }
},
{
  title: `满愿力${TalentName.qNameT}后${TalentName.a2Name}`,
  params: { Musou_Isshin: 1, Resolve: 60, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, BurstUse: 1, BurstHit: 4, BurstDmg: 4, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let qz1 = dmg(talent.q['重击伤害2'][0], 'q')
    let qz2 = dmg(talent.q['重击伤害'][1], 'q')
    return {
      dmg: qz1.dmg + qz2.dmg,
      avg: qz1.avg + qz2.avg
    }
  }
},
{
  title: `满愿力${TalentName.qNameT}后${TalentName.a2Name}激化`,
  params: { GrassAttachment: true, Musou_Isshin: 1, Resolve: 60, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, BurstUse: 1, BurstHit: 4, BurstDmg: 4, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg) => {
    let qzj1 = dmg(talent.q['重击伤害2'][0], 'q', 'aggravate')
    let qzj2 = dmg(talent.q['重击伤害2'][1], 'q')
    return {
      dmg: qzj1.dmg + qzj2.dmg,
      avg: qzj1.avg + qzj2.avg
    }
  }
},
{
  title: `${TalentName.qName}单次能量恢复`,
  params: { Musou_Isshin: 0, Resolve: 8, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1 },
  dmgKey: 'f',
  dmg: ({ talent, calc, attr }, dmg) => {
    q1Dmg = dmg(talent.q['梦想一刀基础伤害'], 'q')
    return {
      avg: Format.number(talent.q['梦想一心能量恢复'] * (1 + ((calc(attr.recharge) - 100) * 0.006))),
      type: 'text'
    }
  }
},
{
  title: '单人站场18秒',
  params: { Musou_Isshin: 1, Resolve: 8, SkillsUse: 1, SkillsHit: 7, SkillsDmg: 7, BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyUse: 1, NormalUse: 14, NormalHit: 6, NormalDmg: 6 },
  dmgKey: 'dph',
  dmg: ({ talent }, dmg) => {
    let a1Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2Dmg = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3Dmg = dmg(talent.a['三段伤害'], 'a', 'phy')
    let a4Dmg = dmg(talent.a['四段伤害2'][0], 'a', 'phy')
    let a5Dmg = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1Dmg = dmg(talent.e['技能伤害'], 'e')
    let e2Dmg = dmg(talent.e['协同攻击伤害'], 'e')
    let qa1Dmg = dmg(talent.q['一段伤害'], 'q')
    let qa2Dmg = dmg(talent.q['二段伤害'], 'q')
    let qa3Dmg = dmg(talent.q['三段伤害'], 'q')
    let qa4Dmg = dmg(talent.q['四段伤害2'][0], 'q')
    let qa4Dmg2 = dmg(talent.q['四段伤害2'][1], 'q')
    let qa5Dmg = dmg(talent.q['五段伤害'], 'q')
    let aDmg = a1Dmg.dmg * 3 + a2Dmg.dmg * 3 + a3Dmg.dmg * 3 + a4Dmg.dmg * 2 * 2 + a5Dmg.dmg * 2
    let aAvg = a1Dmg.avg * 3 + a2Dmg.avg * 3 + a3Dmg.avg * 3 + a4Dmg.avg * 2 * 2 + a5Dmg.avg * 2
    let eDmg = e1Dmg.dmg + e2Dmg.dmg * 13
    let eAvg = e1Dmg.avg + e2Dmg.avg * 13
    let qDmg = q1Dmg.dmg + 3 * (qa1Dmg.dmg + qa2Dmg.dmg + qa3Dmg.dmg + qa4Dmg.dmg + qa4Dmg2.dmg + qa5Dmg.dmg)
    let qAvg = q1Dmg.avg + 3 * (qa1Dmg.avg + qa2Dmg.avg + qa3Dmg.avg + qa4Dmg.avg + qa4Dmg2.avg + qa5Dmg.avg)
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人循环流畅度',
  params: { Musou_Isshin: 1, Resolve: 8, SkillsUse: 1, SkillsHit: 7, SkillsDmg: 7, BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyUse: 1, NormalUse: 14, NormalHit: 6, NormalDmg: 6 },
  dmg: ({ talent, calc, attr, weapon, artis }) => {
    let ConsRestore = talent.q['梦想一心能量恢复'] * (1 + ((calc(attr.recharge) - 100) * 0.006)) * 5
    let a = EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, 0, 1, 13, 13)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  title: '单人站场DPS',
  params: { Musou_Isshin: 1, Resolve: 8, SkillsUse: 1, SkillsHit: 7, SkillsDmg: 7, BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyUse: 1, NormalUse: 14, NormalHit: 6, NormalDmg: 6 },
  dmgKey: 'dps',
  dmg: ({ talent, calc, attr, weapon, artis }, dmg) => {
    let a1Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2Dmg = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3Dmg = dmg(talent.a['三段伤害'], 'a', 'phy')
    let a4Dmg = dmg(talent.a['四段伤害2'][0], 'a', 'phy')
    let a5Dmg = dmg(talent.a['五段伤害'], 'a', 'phy')
    let e1Dmg = dmg(talent.e['技能伤害'], 'e')
    let e2Dmg = dmg(talent.e['协同攻击伤害'], 'e')
    let qa1Dmg = dmg(talent.q['一段伤害'], 'q')
    let qa2Dmg = dmg(talent.q['二段伤害'], 'q')
    let qa3Dmg = dmg(talent.q['三段伤害'], 'q')
    let qa4Dmg = dmg(talent.q['四段伤害2'][0], 'q')
    let qa4Dmg2 = dmg(talent.q['四段伤害2'][1], 'q')
    let qa5Dmg = dmg(talent.q['五段伤害'], 'q')
    let ConsRestore = talent.q['梦想一心能量恢复'] * (1 + ((calc(attr.recharge) - 100) * 0.006)) * 5
    let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, ConsRestore, 0, 0, 1, 13, 13)), 1)
    let aDmg = a1Dmg.dmg * 3 + a2Dmg.dmg * 3 + a3Dmg.dmg * 3 + a4Dmg.dmg * 2 * 2 + a5Dmg.dmg * 2
    let aAvg = a1Dmg.avg * 3 + a2Dmg.avg * 3 + a3Dmg.avg * 3 + a4Dmg.avg * 2 * 2 + a5Dmg.avg * 2
    let eDmg = e1Dmg.dmg + e2Dmg.dmg * 13
    let eAvg = e1Dmg.avg + e2Dmg.avg * 13
    let qDmg = (q1Dmg.dmg + 3 * (qa1Dmg.dmg + qa2Dmg.dmg + qa3Dmg.dmg + qa4Dmg.dmg + qa4Dmg2.dmg + qa5Dmg.dmg)) * qcn
    let qAvg = (q1Dmg.avg + 3 * (qa1Dmg.avg + qa2Dmg.avg + qa3Dmg.avg + qa4Dmg.avg + qa4Dmg2.avg + qa5Dmg.avg)) * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 18,
      avg: (aAvg + eAvg + qAvg) / 18
    }
  }
}]