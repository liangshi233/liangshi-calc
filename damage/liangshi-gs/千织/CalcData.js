import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'

let CharacterName = "千织"
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1e3Dmg = { avg: 0, dmg: 0 }
let T1e4Dmg = { avg: 0, dmg: 0 }
let T1q1Dmg = { avg: 0, dmg: 0 }
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
  title: `${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段`,
  params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, NormalUse: 1, NormalHit: 1, NormalDmg: 1, NormalElement: 1, RockDmg: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段`,
  params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2, RockDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段`,
  params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, NormalUse: 3, NormalHit: 4, NormalDmg: 4, NormalElement: 4, RockDmg: 5 },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['三段伤害'] / 2, 'a')
    return {
      dmg: a1.dmg * 2,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}四段`,
  params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, NormalUse: 4, NormalHit: 5, NormalDmg: 5, NormalElement: 5, RockDmg: 7 },
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, phy: true },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2, 'a2', 'phy')
    return {
      dmg: a1.dmg * 2,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}`,
  dmgKey: 'z',
  params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, ChargedUse: 1, ChargedHit: 2, ChargedDmg: 2, RockDmg: 4 },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2, 'a2')
    return {
      dmg: a1.dmg * 2,
      avg: a1.avg * 2
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
  title: `${TalentName.eNameT}后低空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, RockDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害2'][0], 'a3')
},
{
  title: `${TalentName.eNameT}后高空${TalentName.a3Name}伤害`,
  params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, RockDmg: 3 },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害2'][1], 'a3')
},
{
  title: `${TalentName.eName}释放伤害`,
  params: { RockDmg: 1 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
},
{
  title: `${TalentName.eName}人偶伤害`,
  params: { RockDmg: 3, SkillsUse: 2, SkillsHit: 3, SkillsDmg: 3 },
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
},
{
  title: `后台${TalentName.eName}人偶伤害`, // 使用元素战技切换至后台也视为主动释放一次元素战技
  params: { TruceTime: 6, SkillsUse: 2, SkillsHit: 3, SkillsDmg: 3, RockDmg: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
},
{
  check: ({ cons }) => cons >= 2,
  title: `${TalentName.c2Name}人偶切斩伤害`,
  params: { RockDmg: 5, TruceTime: 6, SkillsUse: 2, SkillsHit: 5, SkillsDmg: 5 },
  dmg: ({ talent, calc, attr }, { basic }) => basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100) * 1.7, 'e')
},
{
  title: `${TalentName.eName}人偶完整伤害`,
  params: { RockDmg: 11, TruceTime: 6, SkillsHit: 5, SkillsDmg: 5 },
  dmg: ({ talent, calc, attr }, { basic }) => {
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    return {
      dmg: e1.dmg * 5,
      avg: e1.avg * 5
    }
  }
},
{
  title: `${TalentName.qName}伤害`,
  params: { RockDmg: 3, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1 },
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100, 'q')
},
{
  title: '结晶护盾吸收量',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('crystallize')
},
{
  check: ({ cons }) => cons < 6,
  title: '单人站场16秒',
  dmgKey: 'dph',
  params: { SkillsUse: 1, SkillsHit: 9, SkillsDmg: 9, NormalUse: 20, NormalHit: 25, NormalDmg: 25, NormalElement: 25, RockDmg: 21, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let a1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100, 'a', 'phy')
    let a2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100, 'a', 'phy')
    let a3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2, 'a', 'phy')
    let a4 = basic(talent.a['四段伤害'] * calc(attr.atk) / 100, 'a', 'phy')
    let ae1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100, 'a')
    let ae2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100, 'a')
    let ae3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2, 'a')
    let ae4 = basic(talent.a['四段伤害'] * calc(attr.atk) / 100, 'a')
    let e0 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    let e2 = basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100) * 1.7, 'e')
    let q1 = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100, 'q')
    let cons1 = cons * 1 >= 1 ? 2 : 1
    let cons2 = cons * 2 >= 1 ? 3 : 0
    let cons4 = cons * 4 >= 1 ? 3 : 0
    let aDmg = (2 * a1.dmg + 3 * a2.dmg + 3 * 2 * a3.dmg + 3 * a4.dmg) + (3 * ae1.dmg + 2 * ae2.dmg + 2 * 2 * ae3.dmg + 2 * ae4.dmg)
    let aAvg = (2 * a1.avg + 3 * a2.avg + 3 * 2 * a3.avg + 3 * a4.avg) + (3 * ae1.avg + 2 * ae2.avg + 2 * 2 * ae3.avg + 2 * ae4.avg)
    let eDmg = (e1.dmg * 5) * cons1 + (e2.dmg * cons2) + (e2.dmg * cons4) + e0.dmg
    let eAvg = (e1.avg * 5) * cons1 + (e2.dmg * cons2) + (e2.dmg * cons4) + e0.avg
    let qDmg = q1.dmg
    let qAvg = q1.avg
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  check: ({ cons }) => cons >= 6,
  title: '单人站场16秒',
  dmgKey: 'dph',
  params: { SkillsUse: 4, SkillsHit: 12, SkillsDmg: 12, NormalUse: 20, NormalHit: 25, NormalDmg: 25, NormalElement: 25, RockDmg: 21, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let ae1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100, 'a')
    let ae2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100, 'a')
    let ae3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2, 'a')
    let e0 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    let e2 = basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100) * 1.7, 'e')
    let q1 = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100, 'q')
    let cons1 = cons * 1 >= 1 ? 2 : 1
    let cons2 = cons * 2 >= 1 ? 3 : 0
    let cons4 = cons * 4 >= 1 ? 3 : 0
    let aDmg = (4 * ae1.dmg + 4 * ae2.dmg + 4 * 2 * ae3.dmg) * 2
    let aAvg = (4 * ae1.avg + 4 * ae2.avg + 4 * 2 * ae3.avg) * 2
    let eDmg = (e1.dmg * 5) * cons1 + (e2.dmg * cons2) + (e2.dmg * cons4) + e0.dmg * 4
    let eAvg = (e1.avg * 5) * cons1 + (e2.dmg * cons2) + (e2.dmg * cons4) + e0.avg * 4
    let qDmg = q1.dmg
    let qAvg = q1.avg
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '双人后台16秒',
  params: { SkillsUse: 1, SkillsHit: 14, SkillsDmg: 14, TruceTime: 6 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    let e3 = basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100) * 1.7, 'e')
    let cons4 = cons * 4 >= 1 ? 3 : 0
    return {
      dmg: e1.dmg * 3 + e2.dmg * 10 + e3.dmg * cons4,
      avg: e1.avg * 3 + e2.avg * 10 + e3.avg * cons4
    }
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ attr, weapon, cons, artis }) => {
    let SkillsQuantity = cons >= 6 ? 4 : 1
    let a = EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 5, 20)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  check: ({ cons }) => cons < 6,
  title: '单人站场DPS',
  dmgKey: 'dps',
  params: { SkillsUse: 1, SkillsHit: 9, SkillsDmg: 9, NormalUse: 20, NormalHit: 25, NormalDmg: 25, NormalElement: 25, RockDmg: 21, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
  dmg: ({ talent, calc, attr, cons, weapon, artis }, { basic }) => {
    let a1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100, 'a', 'phy')
    let a2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100, 'a', 'phy')
    let a3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2, 'a', 'phy')
    let a4 = basic(talent.a['四段伤害'] * calc(attr.atk) / 100, 'a', 'phy')
    let ae1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100, 'a')
    let ae2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100, 'a')
    let ae3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2, 'a')
    let ae4 = basic(talent.a['四段伤害'] * calc(attr.atk) / 100, 'a')
    let e0 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    let e2 = basic( ( talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7, 'e')
    let q1 = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100, 'q')
    let cons1 = cons * 1 >= 1 ? 2 : 1
    let cons2 = cons * 2 >= 1 ? 3 : 0
    let cons4 = cons * 4 >= 1 ? 3 : 0
    let SkillsQuantity = cons >= 6 ? 4 : 1
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 5, 20))
    let aDmg = (2 * a1.dmg + 3 * a2.dmg + 3 * 2 * a3.dmg + 3 * a4.dmg) + (3 * ae1.dmg + 2 * ae2.dmg + 2 * 2 * ae3.dmg + 2 * ae4.dmg)
    let aAvg = (2 * a1.avg + 3 * a2.avg + 3 * 2 * a3.avg + 3 * a4.avg) + (3 * ae1.avg + 2 * ae2.avg + 2 * 2 * ae3.avg + 2 * ae4.avg)
    let eDmg = (e1.dmg * 5) * cons1+ (e2.dmg * cons2) + (e2.dmg * cons4) + e0.dmg
    let eAvg = (e1.avg * 5) * cons1 + (e2.dmg * cons2) + (e2.dmg * cons4) + e0.avg
    let qDmg = q1.dmg * qcn
    let qAvg = q1.avg * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 16,
      avg: (aAvg + eAvg + qAvg) / 16
    }
  }
},
{
  check: ({ cons }) => cons >= 6,
  title: '单人站场DPS',
  dmgKey: 'dps',
  params: { SkillsUse: 4, SkillsHit: 12, SkillsDmg: 12, NormalUse: 20, NormalHit: 25, NormalDmg: 25, NormalElement: 25, RockDmg: 21, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
  dmg: ({ talent, calc, attr, cons, weapon, artis }, { basic }) => {
    let ae1 = basic(talent.a['一段伤害'] * calc(attr.atk) / 100, 'a')
    let ae2 = basic(talent.a['二段伤害'] * calc(attr.atk) / 100, 'a')
    let ae3 = basic(talent.a['三段伤害'] * calc(attr.atk) / 100 / 2, 'a')
    let e0 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    let e1 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    let e2 = basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100 ) * 1.7, 'e')
    let q1 = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100, 'q')
    let cons1 = cons * 1 >= 1 ? 2 : 1
    let cons2 = cons * 2 >= 1 ? 3 : 0
    let cons4 = cons * 4 >= 1 ? 3 : 0
    let SkillsQuantity = cons >= 6 ? 4 : 1
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 5, 20))
    let aDmg = (4 * ae1.dmg + 4 * ae2.dmg + 4 * 2 * ae3.dmg) * 2
    let aAvg = (4 * ae1.avg + 4 * ae2.avg + 4 * 2 * ae3.avg) * 2
    let eDmg = (e1.dmg * 5) * cons1 + (e2.dmg * cons2) + (e2.dmg * cons4) + e0.dmg * 4
    let eAvg = (e1.avg * 5) * cons1 + (e2.dmg * cons2) + (e2.dmg * cons4) + e0.avg * 4
    let qDmg = q1.dmg * qcn
    let qAvg = q1.avg * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 16,
      avg: (aAvg + eAvg + qAvg) / 16
    }
  }
},
{
  title: '双人后台DPS',
  params: { SkillsUse: 1, SkillsHit: 14, SkillsDmg: 14, TruceTime: 6 },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    let e3 = basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100) * 1.7, 'e')
    let cons4 = cons * 4 >= 1 ? 3 : 0
    return {
      dmg: (e1.dmg * 3 + e2.dmg * 10 + e3.dmg * cons4) / 16,
      avg: (e1.avg * 3 + e2.avg * 10 + e3.avg * cons4) / 16
    }
  }
},
{
  title: `阿千艾钟 ${TalentName.eName}释放`,// 直接QE
  params: { SkillsUse: 1, SkillsHit: 14, SkillsDmg: 14, BurstUse: 1, BurstHit: 1, BurstDmg: 1, FightTime: 1, TruceTime: 14, EnergyDetermine: 0, BurningDetermine: true, ElementSame: 2, ElementDifferent: 1, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, TeamRockDmg: 9, LiyueTeammate: 1,  FontaineTeammate: 1, ShieldTime: 14, CrystallizeNumber: 2, FireAttachment: 1, RockDmg: 15, EnergyTeammate: 200, team: true, Arlecchino: true, Zhong_Li: true, Emilie: true },
  dmg: ({ talent, calc, attr }, { basic }) => {
    T1e1Dmg = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    return T1e1Dmg
  }
},
{
  title: `阿千艾钟 ${TalentName.eName}人偶`,
  params: { SkillsUse: 1, SkillsHit: 14, SkillsDmg: 14, BurstUse: 1, BurstHit: 1, BurstDmg: 1, TruceTime: 14, BurningDetermine: true, ElementSame: 2, ElementDifferent: 1, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, TeamRockDmg: 9, LiyueTeammate: 1,  FontaineTeammate: 1, ShieldTime: 14, CrystallizeNumber: 2, FireAttachment: 1, RockDmg: 15, EnergyTeammate: 200, team: true, Arlecchino: true, Zhong_Li: true, Emilie: true },
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => {
    T1e2Dmg = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    return T1e2Dmg
  }
},
{
  title: `阿千艾钟 ${TalentName.qName}伤害`,
  params: { SkillsUse: 1, SkillsHit: 14, SkillsDmg: 14, BurstUse: 1, BurstHit: 1, BurstDmg: 1, TruceTime: 14, BurningDetermine: true, ElementSame: 2, ElementDifferent: 1, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, TeamRockDmg: 9, LiyueTeammate: 1,  FontaineTeammate: 1, ShieldTime: 14, CrystallizeNumber: 2, FireAttachment: 1, RockDmg: 15, EnergyTeammate: 200, team: true, Arlecchino: true, Zhong_Li: true, Emilie: true },
  dmg: ({ talent, uid, weapon, artis, calc, attr, cons, level }, { basic }) => {
    T1q1Dmg = basic(talent.q['技能伤害2'][0] * calc(attr.atk) / 100 + talent.q['技能伤害2'][1] * calc(attr.def) / 100, 'q')
    T1e3Dmg = cons >= 2 ? (basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100) * 1.7, 'e')) : { avg: 0, dmg: 0 }
    T1e4Dmg = cons >= 4 ? (basic((talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100), 'e')) : { avg: 0, dmg: 0 }
    let TData = {base:{Tcharacter:{level,cons,talent},artis,weapon},dmg:{T1:{T1e1Dmg,T1e2Dmg,T1e3Dmg,T1e4Dmg,T1q1Dmg},T2:{}}}
    recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
    return T1q1Dmg
  }
},
{
  title: '一五千钟 后台10斩2协',
  check: ({ cons }) => cons < 4,
  params: { teamA: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    return {
      dmg: e1.dmg * 3 + e2.dmg * 10,
      avg: e1.avg * 3 + e2.avg * 10
    }
  }
},
{
  title: '一五千钟 后台10斩2协3绢',
  check: ({ cons }) => cons >= 4,
  params: { teamA: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    let e1 = basic(talent.e['上挑攻击伤害2'][0] * calc(attr.atk) / 100 + talent.e['上挑攻击伤害2'][1] * calc(attr.def) / 100, 'e')
    let e2 = basic(talent.e['袖伤害2'][0] * calc(attr.atk) / 100 + talent.e['袖伤害2'][1] * calc(attr.def) / 100, 'e')
    return {
      dmg: e1.dmg * 3 + e2.dmg * 10 + e2.dmg * 3 * 1.7,
      avg: e1.avg * 3 + e2.avg * 10 + e2.avg * 3 * 1.7
    }
  }
}]
