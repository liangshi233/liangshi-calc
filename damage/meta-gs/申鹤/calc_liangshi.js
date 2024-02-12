export const details = [{
  title: 'E基础伤害提升值',
  params: {team:false},
  dmg: ({ talent, calc, attr }) => {
    return {
      avg: talent.e['伤害值提升'] * calc(attr.atk) / 100
    }
  }
}, {
  title: 'E点按技能伤害',
  params: {team:false,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['点按技能伤害'], 'e')
}, {
  title: 'E点按融化伤害',
  params: {team:false,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['点按技能伤害'], 'e', 'melt')
}, {
  title: 'E长按技能伤害',
  params: {team:false,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e')
}, {
  title: 'E长按融化伤害',
  params: {team:false,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e', 'melt')
}, {
  title: 'Q每跳伤害',
  params: {team:false,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}, {
  title: 'Q每跳融化伤害',
  params: {team:false,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q', 'melt')
}, {
  title: '神鹤万心 E点按',
  params: {team:true,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['点按技能伤害'], 'e')
}, {
  title: '神鹤万心 E长按',
  params: {team:true,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e')
}, {
  title: '神鹤万心 Q每跳',
  params: {team:true,hb:false},
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}, {
	title: '深渊12-3 E长按融化核爆',
  params: {team:false , hb:true},
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e', 'melt')
}]

export const mainAttr = 'atk,cpct,cdmg,mastery'
export const defDmgIdx = 0

export const defParams = {
    team:true,hb:true
}

export const buffs = [{
  title: '申鹤天赋1：Q范围内冰伤提高15%',
  data: {
    dmg: 15
  }
}, {
  title: '申鹤天赋2：点按E提高15%元素战技及元素爆发伤害',
  data: {
    cpct: 10
  }
}, {
  title: '申鹤2命：Q范围内暴击伤害提高15%',
  cons: 2,
  data: {
    cdmg: 15
  }
}, {
  title: '申鹤天赋：E提升冰伤害[ePlus]',
  sort: 5,
  data: {
    ePlus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.atk) / 100,
    qPlus: ({ talent, calc, attr }) => talent.e['伤害值提升'] * calc(attr.atk) / 100,
  }
}, {check: ({ cons,params }) => cons <= 1 && params.team === true,
    title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
    data: {
      aDmg:16,
      a2Dmg:16,
      a3Dmg:16,
      dmg: 40,
      atkPct:20,
      kx:40,
   }
  }, {check: ({ cons,params }) => ((cons < 6 && cons >1) && params.team === true),
    title: '精1苍古2命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
    data: {
      aDmg:16,
      a2Dmg:16,
      a3Dmg:16,
      dmg: 48,
      atkPct:20,
      kx:40,
      mastery:200
   }
  }, {check: ({ cons,params }) =>  (cons >= 6 && params.team === true),
    title: '精5苍古6命万叶：获得[dmg]%增伤(苍古普攻32增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
    data: {
      aDmg:32,
      a2Dmg:32,
      a3Dmg:32,
      dmg: 48,
      atkPct:40,
      kx:40,
      mastery:200
   }
  }, 
  {check: ({ cons,params }) =>  (cons >= 4 && params.team === true),
    title: '4命神里绫华：敌人防御力降低[enemyDef]',
    data: {
      enemyDef: 30
   }
  }, 
  {  
	check: ({ params }) => params.team === true,
    title: '千岩讨龙0命珊瑚宫心海：增加[atkPct]%攻击',
    data: {
      atkPct:68
   }
  }, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 粉碎之冰：攻击处于冰元素附着或冻结下的敌人时，暴击率提高[cpct]%',
  data: {
    cpct: 15
  }
}, {
  check: ({ params }) => (params.team === false && params.hb === true),
  title: '深渊核爆：各种buff',
  data: {
    cdmg: 120,
    dmg: 100,
    mastery: 370,
    kx: 40,
    atkPct: 128,
    defPct: -25,
    atkPlus: 1202.35
  }
},
 {title: '2.28最后修改：如有问题请输入 #伤害计算反馈'}
]
