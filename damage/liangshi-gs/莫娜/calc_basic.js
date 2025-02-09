import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs41ranking = cfg.gs41ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '水中幻愿'
let eNameT = 'E'
let qName = '星命定轨'
let qNameT = 'Q'
let c6Name = '六命'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '因果点破'
  eNameT = '水中幻愿'
  qNameT = '星命定轨'
  c6Name = '六命座'
 }  else if ( NamePath == 3 ) {
  eNameT = '水中幻愿'
  qNameT = '星命定轨'
 }  else if ( NamePath == 4 ) {
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
  c6Name = 'c6'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['a', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs41ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'q'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'q'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[莫娜] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs41ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${a2Name}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${a2Name}蒸发`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${c6Name}强化${a2Name}蒸发`,
  dmgKey: 'z',
  params: { time: 3 },
  check: ({ cons }) => cons >= 6,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'vaporize')
},
{
  title: `${eName}持续伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['持续伤害'], 'e')
},
{
  title: `${eName}爆裂伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['爆裂伤害'], 'e')
},
{
  title: `${eName}爆裂蒸发`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['爆裂伤害'], 'e', 'vaporize')
},
{
  title: `${qName}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['泡影破裂伤害'], 'q')
},
{
  title: `${qName}蒸发`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['泡影破裂伤害'], 'q', 'vaporize')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,recharge,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '莫娜天赋：[「托付于命运吧!」] 水元素伤害加成获得[dmg]%额外提升',
  sort: 9,
  data: {
    dmg: ({ calc, attr }) => calc(attr.recharge) * 0.2
  }
},
{
  title: '莫娜天赋：[「老太婆来抓我啊!」] 进入虚实流动状态2秒后凝聚一个虚影,破裂造成水元素范围伤害'
},
{
  check: ({ params }) => params.q === true ,
  title: '莫娜技能：[星命定轨] 处于泡影影响下的敌人受到伤害时,对敌人施加星异的伤害加成效果,并以此提高这一次造成的伤害[dmg]%',
  data: {
    dmg: ({ talent }) => talent.q['伤害加成']
  }
},
{
  check: ({ params }) => params.q === true ,
  title: '莫娜1命：[沉没的预言] 队伍中自己的角色攻击命中处于星异状态下的敌人后,感电反应造成的伤害提升[electroCharged]%,蒸发反应造成的伤害提升[vaporize]%,水元素扩散反应造成的伤害提升[swirl]%,冻结反应的持续时间延长[frozrntimePct]%。',
  cons: 1,
  data: {
    electroCharged: 15 ,
    vaporize: 15 ,
    swirl: 15 ,
    frozrntimePct: 15
  }
},
{
  title: '莫娜2命：[星月的连珠] 普通攻击命中时,自动施放一次重击',
  cons: 2,
},
{
  check: ({ params }) => params.q === true ,
  title: '莫娜4命：[灭绝的预言] 队伍中所有角色攻击处于星异状态下的敌人时，暴击率提升[cpct]%',
  cons: 4,
  data: {
    cpct: 15
  }
},
{
  title: '莫娜6命：[厄运的修辞] 进入虚实流动状态后,移动[buffCount]秒,重击伤害增加[a2Dmg]%',
  cons: 6,
  data: {
    buffCount: ({ params }) => ( params.time || 0 ) ,
    a2Dmg: ({ params }) => Math.min( ( ( params.time || 0 ) * 60 ) , 180 )
  }
},
{title: `5.18最后修改：[12.28重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs41ranking} 更新日志:${renew} 其他信息:${information}`}]

