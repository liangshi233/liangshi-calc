export const WeaponTeamClaymore = {
// 1星

  训练大剑: false,
  '(test)穿模测试': false,

// 2星

  佣兵重剑: false,

// 3星

  白铁大剑: false,
  以理服人: false,
  铁影阔剑: false,
  沐浴龙血的剑: false,
  飞天大御剑: false,
  石英大剑: false,

// 4星

  西风大剑: false,
  祭礼大剑: false,
  试作古华: false,
  雪葬的星银: false,
  钟剑: false,
  宗室大剑: false,
  雨裁: false,
  白影剑: false,
  黑岩斩刀: false,
  螭骨剑: false,
  千岩古剑: false,
  衔珠海皇: false,
  桂木斩长正: false,
  恶王丸: false,
  饰铁之花: false,
  聊聊棒: false,
  浪影阔剑: false,
  '「究极霸王超级魔剑」': false,
  便携动力锯: false,
  硕果钩: false,
  撼地者: false,
  万能钥匙: false,
  玛海菈的水色: {
    check: ({ params, uid }) => params.team === true,
    title: '队友武器：[玛海菈的水色] 队伍中附近的角色攻击力提升[atkPlus]',
    data: {
      atkPlus: 1000 * (48 / 100) * (30 / 100)
    }
  },
  森林王器: {
    check: ({ params, uid }) => !params.TruceTime && params.team === true,
    title: '队友武器：[森林王器] 当前在场上拾取种识之叶，元素精通提升[mastery] {此效果不叠加}',
    data: {
      mastery: 120
    }
  },

// 5星

  'n/a': false,
  天空之傲: false,
  无工之剑: false,
  赤角石溃杵: false,
  苇海信标: false,
  裁断: false,
  山王长牙: false,
  焚曜千阳: false,
  狼的末路: {
    check: ({ params, uid }) => params.team === true,
    title: '队友武器：[狼的末路] 攻击命中生命值[buff]%的敌人，队伍中所有成员攻击力提升[atkPct]% {此效果不叠加}',
    data: {
      buff: ({ params }) => params.TargetHp || 30,
      atkPct: ({ params }) => (params.TargetHp || 30) > 30 ? 0 : 80
    }
  },
  松籁响起之时: {
    check: ({ params, uid }) => params.team === true,
    title: '队友武器：[松籁响起之时] 普通攻击与重击命中4.0次，使附近所有角色普通攻击速度提升[aSpeed]%,攻击力提升[atkPct]% {同类此效果不叠加}',
    data: {
      aSpeed: 24,
      atkPct: 40
    }
  }
}
