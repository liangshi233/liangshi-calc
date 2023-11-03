export const details = [
{
  title: '普攻四段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: '普攻四段融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'melt')
},
{
  title: '重华叠霜伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '重华叠霜融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `云开星落 ${count}柄灵刃总伤害`,
    params: { tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q')
  }
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `云开星落 ${count}柄灵刃融化`,
    params: { tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q', 'melt')
  }
},
{
  title: '重香行班 E融化',
  params: { teamA: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `重香行班 Q伤害`,
    params: { teamA: true , tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q')
  }
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `重香行班 Q融化`,
    params: { teamA: true , tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q', 'melt')
  }
}
]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  title: '重云天赋：[追冰剑诀] 灵刃·重华叠霜领域消失时唤出灵刃降低敌人[kx]%冰元素抗性',
  check: ({ params }) => params.tfkx === true,
  data: {
    kx: 15
  }
},
{
  title: '重云天赋：[吐纳真定] 处在灵刃·重华叠霜领域内的普通攻击的单手剑,双手剑,长柄武器角色攻击速度提升[_aSpeed]%',
  data: {
    _aSpeed: 8
  }
},
{
  title: '重云2命：[周天运转] 处于重华叠霜领域中获得[_cd]%冷却缩减',
  cons: 2,
  data: {
    _cd: 15
  }
},
{
  title: '重云4命：[浮云霜天] 攻击命中受到冰元素影响的敌人时回复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 1
  }
},
{
  title: '重云6命：[四灵捧圣] 对于生命百分比低于重云的敌人伤害提升[qDmg]%，灵刃增加一柄',
  cons: 6,
  data: {
    qDmg: 15
  }
},
{
  title: '班尼特技能：[美妙旅程] 处于鼓舞领域攻击力提升[atkPlus]点',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPlus: 1202.35
  }
},
{
  title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '元素共鸣：[热诚之火] 攻击力提高[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 25
  }
},
'melt',
 {title: '4.4最后修改：[10.17重置]'}
]
