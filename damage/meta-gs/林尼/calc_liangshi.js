export const details = [{
  title: '隐具魔术箭伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['隐具魔术箭伤害'], 'a2')
}, {
  title: '礼花术弹伤害',
  params: {  team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['礼花术弹伤害'], 'a2')
}, {
  title: '眩惑光戏法',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '大魔术·灵迹巡游伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: 'Q引爆礼花伤害',
  params: { team: false , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['引爆礼花伤害'], 'q')
}, {
  title: '林尼三火重击',
  params: { team: true , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['隐具魔术箭伤害'], 'a2')
}, {
  title: '林尼三火引爆礼花',
  params: { team: true , hb: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['引爆礼花伤害'], 'q')
  }
]
  
  export const defDmgIdx = 1
  export const mainAttr = 'atk,cpct,cdmg,mastery'
  
  export const defParams = {
    team: true,
    hb: true
  }
  
  export const buffs = [
{
  title: '林尼天赋1：基于攻击力，隐具魔术箭造成的伤害提升60%',
  data: {
    a2Plus: ({ calc, attr }) => 80 * calc(attr.atk) / 100,
  }
},{
  title: '林尼天赋：基于攻击力，5层提升E[ePlus]点伤害',
  data: {
    ePlus: ({ talent, calc, attr }) => talent.e['技能伤害加成'] * calc(attr.atk) * 5 / 100,
  }
},{
  title: '林尼天赋2：林尼对处于火元素影响下的敌人造成的伤害提升60%',
  data: {
    dmg: 60
  }
}, {
  title: '林尼2命：暴击伤害提升[cdmg]%',
  cons: 2,
  data: {
    cdmg: 60
  }
}, {
  title: '林尼4命：火元素的重击攻击命中敌人火元素抗性降低25%',
  cons: 4,
  data: {
    kx: 25
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
  check: ({ params }) => params.team === true,
  title: '香菱6命：增加[dmg]%火伤',
  sort: 9,
  data: {
    dmg: 15
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
  check: ({ params }) => params.team === true,
  title: '完场喝彩：队伍中林尼以外每个元素类型为火元素的角色，提升20%伤害',
  data: {
    dmg: 40
  }
}, {
  check: ({ params }) => (params.team === false && params.hb === true),
  title: '深渊核爆：各种buff',
  data: {
    cdmg: 120,
    dmg: 80,
    mastery: 370,
    kx: 40,
    defPct: -15,
    atkPct: 133,
    atkPlus: 1202.35
  }
}, 'vaporize',
{title: '7.6最后修改：如有问题可联系1142607614反馈'}]
  