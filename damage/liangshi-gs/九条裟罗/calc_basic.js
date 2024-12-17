import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

export const details = [{
  title: '重击伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
}, {
  title: 'E提升攻击力',
  params: { team: false },
  dmg: ({ talent, attr }) => {
    return {
      avg: talent.e['攻击力加成比例'] * attr.atk.base / 100
    }
  }
}, {
  title: '天狗咒雷·伏 伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.e['天狗咒雷·伏 伤害'], 'e')
}, {
  title: '天狗咒雷·金刚坏伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狗咒雷·金刚坏 伤害'], 'q')
}, {
  title: '天狗咒雷·雷砾伤害',
  params: { team: false },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狗咒雷·雷砾 伤害'], 'q')
}, {
  title: '雷九万班 重击',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
}, {
  title: '雷九万班 E爆炸',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['天狗咒雷·伏 伤害'], 'e')
}, {
  title: '雷九万班 Q展开',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狗咒雷·金刚坏 伤害'], 'q')
}, {
  title: '雷九万班 Q每段',
  params: { team: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['天狗咒雷·雷砾 伤害'], 'q')
}]

export const defDmgIdx = 3
export const mainAttr = 'atk,cpct,cdmg'

export const defParams = { team: true }

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '九条E技能：提升攻击力[atkPlus]',
    data: {
      atkPlus: ({ attr, talent }) => talent.e['攻击力加成比例'] * attr.atk.base / 100
    }
  }, {
    title: '九条6命：提升60%雷元素爆伤',
    cons: 6,
    data: {
      cdmg: 60
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '恶曜开眼：元素爆发伤害提升[qDmg]%',
    data: {
      qDmg: ({ talent }) => 24
    }
  }, {
    check: ({ params }) => params.team === true,
    title: '风鹰宗室班：增加[atkPlus]点攻击力与[atkPct]%攻击力',
    data: {
      atkPct: 20,
      atkPlus: 1202.35
    }
  }, {
    check: ({ cons, params }) => cons <= 1 && params.team === true,
    title: '精1苍古0命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%',
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16,
      dmg: 40,
      atkPct: 20,
      kx: 40
    }
  }, {
    check: ({ cons, params }) => (cons < 3 && cons > 1 && params.team === true),
    title: '精1苍古2命万叶：获得[dmg]%增伤(苍古普攻16增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16,
      dmg: 48,
      atkPct: 20,
      kx: 40,
      mastery: 200
    }
  }, {
    check: ({ cons, params }) => (cons >= 3 && params.team === true),
    title: '精5苍古6命万叶：获得[dmg]%增伤(苍古普攻32增伤)，增加[atkPct]%攻击,减抗[kx]%,精通[mastery]',
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32,
      dmg: 48,
      atkPct: 40,
      kx: 40,
      mastery: 200
    }
  },
  { title: '6.12最后修改：如有问题请输入 #伤害计算反馈' }
]
