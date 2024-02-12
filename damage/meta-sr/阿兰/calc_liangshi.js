export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},{
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '终结技相邻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['相邻目标伤害'], 'q')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '阿兰天赋：造成的伤害提高[atk]%',
  data: {
    dmg: ({ talent }) => talent.t['伤害提高'] * 100
  }
},{
  title: '阿兰1命：生命值小于50%时提升战技伤害[eDmg]%',
  cons: 1,
  data: {
    eDmg: 10
  }
},{
  title: '阿兰6命：生命值小于50%时提升终结技伤害[qDmg]%',
  cons: 6,
  data: {
    qDmg: 20
  }
},{title: '6.16最后修改：如有问题请输入 #伤害计算反馈'}]
