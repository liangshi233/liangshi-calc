import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '赛索斯技能：[古仪·鸣砂掣雷] 对敌人触发了感电、超导、超载、原激化、超激化、超绽放或雷元素扩散反应，恢复[_energyevery]元素能量',
  data: {
    _energyevery: 12
  }
},
{
  check: ({ params }) => params.BurstAfter >= 0 && params.BurstAfter <= 9,
  title: '赛索斯技能：[秘仪·瞑光贯影] 普通攻击将转为发射能穿透敌人的暝弦矢提升其造成的伤害[a2Plus]',
  data: {
    a2Plus: ({ talent, attr, calc }) => calc(attr.mastery) * talent.q['瞑弦矢伤害提升'] / 100
  }
},
{
  title: '赛索斯天赋：[黑鸢的密喻] 瞄准射击时，使蓄力时间降低至0.3秒，并获得[_energyevery]元素能量',
  data: {
    _energyevery: -20
  }
},
{
  check: ({ params }) => params.Shadowpiercing_Shot == true,
  title: '赛索斯天赋：[砂王的赐礼] 「热砂炫影」效果，使贯影箭造成的伤害值提升[a2Plus]',
  data: {
    a2Plus: ({ attr, calc }) => calc(attr.mastery) * 600 / 100
  }
},
{
  check: ({ params }) => params.Shadowpiercing_Shot == true,
  title: '赛索斯1命：[封龛谒灵歌] 贯影箭的暴击率提升[a2Cpct]%',
  cons: 1,
  data: {
    a2Cpct: 15
  }
},
{
  title: '赛索斯2命：[寂秘纸草经] 通过古仪·鸣砂掣雷恢复元素能量或施放秘仪·瞑光贯时获得[dmg]%雷元素伤害加成',
  cons: 2,
  data: {
    dmg: 15 * 2
  }
},
{
  title: '赛索斯4命：[真念鸵羽集] 贯影箭与暝弦矢命中2名及以上的敌人时，队伍中附近的所有角色的元素精通提升[mastery]',
  cons: 4,
  data: {
    mastery: 80
  }
},
{
  title: '赛索斯6命：[巡日塔门书] 贯影箭命中敌人后，将返还因固有天赋「黑鸢的密喻」消耗的元素能量',
  cons: 6
}]
