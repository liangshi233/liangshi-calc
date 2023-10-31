export const details = [{
  title: 'Q提供普攻基础伤害',
  dmg: ({ talent, attr, calc }) => {
    return {
      avg: (talent.q['伤害值提升'] / 100 + 0.115) * calc(attr.def)
    }
  }
}, {
  title: '旋云开相点按伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.e['点按伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'e')
  }
}, {
  title: '旋云开相二段伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.e['二段蓄力伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'e')
  }
},{
  title: '长E护盾吸收量',
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.e['护盾吸收量2'][0] * calc(attr.def) / 100 + talent.e['护盾吸收量2'][1] * 1) * 1.5)
}, {
  title: '破嶂见旌仪展开伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.q['技能伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'q')
  }
}]

export const defDmgIdx = 0
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [{
  title: '云堇天赋2：队伍存在4元素类型角色时，Q提供的普攻伤害提高[_q]',
  data: {
    _q: ({ attr, calc }) => {
      return calc(attr.def) * 0.115
    }
  }
},
 {title: '4.4最后修改：如有问题可联系1142607614反馈'}
 ]
