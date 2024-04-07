import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique

export const details = [{
  title: '普攻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
}, {
  title: '满层E 普攻首段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a2['盘拏耀跃·单体伤害'], 'a')
}, {
  title: '满层E 普攻尾段伤害',
  params: { buff: true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['盘拏耀跃·单体伤害'], 'a')
}, {
  title: '满层E 普攻尾段相邻伤害',
  params: { buff: true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['盘拏耀跃·相邻目标伤害'], 'a')
}, {
  title: '终结技伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['目标伤害'], 'q')
}, {
  title: '终结技相邻伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['相邻目标伤害'], 'q')
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg,effPct'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  check: ({ params }) => params.technique >= 1,
  title: '丹恒•饮月秘技：[掣空如虹] 使用攻击会快速向前移动一段距离并攻击接触到的敌人，主动攻击敌人进入战斗后，对敌方全体造成虚数属性伤害，并使自身获得1个【逆鳞】。'
},{
  title: '亢心：每次攻击都将提升自己身伤害，至多叠加6层[dmg]%',
  data: {
    dmg: ({ params , talent }) => params.buff ? ( talent.t['伤害提高'] * 100 * 6 ) : 0
  }
}, {
  title: '龙力自在：施放【天矢阴】或【盘拏耀跃】时提升暴击伤害，至多叠加4层',
  data: {
    cdmg: ({ params , talent }) => params.buff ? ( talent.e['暴击伤害提高'] * 100 * 4 ) : 0
  }
}, {
  title: '行迹-起蛰：对拥有虚数弱点的目标暴击伤害提高24%',
  tree: 3,
  data: {
    cdmg: 24
  }
},{
  title: '丹恒•饮月1命：亢心可额外叠加四层',
  cons: 1,
  data: {
    dmg: ({ params , talent }) => params.buff ? ( talent.t['伤害提高'] * 100 * 4 ) : 0
  }
}, {
  title: '丹恒•饮月6命：抗性穿透提高20%，最多叠加3层',
  cons: 4,
  data: {
    kx: 60
  }
},{title: '9.8最后修改：如有问题请输入 #伤害计算反馈'}]
