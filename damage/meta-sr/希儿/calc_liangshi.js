import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1102ranking = cfg.sr1102ranking
let aName = '普通攻击'
let eName = '归刃'
let eNameT = 'E'
let qName = '乱蝶'
let qNameT = 'Q'
let c6Name = '六魂'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '强袭'
  c6Name = '六星魂'
  eNameT = '归刃'
  qNameT = '乱蝶'
 } else if ( NamePath == 3 ) {
  eNameT = '归刃'
  qNameT = '乱蝶'
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
  c6Name = 'c6'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['z','c','f','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1102ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'q'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'q'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[希儿] 排名规则均未命中，已选择默认排名规则')
       ranking = 'q'
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
 ranking = `${sr1102ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: `再现 ${aName}伤害`,
  dmgKey: 'a',
  params: { Attack: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a')
},
{
  title: `${eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `再现 ${eName}伤害`,
  dmgKey: 'e',
  params: { Attack: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${qName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `再现 ${qName}伤害`,
  dmgKey: 'q',
  params: { Attack: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  check: ({ cons }) => cons >= 6,
  title: `${c6Name} ${qName}附加伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'] * 0.15 , 'q')
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgIdx = `${ranking}`

export const buffs = [
{
  check: ({ params }) => params.Attack === true,
  title: '希儿天赋：[再现] 施放普攻、战技、终结技消灭敌方目标时立即获得1个额外回合并进入增幅状态，增幅状态下施放攻击造成的伤害提高[dmg]%',
  data: {
   dmg: ({ talent }) => talent.t['伤害提高'] * 100
  }
},
{
  title: '希儿行迹：[夜行] 增幅状态下的量子属性抗性穿透提高[kx]%',
  tree: 2,
  data: {
    kx: 20
  }
},
{
  title: '希儿技能：[归刃] 使速度提高[speedPct]%',
  maxCons: 1,
  data: {
    speedPct: 25
  }
},
{
  title: '希儿1魂：[斩尽] 对当前生命值百分比小于等于80%的敌方目标造成伤害时，暴击率提高[cpct]%',
  cons: 1,
  data: {
    cpct: 15
  }
},
{
  title: '希儿2魂：[蝶舞] 战技的加速效果可以叠加，使速度提高[speedPct]%',
  cons: 2,
  data: {
    speedPct: 50
  }
},
{
  title: '希儿4魂：[掠影] 消灭敌方目标时，自身恢复[_energyevery]点能量。',
  cons: 4,
  data: {
    _energyevery: 15
  }
},
{
  title: '希儿6魂：[离析] 施放终结技后使受到攻击的敌方单体陷入【乱蝶】状态。【乱蝶】状态下的敌方目标受到攻击后，额外受到1次量子属性附加伤害。',
  cons: 6
},
{title: `3.21最后修改：[3.21重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1102ranking} 更新日志:${renew} 其他信息:${information}`}]

