export const details = [{
  title: '普攻前五段',
  talent: 'a',
  params: { team: false },
  dmg: ({ talent }, dmg) => {
    let t1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let t2 = dmg(talent.a['二段伤害'], 'a', 'phy')
	let t3 = dmg(talent.a['三段伤害'], 'a', 'phy')
	let t4 = dmg(talent.a['四段伤害'], 'a', 'phy')
	let t5 = dmg(talent.a['五段伤害'], 'a', 'phy')
    return {
      dmg: t1.dmg + t2.dmg + t3.dmg + t4.dmg + t5.dmg,
      avg: t1.avg + t2.avg + t3.avg + t4.avg + t5.avg
    }
  }
},{
  title: '玉璋护盾量',
  talent: 'e',
  params: { team: false },
  dmg: ({ attr, calc, talent }, { shield }) => shield(talent.e['护盾基础吸收量'] + calc(attr.hp) * talent.e['护盾附加吸收量'] / 100)
},{
  title: '共鸣伤害',
  talent: 'e',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][2], 'e')
},{
  title: '岩脊伤害',
  talent: 'e',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
},{
  title: '护盾启动伤害',
  talent: 'e',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
}, {
  title: '天星伤害',
  talent: 'q',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '深渊7-3 Q核爆',
  talent: 'q',
  params: { hb: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '钟鹤云重 钟离普攻前五段',
  talent: 'a',
  params: { team: true },
  dmg: ({ talent }, dmg) => {
    let t1 = dmg(talent.a['一段伤害'], 'a')
    let t2 = dmg(talent.a['二段伤害'], 'a')
	let t3 = dmg(talent.a['三段伤害'], 'a')
	let t4 = dmg(talent.a['四段伤害'], 'a')
	let t5 = dmg(talent.a['五段伤害'], 'a')	
    return {
      dmg: t1.dmg + t2.dmg + t3.dmg + t4.dmg + t5.dmg,
      avg: t1.avg + t2.avg + t3.avg + t4.avg + t5.avg
    }
  }
}, {
  title: '胡行夜钟 21轴 对单',
  params: { team: false , hxyz: true },
  dmg: ({ talent }, dmg) => {
    let hd = dmg(talent.e['长按伤害'], 'e')
    let gm = dmg(talent.e['岩脊伤害/共鸣伤害'][2], 'e')
    let q = dmg(talent.q['技能伤害'], 'q')
    return {
      dmg: 1 * hd.dmg +  11 * gm.dmg   + 1 * q.dmg,
      avg: 1 * hd.avg +  11 * gm.avg   + 1 * q.avg
    }
  }
}]

export const defDmgIdx = 1
export const mainAttr = 'hp,atk,cpct,cdmg'

export const defParams = {
  team: true
}

export const buffs = [{
  title: '钟离天赋1：满层Buff下护盾强效提高25%',
  data: {
    shield: 25
  }
}, {
  title: '岩系护盾：岩系护盾吸收效率150%',
  data: {
    shieldInc: 50
  }
}, {
  title: '钟离天赋2：基于生命值上限，普通攻击重击下落攻击伤害提高[aPlus]，共鸣伤害提高[ePlus]，天星伤害提高[qPlus]',
  data: {
	aPlus: ({ attr, calc }) => calc(attr.hp) * 0.0139,
	a2Plus: ({ attr, calc }) => calc(attr.hp) * 0.0139,
	a3Plus: ({ attr, calc }) => calc(attr.hp) * 0.0139,
    ePlus: ({ attr, calc }) => calc(attr.hp) * 0.019,
    qPlus: ({ attr, calc }) => calc(attr.hp) * 0.33
  }
}, {
  title: '玉璋护盾：降低敌人全抗性[kx]%',
  data: {
    kx: 20
  }
}, {
  check: ({ cons, params }) => (cons >= 6 && params.team === true),
  title: '精5息灾宗室申鹤：增加[atkPct]%攻击力获得[dmg]%增伤,减抗[kx]%,爆伤15%,提升冰伤害5700',
  sort: 9,
  data: {
	atkPct: 20,
    dmg: 30,
    kx: 15,
    cdmg: 15,
    aPlus: 5700 * 2,
    ePlus: 5700,
    qPlus: 5700
  }
}, {
  check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
  title: '精1息灾宗室2命申鹤：增加[atkPct]%攻击力获得[dmg]%增伤,减抗[kx]%,爆伤15%,提升冰伤害4300',
  sort: 9,
  data: {
    atkPct: 20,
    dmg: 30,
    kx: 15,
    cdmg: 15,
    aPlus: 4300 * 2,
    ePlus: 4300,
    qPlus: 4300
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '精1息灾宗室申鹤：增加[atkPct]%攻击力获得[dmg]%增伤,减抗[kx]%,提升冰伤害4300',
  sort: 9,
  data: {
    atkPct: 20,
    dmg: 30,
    kx: 15,
    aPlus: 4300 * 2,
    ePlus: 4300,
    qPlus: 4300
  }
}, {
  check: ({ params }) => params.team === true,
  title: '云堇：获得[aDmg]%增伤，提升普通攻击伤害2336',
  sort: 9,
  data: {
    aDmg: 15,
	aPlus: 2336 * 2
  }
}, {
  check: ({ cons, params }) => cons <= 1 && params.team === true,
  title: '千岩重云：增加[atkPct]%攻击力',
  sort: 9,
  data: {
    atkPct: 20
  }
}, {
  check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
  title: '狼末千岩重云：增加[atkPct]%攻击力',
  sort: 9,
  data: {
    atkPct: 60
  }
}, {
  check: ({ cons, params }) => (cons >= 6 && params.team === true),
  title: '精5狼末千岩重云：增加[atkPct]%攻击力',
  sort: 9,
  data: {
    atkPct: 100
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 坚定之岩：护盾强效提升[shield]%，造成的伤害提升[dmg]%，降低敌人[kx]%岩元素抗性',
  data: {
    shield: 25,
    dmg: 15,
    kx: 20
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 粉碎之冰：攻击处于冰元素附着或冻结下的敌人时，暴击率提高[cpct]%',
  data: {
    cpct: 15
  }
}, {
  check: ({ params }) => (params.team === false && params.hxyz === true),
  title: '胡行夜钟：生命值提升[hpPct]%,造成的伤害提升35%,暴击率提升12%',
  data: {
	hpPct: 25,
	eDmg: 35,
	qDmg: 50,
    qCpct: 12	  
  }
}, {
  check: ({ params }) => (params.hb === true),
  title: '深渊核爆：各种buff',
  data: {
    cdmg: 160,
    shield: 25,
    kx: 20,
    defPct: 25,
    defPlus: 438,
    atkPct: 108,
    atkPlus: 1202.35,
    dmg: 130,
    cpct: 15
  }
},
 {title: '6.25最后修改：如有问题可联系1142607614反馈'}
 ]
