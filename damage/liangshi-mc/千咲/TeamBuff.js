export const TeamBuff_Chisa = [
  {
    check: ({ params }) => params.team === true && params.Chisa === true,
    title: '千咲技能：[听骑士从心祈愿] 自身一定范围内，目标风蚀效应触发的间隔减少[buff]%，并使目标受到的风蚀效应伤害加深[erosion]%',
    data: {
      buff: 50,
      erosion: 50
    }
  },
  {
    check: ({ params }) => params.team === true && params.Chisa === true,
    title: '千咲延奏：[解弦式第零定律] 施加【异常效应】或造成异常效应伤害后，[dmg]%',
    data: {
      dmg: 17.5
    }
  }
]
