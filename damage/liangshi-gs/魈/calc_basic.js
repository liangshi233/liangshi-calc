import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '风轮两立',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '开Q满被动E',
  params: { e: 1, layer: 5, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '靖妖傩舞·首插',
  params: {
    layer: 1,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
}, {
  title: '靖妖傩舞·首重',
  params: {
    layer: 1,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '靖妖傩舞·首二段普攻',
  params: {
    layer: 1,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
}, {
  title: '靖妖傩舞·尾插',
  params: {
    layer: 5,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
}, {
  title: '靖妖傩舞·尾重',
  params: {
    layer: 5,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '靖妖傩舞·尾六段普攻',
  params: {
    layer: 5,
    team: false
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['六段伤害'], 'a')
}, {
  title: '魈珐阿钟 满被动E',
  params: { e: 1, layer: 5, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '魈珐阿钟 尾插',
  params: {
    layer: 5,
    team: true
  },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg'

export const defParams = {
  layer: 0,
  team: true
}

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '靖妖傩舞：普通攻击/重击/下落攻击伤害提升[a3Dmg]%',
    data: {
      a3Dmg: ({ talent }) => talent.q['普通攻击/重击/下落攻击伤害提升'],
      a2Dmg: ({ talent }) => talent.q['普通攻击/重击/下落攻击伤害提升'],
      aDmg: ({ talent }) => talent.q['普通攻击/重击/下落攻击伤害提升']
    }
  }, {
    title: '魈天赋1：开Q后每3秒伤害提升5%，满层提高25%',
    data: {
      dmg: ({ params }) => params.layer * 5
    }
  }, {
    title: '魈天赋2：3层E使E的伤害提高45%',
    data: {
      eDmg: ({ params }) => params.e ? 45 : 0
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '宗室天空珐露珊：增加[dmg]%风元素伤害加成与[cdmg]%爆伤,降低[kx]%风元素抗性,增加[atkPct]%攻击力',
    data: {
      dmg: 38.25,
      cdmg: 40,
      kx: 30,
      atkPct: 20
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '祈风之赐：造成的风元素伤害提升[aPlus]',
    data: {
      aPlus: 278.4,
      a2Plus: 278.4,
      a3Plus: 278.4,
      ePlus: 278.4,
      qPlus: 278.4
    }
  }, {
    check: ({ cons, params }) => cons <= 1 && params.team === true,
    title: '千岩阿贝多：增加[atkPct]%攻击力',
    sort: 9,
    data: {
      atkPct: 20
    }
  }, {
    check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
    title: '千岩精1苍古阿贝多：增加[atkPct]%攻击力，普通攻击/重击/下落攻击伤害提升[aDmg]%',
    sort: 9,
    data: {
      atkPct: 40,
      a3Dmg: 16,
      a2Dmg: 16,
      aDmg: 16
    }
  }, {
    check: ({ cons, params }) => (cons >= 6 && params.team === true),
    title: '千岩精5苍古4命阿贝多：增加[atkPct]%攻击力，普通攻击/重击伤害提升[aDmg]%，下落攻击伤害提升[a3Dmg]%',
    sort: 9,
    data: {
      atkPct: 60,
      a3Dmg: 72,
      a2Dmg: 32,
      aDmg: 32
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '玉璋护盾：降低敌人全抗性20%',
    data: {
      kx: 20
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '元素共鸣 坚定之岩：护盾强效提升[shield]%，造成的伤害提升[dmg]%',
    data: {
      shield: 25,
      dmg: 15
    }
  },
  { title: '2.1最后修改：如有问题请输入 #伤害计算反馈' }
]
