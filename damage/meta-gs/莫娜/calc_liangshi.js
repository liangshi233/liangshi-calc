export const details = [{
  title: '重击伤害',
  params: {team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '重击蒸发',
  params: {team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
}, {
  title: '水中幻愿持续伤害',
  params: {team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], 'e')
}, {
  title: '水中幻愿爆裂伤害',
  params: {team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['爆裂伤害'], 'e')
}, {
  title: 'Q泡影破裂伤害',
  params: { q: true , team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['泡影破裂伤害'], 'q')
}, {
  title: 'Q泡影破裂蒸发',
  params: { q: true , team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['泡影破裂伤害'], 'q', 'vaporize')
}, {
  title: '莫万香班 重击蒸发',
  params: { q: true , team: true , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
}, {
  title: '莫万香班 Q蒸发',
  params: { q: true , team: true , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['泡影破裂伤害'], 'q', 'vaporize')
}, {
	title: '深渊12-3 Q蒸发核爆',
  params: { q: true , team: false , hb: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['泡影破裂伤害'], 'q', 'vaporize')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,recharge,mastery'

export const defParams = {
  team: true , hb: true
}


export const buffs = [{
  title: '莫娜天赋2：基于元素充能效率获得水元素伤害[dmg]%',
  data: {
    dmg: ({ calc, attr }) => calc(attr.recharge) * 0.2
  }
}, {
  title: '莫娜1命：命中星异状态下的敌人水元素相关反应效果提升15%',
  cons: 1,
  data: {
    vaporize: ({ params }) => params.q ? 15 : 0
  }
}, {
  title: '莫娜4命：攻击处于星异状态下的敌人时暴击率提升15%',
  cons: 4,
  data: {
    cpct: ({ params }) => params.q ? 15 : 0
  }
}, {
  title: '莫娜6命：虚实流动状态后满Buff提升重击180%伤害',
  cons: 6,
  data: {
    a2Dmg: 180
  }
}, {
  title: '莫娜天赋：开Q获得[dmg]%伤害加成',
  data: {
    dmg: ({ talent }) => talent.q['伤害加成']
  }
}, {
  check: ({ params }) => params.team === true,
  title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
  sort: 9,
  data: {
    atkPct: 20,
    atkPlus: 1202.35
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
  sort: 9,
  data: {
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16,
    dmg: 40,
    atkPct: 20,
    kx: 40
  }
}, {
  check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
  title: '精1苍古2命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
  sort: 9,
  data: {
    aDmg: 16,
    a2Dmg: 16,
    a3Dmg: 16,
    dmg: 48,
    atkPct: 20,
    kx: 40,
    mastery: 200
  }
}, {
  check: ({ cons, params }) => (cons >= 6 && params.team === true),
  title: '精5苍古6命万叶：获得[dmg]%增伤(苍古普攻32增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
  sort: 9,
  data: {
    aDmg: 32,
    a2Dmg: 32,
    a3Dmg: 32,
    dmg: 48,
    atkPct: 40,
    kx: 40,
    mastery: 200
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 热诚之火：攻击力提高[atkPct]%',
  data: {
    atkPct: 25
  }
}, {
  check: ({ params }) => (params.team === false && params.hb === true),
  title: '深渊核爆：各种buff',
  data: {
    cdmg: 120,
    dmg: 40,
    mastery: 370,
    kx: 40,
    defPct: -15,
    hpPct: 25,
    atkPct: 128,
    atkPlus: 1202.35
  }
}, 'vaporize',
{title: '5.16最后修改：如有问题请输入 #伤害计算反馈'}
 ]
