export const WeaponTeamCatalyst = {
// 1星

  '(test)穿模测试': false,
  学徒笔记: false,

// 2星

  口袋魔导书: false,

// 3星

  异世界行记: false,
  魔导绪论: false,
  翡玉法球: false,
  甲级宝珏: false,
  琥珀玥: false,
  讨龙英杰谭: {
    check: ({ params, uid }) => !params.TruceTime && params.team === true,
    title: '队友武器：[讨龙英杰谭] 主动切换角色时，新登场的角色攻击力提升[atkPct]% {此效果不叠加}',
    data: {
      atkPct: 48
    }
  },

// 4星

  西风秘典: false,
  祭礼残章: false,
  试作金珀: false,
  昭心: false,
  忍冬之果: false,
  苍纹角杯: false,
  流浪乐章: false,
  匣里日月: false,
  万国诸海图谱: false,
  黑岩绯玉: false,
  暗巷的酒与诗: false,
  嘟嘟可故事集: false,
  证誓之明瞳: false,
  盈满之实: false,
  遗祀玉珑: false,
  纯水流华: false,
  无垠蔚蓝之歌: false,
  乘浪的回旋: false,
  木棉之环: false,
  天光的纺琴: false,
  乌髓孑灯: false,
  白辰之环: {
    check: ({ params, uid }) => (params.ElementMineTeam || 0) > 0 && params.team === true,
    title: '队友武器：[白辰之环] 与雷元素反应后,获得相关元素伤害加成[dmg]% {此效果不叠加}',
    data: {
      dmg: 20
    }
  },
  流浪的晚星: {
    check: ({ params, uid }) => params.team === true,
    title: '队友武器：[流浪的晚星] 队伍中附近的其他角色提升[atkPlus]攻击力',
    data: {
      atkPlus: 1000 * (48 / 100) * (30 / 100)
    }
  },

// 5星

  'n/a': false,
  天空之卷: false,
  四风原典: false,
  尘世之锁: false,
  碧落之珑: false,
  不灭月华: false,
  神乐之真意: false,
  千夜浮梦: false,
  图莱杜拉的回忆: false,
  金流监督: false,
  万世流涌大典: false,
  冲浪时光: false,
  寝正月初晴: false,
  溢彩心念: false,
  鹤鸣余音: {
    check: ({ params, uid }) => params.team === true,
    title: '队友武器：[鹤鸣余音] 装备者下落攻击命中敌人后，队伍中附近的所有角色下落攻击造成的伤害提高[a3Dmg]% {此效果不叠加}',
    data: {
      a3Dmg: 80
    }
  },
  祭星者之望: {
    check: ({ params, uid }) => !params.TruceTime && params.team === true,
    title: '队友武器：[祭星者之望] 创造护盾后当前场上角色造成的伤害提升[dmg]% {此效果不叠加}',
    data: {
      dmg: 56
    }
  },
  纺夜天镜: {
    check: ({ params, uid }) => params.team === true,
    title: '队友武器：[纺夜天镜] 绽放反应伤害提升[bloom]%,超绽放、烈绽放伤害提升[burgeon]%,月绽放伤害提升[lunarBloom]%',
    data: {
      bloom: ({ params, refine, element }) => (((params.Moonsign || 0) >= 1 ? 1 : 0) + (['水', '草'].includes(element) ? 1 : 0)) === 2 ? step(120)[refine] : 0,
      burgeon: ({ params, refine, element }) => (((params.Moonsign || 0) >= 1 ? 1 : 0) + (['水', '草'].includes(element) ? 1 : 0)) === 2 ? step(80)[refine] : 0,
      hyperBloom: ({ params, refine, element }) => (((params.Moonsign || 0) >= 1 ? 1 : 0) + (['水', '草'].includes(element) ? 1 : 0)) === 2 ? step(80)[refine] : 0,
      lunarBloom: ({ params, refine, element }) => (((params.Moonsign || 0) >= 1 ? 1 : 0) + (['水', '草'].includes(element) ? 1 : 0)) === 2 ? step(40)[refine] : 0
    }
  }
}
