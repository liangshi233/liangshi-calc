import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs65ranking = cfg.gs65ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '越祓雷草之轮'
let eNameT = 'E'
let qName = '御咏鸣神刈山祭'
let qNameT = 'Q'
let c4Name = '四命'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '忍流飞刃斩'
  c4Name = '四命座'
  eNameT = '越祓雷草之轮'
  qNameT = '御咏鸣神刈山祭'
 } else if ( NamePath == 3 ) {
  eNameT = '越祓雷草之轮'
  qNameT = '御咏鸣神刈山祭'
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
  c4Name = 'C4'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['a','z', 'c', 'f', 'y','dph','dps','hph','hps']
let ranking = 'undefined'
if (!cfg.gs65ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'r'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'r'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'r'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[久岐忍] 排名规则均未命中，已选择默认排名规则')
      ranking = 'r'
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
 ranking = `${gs65ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: '超绽放伤害',
  dmgKey: 'r',
  dmg: ({ calc, attr }, { reaction }) => {
    return reaction('hyperBloom')
  }
},
{
  title: `${eName}释放伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}每跳伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['越祓草轮伤害'], 'e')
},
{
  title: `${eName}每跳超激化`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['越祓草轮伤害'], 'e', 'aggravate')
},
{
  check: ({ cons }) => cons >= 4,
  title: `${c4Name}雷草标伤害`,
  dmg: ({ attr , talent , calc }, { basic }) => {
  let c4Dmg = basic( calc( attr.hp ) * ( 9.7 / 100 ), '')
  return c4Dmg
  }
},
{
  title: `${eName}每跳治疗`,
  dmgKey: 'h',
  dmg: ({ talent, calc, attr }, { heal }) => {
    let ec = talent.e['越祓草轮治疗量2']
    return heal(calc(attr.hp) * ec[0] / 100 + ec[1] * 1 + calc(attr.mastery) * 0.75)
  }
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent, calc, attr }, { basic }) => basic(talent.q['单次伤害'] * calc(attr.hp) / 100, 'q')
},
{
  title: '草行久 超绽放',
  params: { teamA: true },
  dmg: ({ calc, attr }, { reaction }) => {
    return reaction('hyperBloom')
  }
}]

export const defParams = { soda: 1 }
export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,atk,cpct,cdmg,mastery'

export const buffs = [
{
  title: '久岐忍技能：[御咏鸣神刈山祭] 施放时，若生命值不高于50%时，结界的持续时间将会延长[_qSustainedPlus]秒',
  data: {
    _qSustainedPlus: 1
  }
},
{
  title: '久岐忍天赋：[破笼之志] 生命值不高于50%时，治疗加成提升[heal]%',
  data: {
    heal: 15
  }
},
{
  title: '久岐忍天赋：[安心之所] 越祓雷草之轮将获得[_heal]治疗量值,[ePlus]伤害值提升',
  data: {
    _heal: ({ attr, calc }) => calc(attr.mastery) * 0.75 ,
    ePlus: ({ attr, calc }) => calc(attr.mastery) * 0.25
  }
},
{
  title: '久岐忍2命：[割舍侥幸之心] 越祓草轮的持续时间延长[_eSustainedPlus]秒',
  cons: 2
  data: {
    _eSustainedPlus: 3
  }
},
{
  title: '久岐忍4命：[割舍封闭之心] 处于越祓草轮状态下的角色，在普通攻击、重击或下落攻击命中敌人时，雷草标将落在敌人所在的位置造成雷元素范围伤害。',
  cons: 4
},
{
  title: '久岐忍6命：[卓越的血脉] 久岐忍的生命值降至25%以下,或承受足以使她倒下的伤害时，会提升自身[_mastery]点精通 { 此效果不会参与伤害计算 }',
  cons: 6,
  data: {
    _mastery: 150
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '纳西妲天赋：[净善摄受明论] 依据队伍中元素精通最高的角色的元素精通,提高领域内当前场上角色的元素精通[mastery]点',
  sort: 7,
  data: {
    mastery: 250
  }
},
{
  check: ({ params , artis }) => params.teamA === true && artis.深林的记忆 !== 4 ,
  title: '纳西妲圣遗物：[深林的记忆4] 元素战技或元素爆发命中敌人后,使命中目标的草元素抗性降低[kx]%',
  data: {
    kx: 30
  }
},
{
  check: ({ cons , params }) => params.teamA === true && cons >= 6 ,
  title: '纳西妲武器：[千夜浮梦-精1] 队伍中装备者以外的附近角色的元素精通提升[mastery]点',
  sort: 1,
  data: {
    mastery: 40
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
{title: `5.3最后修改：[3.8重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs65ranking} 更新日志:${renew} 其他信息:${information}`}]

