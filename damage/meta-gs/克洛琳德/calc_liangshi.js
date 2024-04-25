import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs98ranking = cfg.gs98ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '狩夜之巡'
let eNameT = 'E'
let qName = '残光将终'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '逐影之誓'
  eNameT = '狩夜之巡'
  qNameT = '残光将终'
 } else if ( NamePath == 3 ) {
  eNameT = '狩夜之巡'
  qNameT = '残光将终'
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
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['z','c', 'h', 'f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs98ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'a'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'a'
   }  else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'a'
     }  else if (miss.includes(rankingThreePath)) {
      logger.mark('[克洛琳德] 排名规则均未命中，已选择默认排名规则')
      ranking = 'a'
     }  else {
       ranking = `${rankingThreePath}`
     }
   }  else {
     ranking = `${rankingTwoPath}`
   }
 } else {
  ranking = `${rankingOnePath}`
 }
} else {
 ranking = `${gs98ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eNameT}后${aName}射击`,
  dmgKey: 'undefined',
  params: { blPct: 0.5 },
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.e['驰猎伤害2'][0], 'a')
},
{
  title: `${eNameT}后${aName}穿透射击`,
  dmgKey: 'a',
  dmg: ({ talent, attr , cons }, dmg ) => dmg(talent.e['驰猎伤害2'][1], 'a')
},
{
  title: `${eName}贯夜突进伤害`,
  params: { blPct: 0 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][0], 'e')
},
{
  title: `${eName}强化贯夜伤害`,
  params: { blPct: 0.5 },
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][1], 'e')
},
{
  title: `${eName}贯夜·契令`,
  dmgKey: 'e',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.e['贯夜伤害2'][2], 'e')
},
{
  check: ({ cons }) => cons >= 1,
  title: '夜巡之影协同攻击',
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 30 / 100, 'a')
},
{
  check: ({ cons }) => cons >= 6,
  title: '明烛之影追击伤害',
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 200 / 100, 'a')
},
{
  title: `${qName}单段伤害`,
  dmgKey: 'q',
  dmg: ({ talent, attr }, dmg ) => dmg(talent.q['技能伤害'], 'q')
}]

export const defParams = { blPlus: 0 , blPct: 1 }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
{
  title: '角色状态：[生命之契] 当前拥有[_BondOfLife]%生命值上限的生命之契',
  data: {
     _BondOfLife: ({ talent , params , weapon }) => Math.min( ( params.blPct * ( talent.q['赋予生命之契'] + 35 + params.blPlus + ( weapon.name === '海渊终曲' ? 25 : 0 ) ) ) , 200 )
  }
},
{
  title: '克洛琳德天赋：[破夜的明焰] 队伍中附近的角色对敌人触发雷元素相关反应后，提升普通攻击与残光将终造成的雷元素伤害[aPlus]%',
  data: {
    aPlus: ({ attr, calc }) => Math.min( ( calc(attr.atk) * 17 / 100 * 3 ) , 1530 ),
    qPlus: ({ attr, calc }) => Math.min( ( calc(attr.atk) * 17 / 100 * 3 ) , 1530 )
  }
},
{
  check: ({ talent , params , weapon }) => ( params.blPct * ( talent.q['赋予生命之契'] + 35 + params.blPlus + ( weapon.name === '海渊终曲' ? 25 : 0 ) ) ) >= 100 ,
  title: '克洛琳德天赋：[契令的酬偿] 生命之契的数值提升或降低时，暴击率提升[cpct]% ',
  data: {
    cpct: 10 * 2
  }
},
{
  title: '克洛琳德1命：[「自此，行过烛影之帷」] 狩夜之巡的夜巡状态持续期间，普通攻击造成的雷元素伤害命中敌人时，将在敌人附近唤出夜巡之影进行两次协同攻击',
  cons: 1
},
{
  title: '克洛琳德2命：[「自此，直面长夜之危」] 队伍中附近的角色对敌人触发雷元素相关反应后，普通攻击与残光将终造成的雷元素伤害再提升[aPlus]%,处于3层状态下时，抗打断能力提升[interruption]%',
  cons: 2,
  data: {
    aPlus: ({ attr, calc }) => Math.min( ( calc(attr.atk) * 7 / 100 * 3 ) , 630 ),
    qPlus: ({ attr, calc }) => Math.min( ( calc(attr.atk) * 7 / 100 * 3 ) , 630 ),
    interruption: 70
  }
},
{
  title: '克洛琳德4命：[「铭记泪，生命与仁爱」] 当前拥有[_BondOfLife]%生命值上限的生命之契，残光将终造成的伤害提升[qDmg]',
  cons: 4,
   data: {
     _BondOfLife: ({ talent , params , weapon }) => Math.min( ( params.blPct * ( talent.q['赋予生命之契'] + 35 + params.blPlus + ( weapon.name === '海渊终曲' ? 25 : 0 ) ) ) , 200 ) ,
     qDmg: ({ talent , params , weapon }) => Math.min( ( Math.min( ( params.blPct * ( talent.q['赋予生命之契'] + 35 + params.blPlus + ( weapon.name === '海渊终曲' ? 25 : 0 ) ) ) , 200 ) * 2 ) , 200 )
   }
},
{
  title: '克洛琳德6命：[「为此，勿将希望弃扬」] 施放狩夜之巡后暴击率提高[cpct]%,暴击伤害提高[cdmg]%,夜巡状态持续期间受到的伤害降低[_reduction]%，抗打断能力提高[interruption]%，明烛之影会追击敌人造成雷元素伤害',
  cons: 6,
  data: {
    cpct: 10 ,
    cdmg: 70 ,
    _reduction: 80 ,
    interruption: 100
  }
},
{title: `4.24最后修改：[4.24重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs98ranking} 更新日志:${renew} 其他信息:${information}`}]

