import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "希诺宁"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { CrystallizeNumber: 2, HealDetermine: true, ElementSame: 1, ElementRockTeam: 1, FontaineTeammate: 1, PrimordialDetermine: false, BondOfLifeDetermine: false, Nightsoul: true, TruceChangeHp: false }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}突进伤害`,
  params: { NormalElement: 0, RockDmg: 1 },
  dmgKey: 'e',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.e['突进伤害'] * calc(attr.def) / 100, 'e,nightsoul')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0, RockDmg: 4 },
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['技能伤害'] * calc(attr.def) / 100, 'q,nightsoul')
},
{
  title: `${TalentName.qName}单次治疗`,
  params: { EnergyDetermine: 0, RockDmg: 3 },
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['持续治疗量2'][0] * calc(attr.def) / 100 + talent.q['持续治疗量2'][1] * 1)
},
{
  title: `${TalentName.qName}追加伤害`,
  params: { RockDmg: 5 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['追加节拍伤害'] * calc(attr.def) / 100, 'q,nightsoul')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}一段`,
  params: { RockDmg: 2 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎一段伤害'] * calc(attr.def) / 100, 'a,nightsoul')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}二段`,
  params: { RockDmg: 3 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎二段伤害'] * calc(attr.def) / 100, 'a,nightsoul')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}三段`,
  params: { RockDmg: 4 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎三段伤害'] * calc(attr.def) / 100, 'a,nightsoul')
},
{
  title: `${TalentName.eNameT}后${TalentName.aName}四段`,
  dmgKey: 'a',
  params: { RockDmg: 5 },
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.a['刃轮巡猎四段伤害'] * calc(attr.def) / 100, 'a,nightsoul')
}]
