import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},{
  title: '战技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}]

export const defDmgIdx = 1
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  check: ({ params }) => params.technique >= 1,
  title: '艾丝妲秘技：[灵光一现] 进入战斗后对敌方全体造成火属性伤害。'
},
{
  title: '星空祝言：速度提高[speedPct]%',
  data: {
    speedPct: ({ talent }) => talent.q['速度提高']
  }
},{
  title: '艾丝妲天赋：攻击力提高[atk]%',
  data: {
    atk: ({ talent }) => talent.t['攻击力提高'] * 500
  }
},{title: '6.16最后修改：如有问题请输入 #伤害计算反馈'}]
