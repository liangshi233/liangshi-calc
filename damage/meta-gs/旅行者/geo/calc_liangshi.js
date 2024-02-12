export const details = [{
  title: '普通攻击一段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}, {
  title: '星陨剑伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '岩潮叠嶂伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['地震波单次伤害'], 'q')
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [{
  title: '旅行者1命：暴击率提升10%',
  cons: 1,
  data: {
    cpct: 10
  }
},
 {title: '5.8最后修改：如有问题请输入 #伤害计算反馈'}
 ]
