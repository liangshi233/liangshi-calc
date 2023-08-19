export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},{
  title: '战技单体伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},{
  title: '战技相邻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'e')
},{
  title: '触电持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['触电持续伤害'], '', 'skillDot')
},{
  title: '附加伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'], 't')
},{
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '希露瓦6命：对触电状态下的敌人伤害提升[dmg]%',
  cons: 6,
  data: {
    dmg: 30
  }
}, {
  title: '行迹-狂热：消灭敌人攻击力提升[atk]%',
  tree: 3,
  data: {
    atk: 20
  }
}]
