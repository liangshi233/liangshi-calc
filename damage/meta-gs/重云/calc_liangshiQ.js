import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'

let a3Dmg = { dmg: 0 , avg: 0 }
let ar3Dmg = { dmg: 0 , avg: 0 }
let q1Dmg = { dmg: 0 , avg: 0 }
let q2Dmg = { dmg: 0 , avg: 0 }

export const details = [
{
  title: '普攻一段伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'phy')
},
{
  title: '普攻一段伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: '普攻一段融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a', 'melt')
},
{
  title: '普攻二段伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'phy')
},
{
  title: '普攻二段伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a')
},
{
  title: '普攻二段融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['二段伤害'], 'a', 'melt')
},
{
  title: '普攻三段伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'phy')
},
{
  title: '普攻三段伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a')
},
{
  title: '普攻三段融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['三段伤害'], 'a', 'melt')
},
{
  title: '普攻四段伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'phy')
},
{
  title: '普攻四段伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: '普攻四段融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'melt')
},
{
  title: '重击循环伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'phy')
},
{
  title: '重击循环伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2')
},
{
  title: '重击循环伤害融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击循环伤害'], 'a2', 'melt')
},
{
  title: '重击终结伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'phy')
},
{
  title: '重击终结伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2')
},
{
  title: '重击终结伤害融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击终结伤害'], 'a2', 'melt')
},
{
  title: '下落期间伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'phy')
},
{
  title: '下落期间伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3')
},
{
  title: '下落期间伤害融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['下坠期间伤害'], 'a3', 'melt')
},
{
  title: '低空下落伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'phy')
},
{
  title: '低空下落伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3')
},
{
  title: '低空下落伤害融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][0], 'a3', 'melt')
},
{
  title: '高空下落伤害物理',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'phy')
},
{
  title: '高空下落伤害冰',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
},
{
  title: '高空下落伤害融化',
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3', 'melt')
},
{
  check: ({ cons }) => cons >= 1,
  title: '一命冰刃单道伤害',
  dmg: ({ attr , talent , calc }, { basic }) => {
  a3Dmg = basic( calc( attr.atk ) * ( 50 / 100 ), 'a')
  return a3Dmg
  }
},
{
  check: ({ cons }) => cons >= 1,
  title: '一命冰刃单道融化',
  dmg: ({ attr , talent , calc }, { basic }) => {
  ar3Dmg = basic( calc( attr.atk ) * ( 50 / 100 ), 'a', 'melt')
  return ar3Dmg
  }
},
{
  title: '重华叠霜伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: '重华叠霜融化伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
{
  title: '云开星落单段伤害',
  params: { tfkx: true },
  dmg: ({ talent }, dmg) => {
  q1Dmg = dmg( talent.q['技能伤害'], 'q')
  return q1Dmg
  }
},
{
  title: '云开星落单段融化',
  params: { tfkx: true },
  dmg: ({ talent }, dmg) => {
  q2Dmg = dmg( talent.q['技能伤害'], 'q', 'melt')
  return q2Dmg
  }
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `云开星落 ${count}柄灵刃总伤害`,
    params: { tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q')
  }
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `云开星落 ${count}柄灵刃融化`,
    params: { tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q', 'melt')
  }
},
{
  title: '单人站场15秒',
  dmg: ({ talent , cons }, dmg) => {
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
      dmg: aw1.dmg + aw2.dmg + aw3.dmg + aw4.dmg + a1.dmg * 3 + a2.dmg * 3 + a3.dmg * 3 + a4.dmg * 2 + ax3.dmg * 9 * cons1 + e.dmg * 2 + q.dmg * cons6 ,
      avg: aw1.avg + aw2.avg + aw3.avg + aw4.avg + a1.avg * 3 + a2.avg * 3 + a3.avg * 3 + a4.avg * 2 + ax3.avg * 9 * cons1 + e.avg * 2 + q.avg * cons6
    }
  }
},
{
  title: '单人站场15秒融化',
  dmg: ({ talent , cons }, dmg) => {
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
      dmg: ar1.dmg + ar2.dmg + ar3.dmg + ar4.dmg + aw1.dmg + aw2.dmg + aw3.dmg + aw4.dmg + a1.dmg * 2 + a2.dmg * 2 + a3.dmg * 2 + a4.dmg * 1 + ax3.dmg * 6 * cons1 + axr3.dmg * 3 * cons1 + e.dmg * 2 + q.dmg * cons6 ,
      avg: ar1.avg + ar2.avg + ar3.avg + ar4.avg + aw1.avg + aw2.avg + aw3.avg + aw4.avg + a1.avg * 2 + a2.avg * 2 + a3.avg * 2 + a4.avg * 1 + ax3.avg * 6 * cons1 + axr3.avg * 3 * cons1 + e.avg * 2 + q.avg * cons6
    }
  }
},
{
 	title: '单人循环流畅度',
  dmg: ({ talent , calc , attr , weapon , cons }) => {
  let weaponn = 0
  let consn = 0
  let weaponnn = 0
  let weaponconsn= 0
  if (weapon.name === '便携动力锯') {
    if (weapon.affix = 1) {
      weaponnn = 2 * 3
    }
    if (weapon.affix = 2) {
      weaponnn = 2.5 * 3
    }
    if (weapon.affix = 3) {
      weaponnn = 3 * 3
    }
    if (weapon.affix = 4) {
      weaponnn = 3.5 * 3
    }
    if (weapon.affix = 5) {
      weaponnn = 4 * 3
    }
  }
  if (weapon.name === '桂木斩长正') {
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
  if (weapon.name === '西风大剑') {
  weaponn = 3 * 2 * 2
  }
  if (weapon.name === '祭礼大剑') {
  weaponn = 4 * 3
  }
  if (cons >= 4) {
  consn = 1 * 7
  }
  if (weapon.name === '松籁响起之时') {
  weaponconsn = 1
    if (weapon.affix_level >= 4) {
      weaponconsn = 2
    }
  }
  return {
    avg: Format.percent ( ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn )) / ( 40 - consn - weaponnn - ( 0.2732 * ( 15 + weaponconsn ) ) ) ) ,
    type: 'text'
  }
 }
},
{
  title: '单人站场期望DPS',
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
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
    let weaponconsn= 0
    if (weapon.name === '便携动力锯') {
      if (weapon.affix = 1) {
        weaponnn = 2 * 3
      }
      if (weapon.affix = 2) {
        weaponnn = 2.5 * 3
      }
      if (weapon.affix = 3) {
        weaponnn = 3 * 3
      }
      if (weapon.affix = 4) {
        weaponnn = 3.5 * 3
      }
      if (weapon.affix = 5) {
        weaponnn = 4 * 3
      }
    }
    if (weapon.name === '桂木斩长正') {
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
    if (weapon.name === '西风大剑') {
    weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼大剑') {
    weaponn = 4 * 3
    }
    if (weapon.name === '松籁响起之时') {
    weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    if (cons >= 4) {
    consn = 1 * 7
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn ) ) / ( 40 - consn - weaponnn - ( 0.2732 * ( 15 + weaponconsn ) ) ) )
    return {
      dmg: ( aw1.dmg + aw2.dmg + aw3.dmg + aw4.dmg + a1.dmg * 3 + a2.dmg * 3 + a3.dmg * 3 + a4.dmg * 2 + ax3.dmg * 9 * cons1 + e.dmg * 2 + q.dmg * cons6 * qcn ) / 15,
      avg: ( aw1.avg + aw2.avg + aw3.avg + aw4.avg + a1.avg * 3 + a2.avg * 3 + a3.avg * 3 + a4.avg * 2 + ax3.avg * 9 * cons1 + e.avg * 2 + q.avg * cons6 * qcn ) / 15
    }
  }
},
{
  title: '单人融化站场期望DPS',
  dmgKey: 'dps',
  dmg: ({ talent , calc , attr , weapon , cons }, dmg) => {
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
    let weaponconsn= 0
    if (weapon.name === '便携动力锯') {
      if (weapon.affix = 1) {
        weaponnn = 2 * 3
      }
      if (weapon.affix = 2) {
        weaponnn = 2.5 * 3
      }
      if (weapon.affix = 3) {
        weaponnn = 3 * 3
      }
      if (weapon.affix = 4) {
        weaponnn = 3.5 * 3
      }
      if (weapon.affix = 5) {
        weaponnn = 4 * 3
      }
    }
    if (weapon.name === '桂木斩长正') {
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
    if (weapon.name === '西风大剑') {
    weaponn = 3 * 2 * 2
    }
    if (weapon.name === '祭礼大剑') {
    weaponn = 4 * 3
    }
    if (weapon.name === '松籁响起之时') {
    weaponconsn = 1
      if (weapon.affix_level >= 4) {
        weaponconsn = 2
      }
    }
    if (cons >= 4) {
    consn = 1 * 7
    }
    let qcn = Math.min( 1 , ( calc(attr.recharge) / 100 * ( 4 * 3 + weaponn ) ) / ( 40 - consn - weaponnn - ( 0.2732 * ( 15 + weaponconsn ) ) ) )
    return {
      dmg: ( ar1.dmg + ar2.dmg + ar3.dmg + ar4.dmg + aw1.dmg + aw2.dmg + aw3.dmg + aw4.dmg + a1.dmg * 2 + a2.dmg * 2 + a3.dmg * 2 + a4.dmg * 1 + ax3.dmg * 6 * cons1 + axr3.dmg * 3 * cons1 + e.dmg * 2 + q.dmg * cons6 * qcn ) / 15,
      avg: ( ar1.avg + ar2.avg + ar3.avg + ar4.avg + aw1.avg + aw2.avg + aw3.avg + aw4.avg + a1.avg * 2 + a2.avg * 2 + a3.avg * 2 + a4.avg * 1 + ax3.avg * 6 * cons1 + axr3.avg * 3 * cons1 + e.avg * 2 + q.avg * cons6 * qcn ) / 15
    }
  }
},
{
  title: '重香行班 E融化',
  params: { teamA: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: '重香行班 Q伤害',
    params: { teamA: true , tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q')
  }
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: '重香行班 Q融化',
    params: { teamA: true , tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q', 'melt')
  }
}
]

export const defDmgKey = 'dps'
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  title: '重云天赋：[追冰剑诀] 灵刃·重华叠霜领域消失时唤出灵刃降低敌人[kx]%冰元素抗性',
  check: ({ params }) => params.tfkx === true,
  data: {
    kx: 15
  }
},
{
  title: '重云天赋：[吐纳真定] 处在灵刃·重华叠霜领域内的普通攻击的单手剑,双手剑,长柄武器角色攻击速度提升[_aSpeed]%',
  data: {
    _aSpeed: 8
  }
},
{
  title: '重云2命：[周天运转] 处于重华叠霜领域中获得[_cd]%冷却缩减',
  cons: 2,
  data: {
    _cd: 15
  }
},
{
  title: '重云4命：[浮云霜天] 攻击命中受到冰元素影响的敌人时回复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 1
  }
},
{
  title: '重云6命：[四灵捧圣] 对于生命百分比低于重云的敌人伤害提升[qDmg]%，灵刃增加一柄',
  cons: 6,
  data: {
    qDmg: 15
  }
},
{
  title: '班尼特技能：[美妙旅程] 处于鼓舞领域攻击力提升[atkPlus]点',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPlus: 1202.35
  }
},
{
  title: '班尼特圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]% { 该圣遗物效果不可叠加 }',
  check: ({ params , artis }) => params.teamA === true && artis.昔日宗室之仪 !== 4 ,
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  title: '行秋技能：[古华剑·画雨笼山] 场上角色的抗打断能力提升[_interruption]%受到伤害降低[_reduction]%',
  check: ({ params }) => params.teamA === true,
  data: {
    _interruption: 70 ,
    _reduction: 45.32
  }
},
{
  title: '元素共鸣：[热诚之火] 攻击力提高[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 25
  }
},
'melt',
 {title: '1.5最后修改：[10.17重置] 修复1命效果显示异常'}
]