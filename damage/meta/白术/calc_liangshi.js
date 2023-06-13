export const details = [{
  title: '游丝徵灵伤害',
  params: {team: false},
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},{
  title: '游丝徵灵蔓激化',
  params: {team: false},
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},{
  title: '游丝徵灵治疗量',
  params: {team: false},
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.e['治疗量2'][0] * calc(attr.hp) / 100 + talent.e['治疗量2'][1] * 1)
}, {
  title: '无郤气护盾吸收量',
  params: {team: false},
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.q['无郤气护盾吸收量2'][0] * calc(attr.hp) / 100 + talent.q['无郤气护盾吸收量2'][1] * 1) * 1)
},{
  title: '灵气脉技能伤害',
  params: {team: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['灵气脉技能伤害'], 'q')
},{
  title: '灵气脉蔓激化',
  params: {team: false},
  dmg: ({ talent }, dmg) => dmg(talent.q['灵气脉技能伤害'], 'q', 'spread')
},{
  title: '无郤气护盾治疗量',
  params: {team: false},
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.q['无郤气护盾治疗量2'][0] * calc(attr.hp) / 100 + talent.q['无郤气护盾治疗量2'][1] * 1)
},{
  title: '赛夜妲白E蔓激化',
  params: {team: true},
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},{
  title: '赛夜妲白Q蔓激化',
  params: {team: true},
  dmg: ({ talent }, dmg) => dmg(talent.q['灵气脉技能伤害'], 'q', 'spread')
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,hp,cpct,cdmg,mastery'

export const buffs = [{
  passive: 1,
  title: '白术天赋1：生命值低于50%获得20%治疗加成。高于50%获得25%草元素伤害加成',
  data: {
    dmg: 25,
    heal: 20
  }
}, {
  passive: 2,
  title: '白术天赋2：基于生命值，超激化带来的伤害提升[aggravate]%',
  data: {
    aggravate: ({ attr, calc }) => calc(attr.hp) * 0.008
  }
}, {
  cons: 4,
  title: '白术4命：元素爆发后元素精通提升80点',
  data: {
      mastery:80
  }
}, {
  cons: 6,
  title: '白术6命：元素爆发造成的伤害提高[qPlus]%',
  data: {
      qPlus: ({ attr, calc }) => calc(attr.hp) * 0.06
  }
}, {
  check: ({ cons, params }) => cons <= 3 && params.team === true,
  title: '0命精1终末夜兰：获得[dmg]%增伤,获得[atkPct]%攻击力,获得[mastery]%元素精通，',
  data: {
    dmg: 35,
    atkPct: 20,
    mastery: 100,
  }
}, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true),
  title: '4命精5终末夜兰：获得[dmg]%增伤,获得[atkPct]%攻击力,获得[mastery]%元素精通，增加40%生命值',
  data: {
    dmg: 50,
    mastery: 200,
    atkPct: 40,
	hpPct: 25
  }
}, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true),
  title: '精5千夜4命4深林纳西妲：增加精通[mastery],减防[enemyDef]%，降低[kx]%草元素抗性',
  data: {
    mastery: 418,
    enemyDef: 30,
	kx: 30
  }
}, {
  check: ({ cons, params }) => ((cons < 4 &&cons >= 2) && params.team === true),
  title: '精1千夜2命4深林纳西妲：增加精通[mastery],减防[enemyDef]%，降低[kx]%草元素抗性',
  data: {
    mastery: 290,
    enemyDef: 30,
	kx: 30
  }
}, {
  check: ({ cons, params }) => (cons < 2 && params.team === true),
  title: '精1千夜0命4深林纳西妲：增加精通[mastery]，降低[kx]%草元素抗性',
  data: {
    mastery: 290,
	kx: 30
  }
}, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 蔓生之草(激化/激绽/烈绽队)：触发激化或超绽放烈绽放反应后，提升元素精通[mastery]点',
  data: {
    mastery: 100
  }
},
 {title: '5.3最后修改：如有问题可联系1142607614反馈'}
 ]
