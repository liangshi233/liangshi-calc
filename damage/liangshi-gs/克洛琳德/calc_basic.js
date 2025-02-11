import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "克洛琳德"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let BLPlusPath = cfg.bndOfLifePlus || 0
let BLPctPath = cfg.bndOfLifePct || 1
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { blPlus: `${BLPlusPath}`, blPct: `${BLPctPath}`, HealDetermine: true, ElementSame: 1, ElementMineTeam: 1, FontaineTeammate: 1, PrimordialDetermine: true, BondOfLifeDetermine: true }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eNameT}后${TalentName.aName}穿透射击`,
  dmgKey: 'a',
  params: { blPct: 0.5, ChangeBondOfLife: 4, NormalUse: 2, NormalHit: 2, NormalDmg: 2 },
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.e['驰猎伤害2'][1], 'a')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}射击`,
  dmgKey: 'undefined',
  params: { ChangeBondOfLife: 4, NormalUse: 4, NormalHit: 4, NormalDmg: 4 },
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.e['驰猎伤害2'][0], 'a')
},
{
  title: `${TalentName.eName}贯夜突进伤害`,
  params: { blPct: 0, ChangeBondOfLife: 0, NormalUse: 0, NormalHit: 0, NormalDmg: 0, SkillsUse: 5, SkillsHit: 5, SkillsDmg: 5 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][0], 'e')
},
{
  title: `${TalentName.eName}强化贯夜伤害`,
  params: { blPct: 0.5, ChangeBondOfLife: 2, NormalUse: 2, NormalHit: 2, NormalDmg: 2, SkillsUse: 3, SkillsHit: 3, SkillsDmg: 3 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][1], 'e')
},
{
  title: `${TalentName.eName}贯夜·契令`,
  params: { blPct: 0.5, ChangeBondOfLife: 4, NormalUse: 4, NormalHit: 4, NormalDmg: 4, SkillsUse: 2, SkillsHit: 6, SkillsDmg: 6 },
  dmgKey: 'e',
  dmg: ({ talent, attr }, dmg ) => {
    let e3 = dmg(talent.e['贯夜伤害2'][2], 'e')
    return {
      dmg: e3.dmg * 3 ,
      avg: e3.avg * 3
    }
  }
},
{
  check: ({ cons }) => cons >= 1,
  title: '夜巡之影协同攻击',
  params: { ChangeBondOfLife: 4, SkillsUse: 3, SkillsHit: 9, SkillsDmg: 9 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 30 / 100, 'a')
},
{
  check: ({ cons }) => cons >= 6,
  title: '明烛之影追击伤害',
  params: { ChangeBondOfLife: 4, SkillsUse: 3, SkillsHit: 9, SkillsDmg: 9 },
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 200 / 100, 'a')
},
{
  title: `${TalentName.qName}单段伤害`,
  dmgKey: 'q',
  params: { EnergyDetermine: 0, ChangeBondOfLife: 4 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害2'][0], 'q')
}]
