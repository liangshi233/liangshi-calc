export const TeamBuff_Sigewinne = [
{
  check: ({ params }) => params.team === true && params.Sigewinne === true && params.TruceTime > 0,
  title: '希格雯1命：[「最快乐的精灵，可否懂得焦虑」] 静养计数产生的伤害值额外提升[ePlus]',
  cons: 1,
  data: {
    ePlus: 700
  }
},
{
  check: ({ params }) => params.team === true && params.Sigewinne === true,
  title: '希格雯2命：[「最仁慈的精灵，可否化解仇敌」] 弹跳水疗法抛出的激愈水球或过饱和心意注射命中敌人后，该敌人的元素抗性降低[kx]%',
  cons: 2,
   data: {
    kx: ({ element }) => ['水'].includes(element) ? 35 : 0
   }
},
{
  check: ({ params }) => params.team === true && params.Sigewinne === true && params.TruceTime > 0,
  title: '希格雯天赋：[应有适当的休憩] 处于后台的角色的元素战技造成伤害时,伤害值提升[ePlus]',
  data: {
    ePlus: 2800
  }
}]
