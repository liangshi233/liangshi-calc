import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '爱可菲天赋：[灵感浸入调味] 队伍中存在[buff]位水冰元素角色, 敌人抗性降低[kx]%',
  data: {
    buff: ({ params }) => (params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0),
    kx: ({ params }) => params.phy === true ? 0 : (((params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0)) * 5 + (((params.ElementWaterTeam || 0) + (params.ElementIceTeam || 0)) >= 4 ? 35 : 0))
  }
},
{
  check: ({ params }) => ![params.ElementWindTeam, params.ElementRockTeam, params.ElementFireTeam, params.ElementGrassTeam, params.ElementMineTeam].some(pas => pas !== undefined && pas >= 1),
  title: '爱可菲1命：[味蕾绽放的餐前旋舞] 队伍中所有角色的元素类型均为冰元素与水元素时，冰元素暴击伤害提升[cdmg]%',
  cons: 1,
  data: {
    cdmg: ({ params }) => params.phy === true ? 0 : 60
  }
},
{
  title: '爱可菲4命：[迷迭生香的配比秘方] 康复食疗的持续时间延长[_qSustainedPlus]秒,，通过康复食疗触发治疗时恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _qSustainedPlus: 6,
    _energyevery: 2
  }
}]
