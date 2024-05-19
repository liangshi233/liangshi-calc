import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs42ranking = cfg.gs42ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '星斗归位'
let eNameT = 'E'
let qName = '天街巡游'
let qNameT = 'Q'
let c1Name = '一命'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '云来剑法'
  eNameT = '星斗归位'
  c1Name = '一命座'
  qNameT = '天街巡游'
 }  else if ( NamePath == 3 ) {
  eNameT = '星斗归位'
  qNameT = '天街巡游'
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
  c1Name = 'C1'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['a', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs42ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'dps'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'dps'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'dps'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[刻晴] 排名规则均未命中，已选择默认排名规则')
      ranking = 'dps'
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
  ranking = `${gs42ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${a2Name}伤害`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2 , 'a2', 'phy')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${eNameT}后${a2Name}伤害`,
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    return {
      dmg: a1.dmg * 2 ,
      avg: a1.avg * 2
    }
  }
},
{
  title: `${eNameT}后${a2Name}激化`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let a1 = dmg(talent.a['重击伤害'] / 2 , 'a2')
    let a2 = dmg(talent.a['重击伤害'] / 2 , 'a2', 'aggravate')
    return {
      dmg: a1.dmg + a2.dmg ,
      avg: a1.avg + a2.avg
    }
  }
},
{
  title: `${eName}伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['雷楔伤害'], 'e')
},
{
  title: `${eName}激化`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['雷楔伤害'], 'e', 'aggravate')
},
{
  title: `${eName}归位伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['斩击伤害'], 'e')
},
{
  title: `${qName}单段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['连斩伤害2'][0], 'q')
},
{
  title: `${qName}单段激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['连斩伤害2'][0], 'q', 'aggravate')
},
{
  title: `${qName}斩击伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['最后一击伤害'], 'q')
},
{
  title: `${qName}斩击激化`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['最后一击伤害'], 'q', 'aggravate')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
{
  title: '刻晴天赋：[玉衡之贵] 施放天街巡游时,暴击率提升[cpct]%,元素充能效率提升[recharge]%',
  data: {
    cpct: 15,
    recharge: 15
  }
},
{
  title: '刻晴1命：[雷厉] 雷楔存在期间再次施放星斗归位时，在消失与出现的位置造成雷元素范围伤害。',
  cons: 1
},
{
  title: '刻晴4命：[调律] 触发雷元素相关反应后，攻击力提升[atkPct]%',
  cons: 4,
  data: {
    atkPct: 25
  }
},
{
  title: '刻晴6命：[调律] 进行普通攻击、重击、施放元素战技或元素爆发时，获得[dmg]%雷元素伤害加成',
  cons: 6,
  data: {
    dmg: 6 * 4
  }
},
{title: `5.19最后修改：[1.27重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs42ranking} 更新日志:${renew} 其他信息:${information}`}]

