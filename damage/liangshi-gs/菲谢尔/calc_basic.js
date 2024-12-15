import { characterBuffGs, enemyBuffGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '奥兹攻击伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['奥兹攻击伤害'], 'e')
}, {
  check: ({ artis }) => artis.黄金剧团 === 4,
  title: '后台奥兹攻击伤害',
  params: { gotr: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['奥兹攻击伤害'], 'e')
}, {
  title: '奥兹攻击超激化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['奥兹攻击伤害'], 'e', '超激化')
}, {
  check: ({ artis }) => artis.黄金剧团 === 4,
  title: '后台奥兹攻击超激化伤害',
  params: { gotr: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['奥兹攻击伤害'], 'e', '超激化')
}, {
  title: '奥兹召唤伤害',
  params: { e: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.e['召唤伤害'], 'e')
}, {
  title: '奥兹召唤超激化伤害',
  params: { e: true },
  dmg: ({ talent, cons }, dmg) => dmg(talent.e['召唤伤害'], 'e', '超激化')
}, {
  title: '至夜幻现伤害',
  dmg: ({ talent, cons }, dmg) => dmg(talent.q['落雷伤害'], 'q')
}, {
  title: '至夜幻现超激化伤害',
  dmg: ({ talent, cons }, dmg) => dmg(talent.q['落雷伤害'], 'q', '超激化')
}]

export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,
  {
    title: '菲谢尔2命：施放夜巡影翼时，能额外造成200%攻击力的伤害',
    data: {
      ePct: ({ params }) => params.e ? 200 : 0
    }
  }, {
    title: '菲谢尔4命：施放夜巡影翼时，能额外造成200%攻击力的伤害',
    data: {
      qPct: ({ params }) => params.q ? 222 : 0
    }
  },
  { title: '12.4最后修改：如有问题请输入 #伤害计算反馈' }
]
