import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "梦见月瑞希"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementDifferent: 1, NormalElement: 3, ElementDmg: 5, ReactionTime: 1, ReactionDmg: 5, FightTime: 5, TruceTime: 0, ShieldDetermine: false, HealDetermine: true, TruceChangeHp: false, ElementWindTeam: 1, BondOfLifeDetermine: false, Nightsoul: false,/*保留对老版本的支持*/soda: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}释放伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${TalentName.eName}持续伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['持续攻击伤害'], 'e')
},
{
  title: `${TalentName.qName}释放伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${TalentName.qName}点心伤害`,
  params: { EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['梦念冲击波伤害'], 'q')
},
{
  title: `${TalentName.qName}点心治疗`,
  params: { EnergyDetermine: 0 },
  dmgKey: 'h',
  dmg: ({ attr, calc, talent, cons }, { heal }) => heal(talent.q['拾取点心回复生命值2'][0] * calc(attr.mastery) / 100 + talent.q['拾取点心回复生命值2'][1] * 1)
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({ attr, calc, talent, cons }, { reaction }) => {
    let { avg } = reaction('swirl')
    let cons6dmg = cons >= 6 ? 2 : 1
    let cons6avg = cons >= 6 ? 1.3 : 1
    return {
      dmg: cons >= 6 ? (avg * cons6dmg) : undefined,
      avg: avg * cons6avg
    }
  }
},
{
  title: '二十三夜待扩散反应',
  check: ({ cons }) => cons >= 1,
  params: { Twenty_Three_Nights: true },
  dmg: ({ attr, calc, talent, cons }, { reaction }) => {
    let { avg } = reaction('swirl')
    let cons6dmg = cons >= 6 ? 2 : 1
    let cons6avg = cons >= 6 ? 1.3 : 1
    return {
      dmg: cons >= 6 ? (avg * cons6dmg) : undefined,
      avg: avg * cons6avg
    }
  }
}]


