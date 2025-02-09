import { Format, LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs46ranking = cfg.gs46ranking
let energy = cfg.energymodel
let a1Dmg = { dmg: 0, avg: 0 }
let a2Dmg = { dmg: 0, avg: 0 }
let a3Dmg = { dmg: 0, avg: 0 }
let a4Dmg = { dmg: 0, avg: 0 }
let a5Dmg = { dmg: 0, avg: 0 }
let e1Dmg = { dmg: 0, avg: 0 }
let e2Dmg = { dmg: 0, avg: 0 }
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '血梅香'
let eNameT = 'E'
let qName = '安神秘法'
let qNameT = 'Q'
let tName = '半血'

if (NamePath !== 1) {
  if (NamePath == 2) {
    aName = '往生堂秘传枪法'
    eNameT = '蝶引来生'
    qNameT = '安神秘法'
    tName = '一半生命值'
  } else if (NamePath == 3) {
    eNameT = '蝶引来生'
    qNameT = '安神秘法'
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
    eNameT = 'E'
    qNameT = 'Q'
  }
}

const miss = ['f', 'y', 'hph', 'hps']
let ranking = 'undefined'

if (!cfg.gs46ranking) {
  if (rankingOnePath == 'm') {
    ranking = 'dps'
  } else if (miss.includes(rankingOnePath)) {
    if (rankingTwoPath == 'm') {
      ranking = 'dps'
    } else if (miss.includes(rankingTwoPath)) {
      if (rankingThreePath == 'm') {
        ranking = 'dps'
      } else if (miss.includes(rankingThreePath)) {
        logger.mark('[胡桃] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs46ranking}`
}
if (!cfg.energymodel) energy = 0

let renew = '12.27-修复攻击力提升不正确的问题'
renew = '1.5-修复部分情况下部分计算Nan的问题'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
  {
    title: `${aName}一段伤害`,
    dmgKey: 'undefined',
    params: { e: true },
    dmg: ({ talent }, dmg) => {
      a1Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
      return a1Dmg
    }
  }, {
    title: `开${eNameT}${aName}一段`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: `开${eNameT}${aName}一段蒸发`,
    dmgKey: 'a',
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
  }, {
    title: `${tName}开${eNameT}${aName}一段`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a')
  }, {
    title: `${tName}开${eNameT}${aName}一段蒸发`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
  }, {
    title: `${aName}二段伤害`,
    params: { e: true },
    dmg: ({ talent }, dmg) => {
      a2Dmg = dmg(talent.a['二段伤害'], 'a', 'phy')
      return a2Dmg
    }
  }, {
    title: `开${eNameT}${aName}二段`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['二段伤害'], 'a')
  }, {
    title: `开${eNameT}${aName}二段蒸发`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
  }, {
    title: `${tName}开${eNameT}${aName}二段`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['二段伤害'], 'a')
  }, {
    title: `${tName}开${eNameT}${aName}二段蒸发`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
  }, {
    title: `${aName}三段伤害`,
    params: { e: true },
    dmg: ({ talent }, dmg) => {
      a3Dmg = dmg(talent.a['三段伤害'], 'a', 'phy')
      return a3Dmg
    }
  }, {
    title: `开${eNameT}${aName}三段`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['三段伤害'], 'a')
  }, {
    title: `开${eNameT}${aName}三段蒸发`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
  }, {
    title: `${tName}开${eNameT}${aName}三段`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['三段伤害'], 'a')
  }, {
    title: `${tName}开${eNameT}${aName}三段蒸发`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
  }, {
    title: `${aName}四段伤害`,
    params: { e: true },
    dmg: ({ talent }, dmg) => {
      a4Dmg = dmg(talent.a['四段伤害'], 'a', 'phy')
      return a4Dmg
    }
  }, {
    title: `开${eNameT}${aName}四段`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['四段伤害'], 'a')
  }, {
    title: `开${eNameT}${aName}四段蒸发`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['四段伤害'], 'a', 'vaporize')
  }, {
    title: `${tName}开${eNameT}${aName}四段`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['四段伤害'], 'a')
  }, {
    title: `${tName}开${eNameT}${aName}四段蒸发`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['四段伤害'], 'a', 'vaporize')
  }, {
    title: `${aName}五段伤害`,
    params: { e: true },
    dmg: ({ talent }, dmg) => {
      a5Dmg = dmg(talent.a['五段伤害'], 'a', 'phy')
      return a5Dmg
    }
  }, {
    title: `开${eNameT}${aName}五段`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['五段伤害'], 'a')
  }, {
    title: `开${eNameT}${aName}五段蒸发`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
  }, {
    title: `${tName}开${eNameT}${aName}五段`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['五段伤害'], 'a')
  }, {
    title: `${tName}开${eNameT}${aName}五段蒸发`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
  }, {
    title: `${a2Name}伤害`,
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
  }, {
    title: `${eNameT}后${a2Name}`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  }, {
    title: `${eNameT}后${a2Name}蒸发`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
  }, {
    title: `${tName}开${eNameT}${a2Name}`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2')
  }, {
    title: `${tName}开${eNameT}${a2Name}蒸发`,
    dmgKey: 'z',
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
  }, {
    title: `${a3Name}期间伤害`,
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
  }, {
    title: `低空${a3Name}伤害`,
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
  }, {
    title: `高空${a3Name}伤害`,
    dmgKey: 'c',
    params: { e: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
  }, {
    title: `无${eNameT}${eName}伤害`,
    params: { e: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['血梅香伤害'], 'e')
  }, {
    title: `无${eNameT}${eName}蒸发`,
    params: { e: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
  }, {
    title: `无${eNameT}${tName}${eName}伤害`,
    params: { hp: true, e: true },
    dmg: ({ talent, attr }, dmg) => {
      e1Dmg = dmg(talent.e['血梅香伤害'], 'e')
      return e1Dmg
    }
  }, {
    title: `无${eNameT}${tName}${eName}伤害`,
    params: { hp: true, e: true },
    dmg: ({ talent, attr }, dmg) => {
      e2Dmg = dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
      return e2Dmg
    }
  }, {
    title: `${eName}伤害`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['血梅香伤害'], 'e')
  }, {
    title: `${eName}蒸发`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
  }, {
    title: `${tName}${eName}伤害`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['血梅香伤害'], 'e')
  }, {
    title: `${tName}${eName}蒸发`,
    dmgKey: 'e',
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
  }, {
    title: `${qName}伤害`,
    params: { e: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: `${qName}蒸发`,
    params: { e: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
  }, {
    title: `${tName}${qName}`,
    params: { hp: true, e: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q')
  }, {
    title: `${tName}${qName}蒸发`,
    params: { hp: true, e: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
  }, {
    title: `${eNameT}后${qName}`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: `${eNameT}后${qName}蒸发`,
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
  }, {
    title: `${tName}开${eNameT}后${qNameT}`,
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q')
  }, {
    title: `${tName}开${eNameT}后${qNameT}蒸发`,
    dmgKey: 'q',
    params: { hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
  }, {
    title: `${qName}治疗`,
    dmg: ({ talent, calc, attr, cons }, { heal }) => heal(calc(attr.hp) * talent.q['技能治疗量'] / 100)
  }, {
    title: `${tName}${qName}治疗`,
    dmgKey: 'h',
    params: { hp: true },
    dmg: ({ talent, calc, attr, cons }, { heal }) => heal(calc(attr.hp) * talent.q['低血量时技能治疗量'] / 100)
  }, {
    title: '单人站场16秒',
    params: { hp: true },
    dmg: ({ talent, cons }, dmg) => {
      let q = dmg(talent.q['技能伤害'], 'q')
      let z1 = dmg(talent.a['重击伤害'], 'a2')
      let e1 = dmg(talent.e['血梅香伤害'], 'e')
      let cons2 = cons * 1 >= 2 ? 1 : 0
      let e2 = e1Dmg
      let a1 = a1Dmg
      let a2 = a2Dmg
      let a3 = a3Dmg
      let a4 = a4Dmg
      let a5 = a5Dmg
      return {
        dmg: q.dmg + cons2 * 2 * e2.dmg + 2 * e1.dmg + 7 * z1.dmg + 2 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg),
        avg: q.avg + cons2 * 2 * e1.avg + 2 * e1.avg + 7 * z1.avg + 2 * (a1.avg + a2.avg + a3.avg + a4.avg + a5.avg)
      }
    }
  }, {
    title: '单人站场16秒蒸发',
    dmgKey: 'dph',
    params: { hp: true },
    dmg: ({ talent, cons }, dmg) => {
      let q = dmg(talent.q['技能伤害'], 'q', 'vaporize')
      let z1 = dmg(talent.a['重击伤害'], 'a2', 'vaporize')
      let e1 = dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
      let cons2 = cons * 1 >= 2 ? 1 : 0
      let e2 = e2Dmg
      let a1 = a1Dmg
      let a2 = a2Dmg
      let a3 = a3Dmg
      let a4 = a4Dmg
      let a5 = a5Dmg
      return {
        dmg: q.dmg + cons2 * 2 * e1.dmg + 2 * e1.dmg + 7 * z1.dmg + 2 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg),
        avg: q.avg + cons2 * 2 * e1.avg + 2 * e1.avg + 7 * z1.avg + 2 * (a1.avg + a2.avg + a3.avg + a4.avg + a5.avg)
      }
    }
  }, {
    title: '单人循环流畅度',
    dmg: ({ talent, calc, attr, weapon, cons }) => {
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (weapon.name === '天空之脊') weaponconsn = 1

      return {
        avg: Format.percent((calc(attr.recharge) / 100 * (2.5 * 2 * 3 + weaponn + energy)) / (60 - weaponnn - (0.2073 * (10 + weaponconsn)))),
        type: 'text'
      }
    }
  }, {
    title: '单人站场期望DPS',
    params: { hp: true },
    dmg: ({ talent, calc, attr, weapon, cons }, dmg) => {
      let q = dmg(talent.q['技能伤害'], 'q')
      let z1 = dmg(talent.a['重击伤害'], 'a2')
      let e1 = dmg(talent.e['血梅香伤害'], 'e')
      let cons2 = cons * 1 >= 2 ? 1 : 0
      let e2 = e1Dmg
      let a1 = a1Dmg
      let a2 = a2Dmg
      let a3 = a3Dmg
      let a4 = a4Dmg
      let a5 = a5Dmg
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (weapon.name === '天空之脊') weaponconsn = 1

      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (2.5 * 2 * 3 + weaponn + energy)) / (60 - weaponnn - (0.2073 * (10 + weaponconsn))))
      return {
        dmg: (qcn * (q.dmg + cons2 * 2 * e2.dmg) + 2 * e1.dmg + 7 * z1.dmg + 2 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg)) / 16,
        avg: (qcn * (q.avg + cons2 * 2 * e2.avg) + 2 * e1.avg + 7 * z1.avg + 2 * (a1.avg + a2.avg + a3.avg + a4.avg + a5.avg)) / 16
      }
    }
  }, {
    title: '单人站场期望DPS蒸发',
    dmgKey: 'dps',
    params: { hp: true },
    dmg: ({ talent, calc, attr, weapon, cons }, dmg) => {
      let q = dmg(talent.q['技能伤害'], 'q', 'vaporize')
      let z1 = dmg(talent.a['重击伤害'], 'a2', 'vaporize')
      let e1 = dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
      let cons2 = cons * 1 >= 2 ? 1 : 0
      let e2 = e2Dmg
      let a1 = a1Dmg
      let a2 = a2Dmg
      let a3 = a3Dmg
      let a4 = a4Dmg
      let a5 = a5Dmg
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (weapon.name === '天空之脊') weaponconsn = 1

      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (2.5 * 2 * 3 + weaponn + energy)) / (60 - weaponnn - (0.2073 * (10 + weaponconsn))))
      return {
        dmg: (qcn * (q.dmg + cons2 * 2 * e2.dmg) + 2 * e1.dmg + 7 * z1.dmg + 2 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg)) / 16,
        avg: (qcn * (q.avg + cons2 * 2 * e2.avg) + 2 * e1.avg + 7 * z1.avg + 2 * (a1.avg + a2.avg + a3.avg + a4.avg + a5.avg)) / 16
      }
    }
  }, {
    title: `胡行夜钟 ${aName}一段蒸发`,
    params: { teamA: true, hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
  }, {
    title: `胡行夜钟 ${a2Name}蒸发`,
    params: { teamA: true, hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
  }, {
    title: `胡行夜钟 ${qNameT}蒸发`,
    params: { teamA: true, hp: true },
    dmg: ({ talent, attr }, dmg) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
  }
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    check: ({ params }) => params.e !== true,
    title: '胡桃技能：[蝶引来生] 消耗一部分生命值,击退周围敌人,基于进入该状态时胡桃的生命值上限,提高胡桃[atkPlus]点攻击力',
    sort: 9,
    data: {
      atkPlus: ({ talent, attr, calc }) => {
        return Math.min(talent.e['攻击力提高'] * calc(attr.hp) / 100, attr.atk.base * 4)
      }
    }
  }, {
    check: ({ params }) => params.hp === true,
    title: '胡桃天赋：[血之灶火] 胡桃的生命值低于或等于50%时,获得[dmg]%火元素伤害加成',
    data: {
      dmg: 33
    }
  }, {
    title: '胡桃1命：[赤团开时斜飞去] 处于蝶引来生施加的彼岸蝶舞状态下时,胡桃的重击体力消耗减少[_a2Stamina]% ',
    cons: 1,
    data: {
      _a2Stamina: 100
    }
  }, {
    title: '胡桃2命：[最不安神晴又复雨] 血梅香造成的伤害提高[ePlus]点,安神秘法会为命中的敌人施加血梅香效果',
    cons: 2,
    sort: 9,
    data: {
      ePlus: ({ attr, calc }) => calc(attr.hp) * 0.1
    }
  }, {
    title: '胡桃6命：[幽蝶能留一缕芳] 胡桃的生命值降至25%以下,或承受足以使她倒下的伤害时胡桃的所有元素抗性和物理抗性提高[_res]%,暴击率提高[_cpct]%,并提高[_interruption]%抗打断能力 { 此效果不会参与伤害计算 }',
    cons: 6,
    data: {
      _interruption: 100,
      _cpct: 100,
      _res: 200
    }
  }, {
    title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在期间，能使队伍中自己的当前场上角色造成的伤害提高至多[dmg]%',
    check: ({ params }) => params.teamA === true,
    data: {
      dmg: 50
    }
  }, {
    title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,至多获得[hpPct]%生命值上限',
    check: ({ params }) => params.teamA === true,
    sort: 1,
    cons: 4,
    data: {
      hpPct: 40
    }
  }, {
    title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
    check: ({ params }) => params.teamA === true,
    data: {
      kx: 20
    }
  }, {
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    check: ({ params }) => params.teamA === true,
    data: {
      hpPct: 25
    }
  },
  'vaporize',
  { title: `2.28最后修改：[11.6重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs46ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}` }
]
