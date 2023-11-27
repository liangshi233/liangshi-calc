import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

export const details = [
{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: 'E后普攻伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: 'Q后普攻伤害',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: 'QE后普攻伤害',
  params: { e: true , q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: '战技伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: 'Q后战技伤害',
  params: { e: true , q: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '终结技Buff攻击力提高',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.q['攻击力提高']),
      type: 'text'
    }
  }
}
]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,speed'

export const buffs = [
{
  check: ({ params }) => params.q === true,
  title: '寒鸦技能：[十王敕令，遍土遵行] 使我方角色速度提高[speedPlus]攻击力提高[atkPct]%',
  data: {
    speedPlus: ({ talent , attr }) => talent.q['速度提高'] * 100 * attr.speed ,
    atkPct: ({ talent }) => talent.q['攻击力提高'] * 100
  }
},
{
  check: ({ params }) => params.e === true,
  title: '寒鸦天赋：[罚恶] 对陷入【承负】状态下的敌人释放普攻、战技、终结技时,造成的伤害提高[dmg]%',
  data: {
    dmg: ({ talent }) => talent.t['伤害提高'] * 100
  }
},
{
  check: ({ params }) => params.e === true,
  title: '寒鸦行迹：[录事] 触发【承负】战技点回复效果的我方单位攻击力提高[atkPct]%',
  trees: 1,
  data: {
    atkPct: 10
  }
},
{
  check: ({ params }) => params.e === true,
  title: '寒鸦行迹：[还阳] 当【承负】战技点恢复效果被触发时，自身恢复[_energyevery]点能量',
  trees: 3,
  data: {
    _energyevery: 2
  }
},
{
  check: ({ params }) => params.e === true,
  title: '寒鸦2魂：[二观] 释放战技后，速度提高[speedPct]%',
  cons: 2,
  data: {
    speedPct: 20
  }
},
{
  check: ({ params }) => params.e === true,
  title: '寒鸦6魂：[六正] 天赋的伤害提高效果额外提高[speedPct]%',
  cons: 6,
  data: {
    dmg: 10
  }
}
{title: '11.26最后修改：[11.26重置]'}
]
