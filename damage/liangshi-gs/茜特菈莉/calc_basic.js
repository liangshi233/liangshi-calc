import { LSconfig } from '#liangshi'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "茜特菈莉"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ShieldTime: 5, ShieldDetermine: true, ElementSame: 1, ElementIceTeam: 1, Nightsoul: true, NatlanTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}释放伤害`,
  params: { NightsoulUse: 24 },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['黑曜星魔伤害'], 'e,nightsoul')
},
{
  title: `${TalentName.eName}释放融化`,
  params: { NightsoulUse: 40, FireAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['黑曜星魔伤害'], 'e,nightsoul', 'melt')
},
{
  title: `${TalentName.eName}风暴伤害`,
  params: { Storm: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['霜陨风暴伤害'], 'e,nightsoul')
},
{
  title: `${TalentName.eName}护盾量`,
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { shield }) => shield(talent.e['护盾吸收量2'][0] * calc(attr.mastery) / 100 + talent.e['护盾吸收量2'][1] * 1)
},
{
  title: `${TalentName.qName}释放伤害`,
  params: { Storm: true, EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰风暴伤害'], 'q,nightsoul')
},
{
  title: `${TalentName.qName}释放融化`,
  dmgKey: 'q',
  params: { Storm: true, EnergyDetermine: 0, FireAttachment: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['冰风暴伤害'], 'q,nightsoul', 'melt')
},
{
  title: `${TalentName.qName}爆炸伤害`,
  params: { EnergyDetermine: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.q['宿灵之髑伤害'], 'q,nightsoul')
},
{
  check: ({ cons }) => cons >= 1,
  title: '「星刃」基础伤害提升值',
  dmgKey: 'f',
  dmg: ({ calc, attr }) => {
    return {
      avg: calc(attr.mastery) * 200 / 100
    }
  }
}]

