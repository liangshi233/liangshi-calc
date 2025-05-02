export const TeamBuff_Ifa = [
{
  check: ({ params }) => params.team === true && params.Ifa === true,
  title: '伊法天赋：[场中医者视野] 队伍中附近的角色触发的扩散反应与感电反应造成的伤害提升[swirl]',
  data: {
    swirl: ({ params }) => Math.min((params["队伍夜魂值总和占位"] || 9999), 150),
    electroCharged: ({ params }) => Math.min((params["队伍夜魂值总和占位"] || 9999), 150)
  }
}]
