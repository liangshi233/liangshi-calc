import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs35ranking = cfg.gs35ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '仙法·寒病鬼差'
let eNameT = 'E'
let qName = '仙法·救苦度厄'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '云来古剑法'
  eNameT = '仙法·寒病鬼差'
  qNameT = '仙法·救苦度厄'
 }  else if ( NamePath == 3 ) {
  eNameT = '仙法·寒病鬼差'
  qNameT = '仙法·救苦度厄'
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
  eNameT = 'E'
  qNameT = 'Q'
 }
}
const miss = ['a', 'c', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs35ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'h'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'h'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[七七] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs35ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${a2Name}伤害`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => {
    let z = dmg(talent.a['重击伤害'] / 3 , 'a2', 'phy')
    return {
      dmg: 3 * z.dmg,
      avg: 3 * z.avg
    }
  }
},
{
  title: `${eName}持续治疗`,
  dmgKey: 'undefined',
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['持续治疗量2'][0] * calc(attr.atk) / 100 + talent.e['持续治疗量2'][1] * 1)
},
{
  title: `${eName}命中治疗`,
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.e['命中治疗量2'][0] * calc(attr.atk) / 100 + talent.e['命中治疗量2'][1] * 1)
},
{
  title: `${eName}持续伤害`,
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['寒病鬼差伤害'], 'e')
},
{
  title: `${eName}持续融化`,
  dmgKey: 'e',
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.e['寒病鬼差伤害'], 'e', 'melt')
},
{
  title: `${qName}每跳治疗`,
  dmgKey: 'h',
  dmg: ({ talent, attr, calc }, { heal }) => heal(talent.q['治疗量2'][0] * calc(attr.atk) / 100 + talent.q['治疗量2'][1] * 1)
},
{
  title: `${qName}伤害`,
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}融化`,
  dmgKey: 'q',
  dmg: ({ talent, attr, calc }, dmg) => dmg(talent.q['技能伤害'], 'q', 'melt')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg'
export const enemyName = '魔偶/女士/雷神'

export const buffs = [
{
  title: '七七天赋：[延命妙法] 处于仙法·寒病鬼差状态下的角色触发元素反应时，受治疗加成提升[healInc]%',
  data: {
    healInc: 20
  }
},
{
  title: '七七1命：[寒苦回向] 寒病鬼差命中被度厄真符标记的敌人时,为七七恢复[_energyevery]点元素能量',
  cons: 1,
  data: {
    _energyevery: 4
  }
},
{
  title: '七七2命：[冰寒蚀骨] 对受到冰元素影响的敌人,普通攻击与重击造成的伤害提升[a2Dmg]%',
  cons: 2,
  data: {
    aDmg: 15,
    a2Dmg: 15
  }
},
{
  title: '七七4命：[天威压众] 被度厄真符标记的目标，攻击力下降[_enemyAtk]%',
  cons: 4,
  data: {
    _enemyAtk: 20
  }
},
{
  title: '七七6命：[起死回骸] 施放仙法·救苦度厄时，复苏附近队伍中所有倒下的角色，并将其生命值恢复至50%。',
  cons: 6
},
{title: `5.21最后修改：[12.17重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs35ranking} 更新日志:${renew} 其他信息:${information}`}]


