export const details = [
{
  title: 'Q后满丹火印重击',
  params: { dhy: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][cons * 1 === 6 ? 4 : 3], 'a2')
},
{
  title: 'Q后满丹火印重击蒸发',
  params: { dhy: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][cons * 1 === 6 ? 4 : 3], 'a2', 'vaporize')
},
{
  title: '丹书立约伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '丹书立约蒸发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'vaporize')
},
{
  title: '丹书立约融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: '凭此结契伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '凭此结契蒸发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  title: '凭此结契融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg,mastery'


export const buffs = [
{
  title: '烟绯天赋：[关联条款] 通过重击消耗4枚丹火印,烟绯会提升[a2Dmg]%火伤',
  cons: 6,
  data: {
    a2Dmg: ({ params }) => params.dhy ? 20 : 0
  }
}, {
  title: '烟绯天赋：[关联条款] 通过重击消耗3枚丹火印,烟绯会提升[a2Dmg]%火伤',
  check: ({ cons }) => cons < 6,
  data: {
    a2Dmg: ({ params }) => params.dhy ? 15 : 0
  }
},
{
  title: '烟绯技能：[凭此结契] 为烟绯自己赋予最大数量的丹火印每间隔一段时间为烟绯赋予一枚丹火印并提高重击[a2Dmg]%的伤害',
  data: {
    a2Dmg: ({ talent }) => talent.q['重击伤害额外加成']
  }
},
{
  title: '烟绯技能：[普通攻击·火漆制印] 每枚丹火印都会降低烟绯[_stamina]%的体力消耗',
  data: {
    _stamina: 15
  }
},
{
  check: ({ params }) => params.dhy === true,
  title: '烟绯1命：[占理不饶人] 烟绯进行重击时,每持有一枚丹火印,都会提高烟绯在咏唱期间[_interruption]%的抗打断能力,并额外降低本次重击[_a2StaminaPct]%的体力消耗',
  cons: 1,
  data: {
    _interruption: 10,
    _a2StaminaPct: 10
  }
},
{
  title: '烟绯2命：[最终解释权] 烟绯的重击对于生命值低于50%的敌人，暴击率提高[a2Cpct]%',
  cons: 2,
  data: {
    a2Cpct: 10
  }
},
{
  title: '烟绯6命：[是额外条款] 烟绯持有的丹火印最大数量增加一枚',
  cons: 6
},
 'vaporize','melt',
{title: '12.30最后修改：[10.26重置] '}
]
