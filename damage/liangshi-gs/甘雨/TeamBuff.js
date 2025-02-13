export const TeamBuff_Gan_Yu = [
{
  check: ({ params }) => params.team === true && params.Gan_Yu === true,
  title: '甘雨1命：[饮露] 二段蓄力重击的霜华矢或霜华绽发命中敌人时，会使敌人的元素抗性降低[kx]%',
  cons: 1,
  data: {
    kx: ({ element }) => ['冰'].includes(element) ? 15 : 0
  }
},
{
  check: ({ params }) => params.team === true && params.Gan_Yu === true,
  title: '甘雨4命：[西狩] 在降众天华的领域内，敌人受到的伤害会增加[dmg]%',
  cons: 4,
   data: {
    dmg: 25
   }
},
{
  check: ({ params }) => params.team === true && params.Gan_Yu === true,
  title: '甘雨天赋：[天地交泰] 降众天华领域内的队伍中当前场上角色获得[dmg]%元素伤害加成。',
  data: {
    dmg: ({ element }) => ['冰'].includes(element) ? 20 : 0
  }
}]
