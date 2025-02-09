import lodash from 'lodash'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '海月之誓伤害',
  params: { team: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.e['波纹伤害'], 'e')
}, {
  check: ({ cons }) => cons < 2,
  title: '水母每跳治疗',
  params: { team: false },
  dmgKey: 'q',
  dmg: ({ attr, talent, calc }, { heal }) => {
    let t = talent.e['治疗量2']
    let hp = calc(attr.hp)
    return heal(hp * t[0] / 100 + t[1] * 1)
  }
}, {
  cons: 2,
  title: '半血水母每跳治疗',
  dmgKey: 'q',
  params: { team: false },
  dmg: ({ attr, talent, calc }, { heal }) => {
    let t = talent.e['治疗量2']
    let hp = calc(attr.hp)
    return heal(hp * t[0] / 100 + t[1] * 1 + hp * 0.045)
  }
}, {
  title: '开Q普攻三段伤害',
  params: { team: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
}, {
  title: '开Q普攻三段蒸发伤害',
  params: { team: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
}, {
  title: '开Q重击伤害',
  params: { team: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '开Q重击蒸发伤害',
  params: { team: false },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
}, {
  title: '开Q普攻三段总伤',
  params: { team: false },
  dmg: ({ attr, talent, cons, calc }, dmg) => {
    let ret = { dmg: 0, avg: 0 }
    lodash.forEach('一二三'.split(''), (num) => {
      let dmgRet = dmg(talent.a[`${num}段伤害`], 'a')
      ret.dmg += dmgRet.dmg
      ret.avg += dmgRet.avg
    })
    if (cons > 0) {
      let dmgRet = dmg.basic(calc(attr.hp) * 0.3)
      ret.dmg += dmgRet.dmg
      ret.avg += dmgRet.avg
    }
    return ret
  }
}, {
  title: '心莫万夜开Q普攻三段',
  params: { team: true },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
}, {
  title: '心莫万夜开Q重击',
  params: { team: true },
  dmg: ({ attr, talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}]
export const defDmgKey = 'q'
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const defParams = {
  team: true,
  soda: 1
}

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '珊瑚宫心海天赋3：暴击率降低100%，治疗加成提高25%',
    isStatic: true,
    data: {
      cpct: -100,
      heal: 25
    }
  }, {
    title: '珊瑚宫心海天赋2：开Q后重击伤害基于治疗加成提高[a2Plus]',
    data: {
      aPlus: ({ attr, calc }) => calc(attr.hp) * calc(attr.heal) * 0.15 / 100,
      a2Plus: ({ attr, calc }) => calc(attr.hp) * calc(attr.heal) * 0.15 / 100
    }
  }, {
    title: '海人化羽：开Q后普攻伤害提高[aPlus]',
    data: {
      aPlus: ({ attr, talent, calc }) => calc(attr.hp) * talent.q['普通攻击伤害提升'] / 100
    }
  }, {
    title: '海人化羽：开Q后重击伤害提高[a2Plus]',
    data: {
      a2Plus: ({ attr, talent, calc }) => calc(attr.hp) * talent.q['重击伤害提升'] / 100
    }
  }, {
    title: '珊瑚宫心海1命：开Q后第三段普攻额外释放一只游鱼，造成生命值上限30%的水元素伤害',
    cons: 1
  }, {
    title: '珊瑚宫心海6命：开Q攻击获得治疗后，获得40%水伤加成',
    cons: 6,
    data: {
      dmg: 40
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
  }, {
    check: ({ cons, params }) => (cons >= 2 && params.team === true),
    title: '千岩讨龙4命莫娜：获得[dmg]%增伤，增加[atkPct]%攻击,暴击15%',
    data: {
      dmg: 60,
      cpct: 15,
      atkPct: 68
    }
  }, {
    check: ({ cons, params }) => (cons < 2 && params.team === true),
    title: '千岩讨龙0命莫娜：获得[dmg]%增伤，增加[atkPct]%攻击',
    data: {
      dmg: 60,
      atkPct: 68
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
    title: '元素共鸣 愈疗之水：生命值上限提升[hpPct]%',
    data: {
      hpPct: 25
    }
  },
  { title: '4.4最后修改：如有问题请输入 #伤害计算反馈' }
]
