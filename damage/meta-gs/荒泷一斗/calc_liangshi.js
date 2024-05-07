export const details = [
  {
    title: '开Q后普攻一段伤害',
    params: { team: false },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: '开Q后左一文字斩伤害',
    params: { team: false },
    dmg: ({ talent }, dmg) => dmg(talent.a['左一文字斩伤害'], 'a2')
  }, {
    title: '开Q后每段重击',
    params: { team: false },
    dmg: ({ talent }, dmg) => dmg(talent.a['荒泷逆袈裟连斩伤害'], 'a2')
  }, {
    title: '开Q后重击尾段',
    params: { team: false },
    dmg: ({ talent }, dmg) => dmg(talent.a['荒泷逆袈裟终结伤害'], 'a2')
  }, {
    title: '开Q后牛牛伤害',
    params: { team: false },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: '一五钟开Q重击',
    params: { team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['荒泷逆袈裟连斩伤害'], 'a2')
  }, {
    title: '一五钟重击尾段',
    params: { team: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['荒泷逆袈裟终结伤害'], 'a2')

  }, {
    title: '一五钟Q后E伤害',
    params: { team: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }
]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'
export const enemyName = '魔偶/女士/雷神'

export const defParams = { team: true }

export const buffs = [
  {
    title: '荒泷一斗天赋2：荒泷逆袈裟造成的伤害基于防御值提高[a2Plus]',
    sort: 9,
    data: {
      a2Plus: ({ attr, calc }) => calc(attr.def) * 0.35
    }
  }, {
    title: '荒泷一斗6命：重击的暴击伤害提高70%',
    cons: 6,
    data: {
      a2Cdmg: 70
    }
  }, {
    title: '荒泷一斗大招：怒目鬼王状态提高攻击力[atkPlus]',
    sort: 9,
    data: {
      atkPlus: ({ attr, calc, talent }) => talent.q['攻击力提高'] * calc(attr.def) / 100
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '6命五郎：增加[defPlus]点防御力与[defPct]%防御力，增加[dmg]%岩伤与[cdmg]%暴击伤害',
    sort: 0,
    data: {
      cdmg: 40,
      defPct: 25,
      defPlus: 438,
      dmg: 15
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '钟离：降低敌人[kx]%全抗',
    data: {
      kx: 20
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '元素共鸣 坚定之岩：护盾强效提升[shield]%，造成的伤害提升[dmg]%，降低敌人[kx]%岩元素抗性',
    data: {
      shield: 25,
      dmg: 15,
      kx: 20
    }
  },
  { title: '12.27最后修改：修复攻击力提升不正确的问题' }
]
