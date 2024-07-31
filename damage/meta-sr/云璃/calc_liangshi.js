import { Format, LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1221ranking = cfg.sr1221ranking
let aName = '普通攻击'
let eName = '飞铗震赫'
let eNameT = 'E'
let qName = '剑为地纪，刃惊天宗'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '翻风转日'
  eNameT = '飞铗震赫'
  qNameT = '剑为地纪，刃惊天宗'
 } else if ( NamePath == 3 ) {
  eNameT = '飞铗震赫'
  qNameT = '剑为地纪，刃惊天宗'
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
const miss = ['c','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1221ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'q'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'q'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[云璃] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr1221ranking}`
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
  title: `${eName}主目标伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['目标伤害'], 'e')
},
{
  title: `${eName}相邻目标伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'e')
},
{
  title: `${eName}生命恢复`,
  dmgKey: 'undefined',
  dmg: ({ calc, attr, talent }, { heal }) => heal( calc(attr.hp) * talent.e['回复·百分比生命'] + talent.e['回复·固定值'] * 1 )
},
{
  title: '反击伤害主目标',
  params: { cons2: true },
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.t['反击·目标伤害'], 't')
},
{
  title: `${qName}勘破•斩伤害`,
  params: { cons1: true , cons2: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['反击·目标伤害'], 'q,t')
},
{
  title: `${qName}勘破•斩相邻伤害`,
  params: { cons1: true , cons2: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['反击·相邻目标伤害'], 'q,t')
},
{
  title: `${qName}勘破•灭额外伤害`,
  params: { cons2: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['勘破灭·随机伤害'], 'q,t')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,speed'

export const buffs = [
{
  check: ({ params }) => params.cons2 === true,
  title: '云璃技能：[剑为地纪，刃惊天宗] 【格挡】状态期间云璃造成的暴击伤害提高[cdmg]%',
  data: {
    cdmg: ({ talent }) => talent.q['暴击伤害提高'] * 100
  }
},
{
  title: '云璃行迹：[却邪] 【格挡】状态下抵抗受到的控制类负面效果，并使受到的伤害降低[_reduction]%',
  tree: 2,
  data: {
    _reduction: 20
  }
},
{
  title: '云璃行迹：[真刚] 施放反击时，云璃的攻击力提高[atkPct]%',
  tree: 3,
  data: {
    atkPct: 30
  }
},
{
  check: ({ params }) => params.cons1 === true,
  title: '云璃1魂：[沉锋离垢] 【勘破•斩】与【勘破•灭】造成的伤害提高[qDmg]%，【勘破•灭】的额外伤害段数增加3次。',
  cons: 1,
  data: {
    qDmg: 20
  }
},
{
  check: ({ params }) => params.cons2 === true,
  title: '云璃2魂：[初芒破生] 发动反击造成伤害时无视敌方目标[ignore]%的防御力。',
  cons: 2,
  data: {
    ignore: 20
  }
},
{
  title: '云璃4魂：[大匠击橐] 发动【勘破•斩】或【勘破•灭】后使自身效果抵抗提高[effDef]%',
  cons: 4,
  data: {
    effDef: 50
  }
},
{
  check: ({ params }) => params.cons2 === true,
  title: '云璃6魂：[剑胆琴心] 发动【勘破•斩】或【勘破•灭】造成伤害时暴击率提高[cpct]%，物理属性抗性穿透提高[kx]%',
  cons: 6,
  data: {
    cpct: 15,
    kx: 20
  }
},
{title: `7.31最后修改：[6.18重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1221ranking} 更新日志:${renew} 其他信息:${information}`}]
