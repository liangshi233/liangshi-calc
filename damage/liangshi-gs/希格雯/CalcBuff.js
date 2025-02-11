import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
  data: {
    _BondOfLife: ({ params, cons, weapon }) => Math.min((params.blPct * ((10 * 2)) + params.blPlus), 200)
  }
},
{
  title: '希格雯技能：[弹跳水疗法] 生命之契被清除时，每清除2000点生命之契将为她恢复[_energyevery]点元素能量。',
  data: {
    _energyevery: 1
  }
},
{
  title: '希格雯天赋：[应有适当的休憩] 施放弹跳水疗法时，获得[dmg]%水元素伤害加成',
  data: {
    dmg: 8
  }
},
{
  title: '希格雯天赋：[细致入微的诊疗] 基于队伍中所有角色当前生命之契的总和,提升[_heal]%治疗量',
  data: {
    _heal: 30
  }
},
{
  title: '希格雯1命：[「最快乐的精灵，可否懂得焦虑」] 弹跳水疗法的激愈水球能额外弹跳3次，静养计数产生的伤害值额外提升',
  cons: 1
},
{
  title: '希格雯2命：[「最仁慈的精灵，可否化解仇敌」] 弹跳水疗法抛出的激愈水球或过饱和心意注射命中敌人后，该敌人的水元素抗性降低[kx]%',
  cons: 2,
   data: {
     kx: 35
   }
},
{
  title: '希格雯4命：[「最美丽的精灵，可否拒绝衰朽」] 过饱和心意注射的持续时间延长3秒。',
  cons: 4
},
{
  title: '希格雯6命：[「最光辉的精灵，可否为我祷告」] 过饱和心意注射的暴击率提高[qCpct]%,暴击伤害提高[qCdmg]%',
  sort: 9,
  cons: 6,
  data: {
    qCpct: ({ calc, attr }) => Math.min(20, calc(attr.hp) / 1000 * 0.4) ,
    qCdmg: ({ calc, attr }) => Math.min(110, calc(attr.hp) / 1000 * 2.2)
  }
}]
