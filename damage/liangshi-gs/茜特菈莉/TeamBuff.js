export const TeamBuff_Citlali = [
{
  check: ({ params }) => params.team === true && params.Citlali === true,
  title: '茜特菈莉1命：[四百星的芒刃] 附近的当前场上角色的普通攻击、重击、下落攻击、元素战技或元素爆发造成伤害时，提升造成的伤害值[aPlus]',
  cons: 1,
  data: {
    aPlus: 1000 * 200 / 100,
    a2Plus: 1000 * 200 / 100,
    a3Plus: 1000 * 200 / 100,
    ePlus: 1000 * 200 / 100,
    qPlus: 1000 * 200 / 100
  }
},
{
  check: ({ params }) => params.team === true && params.Citlali === true,
  title: '茜特菈莉2命：[吞心者的巡行] 处于白曜护盾的庇护下或是伊兹帕帕跟随下元素精通提升[mastery],队伍中附近的角色触发冻结反应或融化反应后，抗性额外降低[kx]%',
  cons: 2,
  data: {
    mastery: 250,
    kx: ({ element }) => ['水','火'].includes(element) ? 20 : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Citlali === true,
  title: '茜特菈莉6命：[原动天的密契] 施放元素战技消耗所有夜魂值时提供[dmg]%元素伤害加成',
  cons: 6,
  data: {
    dmg: ({ element }) => ['水','火'].includes(element) ? (1.5 * 40) : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Citlali === true,
  title: '茜特菈莉天赋：[五重天的寒雨] 触发冻结反应或融化反应后,敌人的抗性降低[kx]%',
  data: {
    kx: ({ element }) => ['水','火'].includes(element) ? 20 : 0
  }
}]
