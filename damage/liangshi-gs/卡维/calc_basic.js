import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '附魔普通攻击一段',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: '附魔普通攻击四段',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
}, {
  title: '附魔重击终结伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2')
}, {
  title: '画则巧施伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '画则巧施蔓激化',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
}, {
  title: '繁绘隅穹伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '繁绘隅穹蔓激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'spread')
}, {
  title: '草原核伤害',
  dmg: ({ calc, attr }, { reaction }) => {
    return reaction('bloom')
  }
}]

export const defDmgIdx = 7
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    title: '繁绘隅穹：草原核造成的伤害提升[bloom]%',
    data: {
      bloom: ({ talent }) => talent.q['草原核迸发伤害加成']
    }
  }, {
    passive: 2,
    title: '卡维天赋2：攻击提升元素精通[mastery]点',
    data: {
      mastery: 100
    }
  }, {
    cons: 1,
    title: '卡维1命：受治疗加成提升[heal]%',
    data: {
      heal: 20
    }
  }, {
    cons: 4,
    title: '卡维4命：草原核造成的伤害提升[bloom]%',
    data: {
      bloom: 60
    }
  },
  { title: '3.2最后修改：如有问题请输入 #伤害计算反馈' }
]
