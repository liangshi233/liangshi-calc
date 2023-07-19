export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  check: ({ cons }) => cons < 6,
  title: '5层天赋持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['回合开始受到伤害'] * 5, 't')
}, {
  check: ({ cons }) => cons = 6,
  title: '6命5层天赋持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['回合开始受到伤害'] * 1.15 * 5, 't')
}]

export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  title: '惊喜礼盒：持续伤害提升[xq]%',
  data: {
    tDmg: ({ params , talent }) => params.jing ? ( talent.q['受持续伤害提高'] * 100 ) : 0 ,
    xq: ({ talent }) => talent.q['受持续伤害提高'] * 100
  }
},{title: '6.16最后修改：如有问题可联系1142607614反馈'}]
