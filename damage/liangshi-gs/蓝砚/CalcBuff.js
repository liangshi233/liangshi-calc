import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '蓝砚天赋：[苍翎镇邪敕符] 元素战技造成的伤害值提升[ePlus],元素爆发造成的伤害值提升[qPlus]',
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.mastery) * 309 / 100,
    qPlus: ({ attr, calc }) => calc(attr.mastery) * 774 / 100
  }
},
{
  title: '蓝砚4命：[「揽龙鹰兮结血珠」] 施放元素爆发之后元素精通提升[mastery]',
  cons: 4,
  data: {
    mastery: 60
  }
}]
