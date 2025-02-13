export const TeamBuff_Mizuki = [
{
  check: ({ params }) => params.team === true && params.Mizuki === true,
  title: '梦见月瑞希1命：[宿雾若水遥] 二十三夜待状态下的敌人受到风元素伤害而触发扩散反应的伤害值提升[fyplus]',
  cons: 1,
  sort: 9,
  data: {
    fyplus: 1000 * 1100 / 100
  }
},
{
  check: ({ params }) => params.team === true && params.Mizuki === true,
  title: '梦见月瑞希2命：[缠忆君影梦相见] 进入梦浮状态时，为附近的队伍中所有其他角色提供[dmg]%元素伤害加成',
  cons: 2,
  data: {
    dmg: 1000 * 2 / 100
  }
},
{
  check: ({ params }) => params.team === true && params.Mizuki === true,
  title: '梦见月瑞6命：[慕念萦心间] 梦浮状态下时，队伍中附近的角色触发的扩散反应造成的伤害,暴击率提升[_swirlCpct]暴击伤害提升[_swirlCdmg]%',
  cons: 6,
  data: {
    _swirlCpct: 30,
    _swirlCdmg: 100
  }
},
{
  check: ({ params }) => params.team === true && params.Mizuki === true,
  title: '梦见月瑞希技能：[秋沙歌枕巡礼] 触发的扩散反应造成的伤害提升[swirl]%',
  sort: 9,
  data: {
    swirl: 1000 * 0.22
  }
}]
