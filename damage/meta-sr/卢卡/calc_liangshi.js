import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '满层斗志 普攻单段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a2['直冲拳每段伤害'], 'a')
}, {
  title: '满层斗志 普攻尾段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a2['碎天拳伤害'], 'a')
}, {
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['单体伤害'], 'e')
}, {
  title: '裂伤 伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], 'dot', 'skillDot')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg,effPct'
export const defParams = { technique: `${Technique}` }

export const buffs = [
  {
    check: ({ params }) => params.technique >= 1,
    title: '卢卡秘技：[直冲碎天拳] 进入战斗后对敌方全体造成物理属性伤害，并有100%的基础概率使目标陷入与战技相同的裂伤状态。'
  }, {
    title: '制胜一击：释放终结技后敌方受到的伤害增加[dmg]%',
    data: {
      dmg: ({ talent }) => talent.q['伤害提高'] * 100
    }
  }, {
    title: '卢卡1命：对处于裂伤的敌人造成伤害时，造成的伤害提高15%',
    cons: 1,
    data: {
      dmg: 15
    }
  }, {
    title: '卢卡4命：4层斗志攻击力提高20%',
    cons: 4,
    data: {
      atk: 20
    }
  },
  { title: '2.19最后修改：如有问题请输入 #伤害计算反馈' }
]
