import { resonanceBuffGs, characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '千织天赋：[锦上添花] 队伍中附近的角色创造岩元素创造物时，获得[dmg]%元素伤害加成',
  data: {
    dmg: 20
  }
},
{
  title: '千织2命：[落染五色] 施放二刀之形·比翼后，将在当前场上自己的角色身边唤出简易型自律人形 · 绢，对附近的敌人发起攻击，造成岩元素范围伤害',
  cons: 2
},
{
  title: '千织6命：[万理一空] 触发固有天赋「量体裁衣」的裁锦后，羽袖一触的冷却时间减少[_eCdPlus]秒。此外，普通攻击造成的伤害提升[aPlus] ',
  cons: 6,
  data: {
    _eCdPlus: 12,
    aPlus: ({ attr, calc }) => calc(attr.def) * 235 / 100
  }
},
TeamBuff.TeamBuff_Emilie[0],
TeamBuff.TeamBuff_Emilie[1],
TeamBuff.TeamBuff_Zhong_Li[0],
TeamBuff.TeamBuff_Zhong_Li[1],
resonanceBuffGs[4]
]