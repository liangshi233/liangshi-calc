import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs70ranking = cfg.gs70ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '七域舞步'
let e2Name = '旋舞步'
let e3Name = '剑舞步'
let eNameT = 'E'
let e2NameT = 'EE'
let e3NameT = 'EA'
let qName = '远梦聆泉'
let qNameT = 'Q'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '弦月舞步'
    eNameT = '七域舞步'
    e2NameT = '旋舞步'
    e3NameT = '剑舞步'
    qNameT = '远梦聆泉'
  } else if (NamePath == 3) {
    eNameT = '七域舞步'
    e2NameT = '旋舞步'
    e3NameT = '剑舞步'
    qNameT = '远梦聆泉'
  } else if (NamePath == 4) {
    eName = '元素战技'
    qName = '元素爆发'
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 5) {
    aName = '普攻'
    a3Name = '下落'
    eName = 'E技能'
    e2Name = 'EE技能'
    e3Name = 'EA技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    e2NameT = 'EE技能'
    e3NameT = 'EA技能'
    qNameT = 'Q技能'
  } else if (NamePath == 6) {
    aName = 'A'
    a2Name = 'Z'
    a3Name = '戳'
    eName = 'E'
    e2Name = 'EE'
    e3Name = 'EA'
    qName = 'Q'
    eNameT = 'E'
    qNameT = 'Q'
  }
}

const miss = ['y', 'hph', 'hps']
let ranking = 'undefined'

if (!cfg.gs70ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'r'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'r'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'r'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[妮露] 排名规则均未命中，已选择默认排名规则')
        ranking = 'r'
      } else {
        ranking = `${rankingThreePath}`
      }
    } else {
      ranking = `${rankingTwoPath}`
    }
  } else {
    ranking = `${rankingOnePath}`
  }
} else {
  ranking = `${gs70ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'
let syDmg = { dmg: 0, avg: 0 }
let syzDmg = { dmg: 0, avg: 0 }
let frzhDmg = { dmg: 0, avg: 0 }

export const details = [
  {
    title: `${aName}一段伤害`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  }, {
    title: `${aName}二段伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  }, {
    title: `${aName}三段伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
  }, {
    title: `${a2Name}伤害`,
    dmgKey: 'z',
    dmg: ({ talent }, dmg) => {
      let z1 = dmg(talent.a['重击伤害'] / 2, 'a2', 'phy')
      return {
        dmg: z1.dmg * 2,
        avg: z1.avg * 2
      }
    }
  }, {
    title: `${a3Name}期间伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
  }, {
    title: `低空${a3Name}伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
  }, {
    title: `高空${a3Name}伤害`,
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
  }, {
    title: `${eName}启动伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  }, {
    title: `${eName}启动蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
  }, {
    title: `${e2Name}一段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][1] / 100, 'e')
  }, {
    title: `${e2Name}一段蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][1] / 100, 'e', 'vaporize')
  }, {
    title: `${e2Name}二段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][1] / 100, 'e')
  }, {
    title: `${e2Name}二段蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][1] / 100, 'e', 'vaporize')
  }, {
    title: `${e2Name}三段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][1] / 100, 'e')
  }, {
    title: `${e2Name}三段蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][1] / 100, 'e', 'vaporize')
  }, {
    title: `${e3Name}一段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
  }, {
    title: `${e3Name}一段蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e', 'vaporize')
  }, {
    title: `${e3Name}二段伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
  }, {
    title: `${e3Name}二段蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e', 'vaporize')
  }, {
    title: '水月伤害',
    params: { sy: true },
    dmg: ({ talent, calc, attr }, { basic }) => {
      syDmg = basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][0] / 100, 'e')
      return syDmg
    }
  }, {
    title: '水月蒸发伤害',
    params: { sy: true },
    dmg: ({ talent, calc, attr }, { basic }) => {
      syzDmg = basic(calc(attr.hp) * talent.e['水月/水轮伤害2'][0] / 100, 'e', 'vaporize')
      return syzDmg
    }
  }, {
    title: `${eName}${e3Name}完整伤害`,
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
      let e4 = syDmg
      return {
        dmg: e1.dmg + 6 * (e2.dmg + e3.dmg + e4.dmg),
        avg: e1.avg + 6 * (e2.avg + e3.avg + e4.avg)
      }
    }
  }, {
    title: `${eName}${e3Name}完整蒸发`,
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
      let e2 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
      let e4 = syzDmg
      return {
        dmg: e1.dmg + 6 * (e2.dmg + e3.dmg + e4.dmg),
        avg: e1.avg + 6 * (e2.avg + e3.avg + e4.avg)
      }
    }
  }, {
    title: `${qName}命中伤害`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
  }, {
    title: `${qName}命中蒸发`,
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
  }, {
    title: '永世流沔伤害',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q')
  }, {
    title: '永世流沔蒸发',
    dmg: ({ talent, calc, attr }, { basic }) => basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q', 'vaporize')
  }, {
    title: '丰穰之核伤害提升',
    dmgKey: 'f',
    dmg: ({ attr, calc }) => {
      return {
        avg: Format.percent(Math.max(0, Math.min(400, (calc(attr.hp) - 30000) / 1000 * 9)) / 100),
        type: 'text'
      }
    }
  }, {
    title: '丰穰之核伤害',
    dmgKey: 'r',
    params: { bloom: true },
    dmg: ({ calc, attr }, { reaction }) => {
      frzhDmg = reaction('bloom')
      return frzhDmg
    }
  }, {
    title: '单人站场18秒',
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let q2 = basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q')
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
      let e4 = syDmg
      return {
        dmg: 4 * (a1.dmg + a2.dmg + a3.dmg) + e1.dmg + 6 * (e2.dmg + e3.dmg + e4.dmg) + (q1.dmg + q2.dmg),
        avg: 4 * (a1.avg + a2.avg + a3.avg) + e1.avg + 6 * (e2.avg + e3.avg + e4.avg) + (q1.avg + q2.avg)
      }
    }
  }, {
    title: '单人站场18秒蒸发',
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
      let q2 = basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q', 'vaporize')
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
      let e2 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
      let e4 = syzDmg
      return {
        dmg: 4 * (a1.dmg + a2.dmg + a3.dmg) + e1.dmg + 6 * (e2.dmg + e3.dmg + e4.dmg) + (q1.dmg + q2.dmg),
        avg: 4 * (a1.avg + a2.avg + a3.avg) + e1.avg + 6 * (e2.avg + e3.avg + e4.avg) + (q1.avg + q2.avg)
      }
    }
  }, {
    title: '双人双怪对单18秒',
    params: { bloom: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let q2 = basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q')
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
      let e4 = syDmg
      let r1 = frzhDmg
      return {
        dmg: 4 * (a1.dmg + a2.dmg + a3.dmg) + e1.dmg + 6 * (e2.dmg + e3.dmg + e4.dmg) + (q1.dmg + q2.dmg) + r1.avg * 18,
        avg: 4 * (a1.avg + a2.avg + a3.avg) + e1.avg + 6 * (e2.avg + e3.avg + e4.avg) + (q1.avg + q2.avg) + r1.avg * 18
      }
    }
  }, {
    title: '单人循环流畅度',
    dmg: ({ talent, calc, attr, weapon, cons }) => {
      let consn = 0
      let weaponn = 0
      let weaponnn = 0
      let weaponconsn = 0
      if (weapon.name === '船坞长剑') {
        if (weapon.affix == 1) {
          weaponnn = 2 * 3
        }
        if (weapon.affix == 2) {
          weaponnn = 2.5 * 3
        }
        if (weapon.affix == 3) {
          weaponnn = 3 * 3
        }
        if (weapon.affix == 4) {
          weaponnn = 3.5 * 3
        }
        if (weapon.affix == 5) {
          weaponnn = 4 * 3
        }
      }
      if (weapon.name === '天目影打刀') {
        if (weapon.affix == 1) {
          weaponnn = 6
        }
        if (weapon.affix == 2) {
          weaponnn = 7.5
        }
        if (weapon.affix == 3) {
          weaponnn = 9
        }
        if (weapon.affix == 4) {
          weaponnn = 10.5
        }
        if (weapon.affix == 5) {
          weaponnn = 12
        }
      }
      if (weapon.name === '西风剑') {
        weaponn = 3 * 2 * 2
      }
      if (weapon.name === '祭礼剑') {
        weaponn = 3.5 * 3
      }
      if (weapon.name === '天空之刃') {
        weaponconsn = 1
      }
      if (cons >= 4) {
        consn = 15
      }
      return {
        avg: Format.percent((calc(attr.recharge) / 100 * (3.5 * 3 + weaponn + energy)) / (70 - consn - weaponnn - (0.2212 * (12 + weaponconsn)))),
        type: 'text'
      }
    }
  },
  {
    title: '单人站场期望DPS',
    dmg: ({ talent, calc, attr, weapon, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let q2 = basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q')
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
      let e4 = syDmg
      let consn = 0
      let weaponn = 0
      let weaponnn = 0
      let weaponconsn = 0
      if (weapon.name === '船坞长剑') {
        if (weapon.affix == 1) {
          weaponnn = 2 * 3
        }
        if (weapon.affix == 2) {
          weaponnn = 2.5 * 3
        }
        if (weapon.affix == 3) {
          weaponnn = 3 * 3
        }
        if (weapon.affix == 4) {
          weaponnn = 3.5 * 3
        }
        if (weapon.affix == 5) {
          weaponnn = 4 * 3
        }
      }
      if (weapon.name === '天目影打刀') {
        if (weapon.affix == 1) {
          weaponnn = 6
        }
        if (weapon.affix == 2) {
          weaponnn = 7.5
        }
        if (weapon.affix == 3) {
          weaponnn = 9
        }
        if (weapon.affix == 4) {
          weaponnn = 10.5
        }
        if (weapon.affix == 5) {
          weaponnn = 12
        }
      }
      if (weapon.name === '西风剑') {
        weaponn = 3 * 2 * 2
      }
      if (weapon.name === '祭礼剑') {
        weaponn = 3.5 * 3
      }
      if (weapon.name === '天空之刃') {
        weaponconsn = 1
      }
      if (cons >= 4) {
        consn = 15
      }
      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (3.5 * 3 + weaponn + energy)) / (70 - consn - weaponnn - (0.2212 * (12 + weaponconsn))))
      return {
        dmg: (4 * (a1.dmg + a2.dmg + a3.dmg) + e1.dmg + 6 * (e2.dmg + e3.dmg + e4.dmg) + qcn * (q1.dmg + q2.dmg)) / 18,
        avg: (4 * (a1.avg + a2.avg + a3.avg) + e1.avg + 6 * (e2.avg + e3.avg + e4.avg) + qcn * (q1.avg + q2.avg)) / 18
      }
    }
  },
  {
    title: '单人站场期望DPS蒸发',
    dmg: ({ talent, calc, attr, weapon, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
      let q2 = basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q', 'vaporize')
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
      let e2 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
      let e4 = syzDmg
      let consn = 0
      let weaponn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '船坞长剑') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '天目影打刀') weaponnn = 4.5 + weapon.affix * 1.5

      if (weapon.name === '西风剑') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼剑') weaponn = 3.5 * 3

      if (weapon.name === '天空之刃') weaponconsn = 1

      if (cons >= 4) consn = 15

      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (3.5 * 3 + weaponn + energy)) / (70 - consn - weaponnn - (0.2212 * (12 + weaponconsn))))
      return {
        dmg: (4 * (a1.dmg + a2.dmg + a3.dmg) + e1.dmg + 6 * (e2.dmg + e3.dmg + e4.dmg) + qcn * (q1.dmg + q2.dmg)) / 18,
        avg: (4 * (a1.avg + a2.avg + a3.avg) + e1.avg + 6 * (e2.avg + e3.avg + e4.avg) + qcn * (q1.avg + q2.avg)) / 18
      }
    }
  },
  {
    title: '双人双怪对单期望DPS',
    params: { bloom: true },
    dmg: ({ talent, calc, attr, weapon, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let q1 = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      let q2 = basic(calc(attr.hp) * talent.q['永世流沔伤害'] / 100, 'q')
      let e1 = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步一段伤害2'][0] / 100, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['剑舞步/旋舞步二段伤害2'][0] / 100, 'e')
      let e4 = syDmg
      let r1 = frzhDmg
      let consn = 0
      let weaponn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '船坞长剑') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '天目影打刀') weaponnn = 4.5 + weapon.affix * 1.5

      if (weapon.name === '西风剑') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼剑') weaponn = 3.5 * 3

      if (weapon.name === '天空之刃') weaponconsn = 1

      if (cons >= 4) consn = 15

      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (3.5 * 3 + weaponn + energy)) / (70 - consn - weaponnn - (0.2212 * (12 + weaponconsn))))
      return {
        dmg: (4 * (a1.dmg + a2.dmg + a3.dmg) + e1.dmg + 6 * (e2.dmg + e3.dmg + e4.dmg) + qcn * (q1.dmg + q2.dmg) + r1.avg * (14 + qcn * 4)) / 18,
        avg: (4 * (a1.avg + a2.avg + a3.avg) + e1.avg + 6 * (e2.avg + e3.avg + e4.avg) + qcn * (q1.avg + q2.avg) + r1.avg * (14 + qcn * 4)) / 18
      }
    }
  },
  {
    title: '妮柯荧芭 丰穰之核',
    params: { bloom: true, teamA: true },
    dmg: ({ calc, attr }, { reaction }) => reaction('bloom')
  },
  {
    title: '妮那妲白 丰穰之核',
    params: { bloom: true, teamB: true },
    dmg: ({ calc, attr }, { reaction }) => reaction('bloom')
  }]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    check: ({ params }) => params.bloom === true,
    title: '妮露天赋：[折旋落英之庭] 触发绽放反应时,将取代草原核产生「丰穰之核」,角色受到草元素攻击会使元素精通提升[mastery]点 { 该效果单人不生效 }',
    data: {
      mastery: 100
    }
  }, {
    check: ({ params }) => params.bloom === true,
    title: '妮露天赋：[翩舞永世之梦] 处于「金杯的丰馈」状态下的角色触发的丰穰之核造成的伤害提升[bloom]% { 该效果单人不生效 }',
    sort: 9,
    data: {
      bloom: ({ calc, attr }) => Math.max(0, Math.min(400, (calc(attr.hp) - 30000) / 1000 * 9))
    }
  }, {
    check: ({ params }) => params.sy === true,
    title: '妮露1命：[却月的轻舞] 水月造成的伤害提升[eDmg]%,净天水环的持续时间延长[_eSustainedPlus]秒',
    cons: 1,
    data: {
      eDmg: 65,
      _eSustainedPlus: 6
    }
  }, {
    check: ({ params }) => params.bloom === true,
    title: '妮露2命：[星天的花雨] 对敌人造成水元素伤害后,该敌人的水元素抗性降低[kx]%,触发绽放反应对敌人造成伤害后,该敌人的草元素抗性降低[_kx]% { 该效果单人不生效 }',
    cons: 2,
    data: {
      kx: 35,
      _kx: 35
    }
  }, {
    title: '妮露4命：[挽漪的节音] 七域舞步的翩转状态下的第三段舞步命中敌人后,将恢复[_energyevery]点元素能量,并使浮莲舞步·远梦聆泉造成的伤害提升[qDmg]%',
    cons: 4,
    data: {
      _energyevery: 15,
      qDmg: 50
    }
  }, {
    title: '妮露6命：[断霜的弦歌] 暴击率提升[cpct]%,暴击伤害提升[cdmg]%',
    sort: 9,
    cons: 6,
    data: {
      cpct: ({ calc, attr }) => Math.min(30, calc(attr.hp) / 1000 * 0.6),
      cdmg: ({ calc, attr }) => Math.min(60, calc(attr.hp) / 1000 * 1.2)
    }
  }, {
    check: ({ params }) => params.teamA === true || params.teamB === true,
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    data: {
      hpPct: 25
    }
  }, {
    check: ({ params }) => params.teamA === true || params.teamB === true,
    title: '元素共鸣：[蔓生之草] 元素精通合计提升[mastery]点,触发燃烧、原激化、绽放反应后,队伍中附近的所有角色元素精通提升',
    sort: 1,
    data: {
      mastery: 80
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '芭芭拉天赋：[光辉的季节] 角色在演唱，开始♪的歌声之环中时，体力消耗降低[_stamina]%。',
    data: {
      _stamina: 12
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '芭芭拉2命：[元气迸发] 演唱，开始♪持续期间当前场上自己的角色获得[dmg]%水元素伤害加成。',
    data: {
      dmg: 15
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '芭芭拉6命：[将一切美好献给你] 队伍中自己的角色倒下时复苏该角色并将该角色生命值恢复至100%。'
  }, {
    check: ({ params }) => params.teamA === true,
    title: '柯莱4命：[骞林馈遗] 施放猫猫秘宝时，将使队伍中附近的所有角色的元素精通提升[mastery]点',
    data: {
      mastery: 60
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '旅行者6命：[蕴思的霜草] 处于草灯莲的莲光遍照效果影响下的角色获得[_dmg]%草元素伤害加成；若草灯莲发生过莲光幻变转化，还将获得[dmg]%对应元素伤害加成。',
    data: {
      _dmg: 12,
      dmg: 12
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '旅行者天赋：[蔓生的埜草] 草灯莲将在其存在期间获得[buff]层莲光遍照效果，使其领域内的当前场上角色的元素精通提升[mastery]点。',
    data: {
      buff: 10,
      mastery: 6 * 10
    }
  }, {
    check: ({ params, artis }) => params.teamA === true && artis.深林的记忆 !== 4,
    title: '旅行者圣遗物：[深林的记忆4] 元素战技或元素爆发命中敌人后,使命中目标的草元素抗性降低[kx]%',
    data: {
      kx: 30
    }
  }, {
    title: '纳西妲天赋：[净善摄受明论] 依据队伍中元素精通最高的角色的元素精通,提高领域内当前场上角色的元素精通[mastery]点',
    check: ({ params }) => params.teamB === true,
    sort: 7,
    data: {
      mastery: 250
    }
  }, {
    title: '纳西妲圣遗物：[深林的记忆4] 元素战技或元素爆发命中敌人后,使命中目标的草元素抗性降低[kx]%',
    check: ({ params }) => params.teamB === true,
    data: {
      kx: 30
    }
  }, {
    title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons < 6 && params.teamB === true,
    sort: 1,
    data: {
      mastery: 40
    }
  }, {
    title: '纳西妲武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 6 && params.teamB === true,
    sort: 1,
    data: {
      mastery: 48
    }
  }, {
    title: '白术天赋：[在地为化] 受到无郤气护盾治疗的角色，触发的燃烧、绽放、超绽放、烈绽放反应造成的伤害提升[bloom]%',
    check: ({ params }) => params.teamB === true,
    data: {
      bloom: 100
    }
  }, {
    title: '白术4命：[法古观冥] 施放愈气全形论之后队伍中附近的所有角色元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 4 && params.teamB === true,
    data: {
      mastery: 80
    }
  },
  { title: `4.28最后修改：[12.25重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs70ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}` }
]
