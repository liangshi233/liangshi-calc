import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let c6Dmg = { dmg: 0, avg: 0 }
let c6jDmg = { dmg: 0, avg: 0 }

export const details = [
  {
    title: '普通攻击一段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
  }, {
    title: '普通攻击二段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
  }, {
    title: '普通攻击三段伤害',
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['三段伤害'] / 2, 'a', 'phy')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  }, {
    title: '普通攻击四段伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
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
    title: '白玉萝卜伤害',
    dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e')
  }, {
    title: '白玉萝卜-蔓激化',
    dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e', 'spread')
  }, {
    title: '白玉萝卜每跳治疗',
    dmg: ({ talent, calc, attr }, { heal }) =>
      heal(talent.e['白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.e['白玉萝卜治疗量2'][1])
  }, {
    title: '6命大萝卜伤害',
    cons: 6,
    dmg: ({ talent, calc, attr }, { basic }) => {
      c6Dmg = basic((calc(attr.atk) * 75 / 100), 'e')
      return c6Dmg
    }
  }, {
    title: '6命大萝卜激化',
    cons: 6,
    dmg: ({ talent, calc, attr }, { basic }) => {
      c6jDmg = basic((calc(attr.atk) * 75 / 100), 'e', 'spread')
      return c6jDmg
    }
  }, {
    title: '6命大萝卜治疗',
    cons: 6,
    dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * 7.5 / 100)
  }, {
    title: '月桂·抛掷型激化',
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let e1 = dmg(talent.e['白玉萝卜伤害'], 'e')
      let e2 = dmg(talent.e['白玉萝卜伤害'], 'e', 'spread')
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let ce1 = c6Dmg
      let ce2 = c6jDmg
      return {
        dmg: e2.dmg * 4 + e1.dmg * 6 + (ce2.dmg + ce1.dmg * 2) * cons6,
        avg: e2.avg * 4 + e1.avg * 6 + (ce2.avg + ce1.avg * 2) * cons6
      }
    }
  }, {
    title: '玉颗珊珊月中落伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
  }, {
    title: '桂子仙机白玉萝卜伤害',
    dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
  }, {
    title: '桂子仙机萝卜-蔓激化',
    dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q', 'spread')
  }, {
    title: '桂子仙机萝卜每跳治疗',
    dmg: ({ talent, calc, attr }, { heal }) =>
      heal(talent.q['桂子仙机白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.q['桂子仙机白玉萝卜治疗量2'][1])
  }, {
    title: 'Q总伤激化',
    dmg: ({ talent, calc, attr, cons }, dmg) => {
      let q1 = dmg(talent.q['技能伤害'], 'q', 'spread')
      let q2 = dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
      let q3 = dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q', 'spread')
      return {
        dmg: q1.dmg + q2.dmg * 8 + q3.dmg * 8,
        avg: q1.avg + q2.avg * 8 + q3.avg * 8
      }
    }
  }, {
    title: '萝卜炸裂天赋治疗',
    dmg: ({ talent, calc, attr }, { heal }) => heal(calc(attr.hp) * 0.8 / 100)
  }, {
    title: '草原核伤害',
    dmg: ({ calc, attr }, { reaction }) => {
      return reaction('bloom')
    }
  }, {
    title: '单人站场20秒伤害',
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
      let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let e1 = dmg(talent.e['白玉萝卜伤害'], 'e')
      let q1 = dmg(talent.q['技能伤害'], 'q')
      let q2 = dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let ce1 = c6Dmg
      return {
        dmg: a1.dmg * 5 + a2.dmg * 5 + a3.dmg * 4 + a4.dmg * 4 + e1.dmg * 10 + ce1.dmg * 3 * cons6 + q1.dmg + q2.dmg * 16,
        avg: a1.avg * 5 + a2.avg * 5 + a3.avg * 4 + a4.avg * 4 + e1.avg * 10 + ce1.avg * 3 * cons6 + q1.avg + q2.avg * 16
      }
    }
  }, {
    title: '单人站场20秒伤害激化',
    dmg: ({ talent, cons }, dmg) => {
      let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
      let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let e1 = dmg(talent.e['白玉萝卜伤害'], 'e')
      let e2 = dmg(talent.e['白玉萝卜伤害'], 'e', 'spread')
      let q1 = dmg(talent.q['技能伤害'], 'q', 'spread')
      let q2 = dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
      let q3 = dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q', 'spread')
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let ce1 = c6Dmg
      let ce2 = c6jDmg
      return {
        dmg: a1.dmg * 5 + a2.dmg * 5 + a3.dmg * 4 + a4.dmg * 4 + e2.dmg * 4 + e1.dmg * 6 + (ce2.dmg + ce1.dmg * 2) * cons6 + q1.dmg + q2.dmg * 8 + q3.dmg * 8,
        avg: a1.avg * 5 + a2.avg * 5 + a3.avg * 4 + a4.avg * 4 + e2.avg * 4 + e1.avg * 6 + (ce2.avg + ce1.avg * 2) * cons6 + q1.avg + q2.avg * 8 + q3.avg * 8
      }
    }
  }, {
    title: '单人站场20秒治疗',
    dmg: ({ attr, calc, talent, cons }, { heal }) => {
      let e = talent.e['白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.e['白玉萝卜治疗量2'][1] * 1
      let q = talent.q['桂子仙机白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.q['桂子仙机白玉萝卜治疗量2'][1] * 1
      let t = calc(attr.hp) * 0.8 / 100
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let ce = calc(attr.hp) * 7.5 / 100
      let zl = e * 10 + q * 16 + t * 20 + ce * 3 * cons6
      return heal(zl)
    }
  }, {
    title: '单人循环流畅度',
    dmg: ({ talent, calc, attr, weapon, cons }) => {
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3 * 2 - 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (cons >= 2) consn = 3 * 5

      if (weapon.name === '天空之脊') weaponconsn = 2

      return {
        avg: Format.percent((calc(attr.recharge) / 100 * (5 * 3 + weaponn)) / (80 - weaponnn - consn - (0.2073 * (18 + weaponconsn)))),
        type: 'text'
      }
    }
  }, {
    title: '单人站场期望DPS',
    dmg: ({ attr, calc, talent, weapon, cons }, dmg) => {
      let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
      let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let e1 = dmg(talent.e['白玉萝卜伤害'], 'e')
      let q1 = dmg(talent.q['技能伤害'], 'q')
      let q2 = dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let ce1 = c6Dmg
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3 * 2 - 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (cons >= 2) consn = 3 * 5

      if (weapon.name === '天空之脊') weaponconsn = 2

      let qcn = Math.min(1, ((calc(attr.recharge) / 100 * (5 * 3 + weaponn)) / (80 - weaponnn - consn - (0.2073 * (18 + weaponconsn)))))
      return {
        dmg: (a1.dmg * 5 + a2.dmg * 5 + a3.dmg * 4 + a4.dmg * 4 + e1.dmg * 10 + ce1.dmg * 3 * cons6 + (q1.dmg + q2.dmg * 16) * qcn) / 20,
        avg: (a1.avg * 5 + a2.avg * 5 + a3.avg * 4 + a4.avg * 4 + e1.avg * 10 + ce1.avg * 3 * cons6 + (q1.avg + q2.avg * 16) * qcn) / 20
      }
    }
  }, {
    title: '单人站场期望DPS激化',
    dmg: ({ attr, calc, talent, weapon, cons }, dmg) => {
      let a1 = dmg(talent.a['一段伤害'], 'a', 'phy')
      let a2 = dmg(talent.a['二段伤害'], 'a', 'phy')
      let a3 = dmg(talent.a['三段伤害'], 'a', 'phy')
      let a4 = dmg(talent.a['四段伤害'], 'a', 'phy')
      let e1 = dmg(talent.e['白玉萝卜伤害'], 'e')
      let e2 = dmg(talent.e['白玉萝卜伤害'], 'e', 'spread')
      let q1 = dmg(talent.q['技能伤害'], 'q', 'spread')
      let q2 = dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
      let q3 = dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q', 'spread')
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let ce1 = c6Dmg
      let ce2 = c6jDmg
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3 * 2 - 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (cons >= 2) consn = 3 * 5

      if (weapon.name === '天空之脊') weaponconsn = 2

      let qcn = Math.min(1, ((calc(attr.recharge) / 100 * (5 * 3 + weaponn)) / (80 - weaponnn - consn - (0.2073 * (18 + weaponconsn)))))
      return {
        dmg: (a1.dmg * 5 + a2.dmg * 5 + a3.dmg * 4 + a4.dmg * 4 + e2.dmg * 4 + e1.dmg * 6 + (ce2.dmg + ce1.dmg * 2) * cons6 + (q1.dmg + q2.dmg * 8 + q3.dmg * 8) * qcn) / 20,
        avg: (a1.avg * 5 + a2.avg * 5 + a3.avg * 4 + a4.avg * 4 + e2.avg * 4 + e1.avg * 6 + (ce2.avg + ce1.avg * 2) * cons6 + (q1.avg + q2.avg * 8 + q3.avg * 8) * qcn) / 20
      }
    }
  }, {
    title: '单人站场期望HPS',
    dmgKey: 'hps',
    dmg: ({ attr, calc, talent, weapon, cons }, { heal }) => {
      let e = talent.e['白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.e['白玉萝卜治疗量2'][1] * 1
      let q = talent.q['桂子仙机白玉萝卜治疗量2'][0] * calc(attr.hp) / 100 + talent.q['桂子仙机白玉萝卜治疗量2'][1] * 1
      let t = calc(attr.hp) * 0.8 / 100
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let ce = calc(attr.hp) * 7.5 / 100
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0

      if (weapon.name === '西风长枪') weaponn = 3 * 2 * 2

      if (weapon.name === '喜多院十文字') weaponnn = (2.5 + weapon.affix * 0.5) * 3 * 2 - 3

      if (weapon.name === '公义的酬报') weaponnn = 6 + weapon.affix * 2

      if (cons >= 2) consn = 3 * 5

      if (weapon.name === '天空之脊') weaponconsn = 2

      let qcn = Math.min(1, ((calc(attr.recharge) / 100 * (5 * 3 + weaponn)) / (80 - weaponnn - consn - (0.2073 * (18 + weaponconsn)))))
      let zl = (e * 10 + t * 15 + ce * 3 * cons6 + (t * 5 + q * 16) * qcn) / 20
      return heal(zl)
    }
  }, {
    title: '瑶妮妲绫 白玉萝卜',
    params: { teamA: true },
    dmg: ({ talent }, dmg) => dmg(talent.e['白玉萝卜伤害'], 'e')
  }, {
    title: '瑶妮妲绫 Q萝卜',
    params: { teamA: true },
    dmg: ({ talent }, dmg) => dmg(talent.q['桂子仙机白玉萝卜伤害'], 'q')
  }, {
    title: '瑶妮妲绫 草原核',
    params: { teamA: true },
    dmg: ({ calc, attr }, { reaction }) => {
      return reaction('bloom')
    }
  }]

export const defParams = { soda: 1 }
export const defDmgKey = 'hps'
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '瑶瑶技能：[玉颗珊珊月中落] 周期性召唤「月桂·弹跳型」并使瑶瑶的移动速度提升[_jSpeed]%获得[_dendroRes]%草元素抗性',
    data: {
      _jSpeed: 15,
      _dendroRes: 50
    }
  }, {
    title: '瑶瑶1命：[妙受琼阁] 白玉萝卜炸裂时,处在其影响范围内的当前场上角色获得[dmg]%草元素伤害加成并恢复[_stamina]点体力',
    cons: 1,
    data: {
      dmg: 15,
      _stamina: 15
    }
  }, {
    title: '瑶瑶2命：[正思无邪] 白玉萝卜的炸裂伤害命中敌人,瑶瑶将恢复[_energyevery]点元素能量',
    cons: 2,
    data: {
      _energyevery: 3
    }
  }, {
    title: '瑶瑶4命：[爰爰可亲] 施放云台团团降芦菔或玉颗珊珊月中落后提升瑶瑶的元素精通[mastery]点',
    sort: 5,
    cons: 4,
    data: {
      mastery: ({ calc, attr }) => Math.min(120, calc(attr.hp) * 0.3 / 100)
    }
  }, {
    title: '瑶瑶6命：[慈惠仁心] 月桂·抛掷型每投掷2次白玉萝卜,就会在下次投掷时额外投掷1枚超厉害·大萝卜',
    cons: 6
  }, {
    check: ({ params }) => params.teamA === true,
    title: '妮露天赋：[折旋落英之庭] 处于金杯的丰馈状态下的角色受到草元素攻击会使附近的所有角色元素精通提升[mastery]点,触发绽放反应时,将取代草原核产生「丰穰之核」',
    sort: 1,
    data: {
      mastery: 100
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '妮露天赋：[翩舞永世之梦] 处于「金杯的丰馈」状态下的角色触发的丰穰之核造成的伤害提升[bloom]%',
    sort: 9,
    data: {
      bloom: 400
    }
  }, {
    check: ({ params, cons }) => cons >= 6 && params.teamA === true,
    title: '妮露武器：[圣显之钥-精1] 元素战技命中敌人3次后基于装备者的生命值上限为队伍中附近所有角色提供[mastery]点元素精通',
    sort: 5,
    data: {
      mastery: 92.3
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '纳西妲天赋：[净善摄受明论] 依据队伍中元素精通最高的角色的元素精通,提高领域内当前场上角色的元素精通[mastery]点',
    sort: 7,
    data: {
      mastery: 250
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '纳西妲圣遗物：[深林的记忆4] 元素战技或元素爆发命中敌人后,使命中目标的草元素抗性降低[kx]%',
    data: {
      kx: 30
    }
  }, {
    check: ({ params, cons }) => params.teamA === true,
    title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    sort: 1,
    data: {
      mastery: 40
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    data: {
      hpPct: 25
    }
  }, {
    check: ({ params }) => params.teamA === true,
    title: '元素共鸣：[蔓生之草] 元素精通合计提升[mastery]点,触发燃烧、原激化、绽放反应后,队伍中附近的所有角色元素精通提升',
    sort: 1,
    data: {
      mastery: 80
    }
  },
  'spread',
  { title: '1.30最后修改：[10.24重置]' }
]
