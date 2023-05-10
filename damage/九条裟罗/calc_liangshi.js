export const details = [{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
},{
  title: 'E提升攻击力',
  dmg: ({ talent, attr }) => {
    return {
      avg: talent.e['攻击力加成比例'] * attr.atk.base / 100
    }
  }
}, {
  title: '天狗咒雷·伏 伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['天狗咒雷·伏 伤害'], 'e')
},{
  title: '天狗咒雷·金刚坏伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['天狗咒雷·金刚坏 伤害'], 'q')
}, {
  title: '天狗咒雷·雷砾伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['天狗咒雷·雷砾 伤害'], 'q')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '九条E技能：提升攻击力[atkPlus]',
  data: {
    atkPlus: ({ attr, talent }) => talent.e['攻击力加成比例'] * attr.atk.base / 100
  }
}, {
  title: '九条6命：提升60%雷元素爆伤',
  cons: 6,
  data: {
    cdmg: 60
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
]
