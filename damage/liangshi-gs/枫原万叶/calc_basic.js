import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '下落攻击*乱岚拨止伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
}, {
  title: '千早振点按伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['点按技能伤害'], 'e')
}, {
  title: '千早振长按伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e')
}, {
  title: '万叶之一刀斩击伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q')
}, {
  title: 'Q无转化每段伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
}, {
  title: '元素伤害提高',
  dmg: ({ attr, calc, talent }) => {
    return {
      avg: Format.percent(calc(attr.mastery) * 0.0004),
      type: 'text'
    }
  }
}, {
  title: '扩散反应伤害',
  params: { team: false },
  dmg: ({}, { reaction }) => reaction('swirl')
}, {
  title: '万珐丽行 E长按伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['长按技能伤害'], 'e')
}, {
  title: '万珐丽行 Q斩击伤害',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg,mastery'
export const defDmgIdx = 3

export const defParams = {
  team: true
}

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    title: '万叶2命：开Q后精通提高200',
    cons: 2,
    data: {
      mastery: 200
    }
  }, {
    title: '元素精通：扩散伤害提高[swirlPlus]%',
    sort: 2,
    data: {
      swirlPlus: ({ calc, attr }) => 1600 * calc(attr.mastery) / (calc(attr.mastery) + 2000)
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '讨龙宗室丽莎：增加[atkPct]%攻击力降低敌人15%防御力',
    data: {
      atkPct: 68,
      enemyDef: 15
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '千岩天空珐露珊：增加[dmg]%风元素伤害加成与[cdmg]%爆伤,降低[kx]%风元素抗性,增加[atkPct]%攻击力',
    data: {
      dmg: 38.25,
      cdmg: 40,
      kx: 30,
      atkPct: 20
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '祈风之赐：造成的风元素伤害提升[aPlus]',
    data: {
      ePlus: 278.4,
      qPlus: 278.4
    }
  },
  { title: '8.11最后修改：如有问题请输入 #伤害计算反馈' }
]
