import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
  characterBuffGs,
  enemyBuffGs,
  ImaginariumBuff,
  MasteryGs,
  {
    title: '爱诺天赋：[结构化功率提升] 元素爆发造成的伤害提升[qPlus]',
    data: {
      qPlus: ({ attr, calc }) => calc(attr.mastery) * 50 / 100
    }
  },
  {
    check: ({ params }) => ((params.SkillsUse || 1) + (params.BurstUse || 0)) > 0,
    title: '爱诺1命：[灰与力场的平衡理论] 施放元素战技或元素爆发后元素精通提升[mastery]点',
    cons: 1,
    data: {
      mastery: 80
    }
  },
  {
    title: '爱诺4命：[黄油与猫与供能法则] 元素战技命中敌人时恢复[_energyevery]点元素能量',
    cons: 4,
    data: {
      _energyevery: 10
    }
  },
  {
    check: ({ params }) => (params.BurstUse || 0) > 0 && !params.TruceTime,
    title: '爱诺6命：[「我愿将这血与泪奉予月明」] 施放元素爆发后,当前场上角色触发的感电、绽放、月感电、月绽放造成的伤害提升[lunarBloom]%',
    cons: 6,
    data: {
      electroCharged: ({ params }) => ((params.Moonsign || 0) >= 3 ? 35 : 15),
      bloom: ({ params }) => ((params.Moonsign || 0) >= 3 ? 35 : 15),
      lunarCharged: ({ params }) => ((params.Moonsign || 0) >= 3 ? 35 : 15),
      lunarBloom: ({ params }) => ((params.Moonsign || 0) >= 3 ? 35 : 15)
    }
  }
]
