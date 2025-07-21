export const TeamBuff_Nahida = [
{
  check: ({ params }) => params.team === true && params.Nahida === true && !params.TruceTime,
  title: '纳西妲天赋：[净善摄受明论] 提高领域内当前场上角色元素精通[mastery]点',
  data: {
    mastery: 250
  }
},
{
  check: ({ params }) => params.team === true && params.Nahida === true && params.ElementFireTeam === 0,
  title: '纳西妲2命：[正等善见之根] 处于蕴种印状态下的敌人受到原激化、超激化、蔓激化反应影响后,防御力降低[enemyDef]%',
  cons: 2,
  data: {
    enemyDef: 30
  }
},
{
  check: ({ params, element }) => params.team === true && params.Nahida === true && !['岩', '冰'].includes(element),
  title: '纳西妲2命：[正等善见之根] 处于蕴种印状态下的敌人受到的燃烧、绽放、超绽放、烈绽放反应伤害能够造成暴击，暴击率固定为[_bloomCpct]%，暴击伤害固定为[_bloomCdmg]%',
  cons: 2,
  data: {
    _bloomCpct: 20,
    _bloomCdmg: 100
  }
}]
