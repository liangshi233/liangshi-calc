import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [
  {
  // title: '风隐急进基础伤害',
    title: '风风轮冲撞伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['风风轮伤害'], 'e')
  }, {
  // title: '风隐急进结束伤害',
    title: '风风轮舞踢伤害',
    params: { con2: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['风风轮舞踢长按伤害'], 'e')
  },
  /*
{
  //title: '影貉缭乱发动伤害',
  title: 'Q发动伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能发动伤害'], 'q')
},
*/
  {
  // title: '不倒貉貉每跳伤害',
    title: '不倒貉貉每跳伤害',
    params: { con6: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['不倒貉貉伤害'], 'q')
  }, {
  // title: '不倒貉貉每跳治疗',
    title: '不倒貉貉每跳治疗',
    params: { con6: true },
    dmg: ({ attr, calc, talent, cons }, { heal }) => {
      let num = talent.q['不倒貉貉治疗量2'][0] * calc(attr.atk) / 100 + talent.q['不倒貉貉治疗量2'][1] * 1
      if (cons * 1 === 6) {
        num += Math.min(calc(attr.mastery) * 3, 6000)
      }
      return heal(num)
    }
  }, {
    title: '扩散反应伤害',
    dmg: ({}, { reaction }) => reaction('swirl')
  }
]

export const defParams = { soda: 1 }
export const defDmgIdx = 4
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    check: ({ params }) => params.con2 === true,
    title: '早柚2命：[理清逃跑路线] 长按施放风风轮舞踢造成的伤害提高66%',
    cons: 2,
    data: {
      eDmg: 66
    }
  }, {
    check: ({ params }) => params.con6 === true,
    title: '早柚6命：[呼呼大睡时间] 基于精通提升Q[qPlus]点伤害,[_heal]治疗量',
    sort: 9,
    cons: 6,
    data: {
      qPlus: ({ attr, calc }) => Math.min(calc(attr.atk) * calc(attr.mastery) * 0.002, calc(attr.atk) * 4),
      _heal: ({ attr, calc }) => Math.min(calc(attr.mastery) * 3, 6000)
    }
  }
]
