import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: 'E后斥逐拳一段',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: 'E后斥逐拳尾刀',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a')
}, {
  title: 'E后斥逐拳尾刀融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'melt')
}, {
  title: '凌跃拳',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '凌跃拳融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'melt')
}, {
  title: '黑金狼噬伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '黑金狼噬融化',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}]

export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '强化斥逐拳伤害：开启E后额外提升普通攻击[aMulti]%伤害',
    data: {
      aMulti: ({ talent }) => talent.e['强化斥逐拳伤害'] - 100
    }
  }, {
    passive: 1,
    title: '莱欧斯利天赋1：释放E后普生命值低于60%重击伤害提高50%',
    data: {
      a2Dmg: 50
    }
  }, {
    passive: 2,
    title: '莱欧斯利天赋2：释放E后生命值变动提升6%攻击力，叠加5层',
    data: {
      atkPct: 30
    }
  }, {
    cons: 1,
    title: '莱欧斯利1命：天赋提升的伤害进一步提升至200%',
    data: {
      a2Dmg: 150
    }
  }, {
    cons: 2,
    title: '莱欧斯利2命：天赋每层额外提升Q伤害40%',
    data: {
      qDmg: 200
    }
  }, {
    cons: 6,
    title: '莱欧斯利6命：凌跃拳暴击率提升10%暴击伤害提升80',
    data: {
      a2Cpct: 10,
      a2Cdmg: 80
    }
  },
  'vaporize',
  { title: '9.11最后修改：如有问题请输入 #伤害计算反馈' }
]
