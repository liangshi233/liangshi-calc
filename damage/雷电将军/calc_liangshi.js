export const details = [{
  title: '恶曜开眼协同攻击',
  params: {
    type: 1,
    num: 0,
    team: false,
	hb: false
  },
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['协同攻击伤害'], 'e')
},{
  title: '零愿力Q后重击',
  params: {
    type: 1,
    num: 0,
    team: false,
	hb: false
  },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['重击伤害'], 'q')
},{
  title: '满愿力Q后重击',
  params: {
    type: 1,
    num: 60,
    team: false,
	hb: false
  },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['重击伤害'], 'q')
}, {
  title: '零愿力梦想一刀',
  params: {
    type: 1,
    num: 0,
    team: false,
	hb: false
  },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q')
}, {
  title: '满愿力梦想一刀',
  params: {
    type: 0,
    num: 60,
    team: false,
	hb: false
  },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q')
}, {
  title: '雷九万班满愿力Q首刀',
  params: {
    type: 0,
    num: 60,
    team: true,
	hb: false
  },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q')
}, {
  title: '雷九万班满愿力重击',
  params: {
    type: 1,
    num: 60,
    team: true,
	hb: false
  },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['重击伤害'], 'q')
}, {
	title: '深渊7-3 Q核爆',
  params: {
    type: 0,
    num: 60,
    team: true,
	hb: true
  },
  dmg: ({ talent, attr }, dmg) => dmg(talent.q['梦想一刀基础伤害'], 'q')
}, {
 	title: '梦想一心单次能量恢复',
   params: {
     type: 0,
     num: 60,
     team: false,
 	 hb: false
   },
  dmg: ({ talent, calc, attr }) => {
    return {
      avg: talent.q['梦想一心能量恢复'] * ( 1 + ( ( calc(attr.recharge) - 100 ) * 0.006 ) )
    }
  }
 }]

export const defParams = {
  num: 60,
  type: 0,
  team: true,
  hb: true
}

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg,recharge,mastery'

export const buffs = [
  {
    title: '恶曜开眼：开E元素爆发伤害提升[qDmg]%',
    data: {
      qDmg: ({ talent }) => talent.e['元素爆发伤害提高'] * 90
    }
  }, {
    title: '梦想真说：Q满愿力获得[qPct]%大招倍率加成',
    data: {
      qPct: ({ talent, params }) => talent.q['愿力加成'][params.type || 0] * params.num
    }
  }, {
    check: ({ cons }) => cons >= 2,
    title: '雷电将军2命：大招无视敌人[qIgnore]%防御力',
    data: {
      qIgnore: 60
    }
  }, {
    title: '雷电将军天赋2：基于元素充能获得[dmg]%雷伤加成',
    data: {
      dmg: ({ attr }) => Math.max(attr.recharge.base + attr.recharge.plus - 100, 0) * 0.4
    }
  },{
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
    check: ({ cons, params }) => (cons < 3 && cons > 1 && params.team === true),
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
    check: ({ cons, params }) => (cons >= 3 && params.team === true),
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
    title: '教官天空九条：增加[atkPlus]点攻击力与[cdmg]%爆伤,精通[mastery]',
    data: {
      atkPlus: 794.2,
      cdmg: 60,
      mastery: 120
    }
  }, {
    check: ({ params }) => (params.team === true && params.hb === true),
    title: '深渊核爆：各种buff',
    data: {
      cdmg: 120,
      dmg: 40,
      atkPct: 40,
      defPct: -15
    }
  },
   {title: '5.15最后修改：如有问题可联系1142607614反馈'}
]
