export const details = [{
  title: '普攻一段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '勠心拳伤害',
  params: { e: 0 },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '满层勠心拳伤害',
  params: { e: 4 },
  dmg: ({ talent }, dmg) => {
    return dmg(talent.e['技能伤害'] * 1 + talent.e['变格伤害提升'] * 4 + talent.e['正论伤害提升'] * 1, 'e')
  }
}, {
  title: '真空弹伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['不动流·真空弹伤害'], 'q')
}, {
  title: '聚风真眼伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['聚风真眼伤害'], 'q')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '鹿野院平藏6命：每层「变格」提高E 4%暴击率,「正论」提高E 32%暴击伤害',
  cons: 6,
  data: {
    eCpct: ({ params }) => params.e === 4 ? 24 : 0,
    eCdmg: ({ params }) => params.e === 4 ? 32 : 0
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
]
