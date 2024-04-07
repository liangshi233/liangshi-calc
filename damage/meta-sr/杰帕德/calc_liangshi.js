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
  title: '终结技护盾量',
  dmg: ({ attr, calc, talent }, { shield }) => shield(calc(attr.def) * talent.q['百分比防御力'] + talent.q['固定数值'])
}, {
  title: '秘技护盾量',
  dmg: ({ attr, calc, talent }, { shield }) => shield(calc(attr.def) * 0.24 + 150)
}]

export const defDmgIdx = 2
export const mainAttr = 'atk,cpct,cdmg,def'
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  check: ({ params }) => params.technique >= 1,
  title: '杰帕德秘技：[有情之证] 进入战斗后为我方全体提供护盾。'
},{
  title: '行迹-战意：基于防御值提高攻击力[atkPlus]',
  tree: 3,
  data: {
    atkPlus: ({ calc, attr }) => calc(attr.def) * 0.35
  }
},{title: '5.30最后修改：如有问题请输入 #伤害计算反馈'}]
