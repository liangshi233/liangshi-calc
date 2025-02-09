import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '二段蓄力E伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.e['二段蓄力伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'e')
  }
}, {
  title: 'Q展开伤害',
  dmg: ({ talent, attr, calc }, { basic }) => {
    let ret = talent.q['技能伤害'] * calc(attr.def) / 100 + (attr.e.plus || 0)
    return basic(ret, 'q')
  }
}, {
  title: 'Q提供普攻基础伤害',
  dmg: ({ talent, attr, calc }) => {
    return {
      avg: (talent.q['伤害值提升'] / 100 + 0.115) * calc(attr.def)
    }
  }
}]

export const defDmgIdx = 2

export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,{
  title: '云堇被动：队伍存在4元素类型角色时，Q提供的普攻伤害提高[_q]',
  sort: 9,
  data: {
    _q: ({ attr, calc }) => {
      return calc(attr.def) * 0.115
    }
  }
}]
