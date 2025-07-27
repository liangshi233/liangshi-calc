import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '优菈技能：[冰潮的涡旋] [buffCount]层冷酷之心，提高[_interruption]%抗打断能力和[defPct]%防御力',
  data: {
    buffCount: ({ params }) => params.Grimheart || 2,
    _interruption: 50,
    defPct: ({ params }) => Math.min((30 * (params.Grimheart || 2)), 60)
  }
},
{
  title: '优菈技能：[冰潮的涡旋] 消耗[buff]层冷酷之心效果，使身边的敌人抗性降低[kx]%',
  data: {
    buff: ({ params }) => params.Grimheart || 2,
    kx: ({ talent, params }) => (params.Grimheart || 2) >= 1 ? talent.e['冰元素抗性降低'] : 0
  }
},
{
  title: '优菈技能：[凝浪之光剑] 光降之剑会提高抗打断能力[_interruption]%',
  data: {
    _interruption: 100
  }
},
{
  title: '优菈1命：[光潮的幻象] 消耗[buff]层冷酷之心效果后,物理伤害加成提高[phy]%',
  cons: 1,
  data: {
    buff: ({ params }) => params.Grimheart || 2,
    phy: ({ params }) => (params.Grimheart || 2) >= 1 ? 30 : 0
  }
},
{
  title: '优菈2命：[海沫的少女] 缩短冰潮的涡旋长按的冷却时间[_ecdPlus]秒',
  cons: 2,
  data: {
    _ecdPlus: 6
  }
},
{
  title: '优菈4命：[自卑者的逞强] 目标生命值[buff]%，光降之剑造成的伤害提高[qDmg]%',
  check: ({ params }) => params.Lightfall_Sword === true,
  cons: 4,
  data: {
    buff: ({ params, weapon }) => params.TargetHp || (weapon.name === '狼的末路' ? 30 : 100),
    qDmg: ({ params, weapon }) => (params.TargetHp || (weapon.name === '狼的末路' ? 30 : 100)) >= 50 ? 0 : 25
  }
},
{
  title: '优菈6命：[高贵者的义务] 光降之剑额外获得5.0层能量,每次获得能量层数时有50.0%概率额外获得1.0层',
  cons: 6
}]
