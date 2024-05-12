import { Format, LSconfig } from '#liangshi'

let eDmg = { dmg: 0 , avg: 0 }
let cfg = LSconfig.getConfig('user', 'config')
let Technique = cfg.technique
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr8006ranking = cfg.sr8006ranking
let aName = '普通攻击'
let eName = '中场馈赠的雨'
let eNameT = 'E'
let qName = '喧嚣的舞灯巡游'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '摇摆的礼仪'
  eNameT = '中场馈赠的雨'
  qNameT = '喧嚣的舞灯巡游'
 } else if ( NamePath == 3 ) {
  eNameT = '中场馈赠的雨'
  qNameT = '喧嚣的舞灯巡游'
 } else if ( NamePath == 4 ) {
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['z','c','h', 'y', 'hph', 'hps', 'dph', 'dps']
let ranking = 'undefined'
if (!cfg.sr8001ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'f'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'f'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'f'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[开拓者·同谐] 排名规则均未命中，已选择默认排名规则')
      ranking = 'f'
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
 ranking = `${sr8006ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: `单目标${aName}超击破`,
  params: { toughnessDef: 1 , q: true },
  dmg: ({ params , trees }, { reaction }) => {
    return {
      avg: reaction('iceBreak').avg * params.toughnessDef * ( trees['103'] ? 1.6 : 1 ) / 0.9
    }
  }
},
{
  title: `${eName}指定伤害`,
  dmgKey: 'undefined',
  params: { e: true },
  dmg: ({ talent }, dmg) => {
   eDmg = dmg(talent.e['技能伤害'], 'e')
   return eDmg
  }
},
{
  title: `${eName}完整伤害`,
  dmgKey: 'e',
  dmg: ({ talent , cons }, dmg) => {
   let e1dmg = eDmg
   let cons6 = cons * 1 >= 6 ? 6 : 4
   let e2dmg = dmg(talent.e['技能伤害'], 'e')
     return {
       dmg: e1dmg.dmg + e2dmg.dmg * cons6 ,
       avg: e1dmg.avg + e2dmg.avg * cons6
     }
  }
},
{
  title: `单目标${eName}完整超击破`,
  dmgKey: 'r',
  params: { toughnessDef: 1 , q: true },
  dmg: ({ params , cons , trees }, { reaction }) => {
    let cons6 = cons * 1 >= 6 ? 7 : 5
    return {
      avg: /*没有超击破，拿冰击破模拟一下*/ reaction('iceBreak').avg * ( params.toughnessDef * cons6 ) * ( trees['103'] ? 1.6 : 1 ) / 0.9
    }
  }
},
{
  title: `${qName}提升击破特攻`,
  dmgKey: 'q',
  dmg: ({ talent }) => {
    return {
      avg: Format.percent( talent.q['技能伤害'] ) ,
      type: 'text'
    }
  }
},
{
  title: '队友击破特攻提高',
  dmgKey: 'f',
  dmg: ({ talent, attr, calc, cons }) => {
    return {
      avg: Format.percent( ( calc(attr.stance) * 0.15 ) * ( cons * 1 >= 4 ? 1 : 0 ) / 100 + talent.q['技能伤害'] ) ,
      type: 'text'
    }
  }
}]

export const mainAttr = 'atk,cpct,cdmg,stance'
export const defDmgKey = `${ranking}`
export const defParams = { technique: `${Technique}` }

export const buffs = [
{
  title: '敌人状态：[韧性] 具有[toughness]韧性',
  data: {
    toughness: ({ params }) => params.toughness == 0 ? 0 : ( params.toughness || 0 )
  }
},
{
  check: ({ params }) => params.technique >= 1,
  title: '开拓者秘技：[即刻！独奏团] 战斗开始时使我方全体的击破特攻提高[stance]%',
  data: {
    stance: 30
  }
},
{
  check: ({ params }) => params.q === true,
  title: '开拓者技能：[喧嚣的舞灯巡游] 持有【伴舞】的我方目标击破特攻提高[stance]%',
  data: {
    stance: ({ talent }) => talent.q['技能伤害'] * 100
  }
},
{
  title: '开拓者天赋：[全屏段的高空踏歌] 当有敌方目标的弱点被击破时，立即恢复[_energyevery]点能量。',
  data: {
    _energyevery: ({ talent }) => talent.t['能量恢复']
  }
},
{
  check: ({ params }) => params.e === true,
  title: '开拓者行迹：[随波逐流] 战技造成的第一次削韧伤害额外提高[eDmg]%',
  tree: 2,
  data: {
    eDmg: 100
  }
},
{
  check: ({ params }) => params.q === true,
  title: '开拓者行迹：[卫我起舞] 若敌方目标数量1个时，【伴舞】效果触发的击破伤害提高[_dmg]%',
  tree: 3,
  data: {
    _dmg: 60
  }
},
{
  title: '开拓者1魂：[您的最佳观众席] 施放首次战技后立即回复[skillPoints]点战技点。',
  cons: 1,
  data: {
    skillPoints: 1
  }
},
{
  title: '开拓者2魂：[越狱的跨洋彩虹] 战斗开始时，开拓者的能量恢复效率提高[recharge]%',
  cons: 2,
  data: {
    recharge: 25
  }
},
{
  title: '开拓者6魂：[越狱的跨洋彩虹] 战技的额外伤害次数增加2次。',
  cons: 6
},
{title: `3.26最后修改：[3.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr8006ranking} 更新日志:${renew} 其他信息:${information}`}]
