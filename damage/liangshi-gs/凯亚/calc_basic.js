import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '普攻首段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
}, {
  title: '普攻五段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
}, {
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}, {
  title: '霜袭伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '霜袭融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
}, {
  title: '凛冽轮舞单段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '凛冽轮舞单段融化',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    cons: 1,
    title: '凯亚1命：命中处于冰元素下的敌人普通攻击与重击暴击率提升15%',
    data: {
      a1Cpct: 15,
      a2Cpct: 15
    }
  },
  { title: '4.4最后修改：如有问题请输入 #伤害计算反馈' }
]
