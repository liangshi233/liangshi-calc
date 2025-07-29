import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'

let CharacterName = "砂糖"
let TalentName = ObTalentName(CharacterName)
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1q1Dmg = { avg: 0, dmg: 0 }
let T1q2Dmg = { avg: 0, dmg: 0 }
let T1r1Dmg = { avg: 0, dmg: 0 }
let T1r2Dmg = { avg: 0, dmg: 0 }

export const AllCalc = [
  {
    title: `${TalentName.aName}一段伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}二段伤害`,
    params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}三段伤害`,
    params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
  },
  {
    title: `${TalentName.aName}四段伤害`,
    dmgKey: 'a',
    params: { NormalUse: 4, NormalHit: 4, NormalDmg: 4 },
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
  },
  {
    title: `${TalentName.a2Name}伤害`,
    dmgKey: 'z',
    params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  },
  {
    title: `${TalentName.a3Name}期间伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
  },
  {
    title: `低空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
  },
  {
    title: `高空${TalentName.a3Name}伤害`,
    params: { PlungingUse: 1, PlungingHit: 1, PlungingDmg: 1 },
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
  },
  {
    title: `${TalentName.eName}伤害`,
    dmgKey: 'e',
    params: { SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  },
  {
    title: '为队友提升精通',
    dmgKey: 'f',
    params: { SkillsHit: 1, SkillsDmg: 1 },
    dmg: ({ calc, attr }) => {
      return {
        avg: calc(attr.mastery) * 0.2 + 50
      }
    }
  },
  {
    title: `${TalentName.qName}单段伤害`,
    dmgKey: 'q',
    params: { BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
  },
  {
    title: `${TalentName.qName}转化单段`,
    params: { BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['附加元素伤害'], 'q', 'phy')
  },
  {
    title: `${TalentName.qName}无转化完整伤害`,
    params: { BurstUse: 1, BurstHit: 3, BurstDmg: 3, EnergyUse: 1 },
    dmg: ({ talent, cons }, dmg) => {
      let q1 = dmg(talent.q['持续伤害'], 'q')
      let cons2 = cons * 1 >= 2 ? 4 : 3
      return {
        dmg: q1.dmg * cons2,
        avg: q1.avg * cons2
      }
    }
  },
  {
    title: `${TalentName.qName}完整伤害`,
    params: { BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1 },
    dmg: ({ talent, cons }, dmg) => {
      let q1 = dmg(talent.q['持续伤害'], 'q')
      let q2 = dmg(talent.q['附加元素伤害'], 'q', 'phy')
      let cons2 = cons * 1 >= 2 ? 4 : 3
      return {
        dmg: q1.dmg * cons2 + q2.dmg * ( cons2 - 1 ),
        avg: q1.avg * cons2 + q2.avg * ( cons2 - 1 )
      }
    }
  },
  {
    title: '扩散反应伤害',
    dmgKey: 'r',
    dmg: ({}, { reaction }) => reaction('swirl')
  },
  {
    title: '单人站场20秒',
    dmgKey: 'dph',
    params: { BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1, SkillsUse: 2, SkillsHit: 2, SkillsDmg: 16, NormalUse: 16, NormalHit: 16, NormalDmg: 16 },
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.a['一段伤害'], 'a')
      let a2 = dmg(talent.a['二段伤害'], 'a')
      let a3 = dmg(talent.a['三段伤害'], 'a')
      let a4 = dmg(talent.a['四段伤害'], 'a')
      let e = dmg(talent.e['技能伤害'], 'e')
      let q1 = dmg(talent.q['持续伤害'], 'q')
      let q2 = dmg(talent.q['附加元素伤害'], 'q', 'phy')
      let cons2 = cons >= 2 ? 4 : 3
      let aDmg = 8 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg)
      let aAvg = 8 * (a1.avg + a2.avg + a3.avg + a4.avg)
      let eDmg = e.dmg * (cons >= 4 ? 2 : 1)
      let eAvg = e.avg * (cons >= 4 ? 2 : 1)
      let qDmg = q1.dmg * cons2 + q2.dmg * (cons2 - 1)
      let qAvg = q1.avg * cons2 + q2.avg * (cons2 - 1)
      return {
        dmg: aDmg + eDmg + qDmg,
        avg: aAvg + eAvg + qAvg
      }
    }
  },
  {
    title: '单人循环流畅度',
    params: { BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1, SkillsUse: 2, SkillsHit: 2, SkillsDmg: 16, NormalUse: 16, NormalHit: 16, NormalDmg: 16 },
    dmg: ({ artis, attr, weapon, cons }) => {
      let SkillsQuantity = cons >= 4 ? 2 : 1
      let a = EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 0, 32)
      return {
        avg: Format.percent(a),
        type: 'text'
      }
    }
  },
  {
    title: '单人站场DPS',
    dmgKey: 'dps',
    params: { BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1, SkillsUse: 2, SkillsHit: 2, SkillsDmg: 16, NormalUse: 16, NormalHit: 16, NormalDmg: 16 },
    dmg: ({ talent, calc, attr, weapon, cons, artis }, dmg) => {
      let a1 = dmg(talent.a['一段伤害'], 'a')
      let a2 = dmg(talent.a['二段伤害'], 'a')
      let a3 = dmg(talent.a['三段伤害'], 'a')
      let a4 = dmg(talent.a['四段伤害'], 'a')
      let e = dmg(talent.e['技能伤害'], 'e')
      let q1 = dmg(talent.q['持续伤害'], 'q')
      let q2 = dmg(talent.q['附加元素伤害'], 'q', 'phy')
      let cons2 = cons >= 2 ? 4 : 3
      let SkillsQuantity = cons >= 4 ? 2 : 1
      let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, 0, 0, 0, SkillsQuantity, 0, 32)), 1)
      let aDmg = 8 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg)
      let aAvg = 8 * (a1.avg + a2.avg + a3.avg + a4.avg)
      let eDmg = e.dmg * (cons >= 4 ? 2 : 1)
      let eAvg = e.avg * (cons >= 4 ? 2 : 1)
      let qDmg = (q1.dmg * cons2 + q2.dmg * (cons2 - 1)) * qcn
      let qAvg = (q1.avg * cons2 + q2.avg * (cons2 - 1)) * qcn
      return {
        dmg: (aDmg + eDmg + qDmg) / 20,
        avg: (aAvg + eAvg + qAvg) / 20
      }
    }
  },
  {
    title: `赛夜砂伊 ${TalentName.eNameT}伤害`,
    dmgKey: 'e',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, SkillsHit: 1, SkillsDmg: 1, team: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ talent }, dmg) => {
      T1e1Dmg = dmg(talent.e['技能伤害'], 'e')
      return T1e1Dmg
    }
  },
  {
    title: `赛夜砂伊 ${TalentName.qNameT}单段`,
    dmgKey: 'q',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, TruceTime: 8, BurstUse: 1, BurstHit: 5, BurstDmg: 5, EnergyUse: 1, team: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ talent }, dmg) => {
      T1q1Dmg = dmg(talent.q['持续伤害'], 'q')
      T1q2Dmg = dmg(talent.q['附加元素伤害'], 'q', 'scene')
      return T1q1Dmg
    }
  },
  {
    title: '赛夜砂伊 个人月感电',
    dmgKey: 'r',
    params: { WaterAttachment: true, MineAttachment: true, ShieldTime: 20, TruceTime: 8, SkillsHit: 1, SkillsDmg: 1, team: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Cyno: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ level, cons, talent, artis, weapon, uid }, { reaction }) => {
      T1r1Dmg = reaction('lunarCharged')
      T1r2Dmg = reaction('swirl')
      let TData = {base:{Tcharacter:{level,cons,talent},artis,weapon},dmg:{T1:{T1e1Dmg,T1q1Dmg,T1q2Dmg,T1r1Dmg,T1r2Dmg},T2:{}}}
      recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
      return T1r1Dmg
    }
  }]
