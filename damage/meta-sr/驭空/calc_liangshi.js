import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: 'Q后普攻伤害',
  params: { guan: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '鸣弦号令攻击力提高',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.e['攻击力提高']),
      type: 'text'
    }
  }
}, {
  title: '鸣弦号令暴击率提高',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.q['暴击率提高']),
      type: 'text'
    }
  }
}, {
  title: '鸣弦号令暴击伤害提高',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.q['暴击伤害提高']),
      type: 'text'
    }
  }
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgIdx = 2

export const buffs = [{
  title: '天阙鸣弦：释放战技提高攻击力[atkPlus]%',
  data: {
    atkPlus: ({ talent }) => talent.e['攻击力提高'] * 100
  }
}, {
  title: '贯云饮羽：释放终结技提高暴击率暴击伤害',
  data: {
    cpct: ({ params , talent }) => params.guan ? (talent.q['暴击率提高'] * 100) : 0,
    cdmg: ({ params , talent }) => params.guan ? (talent.q['暴击伤害提高'] * 100) : 0
  }
}, {
  title: '驭空4命：驭空造成的伤害提高[dmg]%',
  cons: 4,
  data: {
    dmg: 30
  }
}, {
  title: '行迹-迟彝：驭空在场时造成的虚数伤害提高[dmg]%',
  tree: 1,
  data: {
    dmg: 12
  }
},{title: '10.14最后修改：如有问题请输入 #伤害计算反馈'}]
