import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let a3Dmg = { dmg: 0, avg: 0 }
let ar3Dmg = { dmg: 0, avg: 0 }
let q1Dmg = { dmg: 0, avg: 0 }
let q2Dmg = { dmg: 0, avg: 0 }
let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs36ranking = cfg.gs36ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '云开星落'
let eNameT = 'E'
let qName = '重华叠霜'
let qNameT = 'Q'
let c1Name = '一命'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '灭邪四式'
    c1Name = '一命座'
    eNameT = '云开星落'
    qNameT = '重华叠霜'
  } else if (NamePath == 3) {
    eNameT = '云开星落'
    qNameT = '重华叠霜'
  } else if (NamePath == 4) {
    eName = '元素战技'
    qName = '元素爆发'
    eNameT = '元素战技'
    qNameT = '元素爆发'
  } else if (NamePath == 5) {
    aName = '普攻'
    a3Name = '下落'
    eName = 'E技能'
    qName = 'Q技能'
    eNameT = 'E技能'
    qNameT = 'Q技能'
  } else if (NamePath == 6) {
    aName = 'A'
    a2Name = 'Z'
    a3Name = '戳'
    eName = 'E'
    qName = 'Q'
    c1Name = 'C1'
    eNameT = 'E'
    qNameT = 'Q'
  }
}

const miss = ['f', 'h', 'y', 'hph', 'hps']
let ranking = 'undefined'

if (!cfg.gs36ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'dps'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'dps'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'dps'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[重云] 排名规则均未命中，已选择默认排名规则')
        ranking = 'dps'
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
  ranking = `${gs36ranking}`
}

if (!cfg.namemodel) energy = 0

let renew = '1.5-修复1命效果显示异常'
renew = '2.19-修正多段类元素爆发无法多次获取伤害值提升类buff的问题'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${aName}一段伤害物理`,
    dmgKey: 'undefined',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  }, {
    title: `${aName}一段伤害冰`,
    dmgKey: 'a',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: `${aName}一段融化`,
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'melt')
  }, {
    title: `${aName}二段伤害物理`,
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  }, {
    title: `${aName}二段伤害冰`,
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
  }, {
    title: `${aName}二段融化`,
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'melt')
  }, {
    title: `${aName}三段伤害物理`,
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
  }, {
    title: `${aName}三段伤害冰`,
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
  }, {
    title: `${aName}三段融化`,
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'melt')
  }, {
    title: `${aName}四段伤害物理`,
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
  }, {
    title: `${aName}四段伤害冰`,
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
  }, {
    title: `${aName}四段融化`,
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'melt')
  }, {
    title: `${a2Name}循环伤害物理`,
    dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'phy')
  }, {
    title: `${a2Name}循环伤害冰`,
    dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
  }, {
    title: `${a2Name}循环伤害融化`,
    dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'melt')
  }, {
    title: `${a2Name}终结伤害物理`,
    dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'phy')
  }, {
    title: `${a2Name}终结伤害冰`,
    dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2')
  }, {
    title: `${a2Name}终结伤害融化`,
    dmgKey: 'z',
    dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'melt')
  }, {
    title: `${a3Name}期间伤害物理`,
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
  }, {
    title: `${a3Name}期间伤害冰`,
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
  }, {
    title: `${a3Name}期间伤害融化`,
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'melt')
  }, {
    title: `低空${a3Name}伤害物理`,
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
  }, {
    title: `低空${a3Name}伤害冰`,
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
  }, {
    title: `低空${a3Name}伤害融化`,
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'melt')
  }, {
    title: `高空${a3Name}伤害物理`,
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
  }, {
    title: `高空${a3Name}伤害冰`,
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
  }, {
    title: `高空${a3Name}伤害融化`,
    dmgKey: 'c',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'melt')
  }, {
    check: ({ cons }) => cons >= 1,
    title: `${c1Name}冰刃单道伤害`,
    dmg: ({ attr, talent, calc }, { basic }) => {
      a3Dmg = basic(calc(attr.atk) * (50 / 100), 'a')
      return a3Dmg
    }
  }, {
    check: ({ cons }) => cons >= 1,
    title: `${c1Name}冰刃单道融化`,
    dmg: ({ attr, talent, calc }, { basic }) => {
      ar3Dmg = basic(calc(attr.atk) * (50 / 100), 'a', 'melt')
      return ar3Dmg
    }
  }, {
    title: `${eName}伤害`,
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
  }, {
    title: `${eName}融化伤害`,
    dmgKey: 'e',
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
  }, {
    title: `${qName}单段伤害`,
    params: { tfkx: true },
    dmg: ({ talent }, dmg) => {
      q1Dmg = dmg(talent.q['技能伤害'], 'q')
      return q1Dmg
    }
  }, {
    title: `${qName}单段融化`,
    params: { tfkx: true },
    dmg: ({ talent }, dmg) => {
      q2Dmg = dmg(talent.q['技能伤害'], 'q', 'melt')
      return q2Dmg
    }
  }, ({ cons }) => {
    let count = cons === 6 ? 4 : 3
    return {
      title: `${qName} ${count}柄灵刃总伤害`,
      params: { tfkx: true },
      dmg: ({ talent, cons }, dmg) => {
        let qDmg = dmg(talent.q['技能伤害'], 'q')
        return {
          dmg: qDmg.dmg * count,
          avg: qDmg.avg * count
        }
      }
    }
  }, ({ cons }) => {
    let count = cons === 6 ? 4 : 3
    return {
      title: `${qName} ${count}柄灵刃总融化`,
      dmgKey: 'q',
      params: { tfkx: true },
      dmg: ({ talent, cons }, dmg) => {
        let qDmg = dmg(talent.q['技能伤害'], 'q', 'melt')
        return {
          dmg: qDmg.dmg * count,
          avg: qDmg.avg * count
        }
      }
    }
  }, {
    title: '单人站场15秒',
    dmg: ({ talent, cons }, dmg) => {
      let aw1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let aw2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let aw3 = dmg(talent.a['三段伤害'], 'a', 'phy')
      let aw4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let a1 = dmg(talent.a['一段伤害'], 'a')
      let a2 = dmg(talent.a['二段伤害'], 'a')
      let a3 = dmg(talent.a['三段伤害'], 'a')
      let a4 = dmg(talent.a['四段伤害'], 'a')
      let e = dmg(talent.e['技能伤害'], 'e')
      let cons1 = cons * 1 >= 1 ? 1 : 0
      let cons6 = cons * 1 >= 6 ? 4 : 3
      let ax3 = a3Dmg
      let q = q1Dmg
      return {
        dmg: aw1.dmg + aw2.dmg + aw3.dmg + aw4.dmg + a1.dmg * 3 + a2.dmg * 3 + a3.dmg * 3 + a4.dmg * 2 + ax3.dmg * 9 * cons1 + e.dmg * 2 + q.dmg * cons6,
        avg: aw1.avg + aw2.avg + aw3.avg + aw4.avg + a1.avg * 3 + a2.avg * 3 + a3.avg * 3 + a4.avg * 2 + ax3.avg * 9 * cons1 + e.avg * 2 + q.avg * cons6
      }
    }
  }, {
    title: '单人站场15秒融化',
    dmgKey: 'dph',
    dmg: ({ talent, cons }, dmg) => {
      let aw1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let aw2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let aw3 = dmg(talent.a['三段伤害'], 'a', 'phy')
      let aw4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let a1 = dmg(talent.a['一段伤害'], 'a')
      let ar1 = dmg(talent.a['一段伤害'], 'a', 'melt')
      let a2 = dmg(talent.a['二段伤害'], 'a')
      let ar2 = dmg(talent.a['二段伤害'], 'a', 'melt')
      let a3 = dmg(talent.a['三段伤害'], 'a')
      let ar3 = dmg(talent.a['三段伤害'], 'a', 'melt')
      let a4 = dmg(talent.a['四段伤害'], 'a')
      let ar4 = dmg(talent.a['四段伤害'], 'a', 'melt')
      let e = dmg(talent.e['技能伤害'], 'e', 'melt')
      let cons1 = cons * 1 >= 1 ? 1 : 0
      let cons6 = cons * 1 >= 6 ? 4 : 3
      let ax3 = a3Dmg
      let axr3 = ar3Dmg
      let q = q2Dmg
      return {
        dmg: ar1.dmg + ar2.dmg + ar3.dmg + ar4.dmg + aw1.dmg + aw2.dmg + aw3.dmg + aw4.dmg + a1.dmg * 2 + a2.dmg * 2 + a3.dmg * 2 + a4.dmg * 1 + ax3.dmg * 6 * cons1 + axr3.dmg * 3 * cons1 + e.dmg * 2 + q.dmg * cons6,
        avg: ar1.avg + ar2.avg + ar3.avg + ar4.avg + aw1.avg + aw2.avg + aw3.avg + aw4.avg + a1.avg * 2 + a2.avg * 2 + a3.avg * 2 + a4.avg * 1 + ax3.avg * 6 * cons1 + axr3.avg * 3 * cons1 + e.avg * 2 + q.avg * cons6
      }
    }
  }, {
    title: '单人循环流畅度',
    dmg: ({ talent, calc, attr, weapon, cons }) => {
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '便携动力锯') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '桂木斩长正') weaponnn = (2.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '西风大剑') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼大剑') weaponn = 4 * 3

      if (cons >= 4) consn = 1 * 7

      if (weapon.name === '松籁响起之时') weaponconsn = weapon.affix_level >= 4 ? 2 : 1

      return {
        avg: Format.percent((calc(attr.recharge) / 100 * (4 * 3 + weaponn + energy)) / (40 - consn - weaponnn - (0.2732 * (15 + weaponconsn)))),
        type: 'text'
      }
    }
  }, {
    title: '单人站场期望DPS',
    dmg: ({ talent, calc, attr, weapon, cons }, dmg) => {
      let aw1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let aw2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let aw3 = dmg(talent.a['三段伤害'], 'a', 'phy')
      let aw4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let a1 = dmg(talent.a['一段伤害'], 'a')
      let a2 = dmg(talent.a['二段伤害'], 'a')
      let a3 = dmg(talent.a['三段伤害'], 'a')
      let a4 = dmg(talent.a['四段伤害'], 'a')
      let e = dmg(talent.e['技能伤害'], 'e')
      let cons1 = cons * 1 >= 1 ? 1 : 0
      let cons6 = cons * 1 >= 6 ? 4 : 3
      let ax3 = a3Dmg
      let q = q1Dmg
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '便携动力锯') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '桂木斩长正') weaponnn = (2.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '西风大剑') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼大剑') weaponn = 4 * 3

      if (cons >= 4) consn = 1 * 7

      if (weapon.name === '松籁响起之时') weaponconsn = weapon.affix_level >= 4 ? 2 : 1

      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (4 * 3 + weaponn + energy)) / (40 - consn - weaponnn - (0.2732 * (15 + weaponconsn))))
      return {
        dmg: (aw1.dmg + aw2.dmg + aw3.dmg + aw4.dmg + a1.dmg * 3 + a2.dmg * 3 + a3.dmg * 3 + a4.dmg * 2 + ax3.dmg * 9 * cons1 + e.dmg * 2 + q.dmg * cons6 * qcn) / 15,
        avg: (aw1.avg + aw2.avg + aw3.avg + aw4.avg + a1.avg * 3 + a2.avg * 3 + a3.avg * 3 + a4.avg * 2 + ax3.avg * 9 * cons1 + e.avg * 2 + q.avg * cons6 * qcn) / 15
      }
    }
  }, {
    title: '单人融化站场期望DPS',
    dmgKey: 'dps',
    dmg: ({ talent, calc, attr, weapon, cons }, dmg) => {
      let aw1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let aw2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let aw3 = dmg(talent.a['三段伤害'], 'a', 'phy')
      let aw4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let a1 = dmg(talent.a['一段伤害'], 'a')
      let ar1 = dmg(talent.a['一段伤害'], 'a', 'melt')
      let a2 = dmg(talent.a['二段伤害'], 'a')
      let ar2 = dmg(talent.a['二段伤害'], 'a', 'melt')
      let a3 = dmg(talent.a['三段伤害'], 'a')
      let ar3 = dmg(talent.a['三段伤害'], 'a', 'melt')
      let a4 = dmg(talent.a['四段伤害'], 'a')
      let ar4 = dmg(talent.a['四段伤害'], 'a', 'melt')
      let e = dmg(talent.e['技能伤害'], 'e', 'melt')
      let cons1 = cons * 1 >= 1 ? 1 : 0
      let cons6 = cons * 1 >= 6 ? 4 : 3
      let ax3 = a3Dmg
      let axr3 = ar3Dmg
      let q = q2Dmg
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '便携动力锯') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '桂木斩长正') weaponnn = (2.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '西风大剑') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼大剑') weaponn = 4 * 3

      if (cons >= 4) consn = 1 * 7

      if (weapon.name === '松籁响起之时') weaponconsn = weapon.affix_level >= 4 ? 2 : 1

      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (4 * 3 + weaponn + energy)) / (40 - consn - weaponnn - (0.2732 * (15 + weaponconsn))))
      return {
        dmg: (ar1.dmg + ar2.dmg + ar3.dmg + ar4.dmg + aw1.dmg + aw2.dmg + aw3.dmg + aw4.dmg + a1.dmg * 2 + a2.dmg * 2 + a3.dmg * 2 + a4.dmg * 1 + ax3.dmg * 6 * cons1 + axr3.dmg * 3 * cons1 + e.dmg * 2 + q.dmg * cons6 * qcn) / 15,
        avg: (ar1.avg + ar2.avg + ar3.avg + ar4.avg + aw1.avg + aw2.avg + aw3.avg + aw4.avg + a1.avg * 2 + a2.avg * 2 + a3.avg * 2 + a4.avg * 1 + ax3.avg * 6 * cons1 + axr3.avg * 3 * cons1 + e.avg * 2 + q.avg * cons6 * qcn) / 15
      }
    }
  }, {
    title: `重香行班 ${eNameT}融化`,
    params: { teamA: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
  }, {
    title: `重香行班 ${qNameT}伤害`,
    params: { teamA: true, tfkx: true },
    dmg: ({ talent, cons }, dmg) => {
      let count = cons === 6 ? 4 : 3
      let qDmg = dmg(talent.q['技能伤害'], 'q')
      return {
        dmg: qDmg.dmg * count,
        avg: qDmg.avg * count
      }
    }
  }, {
    title: `重香行班 ${qNameT}融化`,
    params: { teamA: true, tfkx: true },
    dmg: ({ talent, cons }, dmg) => {
      let count = cons === 6 ? 4 : 3
      let qDmg = dmg(talent.q['技能伤害'], 'q', 'melt')
      return {
        dmg: qDmg.dmg * count,
        avg: qDmg.avg * count
      }
    }
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '重云天赋：[追冰剑诀] 灵刃·重华叠霜领域消失时唤出灵刃降低敌人[kx]%冰元素抗性',
    check: ({ params }) => params.tfkx === true,
    data: {
      kx: 15
    }
  }, {
    title: '重云天赋：[吐纳真定] 处在灵刃·重华叠霜领域内的普通攻击的单手剑,双手剑,长柄武器角色攻击速度提升[_aSpeed]%',
    data: {
      _aSpeed: 8
    }
  }, {
    title: '重云2命：[周天运转] 处于重华叠霜领域中获得[_cd]%冷却缩减',
    cons: 2,
    data: {
      _cd: 15
    }
  }, {
    title: '重云4命：[浮云霜天] 攻击命中受到冰元素影响的敌人时回复[_energyevery]点元素能量',
    cons: 4,
    data: {
      _energyevery: 1
    }
  }, {
    title: '重云6命：[四灵捧圣] 对于生命百分比低于重云的敌人伤害提升[qDmg]%，灵刃增加一柄',
    cons: 6,
    data: {
      qDmg: 15
    }
  }, {
    title: '班尼特技能：[美妙旅程] 处于鼓舞领域攻击力提升[atkPlus]点',
    check: ({ params }) => params.teamA === true,
    sort: 1,
    data: {
      atkPlus: 1202.35
    }
  }, {
    title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]% { 该圣遗物效果不可叠加 }',
    check: ({ params, artis }) => params.teamA === true && artis.昔日宗室之仪 !== 4,
    sort: 1,
    data: {
      atkPct: 20
    }
  }, {
    title: '行秋技能：[古华剑·画雨笼山] 场上角色的抗打断能力提升[_interruption]%受到伤害降低[_reduction]%',
    check: ({ params }) => params.teamA === true,
    data: {
      _interruption: 70,
      _reduction: 45.32
    }
  }, {
    title: '元素共鸣：[热诚之火] 攻击力提高[atkPct]%',
    check: ({ params }) => params.teamA === true,
    sort: 1,
    data: {
      atkPct: 25
    }
  },
  'melt',
  { title: `2.28最后修改：[10.17重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs36ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}` }
]
