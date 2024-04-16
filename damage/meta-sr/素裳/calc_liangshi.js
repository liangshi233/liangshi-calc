import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},{
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},{
  title: '战技剑势伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['附加伤害'], 'e')
},{
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},{
  title: '终结技额外剑势',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['附加伤害'] * 0.5, 'e')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  check: ({ params }) => params.technique >= 1,
  title: '素裳秘技：[云骑剑经 • 叩阵] 进入战斗后对敌方全体造成物理属性伤害。'
},
{
  title: '素裳天赋：释放终结技攻击力提高[atk]',
  data: {
    atk: ({ talent }) => talent.q['攻击力提高']
  }
},{
  title: '素裳天赋1：敌方弱点被击破，速度提高[speedPct]%',
  data: {
   speedPct: ({ talent }) => talent.t['速度提高'] * 100
  }
},{
  check: ({ params }) => params.e === true,
  title: '行迹-逐寇：剑势造成的伤害提高[eDmg]%',
  tree: 2,
  data: {
   eDmg: 20
  }
},{
  title: '素裳4命：击破特攻提高[stance]%',
  cons: 4,
  data: {
   stance: 40
  }
},{
  title: '素裳6命：天赋加成速度额外提高[speedPct]%',
  cons: 6,
  data: {
   speedPct: ({ talent }) => talent.t['速度提高'] * 100
  }
},{title: '4.15最后修改：如有问题请输入 #伤害计算反馈'}]
