import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'

let CharacterName = "钟离"
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1q1Dmg = { avg: 0, dmg: 0 }
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { NormalUse: 1, NormalHit: 1, NormalDmg: 1, phy: true },
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
  params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}五段伤害`,
  dmgKey: 'a',
  params: { NormalUse: 5, NormalHit: 8, NormalDmg: 8, phy: true },
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['五段伤害'] / 4, 'a', 'phy')
    return {
      dmg: a1.dmg * 4,
      avg: a1.avg * 4
    }
  }
},
{
  title: `${TalentName.aName}六段伤害`,
  params: { NormalUse: 6, NormalHit: 9, NormalDmg: 9, phy: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.a2Name}伤害`,
  dmgKey: 'z',
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
  title: `${TalentName.eName}伤害`,
  params: { ShieldTime: 1, RockDmg: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][0], 'e')
},
{
  title: '共鸣伤害',
  params: { SkillsUse: 1, SkillsHit: 6, SkillsDmg: 6, RockDmg: 6, ShieldTime: 15 },
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
},
{
  title: `${TalentName.eName}柱子完整伤害`,
  params: { SkillsUse: 1, SkillsHit: 7, SkillsDmg: 7, RockDmg: 7, ShieldTime: 15 },
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
    return {
      dmg: e1.dmg * 15,
      avg: e1.avg * 15
    }
  }
},
{
  title: `${TalentName.eName}长按伤害`,
  params: { ShieldTime: 1, RockDmg: 1 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
},
{
  title: `${TalentName.eName}护盾量`,
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, RockDmg: 4, ShieldTime: 6 },
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { shield }) => shield(talent.e['护盾基础吸收量'] + calc(attr.hp) * talent.e['护盾附加吸收量'] / 100)
},
{
  title: `${TalentName.qName}伤害`,
  dmgKey: 'q',
  params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, RockDmg: 1, EnergyUse: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '单人站场18秒',
  dmgKey: 'dph',
  params: { NormalUse: 12, NormalHit: 15, NormalDmg: 15, SkillsUse: 1, SkillsHit: 10, SkillsDmg: 10, BurstUse: 1, BurstHit: 1, BurstDmg: 1, ShieldTime: 9, RockDmg: 11, EnergyUse: 1 },
  dmg: ({ talent, cons }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'] / 4, 'a', 'phy')
    let a6 = dmg(talent.a['六段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['岩脊伤害/共鸣伤害'][1] * 0.5, 'e')
    let e2 = dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
    let e3 = dmg(talent.e['长按伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let cons1 = cons * 1 >= 1 ? 1 : 0
    let aDmg = 4 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + 3 * a5.dmg) + 3 * a6.dmg
    let aAvg = 4 * (a1.avg + a2.avg + a3.avg + a4.avg + 3 * a5.avg) + 3 * a6.avg
    let eDmg = e2.dmg * 9 + e3.dmg + cons1 * (e2.dmg * 7 + e1.dmg)
    let eAvg = e2.avg * 9 + e3.avg + cons1 * (e2.avg * 7 + e1.avg)
    let qDmg = q1.dmg
    let qAvg = q1.avg
    return {
      dmg: aDmg + eDmg + qDmg,
      avg: aAvg + eAvg + qAvg
    }
  }
},
{
  title: '单人循环流畅度',
  dmg: ({ attr, weapon, artis }) => {
    let a = EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 1, 10, 22)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  title: '单人站场DPS',
  dmgKey: 'dps',
  params: { NormalUse: 12, NormalHit: 15, NormalDmg: 15, SkillsUse: 1, SkillsHit: 10, SkillsDmg: 10, BurstUse: 1, BurstHit: 1, BurstDmg: 1, ShieldTime: 9, RockDmg: 11, EnergyUse: 1 },
  dmg: ({ talent, calc, attr, weapon, cons, artis }, dmg) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
    let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let a5 = dmg(talent.a['五段伤害'] / 4, 'a', 'phy')
    let a6 = dmg(talent.a['六段伤害'], 'a', 'phy')
    let e1 = dmg(talent.e['岩脊伤害/共鸣伤害'][1] * 0.5, 'e')
    let e2 = dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
    let e3 = dmg(talent.e['长按伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let cons1 = cons * 1 >= 1 ? 1 : 0
    let qcn = Math.min(1, EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 1, 10, 22))
    let aDmg = 4 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + 3 * a5.dmg) + 3 * a6.dmg
    let aAvg = 4 * (a1.avg + a2.avg + a3.avg + a4.avg + 3 * a5.avg) + 3 * a6.avg
    let eDmg = e2.dmg * 9 + e3.dmg + cons1 * (e2.dmg * 7 + e1.dmg)
    let eAvg = e2.avg * 9 + e3.avg + cons1 * (e2.avg * 7 + e1.avg)
    let qDmg = q1.dmg * qcn
    let qAvg = q1.avg * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 18,
      avg: (aAvg + eAvg + qAvg) / 18
    }
  }
},
{
  title: `阿千艾钟 ${TalentName.eName}长按`,
  params: { BurningDetermine: true, FireAttachment: true, ElementSame: 2, ElementDifferent: 2, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, RockDmg: 14, TeamRockDmg: 14, EnergyTeammate: 200, team: true, Arlecchino: true, Chiori: true, Emilie: true },
  dmg: ({ talent }, dmg) => {
    T1e1Dmg = dmg(talent.e['长按伤害'], 'e')
    return T1e1Dmg
  }
},
{
  title: `阿千艾钟 ${TalentName.eName}共鸣`,
  params: { BurningDetermine: true, FireAttachment: true, ElementSame: 2, ElementDifferent: 2, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, RockDmg: 14, TeamRockDmg: 14, EnergyTeammate: 200, team: true, Arlecchino: true, Chiori: true, Emilie: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => {
    T1e2Dmg = dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
    return T1e2Dmg
  }
},
{
  title: `阿千艾钟 ${TalentName.qName}伤害`,
  params: { BurningDetermine: true, FireAttachment: true, ElementSame: 2, ElementDifferent: 2, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, RockDmg: 14, TeamRockDmg: 14, EnergyTeammate: 200, team: true, Arlecchino: true, Chiori: true, Emilie: true },
  dmg: ({ artis, uid, weapon, level, cons, talent }, dmg) => {
    T1q1Dmg = dmg(talent.q['技能伤害'], 'q')
    let TData = {base:{Tcharacter:{level, cons, talent}, artis, weapon}, dmg:{T1:{T1e1Dmg, T1e2Dmg, T1q1Dmg}, T2:{}}}
    recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
    return T1q1Dmg
  }
}]