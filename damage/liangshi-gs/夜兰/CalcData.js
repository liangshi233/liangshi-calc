import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'

let CharacterName = "夜兰"
let TalentName = ObTalentName(CharacterName)
let T1z1Dmg = { avg: 0, dmg: 0 }
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1q1Dmg = { avg: 0, dmg: 0 }
let T1q2Dmg = { avg: 0, dmg: 0 }
let T1r1Dmg = { avg: 0, dmg: 0 }

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
    dmgKey: 'a',
    params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5, phy: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['四段伤害2'][0], 'a', 'phy')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['瞄准射击'], 'a2', 'phy')
  },
  {
    title: `满蓄力${TalentName.a2Name}伤害`,
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
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
    title: '破局矢伤害',
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
  },
  {
    check: ({ cons }) => cons >= 6,
    title: '运筹帷幄 破局矢',
    params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, NormalUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2')
  },
  {
    title: '破局矢蒸发',
    dmgKey: 'z',
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, FireAttachment: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2', 'vaporize')
  },
  {
    check: ({ cons }) => cons >= 6,
    title: '运筹帷幄 破局矢蒸发',
    params: { BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, NormalUse: 1, ChargedHit: 1, ChargedDmg: 1, FireAttachment: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2', 'vaporize')
  },
  {
    title: `${TalentName.eName}伤害`,
    dmgKey: 'e',
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  },
  {
    title: `${TalentName.eName}蒸发`,
    params: { SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, FireAttachment: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
  },
  {
    title: `${TalentName.qName}释放伤害`,
    params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
  },
  {
    title: `${TalentName.qName}释放蒸发`,
    params: { EnergyDetermine: 0, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, FireAttachment: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
  },
  {
    title: `${TalentName.qNameT}协同单段伤害`,
    dmgKey: 'q',
    params: { Exquisite_Throw: true, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, BurstAfter: 3 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.q['玄掷玲珑伤害2'][0] / 100, 'q')
  },
  {
    title: `${TalentName.qNameT}协同单段蒸发`,
    params: { Exquisite_Throw: true, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, FireAttachment: true, BurstAfter: 3 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q['玄掷玲珑伤害2'][0] / 100, 'q', 'vaporize')
  },
  {
    title: `${TalentName.qNameT}协同15段伤害`,
    params: { Exquisite_Throw: true, BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyUse: 1, BurstAfter: 8 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let count = cons * 1 >= 2 ? 1 : 0
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
      return {
        dmg: 8 * erming.dmg * count + 15 * q.dmg * 3,
        avg: 8 * erming.avg * count + 15 * q.avg * 3
      }
    }
  },
  {
    title: `${TalentName.qNameT}协同15段蒸发`,
    params: { Exquisite_Throw: true, BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyUse: 1, BurstAfter: 8, FireAttachment: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let ermingzf = basic(calc(attr.hp) * (14 / 100), 'q', 'vaporize')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let count = cons * 1 >= 2 ? 1 : 0
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
      let qzf = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q', 'vaporize')
      return {
        dmg: 2 * erming.dmg * count + 6 * ermingzf.dmg * count + 30 * q.dmg + 15 * qzf.dmg,
        avg: 2 * erming.avg * count + 6 * ermingzf.dmg * count + 30 * q.avg + 15 * qzf.avg
      }
    }
  },
  {
    title: '单人站场20秒',
    dmgKey: 'dph',
    params: ({ cons }) => ({ NormalUse: 20, NormalHit: 25, NormalDmg: 25, ChargedUse: 1, ChargedHit: cons >= 6 ? 6 : 1, ChargedDmg: cons >= 6 ? 6 : 1, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, Exquisite_Throw: true, BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyUse: 1 }),
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let a4 = basic(calc(attr.atk) * talent.a['四段伤害2'][0] / 100, 'a', 'phy')
      let z = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
      let cz = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2')
      let e = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let ce = basic(calc(attr.hp) * (14 / 100), 'q')
      let q1 = basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
      let q2 = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
      let aDmg = 6 * (a1.dmg + a2.dmg + a3.dmg + 2 * a4.dmg) + z.dmg + cons >= 6 ? (cz.dmg * 5 - a1.dmg - a2.dmg - a3.dmg - 2 * a4.dmg) : 0
      let aAvg = 6 * (a1.avg + a2.avg + a3.avg + 2 * a4.avg) + z.avg + cons >= 6 ? (cz.avg * 5 - a1.avg - a2.avg - a3.avg - 2 * a4.avg) : 0
      let eDmg = (cons >= 1 ? 2 : 1) * e.dmg + (cons >= 2 ? 8 : 0) * ce.dmg
      let eAvg = (cons >= 1 ? 2 : 1) * e.avg + (cons >= 2 ? 8 : 0) * ce.avg
      let qDmg = q1.dmg + 15 * 3 * q2.dmg
      let qAvg = q1.avg + 15 * 3 * q2.avg
      return {
        dmg: aDmg + eDmg + qDmg,
        avg: aAvg + eAvg + qAvg
      }
    }
  },
  {
    title: '单人循环流畅度',
    params: { NormalUse: 24, NormalHit: 30, NormalDmg: 30, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, Exquisite_Throw: true, BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyUse: 1 },
    dmg: ({ attr, weapon, artis }) => {
      let a = EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 1, 0, 24)
      return {
        avg: Format.percent(a),
        type: 'text'
      }
    }
  },
  {
    title: '单人站场期望DPS',
    dmgKey: 'dps',
    params: { NormalUse: 24, NormalHit: 30, NormalDmg: 30, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, Exquisite_Throw: true, BurstUse: 1, BurstHit: 9, BurstDmg: 9, EnergyUse: 1 },
    dmg: ({ talent, attr, calc, weapon, cons, artis }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let a4 = basic(calc(attr.atk) * talent.a['四段伤害2'][0] / 100, 'a', 'phy')
      let z = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
      let cz = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2')
      let e = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let ce = basic(calc(attr.hp) * (14 / 100), 'q')
      let q1 = basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
      let q2 = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
      let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, 1, 0, 24)), 1)
      let aDmg = 6 * (a1.dmg + a2.dmg + a3.dmg + 2 * a4.dmg) + z.dmg + (cons >= 6 ? (cz.dmg * 5 - a1.dmg - a2.dmg - a3.dmg - 2 * a4.dmg) : 0) * qcn
      let aAvg = 6 * (a1.avg + a2.avg + a3.avg + 2 * a4.avg) + z.avg + (cons >= 6 ? (cz.avg * 5 - a1.avg - a2.avg - a3.avg - 2 * a4.avg) : 0) * qcn
      let eDmg = (cons >= 1 ? 2 : 1) * e.dmg + (cons >= 2 ? 8 : 0) * ce.dmg
      let eAvg = (cons >= 1 ? 2 : 1) * e.avg + (cons >= 2 ? 8 : 0) * ce.avg
      let qDmg = (q1.dmg + 15 * 3 * q2.dmg) * qcn
      let qAvg = (q1.avg + 15 * 3 * q2.avg) * qcn
      return {
        dmg: (aDmg + eDmg + qDmg) / 20,
        avg: (aAvg + eAvg + qAvg) / 20
      }
    }
  },
  {
    title: `赛夜砂伊 ${TalentName.eName}伤害`,
    dmgKey: 'e',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, team: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Sucrose: true, Ineffa: true  },
    dmg: ({ talent, attr, calc }, { basic }) => {
      T1e1Dmg = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      T1z1Dmg = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'z')
      T1q1Dmg = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      return T1e1Dmg
    }
  },
  {
    title: `赛夜砂伊 ${TalentName.qNameT}协同单段`,
    dmgKey: 'q',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, TruceTime: 8, Exquisite_Throw: true, SkillsHit: 1, SkillsDmg: 1, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, BurstAfter: 3, team: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Sucrose: true, Ineffa: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      T1q2Dmg = basic(calc(attr.hp) * talent.q['玄掷玲珑伤害2'][0] / 100, 'q')
      return T1q2Dmg
    }
  },
  {
    title: '赛夜砂伊 个人月感电',
    dmgKey: 'r',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, TruceTime: 8, SkillsHit: 1, SkillsDmg: 1, Exquisite_Throw: true, BurstUse: 1, BurstHit: 7, BurstDmg: 7, EnergyUse: 1, BurstAfter: 3, team: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Sucrose: true, Ineffa: true },
    dmg: ({ talent, attr, calc, level, cons, artis, weapon, uid }, { reaction }) => {
      T1r1Dmg = reaction('lunarCharged')
      let TData = {base:{Tcharacter:{level,cons,talent},artis,weapon},dmg:{T1:{T1z1Dmg,T1e1Dmg,T1q1Dmg,T1q2Dmg,T1r1Dmg},T2:{}}}
      recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
      return T1r1Dmg
    }
  }
  /*,
  {
    title: '夜莫万E伤害',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  },
  {
    title: '夜莫万E蒸发',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
  },
  {
    title: '夜莫万Q单段协同',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
  },
  {
    check: ({ cons }) => cons < 6,
    title: '夜莫万EE7次连携',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let count = cons * 1 >= 2 ? 1 : 0
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
      return {
        dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
        avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
      }
    }
  },
  {
    check: ({ cons }) => cons < 6,
    title: '夜莫万EE双蒸7次连携',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let count = cons * 1 >= 2 ? 1 : 0
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
      return {
        dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
        avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
      }
    }
  },
  {
    check: ({ cons }) => cons >= 6,
    title: '夜莫万6命EaEaaaa',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
      let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
      return {
        dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
        avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
      }
    }
  },
  {
    check: ({ cons }) => cons >= 6,
    title: '夜莫万6命EaEaaaa双蒸',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
      let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
      return {
        dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
        avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
      }
    }
  },
  {
    title: '夜胡行钟 e伤害',
    params: { teamB: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  },
  {
    title: '夜胡行钟 协同单段',
    params: { teamB: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害2'][0] / 100), 'q')
  }*/
]
