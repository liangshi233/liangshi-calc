import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: 'Q后普攻伤害',
  params: { zhu: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: 'Q后战技伤害',
  params: { zhu: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
  {
    check: ({ params }) => params.technique >= 1,
    title: '彦卿秘技：[御剑真诀] 对当前生命值百分比大于等于50%的敌方目标造成的伤害提高[dmg]%。',
    data: {
      dmg: 30
    }
  }, {
    title: '彦卿天赋：智剑连心提高[cpct]%暴击率和[cdmg]%爆伤',
    data: {
      cpct: ({ talent }) => talent.t['暴击率提高'] * 100,
      cdmg: ({ talent }) => talent.t['爆伤提高'] * 100
    }
  }, {
    title: '快雨燕相逐：释放终结技提高60%暴击率，智剑连心提高爆伤[qCdmg]%',
    data: {
      qCpct: 60,
      qCdmg: ({ talent }) => talent.q['暴伤提高'] * 100
    }
  }, {
    title: '快雨燕相逐：释放终结技本回合提高暴击率暴击伤害',
    data: {
      cpct: ({ params, talent }) => params.zhu ? 60 : 0,
      cdmg: ({ params, talent }) => params.zhu ? (talent.q['暴伤提高'] * 100) : 0
    }
  }, {
    title: '彦卿4命：生命值大于80%时提高12%的冰抗穿透',
    cons: 4,
    data: {
      kx: 12
    }
  }, {
    title: '行迹-轻吕：触发暴击时，速度提高10%',
    tree: 3,
    data: {
      speedPct: 10
    }
  },
  { title: '6.20最后修改：如有问题请输入 #伤害计算反馈' }
]
