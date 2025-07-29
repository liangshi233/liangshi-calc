import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'
import fs from 'node:fs'

let SucroseTeam = null
let IneffaTeam = null
let Ye_LanTeam = null
try {
  SucroseTeam = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/砂糖/TeamData.json', 'utf8')
  SucroseTeam = JSON.parse(SucroseTeam)
  Ye_LanTeam = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/夜兰/TeamData.json', 'utf8')
  Ye_LanTeam = JSON.parse(Ye_LanTeam)
  IneffaTeam = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/伊涅芙/TeamData.json', 'utf8')
  IneffaTeam = JSON.parse(IneffaTeam)
} catch (err) {
  console.error('组队数据读取失败:', err)
}

let CharacterName = "赛诺"
let e0Dmg = { dmg: 0, avg: 0 }
let e1Dmg = { dmg: 0, avg: 0 }
let e2Dmg = { dmg: 0, avg: 0 }
let e3Dmg = { dmg: 0, avg: 0 }
let e4Dmg = { dmg: 0, avg: 0 }
let e5Dmg = { dmg: 0, avg: 0 }
let e6Dmg = { dmg: 0, avg: 0 }
let e7Dmg = { dmg: 0, avg: 0 }
let e8Dmg = { dmg: 0, avg: 0 }
let e9Dmg = { dmg: 0, avg: 0 }
let T1a1Dmg = { avg: 0, dmg: 0 }
let T1a2Dmg = { avg: 0, dmg: 0 }
let T1a3Dmg = { avg: 0, dmg: 0 }
let T1a4Dmg = { avg: 0, dmg: 0 }
let T1a5Dmg = { avg: 0, dmg: 0 }
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1e3Dmg = { avg: 0, dmg: 0 }
let T1r1Dmg = { avg: 0, dmg: 0 }
let T1r2Dmg = { avg: 0, dmg: 0 }
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
  {
    title: `${TalentName.eName}伤害`,
    dmg: ({ talent }, dmg) => {
      e8Dmg = dmg(talent.e['技能伤害'], 'e')
      return e8Dmg
    }
  },
  {
    title: `${TalentName.eName}激化`,
    params: { GrassAttachment: true },
    dmg: ({ talent }, dmg) => {
      e9Dmg = dmg(talent.e['技能伤害'], 'e', 'aggravate')
      return e9Dmg
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}一段`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 1, NormalHit: 1, NormalDmg: 1, NormalElement: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['一段伤害'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}一段激化`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 1, NormalHit: 1, NormalDmg: 1, NormalElement: 1, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['一段伤害'], 'a', 'aggravate')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}二段`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2 },
    dmg: ({ talent }, dmg) => dmg(talent.q['二段伤害'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}二段激化`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 2, NormalHit: 2, NormalDmg: 2, NormalElement: 2, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['二段伤害'], 'a', 'aggravate')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}三段`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 3, NormalHit: 3, NormalDmg: 3, NormalElement: 3 },
    dmg: ({ talent }, dmg) => dmg(talent.q['三段伤害'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}三段激化`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 3, NormalHit: 3, NormalDmg: 3, NormalElement: 3, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['三段伤害'], 'a', 'aggravate')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}四段`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 4, NormalHit: 5, NormalDmg: 5, NormalElement: 5 },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.q['四段伤害2'][0], 'a')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}四段激化`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 4, NormalHit: 5, NormalDmg: 5, NormalElement: 5, GrassAttachment: true },
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.q['四段伤害2'][0], 'a', 'aggravate')
      let a2 = dmg(talent.q['四段伤害2'][0], 'a')
      return {
        dmg: a1.dmg + a2.dmg,
        avg: a1.avg + a2.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}五段`,
    dmgKey: 'a',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 5, NormalHit: 6, NormalDmg: 6, NormalElement: 6 },
    dmg: ({ talent }, dmg) => dmg(talent.q['五段伤害'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.aNameT}五段激化`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 5, NormalHit: 6, NormalDmg: 6, NormalElement: 6, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['五段伤害'], 'a', 'aggravate')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.a2Name}伤害`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
    dmg: ({ talent }, dmg) => dmg(talent.q['重击伤害'], 'a')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.a2Name}激化`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, GrassAttachment: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['重击伤害'], 'a', 'aggravate')
  },
  {
    title: `${TalentName.qNameT}后${TalentName.eName}伤害`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7 },
    dmg: ({ talent }, dmg) => {
      e4Dmg = dmg(talent.e['冥祭伤害'], 'e')
      return e4Dmg
    }
  },
  {
    title: `${TalentName.qNameT}后${TalentName.eName}激化`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, GrassAttachment: true },
    dmg: ({ talent }, dmg) => {
      e5Dmg = dmg(talent.e['冥祭伤害'], 'e', 'aggravate')
      return e5Dmg
    }
  },
  {
    title: `末途真眼 ${TalentName.eName}伤害`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, Endseer_stance: true, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7 },
    dmg: ({ talent }, dmg) => {
      e0Dmg = dmg(talent.e['冥祭伤害'], 'e')
      return e0Dmg
    }
  },
  {
    title: `末途真眼 ${TalentName.eName}激化`,
    dmgKey: 'e',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, Endseer_stance: true, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, GrassAttachment: true },
    dmg: ({ talent }, dmg) => {
      e1Dmg = dmg(talent.e['冥祭伤害'], 'e', 'aggravate')
      return e1Dmg
    }
  },
  {
    title: '末途真眼 渡荒之雷',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      e2Dmg = basic(calc(attr.atk), 'e')
      return e2Dmg
    }
  },
  {
    title: '末途真眼 渡荒之雷激化',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, GrassAttachment: true, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      e3Dmg = basic(calc(attr.atk), 'e', 'aggravate')
      return e3Dmg
    }
  },
  {
    check: ({ cons }) => cons >= 6,
    title: `${TalentName.c6Name}渡荒之雷`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      e6Dmg = basic(calc(attr.atk), 'e')
      return e6Dmg
    }
  },
  {
    check: ({ cons }) => cons >= 6,
    title: `${TalentName.c6Name}渡荒之雷激化`,
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, GrassAttachment: true, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      e7Dmg = basic(calc(attr.atk), 'e', 'aggravate')
      return e7Dmg
    }
  },
  {
    title: '末途真眼 冥祭总伤害',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({}) => {
      let e1 = e0Dmg
      let e2 = e2Dmg
      return {
        dmg: e1.dmg + 3 * e2.dmg,
        avg: e1.avg + 3 * e2.dmg
      }
    }
  },
  {
    title: '末途真眼 冥祭总激化',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, GrassAttachment: true, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({}) => {
      let e1 = e1Dmg
      let e2 = e2Dmg
      let e3 = e3Dmg
      return {
        dmg: e1.dmg + 2 * e2.dmg + e3.dmg,
        avg: e1.avg + 2 * e2.dmg + e3.avg
      }
    }
  },
  {
    title: `${TalentName.qNameT}后超绽放`,
    dmgKey: 'r',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, GrassAttachment: true, SkillsHit: 4, SkillsDmg: 4 },
    dmg: ({}, { reaction }) => reaction('hyperBloom')
  },
  {
    title: '单人站场20秒',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 12, NormalHit: 14, NormalDmg: 14, NormalElement: 14, SkillsUse: 6, SkillsHit: 10, SkillsDmg: 10 },
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.q['一段伤害'], 'a')
      let a2 = dmg(talent.q['二段伤害'], 'a')
      let a3 = dmg(talent.q['三段伤害'], 'a')
      let a4 = dmg(talent.q['四段伤害2'][0], 'a')
      let a5 = dmg(talent.q['五段伤害'], 'a')
      let e1 = e8Dmg
      let e2 = e0Dmg
      let e3 = e2Dmg
      let e4 = e4Dmg
      let e6 = e6Dmg
      let aAvg = 4 * (a1.avg + a2.avg + a3.avg + a4.avg * 2 + a5.avg) + (cons >= 1 ? 4 : 0) * (a1.avg + a2.avg)
      let aDmg = 4 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg * 2 + a5.dmg) + (cons >= 1 ? 4 : 0) * (a1.dmg + a2.dmg)
      let eAvg = e1.avg + e4.avg + 4 * (e2.avg + e3.avg * 3) + e6.avg * (cons >= 6 ? 28 : 0)
      let eDmg = e1.dmg + e4.dmg + 4 * (e2.dmg + e3.dmg * 3) + e6.dmg * (cons >= 6 ? 28 : 0)
      return {
        dmg: aDmg + eDmg,
        avg: aAvg + eAvg
      }
    }
  },
  {
    title: '单人站场20秒激化',
    dmgKey: 'dph',
    params: { Pactsworn_Pathclearer: true, BurstUse: 1, NormalUse: 12, NormalHit: 14, NormalDmg: 14, NormalElement: 14, GrassAttachment: true, SkillsUse: 6, SkillsHit: 10, SkillsDmg: 10 },
    dmg: ({ talent, cons }, dmg) => {
      let a0 = dmg(talent.q['一段伤害'], 'a')
      let a1 = dmg(talent.q['一段伤害'], 'a', 'aggravate')
      let a2 = dmg(talent.q['二段伤害'], 'a')
      let a3 = dmg(talent.q['三段伤害'], 'a')
      let a4 = dmg(talent.q['四段伤害2'][0], 'a')
      let a42 = dmg(talent.q['四段伤害2'][0], 'a', 'aggravate')
      let a5 = dmg(talent.q['五段伤害'], 'a')
      let e1 = e9Dmg
      let e2 = e1Dmg
      let e3 = e2Dmg
      let ej3 = e3Dmg
      let e4 = e5Dmg
      let e6 = e6Dmg
      let e7 = e7Dmg
      let aAvg = 4 * (a1.avg + a2.avg + a3.avg + a4.avg + a42.avg + a5.avg + e2.avg + e3.avg * 2 + ej3.avg) + cons >= 1 ? (3 * (a1.avg - a0.avg) + 4 * (a0.dmg + a2.avg)) : 0
      let aDmg = 4 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + a42.dmg + a5.dmg + e2.dmg + e3.dmg * 2 + ej3.dmg) + cons >= 1 ? (3 * (a1.dmg - a0.dmg) + 4 * (a0.dmg + a2.dmg)) : 0
      let eAvg = e1.avg + e4.avg + 4 * (e2.avg + e3.avg * 2 + ej3.avg) + cons >= 6 ? (e6.avg * 18 + e7.avg * 10) : 0
      let eDmg = e1.dmg + e4.dmg + 4 * (e2.dmg + e3.dmg * 2 + ej3.dmg) + cons >= 6 ? (e6.dmg * 18 + e7.dmg * 10) : 0
      return {
        dmg: aDmg + eDmg,
        avg: aAvg + eAvg
      }
    }
  },
  {
    title: `赛夜砂伊 ${TalentName.qNameT}后${TalentName.aNameT}第五段`,
    dmgKey: 'a',
    params: { Pactsworn_Pathclearer: true, WaterAttachment: true, MineAttachment: true, ShieldTime: 20, BurstUse: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, team: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Sucrose: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ talent }, dmg) => {
      T1a1Dmg = dmg(talent.q['一段伤害'], 'a')
      T1a2Dmg = dmg(talent.q['二段伤害'], 'a')
      T1a3Dmg = dmg(talent.q['三段伤害'], 'a')
      T1a4Dmg = dmg(talent.q['四段伤害2'][0], 'a')
      T1a5Dmg = dmg(talent.q['四段伤害'], 'a')
      T1e3Dmg = dmg(talent.e['冥祭伤害'], 'e')
      T1e2Dmg = dmg(100, 'e')
      return T1a5Dmg
    }
  },
  {
    title: '赛夜砂伊 冥祭伤害',
    dmgKey: 'e',
    params: { Pactsworn_Pathclearer: true, WaterAttachment: true, MineAttachment: true, ShieldTime: 20, BurstUse: 1, Endseer_stance: true, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, team: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Sucrose: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ talent }, dmg) => {
      T1e1Dmg = dmg(talent.e['冥祭伤害'], 'e')
      return T1e1Dmg
    }
  },
  {
    title: '赛夜砂伊 个人月感电',
    dmgKey: 'r',
    params: { Pactsworn_Pathclearer: true, WaterAttachment: true, MineAttachment: true, ShieldTime: 20, BurstUse: 1, Endseer_stance: true, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, team: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Sucrose: true, Ye_Lan: true, Ineffa: true },
    dmg: ({}, { reaction }) => {
      T1r1Dmg = reaction('lunarCharged')
      return T1r1Dmg
    }
  },
  {
    title: '赛夜砂伊 队伍月感电',
    params: { Pactsworn_Pathclearer: true, WaterAttachment: true, MineAttachment: true, ShieldTime: 20, BurstUse: 1, Endseer_stance: true, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, team: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Sucrose: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ uid }) => {
      let SucroseR1 = SucroseTeam[uid]?.dmg?.T1?.T1r1Dmg ?? { dmg: "13475", avg: "8945" }
      let IneffaR1 = IneffaTeam[uid]?.dmg?.T1?.T1r1Dmg ?? { dmg: "35176", avg: "29673" }
      let Ye_LanR1 = Ye_LanTeam[uid]?.dmg?.T1?.T1r1Dmg ?? { dmg: "18489", avg: "12546" }
      let lunarChargedDmg = [SucroseR1.dmg, IneffaR1.dmg, Ye_LanR1.dmg, T1r1Dmg.dmg]
      let lunarChargedAvg = [SucroseR1.avg, IneffaR1.avg, Ye_LanR1.avg, T1r1Dmg.avg]
      lunarChargedDmg.sort((x, y) => x - y)
      lunarChargedAvg.sort((x, y) => x - y)
      T1r2Dmg = { dmg: (lunarChargedDmg[0] + lunarChargedDmg[1]) * (1 / 12) + lunarChargedDmg[2] * (1 / 2) + lunarChargedDmg[3], avg: (lunarChargedAvg[0] + lunarChargedAvg[1]) * (1 / 12) + lunarChargedAvg[2] * (1 / 2) + lunarChargedAvg[3] }
      return T1r2Dmg
    }
  },
  {
    title: '赛夜砂伊 单轮队伍总伤', // 如果更新过队友面板会使用自己的角色组队进行计算,注意：队友的伤害不会因当前面板设定的敌人等级而调整，需要呼出队友面板才可刷新
    dmgKey: 'dph',
    params: { Pactsworn_Pathclearer: true, WaterAttachment: true, MineAttachment: true, ShieldTime: 20, BurstUse: 1, Endseer_stance: true, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, team: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, NatlanTeammate: 1, ElementWindTeam: 1, ElementMineTeam: 2, ElementWaterTeam: 1, EnergyTeammate: 290, Sucrose: true, Ye_Lan: true, Ineffa: true },
    dmg: ({ talent, cons, uid, level, artis, weapon }) => {
      let SucroseCons = !SucroseTeam[uid] ? cons : SucroseTeam[uid]?.base?.Tcharacter?.cons
      let Ye_LanCons = !Ye_LanTeam[uid] ? cons : Ye_LanTeam[uid]?.base?.Tcharacter?.cons
      let IneffaCons = !IneffaTeam[uid] ? cons : IneffaTeam[uid]?.base?.Tcharacter?.cons
      // 依次计入每个角色伤害
      // 赛诺 4轮普攻 5E
      let CynoDmg = 4 * (T1a1Dmg.dmg + T1a2Dmg.dmg + T1a3Dmg.dmg + T1a4Dmg.dmg * 2 + T1a5Dmg.dmg + T1e1Dmg.dmg + T1e2Dmg.dmg * 3) + T1e3Dmg.dmg
      let CynoAvg = 4 * (T1a1Dmg.avg + T1a2Dmg.avg + T1a3Dmg.avg + T1a4Dmg.avg * 2 + T1a5Dmg.avg + T1e1Dmg.avg + T1e2Dmg.avg * 3) + T1e3Dmg.avg
      // 砂糖 1E 3Q 4Q[6命]
      let SucroseE1 = SucroseTeam[uid]?.dmg?.T1?.T1e1Dmg ?? { dmg: 6719, avg: 4537 }
      let SucroseQ1 = SucroseTeam[uid]?.dmg?.T1?.T1q1Dmg ?? { dmg: 4192, avg: 2694 }
      let SucroseQ2 = SucroseTeam[uid]?.dmg?.T1?.T1q2Dmg ?? { dmg: 4192, avg: 2694 }
      let SucroseR2 = SucroseTeam[uid]?.dmg?.T1?.T1r2Dmg ?? { dmg: 7438, avg: 7438 }
      let SucroseDmg = SucroseE1.dmg + SucroseR2.avg + (SucroseCons >= 2 ? 4 : 3) * (SucroseQ1.dmg + SucroseQ2.dmg + SucroseR2.avg) - SucroseQ2.dmg
      let SucroseAvg = SucroseE1.avg + SucroseR2.avg + (SucroseCons >= 2 ? 4 : 3) * (SucroseQ1.avg + SucroseQ2.avg + SucroseR2.avg) - SucroseQ2.avg
      //夜兰 1E 1Q 5A[6命]
      let Ye_LanZ1 = Ye_LanTeam[uid]?.dmg?.T1?.T1z1Dmg ?? { dmg: 28930, avg: 23144 }
      let Ye_LanE1 = Ye_LanTeam[uid]?.dmg?.T1?.T1e1Dmg ?? { dmg: 66704, avg: 53363 }
      let Ye_LanQ1 = Ye_LanTeam[uid]?.dmg?.T1?.T1q1Dmg ?? { dmg: 21489, avg: 16384 }
      let Ye_LanQ2 = Ye_LanTeam[uid]?.dmg?.T1?.T1q2Dmg ?? { dmg: 12931, avg: 10344 }
      let Ye_LanDmg = Ye_LanE1.dmg + Ye_LanQ1.dmg + Ye_LanZ1.dmg + Ye_LanQ2.dmg * 15 + (Ye_LanCons >= 6 ? 5 : 0) * Ye_LanZ1.dmg * 1.56
      let Ye_LanAvg = Ye_LanE1.avg + Ye_LanQ1.avg + Ye_LanZ1.avg + Ye_LanQ2.avg * 15 + (Ye_LanCons >= 6 ? 5 : 0) * Ye_LanZ1.avg * 1.56
      //伊涅芙 1E 10E2 1Q 5t 1C2[2命] 5C6[6命]
      let IneffaE1 = IneffaTeam[uid]?.dmg?.T1?.T1e1Dmg ?? { dmg: 4936, avg: 3702 }
      let IneffaE2 = IneffaTeam[uid]?.dmg?.T1?.T1e2Dmg ?? { dmg: 5484, avg: 4133 }
      let IneffaQ1 = IneffaTeam[uid]?.dmg?.T1?.T1q1Dmg ?? { dmg: 38670, avg: 29002 }
      let IneffaT1 = IneffaTeam[uid]?.dmg?.T1?.T1t1Dmg ?? { dmg: 34258, avg: 25693 }
      let IneffaC2 = IneffaTeam[uid]?.dmg?.T1?.T1c2Dmg ?? { dmg: 158114, avg: 118585 }
      let IneffaC6 = IneffaTeam[uid]?.dmg?.T1?.T1c6Dmg ?? { dmg: 71151, avg: 53363 }
      let IneffaDmg = IneffaE1.dmg + (IneffaE2.dmg + IneffaT1.dmg) * 10 + IneffaQ1.dmg + (IneffaCons >= 2 ? IneffaC2.dmg : 0) + (IneffaCons >= 6 ? (IneffaC6.dmg * 5) : 0)
      let IneffaAvg = IneffaE1.avg + (IneffaE2.avg + IneffaT1.avg) * 10 + IneffaQ1.avg + (IneffaCons >= 2 ? IneffaC2.avg : 0) + (IneffaCons >= 6 ? (IneffaC6.avg * 5) : 0)
      //队伍整体反应 月感电10次
      let lunarChargedDmg = T1r2Dmg.dmg * 10
      let lunarChargedAvg = T1r2Dmg.avg * 10
      // 合并伤害
      let T1Dmg = CynoDmg + SucroseDmg + Ye_LanDmg + IneffaDmg + lunarChargedDmg
      let T1Avg = CynoAvg + SucroseAvg + Ye_LanAvg + IneffaAvg + lunarChargedAvg
      let T1allDmg = undefined
      if (IneffaTeam[uid]?.dmg?.T1?.T1e1Dmg && SucroseTeam[uid]?.dmg?.T1?.T1e1Dmg && Ye_LanTeam[uid]?.dmg?.T1?.T1e1Dmg) {
        // 全部队友伤害都是json中的才写入完整队伍伤害
        T1allDmg = { dmg: T1Dmg, avg: T1Avg }
      }
// 如果你想看到队伍伤害组成可以把下面的注释去掉
      /*
      console.log("------------------------------------------------------")
      console.log("队伍总伤:", T1Avg)
      console.log("赛诺:", CynoAvg, "(", CynoAvg / T1Avg * 100, "%)")
      console.log("砂糖:", SucroseAvg, "(", SucroseAvg / T1Avg * 100, "%)")
      console.log("夜兰:", Ye_LanAvg, "(", Ye_LanAvg / T1Avg * 100, "%)")
      console.log("伊涅芙:", IneffaAvg, "(", IneffaAvg / T1Avg * 100, "%)")
      console.log("元素反应:", lunarChargedAvg, "(", lunarChargedAvg / T1Avg * 100, "%)")
      console.log("------------------------------------------------------")
      */
      let TData = {base:{Tcharacter:{level, cons, talent}, Tartis: artis, Tweapon: weapon}, dmg:{T1:{T1a1Dmg, T1a2Dmg, T1a3Dmg, T1a4Dmg, T1a5Dmg, T1e1Dmg, T1e2Dmg, T1e3Dmg, T1r1Dmg, T1allDmg}, T2:{}}}
      recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
      return {
        dmg: T1Dmg,
        avg: T1Avg
      }
    }
  }]
