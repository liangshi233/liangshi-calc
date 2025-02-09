import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '希诺宁天赋：[四境四象回声] 拥有少于两枚经过元素转化的「源音采样」，普通攻击与下落攻击造成的伤害提升[aDmg]%',
  data: {
    aDmg: 30,
    a3Dmg: 30
  }
},
{
  title: '希诺宁天赋：[便携铠装护层] 队伍中的附近的角色触发「夜魂迸发」时，防御力提升[defPct]%',
  data: {
    defPct: 20
  }
},
{
  title: '希诺宁技能：[音火锻淬] 在采样器激活时降低附近的敌人的对应元素抗性[kx]%',
  data: {
    kx: ({ talent }) => talent.e['元素抗性降低']
  }
},
{
  title: '希诺宁1命：[献予慵眠的休假日] 「源音采样」激活时，提升队伍中附近的当前场上角色的抗打断能力[_interruption]%',
  cons: 1,
  data: {
    _interruption: 50
  }
},
{
  title: '希诺宁2命：[献予灼原的五重奏] 根据「源音采样」的元素类型，使造成的伤害提升[dmg]%',
  cons: 2,
  data: {
    dmg: 50
  }
},
{
  title: '希诺宁4命：[献予午后的花之梦] 施放音火锻淬后，普通攻击、重击与下落攻击造成的伤害提升[aPlus]',
  cons: 4,
  sort: 9,
  data: {
    aPlus: ({ attr, calc }) => calc(attr.def) * 65 / 100,
    a2Plus: ({ attr, calc }) => calc(attr.def) * 65 / 100,
    a3Plus: ({ attr, calc }) => calc(attr.def) * 65 / 100
  }
},
{
  title: '希诺宁6命：[献予永夜的狂欢舞] 处于夜魂加持状态下时，进行冲刺、腾跃、普通攻击、下落攻击时，无视夜魂加持状态下的限制，并提升普通攻击与下落攻击造成的伤害[aPlus] ',
  cons: 6,
  sort: 9,
  data: {
    aPlus: ({ attr, calc }) => calc(attr.def) * 300 / 100,
    a3Plus: ({ attr, calc }) => calc(attr.def) * 300 / 100
  }
}]
