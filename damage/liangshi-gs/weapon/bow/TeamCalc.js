export const WeaponTeamBow = {
  // 1星

  '(test)穿模测试': false,
  猎弓: false,

  // 2星

  历练的猎弓: false,

  // 3星

  反曲弓: false,
  信使: false,
  鸦羽弓: false,
  神射手之誓: false,
  弹弓: false,
  黑檀弓: false,

  // 4星

  西风猎弓: false,
  祭礼弓: false,
  苍翠猎弓: false,
  竭泽: false,
  冷寂迸音: false,
  绝弦: false,
  宗室长弓: false,
  弓藏: false,
  试作澹月: false,
  钢轮弓: false,
  黑岩战弓: false,
  暗巷猎手: false,
  落霞: false,
  幽夜华尔兹: false,
  风花之颂: false,
  破魔之弓: false,
  掠食者: false,
  曚云之月: false,
  王下近侍: false,
  鹮穿之喙: false,
  烈阳之嗣: false,
  静谧之曲: false,
  筑云: false,
  测距规: false,
  缀花之翎: false,
  碎链: false,
  罗网勾针: false,

  // 5星

  'n/a': false,
  天空之翼: false,
  阿莫斯之弓: false,
  冬极白星: false,
  若水: false,
  飞雷之弦振: false,
  猎人之径: false,
  最初的大魔术: false,
  白雨心弦: false,
  星鹫赤羽: false,
  陨龙之梦: false,
  终末嗟叹之诗: {
    check: ({ params, uid }) => params.team === true,
    title: '队友武器：[终末嗟叹之诗] 元素战技与元素爆发命中4.0次敌人，元素精通提高[mastery],攻击力提升[atkPct]% {同类此效果不叠加}',
    data: {
      mastery: 200,
      atkPct: 40
    }
  }
}
