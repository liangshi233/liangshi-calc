import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1314ranking = cfg.sr1314ranking
let aName = '普通攻击'
let eName = '恣肆吞併的担保'
let eNameT = 'E'
let qName = '堕此欲渊，立此****'
let qNameT = 'Q'
let tName = '追击'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '挞楚抽薪'
  eNameT = '恣肆吞併的担保'
  qNameT = '堕此欲渊，立此****'
  tName = '剔烁之牙'
 } else if ( NamePath == 3 ) {
  eNameT = '恣肆吞併的担保'
  qNameT = '堕此欲渊，立此****'
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
  tName = 'T'
 }
}
const miss = ['c','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1314ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'z'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'z'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'z'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[翡翠] 排名规则均未命中，已选择默认排名规则')
       ranking = 'z'
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
 ranking = `${sr1314ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}主目标伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['目标伤害'], 'a')
},
{
  title: `${aName}相邻目标伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.a['相邻目标伤害'], 'a')
},
{
  title: `${eName}附加伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['附加伤害'], 'e')
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${tName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'], 't')
},
{
  title: `${qNameT}后${tName}伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.t['技能伤害'] + talent.q['追加攻击倍率提高'], 't')
}]

export const defParams = { dp: 50 }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '翡翠技能：[堕此欲渊，立此****] 天赋的追加攻击获得强化，追加攻击造成的伤害倍率提高[_tPlus]%',
  data: {
    _tPlus: ({ talent }) => talent.q['追加攻击倍率提高'] * 100
  }
},
{
  check: ({ params }) => params.dp !== undefined,
  title: '翡翠行迹：[绝当品] [buffCount]层【当品】，攻击力提高[atkPct]%。',
  tree: 3,
  data: {
    buffCount: ({ params }) => params.dp ,
    atkPct: ({ params }) => params.dp * 0.5
  }
},
{
  check: ({ params }) => params.dp !== undefined,
  title: '翡翠天赋：[剔烁之牙] [buffCount]层【当品】使暴击伤害提高[cdmg]%。',
  data: {
    buffCount: ({ params }) => params.dp ,
    cdmg: ({ params , talent }) => Math.min( 50 , params.dp ) * talent.t['每层爆伤提高'] * 100
  }
},
{
  title: '翡翠1魂：[无私？亦可交割] 天赋的追加攻击伤害提高[tDmg]%',
  cons: 1,
  data: {
    tDmg: 20
 }
},
{
  check: ({ params }) => params.dp >= 15,
  title: '翡翠2魂：[道德？谨此核押] 暴击率提高[cpct]%',
  cons: 2,
  data: {
    cpct: 18
 }
},
{
  title: '翡翠4魂：[真诚？唯凭认沽] 施放终结技时，造成的伤害无视敌方目标[ignore]%的防御力',
  cons: 4,
  data: {
    ignore: 12
 }
},
{
  title: '翡翠6魂：[****仍须保荐] 场上有【****】状态的角色时，量子属性抗性穿透提高[kx]%',
  cons: 6,
  data: {
    kx: 20
 }
},
{title: `5.4最后修改：[5.4重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1314ranking} 更新日志:${renew} 其他信息:${information}`}]
