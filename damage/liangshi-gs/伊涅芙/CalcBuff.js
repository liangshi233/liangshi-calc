import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => (params.BurstUse || 0) > 0,
  title: '伊涅芙天赋：[全相重构协议] 施放元素爆发后元素精通提升[mastery]%',
  data: {
    mastery: ({ attr, calc }) => calc(attr.atk) * 6 / 100
  }
},
{
  check: ({ params }) => params.Lunar === true,
  title: '月兆祝赐：[象拟中继] 队伍中的角色触发感电反应时，将转为触发月感电反应,基础伤害提升[fypct]',
  data: {
    fypct: ({ attr, calc }) => Math.min((calc(attr.atk) / 100 * 0.7), 14)
  }
},
{
  check: ({ params }) => params.Lunar === true,
  title: '伊涅芙1命：[循环整流引擎] 展开光流屏障护盾时，月感电反应造成的伤害提升[lunarCharged]%',
  cons: 1,
  data: {
    lunarCharged: ({ attr, calc }) => Math.min((calc(attr.atk) / 100 * 2.5), 50)
  }
},
{
  title: '伊涅芙4命：[敕谕未至之路] 触发月感电反应时,恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 5
  }
}]
