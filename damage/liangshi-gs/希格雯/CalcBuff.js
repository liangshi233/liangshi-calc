import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
  data: {
    _BondOfLife: ({ params }) => Math.min((params.blPct * ((10 * 2)) + params.blPlus), 200)
  }
},
{
  title: '希格雯技能：[弹跳水疗法] 长按会使激愈水球造成的伤害提升与回复量[eDmg]%且生命之契被清除时，每清除一个源水之滴的生命之契将为她恢复[_energyevery]点元素能量。',
  data: {
    eDmg: ({ params }) => 5 * (params.elv || 0),
    _energyevery: ({ calc , attr }) => Math.min(((calc(attr.hp) * 0.1) / 2000), 5)
  }
},
{
  title: '希格雯天赋：[应有适当的休憩] 施放弹跳水疗法时，获得[dmg]%元素伤害加成',
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
  title: '希格雯1命：[「最快乐的精灵，可否懂得焦虑」] 弹跳水疗法的激愈水球能额外弹跳3.0次，静养计数产生的伤害值额外提升',
  cons: 1
},
{
  title: '希格雯2命：[「最仁慈的精灵，可否化解仇敌」] 弹跳水疗法抛出的激愈水球或过饱和心意注射命中敌人后，该敌人的元素抗性降低[kx]%',
  cons: 2,
   data: {
     kx: 35
   }
},
{
  title: '希格雯4命：[「最美丽的精灵，可否拒绝衰朽」] 过饱和心意注射的持续时间延长[_qSustainedPlus]秒。',
  cons: 4,
  data: {
    _qSustainedPlus: 3
  }
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
