export const WeaponTeamSword = {
// 1星

  无锋剑: false,

// 2星

  银剑: false,

// 3星

  旅行剑: false,
  吃虎鱼刀: false,
  冷刃: false,
  黎明神剑: false,
  暗铁剑: false,
  飞天御剑: false,

// 4星

  西风剑: false,
  笛剑: false,
  祭礼剑: false,
  天目影打刀: false,
  水仙十字剑: false,
  宗室长剑: false,
  匣里龙吟: false,
  试作斩岩: false,
  铁蜂刺: false,
  黑岩长剑: false,
  黑剑: false,
  暗巷闪光: false,
  降临之剑: false,
  腐殖之剑: false,
  辰砂之纺锤: false,
  笼钓瓶一心: false,
  东花坊时雨: false,
  狼牙: false,
  海渊终曲: false,
  灰河渡手: false,
  船坞长剑: false,
  弥坚骨: false,
  息燧之笛: false,
  厄水之祸: false,
  谧音吹哨: false,
  织月者的曙色: false,
  原木刀: {
    check: ({ params }) => !params.TruceTime,
    title: '队友武器：[原木刀] 在场上拾取种识之叶，元素精通提升[mastery] {此效果不叠加}',
    refine: {
      mastery: 120
    }
  },
  西福斯的月光: {
    title: '队友武器：[西福斯的月光] 队伍中附近的角色提升[recharge]%元素充能效率',
    data: {
      recharge: 1000 * 0.072 * (30 / 100)
    }
  },

// 5星

  'n/a': false,
  '(test)竿测试': false,
  风鹰剑: false,
  天空之刃: false,
  斫峰之刃: false,
  磐岩结绿: false,
  雾切之回光: false,
  波乱月白经津: false,
  裁叶萃光: false,
  静水流涌之辉: false,
  有乐御簾切: false,
  赦罪: false,
  苍古自由之誓: {
    title: '队友武器：[苍古自由之誓] 触发2.0次元素反应，提高附近所有角色普攻重击与下落攻击[aDmg]%伤害,攻击力[atkPct]% {同类此效果不叠加}',
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32,
      atkPct: 40
    }
  },
  圣显之钥: {
    title: '队友武器：[圣显之钥] 为队伍中附近所有角色提供元素精通提升[mastery] {此效果不叠加}',
    data: {
      mastery: 36000 * (0.04 / 100)
    }
  },
  岩峰巡歌: {
    title: '队友武器：[岩峰巡歌] 使队伍中附近所有角色的所有元素伤害加成提高[dmg]% {此效果不叠加}',
    data: {
      dmg: Math.min((3200 / 1000 * 16), 51.2)
    }
  }
}
