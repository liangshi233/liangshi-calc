import { Format } from '#liangshi'
import { EnergyCycle } from '../../../resources/CalcBuff/Energy.js'
import { recordData } from '../../../components/jsRecord.js'
import { ObTalentName } from '../index.js'
import fs from 'node:fs'

let EmilieTeam = null
let ChioriTeam = null
let Zhong_LiTeam = null
try {
  EmilieTeam = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/艾梅莉埃/TeamData.json', 'utf8')
  EmilieTeam = JSON.parse(EmilieTeam)
  ChioriTeam = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/千织/TeamData.json', 'utf8')
  ChioriTeam = JSON.parse(ChioriTeam)
  Zhong_LiTeam = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/钟离/TeamData.json', 'utf8')
  Zhong_LiTeam = JSON.parse(Zhong_LiTeam)
} catch (err) {
  console.error('组队数据读取失败:', err)
}

let T1a1Dmg = { avg: 0, dmg: 0 }
let T1e1Dmg = { avg: 0, dmg: 0 }
let T1e2Dmg = { avg: 0, dmg: 0 }
let T1e3Dmg = { avg: 0, dmg: 0 }
let T1e4Dmg = { avg: 0, dmg: 0 }
let T1z1Dmg = { avg: 0, dmg: 0 }
let CharacterName = "阿蕾奇诺"
let TalentName = ObTalentName(CharacterName)
export const AllCalc = [
{
  title: `${TalentName.aName}一段伤害`,
  params: { blPct: 0, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}二段伤害`,
  params: { NormalUse: 2, NormalHit: 2, NormalDmg: 2, blPct: 0, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}三段伤害`,
  params: { NormalUse: 3, NormalHit: 3, NormalDmg: 3, blPct: 0, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}四段伤害`,
  params: { NormalUse: 4, NormalHit: 5, NormalDmg: 5, blPct: 0, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg ) => {
    let a4 = dmg(talent.a['四段伤害'] / 2, 'a', 'phy')
    return {
      dmg: a4.dmg * 2,
      avg: a4.avg * 2
    }
  }
},
{
  title: `${TalentName.aName}五段伤害`,
  params: { NormalUse: 5, NormalHit: 6, NormalDmg: 6, blPct: 0, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['五段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.aName}六段伤害`,
  params: { NormalUse: 6, NormalHit: 7, NormalDmg: 7, blPct: 0, phy: true, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['六段伤害'], 'a', 'phy')
},
{
  title: `${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  title: `${TalentName.a3Name}期间伤害`,
  params: { phy: true, PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: `低空${TalentName.a3Name}伤害`,
  params: { phy: true, PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: `高空${TalentName.a3Name}伤害`,
  params: { phy: true, PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3, SkillsUse: 0, SkillsHit: 0, SkillsDmg: 0, SkillsKill: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段伤害`,
  params: { NormalElement: 1, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 7.5 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段蒸发`,
  params: { NormalElement: 1, WaterAttachment: true, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 7.5 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}一段伤害`,
  params: { NormalElement: 1, blPlus: 200, blPct: 1, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 7.5 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段伤害`,
  params: { NormalElement: 2, NormalUse: 2, NormalHit: 2, NormalDmg: 2, BondOfLifeGet: 1, DecreasedBondOfLife: 2, BondOfLifeUse: 14.43 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段蒸发`,
  params: { NormalElement: 2, WaterAttachment: true, NormalUse: 2, NormalHit: 2, NormalDmg: 2, BondOfLifeGet: 1, DecreasedBondOfLife: 2, BondOfLifeUse: 14.43 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}二段伤害`,
  params: { NormalElement: 2, blPlus: 200 , blPct: 1, NormalUse: 2, NormalHit: 2, NormalDmg: 2, BondOfLifeGet: 1, DecreasedBondOfLife: 2, BondOfLifeUse: 14.43 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段伤害`,
  params: { NormalElement: 3, NormalUse: 3, NormalHit: 3, NormalDmg: 3, BondOfLifeGet: 1, DecreasedBondOfLife: 3, BondOfLifeUse: 20.85 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段蒸发`,
  params: { NormalElement: 3, WaterAttachment: true, NormalUse: 3, NormalHit: 3, NormalDmg: 3, BondOfLifeGet: 1, DecreasedBondOfLife: 3, BondOfLifeUse: 20.85 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}三段伤害`,
  params: { NormalElement: 3, blPlus: 200, blPct: 1, NormalUse: 3, NormalHit: 3, NormalDmg: 3, BondOfLifeGet: 1, DecreasedBondOfLife: 3, BondOfLifeUse: 20.85 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}四段伤害`,
  params: { NormalElement: 5, NormalUse: 4, NormalHit: 5, NormalDmg: 5, BondOfLifeGet: 1, DecreasedBondOfLife: 5, BondOfLifeUse: 32.28 },
  dmg: ({ talent }, dmg ) => { //两段攻击扣两次契
    let a4 = dmg(talent.a['四段伤害'] / 2, 'a')
    return {
      dmg: a4.dmg * 2,
      avg: a4.avg * 2
    }
  }
},
{
  title: `满契${TalentName.aName}四段伤害`,
  params: { NormalElement: 5, blPlus: 200, blPct: 0.9625, NormalUse: 4, NormalHit: 5, NormalDmg: 5, BondOfLifeGet: 1, DecreasedBondOfLife: 5, BondOfLifeUse: 32.28 },
  dmg: ({ talent }, dmg ) => {
    let a4 = dmg(talent.a['四段伤害'] / 2, 'a')
    return {
      dmg: a4.dmg * 2,
      avg: a4.avg * 2
    }
  }
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}五段伤害`,
  params: { NormalElement: 6, NormalUse: 5, NormalHit: 6, NormalDmg: 6, BondOfLifeGet: 1, DecreasedBondOfLife: 6, BondOfLifeUse: 37.36 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}五段蒸发`,
  params: { NormalElement: 6, WaterAttachment: true, NormalUse: 5, NormalHit: 6, NormalDmg: 6, BondOfLifeGet: 1, DecreasedBondOfLife: 6, BondOfLifeUse: 37.36 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}五段伤害`,
  params: { NormalElement: 6, blPlus: 200 , blPct: 1, NormalUse: 5, NormalHit: 6, NormalDmg: 6, BondOfLifeGet: 1, DecreasedBondOfLife: 6, BondOfLifeUse: 37.36 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}六段伤害`,
  params: { NormalElement: 7, NormalUse: 6, NormalHit: 7, NormalDmg: 7, BondOfLifeGet: 1, DecreasedBondOfLife: 7, BondOfLifeUse: 42.05 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['六段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}六段蒸发`,
  params: { NormalElement: 7, WaterAttachment: true, NormalUse: 6, NormalHit: 7, NormalDmg: 7, BondOfLifeGet: 1, DecreasedBondOfLife: 7, BondOfLifeUse: 42.05 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['六段伤害'], 'a', 'vaporize')
},
{
  title: `满契${TalentName.aName}六段伤害`,
  dmgKey: 'a',
  params: { NormalElement: 7, blPlus: 200, blPct: 1, NormalUse: 6, NormalHit: 7, NormalDmg: 7, BondOfLifeGet: 1, DecreasedBondOfLife: 7, BondOfLifeUse: 42.05 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['六段伤害'], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}伤害`,
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmgKey: 'z',
  dmg: ({ talent }, dmg ) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.eNameT}后${TalentName.a2Name}蒸发`,
  params: { WaterAttachment: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${TalentName.eNameT}后${TalentName.a3Name}期间伤害`,
  params: { phy: true, PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
},
{
  title: `${TalentName.eNameT}后低空${TalentName.a3Name}伤害`,
  params: { phy: true, PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: `${TalentName.eNameT}后高空${TalentName.a3Name}伤害`,
  params: { phy: true, PlungingUse: 1, PlungingHit: 3, PlungingDmg: 3 },
  dmgKey: 'c',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  check: ({ cons }) => cons >= 2,
  title: '血偿勒令回收伤害',
  params: { ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 900 / 100, '')
},
{
  check: ({ cons }) => cons >= 2,
  title: '血偿勒令回收蒸发',
  params: { WaterAttachment: true, ChargedUse: 1, ChargedHit: 1, ChargedDmg: 1 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 900 / 100, '', 'vaporize')
},
{
  title: `${TalentName.eName}尖刺伤害`,
  params: { SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['尖刺伤害'], 'e')
},
{
  title: `${TalentName.eName}尖刺蒸发`,
  params: { WaterAttachment: true, SkillsUse: 1, SkillsHit: 2, SkillsDmg: 2 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['尖刺伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.eName}切斩伤害`,
  params: { SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg ) => dmg(talent.e['切斩伤害'], 'e')
},
{
  title: `${TalentName.eName}切斩蒸发`,
  params: { WaterAttachment: true, SkillsUse: 1, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['切斩伤害'], 'e', 'vaporize')
},
{
  title: '血偿勒令伤害',
  params: { SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['血偿勒令伤害'], 'e')
},
{
  title: '血偿勒令蒸发',
  params: { WaterAttachment: true, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4 },
  dmg: ({ talent }, dmg ) => dmg(talent.e['血偿勒令伤害'], 'e', 'vaporize')
},
{
  title: `${TalentName.qName}伤害`,
  params: { EnergyDetermine: 0, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 65, HealNumber: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害'], 'q')
},
{
  check: ({ cons }) => cons >= 6,
  title: `满契${TalentName.qName}伤害`,
  params: { blPlus: 200, blPct: 1, EnergyDetermine: 0, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 100, HealNumber: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}蒸发`,
  params: { WaterAttachment: true, EnergyDetermine: 0, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 65, HealNumber: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  check: ({ cons }) => cons >= 6,
  title: `满契${TalentName.qName}蒸发`,
  params: { WaterAttachment: true, blPlus: 200, blPct: 1, EnergyDetermine: 0, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 100, HealNumber: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ talent }, dmg ) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  title: `${TalentName.eNameT}后${TalentName.qName}治疗量`,
  params: { WaterAttachment: true, EnergyDetermine: 0, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 65, HealNumber: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmg: ({ params, cons, attr, calc, weapon }, { heal }) => heal((150 / 100 * (Math.min((params.blPct * ((cons >= 2 ? 130 : 65) + (weapon.name === '赤月之形' ? 25 : 0)) + params.blPlus), 200) / 100) * calc(attr.hp)) + (150 / 100 * calc(attr.atk)))
},
{
  title: `满契${TalentName.qName}治疗量`,
  params: { WaterAttachment: true, blPlus: 200, blPct: 1, EnergyDetermine: 0, BondOfLifeGet: 1, DecreasedBondOfLife: 1, BondOfLifeUse: 100, HealNumber: 1, BurstUse: 1, BurstHit: 1, BurstDmg: 1 },
  dmgKey: 'h',
  dmg: ({ params, cons, attr, calc, weapon }, { heal }) => heal(150 / 100 * (200 / 100) * calc(attr.hp) + 150 / 100 * calc(attr.atk))
},
{
  title: `满契首轮${TalentName.aName}期望`,
  params: { NormalElement: 7, blPlus: 200, blPct: 0.8011, NormalUse: 6, NormalHit: 7, NormalDmg: 7, BondOfLifeGet: 1, DecreasedBondOfLife: 7, BondOfLifeUse: 42.05 },
  dmg: ({ talent, attr , cons }, dmg ) => {
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'] / 2, 'a')
    let a5 = dmg(talent.a['五段伤害'], 'a')
    let a6 = dmg(talent.a['六段伤害'], 'a')
    return {
      dmg: a1.dmg + a2.dmg + a3.dmg + a4.dmg * 2 + a5.dmg + a6.dmg,
      avg: a1.avg + a2.avg + a3.avg + a4.avg * 2 + a5.avg + a6.avg
    }
  }
},
{
  title: `满契首轮${TalentName.aName}蒸发期望`,
  params: { NormalElement: 7, blPlus: 200 , blPct: 0.8011, NormalUse: 6, NormalHit: 7, NormalDmg: 7, BondOfLifeGet: 1, DecreasedBondOfLife: 7, BondOfLifeUse: 42.05 },
  dmg: ({ talent, attr , cons }, dmg ) => {
    let a1 = dmg(talent.a['一段伤害'], 'a', 'vaporize')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'] / 2 , 'a')
    let az4 = dmg(talent.a['四段伤害'] / 2 , 'a', 'vaporize')
    let a5 = dmg(talent.a['五段伤害'], 'a')
    let a6 = dmg(talent.a['六段伤害'], 'a')
    return {
      dmg: a1.dmg + a2.dmg + a3.dmg + a4.dmg + az4.dmg + a5.dmg + a6.dmg,
      avg: a1.avg + a2.avg + a3.avg + a4.avg + az4.dmg + a5.avg + a6.avg
    }
  }
},
{
  title: '单人站场20秒',
  dmgKey: 'dph',
  params: { NormalElement: 14, blPct: 0.594, NormalUse: 12, NormalHit: 14, NormalDmg: 14, BurstUse: 1, BurstHit: 1, BurstDmg: 1, BondOfLifeGet: 1, DecreasedBondOfLife: 14, BondOfLifeUse: 130, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 1 },
  dmg: ({ talent, cons }, dmg ) => {
    let e1 = dmg(talent.e['尖刺伤害'], 'e')
    let e2 = dmg(talent.e['切斩伤害'], 'e')
    let e3 = dmg(talent.e['血偿勒令伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'] / 2, 'a')
    let a5 = dmg(talent.a['五段伤害'], 'a')
    let a6 = dmg(talent.a['六段伤害'], 'a')
    let z1 = dmg(talent.a['重击伤害'], 'a2')
    let cons2 = cons >= 2 ? 1 : 0
    let e4 = dmg(900, '')
    let aDmg = z1.dmg + 2 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg * 2 + a5.dmg + a6.dmg)
    let aAvg = z1.avg + 2 * (a1.avg + a2.avg + a3.avg + a4.avg * 2 + a5.avg + a6.avg)
    let eDmg = (e1.dmg + e2.dmg + e3.dmg) * 2 + e4.dmg * cons2
    let eAvg = (e1.avg + e2.avg + e3.avg) * 2 + e4.avg * cons2
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
  dmg: ({ attr, weapon, cons, artis }) => {
    let consn = cons >= 4 ? 15 : 0
    let a = EnergyCycle(CharacterName, attr, weapon, artis, consn, 0, 0, 2, 0, 12)
    return {
      avg: Format.percent(a),
      type: 'text'
    }
  }
},
{
  title: '单人站场期望DPS',
  dmgKey: 'dps',
  params: { NormalElement: 14, blPct: 0.594, NormalUse: 6, NormalHit: 7, NormalDmg: 7, BurstUse: 1, BurstHit: 1, BurstDmg: 1, BondOfLifeGet: 1, DecreasedBondOfLife: 14, BondOfLifeUse: 130, SkillsUse: 1, SkillsHit: 4, SkillsDmg: 4, HealNumber: 1 },
  dmg: ({ talent, attr, weapon, cons, artis }, dmg ) => {
    let e1 = dmg(talent.e['尖刺伤害'], 'e')
    let e2 = dmg(talent.e['切斩伤害'], 'e')
    let e3 = dmg(talent.e['血偿勒令伤害'], 'e')
    let q1 = dmg(talent.q['技能伤害'], 'q')
    let a1 = dmg(talent.a['一段伤害'], 'a')
    let a2 = dmg(talent.a['二段伤害'], 'a')
    let a3 = dmg(talent.a['三段伤害'], 'a')
    let a4 = dmg(talent.a['四段伤害'] / 2, 'a')
    let a5 = dmg(talent.a['五段伤害'], 'a')
    let a6 = dmg(talent.a['六段伤害'], 'a')
    let z1 = dmg(talent.a['重击伤害'], 'a2')
    let cons2 = cons >= 2 ? 1 : 0
    let consn = cons >= 4 ? 15 : 0
    let e4 = dmg(900, '')
    let qcn = Math.min((EnergyCycle(CharacterName, attr, weapon, artis, consn, 0, 0, 2, 0, 12)), 1)
    let aDmg = z1.dmg + 2 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg * 2 + a5.dmg + a6.dmg)
    let aAvg = z1.avg + 2 * (a1.avg + a2.avg + a3.avg + a4.avg * 2 + a5.avg + a6.avg)
    let eDmg = (e1.dmg + e2.dmg + e3.dmg) * (1 + qcn) + e4.dmg * cons2
    let eAvg = (e1.avg + e2.avg + e3.avg) * (1 + qcn) + e4.avg * cons2
    let qDmg = q1.dmg * qcn
    let qAvg = q1.avg * qcn
    return {
      dmg: (aDmg + eDmg + qDmg) / 20,
      avg: (aAvg + eAvg + qAvg) / 20
    }
  }
},
{
  title: `阿千艾钟 ${TalentName.a2Name}伤害`,
  params: { blPlus: 30, blPct: 0.6326, simulate: true, ChangeBondOfLife: 12, NormalUse: 12, NormalHit: 14, NormalDmg: 14, NormalElement: 14, ShieldTime: 20, CrystallizeNumber: 3, FightTime: 6, FireAttachment: true, BurningDetermine: true, ElementSame: 1, ElementDifferent: 3, TeamRockDmg: 14, LiyueTeammate: 1, FontaineTeammate: 1 , EnergyTeammate: 200, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, Chiori: true, Emilie: true, Zhong_Li: true, team: true },
  dmg: ({ talent }, dmg) => {
    T1z1Dmg = dmg(talent.a['重击伤害'], 'a2')
    return T1z1Dmg
  }
},
{
  title: `阿千艾钟 ${TalentName.aName}一段`,
  params: { blPlus: 30, blPct: 0.6326, simulate: true, ChangeBondOfLife: 12, NormalUse: 12, NormalHit: 14, NormalDmg: 14, NormalElement: 14, ShieldTime: 20, CrystallizeNumber: 3, FightTime: 6, FireAttachment: true, BurningDetermine: true, ElementSame: 1, ElementDifferent: 3, TeamRockDmg: 14, LiyueTeammate: 1, FontaineTeammate: 1 , EnergyTeammate: 200, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, Chiori: true, Emilie: true, Zhong_Li: true, team: true },
  dmg: ({ talent }, dmg) => {
    T1a1Dmg = dmg(talent.a['一段伤害'], 'a')
    return T1a1Dmg
  }
},
{
  title: `阿千艾钟 ${TalentName.eName}切斩伤害`,
  params: { blPlus: 30, blPct: 0.6326, simulate: true, ChangeBondOfLife: 12, NormalUse: 12, NormalHit: 14, NormalDmg: 14, NormalElement: 14, ShieldTime: 20, CrystallizeNumber: 3, FightTime: 6, FireAttachment: true, BurningDetermine: true, ElementSame: 1, ElementDifferent: 3, TeamRockDmg: 14, LiyueTeammate: 1, FontaineTeammate: 1 , EnergyTeammate: 200, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, Chiori: true, Emilie: true, Zhong_Li: true, team: true },
  dmg: ({ talent, calc, attr, cons }, { basic }) => {
    T1e1Dmg = basic(calc(attr.atk) * talent.e['切斩伤害'] / 100, 'e')
    T1e2Dmg = basic(calc(attr.atk) * talent.e['尖刺伤害'] / 100, 'e')
    T1e3Dmg = basic(calc(attr.atk) * talent.e['血偿勒令伤害'] / 100, 'e')
    T1e4Dmg = cons >= 2 ? basic(calc(attr.atk) * 900 / 100, 'e') : { avg: 0, dmg: 0 }
    return T1e1Dmg
  }
},
{
  title: '阿千艾钟 队伍单轮总伤', // 如果更新过队友面板会使用自己的角色组队进行计算,注意：队友的伤害不会因当前面板设定的敌人等级而调整，需要呼出队友面板才可刷新
  params: { blPlus: 30, blPct: 0.6326, simulate: true, ChangeBondOfLife: 12, NormalUse: 12, NormalHit: 14, NormalDmg: 14, NormalElement: 14, ShieldTime: 20, CrystallizeNumber: 3, FightTime: 6, FireAttachment: true, BurningDetermine: true, ElementSame: 1, ElementDifferent: 3, TeamRockDmg: 14, LiyueTeammate: 1, FontaineTeammate: 1, EnergyTeammate: 200, ElementRockTeam: 2, ElementFireTeam: 1, ElementGrassTeam: 1, Chiori: true, Emilie: true, Zhong_Li: true, team: true },
  dmg: ({ talent, calc, attr, cons, uid, level, artis, weapon }, { basic, reaction }) => {
    let EmilieCons = !EmilieTeam[uid] ? cons : EmilieTeam[uid]?.base?.Tcharacter?.cons
    // 依次计入每个角色伤害
    // 阿蕾奇诺 2轮普攻 1E 1重
    let rs = reaction('burning')
    let A2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a')
    let A3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a')
    let A4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100 / 2, 'a')
    let A5 = basic(calc(attr.atk) * talent.a['五段伤害'] / 100, 'a')
    let A6 = basic(calc(attr.atk) * talent.a['六段伤害'] / 100, 'a')
    let ArlecchinoDmg = T1z1Dmg.dmg + (T1a1Dmg.dmg + A2.dmg + A3.dmg + A4.dmg * 2 + A5.dmg + A6.dmg) * 2 + T1e4Dmg.dmg + T1e1Dmg.dmg +T1e2Dmg.dmg + T1e3Dmg.dmg + rs.avg * 20 * 4
    let ArlecchinoAvg = T1z1Dmg.avg + (T1a1Dmg.avg + A2.avg + A3.avg + A4.avg * 2 + A5.avg + A6.avg) * 2 + T1e4Dmg.avg + T1e1Dmg.avg +T1e2Dmg.avg + T1e3Dmg.avg + rs.avg * 20 * 4
    // 艾梅莉埃（1E 8*2协 4Q 8Q[4命] 2T 3T[1命] 2T[6命]）
    let EmilieE1 = EmilieTeam[uid]?.dmg?.T1?.T1e1Dmg ?? { dmg: 4539.27, avg: 4085.34 }
    let EmilieE2 = EmilieTeam[uid]?.dmg?.T1?.T1e2Dmg ?? { dmg: 10842.76, avg: 9758.48 }
    let EmilieQ1 = EmilieTeam[uid]?.dmg?.T1?.T1q1Dmg ?? { dmg: 28184.76, avg: 25366.28 }
    let EmilieT1 = EmilieTeam[uid]?.dmg?.T1?.T1t1Dmg ?? { dmg: 37387.44, avg: 33648.69 }
    let EmilieDmg = EmilieQ1.dmg * (EmilieCons >= 4 ? 12 : 4) + EmilieE1.dmg + EmilieE2.dmg * 8 * 2 + (EmilieCons >= 6 ? (EmilieCons >= 1 ? 5 : 2) : 7) * EmilieT1.dmg
    let EmilieAvg = EmilieQ1.avg * (EmilieCons >= 4 ? 12 : 4) + EmilieE1.avg + EmilieE2.avg * 8 * 2 + (EmilieCons >= 6 ? (EmilieCons >= 1 ? 5 : 2) : 7) * EmilieT1.avg
    // 千织 （1E 10斩 2协 3绢[4命]）
    let ChioriE1 = ChioriTeam[uid]?.dmg?.T1?.T1e1Dmg ?? { dmg: 28663.2, avg: 25796.88 }
    let ChioriE2 = ChioriTeam[uid]?.dmg?.T1?.T1e2Dmg ?? { dmg: 13387.68, avg: 12048.91 }
    let ChioriE3 = ChioriTeam[uid]?.dmg?.T1?.T1e3Dmg ?? { dmg: 22759.05, avg: 20483.15 }
    let ChioriE4 = ChioriTeam[uid]?.dmg?.T1?.T1e4Dmg ?? { dmg: 28663.2, avg: 25796.88 }
    let ChioriQ1 = ChioriTeam[uid]?.dmg?.T1?.T1q1Dmg ?? { dmg: 46981.08, avg: 42282.97 }
    let ChioriDmg = ChioriE1.dmg * 3 + ChioriE2.dmg * 10 + ChioriE3.dmg * 4 + ChioriE4.dmg * 3 + ChioriQ1.dmg
    let ChioriAvg =  ChioriE1.avg * 3 + ChioriE2.avg * 10 + ChioriE3.avg * 4 + ChioriE4.avg * 3 + ChioriQ1.avg
    // 钟离 （10E共鸣 1长E 1Q）
    let Zhong_LiE1 = Zhong_LiTeam[uid]?.dmg?.T1?.T1e1Dmg ?? { dmg: 3398.76, avg: 3058.88 }
    let Zhong_LiE2 = Zhong_LiTeam[uid]?.dmg?.T1?.T1e2Dmg ?? { dmg: 2290.68, avg: 2061.61 }
    let Zhong_LiQ1 = Zhong_LiTeam[uid]?.dmg?.T1?.T1q1Dmg ?? { dmg: 34728.48, avg: 31255.63 }
    let Zhong_LiDmg = Zhong_LiE1.dmg + Zhong_LiE2.dmg * 10 + Zhong_LiQ1.dmg
    let Zhong_LiAvg = Zhong_LiE1.avg + Zhong_LiE2.avg * 10 + Zhong_LiQ1.avg
    // 合并伤害
    let T1Dmg = ArlecchinoDmg + EmilieDmg + ChioriDmg + Zhong_LiDmg
    let T1Avg = ArlecchinoAvg + EmilieAvg + ChioriAvg + Zhong_LiAvg
    let T1allDmg = undefined
    if (EmilieTeam[uid]?.dmg?.T1?.T1e1Dmg && ChioriTeam[uid]?.dmg?.T1?.T1e1Dmg && Zhong_LiTeam[uid]?.dmg?.T1?.T1e1Dmg) {
      // 全部队友伤害都是json中的才写入完整队伍伤害
      T1allDmg = { dmg: T1Dmg, avg: T1Avg }
    }
// 如果你想看到队伍伤害组成可以把下面的注释去掉
    /*
    console.log("------------------------------------------------------")
    console.log("队伍总伤:", T1Avg)
    console.log("阿蕾奇诺:", ArlecchinoAvg, "(", ArlecchinoAvg / T1Avg * 100, "%)")
    console.log("艾梅莉埃:", EmilieAvg, "(", EmilieAvg / T1Avg * 100, "%)")
    console.log("千织:", ChioriAvg, "(", ChioriAvg / T1Avg * 100, "%)")
    console.log("钟离:", Zhong_LiAvg, "(", Zhong_LiAvg / T1Avg * 100, "%)")
    console.log("------------------------------------------------------")
    */
    let TData = {base:{Tcharacter:{level, cons, talent}, Tartis: artis, Tweapon: weapon}, dmg:{T1:{T1e1Dmg, T1e2Dmg, T1e3Dmg, T1e4Dmg, T1z1Dmg, T1allDmg}, T2:{}}}
    recordData(`./plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, uid, TData, CharacterName)
    return {
      dmg: T1Dmg,
      avg: T1Avg
    }
  }
},
{
  title: `仆万香班 ${TalentName.aName}一段`,
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 3, SkillsHit: 3, SkillsDmg: 3, NormalElement: 1, FireAttachment: true, ElementSame: 3, ElementDifferent: 1, LiyueTeammate: 1, EnergyTeammate: 260, ElementFireTeam: 3, ElementWindTeam: 1, Kaedehara_Kazuha: true, Xiang_Ling: true, Bennett: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `仆万香班 ${TalentName.aName}尾段`,
  dmgKey: 'a',
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 9, SkillsHit: 3, SkillsDmg: 3, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, FireAttachment: true, ElementSame: 3, ElementDifferent: 1, LiyueTeammate: 1, EnergyTeammate: 260, ElementFireTeam: 3, ElementWindTeam: 1, Kaedehara_Kazuha: true, Xiang_Ling: true, Bennett: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a')
},
{
  title: `仆万香班 ${TalentName.eName}切斩`,
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 3, SkillsHit: 3, SkillsDmg: 3, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, FireAttachment: true, ElementSame: 3, ElementDifferent: 1, LiyueTeammate: 1, EnergyTeammate: 260, ElementFireTeam: 3, ElementWindTeam: 1, Kaedehara_Kazuha: true, Xiang_Ling: true, Bennett: true },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['切斩伤害'], 'e')
},
{
  title: `仆万香班 ${TalentName.qNameT}伤害`,
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 9, SkillsHit: 3, SkillsDmg: 3, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, FireAttachment: true, ElementSame: 3, ElementDifferent: 1, LiyueTeammate: 1, EnergyTeammate: 260, ElementFireTeam: 3, ElementWindTeam: 1, Kaedehara_Kazuha: true, Xiang_Ling: true, Bennett: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  check: ({ attr }) => attr.mastery >= 120,
  title: `仆万夜钟 ${TalentName.aName}一段蒸发`,
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 3, SkillsHit: 3, SkillsDmg: 3, NormalElement: 1, WaterAttachment: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 2, EnergyTeammate: 330, ElementFireTeam: 1, ElementWaterTeam: 1, ElementWindTeam: 1, ElementRockTeam: 1, Kaedehara_Kazuha: true, Ye_Lan: true, Zhong_Li: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a', 'vaporize')
},
{
  check: ({ attr }) => attr.mastery >= 120,
  title: `仆万夜钟 ${TalentName.aName}尾段蒸发`,
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 9, SkillsHit: 3, SkillsDmg: 3, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, WaterAttachment: true, ElementSame: 1, ElementDifferent: 3, LiyueTeammate: 2, EnergyTeammate: 330, ElementFireTeam: 1, ElementWaterTeam: 1, ElementWindTeam: 1, ElementRockTeam: 1, Kaedehara_Kazuha: true, Ye_Lan: true, Zhong_Li: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a', 'vaporize')
},
{
  check: ({ artis }) => artis.如雷的盛怒 == 4,
  title: `仆皇北夏 ${TalentName.aName}一段`,
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 3, SkillsHit: 3, SkillsDmg: 3, NormalElement: 1, MineAttachment: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, FontaineTeammate: 1, EnergyTeammate: 260, ElementFireTeam: 2, ElementMineTeam: 2, Fischl: true, Bei_Dou: true, Chevreuse: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  check: ({ artis }) => artis.如雷的盛怒 == 4,
  title: `仆皇北夏 ${TalentName.aName}尾段`,
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 9, SkillsHit: 3, SkillsDmg: 3, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, MineAttachment: true, ElementSame: 2, ElementDifferent: 2, LiyueTeammate: 1, FontaineTeammate: 1, EnergyTeammate: 260, ElementFireTeam: 2, ElementMineTeam: 2, Fischl: true, Bei_Dou: true, Chevreuse: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a')
},
{
  check: ({ attr }) => attr.cpct < 32 && attr.cdmg >= 160,
  title: `仆万莫班 ${TalentName.qNameT}蒸发`,
  params: { team: true, BondOfLife: 200, ChangeBondOfLife: 9, SkillsHit: 3, SkillsDmg: 3, NormalUse: 6, NormalHit: 7, NormalDmg: 7, NormalElement: 7, WaterAttachment: true, ElementSame: 2, ElementDifferent: 2, EnergyTeammate: 260, ElementWaterTeam: 1, ElementFireTeam: 3, ElementWindTeam: 1, Kaedehara_Kazuha: true, Mona: true, Bennett: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}]