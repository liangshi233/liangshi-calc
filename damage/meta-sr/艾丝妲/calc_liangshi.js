export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},{
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 1

export const buffs = [{
  title: '星空祝言：速度提高[speedPct]%',
  data: {
    speedPct: ({ talent }) => talent.q['速度提高']
  }
},{
  title: '艾丝妲天赋：攻击力提高[atk]%',
  data: {
    atk: ({ talent }) => talent.t['攻击力提高'] * 500
  }
},{title: '6.16最后修改：如有问题可联系1142607614反馈'}]
