export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技护盾量',
  dmg: ({ attr, calc, talent }, { shield }) => shield(calc(attr.def) * talent.e['百分比防御'] + talent.e['固定值'])
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '冻结附加伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['冻结回合开始伤害'], 'q')
}, {
  title: '反击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['反击伤害'], 't')
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgIdx = 1

export const buffs = [
{
  title: '三月七4命：反击造成的伤害值增加[tPlus]',
  cons: 1,
  data: {
    tPlus: ({ talent, calc, attr }) => 0.3 * calc(attr.def)
  }
},{title: '7.13最后修改：如有问题可联系1142607614反馈'}]
