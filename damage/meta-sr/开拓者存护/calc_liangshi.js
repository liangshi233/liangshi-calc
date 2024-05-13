import { Format, LSconfig } from '#liangshi'

let a3Dmg = { dmg: 0 , avg: 0 }
let ar3Dmg = { dmg: 0 , avg: 0 }
let q1Dmg = { dmg: 0 , avg: 0 }
let q2Dmg = { dmg: 0 , avg: 0 }
let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr8004ranking = cfg.sr8001ranking
let aName = '普通攻击'
let eName = '炽燃不灭的琥珀'
let eNameT = 'E'
let qName = '陷阵无回的炎枪'
let qNameT = 'Q'
let tName = '筑城者遗宝'
let tNameT = 'T'
let c2Name = '二魂'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '穿彻坚冰的烈芒'
  c2Name = '二星魂'
  eNameT = '炽燃不灭的琥珀'
  qNameT = '陷阵无回的炎枪'
  tNameT = '筑城者遗宝'
 } else if ( NamePath == 3 ) {
  eNameT = '炽燃不灭的琥珀'
  qNameT = '陷阵无回的炎枪'
  tNameT = '筑城者遗宝'
 } else if ( NamePath == 4 ) {
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
  tName = '天赋'
  tNameT = '天赋'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a3Name = '下落'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
  tName = '天赋'
  tNameT = '天赋'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  c2Name = 'c2'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
  tName = 'T'
 }
}
const miss = ['e','z','f','y', 'hph', 'hps', 'dph', 'dps']
let ranking = 'undefined'
if (!cfg.sr8004ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'h'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'h'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[开拓者·存护] 排名规则均未命中，已选择默认排名规则')
      ranking = 'h'
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
 ranking = `${sr8004ranking}`
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
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent , attr, calc }, { basic }) => basic(calc(attr.def) * talent.q['技能伤害-防御力'] + calc(attr.atk) * talent.q['技能伤害-攻击力'], 'q')
},
{
  title: `${tName}护盾量`,
  dmgKey: 'h',
  dmg: ({ attr, calc, talent }, { shield }) => shield(talent.t['护盾量-百分比'] * calc(attr.def) + talent.t['护盾量-数值'] )
},
{
  title: `${tName}${aName}目标伤害`,
  dmgKey: 'c',
  params: { aDmg: true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['强化-单体伤害'], 'a')
},
{
  title: `${tName}${aName}相邻伤害`,
  params: { aDmg: true },
  dmg: ({ talent }, dmg) => dmg(talent.a2['强化-扩散伤害'], 'a')
},
{
  check: ({ cons }) => cons >= 2,
  title: `${c2Name}护盾量`,
  dmg: ({ attr, calc, talent }, { shield }) => shield( 0.02 * calc(attr.def) + 27 )
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgKey = `${ranking}`

export const buffs = [
{
  title: '开拓者行迹：[强援弱] 施放战技后，我方全体受到的伤害降低[_reduction]%',
  tree: 1,
  data: {
    _reduction: 15
  }
},
{
  title: '开拓者行迹：[行胜思] 回合开始时，若开拓者持有护盾保护，则攻击力提高[atkPct]%并恢复[_energyevery]点能量',
  tree: 3,
  data: {
    atkPct: 15 ,
    _energyevery: 5
  }
},
{
  title: '开拓者1魂：[大地芯髓的鸣动] 施放普攻时，额外造成[aPlus]的火属性伤害',
  cons: 1,
  data: {
    aPlus: ({ attr, calc, params }) => calc(attr.def) * ( params.aDmg == true ? 50 : 25 ) / 100
  }
},
{
  title: '开拓者6魂：[永屹城垣的壁垒] 施放强化普攻或终结技后，开拓者的防御力提高[defPct]%',
  cons: 6,
  data: {
    defPct: 10 * 3
  }
},
{title: `3.23最后修改：[3.23重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr8004ranking} 更新日志:${renew} 其他信息:${information}`}]

