export const details = [{
  title: '开Q满丹火印重击',
  params: { dhy: 15 },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][cons * 1 === 6 ? 4 : 3], 'a2')
}, {
  title: '开Q满丹火印重击蒸发',
  params: { dhy: 15 },
  dmg: ({ talent, cons }, dmg) => dmg(talent.a['重击伤害2'][cons * 1 === 6 ? 4 : 3], 'a2', 'vaporize')
}, {
  title: '丹书立约伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '丹书立约蒸发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'vaporize')
}, {
  title: '丹书立约融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
}, {
  title: '凭此结契伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '凭此结契蒸发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}, {
  title: '凭此结契融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}]
export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg,mastery'
export const buffs = [{
  title: '烟绯天赋1：重击消耗4枚丹火印增加20%火伤',
  cons: 6,
  data: {
    a2Dmg: ({ params }) => params.dhy ? 20 : 0
  }
}, {
  title: '烟绯天赋1：重击消耗3枚丹火印增加15%火伤',
  check: ({ cons }) => cons < 6,
  data: {
    a2Dmg: ({ params }) => params.dhy ? 15 : 0
  }
}, {
  title: '烟绯天赋：开Q后提高重击伤害[a2Dmg]%',
  data: {
    a2Dmg: ({ talent }) => talent.q['重击伤害额外加成']
  }
}, 'vaporize',
 {title: '12.30最后修改：如有问题可联系1142607614反馈'}
 ]
