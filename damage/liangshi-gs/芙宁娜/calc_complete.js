import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let a0Dmg = { dmg: 0, avg: 0 }
let a1Dmg = { dmg: 0, avg: 0 }
let a2Dmg = { dmg: 0, avg: 0 }
let a3Dmg = { dmg: 0, avg: 0 }
let a4Dmg = { dmg: 0, avg: 0 }
let a11Dmg = { dmg: 0, avg: 0 }
let a21Dmg = { dmg: 0, avg: 0 }
let a31Dmg = { dmg: 0, avg: 0 }
let a41Dmg = { dmg: 0, avg: 0 }
let a5Dmg = { dmg: 0, avg: 0 }
let e1Dmg = { dmg: 0, avg: 0 }
let q1Dmg = { dmg: 0, avg: 0 }

export const details = [
  {
    title: '普通攻击一段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  }, {
    title: '普通攻击二段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  }, {
    title: '普通攻击三段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
  }, {
    title: '普通攻击四段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
  }, {
    title: '重击伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
  }, {
    title: 'Q后重击期望伤害',
    params: { smz: 25.4 },
    dmg: ({ talent }, dmg) => {
      a1Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
      a2Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
      a3Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
      a4Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
      a11Dmg = dmg(talent.a['一段伤害'], 'a')
      a21Dmg = dmg(talent.a['二段伤害'], 'a')
      a31Dmg = dmg(talent.a['三段伤害'], 'a')
      a41Dmg = dmg(talent.a['四段伤害'], 'a')
      a5Dmg = dmg(talent.a['重击伤害'], 'a2', 'phy')
      return a5Dmg
    }
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
    check: ({ cons }) => cons >= 6,
    title: '6命普攻伤害提升-荒',
    params: { cons6: true, jsl: 0 },
    dmg: ({ attr, calc }, { basic }) => basic(0, 'a')
  }, {
    check: ({ cons }) => cons >= 6,
    title: '6命普攻伤害提升期望-荒',
    params: { cons6: true, jsl: 0, smz: 13.7 },
    dmg: ({ attr, calc }, { basic }) => {
      a0Dmg = basic(0, 'a')
      return a0Dmg
    }
  }, {
    check: ({ cons }) => cons >= 6,
    title: '6命普攻伤害提升-芒',
    params: { cons6: true, jsl: 1 },
    dmg: ({ attr, calc }, { basic }) => basic(0, 'a')
  }, {
    check: ({ cons }) => cons >= 6,
    title: '6命普攻伤害提升期望-芒',
    params: { cons6: true, jsl: 1, smz: 13.7 },
    dmg: ({ attr, calc }, { basic }) => basic(0, 'a')
  }, {
    check: ({ cons }) => cons >= 6,
    title: '6命普攻治疗量-荒',
    params: { cons6: true, jsl: 0 },
    dmg: ({ attr, calc }, { heal }) => heal(calc(attr.hp) * 4 / 100)
  }, {
    check: ({ cons }) => cons >= 6,
    title: 'E后普攻六段-荒',
    params: { cons6: true, jsl: 0 },
    dmg: ({ talent }, dmg) => {
      let t1 = dmg(talent.a['一段伤害'], 'a')
      let t2 = dmg(talent.a['二段伤害'], 'a')
      let t3 = dmg(talent.a['三段伤害'], 'a')
      let t4 = dmg(talent.a['四段伤害'], 'a')
      return {
        dmg: t1.dmg * 2 + t2.dmg * 2 + t3.dmg + t4.dmg,
        avg: t1.avg * 2 + t2.avg * 2 + t3.avg + t4.avg
      }
    }
  }, {
    check: ({ cons }) => cons >= 6,
    title: 'E后普攻六段-芒',
    params: { cons6: true, jsl: 1 },
    dmg: ({ talent }, dmg) => {
      let t1 = dmg(talent.a['一段伤害'], 'a')
      let t2 = dmg(talent.a['二段伤害'], 'a')
      let t3 = dmg(talent.a['三段伤害'], 'a')
      let t4 = dmg(talent.a['四段伤害'], 'a')
      return {
        dmg: t1.dmg * 2 + t2.dmg * 2 + t3.dmg + t4.dmg,
        avg: t1.avg * 2 + t2.avg * 2 + t3.avg + t4.avg
      }
    }
  }, {
    title: '众水的歌者治疗量',
    dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['众水的歌者治疗量2'][0] * calc(attr.hp) / 100 + talent.e['众水的歌者治疗量2'][1] * 1)
  }, {
    title: '众水的歌者总治疗',
    dmg: ({ talent, attr, calc }, { heal }) => heal((talent.e['众水的歌者治疗量2'][0] * calc(attr.hp) / 100 + talent.e['众水的歌者治疗量2'][1] * 1) * (14 + Math.floor(3 * (Math.min(40, calc(attr.hp) / 1000) / 40))))
  }, {
    title: '众水的歌者Q后期望治疗',
    params: { smz: 64 },
    dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['众水的歌者治疗量2'][0] * calc(attr.hp) / 100 + talent.e['众水的歌者治疗量2'][1] * 1)
  }, {
    title: '众水的歌者Q后极限治疗',
    params: { smz: 300, qfz: 400 },
    dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['众水的歌者治疗量2'][0] * calc(attr.hp) / 100 + talent.e['众水的歌者治疗量2'][1] * 1)
  }, {
    title: '荒性泡沫伤害',
    dmg: ({ talent, attr, calc }, { basic }) => {
      e1Dmg = basic(calc(attr.hp) * talent.e['荒性泡沫伤害'] / 100, 'e')
      return e1Dmg
    }
  }, {
    title: '单人海薇玛夫人伤害',
    params: { e: 10 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.1, 'e')
  }, {
    title: '四人海薇玛夫人伤害',
    params: { e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
  }, {
    title: '单人海薇玛夫人期望伤害',
    params: { smz: 25.4, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
  }, {
    title: '四人海薇玛夫人期望伤害',
    params: { smz: 101.6, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
  }, {
    title: '四人海薇玛夫人极限伤害',
    params: { smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
  }, {
    title: '单人乌瑟勋爵伤害',
    params: { e: 10 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.1, 'e')
  }, {
    title: '四人乌瑟勋爵伤害',
    params: { e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e')
  }, {
    title: '单人乌瑟勋爵期望伤害',
    params: { smz: 25.4, e: 10 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.1, 'e')
  }, {
    title: '四人乌瑟勋爵期望伤害',
    params: { smz: 101.6, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e')
  }, {
    title: '四人乌瑟勋爵极限伤害',
    params: { smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e')
  }, {
    title: '单人谢贝蕾妲小姐伤害',
    params: { e: 10 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.1, 'e')
  }, {
    title: '四人谢贝蕾妲小姐伤害',
    params: { e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
  }, {
    title: '单人谢贝蕾妲小姐期望伤害',
    params: { smz: 25.4, e: 10 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
  }, {
    title: '四人谢贝蕾妲小姐期望伤害',
    params: { smz: 101.6, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
  }, {
    title: '四人谢贝蕾妲小姐极限伤害',
    params: { smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
  }, {
    title: '单人E完整伤害',
    params: { e: 10 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.1, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.1, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.1, 'e')
      return {
        dmg: e1.dmg * 17 + e2.dmg * 8 + e3.dmg * 6,
        avg: e1.avg * 17 + e2.avg * 8 + e3.avg * 6
      }
    }
  }, {
    title: '四人E完整伤害',
    params: { e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
      return {
        dmg: e1.dmg * 17 + e2.dmg * 8 + e3.dmg * 6,
        avg: e1.avg * 17 + e2.avg * 8 + e3.avg * 6
      }
    }
  }, {
    title: '单人E完整期望伤害',
    params: { smz: 25.4, e: 10 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.1, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.1, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.1, 'e')
      return {
        dmg: e1.dmg * 17 + e2.dmg * 8 + e3.dmg * 6,
        avg: e1.avg * 17 + e2.avg * 8 + e3.avg * 6
      }
    }
  }, {
    title: '四人E完整期望伤害',
    params: { smz: 101.6, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
      return {
        dmg: e1.dmg * 17 + e2.dmg * 8 + e3.dmg * 6,
        avg: e1.avg * 17 + e2.avg * 8 + e3.avg * 6
      }
    }
  }, {
    title: '四人E理论极限伤害',
    params: { smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => {
      let e1 = basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
      let e2 = basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
      return {
        dmg: e1.dmg * 17 + e2.dmg * 8 + e3.dmg * 6,
        avg: e1.avg * 17 + e2.avg * 8 + e3.avg * 6
      }
    }
  }, {
    title: '舞台展开伤害',
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      q1Dmg = basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
      return q1Dmg
    }
  }, {
    title: '单人循环流畅度',
    dmg: ({ talent, calc, attr, weapon, cons }) => {
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '船坞长剑') weaponnn = (1.5 + weapon.affix * 0.5) * 3

      if (weapon.name === '天目影打刀') weaponnn = 4.5 + weapon.affix * 1.5

      if (weapon.name === '西风剑') weaponn = 3 * 2 * 2

      if (cons >= 4) consn = 4 * 3

      if (weapon.name === '天空之刃') weaponconsn = 1

      return {
        avg: Format.percent((calc(attr.recharge) / 100 * (5 * 3 + weaponn)) / (60 - consn - weaponnn - (0.2212 * (20 + weaponconsn)))),
        type: 'text'
      }
    }
  }, {
    title: '单人站场15秒',
    dmgKey: 'sh',
    params: { smz: 25.4, e: 10 },
    dmg: ({ talent, cons, calc, attr }, { basic }) => {
      let a0 = a0Dmg
      let a1 = a1Dmg
      let a2 = a2Dmg
      let a3 = a3Dmg
      let a4 = a4Dmg
      let a11 = a11Dmg
      let a21 = a21Dmg
      let a31 = a31Dmg
      let a41 = a41Dmg
      let e1 = e1Dmg
      let e2 = basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.1, 'e')
      let e3 = basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.1, 'e')
      let e4 = basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.1, 'e')
      let q1 = q1Dmg
      let cons6 = cons * 1 >= 6 ? 1 : 0
      return {
        dmg: 5 * (a1.dmg + a2.dmg + a3.dmg + a4.dmg) + (e1.dmg + e2.dmg * 9 + e3.dmg * 5 + a4.dmg * 3) + q1.dmg + cons6 * (a0.dmg * 6 + a11.dmg * 2 + a21.dmg * 2 + a31.dmg + a41.dmg - a1.dmg * 2 - a2.dmg * 2 - a3.dmg - a4.dmg),
        avg: 5 * (a1.avg + a2.avg + a3.avg + a4.avg) + (e1.avg + e2.avg * 9 + e3.avg * 5 + a4.avg * 3) + q1.avg + cons6 * (a0.avg * 6 + a11.avg * 2 + a21.avg * 2 + a31.avg + a41.avg - a1.avg * 2 - a2.avg * 2 - a3.avg - a4.avg)
      }
    }
  }, {
    title: '心夜万芙 海薇玛夫人',
    params: { wan: true, teamA: true, smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e')
  }, {
    title: '心夜万芙 乌瑟勋爵',
    params: { wan: true, teamA: true, smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e')
  }, {
    title: '心夜万芙 谢贝蕾妲',
    params: { wan: true, teamA: true, smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e')
  }, {
    title: '心夜万芙 舞台展开',
    params: { wan: true, teamB: true, smz: 300, qfz: 400 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q')
  }, {
    title: '可万芙班 海薇玛夫人蒸发',
    params: { wan: true, teamB: true, smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['海薇玛夫人伤害'] / 100 * 1.4, 'e', 'vaporize')
  }, {
    title: '可万芙班 乌瑟勋爵蒸发',
    params: { wan: true, teamB: true, smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['乌瑟勋爵伤害'] / 100 * 1.4, 'e', 'vaporize')
  }, {
    title: '可万芙班 谢贝蕾妲蒸发',
    params: { wan: true, teamB: true, smz: 300, qfz: 400, e: 40 },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['谢贝蕾妲小姐伤害'] / 100 * 1.4, 'e', 'vaporize')
  }, {
    title: '可万芙班 舞台展开蒸发',
    params: { wan: true, teamB: true, smz: 300, qfz: 400 },
    dmg: ({ talent, attr, calc, cons }, { basic }) => basic(calc(attr.hp) * talent.q['技能伤害'] / 100, 'q', 'vaporize')
  }
]

export const defParams = { soda: 1 }
export const mainAttr = 'hp,cpct,cdmg'
export const defDmgKey = 'sh'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '芙宁娜天赋：[无人听的自白] 处于不同始基力属性下的芙宁娜的孤心沙龙获得增益效果,「沙龙成员」造成的伤害提升[eDmg]%,「众水的歌者」为周围的当前场上角色恢复生命值的间隔降低[_eSpeed]%',
    sort: 9,
    data: {
      eDmg: ({ calc, attr }) => Math.min(28, (calc(attr.hp)) / 1000 * 0.7),
      _eSpeed: ({ calc, attr }) => Math.min(16, (calc(attr.hp)) / 1000 * 0.4)
    }
  }, {
    check: ({ params }) => params.e !== undefined,
    title: '芙宁娜技能：[孤心沙龙] 「沙龙成员」进行攻击时,根据附近的队伍中生命值高于50%的角色数量,提升此次攻击造成的伤害为原本的1[_eDmg]%',
    data: {
      _eDmg: ({ params }) => params.e
    }
  }, {
    check: ({ params }) => params.smz !== undefined,
    title: '芙宁娜技能：[万众狂欢] 持有[buffCount]层「气氛值」,附近的队伍中所有角色造成的伤害提升[dmg]%,受治疗加成提升[healInc]%',
    data: {
      buffCount: ({ params, cons }) => Math.min(300 + (cons * 1 >= 1 ? 100 : 0), params.smz * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0)),
      dmg: ({ talent, params, cons }) => talent.q['气氛值转化提升伤害比例'] * Math.min(300 + (cons * 1 >= 1 ? 100 : 0), params.smz * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0)),
      phy: ({ talent, params, cons }) => talent.q['气氛值转化提升伤害比例'] * Math.min(300 + (cons * 1 >= 1 ? 100 : 0), params.smz * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0)),
      healInc: ({ talent, params, cons }) => talent.q['气氛值转化受治疗加成比例'] * Math.min(300 + (cons * 1 >= 1 ? 100 : 0), params.smz * (cons * 1 >= 2 ? 3.5 : 1) + (cons * 1 >= 1 ? 150 : 0))
    }
  }, {
    check: ({ params }) => params.smz >= 1,
    title: '芙宁娜1命：[爱是难驯鸟,哀乞亦无用.] 施放万众狂欢时，芙宁娜获得150点「气氛值」, 此外芙宁娜持有「气氛值」的上限提升100点.',
    cons: 1
  }, {
    check: ({ params }) => params.smz >= 1,
    title: '芙宁娜2命：[女人皆善变,仿若水中萍.] 通过队伍中附近角色的当前生命值提升或降低的方式获得的「气氛值」提升250%',
    cons: 2
  }, {
    check: ({ params }) => params.smz >= 71 && params.qfz !== undefined,
    title: '芙宁娜2命：[女人皆善变,仿若水中萍.] 基于「气氛值」超过上限[buffCount]层,使芙宁娜的生命值上限提升[hpPct]%',
    cons: 2,
    data: {
      buffCount: ({ params }) => params.qfz,
      hpPct: ({ params }) => Math.min(140, params.qfz * 0.35)
    }
  }, {
    title: '芙宁娜4命：[若非处幽冥,怎知生可贵！] 孤心沙龙的「沙龙成员」命中敌人,或「众水的歌者」为周围的当前场上角色恢复生命值时,芙宁娜获得[_energyevery]点元素能量',
    cons: 4,
    data: {
      _energyevery: 4
    }
  }, {
    title: '芙宁娜6命：[诸君听我颂，共举爱之杯！] 施放孤心沙龙时,芙宁娜的普通攻击、重击与下落攻击将转为无法被附魔覆盖的水元素伤害,且造成的伤害提升[aPlus]点',
    check: ({ params }) => params.cons6 === true && params.jsl !== undefined,
    sort: 9,
    cons: 6,
    data: {
      aPlus: ({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * params.jsl),
      a2Plus: ({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * params.jsl),
      a3Plus: ({ calc, attr, params }) => calc(attr.hp) * (0.18 + 0.25 * params.jsl)
    }
  }, {
    title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,至多获得[hpPct]%生命值上限',
    check: ({ params, cons }) => cons >= 4 && params.teamA === true,
    sort: 1,
    cons: 4,
    data: {
      hpPct: 40
    }
  }, {
    title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性  { 该圣遗物效果不可叠加 }',
    check: ({ params }) => params.wan === true,
    data: {
      kx: 40
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => (cons < 6 && cons > 1) && params.wan === true,
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => (cons < 6 && cons > 1) && params.wan === true && weapon.name !== '苍古自由之誓',
    sort: 1,
    data: {
      atkPct: 20
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => cons >= 6 && params.wan === true,
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => cons >= 6 && params.wan === true && weapon.name !== '苍古自由之誓',
    sort: 1,
    data: {
      atkPct: 40
    }
  }, {
    title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 2 && params.wan === true,
    sort: 1,
    data: {
      mastery: 200
    }
  }, {
    title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后枫原万叶会为队伍中所有角色提供[dmg]%对应元素伤害加成',
    check: ({ params }) => params.wan === true,
    data: {
      dmg: 40
    }
  }, {
    title: '班尼特技能：[美妙旅程] 处于鼓舞领域攻击力提升[atkPlus]点',
    check: ({ params }) => params.teamB === true,
    sort: 1,
    data: {
      atkPlus: 1202.35
    }
  }, {
    title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]% { 该圣遗物效果不可叠加 }',
    check: ({ params, artis }) => params.teamB === true && artis.昔日宗室之仪 !== 4,
    sort: 1,
    data: {
      atkPct: 20
    }
  }, {
    title: '可莉天赋：[火花无限] 可莉的重击造成暴击后，为队伍中所有角色恢复[_energyevery]点元素能量',
    check: ({ params }) => params.teamB === true,
    data: {
      _energyevery: 2
    }
  }, {
    title: '可莉2命：[破破弹片] 蹦蹦炸弹的诡雷会使敌人防御力降低[enemyDef]%',
    check: ({ params, cons }) => cons >= 2 && params.teamB === true,
    data: {
      enemyDef: 23
    }
  }, {
    title: '可莉6命：[火力全开] 在轰轰火花的状态下，每3秒会为队伍中所有角色恢复[_energyevery]点元素能量',
    check: ({ params, cons }) => cons >= 6 && params.teamB === true,
    data: {
      _energyevery: 3
    }
  }, {
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    check: ({ params }) => params.teamA === true,
    data: {
      hpPct: 25
    }
  }, {
    title: '元素共鸣：[热诚之火] 攻击力提高[atkPct]%',
    check: ({ params }) => params.teamB === true,
    sort: 1,
    data: {
      atkPct: 25
    }
  },
  'vaporize',
  { title: '1.5最后修改：[11.28重置] 修复部分情况下部分计算Nan的问题' }
]

/**
 * 这里放的是历史更新日志
 * {title: '12.30最后修改：[11.28重置] 修正天赋加成异常'}
 * {title: '12.16最后修改：[11.28重置] 略微优化E完整治疗条目,使其更加合理'}
 * {title: '12.14最后修改：[11.28重置] 为气氛值增加层数显示'}
 * {title: '12.7最后修改：[11.28重置] 修正元素爆发会受到气氛值加成的问题'}
*/
