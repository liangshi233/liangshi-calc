import { Format, LSconfig } from '#liangshi'

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
  check: ({ cons }) => cons < 6,
  dmgKey: 'q',
  title: '5层天赋持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['回合开始受到伤害'] * 5, 'dot', 'skillDot')
}, {
  check: ({ cons }) => cons = 6,
  dmgKey: 'q',
  title: '6命5层天赋持续伤害',
  dmg: ({ talent }, dmg) => dmg(talent.t['回合开始受到伤害'] * 1.15 * 5, 'dot', 'skillDot')
}]

export const defDmgKey = 'q'
export const mainAttr = 'atk,cpct,cdmg'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  check: ({ params }) => params.technique >= 1,
  title: '桑博秘技：[你最闪亮] 主动攻击陷入目盲状态的敌人，进入战斗时使敌方每个单体目标行动延后25%。'
},
{
  title: '惊喜礼盒：持续伤害提升[dotEnemydmg]%',
  data: {
    dotEnemydmg: ({ talent }) => talent.q['受持续伤害提高'] * 100
  }
},{title: '2.21最后修改：如有问题请输入 #伤害计算反馈'}]
