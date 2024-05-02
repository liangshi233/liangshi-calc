import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs93ranking = cfg.gs93ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '朝起鹤云'
let e2Name = '步天梯'
let eNameT = 'E'
let qName = '暮集竹星'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '清风散花词'
  eNameT = '朝起鹤云'
  qNameT = '暮集竹星'
 } else if ( NamePath == 3 ) {
  eNameT = '朝起鹤云'
  qNameT = '暮集竹星'
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
const miss = ['a', 'z', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs93ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'c'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'c'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'c'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[闲云] 排名规则均未命中，已选择默认排名规则')
      ranking = 'c'
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
 ranking = `${gs93ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: '仙力助推下落攻击伤害提升值',
  dmgKey: 'f',
  dmg: ({ calc, attr, cons }) => {
    let cons2 = cons * 1 >= 2 ? 2 : 1
    return {
      avg: Math.min( calc(attr.atk) * 200 / 100 , 9000 ) * cons2
    }
  }
},
{
  title: `${e2Name}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}一段跳伤害`,
  params: { btt: 1 },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][0], 'a3')
},
{
  title: `${eName}二段跳伤害`,
  params: { btt: 2 },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][1], 'a3')
},
{
  title: `${eName}三段跳伤害`,
  dmgKey: 'c',
  params: { btt: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['闲云冲击波伤害'][2], 'a3')
},
{
  title: `${qName}释放伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}协同伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['竹星伤害'], 'q')
},
{
  title: `${qName}释放治疗`,
  dmgKey: 'h',
  dmg: ({ attr, calc, talent, cons }, { heal }) => {
    let num = talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1
    return heal(num)
  }
},
{
  title: `${qName}持续治疗`,
  dmgKey: 'undefined',
  dmg: ({ attr, calc, talent, cons }, { heal }) => {
    let num = talent.q['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.q['持续治疗量2'][1] * 1
    return heal(num)
  }
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
}]

export const defParams = { soda: 1 }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [
{
  title: '闲云天赋：[霜翎高逐祥风势] 朝起鹤云的闲云冲击波命中[buffCount]个敌人,使角色的下落攻击的暴击率提升[a3Cpct]%',
  data: {
    buffCount: ({ params }) => ( params.enemy == 0 ? 0 : ( params.enemy || 4 ) ) ,
    a3Cpct: ({ params }) => Math.min( 10 , ( params.enemy == 0 ? 0 : ( params.enemy || 4 ) ) * 2 + ( params.enemy == 0 ? 0 : 2 ) )
  }
},
{
  title: '闲云天赋：[细想应是洞中仙] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害提升[a3Plus]',
  sort: 9,
  data: {
    a3Plus: ({ attr, calc }) => Math.min( calc(attr.atk) * 200 / 100 , 9000 )
  }
},
{
  title: '闲云1命：[借风洗尘缘] 朝起鹤云的可用次数增加[_eIncreases]次。',
  cons: 1,
  data: {
    _eIncreases: 1
  }
},
{
  title: '闲云2命：[鹤唳远人间] 施放朝起鹤云后,攻击力提升[atkPct]%',
  sort: 1,
  cons: 2,
  data: {
    atkPct: 20
  }
},
{
  title: '闲云2命：[鹤唳远人间] 暮集竹星的竹星拥有仙力助推时,附近的当前场上角色的下落攻击坠地冲击造成的伤害额外提升[a3Plus]',
  sort: 9,
  cons: 2,
  data: {
    a3Plus: ({ attr, calc }) => Math.min( calc(attr.atk) * 200 / 100 , 9000 )
  }
},
{
  check: ({ params }) => params.btt !== undefined ,
  title: '闲云6命：[知是留云僊] 在一次朝起鹤云的鹤云幻化期间施展了[buffCount]次步天梯后,该次鹤云幻化期间的闲云冲击波的暴击伤害提升[a3Cdmg]%,若暮集竹星的竹星拥有仙力助推,则朝起鹤云不进入冷却',
  cons: 6,
  data: {
    buffCount: ({ params }) => ( params.btt == 0 ? 0 : ( params.btt || 0 ) ) ,
    a3Cdmg: ({ params }) => ( 5 / 3 ) * Math.pow( ( params.btt == 0 ? 0 : ( params.btt || 0 ) ) , 3 ) - ( 5 / 2 ) * Math.pow( ( params.btt == 0 ? 0 : ( params.btt || 0 ) ) , 2 ) + ( 95 / 6 ) * ( params.btt == 0 ? 0 : ( params.btt || 0 ) )
  }
},
 {title: `4.11最后修改：[12.18重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs93ranking} 更新日志:${renew} 其他信息:${information}`}]

