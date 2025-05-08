export const TeamBuff_Dahlia = [
{
  check: ({ params }) => params.team === true && params.Dahlia === true,
  title: '塔利雅天赋：[黠巧欢愉的祈颂] 当前场上角色处于「西风之眷」效果影响下时，攻击速度提升[_aSpeed]%',
  data: {
    _aSpeed: ({ attr, calc }) => Math.min((calc(attr.hp) / 1000 * 0.4), 15)
  }
},
{
  check: ({ params }) => params.team === true && params.Dahlia === true && params.ShieldTime > 0,
  title: '塔利雅2命：[眷怜启应] 处于圣眷护盾庇护下的角色，护盾强效提升[shield]%',
  cons: 2,
  data: {
    shield: 25
  }
},
{
  check: ({ params }) => params.team === true && params.Dahlia === true,
  title: '塔利雅6命：[愿一切欢睦陪伴你] 处于元素爆发纯耀的祷咏中的「西风之眷」效果影响下的场上角色的攻击速度提升[_aSpeed]%，角色倒下时，则立即复苏该角色；将该角色生命值恢复至100.0％',
  cons: 6,
  data: {
    _aSpeed: 10
  }
}]
