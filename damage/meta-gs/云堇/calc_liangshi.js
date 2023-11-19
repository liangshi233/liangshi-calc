export const details = [
{
  title: 'Q提供普攻基础伤害',
  params: { qjichu: true },
  dmg: ({ talent, attr, calc }) => {
    return {
      avg: (talent.q['伤害值提升'] / 100 + 0.115) * calc(attr.def)
    }
  }
},
{
  title: '旋云开相点按伤害',
  params: { ecd: true },
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.e['点按伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'e')
  }
},
{
  title: '旋云开相二段伤害',
  params: { ecd: true },
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.e['二段蓄力伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'e')
  }
},
{
  title: '长E护盾吸收量',
  params: { ecd: true },
  dmg: ({ talent, calc, attr }, { shield }) =>
    shield((talent.e['护盾吸收量2'][0] * calc(attr.def) / 100 + talent.e['护盾吸收量2'][1] * 1) * 1.5)
},
{
  title: '破嶂见旌仪展开伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.q['技能伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'q')
  }
}
]

export const defDmgIdx = 0
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [
{
  check: ({ params }) => params.qjichu === true,
  title: '云堇天赋：[莫从恒蹊] 队伍存在4元素类型角色时，「飞云旗阵」提供的普通攻击伤害提高[_q]点',
  data: {
    _q: ({ attr, calc }) => {
      return calc(attr.def) * 0.115
    }
  }
},
{
  check: ({ params }) => params.ecd === true,
  title: '云堇1命：[飞身趟马] 旋云开相的冷却时间减少[_eCd]%',
  cons: 1,
  data: {
    _eCd: 15
  }
},
{
  title: '云堇4命：[昇堂吊云] 触发结晶反应后，防御力提升[def]%',
  sort: 1,
  cons: 4,
  data: {
    def: 20
  }
},
 {title: '4.4最后修改：[10.22重置] '}
 ]
