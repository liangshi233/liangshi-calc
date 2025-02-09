import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '普攻一段伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
}, {
  title: '重击伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '勠心拳伤害',
  params: { e: 0, team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
}, {
  title: '满层勠心拳伤害',
  params: { e: 4, team: false },
  dmg: ({ talent }, dmg) => {
    return dmg(talent.e['技能伤害'] * 1 + talent.e['变格伤害提升'] * 4 + talent.e['正论伤害提升'] * 1, 'e')
  }
}, {
  title: '真空弹伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['不动流·真空弹伤害'], 'q')
}, {
  title: '聚风真眼伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['聚风真眼伤害'], 'q')
}, {
  title: '藏珐夜班 重击',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
}, {
  title: '藏珐夜班 满层勠心拳',
  params: { e: 4, team: true },
  dmg: ({ talent }, dmg) => {
    return dmg(talent.e['技能伤害'] * 1 + talent.e['变格伤害提升'] * 4 + talent.e['正论伤害提升'] * 1, 'e')
  }
}, {
  title: '藏珐夜班 真空弹',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['不动流·真空弹伤害'], 'q')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'

export const defParams = { team: true }

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '鹿野院平藏6命：每层「变格」提高E 4%暴击率,「正论」提高E 32%暴击伤害',
    cons: 6,
    data: {
      eCpct: ({ params }) => params.e === 4 ? 24 : 0,
      eCdmg: ({ params }) => params.e === 4 ? 32 : 0
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '千岩天空珐露珊：增加[dmg]%风元素伤害加成与[cdmg]%爆伤,降低[kx]%风元素抗性,增加[atkPct]%攻击力',
    data: {
      dmg: 38.25,
      cdmg: 40,
      kx: 30,
      atkPct: 20
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '祈风之赐：造成的风元素伤害提升[aPlus]',
    data: {
      aPlus: 278.4,
      a2Plus: 278.4,
      a3Plus: 278.4,
      ePlus: 278.4,
      qPlus: 278.4
    }
  }, {
    check: ({ cons, params }) => cons <= 1 && params.team === true,
    title: '夜兰：获得[dmg]%增伤',
    data: {
      dmg: 50
    }
  }, {
    check: ({ cons, params }) => ((cons < 6 && cons > 1) && params.team === true),
    title: '精1终末夜兰：获得[dmg]%增伤，增加[atkPct]%攻击力与[mastery]精通',
    data: {
      atkPct: 20,
      mastery: 100,
      dmg: 35
    }
  }, {
    check: ({ cons, params }) => (cons >= 6 && params.team === true),
    title: '精5终末夜兰：获得[dmg]%增伤，增加[atkPct]%攻击力与[mastery]精通',
    data: {
      atkPct: 40,
      mastery: 200,
      dmg: 35
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
    sort: 9,
    data: {
      atkPct: 20,
      atkPlus: 1202.35
    }
  },
  { title: '6.8最后修改：如有问题请输入 #伤害计算反馈' }
]
