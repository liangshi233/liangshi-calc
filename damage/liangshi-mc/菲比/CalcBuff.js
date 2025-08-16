export const CalcBuff = [
  {
    check: ({ params }) => params["光噪效应"] > 0 && params["祈愿"] === "Absolution",
    title: '菲比技能：[交错星辉的祝祷] 施放时所消耗的【福音】减少15.0点，命中的目标拥有【光噪效应】时，伤害加深[a2Plus]%',
    data: {
      a2Plus: ({ attr, calc }) => calc(attr.atk) * 256 / 100
    }
  },
  {
    check: ({ params }) => params["光噪效应"] > 0 && params["祈愿"] === "Absolution",
    title: '菲比天赋：[交错星辉的祝祷] 施放时所消耗的【福音】减少15.0点，命中的目标拥有【光噪效应】时，伤害加深[a2Plus]%',
    data: {
      a2Plus: ({ attr, calc }) => calc(attr.atk) * 256 / 100
    }
  },

  {
    check: ({ params }) => params["祈愿"],
    title: '菲比固有2：[启示] 处于赦罪状态、告解状态时，伤害加成提升[dmg]%',
    tree: 2,
    data: {
      dmg: 12
    }
  },
  {
    title: '菲比1链：[暖灯与枕边的祝愿] 共鸣解放启明之誓愿伤害倍率提升[buff]%',
    cons: 1,
    data: {
      Buff: ({ params }) => (params["祈愿"] === "Confession" ? 255 : (params["祈愿"] === "Absolution" ? 90 : 0)),
      qPlus: ({ attr, calc, params }) => calc(attr.atk) / 100 * (params["祈愿"] === "Confession" ? 225 : (params["祈愿"] === "Absolution" ? 90 : 0))
    }
  },
  {
    check: ({ params }) => params["光噪效应"] > 0,
    title: '菲比2链：[泪水中飘摇的孤船] 延奏技能对拥有【光噪效应】的目标伤害加深[oDmg]%,默祷的【光噪效应】伤害加深效果额外提升[Spectro]%',
    cons: 2,
    data: {
      oDmg: ({ params }) => params["祈愿"] === "Confession" ? 120 : 0,
      Spectro: ({ params }) => params["祈愿"] === "Absolution" ? 120 : 0
    }
  },
  {
    check: ({ params }) => params["祈愿"],
    title: '菲比3链：[雏菊编织花环与梦] 重击星辉伤害倍率提升[a2Plus]%',
    cons: 3,
    data: {
      buff: ({ params }) => params["祈愿"] === "Confession" ? 249 : 91,
      a2Plus: ({ attr, calc, params }) => calc(attr.atk) / 100 * (params["祈愿"] === "Confession" ? 249 : 91)
    }
  },
  {
    title: '菲比4链：[再次敲响振翅的钟声] 普攻、普攻夏弥尔之星、闪避反击、夏弥尔之星·闪避反击命中目标时，目标抗性降低[kx]%',
    cons: 4,
    data: {
      kx: 10
    }
  },
  {
    title: '菲比5链：[向遥远光辉虔声祈祷] 施放变奏技能金色恩典时，伤害加成提升[dmg]%',
    cons: 5,
    data: {
      dmg: 12
    }
  },
  {
    check: ({ params }) => params["祈愿"],
    title: '菲比6链：[于静寂窗边啁啾歌唱] 施放共鸣技能召唤【镜之环】时，攻击提升[atkPct]%,向【镜之环】位置附带一次重击星辉。', //不视为施放重击
    cons: 6,
    data: {
      atkPct: 10
    }
  }
]