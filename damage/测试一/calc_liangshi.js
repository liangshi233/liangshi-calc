export const details = [
  {
  title: '100%攻击力伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e')
},{
  title: '100%防御力伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.e['技能伤害防御力'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'e')
  }
},{
  title: '100%生命值伤害',
  dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害生命值'] / 100, 'e')
},{
  title: '护盾吸收量',
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.q['护盾吸收量1'] * calc(attr.hp) / 100 + talent.q['护盾吸收量2'] * 1) * 1)
},{
  title: '治疗量',
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.q['治疗量1'] * calc(attr.hp) / 100 + talent.q['治疗量2'] * 1)
},{
  title: '100%攻击力蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'vaporize')
},{
  title: '100%攻击力融化',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害攻击力'], 'e', 'melt')
},{
  title: '蔓激化伤害提升',
  dmg: ({ talent }, dmg) => dmg(talent.e['蔓激化伤害提升'], 'e', 'spread')
},{
  title: '超激化伤害提升',
  dmg: ({ talent }, dmg) => dmg(talent.e['超激化伤害提升'], 'e', 'aggravate')
},{
  title: '扩散反应伤害',
  dmg: ({}, { reaction }) => reaction('swirl')
},{
  title: '燃烧反应伤害',
  dmg: ({}, { reaction }) => reaction('burning')
},{
  title: '超导反应伤害',
  dmg: ({}, { reaction }) => reaction('superConduct')
},{
  title: '感电反应伤害',
  dmg: ({}, { reaction }) => reaction('electroCharged')
},{
  title: '超载反应伤害',
  dmg: ({}, { reaction }) => reaction('overloaded')
},{
  title: '碎冰反应伤害',
  dmg: ({}, { reaction }) => reaction('shatter')
},{
  title: '草原核伤害',
  dmg: ({ calc, attr }, { reaction }) => {return reaction('bloom')}
},{
  title: '超绽放伤害',
  dmg: ({ calc, attr }, { reaction }) => {return reaction('hyperBloom')}
},{
  title: '烈绽放伤害',
  dmg: ({ calc, attr }, { reaction }) => {return reaction('burgeon')}
}]


export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [{
  title: '1命：防御力降低[enemyDef]%',
  cons: 1,
  data: {
     enemyDef: 50
    }
  },{
  title: '2命：无视敌人[ignore]%防御力',
  cons: 2,
  data: {
     ignore: 50
    }
  },{
  title: '4命：护盾吸收量提升[shieldInc]%',
  cons: 4,
  data: {
     shieldInc: 100
     }
  }, {
  title: '6命：基础伤害提升伤害[plus]',
  cons: 6,
  data: {
    plus: ({ talent, calc, attr }) =>  calc(attr.atk)
  }
}, {
  title: '天赋1：反应抗性降低[fykx]%',
  data: {
    fykx: 100
  }
}
,{
  title: '天赋2：物理抗性与元素降低[kx]%',
  data: {
    phyKx: 100,
    kx: 100
  }
},{
    check: ({ params }) => params.team === true,
    title: '攻击力buff：攻击力提升[atkPct]%',
    data: {
    atkPct: 50
    }
},{
    check: ({ params }) => params.team === true,
    title: '数值攻击buff：攻击力提升[atkPlus]点',
    data: {
    atkPlus: 2000
    }
},{
    check: ({ params }) => params.team === true,
    title: '元素精通buff：元素精通提升[mastery]',
    data: {
    mastery: 50
    }
},{
    check: ({ params }) => params.team === true,
    title: '数值精通buff：元素精通提升[masteryInc]点',
    data: {
    masteryInc: 50
    }
},{
    check: ({ params }) => params.team === true,
    title: '伤害加成buff：伤害提升[dmg]%',
    data: {
    dmg: 50
    }
},{
    check: ({ params }) => params.team === true,
    title: '暴击加成buff：暴击率提升[cpct]%',
    data: {
    cpct: 50
    }
},{
    check: ({ params }) => params.team === true,
    title: '暴伤加成buff：暴击伤害提升[cdmg]%',
    data: {
    cdmg: 50
    }
},{
   check: ({ params }) => params.team === true,
   title: '护盾强效buff：护盾强效提升[shield]',
   data: {
    shield: 100
   }
},{
   check: ({ params }) => params.team === true,
   title: '治疗加成buff：治疗加成提升[heal]',
   data: {
   heal: 50
   }
},{
   check: ({ params }) => params.team === true,
   title: '受治疗加成buff：受治疗加成提升[healInc]',
   data: {
   healInc: 50
   }
},{
   check: ({ params }) => params.team === true,
   title: '扩散加成buff：扩散伤害提升[healInc]',
   data: {
   swirl: 100
   }
},{
   check: ({ params }) => params.team === true,
   title: '激化加成buff：激化反应带来的伤害提升[aggravate]',
   data: {
   aggravate: 20,
   spread：20
   }
}]
