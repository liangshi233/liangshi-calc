import { Format } from '../../../../../plugins/liangshi-calc/components/index.js'
import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let aName = '普通攻击'
let eName = '梦游鱼'
let eNameT = 'E'
let qName = '一人千役'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '独角戏'
  eNameT = '梦游鱼'
  qNameT = '一人千役'
 } else if ( NamePath == 3 ) {
  eNameT = '梦游鱼'
  qNameT = '一人千役'
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
const miss = ['z','c','e','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
 if ( rankingOnePath == 'm' )  {
 ranking = 'f'
} else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' )  {
    ranking = 'f'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' )  {
      ranking = 'f'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[花火] 排名规则均未命中，已选择默认排名规则')
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
let renew = '2.29-修复对非浮点数进行排名导致的undefined问题'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: `${qNameT}满层${aName}伤害`,
  dmgKey: 'a',
  params: { migui: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: `${eName}目标爆伤提高`,
  dmgKey: 'f',
  dmg: ({ attr, calc, talent, cons }) => {
    return {
      avg: ( calc(attr.cdmg) * ( talent.e['百分比爆伤'] + ( cons * 1 >= 6 ? 0.3 : 0 ) ) + talent.e['额外爆伤'] * 100 ),
      unit: '%'
    }
  }
},
{
  title: `${qName}每层Buff加伤`,
  dmg: ({ talent }) => {
    return {
      avg: Format.percent(talent.q['天赋增伤每层额外提高'] + talent.t['伤害提高']),
      type: 'text'
    }
  }
},
{
  title: `${qName}满层Buff加伤`,
  params: { migui: 3 },
  dmg: ({ talent }) => {
    return {
      avg: Format.percent( ( talent.q['天赋增伤每层额外提高'] + talent.t['伤害提高'] ) * 3 ),
      type: 'text'
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  title: '花火技能：[一人千役] [buffCount]层【谜诡】,使我方所有角色造成伤害额外提高[dmg]%',
  data: {
    buffCount: ({ params }) => ( params.migui || 0 ),
    dmg: ({ params , talent }) => ( params.migui || 0 ) * talent.q['天赋增伤每层额外提高']
  }
},
{
  title: '花火天赋：[叙述性诡计] [buffCount]层【谜诡】,使我方所有角色造成伤害提高[dmg]%',
  data: {
    buffCount: ({ params }) => ( params.migui || 0 ) ,
    dmg: ({ params , talent }) => ( params.migui || 0 ) * talent.t['伤害提高']
  }
},
{
  title: '花火行迹：[岁时记] 施放普攻时,额外恢复[_energyevery]点能量。',
  tree: 1,
  data: {
    _energyevery: 10
  }
},
{
  title: '花火行迹：[夜想曲] 我方全体暴击率提升[cpct]%,我方队伍中存在3名量子属性角色，量子属性伤害提升[dmg]%',
  tree: 3,
  data: {
    cpct: 5 ,
    dmg: 30
  }
},
{
  title: '花火1魂：[悬置怀疑] 持有【谜诡】的我方目标速度提高[speedPct]%',
  cons: 1,
  data: {
    speedPct: 12
 }
},
{
  title: '花火2魂：[虚构无端] 天赋造成的伤害提高效果的可叠加层数增加1层,使我方目标造成伤害时无视目标[ignore]%的防御力',
  cons: 2,
  data: {
    ignore: ({ params }) => ( params.migui || 0 ) * 8
 }
},
{
  title: '花火6魂：[多重解答] 战技的暴击伤害效果额外提升[_eCdmg]%',
  cons: 6,
  data: {
    _eCdmg: 30
 }
},
{title: `2.29最后修改：[12.30重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 更新日志:${renew} 其他信息:${information}`}]
