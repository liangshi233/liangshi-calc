import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs3ranking = cfg.gs3ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '风压剑'
let eNameT = 'E'
let qName = '蒲公英之风'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '西风剑术'
  eNameT = '风压剑'
  qNameT = '蒲公英之风'
 }  else if ( NamePath == 3 ) {
  eNameT = '风压剑'
  qNameT = '蒲公英之风'
 }  else if ( NamePath == 4 ) {
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
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['a', 'c', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs3ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'h'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'h'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[琴] 排名规则均未命中，已选择默认排名规则')
      ranking = 'h'
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
  ranking = `${gs3ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'phy')
},
{
  title: `${eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `长按${eName}伤害`,
  check: ({ cons }) => cons >= 1,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${qName}爆发伤害`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['爆发伤害'], 'q')
},
{
  title: `${qName}领域伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['出入领域伤害'], 'q')
},
{
  title: `${qName}爆发治疗`,
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['领域发动治疗量2'][0] * calc(attr.atk) / 100 + talent.q['领域发动治疗量2'][1] * 1)
},
{
  title: `${qName}持续治疗`,
  dmg: ({ talent, calc, attr }, { heal }) => heal(talent.q['持续治疗2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗2'][1] * 1)
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
}]

export const mainAttr = 'atk,cpct,cdmg'
export const defDmgKey = `${ranking}`
export const enemyName = '魔偶/女士/雷神'

export const buffs = [
{
  title: '琴天赋：[顺风而行] 普通攻击命中时，有50%的几率为队伍中所有角色恢复生命值'
},
{
  title: '琴天赋：[听凭风引] 使用蒲公英之风后，恢复[_energyeveryPct]%元素能量.',
  data: {
    _energyeveryPct: 20
  }
},
{
  title: '琴1命：[流转剑脊的暴风] 风压剑长按超过1秒后，提升牵引速度，并使造成的伤害提升[eDmg]%',
  check: ({ params }) => params.e === true,
  cons: 1,
  data: {
    eDmg: 40
  }
},
{
  title: '琴2命：[守护众人的坚盾] 获得元素晶球或元素微粒时，队伍中所有角色获得[_aSpeed]%攻击速度和[_jSpeed]%移动速度提升',
  cons: 2,
  data: {
    _aSpeed: 15,
    _jSpeed: 15
  }
},
{
  title: '琴4命：[蒲公英的国土] 在蒲公英之风的领域内，所有敌人的风元素抗性下降[kx]%',
  check: ({ params }) => params.q === true,
  cons: 4,
  data: {
    kx: 40
  }
},
{
  title: '琴6命：[恩眷万民的狮牙] 在蒲公英之风的领域内，角色受到的伤害降低[_reduction]%',
  cons: 6,
  data: {
    _reduction: 35
  }
},
{title: `6.10最后修改：[12.7重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs3ranking} 更新日志:${renew} 其他信息:${information}`}]
