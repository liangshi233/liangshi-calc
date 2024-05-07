export const details = [{
  title: '逆焰之刃第三段伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段伤害'], 'e')
}, {
  title: '逆焰之刃第三段蒸发',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段伤害'], 'e', 'vaporize')
}, {
  title: '黎明爆发伤害',
  params: { q: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q')
}, {
  title: '黎明爆发蒸发伤害',
  params: { q: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'vaporize')
}, {
  title: '黎明爆发融化伤害',
  params: { q: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'melt')
}, {
  title: '开Q后单次重击',
  params: { q: true, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
}, {
  title: '凯万班融卢E三段融化',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['三段伤害'], 'e', 'melt')
}, {
  title: '凯万班融卢黎明融化',
  params: { q: true, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'melt')
}, {
  title: '融卢开Q后普攻一段融化',
  params: { q: true, team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'melt')
}]

export const defParams = { monv: 3, team: true }
export const mainAttr = 'atk,cpct,cdmg,mastery'
export const defDmgIdx = 2

export const buffs = [
  {
    title: '迪卢克天赋2：释放元素爆发后获得20%火伤加成',
    data: {
      dmg: ({ params }) => params.q ? 20 : 0
    }
  }, {
    title: '迪卢克1命：对于生命值高于50%的敌人，造成伤害提高15%',
    cons: 1,
    data: { dmg: 15 }
  }, {
    title: '迪卢克2命：受伤3层提高攻击力30%',
    cons: 2,
    data: { atkPct: 30 }
  }, {
    title: '迪卢克4命：间隔2秒释放E提高伤害40%',
    cons: 4,
    data: { eDmg: 40 }
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
    data: { atkPct: 25 }
  }, 'vaporize',
  { title: '5.16最后修改：如有问题请输入 #伤害计算反馈' }
]
