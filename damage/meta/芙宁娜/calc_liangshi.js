 import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

export const details = [{
  check: ({ cons }) => cons >= 2,
  title: '2命普攻伤害提升值-荒',
  params: { conshp: true },
  dmg: ({ calc, attr }) => {
    return {
      avg: Format.number ( ( calc(attr.hp) * 0.3 ) ) ,
      type: 'text'
    }
  }
}, {
  title: '众水的歌者治疗量',
  params: { conshp: false },
  dmg: ({ talent, attr, calc }, { heal }) =>
    heal(talent.e['众水的歌者治疗量2'][0] * calc(attr.hp) / 100 + talent.e['众水的歌者治疗量2'][1] * 1)
}, {
  title: '海薇玛夫人伤害',
  params: { conshp: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4 , 'e')
}, {
  title: '乌瑟勋爵伤害',
  params: { conshp: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4 , 'e')
}, {
  title: '谢贝蕾妲小姐伤害',
  params: { conshp: false },
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4 , 'e')
}, {
  title: '谢贝蕾妲小姐蒸发',
  params: { conshp: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4 , 'e', '蒸发')
}, {
  title: '舞台展开伤害',
  params: { conshp: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
}, {
  title: 'Q展开蒸发伤害',
  params: { conshp: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q', '蒸发')
}, {
  title: '心夜万芙 谢贝蕾妲',
  params: { team: true , conshp: false },
  dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4 , 'e')
}, {
  title: '心夜万芙 舞台展开',
  params: { team: true , conshp: true },
  dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
}]


export const mainAttr = 'hp,cpct,cdmg'
export const defDmgKey = 'e'


export const buffs = [{title: '芙宁娜天赋：消耗队友生命值提升E伤害至原来的140%'}, {
  title: '芙宁娜天赋：450层提升[dmg]%伤害与[heal]%治疗加成',
  data: {
    dmg: ({ talent }) => talent.q['气氛值转化提升伤害比例'] * 450 ,
    heal: ({ talent }) => talent.q['气氛值转化治疗加成比例'] * 450
  }
}, {
  title: '芙宁娜天赋2：基于生命值提升召唤物提升[eDmg]%伤害',
  data: {
    eDmg: ({ calc, attr }) => Math.min( 28 , ( calc(attr.hp) ) / 1000 * 0.7 )
  }
}, {
  title: '芙宁娜1命：层数上限提升150层',
  cons: 1,
  data: {
    dmg: ({ talent }) => talent.q['气氛值转化提升伤害比例'] * 150 ,
    heal: ({ talent }) => talent.q['气氛值转化治疗加成比例'] * 150
  }
}, {
  title: '芙宁娜2命：基于生命值的30%提升普通攻击伤害值[aPct]点',
  cons: 2,
  data: {
    aPct: ({ calc, attr }) => calc(attr.hp) * 0.3 ,
    a2Pct:({ calc, attr }) => calc(attr.hp) * 0.3
  }
}, {
  title: '芙宁娜6命：每层提升芙宁娜0.4%生命值上限，共提升[hpPct]%',
  cons: 6,
  data: {
    hpPct: ({ calc, attr , params }) =>  params.conshp ? ( Math.min( 140 , ( calc(attr.hp) * 0.004 * 600 ) ) ) : 0 ,
  }
}, {
  check: ({ cons, params }) => cons <= 3 && params.team === true,
  title: '0命夜兰：获得[dmg]%增伤',
  data: {
    dmg: 50
  }
}, {
  check: ({ cons, params }) => (cons >= 4 && params.team === true),
  title: '4命夜兰：获得[dmg]%增伤,增加40%生命值',
  data: {
    dmg: 50,
    hpPct: 40
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
  }, {
  check: ({ params }) => params.team === true,
  title: '元素共鸣 愈疗之水：生命值上限提升[hpPct]%',
  data: {
    hpPct: 25
  }
}, 'vaporize',
{title: '10.5最后修改：如有问题可联系1142607614反馈'}
]
