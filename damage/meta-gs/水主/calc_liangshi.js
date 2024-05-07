export const details = [{
  title: '水纹剑伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e')
}, {
  title: '水纹剑蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e', 'vaporize')
}, {
  params: { chong: true },
  title: '充盈水纹剑伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e')
}, {
  params: { chong: true },
  title: '充盈水纹剑蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e', 'vaporize')
}, {
  title: '水滴伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['露滴伤害'], 'e')
}, {
  title: '灵息之刺伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['灵息之刺伤害'], 'e')
}, {
  title: '扬水制流伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
}, {
  title: '扬水制流蒸发',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}]

export const mainAttr = 'hp,atk,cpct,cdmg'

export const buffs = [
  {
    title: '旅行者天赋2：充盈造成的伤害提升[xq]%',
    data: {
      ePlus: ({ params, talent, calc, attr }) => params.chong ? (Math.min(5000, (24 * calc(attr.hp) / 100))) : 0,
      xq: ({ talent, calc, attr }) => Math.min(5000, (24 * calc(attr.hp) / 100))
    }
  },
  'vaporize'
]
