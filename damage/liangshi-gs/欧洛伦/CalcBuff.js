import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'
import { TeamBuff } from '../index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '欧洛伦天赋：[灵相的触媒] 元素战技暝色缒索中的宿灵球命中敌人后，普攻、重击或下落攻击命中敌人将恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 3
  }
},
{
  check: ({ params }) => params.Hypersense_effect === true,
  title: '欧洛伦1命：[林雾间的行迹] 宿灵球命中敌人后，固有天赋造成的伤害提升[dmg]%',
  cons: 1,
  data: {
    dmg: 50
  }
},
{
  title: '欧洛伦2命：[藏蜜酒的王蜂] 施放元素爆发后,获得[dmg]%雷元素伤害加成',
  cons: 2,
  data: {
    dmg: 8 + 8 * 4
  }
},
{
  title: '欧洛伦4命：[如夜风的谜烟] 施放黯声回响后，恢复[_energyevery]点元素能量',
  cons: 4,
   data: {
     _energyevery: 8
   }
},
{
  title: '欧洛伦6命：[致深泉的颂赞] 触发固有天赋后，攻击力提升[atkPct]%',
  cons: 6,
  data: {
    atkPct: 10 * 3
  }
},
TeamBuff.TeamBuff_Citlali[0],
TeamBuff.TeamBuff_Citlali[1],
TeamBuff.TeamBuff_Citlali[2],
TeamBuff.TeamBuff_Citlali[3],
TeamBuff.TeamBuff_Mavuika[1],
TeamBuff.TeamBuff_Mavuika[2]
]
