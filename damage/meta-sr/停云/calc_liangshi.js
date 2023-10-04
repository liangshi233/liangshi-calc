import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '赐福提高攻击力上限',
  dmg: ({ attr, calc, talent }) => {
    return {
      avg: calc(attr.atk) * talent.e['攻击力上限']
    }
  }
}, {
  title: '终结技伤害提高',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.q['伤害提高']),
      type: 'text'
    }
  }
},
{
  params: { dao: false , yun: true },
  title: '赐福下普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  params: { dao: true , yun: false },
  title: 'Q后普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  params: { dao: true , yun: true , bu: true },
  title: '赐福下Q后普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 1

export const buffs = [{
  title: '祥音和韵：基于攻击力提高攻击力[xq]',
  data: {
    atkPlus: ({ params , attr , calc , talent }) => params.yun ? (Math.min( talent.e['攻击力上限'] * calc(attr.atk) , talent.e['攻击力提高'] * calc(attr.atk) ) ) : 0 ,
    xq:({ attr , calc , talent }) => Math.min( talent.e['攻击力上限'] * calc(attr.atk) , talent.e['攻击力提高'] * calc(attr.atk) )
  }
},{
  title: '庆云光覆仪祷：恢复50点能量并使造成的伤害提升[xq]%',
  data: {
    aDmg:({ params , talent }) => params.dao ? (talent.q['伤害提高'] * 100) : 0,
    xq:({ talent }) => talent.q['伤害提高'] * 100
  }
}, {
  title: '行迹-驻晴：释放战技时，速度提升[speedPct]%',
  tree: 1,
  data: {
   speedPct: 20
  }
},{
  title: '行迹-止厄：普攻造成的伤害提高[aDmg]%',
  tree: 2,
  data: {
    aDmg: 40
  }
},{title: '6.14最后修改：如有问题可联系1142607614反馈'}]
