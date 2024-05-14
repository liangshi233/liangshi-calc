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
let sr8001ranking = cfg.sr8001ranking || cfg.sr8002ranking
let aName = '普通攻击'
let eName = '安息全垒打'
let eNameT = 'E'
let qName = '星尘王牌'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '再见安打'
  eNameT = '安息全垒打'
  qNameT = '星尘王牌'
 } else if ( NamePath == 3 ) {
  eNameT = '安息全垒打'
  qNameT = '星尘王牌'
 } else if ( NamePath == 4 ) {
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  a3Name = '下落'
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
const miss = ['z','c','f', 'h', 'y', 'hph', 'hps', 'dph', 'dps']
let ranking = 'undefined'
if (!cfg.sr8001ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'q'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'q'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[开拓者·毁灭] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr8001ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}伤害`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => dmg(talent.a['技能伤害'], 'a' )
},
{
  title: `${eName}伤害`,
  dmgKey: 'e',
  params: { Fighting: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e' )
},
{
  title: `${qName}${aName}伤害`,
    dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['单体伤害'], 'q')
},
{
  title: `${qName}${eNameT}主目标伤害`,
  params: { Fighting: true },
  dmg: ({ talent }, dmg) => dmg(talent.q2['扩散伤害'], 'q')
},
{
  title: `${qName}${eNameT}相邻伤害`,
  params: { Fighting: true },
  dmg: ({ talent }, dmg) => dmg(talent.q2['扩散伤害·相邻目标'], 'q')
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgKey = `${ranking}`

export const buffs = [
{
  title: '开拓者天赋：[牵制盗垒] 击破敌方目标的弱点后，攻击力提高[atkPct]%',
  data: {
    atkPct: ({ talent }) => talent.t['攻击力提升'] * 100 * 2
  }
},
{
  title: '开拓者行迹：[蓄势] 战斗开始时，立刻恢复[_energyevery]点能量',
  tree: 1,
  data: {
    _energyevery: 15
  }
},
{
  title: '开拓者行迹：[坚韧] 击破敌方目标的弱点后，防御力提高[defPct]%',
  tree: 2,
  data: {
    defPct: 10 * 2
  }
},
{
  check: ({ params }) => params.Fighting === true ,
  title: '开拓者行迹：[斗志] 施放战技或终结技【全胜•安息全垒打】时，对指定敌方目标造成的伤害提高[dmg]%',
  tree: 3,
  data: {
    dmg: 25
  }
},
{
  title: '开拓者1魂：[坠临万界的星芒] 施放终结技消灭敌方目标时，开拓者额外恢复[_energyevery]点能量',
  cons: 1,
  data: {
    _energyevery: 10
  }
},
{
  title: '开拓者2魂：[因缘假合的人身] 施放攻击后，若击中的敌方目标弱点为物理属性，则回复生命值。',
  cons: 2
},
{
  title: '开拓者4魂：[凝眸毁灭的瞬间] 击中处于弱点击破状态的敌方目标时，暴击率提高[cpct]%',
  cons: 4,
  data: {
    cpct: 25
  }
},
{title: `3.23最后修改：[3.23重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr8001ranking} 更新日志:${renew} 其他信息:${information}`}]

