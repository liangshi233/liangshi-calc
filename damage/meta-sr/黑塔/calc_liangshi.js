import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  params: { kan: true },
  title: '战技伤害 hp＞50%',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '战技伤害 hp＜50%',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '天赋追加伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'], 't')
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
  {
    check: ({ params }) => params.technique >= 1,
    title: '黑塔秘技：[可以优化一下] 战斗开始时攻击力提高[atkPct]%。',
    data: {
      atkPct: 40
    }
  }, {
    title: '黑塔天赋：战技对生命值大于50%的敌人造成的伤害提高50%',
    data: {
      eDmg: ({ params }) => params.kan ? 50 : 0
    }
  }, {
    title: '行迹-效率：战技造成的伤害再提高25%',
    tree: 1,
    data: {
      eDmg: ({ params }) => params.kan ? 25 : 0
    }
  }, {
    title: '黑塔2命：暴击率提升[cpct]%',
    cons: 2,
    data: {
      cpct: 15
    }
  }, {
    title: '黑塔4命：天赋伤害提升[tDmg]%',
    cons: 4,
    data: {
      tDmg: 10
    }
  }, {
    title: '黑塔6命：释放终结技后攻击力提升[atk]%',
    cons: 6,
    data: {
      atk: 25
    }
  },
  { title: '6.16最后修改：如有问题请输入 #伤害计算反馈' }
]
