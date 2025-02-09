import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

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
    dmg: ({ talent }, dmg) => {
      let a1 = dmg(talent.a['四段伤害'] / 2, 'a', 'phy')
      return {
        dmg: a1.dmg * 2,
        avg: a1.avg * 2
      }
    }
  }, {
    title: '瞄准射击伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['瞄准射击'], 'a2', 'phy')
  }, {
    title: '满蓄力瞄准射击伤害',
    dmg: ({ talent }, dmg) => dmg(talent.a['满蓄力瞄准射击'], 'a2')
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
    title: '破局矢伤害',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
  }, {
    check: ({ cons }) => cons >= 6,
    title: '运筹帷幄破局矢',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2')
  }, {
    title: '破局矢蒸发',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2', 'vaporize')
  }, {
    check: ({ cons }) => cons >= 6,
    title: '运筹帷幄破局矢蒸发',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2', 'vaporize')
  }, {
    title: '萦络纵命索伤害',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  }, {
    title: '萦络纵命索蒸发',
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
  }, {
    title: '渊图玲珑骰展开伤害',
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      return basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
    }
  }, {
    title: '渊图玲珑骰展开蒸发',
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      return basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q', 'vaporize')
    }
  }, {
    title: 'Q协同单段伤害',
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    }
  }, {
    title: 'Q协同单段蒸发',
    params: { q: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q', 'vaporize')
    }
  }, {
    title: 'Q协同15段伤害',
    params: { q: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let count = cons * 1 >= 2 ? 1 : 0
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 100), 'q')
      return {
        dmg: 8 * erming.dmg * count + 15 * q.dmg,
        avg: 8 * erming.avg * count + 15 * q.avg
      }
    }
  }, {
    title: 'Q协同15段蒸发',
    params: { q: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let ermingzf = basic(calc(attr.hp) * (14 / 100), 'q', '蒸发')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let count = cons * 1 >= 2 ? 1 : 0
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
      let qzf = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q', 'vaporize')
      return {
        dmg: 2 * erming.dmg * count + 6 * ermingzf.dmg * count + 30 * q.dmg + 15 * qzf.dmg,
        avg: 2 * erming.avg * count + 6 * ermingzf.dmg * count + 30 * q.avg + 15 * qzf.avg
      }
    }
  }, {
    title: '单人站场20秒',
    params: { q: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 2 / 100, 'a', 'phy')
      let z = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
      let cz = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2')
      let e = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let ce = basic(calc(attr.hp) * (14 / 100), 'q')
      let q1 = basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
      let q2 = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
      let cons1 = cons * 1 >= 1 ? 2 : 1
      let cons2 = cons * 1 >= 2 ? 1 : 0
      let cons6 = cons * 1 >= 6 ? 1 : 0
      return {
        dmg: 6 * a1.dmg + 6 * a2.dmg + 6 * a3.dmg + 6 * 2 * a4.dmg + z.dmg + e.dmg * cons1 + 8 * ce.dmg * cons2 + q1.dmg + 15 * 3 * q2.dmg + (cz.dmg * 5 - a1.dmg - a2.dmg - a3.dmg - 2 * a4.dmg) * cons6,
        avg: 6 * a1.avg + 6 * a2.avg + 6 * a3.avg + 6 * 2 * a4.avg + z.avg + e.avg * cons1 + 8 * ce.avg * cons2 + q1.avg + 15 * 3 * q2.avg + (cz.avg * 5 - a1.avg - a2.avg - a3.avg - 2 * a4.avg) * cons6
      }
    }
  }, {
    title: '单人循环流畅度',
    dmg: ({ talent, calc, attr, weapon, cons }) => {
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0
      if (weapon.name === '西风猎弓') weaponn = 3 * 2 * 2

      if (weapon.name === '祭礼弓') weaponn = 4 * 3

      if (cons >= 1) consn = 4 * 3

      if (weapon.name === '钢轮弓') {
        weaponconsn = 2
        if (weapon.affix_level >= 4) {
          weaponconsn = 3
        }
      }
      return {
        avg: Format.percent((calc(attr.recharge) / 100 * (4 * 3 + consn + weaponn)) / (70 - weaponnn - (0.2212 * (24 + weaponconsn)))),
        type: 'text'
      }
    }
  }, {
    title: '单人站场期望DPS',
    dmgKey: 'dps',
    params: { q: true },
    dmg: ({ talent, attr, calc, weapon, cons }, { basic }) => {
      let a1 = basic(calc(attr.atk) * talent.a['一段伤害'] / 100, 'a', 'phy')
      let a2 = basic(calc(attr.atk) * talent.a['二段伤害'] / 100, 'a', 'phy')
      let a3 = basic(calc(attr.atk) * talent.a['三段伤害'] / 100, 'a', 'phy')
      let a4 = basic(calc(attr.atk) * talent.a['四段伤害'] / 2 / 100, 'a', 'phy')
      let z = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100, 'a2')
      let cz = basic(calc(attr.hp) * talent.a['破局矢伤害'] / 100 * 1.56, 'a2')
      let e = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let ce = basic(calc(attr.hp) * (14 / 100), 'q')
      let q1 = basic(calc(attr.hp) * (talent.q['技能伤害'] / 100), 'q')
      let q2 = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
      let cons1 = cons * 1 >= 1 ? 2 : 1
      let cons2 = cons * 1 >= 2 ? 1 : 0
      let cons6 = cons * 1 >= 6 ? 1 : 0
      let weaponn = 0
      let consn = 0
      let weaponnn = 0
      let weaponconsn = 0
      if (weapon.name === '西风猎弓') {
        weaponn = 3 * 2 * 2
      }
      if (weapon.name === '祭礼弓') {
        weaponn = 4 * 3
      }
      if (cons >= 1) {
        consn = 4 * 3
      }
      if (weapon.name === '钢轮弓') {
        weaponconsn = 2
        if (weapon.affix_level >= 4) {
          weaponconsn = 3
        }
      }
      let qcn = Math.min(1, (calc(attr.recharge) / 100 * (4 * 3 + consn + weaponn)) / (70 - weaponnn - (0.2212 * (24 + weaponconsn))))
      return {
        dmg: (6 * a1.dmg + 6 * a2.dmg + 6 * a3.dmg + 6 * 2 * a4.dmg + z.dmg + e.dmg * cons1 + 8 * ce.dmg * cons2 + qcn * (q1.dmg + 15 * 3 * q2.dmg + (cz.dmg * 5 - a1.dmg - a2.dmg - a3.dmg - 2 * a4.dmg) * cons6)) / 20,
        avg: (6 * a1.avg + 6 * a2.avg + 6 * a3.avg + 6 * 2 * a4.avg + z.avg + e.avg * cons1 + 8 * ce.avg * cons2 + qcn * (q1.avg + 15 * 3 * q2.avg + (cz.avg * 5 - a1.avg - a2.avg - a3.avg - 2 * a4.avg) * cons6)) / 20
      }
    }
  }, {
    title: '夜莫万E伤害',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  }, {
    title: '夜莫万E蒸发',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
  }, {
    title: '夜莫万Q单段协同',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    }
  }, {
    check: ({ cons }) => cons < 6,
    title: '夜莫万EE7次连携',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let count = cons * 1 >= 2 ? 1 : 0
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
      return {
        dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
        avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
      }
    }
  }, {
    check: ({ cons }) => cons < 6,
    title: '夜莫万EE双蒸7次连携',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let count = cons * 1 >= 2 ? 1 : 0
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
      return {
        dmg: 2 * e_v.dmg + 4 * erming.dmg * count + 21 * q.dmg,
        avg: 2 * e_v.avg + 4 * erming.avg * count + 21 * q.avg
      }
    }
  }, {
    check: ({ cons }) => cons >= 6,
    title: '夜莫万6命EaEaaaa',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
      let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
      return {
        dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
        avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
      }
    }
  }, {
    check: ({ cons }) => cons >= 6,
    title: '夜莫万6命EaEaaaa双蒸',
    params: { q: true, teamA: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      let e_v = basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e', 'vaporize')
      let erming = basic(calc(attr.hp) * (14 / 100), 'q')
      let q = basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
      let a = basic(calc(attr.hp) * talent.a['破局矢伤害'] * 1.56 / 100, 'a2')
      return {
        dmg: 2 * e_v.dmg + 2 * erming.dmg + 15 * q.dmg + 5 * a.dmg,
        avg: 2 * e_v.avg + 2 * erming.avg + 15 * q.avg + 5 * a.avg
      }
    }
  }, {
    title: '夜胡行钟 e伤害',
    params: { teamB: true },
    dmg: ({ talent, attr, calc }, { basic }) => basic(calc(attr.hp) * talent.e['技能伤害'] / 100, 'e')
  }, {
    title: '夜胡行钟 协同单段',
    params: { teamB: true },
    dmg: ({ talent, attr, calc, cons }, { basic }) => {
      return basic(calc(attr.hp) * (talent.q['玄掷玲珑伤害'] / 3 / 100), 'q')
    }
  }
]

export const defDmgKey = 'dps'
export const mainAttr = 'hp,cpct,cdmg'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
  {
    title: '夜兰技能：[潜形隐曜弓] 「破局」状态，使下一次满蓄力瞄准射击所需的蓄力时间减少[_a2Speed]%，并将在满蓄力时转为发射「破局矢」',
    data: {
      _a2Speed: 80
    }
  }, {
    title: '夜兰天赋：[猜先有方] 队伍存在4种元素类型的角色时夜兰的生命值上限提升[hpPct]%',
    sort: 1,
    data: {
      hpPct: 30
    }
  }, {
    title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在期间，能使队伍中自己的当前场上角色造成的伤害提高至多[dmg]%',
    check: ({ params }) => params.q === true,
    data: {
      dmg: 50
    }
  }, {
    title: '夜兰1命：[与谋者，以局入局] 萦络纵命索的可使用次数增加[_eIncreases]次。',
    cons: 1,
    data: {
      _eIncreases: 1
    }
  }, {
    title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,至多获得[hpPct]%生命值上限',
    sort: 1,
    cons: 4,
    data: {
      hpPct: 40
    }
  }, {
    title: '夜兰6命：[取胜者，大小通吃] 「运筹帷幄」状态普通攻击将转为发射特殊的「破局矢」造成的伤害视为重击伤害，能造成破局矢[_aMulti]%的伤害',
    cons: 6,
    data: {
      _aMulti: 156
    }
  }, {
    title: '枫原万叶圣遗物：[翠绿之影4] 根据扩散的元素类型，降低受到影响的敌人[kx]%的对应元素抗性',
    check: ({ params }) => params.teamA === true,
    data: {
      kx: 40
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => (cons < 6 && cons > 1) && params.teamA === true,
    data: {
      aDmg: 16,
      a2Dmg: 16,
      a3Dmg: 16
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精1] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => (cons < 6 && cons > 1) && params.teamA === true && weapon.name !== '终末嗟叹之诗',
    sort: 1,
    data: {
      atkPct: 20
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[aDmg]%普通攻击,重击,下落攻击伤害提升',
    check: ({ params, cons }) => cons >= 6 && params.teamA === true,
    data: {
      aDmg: 32,
      a2Dmg: 32,
      a3Dmg: 32
    }
  }, {
    title: '枫原万叶武器：[苍古自由之誓-精5] 消耗所有奋起之符使附近队伍中所有角色获得[atkPct]%攻击力 { 该武器效果不可叠加 }',
    check: ({ params, cons, weapon }) => cons >= 6 && params.teamA === true && weapon.name !== '终末嗟叹之诗',
    sort: 1,
    data: {
      atkPct: 40
    }
  }, {
    title: '枫原万叶2命：[山岚残芯] 万叶之一刀的流风秋野其中的场上角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 2 && params.teamA === true,
    sort: 1,
    data: {
      mastery: 200
    }
  }, {
    title: '枫原万叶天赋：[风物之诗咏] 触发扩散反应后枫原万叶会为队伍中所有角色提供[dmg]%对应元素伤害加成',
    check: ({ params }) => params.teamA === true,
    data: {
      dmg: 40
    }
  }, {
    title: '莫娜圣遗物：[教官4] 触发元素反应后。队伍中所有角色元素精通提高[mastery]%点',
    check: ({ params, artis }) => params.teamA === true && artis.教官 !== 4,
    sort: 1,
    data: {
      mastery: 120
    }
  }, {
    title: '莫娜武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons < 6 && params.teamA === true,
    sort: 1,
    data: {
      mastery: 40
    }
  }, {
    title: '莫娜武器：[千夜浮梦-精5] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
    check: ({ params, cons }) => cons >= 6 && params.teamA === true,
    sort: 1,
    data: {
      mastery: 48
    }
  }, {
    title: '莫娜4命：[灭绝的预言] 队伍中所有角色攻击处于星异状态下的敌人时,暴击率提升[cpct]%',
    check: ({ params, cons }) => cons >= 4 && params.teamA === true,
    data: {
      cpct: 15
    }
  }, {
    title: '莫娜技能：[星命定轨] 对敌人施加星异的伤害加成效果,并以此提高[dmg]%这一次造成的伤害',
    check: ({ params }) => params.teamA === true,
    data: {
      dmg: 60
    }
  }, {
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    check: ({ params }) => params.teamA === true,
    data: {
      hpPct: 25
    }
  }, {
    title: '行秋2命：[天青现虹] 受到剑雨攻击的敌人,水元素抗性降低[kx]%',
    check: ({ params }) => params.teamB === true,
    data: {
      kx: 15
    }
  }, {
    title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
    check: ({ params }) => params.teamB === true,
    data: {
      kx: 20
    }
  }, {
    title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
    check: ({ params }) => params.teamB === true,
    data: {
      hpPct: 25
    }
  },
  'vaporize',
  { title: '5.2最后修改：[10.24重置] 修复非Miao仔情况下可能报错的问题' }
]
