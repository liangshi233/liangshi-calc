import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let eDmg = { dmg: 0, avg: 0 }
let qDmg = { dmg: 0, avg: 0 }

export const details = [
  {
    title: '普攻一段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  }, {
    title: '普攻二段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  }, {
    title: '普攻三段伤害',
    dmg: ({ talent }, dmg) => {
      let a3 = dmg(talent.a['三段伤害'] / 2, 'a', 'phy')
      return {
        dmg: a3.dmg * 2,
        avg: a3.avg * 2
      }
    }
  }, {
    title: '普攻四段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
  }, {
    title: '重击循环伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'phy')
  }, {
    title: '重击终结伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'phy')
  }, {
    title: '下落期间伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
  }, {
    title: '低空下落伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
  }, {
    title: '高空下落伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
  }, {
    title: '风隐急进基础伤害',
    dmg: ({ talent }, dmg) => {
      eDmg = dmg(talent.e['风风轮伤害'], 'e')
      return eDmg
    }
  }, {
    title: '风隐急进点按伤害',
    params: { con2d: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['风风轮舞踢点按伤害'], 'e')
  }, {
    title: '风隐急进结束伤害',
    params: { con2: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['风风轮舞踢长按伤害'], 'e')
  }, {
    title: '影貉缭乱发动伤害',
    dmg: ({ talent }, dmg) => {
      qDmg = dmg(talent.q['技能发动伤害'], 'q')
      return qDmg
    }
  }, {
    title: '影貉缭乱发动治疗',
    dmg: ({ talent, calc, attr }, { heal }) =>
      heal(talent.q['技能发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['技能发动治疗量2'][1] * 1)
  }, {
    title: '不倒貉貉每跳伤害',
    params: { con6: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['不倒貉貉伤害'], 'q')
  }, {
    title: '不倒貉貉每跳治疗',
    params: { con6: true },
    dmg: ({ attr, calc, talent, cons }, { heal }) => {
      let num = talent.q['不倒貉貉治疗量2'][0] * calc(attr.atk) / 100 + talent.q['不倒貉貉治疗量2'][1] * 1
      if (cons * 1 === 6) {
        num += Math.min(calc(attr.mastery) * 3, 6000)
      }
      return heal(num)
    }
  }, {
    title: '天赋扩散治疗',
    dmg: ({ calc, attr }, { heal }) =>
      heal(calc(attr.mastery) * 1.2 + 300)
  }, {
    title: '单人站场22秒伤害',
    params: { con2: true, con6: true },
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let a3 = dmg(talent.a['三段伤害'] / 2, 'a', 'phy')
      let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let e1 = eDmg
      let e2 = dmg(talent.e['风风轮舞踢长按伤害'], 'e')
      let q1 = qDmg
      let q2 = dmg(talent.q['不倒貉貉伤害'], 'q')
      return {
        dmg: a1.dmg * 2 + a2.dmg * 2 + a3.dmg * 2 * 2 + a4.dmg + e1.dmg * 19 + e2.dmg + q1.dmg + q2.dmg * 7,
        avg: a1.avg * 2 + a2.avg * 2 + a3.avg * 2 * 2 + a4.avg + e1.avg * 19 + e2.avg + q1.avg + q2.avg * 7
      }
    }
  }, {
    title: '单人站场22秒治疗',
    params: { con6: true },
    dmg: ({ attr, calc, talent, cons }, { heal }) => {
      let q1 = talent.q['技能发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['技能发动治疗量2'][1] * 1
      let q2 = talent.q['不倒貉貉治疗量2'][0] * calc(attr.atk) / 100 + talent.q['不倒貉貉治疗量2'][1] * 1
      let tf = calc(attr.mastery) * 1.2 + 300
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let qmz = Math.min(calc(attr.mastery) * 3, 6000)
      let zl = tf * 11 + q1 + q2 * 7 + qmz * cons6 * 7
      return heal(zl)
    }
  }, {
    title: '单人循环流畅度',
    dmg: ({ talent, calc, attr, weapon, cons }) => {
      let weaponn = 0
      let consn = 0
      let weaponnn = 0

      if (weapon.name === '便携动力锯') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '桂木斩长正') weaponnn = (2.5 + weapon.affix * 0.5) * 3 * 2 - 3

      if (weapon.name === '西风大剑') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼大剑') weaponn = 2 * 3

      if (cons >= 4) consn = 1.2 * 11

      return {
        avg: Format.percent((calc(attr.recharge) / 100 * (6 * 3 + weaponn)) / (80 - consn - weaponnn - (0.2732 * 7))),
        type: 'text'
      }
    }
  }, {
    title: '单人站场期望DPS',
    params: { con2: true, con6: true },
    dmg: ({ attr, calc, talent, weapon, cons }, dmg) => {
      let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let a3 = dmg(talent.a['三段伤害'] / 2, 'a', 'phy')
      let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let e1 = eDmg
      let e2 = dmg(talent.e['风风轮舞踢长按伤害'], 'e')
      let q1 = qDmg
      let q2 = dmg(talent.q['不倒貉貉伤害'], 'q')
      let weaponn = 0
      let consn = 0
      let weaponnn = 0

      if (weapon.name === '便携动力锯') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '桂木斩长正') weaponnn = (2.5 + weapon.affix * 0.5) * 3 * 2 - 3

      if (weapon.name === '西风大剑') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼大剑') weaponn = 2 * 3

      if (cons >= 4) consn = 1.2 * 11

      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (6 * 3 + weaponn)) / (80 - consn - weaponnn - (0.2732 * 7)))
      return {
        dmg: (a1.dmg * 2 + a2.dmg * 2 + a3.dmg * 2 * 2 + a4.dmg + e1.dmg * 19 + e2.dmg + (q1.dmg + q2.dmg * 7) * qcn) / 22,
        avg: (a1.avg * 2 + a2.avg * 2 + a3.avg * 2 * 2 + a4.avg + e1.avg * 19 + e2.avg + (q1.avg + q2.avg * 7) * qcn) / 22
      }
    }
  }, {
    title: '单人站场期望HPS',
    dmgKey: 'hps',
    params: { con6: true },
    dmg: ({ attr, calc, talent, weapon, cons }, { heal }) => {
      let q1 = talent.q['技能发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['技能发动治疗量2'][1] * 1
      let q2 = talent.q['不倒貉貉治疗量2'][0] * calc(attr.atk) / 100 + talent.q['不倒貉貉治疗量2'][1] * 1
      let tf = calc(attr.mastery) * 1.2 + 300
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let qmz = Math.min(calc(attr.mastery) * 3, 6000)
      let weaponn = 0
      let consn = 0
      let weaponnn = 0

      if (weapon.name === '便携动力锯') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '桂木斩长正') weaponnn = (2.5 + weapon.affix * 0.5) * 3 * 2 - 3

      if (weapon.name === '西风大剑') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼大剑') weaponn = 2 * 3

      if (cons >= 4) consn = 1.2 * 11

      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (6 * 3 + weaponn)) / (80 - consn - weaponnn - (0.2732 * 7)))
      let zl = (tf * 5 + (q1 + q2 * 7 + qmz * cons6 * 7 + tf * 6) * qcn) / 22
      return heal(zl)
    }
  }, {
    title: '扩散反应伤害',
    dmg: ({}, { reaction }) => reaction('swirl')
  }, {
    title: '泥头车 长E伤害',
    params: { con2: true, teamA: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['风风轮舞踢长按伤害'], 'e')
  }, {
    title: '泥头车 Q每跳伤害',
    params: { con6: true, teamA: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['不倒貉貉伤害'], 'q')
  }, {
    title: '泥头车 Q每跳治疗',
    params: { con6: true, teamA: true },
    dmg: ({ attr, calc, talent, cons }, { heal }) => {
      let numn = talent.q['不倒貉貉治疗量2'][0] * calc(attr.atk) / 100 + talent.q['不倒貉貉治疗量2'][1] * 1
      if (cons * 1 === 6) {
        numn += Math.min(calc(attr.mastery) * 3, 6000)
      }
      return heal(numn)
    }
  }
]

export const defDmgKey = 'hps'
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    check: ({ params }) => params.con2d === true,
    title: '早柚2命：[理清逃跑路线] 点按施放风风轮舞踢造成的伤害提高[eDmg]%',
    cons: 2,
    data: {
      eDmg: 3.3
    }
  }, {
    check: ({ params }) => params.con2 === true,
    title: '早柚2命：[理清逃跑路线] 长按施放风风轮舞踢造成的伤害提高[eDmg]%',
    cons: 2,
    data: {
      eDmg: 66
    }
  }, {
    title: '早柚4命：[偷懒的新方法] 在场上触发扩散反应时，将恢复[_energyevery]点元素能量',
    cons: 4,
    data: {
      _energyevery: 1.2
    }
  }, {
    check: ({ params }) => params.con6 === true,
    title: '早柚6命：[呼呼大睡时间] 基于精通提升Q[qPlus]点伤害,[_heal]治疗量',
    sort: 9,
    cons: 6,
    data: {
      qPlus: ({ attr, calc }) => Math.min(calc(attr.atk) * calc(attr.mastery) * 0.002, calc(attr.atk) * 4),
      _heal: ({ attr, calc }) => Math.min(calc(attr.mastery) * 3, 6000)
    }
  }, {
    check: ({ params, artis }) => params.teamA === true && artis.千岩牢固 !== 4,
    title: '久歧忍圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效果提升[shield]% { 该圣遗物效果不可叠加 }',
    sort: 1,
    data: {
      atkPct: 20,
      shield: 30
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '久歧忍武器：[圣显之钥-精1] 元素战技命中敌人3次后基于装备者的生命值上限为队伍中附近所有角色提供[mastery]点元素精通',
    sort: 5,
    data: {
      mastery: 92.3
    }
  }, {
    check: ({ params, artis }) => params.teamA === true && artis.昔日宗室之仪 !== 4,
    title: '凯亚圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]% { 该圣遗物效果不可叠加 }',
    sort: 1,
    data: {
      atkPct: 20
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '元素共鸣：[交织之护] 全元素与物理抗性提升[_res]%',
    data: {
      _res: 15
    }
  },
  'swirl',
  { title: '1.5最后修改：[10.21重置] 修复部分情况下部分计算Nan的问题' }
]

/**
 * 这里放的是历史更新日志
 * {title: '12.10最后修改：[10.21重置] 修正多段类普攻无法多次获取伤害值提升类buff的问题'}
 */
