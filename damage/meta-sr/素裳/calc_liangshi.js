export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},{
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},{
  title: '战技剑势伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['附加伤害'], 'e')
},{
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [{
  title: '素裳天赋：释放终结技攻击力提高[atk]',
  data: {
    atk: ({ talent }) => talent.q['攻击力提高']
  }
},{
  title: '素裳天赋1：地方弱点被击破，速度提高[speedPct]%',
  data: {
   speedPct: 50
  }
},{
  title: '素裳4命：击破特攻提高[stance]%',
  cons: 4,
  data: {
   stance: 40
  }
},{
  title: '素裳6命：天赋加成速度额外提高[speedPct]%',
  cons: 6,
  data: {
   speedPct: 50
  }
},{
  title: '行迹-逐寇：剑势造成的伤害提高[eDmg]%',
  tree: 2,
  data: {
   eDmg: 20
  }
},{title: '6.13最后修改：如有问题可联系1142607614反馈'}]
