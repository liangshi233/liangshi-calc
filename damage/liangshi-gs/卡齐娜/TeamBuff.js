export const TeamBuff_Kachina = [
{
  check: ({ params }) => params.EnemiesNumber >= 1 && params.team === true && params.Kachina === true,
  title: '卡齐娜4命：[敌人越多，越要小心] 现在，认真时间！的超级钻钻领域中，存在的敌人数量为[_buff]名或更多时，领域中的队伍中当前场上角色的防御力提升[defPct]%',
  cons: 4,
  data: {
    _buff: ({ params }) => (params.EnemiesNumber || 4),
    defPct: ({ params }) => 4 * ((params.EnemiesNumber || 4) + 1)
  }
}]
