export const TeamBuff_Ororon = [
{
  check: ({ params }) => params.team === true && params.Ororon === true,
  title: '欧洛伦6命：[致深泉的颂赞] 触发固有天赋「夜翳的通感」的「显象超感」后，当前场上角色的攻击力提升[atkPct]%',
  cons: 6,
  data: {
    atkPct: 10 * 3
  }
},
{
  check: ({ params }) => params.team === true && params.Ororon === true,
  title: '欧洛伦天赋：[灵相的触媒] 元素战技暝色缒索中的宿灵球命中敌人后，普攻、重击或下落攻击命中敌人将恢复[_energyevery]点元素能量',
  data: {
    _energyevery: 3
  }
}]
