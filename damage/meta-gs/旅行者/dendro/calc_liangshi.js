export const details = [{
  title: '普通攻击一段伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},{
  title: '重击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
}, {
  title: '草缘剑伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '草缘剑蔓激化',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', '蔓激化')
}, {
  title: '偃草若化攻击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['草灯莲攻击伤害'], 'q')
}, {
  title: '偃草若化蔓激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['草灯莲攻击伤害'], 'q', '蔓激化')
}, {
  title: '激烈爆发伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['激烈爆发伤害'], 'q')
}, {
  title: '激烈爆发蔓激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['激烈爆发伤害'], 'q', '蔓激化')
}, {
  title: '草原核伤害',
  params: { bloom: true },
  dmg: ({calc, attr}, { reaction }) => {
      return reaction('bloom')}
}]

export const defDmgIdx = 5
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [{
  title: '旅行者天赋1：元素精通提升60点',
  data: {
    kx: 60
  }
},{
  title: '旅行者天赋2：基于元素精通提升草缘剑[eDmg]%与显象缚结伤害[Dmg]%',
  data: {
    eDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery) ) * 0.15),
    qDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery) ) * 0.1),
  }
},{
  title: '旅行者6命：草元素伤害提升12%',
  cons: 6,
  data: {
    dmg: 12
  }
},
 {title: '5.8最后修改：如有问题请输入 #伤害计算反馈'}
 ]
