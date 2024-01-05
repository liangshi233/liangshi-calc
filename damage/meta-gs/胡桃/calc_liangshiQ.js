import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

let a1Dmg = { dmg: 0 , avg: 0 }
let a2Dmg = { dmg: 0 , avg: 0 }
let a3Dmg = { dmg: 0 , avg: 0 }
let a4Dmg = { dmg: 0 , avg: 0 }
let a5Dmg = { dmg: 0 , avg: 0 }
let e1Dmg = { dmg: 0 , avg: 0 }
let e2Dmg = { dmg: 0 , avg: 0 }

export const details = [
{
  title: '普通攻击一段伤害',
  params: { e: true },
   dmg: ({ talent }, dmg) => {
    a1Dmg = dmg(talent.a['一段伤害'], 'a', 'phy')
    return a1Dmg
  }
},
{
  title: '开E普攻一段',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: '开E普攻一段蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: '半血开E普攻一段',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: '半血开E普攻一段蒸发',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: '普通攻击二段伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => {
    a2Dmg = dmg(talent.a['二段伤害'], 'a', 'phy')
    return a2Dmg
  }
},
{
  title: '开E普攻二段',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: '开E普攻二段蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
},
{
  title: '半血开E普攻二段',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: '半血开E普攻二段蒸发',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['二段伤害'], 'a', 'vaporize')
},
{
  title: '普通攻击三段伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => {
    a3Dmg = dmg(talent.a['三段伤害'], 'a', 'phy')
    return a3Dmg
  }
},
{
  title: '开E普攻三段',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: '开E普攻三段蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
},
{
  title: '半血开E普攻三段',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: '半血开E普攻三段蒸发',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['三段伤害'], 'a', 'vaporize')
},
{
  title: '普通攻击四段伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => {
    a4Dmg = dmg(talent.a['四段伤害'], 'a', 'phy')
    return a4Dmg
  }
},
{
  title: '开E普攻四段',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: '开E普攻四段蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['四段伤害'], 'a', 'vaporize')
},
{
  title: '半血开E普攻四段',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: '半血开E普攻四段蒸发',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['四段伤害'], 'a', 'vaporize')
},
{
  title: '普通攻击五段伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => {
    a5Dmg = dmg(talent.a['五段伤害'], 'a', 'phy')
    return a5Dmg
  }
},
{
  title: '开E普攻五段',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: '开E普攻五段蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
},
{
  title: '半血开E普攻五段',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['五段伤害'], 'a')
},
{
  title: '半血开E普攻五段蒸发',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['五段伤害'], 'a', 'vaporize')
},
{
  title: '重击伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  title: 'E后重击',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: 'E后重击蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: '半血开E重击',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: '半血开E重击蒸发',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: '下落期间伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: '低空下落伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: '高空下落伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: '无E血梅香伤害',
  params: { e: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['血梅香伤害'], 'e')
},
{
  title: '无E血梅香蒸发',
  params: { e: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
},
{
  title: '无E半血血梅香伤害',
  params: { hp: true , e: true },
  dmg: ({ talent, attr }, dmg ) => {
    e1Dmg = dmg(talent.e['血梅香伤害'], 'e')
    return e1Dmg
  }
},
{
  title: '无E半血血梅香伤害',
  params: { hp: true , e: true },
  dmg: ({ talent, attr }, dmg ) => {
    e2Dmg = dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
    return e2Dmg
  }
},
{
  title: '血梅香伤害',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['血梅香伤害'], 'e')
},
{
  title: '血梅香蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
},
{
  title: '半血血梅香伤害',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['血梅香伤害'], 'e')
},
{
  title: '半血血梅香蒸发',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['血梅香伤害'], 'e', 'vaporize')
},
{
  title: '安神秘法伤害',
  params: { e: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '安神秘法蒸发',
  params: { e: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  title: '半血安神秘法',
  params: { hp: true , e: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['低血量时技能伤害'], 'q')
},
{
  title: '半血安神秘法蒸发',
  params: { hp: true , e: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
},
{
  title: 'E后安神秘法',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: 'E后安神秘法蒸发',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
},
{
  title: '半血开E后Q',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['低血量时技能伤害'], 'q')
},
{
  title: '半血开E后Q蒸发',
  params: { hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
},
{
  title: '单人站场16秒',
  params: { hp: true },
  dmg: ({ talent , cons }, dmg) => {
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
      dmg: q.dmg + cons2 * 2 * e2.dmg + 2 * e1.dmg + 7 * z1.dmg + 2 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg ),
      avg: q.avg + cons2 * 2 * e1.avg + 2 * e1.avg + 7 * z1.avg + 2 * ( a1.avg + a2.avg + a3.avg + a4.avg + a5.avg )
    }
  }
},
{
  title: '单人站场16秒蒸发',
  params: { hp: true },
  dmg: ({ talent , cons }, dmg) => {
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
      dmg: q.dmg + cons2 * 2 * e1.dmg + 2 * e1.dmg + 7 * z1.dmg + 2 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg ),
      avg: q.avg + cons2 * 2 * e1.avg+ 2 * e1.avg + 7 * z1.avg + 2 * ( a1.avg + a2.avg + a3.avg + a4.avg + a5.avg )
    }
  }
},
{
 	title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
  let consn = 0
  let weaponnn = 0
  let weaponconsn = 0
  if (weapon.name === '西风长枪') {
   weaponn = 3 * 2 * 2
  }
  if (weapon.name === '喜多院十文字') {
    if (weapon.affix = 1) {
      weaponnn = 3 * 3
    }
    if (weapon.affix = 2) {
      weaponnn = 3.5 * 3
    }
    if (weapon.affix = 3) {
      weaponnn = 4 * 3
    }
    if (weapon.affix = 4) {
      weaponnn = 4.5 * 3
    }
    if (weapon.affix = 5) {
      weaponnn = 5 * 3
    }
  }
  if (weapon.name === '公义的酬报') {
    if (weapon.affix = 1) {
      weaponnn = 8
    }
    if (weapon.affix = 2) {
      weaponnn = 10
    }
    if (weapon.affix = 3) {
      weaponnn = 12
    }
    if (weapon.affix = 4) {
      weaponnn = 14
    }
    if (weapon.affix = 5) {
      weaponnn = 16
    }
  }
  if (weapon.name === '天空之脊') {
  weaponconsn = 1
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 2.5 * 2 * 3 + weaponn )) / ( 60 - weaponnn - ( 0.2073 * ( 10 + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  params: { hp: true },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
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
    if (weapon.name === '西风长枪') {
     weaponn = 3 * 2 * 2
    }
    if (weapon.name === '喜多院十文字') {
      if (weapon.affix = 1) {
        weaponnn = 3 * 3
      }
      if (weapon.affix = 2) {
        weaponnn = 3.5 * 3
      }
      if (weapon.affix = 3) {
        weaponnn = 4 * 3
      }
      if (weapon.affix = 4) {
        weaponnn = 4.5 * 3
      }
      if (weapon.affix = 5) {
        weaponnn = 5 * 3
      }
    }
    if (weapon.name === '公义的酬报') {
      if (weapon.affix = 1) {
        weaponnn = 8
      }
      if (weapon.affix = 2) {
        weaponnn = 10
      }
      if (weapon.affix = 3) {
        weaponnn = 12
      }
      if (weapon.affix = 4) {
        weaponnn = 14
      }
      if (weapon.affix = 5) {
        weaponnn = 16
      }
    }
    if (weapon.name === '天空之脊') {
    weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 2.5 * 2 * 3 + weaponn ) ) / ( 60 - weaponnn - ( 0.2073 * ( 10 + weaponconsn ) ) ) )
    return {
      dmg: ( qcn * ( q.dmg + cons2 * 2 * e2.dmg ) + 2 * e1.dmg + 7 * z1.dmg + 2 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg ) ) / 16 ,
      avg: ( qcn * ( q.avg + cons2 * 2 * e2.avg ) + 2 * e1.avg + 7 * z1.avg + 2 * ( a1.avg + a2.avg + a3.avg + a4.avg + a5.avg ) ) / 16
    }
  }
},
{
  title: '单人站场期望DPS蒸发',
  dmgKey: 'dps',
  params: { hp: true },
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
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
    if (weapon.name === '西风长枪') {
     weaponn = 3 * 2 * 2
    }
    if (weapon.name === '喜多院十文字') {
      if (weapon.affix = 1) {
        weaponnn = 3 * 3
      }
      if (weapon.affix = 2) {
        weaponnn = 3.5 * 3
      }
      if (weapon.affix = 3) {
        weaponnn = 4 * 3
      }
      if (weapon.affix = 4) {
        weaponnn = 4.5 * 3
      }
      if (weapon.affix = 5) {
        weaponnn = 5 * 3
      }
    }
    if (weapon.name === '公义的酬报') {
      if (weapon.affix = 1) {
        weaponnn = 8
      }
      if (weapon.affix = 2) {
        weaponnn = 10
      }
      if (weapon.affix = 3) {
        weaponnn = 12
      }
      if (weapon.affix = 4) {
        weaponnn = 14
      }
      if (weapon.affix = 5) {
        weaponnn = 16
      }
    }
    if (weapon.name === '天空之脊') {
    weaponconsn = 1
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 2.5 * 2 * 3 + weaponn ) ) / ( 60 - weaponnn - ( 0.2073 * ( 10 + weaponconsn ) ) ) )
    return {
      dmg: ( qcn * ( q.dmg + cons2 * 2 * e2.dmg ) + 2 * e1.dmg + 7 * z1.dmg + 2 * ( a1.dmg + a2.dmg + a3.dmg + a4.dmg + a5.dmg ) ) / 16 ,
      avg: ( qcn * ( q.avg + cons2 * 2 * e2.avg ) + 2 * e1.avg + 7 * z1.avg + 2 * ( a1.avg + a2.avg + a3.avg + a4.avg + a5.avg ) ) / 16
    }
  }
},
{
  title: '胡行夜钟 普攻一段蒸发',
  params: { teamA: true , hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['一段伤害'], 'a', 'vaporize')
},
{
  title: '胡行夜钟 重击蒸发',
  params: { teamA: true , hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: '胡行夜钟 Q蒸发',
  params: { teamA: true , hp: true },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['低血量时技能伤害'], 'q', 'vaporize')
}]

export const defDmgKey = 'dps'
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [
{
  check: ({ params }) => params.e !== true,
  title: '胡桃技能：[蝶引来生] 消耗一部分生命值,击退周围敌人,基于进入该状态时胡桃的生命值上限,提高胡桃[atkPlus]点攻击力',
  sort: 9,
  data: {
    atkPlus: ({ talent, attr, calc }) => {
      return Math.min( talent.e['攻击力提高'] * calc(attr.hp) / 100, attr.atk.base * 4 )
    }
  }
},
{
  check: ({ params }) => params.hp === true,
  title: '胡桃天赋：[血之灶火] 胡桃的生命值低于或等于50%时,获得[dmg]%火元素伤害加成',
  data: {
    dmg: 33
  }
},
{
  title: '胡桃1命：[赤团开时斜飞去] 处于蝶引来生施加的彼岸蝶舞状态下时,胡桃的重击体力消耗减少[_a2Stamina]% ',
  cons: 1,
  data: {
    _a2Stamina: 100
  }
},
{
  title: '胡桃2命：[最不安神晴又复雨] 血梅香造成的伤害提高[ePlus]点,安神秘法会为命中的敌人施加血梅香效果',
  cons: 2,
  sort: 9,
  data: {
    ePlus: ({ attr, calc }) => calc(attr.hp) * 0.1
  }
},
{
  title: '胡桃6命：[幽蝶能留一缕芳] 胡桃的生命值降至25%以下,或承受足以使她倒下的伤害时胡桃的所有元素抗性和物理抗性提高[_res]%,暴击率提高[_cpct]%,并提高[_interruption]%抗打断能力',
  cons: 6,
  data: {
    _interruption: 100 ,
    _cpct: 100 ,
  	_res: 200
  }
},
{
  title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在期间，能使队伍中自己的当前场上角色造成的伤害提高至多[dmg]%',
  check: ({ params }) => params.teamA === true,
  data: {
    dmg: 50
  }
},
{
  title: '夜兰4命：[诓惑者，接树移花] 依照「络命丝」标记敌人的数量,至多获得[hpPct]%生命值上限',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  cons: 4,
  data: {
    hpPct: 40
  }
},
{
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
  check: ({ params }) => params.teamA === true,
  data: {
    kx: 20
  }
},
{
  title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
  check: ({ params }) => params.teamA === true,
  data: {
    hpPct: 25
  }
},
 'vaporize',
{title: '1.5最后修改：[11.6重置] 修复部分情况下部分计算Nan的问题'}
]
/*
这里放的是历史更新日志
{title: '12.27最后修改：[11.6重置] 修复攻击力提升不正确的问题'}
*/