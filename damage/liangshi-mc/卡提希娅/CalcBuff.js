export const CalcBuff = [
  {
    check: ({ params }) => params.PlayName === "Fleurdelys",
    title: '卡提希娅技能：[听骑士从心祈愿] 自身一定范围内，目标风蚀效应触发的间隔减少[buff]%，并使目标受到的风蚀效应伤害加深[erosion]%',
    data: {
      buff: 50,
      erosion: 50
    }
  },
  {
    check: ({ params }) => params.PlayName === "Fleurdelys",
    title: '卡提希娅技能：[听骑士从心祈愿] 目标拥有[buff]层风蚀效应,对目标造成的伤害加深[qDmg]%',
    data: {
      buff: ({ params }) => params["风蚀效应"] || 0,
      qDmg: ({ params }) => Math.min((params["风蚀效应"] || 0), 5) * 20
    }
  },
  {
    title: '卡提希娅固有2：[以风刻痕留蚀] 目标拥有[buff]层风蚀效应,对其造成的伤害提升[dmg]%',
    tree: 2,
    data: {
      buff: ({ params }) => params["风蚀效应"] || 0,
      dmg: ({ params }) => Math.min(((params["风蚀效应"] || 0) > 0 ? Math.max(((params["风蚀效应"] || 0) * 10), 30) : 0), 60)
    }
  },
  {
    title: '卡提希娅1链：[因命运戴上冠冕] 已积攒[buff]点决意，暴击伤害提升[cdmg]%',
    cons: 1,
    data: {
      buff: ({ params }) => params.Resolve || 0, //此处Resolve为`卡提希娅`共鸣解放积攒的决意点数，并非「一心净土·雷电将军(雷)」的愿力
      cdmg: ({ params }) => Math.min((Math.floor((params.Resolve || 0) / 30) * 25), 100)
    }
  },
  {
    check: ({ params }) => params.PlayName === "Cartethyia",
    title: '卡提希娅2链：[听风潮斩断利刃] 卡提希娅普攻、重击、闪避反击、变奏技能倍率提升[a1Plus]%，空中攻击倍率提升[a3Plus]%',
    cons: 2,
    data: {
      a1Plus: ({ calc, attr }) => calc(attr.hp) * 50 / 100,
      a2Plus: ({ calc, attr }) => calc(attr.hp) * 50 / 100,
      a3Plus: ({ calc, attr }) => calc(attr.hp) * 200 / 100,
      a4Plus: ({ calc, attr }) => calc(attr.hp) * 50 / 100,
      lPlus: ({ calc, attr }) => calc(attr.hp) * 50 / 100
    }
  },
  {
    title: '卡提希娅3链：[以自身束悬高塔] 共鸣解放·看潮怒风哮之刃的伤害倍率提升[buff]%',
    cons: 3,
    data: {
      buff: 100
    }
  },
  {
    title: '卡提希娅4链：[再次敲响振翅的钟声] 队伍中的角色为目标附加【虚湮效应】、【聚爆效应】、【光噪效应】、【电磁效应】、【霜渐效应】、【风蚀效应】时伤害加成提升[dmg]%',
    cons: 4,
    data: {
      dmg: 20
    }
  },
  {
    check: ({ params }) => params.PlayName === "Fleurdelys",
    title: '卡提希娅6链：[尽一线挣扎自由] 目标受到的伤害提升[enemydmg]%',
    cons: 6,
    data: {
      enemydmg: 40
    }
  }
]