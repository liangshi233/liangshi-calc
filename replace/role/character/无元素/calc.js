export const details = [{
  title: '普通攻击一段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},{
  title: '普通攻击二段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},{
  title: '普通攻击三段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},{
  title: '普通攻击四段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},{
  title: '普通攻击五段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
},{
  title: '重击伤害（荧）',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},{
  title: '下落期间伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},{
  title: '低空下落伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},{
  title: '高空下落伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = []
