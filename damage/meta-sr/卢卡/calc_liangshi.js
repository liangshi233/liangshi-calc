export const details = [{
  title: '满层斗志 普攻单段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a2['直冲拳每段伤害'], 'a')
}, {
  title: '满层斗志 普攻尾段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a2['碎天拳伤害'], 'a')
}, {
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
}, {
  title: '裂伤 伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], '', 'skillDot')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg,effPct'
export const defDmgIdx = 2

export const buffs = [{
  title: '制胜一击：释放终结技后敌方受到的伤害增加[dmg]%',
    dmg: ({  talent }) => talent.q['伤害提高'] * 100
  }
}, {
  title: '卢卡1命：对处于裂伤的敌人造成伤害时，造成的伤害提高15%',
  cons: 1,
  data: {
    dmg: 15
  }
}, {
  title: '卢卡4命：4层斗志攻击力提高20%',
  cons: 4,
  data: {
    atk: 20
  }
},{title: '9.14最后修改：如有问题可联系1142607614反馈'}]
