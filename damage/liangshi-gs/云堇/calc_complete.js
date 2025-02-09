import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let aeDmg = { dmg: 0, avg: 0 }
let a1Dmg = { dmg: 0, avg: 0 }
let a2Dmg = { dmg: 0, avg: 0 }
let a3Dmg = { dmg: 0, avg: 0 }
let a4Dmg = { dmg: 0, avg: 0 }
let a5Dmg = { dmg: 0, avg: 0 }

export const details = [
  {
    title: '普通攻击一段伤害',
    params: { aDMG: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  }, {
    title: '无Q普通攻击一段',
    dmg: ({ talent }, dmg) => {
      a1Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
      return a1Dmg
    }
  }, {
    title: '普通攻击二段伤害',
    params: { aDMG: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  }, {
    title: '无Q普通攻击二段',
    dmg: ({ talent }, dmg) => {
      a2Dmg = dmg(talent.a['二段伤害'], 'a', 'phy')
      return a2Dmg
    }
  }, {
    title: '普通攻击三段伤害',
    params: { aDMG: true },
    dmg: ({ talent }, dmg) => {
      let a3 = dmg(talent.a['三段伤害'] / 2, 'a', 'phy')
      return {
        dmg: a3.dmg * 2,
        avg: a3.avg * 2
      }
    }
  }, {
    title: '无Q普通攻击三段',
    dmg: ({ talent }, dmg) => {
      let a3 = dmg(talent.a['三段伤害'] / 2, 'a', 'phy')
      a3Dmg = { dmg: a3.dmg * 2, avg: a3.avg * 2 }
      return a3Dmg
    }
  }, {
    title: '普通攻击四段伤害',
    params: { aDMG: true },
    dmg: ({ talent }, dmg) => {
      let a4 = dmg(talent.a['四段伤害'] / 2, 'a', 'phy')
      return {
        dmg: a4.dmg * 2,
        avg: a4.avg * 2
      }
    }
  }, {
    title: '无Q普通攻击四段',
    dmg: ({ talent }, dmg) => {
      let a4 = dmg(talent.a['四段伤害'] / 2, 'a', 'phy')
      a4Dmg = { dmg: a4.dmg * 2, avg: a4.avg * 2 }
      return a4Dmg
    }
  }, {
    title: '普通攻击五段伤害',
    params: { aDMG: true },
    dmg: ({ talent }, dmg) => dmg(talent.a['五段伤害'], 'a', 'phy')
  }, {
    title: '无Q普通攻击五段',
    dmg: ({ talent }, dmg) => {
      a5Dmg = dmg(talent.a['五段伤害'], 'a', 'phy')
      return a5Dmg
    }
  }, {
    title: '重击伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
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
    title: '旋云开相点按伤害',
    params: { ecd: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let ret = talent.e['点按伤害'] * calc(attr.def) / 100
      return basic(ret, 'e')
    }
  }, {
    title: '旋云开相一段伤害',
    params: { ecd: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let ret = talent.e['一段蓄力伤害'] * calc(attr.def) / 100
      return basic(ret, 'e')
    }
  }, {
    title: '旋云开相二段伤害',
    params: { ecd: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let ret = talent.e['二段蓄力伤害'] * calc(attr.def) / 100
      return basic(ret, 'e')
    }
  }, {
    title: '长E护盾吸收量',
    params: { ecd: true },
    dmg: ({ talent, calc, attr }, { shield }) =>
      shield((talent.e['护盾吸收量2'][0] * calc(attr.def) / 100 + talent.e['护盾吸收量2'][1] * 1) * 1.5)
  }, {
    title: '破嶂见旌仪展开伤害',
    dmg: ({ talent, attr, calc }, { basic }) => {
      let ret = talent.q['技能伤害'] * calc(attr.def) / 100
      return basic(ret, 'q')
    }
  }, {
    title: '4人Q提供普攻基础伤害',
    dmgKey: 'q',
    params: { qjichu: true },
    dmg: ({ talent, attr, calc }) => {
      return {
        avg: (talent.q['伤害值提升'] / 100 + 0.115) * calc(attr.def)
      }
    }
  }, {
    title: 'Q提供自身普攻最终伤害',
    params: { aDMG: true },
    dmg: ({}, dmg) => {
      aeDmg = dmg(0, 'a', 'phy')
      return aeDmg
    }
  }, {
    title: '单人站场16秒',
    params: { ecd: true, dps: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let a1 = a1Dmg
      let a2 = a2Dmg
      let a3 = a3Dmg
      let a4 = a4Dmg
      let a5 = a5Dmg
      let aew = aeDmg
      let e = basic(talent.e['二段蓄力伤害'] * calc(attr.def) / 100, 'e')
      let q = basic(talent.q['技能伤害'] * calc(attr.def) / 100, 'q')
      let cons1 = cons * 1 >= 1 ? 2 : 1
      let cons6 = cons * 1 >= 6 ? 1 : 0
      return {
        dmg: (a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg) * 4 + q.dmg + e.dmg * cons1 + aew.dmg * 23 + cons6 * (a1.dmg + a2.dmg + aew.dmg * 2),
        avg: (a1.avg + a2.avg + a3.avg + a4.avg + a5.avg) * 4 + q.avg + e.avg * cons1 + aew.avg * 23 + cons6 * (a1.avg + a2.avg + aew.avg * 2)
      }
    }
  }, {
    title: '单人循环流畅度',
    dmg: ({ talent, calc, attr, weapon, cons }) => {
      let weaponn = 0
      let consn = 0
      let consnn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (cons >= 1) consn = 2

      if (cons >= 6) consnn = 2

      if (weapon.name === '天空之脊') weaponconsn = 2

      return {
        avg: Format.percent((calc(attr.recharge) / 100 * (3 * 3 * consn + weaponn)) / (60 - weaponnn - (0.2073 * (20 + consnn + weaponconsn)))),
        type: 'text'
      }
    }
  }, {
    title: '单人站场期望DPS',
    params: { ecd: true, dps: true },
    dmg: ({ talent, calc, attr, weapon, cons }, { basic }) => {
      let a1 = a1Dmg
      let a2 = a2Dmg
      let a3 = a3Dmg
      let a4 = a4Dmg
      let a5 = a5Dmg
      let aew = aeDmg
      let e = basic(talent.e['二段蓄力伤害'] * calc(attr.def) / 100, 'e')
      let q = basic(talent.q['技能伤害'] * calc(attr.def) / 100, 'q')
      let cons1 = cons * 1 >= 1 ? 2 : 1
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let weaponn = 0
      let consn = 0
      let consnn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (cons >= 1) consn = 2

      if (cons >= 6) consnn = 2

      if (weapon.name === '天空之脊') weaponconsn = 2

      let qcn = Math.min(1, ((calc(attr.recharge) / 100 * (3 * 3 * consn + weaponn)) / (60 - weaponnn - (0.2073 * (20 + consnn + weaponconsn)))))
      return {
        dmg: ((a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg) * 4 + e.dmg * cons1 + cons6 * (a1.dmg + a2.dmg) + (q.dmg + aew.dmg * 23 + cons6 * aew.dmg * 2) * qcn) / 16,
        avg: ((a1.avg + a2.avg + a3.avg + a4.avg + a5.avg) * 4 + e.avg * cons1 + cons6 * (a1.avg + a2.avg) + (q.avg + aew.avg * 23 + cons6 * aew.avg * 2) * qcn) / 16
      }
    }
  }, {
    title: '云阿五诺 E二段',
    params: { ecd: true, teamA: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let ret = talent.e['二段蓄力伤害'] * calc(attr.def) / 100
      return basic(ret, 'e')
    }
  }, {
    title: '云阿五诺 Q展开伤害',
    params: { teamA: true },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let ret = talent.q['技能伤害'] * calc(attr.def) / 100
      return basic(ret, 'q')
    }
  }, {
    title: '云阿五诺 Q提升伤害',
    params: { teamA: true },
    dmg: ({ talent, attr, calc }) => {
      return {
        avg: (talent.q['伤害值提升'] / 100 + 0.025) * calc(attr.def)
      }
    }
  }
]

export const defDmgKey = 'q'
export const mainAttr = 'atk,def,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    check: ({ params }) => params.qjichu === true,
    title: '云堇天赋：[莫从恒蹊] 队伍存在4元素类型角色时，「飞云旗阵」提供的普通攻击伤害提高[_q]点',
    data: {
      _q: ({ attr, calc }) => {
        return calc(attr.def) * 0.115
      }
    }
  }, {
    check: ({ params }) => params.aDMG === true,
    title: '云堇技能：[破嶂见旌仪] 对敌人造成普通攻击伤害时，造成的伤害提高[aPlus]',
    sort: 9,
    data: {
      aPlus: ({ talent, calc, attr }) => (talent.q['伤害值提升'] + 2.5) * calc(attr.def) / 100
    }
  }, {
    check: ({ params }) => params.ecd === true,
    title: '云堇1命：[飞身趟马] 旋云开相的冷却时间减少[_eCd]%',
    cons: 1,
    data: {
      _eCd: 15
    }
  }, {
    check: ({ params }) => params.aDMG === true,
    title: '云堇2命：[诸般切末] 施放破嶂见旌仪后，附近队伍中所有角色普通攻击造成的伤害提高[aDmg]%',
    cons: 2,
    data: {
      aDmg: 15
    }
  }, {
    title: '云堇4命：[昇堂吊云] 触发结晶反应后，防御力提升[def]%',
    sort: 1,
    cons: 4,
    data: {
      def: 20
    }
  }, {
    check: ({ params }) => params.dps === true,
    title: '云堇6命：[庄谐并举] 处于「飞云旗阵」状态下普通攻击的攻击速度提升[_aSpeed]%',
    cons: 6,
    data: {
      _aSpeed: 12
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '阿贝多天赋：[瓶中人的天慧] 释放诞生式·大地之潮时,使附近的队伍中角色的元素精通提高[mastery]点',
    sort: 1,
    data: {
      mastery: 125
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '五郎天赋：[不畏风雨] 施放兽牙逐突形胜战法后附近的队伍中所有角色的防御力提升[def]%',
    sort: 1,
    data: {
      def: 25
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '五郎技能：[犬坂吠吠方圆阵] 领域内的当前场上角色防御力提升[defPlus]点,岩元素伤害加成提升[dmg]%,抗打断能力提升[_interruption]%',
    sort: 1,
    data: {
      defPlus: 438,
      dmg: 15,
      _interruption: 50
    }
  }, {
    check: ({ params, cons }) => cons >= 6 && params.teamA === true,
    title: '五郎6命：[犬勇•忠如山] 施放犬坂吠吠方圆阵或兽牙逐突形胜战法后提高附近的队伍中所有角色[eCdmg]%岩元素暴击伤害',
    data: {
      eCdmg: 40,
      qCdmg: 40
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '元素共鸣：[坚定之岩] 护盾强效提升[shield]%，造成的伤害提升[dmg]%，降低敌人[kx]%岩元素抗性',
    data: {
      shield: 25,
      dmg: 15,
      kx: 20
    }
  },
  { title: '2.21最后修改：[10.22重置] 修复伤害值提升类buff重复计算的问题' }
]

/**
 * 这里放的是历史更新日志
 * {title: '1.29最后修改：[10.22重置] 修复部分情况下部分计算Nan的问题'}
 * {title: '12.10最后修改：[10.22重置] 修正多段类普攻无法多次获取伤害值提升类buff的问题'}
 */
