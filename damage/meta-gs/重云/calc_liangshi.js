import { LSconfig } from '#liangshi'

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
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '灭邪四式'
  c1Name = '一命座'
  eNameT = '云开星落'
  qNameT = '重华叠霜'
 } else if ( NamePath == 3 ) {
  eNameT = '云开星落'
  qNameT = '重华叠霜'
 } else if ( NamePath == 4 ) {
  eName = '元素战技'
  qName = '元素爆发'
  eNameT = '元素战技'
  qNameT = '元素爆发'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a3Name = '下落'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
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
const miss = ['z', 'c', 'f', 'h', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs36ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[重云] 排名规则均未命中，已选择默认排名规则')
      ranking = 'e'
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
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}四段伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a')
},
{
  title: `${aName}四段融化`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['四段伤害'], 'a', 'melt')
},
{
  title: `${eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}融化伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `${qName} ${count}柄灵刃总伤害`,
    params: { tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q')
  }
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `${qName} ${count}柄灵刃融化`,
    params: { tfkx: true },
    dmgKey: 'q',
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q', 'melt')
  }
},
{
  title: `重香行班 ${eNameT}融化`,
  params: { teamA: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'melt')
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `重香行班 ${qNameT}伤害`,
    params: { teamA: true , tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q')
  }
},
 ({ cons }) => {
  let count = cons === 6 ? 4 : 3
  return {
    title: `重香行班 ${qNameT}融化`,
    params: { teamA: true , tfkx: true },
    dmg: ({ talent, cons }, dmg) => dmg(talent.q['技能伤害'] * count, 'q', 'melt')
  }
}]

export const defDmgKey = `${ranking}`
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
  title: '元素共鸣：[热诚之火] 攻击力提高[atkPct]%',
  check: ({ params }) => params.teamA === true,
  sort: 1,
  data: {
    atkPct: 25
  }
},
'melt',
 {title: `2.28最后修改：[10.17重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs36ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]
