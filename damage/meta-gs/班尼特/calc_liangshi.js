export const details = [{
  title: 'Q后点按热情过载伤害',
  params: { team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e',)
}, {
  title: 'Q后热情过载融化伤害',
  params: { team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e', 'melt')
}, {
  title: '美妙旅程伤害',
  params: { team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q',)
}, {
  title: '美妙旅程融化伤害',
  params: { team: false , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}, {
  title: '美妙旅程攻击力提升',
  params: { team: false , hb: false },
  dmg: ({ attr, talent, cons }) => {
    let baseAtk = attr.atk.base
    let pct = talent.q['攻击力加成比例']
    if (cons >= 1) {
      pct += 20
    }
    return {
      avg: baseAtk * pct / 100
    }
  }
}, {
  title: '美妙旅程每跳治疗',
  params: { team: false , hb: false },
  dmg: ({ attr, calc, talent }, { heal }) => heal(talent.q['持续治疗2'][0] * calc(attr.hp) / 100 + talent.q['持续治疗2'][1] * 1)
}, {
  title: '班万罗迪 点e融化伤害',
  params: { team: true , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按伤害'], 'e', 'melt')
}, {
  title: '班万罗迪 Q融化伤害',
  params: { team: true , hb: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}, {
  title: '雷国 22轴 对单',
  params: { team: false , hb: false , lg: true },
  dmg: ({ attr, talent, cons }, dmg) => {
    let eDmg = dmg(talent.e['点按伤害'], 'e')
    let qDmg = dmg(talent.q['技能伤害'], 'q')
    return {
      avg: eDmg.avg + qDmg.avg,
      dmg: eDmg.dmg + qDmg.dmg
    }
  }
}]

export const defParams = { soda: 1 }
export const defDmgIdx = 1
export const mainAttr = 'atk,hp,cpct,cdmg'

export const buffs = [{
  title: '元素爆发：基于基础攻击力提高攻击力[atkPlus]',
  data: {
    atkPlus: ({ attr, calc, talent }) => talent.q['攻击力加成比例'] * attr.atk.base / 100
  }
},{
  cons: 1,
  title: '班尼特1命：Q攻击力提升比例提高20%',
  data: {
    atkPct: 20
  }
}, {
  cons: 6,
  title: '班尼特6命：获得15%火伤加成',
  data: {
    dmg: 15
  }
}, {check: ({ cons,params }) => cons <= 1 && params.team === true,
    title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
    data: {
      aDmg:16,
      a2Dmg:16,
      a3Dmg:16,
      dmg: 40,
      atkPct:20,
      kx:40
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
  }, {check: ({ params }) => params.team === true,
  title: '6命宗室罗莎莉亚：攻击力提升[atkPct]%，暴击率提升[cpct]点',
  data: {
    atkPct: 20,
    cpct: 15
  }
},
 {check: ({ cons,params }) =>  (cons >= 6 && params.team === true),
  title: '6命教官精1终末迪奥娜：提升精通[mastery]点',
  data: {
    mastery: 520
  }
}, {
  check: ({ cons,params }) => cons <= 5 && params.team === true,
  title: '6命教官精1终末迪奥娜：提升精通[mastery]点',
  data: {
    mastery: 420
  }
}, {
  check: ({ params }) => params.lg === true ,
  title: '雷国：元素爆发伤害提高18%',
  data: {
    qDmg: 18
  }
},
 {title: '10.6最后修改：如有问题可联系1142607614反馈'}
 ]
