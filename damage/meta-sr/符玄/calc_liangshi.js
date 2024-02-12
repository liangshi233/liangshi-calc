import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

export const details = [{
   title: '普攻伤害',
   dmg: ({ talent, calc, attr, cons }, { basic }) => {
     const zz = talent.a['技能伤害']
     const hp = calc(attr.hp)
     return basic( ( zz * hp ) , 'a' )
   }
}, {
  title: '战技提高生命上限值',
  dmg: ({ talent, attr, calc }) => {
    return {
      avg: calc(attr.hp) * talent.e['生命上限提高']
    }
  }
}, {
  title: '战技提高暴击率',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.e['暴击率提高']),
      type: 'text'
    }
  }
}, {
   title: '终结技伤害',
   dmg: ({ talent, calc, attr, cons }, { basic }) => {
     const zz = talent.q['技能伤害']
     const hp = calc(attr.hp)
     return basic( ( zz * hp ) , 'q' )
   }
}, {
  title: '行迹生命恢复',
  dmg: ({ calc, attr }, { heal }) => heal(calc(attr.hp) * 0.05 + 133)
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgIdx = 3

export const buffs = [{
  title: '太微行棋：生命值提高[hpPct]%,暴击率提高[cpct]%',
  data: {
    hpPct: ({ talent }) => talent.e['生命上限提高'] * 100,
    cpct: ({ talent }) => talent.e['暴击率提高'] * 100
  }
}, {
  title: '符玄1命：暴击伤害提高[cdmg]%',
  cons: 1,
  data: {
    cdmg: 30
  }
}, {
  title: '符玄6命：符玄施放终结技造成的伤害提高生命值的240%,提高[qPlus]点',
  cons: 6,
  data: {
    qPlus: ({ attr, calc }) => calc(attr.hp) * 2.4
  }
},{title: '10.5最后修改：如有问题请输入 #伤害计算反馈'}]
