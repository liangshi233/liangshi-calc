export const details = [{
  title: '普通攻击一段伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},{
  title: '普通攻击二段伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},{
  title: '普通攻击三段伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},{
  title: '普通攻击四段伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},{
  title: '瞄准射击伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['瞄准射击'], 'a2', 'phy')
},{
  title: '满蓄力瞄准射击伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
},{
  title: '下落期间伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},{
  title: '低空下落伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},{
  title: '高空下落伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},{
  title: '破局矢伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
},{
  check: ({ cons }) => cons >= 6,
  title: '运筹帷幄破局矢',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56 , 'a2')
},{
  title: '破局矢蒸发',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2', '蒸发')
},{
  check: ({ cons }) => cons >= 6,
  title: '运筹帷幄破局矢蒸发',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56 , 'a2', '蒸发')
},{
  title: '萦络纵命索伤害',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
}, {
  title: '萦络纵命索蒸发',
  params: { q: false, team: false , sy: false},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
}, {
  title: 'Q协同单段伤害',
  params: { q: true, team: false , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
  }
}, {
  title: 'Q协同单段蒸发',
  params: { q: true, team: false , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q', '蒸发')
  }
}, {
  title: '渊图玲珑骰展开伤害',
  params: { q: true, team: false , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
  }
}, {
  title: '渊图玲珑骰展开蒸发',
  params: { q: true, team: false , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q', '蒸发')
  }
}, {
  title: 'Q协同15段伤害',
  params: { q: true, team: false , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 100), 'q')
    return {
      dmg: 8 * erming.dmg * count + 15 * q.dmg,
      avg: 8 * erming.avg * count + 15 * q.avg
    }
  }
}, {
  title: 'Q协同15段蒸发',
  params: { q: true, team: false , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let ermingzf = basic(calc(attr.hp) * (14 / 100), 'q', '蒸发')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100 ), 'q')
    let qzf = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100 ), 'q', '蒸发')
    return {
      dmg: 2 * erming.dmg * count + 6 * ermingzf.dmg * count + 30 * q.dmg + 15 * qzf.dmg,
      avg: 2 * erming.avg * count + 6 * ermingzf.dmg * count + 30 * q.avg + 15 * qzf.avg
    }
  }
}, {
  title: '非6命单人站场20秒',
  params: { q: true, team: false , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let z = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let e = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let counte = cons * 1 >= 1 ? 2 : 1
    let k = basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 100), 'q')
    return {
      dmg: z.dmg + 6 * a1.dmg + 6 * a2.dmg + 6 * a3.dmg + 6 * a4.dmg + e.dmg * counte + 8 * erming.dmg * count + 15 * q.dmg + k.dmg,
      avg: z.avg + 6 * a1.avg + 6 * a2.avg + 6 * a3.avg + 6 * a4.avg + e.avg * counte + 8 * erming.avg * count + 15 * q.avg + k.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  title: '6命单人站场20秒',
  params: { q: true, team: false , sy: false},
  dmg: ({ talent, attr, calc, cons },{ basic }) => {
    let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
    let qa = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2')
    let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
    let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
    let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
    let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 100, 'a', 'phy')
    let e = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let counte = cons * 1 >= 1 ? 2 : 1
    let qz = basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 100), 'q')
    return {
      dmg: a.dmg + 5 * qa.dmg + 5 * a1.dmg + 5 * a2.dmg + 5 * a3.dmg + 5 * a4.dmg + e.dmg * counte + 8 * erming.dmg * count + 15 * q.dmg + qz.dmg,
      avg: a.avg + 5 * qa.avg + 5 * a1.avg + 5 * a2.avg + 5 * a3.avg + 5 * a4.avg + e.avg * counte + 8 * erming.avg * count + 15 * q.avg + qz.avg
    }
  }
},{
  title: '夜莫万E伤害',
  params: { q: true , team: true , sy: false},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
},{
  title: '夜莫万E蒸发',
  params: { q: true , team: true , sy: false},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
}, {
  title: '夜莫万Q单段协同',
  params: { q: true , team: true , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
  }
}, {
  check: ({ cons }) => cons < 6,
  title: '夜莫万EE7次连携',
  params: { q: true, team: true , sy: false },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    return {
      dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
      avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
    }
  }
}, {
  check: ({ cons }) => cons < 6,
  dmgKey: 'q',
  title: '夜莫万EE双蒸7次连携',
  params: { q: true, team: true , sy: false },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    return {
      dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
      avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  title: '夜莫万6命EaEaaaa',
  params: { q: true, team: true , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
    return {
      dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
      avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  dmgKey: 'q',
  title: '夜莫万6命EaEaaaa双蒸',
  params: { q: true, team: true , sy: false},
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
    return {
      dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
      avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
    }
  }
}, {
  check: ({ cons }) => cons < 6 ,
  title: '胡行夜钟 21轴 对单',
  params: { q: false, team: false , sy: false, hxyz: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let count = cons * 1 >= 2 ? 1 : 0
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    return {
      dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
      avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
    }
  }
}, {
  check: ({ cons }) => cons >= 6,
  title: '胡行夜钟 21轴 对单',
  params: { q: false, team: false , sy: false, hxyz: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => {
    let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
    let erming = basic(calc(attr.hp) * (14 / 100), 'q')
    let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
    return {
      dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
      avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
    }
  }
},{
  title: '深渊12-3E蒸发',
  params: { q: false, team: true , sy: true },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
},{
  title: '4核正机之神E蒸发',
  params: { q: false, team: false , sy: false , llz: true},
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
},{
  title: '大世界多核E蒸发',
  params: { q: true, team: false , sy: false, dh: true },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', '蒸发')
}]


export const defDmgKey = 'q'
export const mainAttr = 'hp,cpct,cdmg'


export const defParams = {
  q: true,
  team: true
}


export const buffs = [{
  title: '夜兰天赋1：有4个不同元素类型角色时，夜兰生命值上限提高30%',
  data: {
    hpPct: 30
  }
}, {
  title: '夜兰4命：E络命丝爆发提高生命值，满Buff下提高40%',
  cons: 4,
  data: {
    hpPct: 40
  }
}, {
  title: '夜兰天赋2：Q持续过程中满层Buff下提高伤害50%',
  data: {
    dmg: ({ params }) => params.q ? 50 : 0
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
  check: ({ cons, params }) => (cons >= 2 && params.team === true),
  title: '千夜教官满命莫娜：获得[dmg]%增伤,暴击[cpct]%,精通[mastery]',
  data: {
    dmg: 60,
    vaporize:15,
    cpct: 15,
    mastery: 168
  }
}, {
  check: ({ cons, params }) => (cons < 2 && params.team === true),
  title: '千夜教官0命莫娜：获得[dmg]%增伤,精通[mastery]',
  data: {
    dmg: 60,
    mastery: 168
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 愈疗之水：生命值上限提升[hpPct]%',
  data: {
    hpPct: 25
  }
}, {
  check: ({ params }) => (params.team === false && params.hxyz === true),
  title: '胡行夜钟：生命值提升[hpPct]%,造成的伤害提升2.5%,水元素抗性降低35%',
  data: {
	hpPct: 25,
	eDmg: 2.5,	
	kx: 35 
  }
}, {
  check: ({ params }) => params.sy === true,
  title: '深渊核爆：属性过多不予展示',//夜莫万可
  data: {
    mastery: 40,
    cdmg: 120,
    dmg: 40,
	hpPct: 25,
    enemyDef: 23
  }
}, {
  check: ({ params }) => (params.team === false && params.llz === true),
  title: '正机之神四核：属性过多不予展示',
  data: {
    dmg: 139.1,//伤害加成：莫娜技能60% 枫原万叶天赋54.1% 药剂（激流精油）25%
    mastery: 368,//元素精通提升： 莫娜（千夜浮梦）48 莫娜（教官）120 枫原万叶2命200
	kx: 190 ,//抗性降低：枫原万叶（翠绿之影4）40% 恒常机关阵列（瘫痪）150%
	hpPct: 50,//生命值提升：元素共鸣（愈疗之水）25% 料理（绯樱虾仙贝）25%
    cdmg: 20//爆伤提升：料理（蒙德往事）20%
  }
}, {
  check: ({ params }) => (params.team === false && params.dh === true),
  title: '大世界多核：属性过多不予展示',
  data: {
    enemyDef: 83 ,//防御降低：丽莎天赋15% 雷泽4命15% 可莉2命23% 神里绫华4命30%
    dmg: 221.1,//伤害加成：莫娜技能60% 阿贝多（悠古的磐岩4）35% 枫原万叶天赋54.1% 丽莎（白辰之环）20% 芭芭拉2命15% 绮良良6命12% 药剂（激流精油）25%
    mastery: 1633,//元素精通提升：砂糖天赋304 砂糖天赋50 可莉（千夜浮梦）48 温迪（教官）120  温迪（终末嗟叹之诗）200 妮露（圣显之钥）336 纳西妲天赋250 阿贝多天赋125 枫原万叶2命200
	kx: 180 ,//抗性降低：砂糖（翠绿之影4）40% 行秋2命15% 妮露2命35% 温迪6命20% 钟离技能20% 恒常机关阵列（瘫痪）50%
	hpPct: 50,//生命值提升：元素共鸣（愈疗之水）25% 料理（绯樱虾仙贝）25%
    cdmg: 20//爆伤提升：料理（蒙德往事）20%
  }
}, 'vaporize',
{title: '8.24最后修改：如有问题可联系1142607614反馈'}
]
