export const WeaponTeamPolearm = {
// 1星

  新手长枪: false,
  '(test)穿模测试': false,

// 2星

  铁钉枪: false,

// 3星

  钺矛: false,
  '「旗杆」': false,
  白缨枪: false,
  黑缨枪: false,

// 4星

  流月针: false,
  西风长枪: false,
  龙脊长枪: false,
  公义的酬报: false,
  沙中伟贤的对答: false,
  匣里灭辰: false,
  试作星镰: false,
  黑岩刺枪: false,
  决斗之枪: false,
  千岩长枪: false,
  宗室猎枪: false,
  喜多院十文字: false,
  '「渔获」': false,
  断浪长鳍: false,
  风信之锋: false,
  峡湾长歌: false,
  勘探钻机: false,
  镇山之钉: false,
  虹的行迹: false,
  且住亭御咄: false,
  掘金之锹: false,
  拾慧铸熔: false,
  贯月矢: {
    check: ({ params, uid }) => !params.TruceTime && params.team === true,
    title: '队友武器：[贯月矢] 当前在场上拾取苏生之叶，攻击力提升[atkPct]% {此效果不叠加}',
    data: {
      atkPct: 32
    }
  },

// 5星

  'n/a': false,
  护摩之杖: false,
  天空之脊: false,
  贯虹之槊: false,
  和璞鸢: false,
  息灾: false,
  薙草之稻光: false,
  赤沙之杖: false,
  赤月之形: false,
  柔灯挽歌: false,
  血染荒城: false,
  香韵奏者: {
    check: ({ params, uid }) => params.team === true && params.HealNumber > 0,
    title: '队友武器：[香韵奏者] 受到治疗，攻击力提升[atkPct]% {此效果不叠加}',
    data: {
      atkPct: 64
    }
  },
  支离轮光: {
    check: ({ params, uid }) => params.team === true,
    title: '队友武器：[支离轮光] 创造护盾后月感电伤害提升[lunarCharged]%',
    data: {
      lunarCharged: 40
    }
  }
}



