export const details = [{
  title: '开E后首段普攻',
  params: { pyro: false, cryo: false, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: '开E后重击',
  params: { pyro: false, cryo: false, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '开E染火冰首段普攻',
  params: { pyro: true, cryo: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: '开E染火冰后重击',
  params: { pyro: true, cryo: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '羽画·风姿华歌启动伤害',
  params: { pyro: false, cryo: false, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '狂言·式乐五番伤害',
  params: { pyro: true, cryo: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '扩散反应伤害',
  params: { team: false },
  dmg: ({}, { reaction }) => reaction('swirl')
}, {
  title: '流珐夜班 首段普攻',
  params: { pyro: true, cryo: false, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: '流珐夜班 重击',
  params: { pyro: true, cryo: false, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'

export const defParams = { team: true }

export const buffs = [
  {
    title: '羽画·风姿华歌：开启E后额外提升普通[aMulti]%伤害,重击[a2Multi]%伤害',
    data: {
      aMulti: ({ talent }) => talent.e['空居·不生断伤害'] - 100,
      a2Multi: ({ talent }) => talent.e['空居·刀风界伤害'] - 100
    }
  }, {
    title: '天赋拾玉得花：火元素攻击力提升30%,冰元素暴击率提升20%',
    data: {
      atkPct: ({ params }) => params.pyro ? 30 : 0,
      cpct: ({ params }) => params.cryo ? 20 : 0
    }
  }, {
    title: '二番·箙岛月白浪：至多使狂言·式乐五番造成的伤害提升200%',
    cons: 2,
    data: {
      qDmg: 200
    }
  }, {
    title: '四番·花月歌浮舟：染色+1，默认冰',
    cons: 4,
    data: {
      cpct: ({ params }) => params.cryo ? 0 : 20
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '千岩天空珐露珊：增加[dmg]%风元素伤害加成与[cdmg]%爆伤,降低[kx]%风元素抗性,增加[atkPct]%攻击力',
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
    title: '夜兰：获得[dmg]%增伤',
    data: {
      dmg: 50
    }
  }, {
    check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
    title: '精1终末夜兰：获得[dmg]%增伤，增加[atkPct]%攻击力与[mastery]精通',
    data: {
      atkPct: 20,
      mastery: 100,
      dmg: 35
    }
  }, {
    check: ({ cons, params }) => (cons >= 6 && params.team === true),
    title: '精5终末夜兰：获得[dmg]%增伤，增加[atkPct]%攻击力与[mastery]精通',
    data: {
      atkPct: 40,
      mastery: 200,
      dmg: 35
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
    sort: 9,
    data: {
      atkPct: 20,
      atkPlus: 1202.35
    }
  },
  { title: '9.5最后修改：如有问题请输入 #伤害计算反馈' }
]
