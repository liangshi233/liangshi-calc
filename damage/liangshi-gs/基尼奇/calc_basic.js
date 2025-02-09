import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "基尼奇"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ShieldDetermine: false, HealDetermine: false, NatlanTeammate: 1, PrimordialDetermine: false, BondOfLifeDetermine: false, Nightsoul: true, TruceChangeHp: false }
export const buffs = CalcBuff
export const details = [
{
  title: '环绕射击单枚',
  dmg: ({ talent }, dmg) => dmg(talent.e['环绕射击伤害'], 'e,nightsoul')
},
{
  title: '环绕射击单枚激化',
  dmg: ({ talent }, dmg) => dmg(talent.e['环绕射击伤害'], 'e,nightsoul', 'spread')
},
{
  title: '迴猎贯鳞炮伤害',
  dmgKey: 'e',
  params: { Scalespiker_Cannon: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul')
},
{
  title: '迴猎贯鳞炮激化',
  params: { Scalespiker_Cannon: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul', 'spread')
},
{
  check: ({ cons }) => cons >= 2,
  title: '2命首次猎贯鳞炮',
  params: { Scalespiker_Cannon: true, first: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul')
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}释放激化`,
  params: { EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'spread')
},
{
  title: `${TalentName.qName}龙息伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['龙息伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}龙息激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['龙息伤害'], 'q,nightsoul', 'spread')
}]
