export const details = [{
  title: '普通攻击一段超激化伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', '超激化')
},{
  title: '重击伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},{
  title: '重击超激化伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', '超激化')
},{
  check: ({ cons }) => cons < 2,
  dmgKey: 'e',
  title: '叄阶杀生樱伤害',
  params: { team: false },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·叁阶'], 'e')
}, {
  check: ({ cons }) => cons >= 2,
  dmgKey: 'e',
  title: '肆阶杀生樱伤害',
  params: { team: false },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·肆阶'], 'e')
}, {
  check: ({ cons }) => cons < 2,
  dmgKey: 'e_t',
  params: { team: true },
  title: '温三雷叄阶杀生樱伤害',
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·叁阶'], 'e')
}, {
  check: ({ cons }) => cons >= 2,
  dmgKey: 'e_t',
  params: { team: true },
  title: '温三雷肆阶杀生樱伤害',
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·肆阶'], 'e')
}, {
  title: '天狐霆雷伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q')
}, {
  title: '天狐霆雷超激化伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q', '超激化')
}, {
  title: '温三雷四段Q总伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'] + talent.q['天狐霆雷伤害'] * 3, 'q')
}]


export const mainAttr = 'atk,cpct,cdmg,mastery'
export const defDmgKey = 'e'

export const defParams = {
  team: true
}

export const buffs = [{
  title: '八重神子天赋2：基于元素精通提高杀生樱伤害[eDmg]%',
  data: {
    eDmg: ({ attr, calc }) => calc(attr.mastery) * 0.15
  }
}, {
  check: ({ cons }) => cons >= 4,
  title: '八重神子4命：杀生樱命中敌人后提高雷伤[dmg]%',
  data: {
    dmg: 20
  }
}, {
  cons: 6,
  title: '八重神子6命：杀生樱无视敌人[eDef]%防御',
  data: {
    eDef: 60
  }
}, {
  check: ({ cons, params }) => ((cons == 6) && params.team === true),
  title: '精5终末6命温迪：增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
  data: {
    atkPct: 40,
    kx: 60,
    mastery: 200
  }
}, {
  check: ({ cons, params }) => (cons <= 5 && params.team === true),
  title: '精1终末0命温迪：增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
  data: {
    atkPct: 20,
    kx: 40,
    mastery: 100
  }
}, {
  check: ({ params }) => params.team === true,
  title: '天空宗室九条：增加[atkPlus]点攻击力,[atkPct]%攻击与[cdmg]%爆伤',
  data: {
    atkPlus: 794.2,
    atkPct: 20,
    cdmg: 60
  }
}, {
  check: ({ params }) => params.team === true,
  title: '恶曜开眼：开E元素爆发伤害提升[qDmg]%',
  data: {
    qDmg: 27
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
 ]
