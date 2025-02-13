import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '茜特菈莉1命：[四百星的芒刃] 进行腾跃、或是在空中进行瞄准或重击时，消耗的燃素降低45.0%',
  cons: 1
},
{
  title: '茜特菈莉2命：[吞心者的巡行] 元素精通提升[mastery],队伍中附近的角色触发冻结反应或融化反应后，抗性额外降低[_kx]%',
  cons: 2,
  data: {
    mastery: 125,
    _kx: 20
  }
},
{
  title: '茜特菈莉4命：[拒亡者的灵髑] 伊兹帕帕的霜陨风暴命中敌人时，并为茜特菈莉恢复[_nightsoul]点夜魂值和[_energyevery]点元素能量',
  cons: 4,
  data: {
    _nightsoul: 16,
    _energyevery: 8
  }
},
{
  title: '茜特菈莉6命：[原动天的密契] 施放元素战技消耗所有夜魂值时提供[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: ({ params }) => 2.5 * (Math.min(40, params.NightsoulUse) || 40)
  }
},
{
  title: '茜特菈莉天赋：[五重天的寒雨] 处于夜魂加持状态下时,触发冻结反应或融化反应后,敌人的抗性降低[_kx]%',
  data: {
    _kx: 20
  }
},
{
  check: ({ params }) => params.Storm === true,
  title: '茜特菈莉天赋：[白燧蝶的星衣] 伊兹帕帕的霜陨风暴造成的伤害提升[ePlus],元素爆发冰风暴造成的伤害提升[qPlus],队伍中的附近的角色触发「夜魂迸发」时恢复[_nightsoul]点夜魂值',
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.mastery) * 90 / 100,
    qPlus: ({ attr, calc }) => calc(attr.mastery) * 1200 / 100,
    _nightsoul: 16
  }
}]
