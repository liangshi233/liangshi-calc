import { Format, LSconfig } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'

let CharacterName = "伊涅芙"
let TalentName = ObTalentName(CharacterName)
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1q1Dmg = { avg: 0, dmg: 0 }
let T1t1Dmg = { avg: 0, dmg: 0 }
let T1c2Dmg = { avg: 0, dmg: 0 }
let T1c6Dmg = { avg: 0, dmg: 0 }
let T1r1Dmg = { avg: 0, dmg: 0 }
export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    params: { phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 4, NormalDmg: 4, phy: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['三段伤害2'][0], 'a')
      let a2 = dmg(talent.a['三段伤害2'][1], 'a')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.aName}四段伤害`,
    dmgKey: 'a',
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    dmgKey: 'z',
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}期间伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
  },
  {
    title: `低空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
  },
  {
    title: `高空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1, phy: true },
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
  },
  {
    title: `${TalentName.eName}伤害`,
    params: { ShieldTime: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  },
  {
    title: `${TalentName.eName}激化`,
    params: { ShieldTime: 1, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'aggravate')
  },
  {
    title: `${TalentName.eName}放电伤害`,
    dmgKey: 'e',
    params: { ShieldTime: 8, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({ talent }, dmg) => dmg(talent.e['薇尔琪塔放电伤害'], 'e')
  },
  {
    title: `${TalentName.eName}放电激化`,
    params: { ShieldTime: 8, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['薇尔琪塔放电伤害'], 'e', 'aggravate')
  },
  {
    title: `${TalentName.eName}护盾吸收量`,
    dmgKey: 'h',
    params: { ShieldTime: 8, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e['护盾吸收量2'][0] * calc(attr.atk) / 100 + talent.e['护盾吸收量2'][1])
  },
  {
    title: `${TalentName.qName}伤害`,
    dmgKey: 'q',
    params: { ShieldTime: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  },
  {
    title: `${TalentName.qName}激化`,
    params: { ShieldTime: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyDetermine: 0, EnergyUse: 1, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
  },
  {
    title: `${TalentName.tName}附加伤害`,
    params: { ShieldTime: 8, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 65 / 100, '', 'lunarCharged')
  },
  {
    check: ({ cons }) => cons >= 2,
    title: `${TalentName.c2Name}附加伤害`,
    params: { ShieldTime: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1, EnergyUse: 1, Lunar: true },
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 300 / 100, '', 'lunarCharged')
  },
  {
    check: ({ cons }) => cons >= 6,
    title: `${TalentName.c6Name}附加伤害`,
    params: { ShieldTime: 1, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 135 / 100, '', 'lunarCharged')
  },
  {
    title: '单人月感电伤害',
    dmgKey: 'r',
    params: { ShieldTime: 8, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, Lunar: true, WaterAttachment: true, MineAttachment: true },
    dmg: ({}, { reaction }) => reaction('lunarCharged')
  },
  {
    title: `赛夜砂伊 ${TalentName.eName}持续伤害`,
    dmgKey: 'e',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, team: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Sucrose: true, Ye_Lan: true },
    dmg: ({ talent }, dmg) => {
      T1e1Dmg = dmg(talent.e['技能伤害'], 'e')
      T1e2Dmg = dmg(talent.e['薇尔琪塔放电伤害'], 'e')
      return T1e2Dmg
    }
  },
  {
    title: `赛夜砂伊 ${TalentName.qName}伤害`,
    dmgKey: 'q',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, team: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Sucrose: true, Ye_Lan: true },
    dmg: ({ talent }, dmg) => {
      T1q1Dmg = dmg(talent.q['技能伤害'], 'q')
      return T1q1Dmg
    }
  },
  {
    title: '赛夜砂伊 个人月感电',
    dmgKey: 'r',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, SkillsUse: 1, SkillsHit: 1, SkillsDmg: 1, team: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Sucrose: true, Ye_Lan: true },
    dmg: ({ talent, attr, calc, level, cons, artis, weapon, uid }, { reaction, basic }) => {
      T1t1Dmg = basic(calc(attr.atk) * 65 / 100, '', 'lunarCharged')
      T1c2Dmg = basic(calc(attr.atk) * 300 / 100, '', 'lunarCharged')
      T1c6Dmg = basic(calc(attr.atk) * 135 / 100, '', 'lunarCharged')
      T1r1Dmg = reaction('lunarCharged')
      let TData = {base:{Tcharacter:{level,cons,talent},artis,weapon},dmg:{T1:{T1e1Dmg,T1e2Dmg,T1q1Dmg,T1t1Dmg,T1c2Dmg,T1c6Dmg,T1r1Dmg},T2:{}}}
      recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
      return T1r1Dmg
    }
  }
]
