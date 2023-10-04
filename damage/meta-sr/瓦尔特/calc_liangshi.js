export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技主目标伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '天赋附加伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['附加伤害'], 't')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 2

export const buffs = [{
  title: '行迹-惩戒：施放终结技提高敌人受到伤害12%',
  tree: 1,
  data: {
    dmg: 12
  }
},
{
  title: '行迹-裁决：弱点击破的敌方目标造成的伤害提高20%',
  tree: 3,
  data: {
    dmg: 20
  }
},{title: '6.14最后修改：如有问题可联系1142607614反馈'}]
