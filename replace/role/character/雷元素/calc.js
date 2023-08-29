export const details = [{
  title: '普通攻击一段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}, {
  title: '雷影剑伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '雷影剑超激化',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', '超激化')
}, {
  title: '雷轰电转爆发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '雷轰电转爆发超激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', '超激化')
}, {
  title: '雷轰电转落雷伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q')
}, {
  title: '雷轰电转落雷超激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q', '超激化')
}]

export const defDmgIdx = 7
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [{
  title: '旅行者2命：雷元素抗性降低15%',
  cons: 2,
  data: {
    kx: 15
  }
}]
