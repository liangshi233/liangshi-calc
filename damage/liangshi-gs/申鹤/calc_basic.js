import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'
import { mainAttrData, ObTalentName, RankingKey } from '../index.js'
import { CalcBuff } from './CalcBuff.js'

let CharacterName = "申鹤"
let cfg = LSconfig.getConfig('user', 'config')
let energy = cfg.energymodel || 0
let TalentName = ObTalentName(CharacterName)
export const defDmgKey = RankingKey(CharacterName)
export const mainAttr = mainAttrData[CharacterName]
export const defParams = { ElementSame: 1, ElementIceTeam: 1, EnergyTeammate: 80, LiyueTeammate: 1 }
export const buffs = CalcBuff
export const details = [
{
  title: `${TalentName.eName}伤害提升值`,
  dmgKey: 'f',
  dmg: ({ talent, calc, attr }) => {
    return {
      avg: talent.e['伤害值提升'] * calc(attr.atk) / 100
    }
  }
},
{
  title: `${TalentName.eName}点按伤害`,
  params: { Icy_Quill: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按技能伤害'], 'e')
},
{
  title: `${TalentName.eName}点按融化`,
  params: { FireAttachment: true, Icy_Quill: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按技能伤害'], 'e', 'melt')
},
{
  title: `${TalentName.eName}长按伤害`,
  params: { Icy_Quill: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e')
},
{
  title: `${TalentName.eName}长按融化`,
  params: { FireAttachment: true, Icy_Quill: true },
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e', 'melt')
},
{
  check: ({ cons }) => cons >= 4,
  title: `${TalentName.qNameT}后满层${TalentName.eNameT}长按融化`,
  params: { Talisman_Spirit: true, Skyfrost_Mantra: 50, FireAttachment: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3, Icy_Quill: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e', 'melt')
},
{
  title: `${TalentName.qNameT}每跳伤害`,
  params: { Talisman_Spirit: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
},
{
  title: `${TalentName.qNameT}每跳融化伤害`,
  params: { FireAttachment: true, Talisman_Spirit: true, BurstUse: 1, BurstHit: 3, BurstDmg: 3 },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q', 'melt')
}]