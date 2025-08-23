export const CalcBuff = [
  {
    title: '尤诺天赋：[于盈亏间涨落] [buff]层苍白死光的祝颂, 全伤害加深[dmg]%',
    data: {
      buff: ({ params }) => params["苍白死光的祝颂"] || 5,
      atkPct: ({ params }) => Math.min((params["苍白死光的祝颂"] || 5), 10) * 4
    }
  },
  {
    check: ({ params }) => params["月相流转"] === true,
    title: '尤诺1链：[圆与缺，皆替金枝镀色] 处于月相流转状态时，攻击提升[atkPct]%,处于满月领域每秒额外回复[_energyevery]点共鸣能量',
    cons: 2,
    data: {
      atkPct: 40,
      _energyevery: 1
    }
  },
  {
    title: '尤诺2链：[昼或夜，且以它为永恒] [buff]层苍白死光的祝颂，获得[dmg]%全伤害加深',
    cons: 2,
    data: {
      buff: ({ params }) => params["苍白死光的祝颂"] || 5,
      dmg: ({ params }) => (params["苍白死光的祝颂"] || 5) >= 10 ? 40 : 0
    }
  },
  {
    check: ({ params }) => params["月相流转"] === true && params["我痛饮他者的遗忘"] === true ,
    title: '尤诺3链：[我痛饮他者的遗忘] 处于月相流转状态时，月弓·普攻、共鸣技能·越限的弦引、月弓·闪避反击造成的伤害加深[dmg]%',
    cons: 3,
    data: {
      dmg: 65
    }
  },
  {
    title: '尤诺5链：[万千次虚掷的注视] 万千次虚掷的注视[qDmg]%',
    cons: 5,
    data: {
      qDmg: 20
    }
  },
  {
    title: '尤诺6链：[我所在，即为不变的独一] 重击·至臻的完满伤害倍率增加[buff]%',
    cons: 6,
    data: {
      buff: 1600
    }
  }
]