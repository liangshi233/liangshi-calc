import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Favonian_Favor === true,
  title: '塔利雅天赋：[黠巧欢愉的祈颂] 当前场上角色处于「西风之眷」效果影响下时，攻击速度提升[_aSpeed]%',
  data: {
    _aSpeed: ({ attr, calc }) => Math.min((calc(attr.hp) / 1000 * 0.5), 20)
  }
},
{
  title: '塔利雅1命：[无瑕之引] 获得「祝颂」效果，将恢复[_energyevery]点元素能量',
  cons: 1,
  data: {
    _energyevery: 2.5
  }
},
{
  check: ({ params }) => params.Favonian_Favor === true && params.ShieldTime > 0,
  title: '塔利雅2命：[眷怜启应] 处于圣眷护盾庇护下的角色，护盾强效提升[shield]%',
  cons: 2,
  data: {
    shield: 25
  }
},
{
  check: ({ params }) => params.Favonian_Favor === true,
  title: '塔利雅4命：[众愿的集祷] 元素爆发纯耀的祷咏中的「西风之眷」效果的持续时间延长[_qSustainedPlus]秒',
  cons: 4,
  data: {
    _qSustainedPlus: 3
  }
},
{
  check: ({ params }) => params.Favonian_Favor === true,
  title: '塔利雅6命：[愿一切欢睦陪伴你] 处于元素爆发纯耀的祷咏中的「西风之眷」效果影响下的场上角色的攻击速度提升[_aSpeed]%，角色倒下时，则立即复苏该角色；将该角色生命值恢复至100.0％',
  cons: 6,
  data: {
    _aSpeed: 10
  }
}]
