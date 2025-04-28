import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1220ranking = cfg.sr1220ranking
let aName = '普通攻击'
let eName = '钺贯'
let eNameT = 'E'
let qName = '凿破大荒'
let qNameT = 'Q'
let tName = '追击'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '闪裂'
  eNameT = '钺贯'
  qNameT = '凿破大荒'
  tName = '雷狩'
 } else if ( NamePath == 3 ) {
  eNameT = '钺贯'
  qNameT = '凿破大荒'
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
if (!cfg.sr1220ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'z'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'z'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'z'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[飞霄] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr1220ranking}`
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
  title: `${eName}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${qName}最多造成伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['最多造成伤害'], 'q')
},
{
  title: `${qName}结束伤害`,
  params: { cons1: true },
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['最后造成伤害'], 'q')
},
{
  title: `${tName}追加伤害`,
  dmgKey: 'z',
  dmg: ({ talent, cons }, dmg) => {
    let talentConfig = cons >= 6 ? 'q,t' : 't'
    let tdmg = dmg(talent.t['追加攻击伤害'], `${talentConfig}`)
    return tdmg
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '飞霄天赋：[雷狩] 发动此攻击时使自身造成的伤害提高[dmg]%',
  data: {
    dmg: ({ talent }) => talent.t['造成伤害提高'] * 100
 }
},
{
  title: '飞霄行迹：[解形] 追加攻击的暴击伤害提高[tCpct]%',
  tree: 2,
  data: {
    tCpct: 36
  }
},
{
  title: '飞霄行迹：[电举] 施放战技时，攻击力提高[atkPct]%',
  tree: 3,
  data: {
    atkPct: 48
  }
},
{
  check: ({ params }) => params.cons1 === true,
  title: '飞霄1魂：[镇绥天钧] 发动【闪裂刃舞】或【钺贯天冲】后，使终结技伤害额外提高[qPlus]',
  cons: 1,
  data: {
    qPlus: ({ talent, attr, calc }) => calc(attr.atk) * talent.q['最后造成伤害'] * 50 / 100
 }
},
{
  title: '飞霄4魂：[驱飓听冰] 发动天赋的追加攻击时使自身速度提高[speedPct]%',
  cons: 4,
  data: {
    speedPct: 8
 }
},
{
  title: '飞霄6魂：[惟首正丘] 终结技伤害的全属性抗性穿透提高[qKx]%天赋的追加攻击伤害同时视为终结技伤害，并且伤害提高[tPlus]',
  cons: 6,
  data: {
    qKx: 20,
    tPlus: ({ attr, calc }) => calc(attr.atk) * 140 / 100
 }
},
{title: `5.4最后修改：[5.4重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1220ranking} 更新日志:${renew} 其他信息:${information}`}]
