export const TeamBuff_Mavuika = [
{
  check: ({ params }) => params.team === true && params.Mavuika === true,
  title: '玛薇卡2命：[灰烬的代价] 焚曜之环形态使附近的敌人的防御力降低[enemyDef]%',
  cons: 2,
  data: {
    enemyDef: 20
  }
},
{
  check: ({ params }) => params.team === true && params.Mavuika === true && params.FightTime >= 1,
  title: '玛薇卡4命：[「领袖」的觉悟] 施放元素爆发燔天之时后的伤害提升效果不再随时间降低，并额外获得[dmg]%伤害加成。',
  cons: 4,
  data: {
    dmg: 10
  }
},
{
  check: ({ params }) => params.team === true && params.Mavuika === true && params.FightTime >= 1,
  title: '玛薇卡天赋：[「基扬戈兹」] 施放元素爆发燔天之时后，拥有[_buff]战意，造成的伤害提升[dmg]%',
  data: {
    _buff: 40,
    dmg: ({ cons }) => cons >= 4 ? 40 : (40 * (1 - (7 / 20)))
  }
}]
