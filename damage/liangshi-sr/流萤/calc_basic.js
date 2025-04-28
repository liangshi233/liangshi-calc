import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1310ranking = cfg.sr1310ranking
let aName = '普通攻击'
let a2Name = '强化普攻'
let eName = '指令-天火轰击'
let e2Name = '指令-天火轰击'
let eNameT = 'E'
let e2NameT = '强化E'
let qName = '火萤Ⅳ型-完全燃烧'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '指令-闪燃推进'
  a2Name = '火萤Ⅳ型-底火斩击'
  eNameT = '指令-天火轰击'
  e2Name = '火萤Ⅳ型-****星过载'
  e2NameT = '火萤Ⅳ型-****星过载'
  qNameT = '火萤Ⅳ型-完全燃烧'
 } else if ( NamePath == 3 ) {
  eNameT = '指令-天火轰击'
  qNameT = '火萤Ⅳ型-完全燃烧'
 } else if ( NamePath == 4 ) {
  a2Name = '强化普攻'
  eName = '战技'
  e2Name = '强化战技'
  e2NameT = '强化战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a2Name = '强化普攻'
  eName = 'E技能'
  e2Name = '强化E技能'
  e2NameT = '强化E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  a2Name = '强化A'
  eName = 'E'
  e2Name = '强化E'
  e2NameT = '强化E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['q', 'z','c','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1310ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'r'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'r'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'r'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[流萤] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr1310ranking}`
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
  title: `${eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${qNameT}后${a2Name}`,
  dmgKey: 'a',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['技能伤害'], 'a')
},
{
  title: `${qNameT}后${e2Name}主目标`,
  dmgKey: 'e',
  params: { q: true , e: true },
  dmg: ({ talent, attr, calc }, { basic }) => basic( calc(attr.atk) * talent.e2['目标伤害'] + Math.min( 360 , calc(attr.stance) ) * 0.2, 'e')
},
{
  title: `${qNameT}后${e2Name}相邻目标`,
  params: { q: true , e: true },
  dmg: ({ talent, attr, calc }, { basic }) => basic( calc(attr.atk) * talent.e2['相邻目标伤害'] + Math.min( 360 , calc(attr.stance) ) * 0.1, 'e')
},
{
  title: `${qNameT}后${e2Name}-精英敌人击破`,
  params: { q: true ,  e: true , toughness: 10 },
  dmg: ({ talent, params, cons }, { reaction }) => {
    return {
      avg: reaction('fireBreak').avg * ( params.toughness + 2 ) / 4
    }
  }
},
{
  check: ({ calc, attr }) => calc(attr.stance) >= 200 ,
  title: `${qNameT}后${a2Name}天赋超击破`,
  params: { toughnessDef: 1.5 , q: true },
  dmg: ({ params , cons , calc, attr }, { reaction }) => {
    return {
      avg: reaction('superBreak').avg * params.toughnessDef * ( cons >= 6 ? 2 : 1.5 ) * ( calc(attr.stance) >= 360 ? 0.5 : 0.35 ) / 0.9
    }
  }
},
{
  check: ({ calc, attr }) => calc(attr.stance) >= 200 ,
  title: `${qNameT}后${e2NameT}天赋超击破`,
  dmgKey: 'r',
  params: { toughnessDef: 3 , q: true , e: true },
  dmg: ({ params , cons , calc, attr }, { reaction }) => {
    return {
      avg: reaction('superBreak').avg * params.toughnessDef * ( cons >= 6 ? 2 : 1.5 ) * ( calc(attr.stance) >= 360 ? 0.5 : 0.35 ) / 0.9
    }
  }
}
]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,dmg,stance'

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '角色状态：[面板属性] 当前攻击力[_atk]，防御力[_def]，生命值[_hp]，速度[_speed]，暴击率[_cpct]%，暴击伤害[_cdmg]%，充能效率[_recharge]%，击破特攻[_stance]%，效果命中[_effPct]%，效果抵抗[_effDef]%，治疗加成[_heal]%，伤害加成[_dmg]%',
  sort: 10,
  data: {
    _atk: ({ calc, attr }) => calc(attr.atk) ,
    _def: ({ calc, attr }) => calc(attr.def) ,
    _hp: ({ calc, attr }) => calc(attr.hp) ,
    _speed: ({ calc, attr }) => calc(attr.speed) ,
    _cpct: ({ calc, attr }) => calc(attr.cpct) ,
    _cdmg: ({ calc, attr }) => calc(attr.cdmg) ,
    _recharge: ({ calc, attr }) => calc(attr.recharge) ,
    _stance: ({ calc, attr }) => calc(attr.stance) ,
    _effPct: ({ calc, attr }) => calc(attr.effPct) ,
    _effDef: ({ calc, attr }) => calc(attr.effDef) ,
    _heal: ({ calc, attr }) => calc(attr.heal) ,
    _dmg: ({ calc, attr }) => calc(attr.dmg)
  }
},
{
  title: '敌人状态：[韧性] 具有[toughness]韧性上限',
  data: {
    toughness: ({ params }) => ( params.toughness || 10 )
  }
},
{
  check: ({ params }) => params.q === true,
  title: '流萤技能：[火萤Ⅳ型-完全燃烧] 「完全燃烧」状态下速度提高[speed]%,使敌方目标受到装甲「萨姆」造成的击破伤害提高[breakEnemydmg]%',
  data: {
    speed: ({ talent }) => talent.q['速度提高'] ,
    breakEnemydmg: ({ talent }) => talent.q['击破伤害提高'] * 100
  }
},
{
  check: ({ calc, attr }) => calc(attr.stance) >= 200 ,
  title: '流萤行迹：[β模组-自限装甲] 攻击处于弱点击破状态下的敌方目标后，会将本次攻击的削韧值转化为1次[buff]%的超击破伤害。',
  tree: 2,
  sort: 9,
  data: {
    buff: ({ calc, attr }) => calc(attr.stance) >= 360 ? 50 : 35
  }
},
{
  check: ({ calc, attr }) => calc(attr.atk) > 1800 ,
  title: '流萤行迹：[γ模组-过载核心] 装甲「萨姆」的攻击力高于1800点，使自身击破特攻提高[stance]%',
  sort: 9,
  tree: 3,
  data: {
    stance: ({ calc, attr }) => Math.floor( ( calc(attr.atk) - 1800 ) / 10 ) * 0.8
  }
},
{
  check: ({ params }) => params.q === true,
  title: '流萤天赋：[茧式源火中枢] 「完全燃烧」状态下，受到的伤害降低[_reduction]%，效果抵抗提高[effDef]%。',
  data: {
    _reduction: ({ talent }) => talent.t['伤害降低'] * 100 ,
    effDef: ({ talent }) => talent.t['效果抵抗提高'] * 100
  }
},
{
  check: ({ params }) => params.e === true,
  title: '流萤1魂：[我曾安眠，赤染之茧] 施放强化战技时无视目标[eIgnore]%的防御，且强化战技不消耗战技点。',
  cons: 1,
  data: {
    eIgnore: 15 ,
    breakIgnore: 15
 }
},
{
  check: ({ params }) => params.q === true,
  title: '流萤4魂：[我会看见，飞萤之火] 「完全燃烧」状态下，装甲「萨姆」的效果抵抗提高[effDef]%',
  cons: 4,
  data: {
    effDef: 50
 }
},
{
  check: ({ params }) => params.q === true,
  title: '流萤6魂：[绽放在终竟的明天] 「完全燃烧」状态下装甲「萨姆」的火属性抗性穿透提高[kx]%',
  cons: 6,
  data: {
    kx: 20
 }
},
{title: `6.22最后修改：[5.4重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1310ranking} 更新日志:${renew} 其他信息:${information}`}]

