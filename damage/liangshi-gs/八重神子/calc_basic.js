import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs58ranking = cfg.gs58ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '野干役咒·杀生樱'
let eNameT = 'E'
let qName = '大密法·天狐显真'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '狐灵食罪式'
  eNameT = '野干役咒·杀生樱'
  qNameT = '大密法·天狐显真'
 }  else if ( NamePath == 3 ) {
  eNameT = '野干役咒·杀生樱'
  qNameT = '大密法·天狐显真'
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
const miss = ['a', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs58ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[八重神子] 排名规则均未命中，已选择默认排名规则')
      ranking = 'e'
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
  ranking = `${gs58ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${a2Name}单段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: `${a2Name}单段激化`,
  dmgKey: 'z',
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2', 'aggravate')
},
{
  check: ({ cons }) => cons < 2,
  title: `叁阶${eName}伤害`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·叁阶'], 'e')
},
{
  check: ({ cons }) => cons < 2,
  dmgKey: 'e',
  title: `叁阶${eName}激化`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·叁阶'], 'e', 'aggravate')
},
{
  check: ({ cons }) => cons >= 2,
  title: `肆阶${eName}伤害`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·肆阶'], 'e')
},
{
  check: ({ cons }) => cons >= 2,
  dmgKey: 'e',
  title: `肆阶${eName}激化`,
  dmg: ({ talent, attr }, dmg) => dmg(talent.e['杀生樱伤害·肆阶'], 'e', 'aggravate')
},
{
  title: `${qName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `${qName}激化`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
},
{
  title: '天狐霆雷伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q')
},
{
  title: '天狐霆雷激化',
  dmg: ({ talent }, dmg) => dmg(talent.q['天狐霆雷伤害'], 'q', 'aggravate')
}]


export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '八重神子天赋：[启蜇之祝词] 使杀生樱造成的伤害提升[eDmg]%',
  sort: 9,
  data: {
    eDmg: ({ attr, calc }) => calc(attr.mastery) * 0.15
  }
},
{
  title: '八重神子1命：[野狐供真篇] 大密法·天狐显真引发次天狐霆雷，会恢复[_energyevery]点元素能量。',
  cons: 1,
  data: {
    _energyevery: 24
  }
},
{
  title: '八重神子2命：[望月吼哕声] 杀生樱创造时的位阶上限提升至肆阶，攻击范围提升60%。',
  cons: 2
},
{
  title: '八重神子4命：[绯樱引雷章] 杀生樱的落雷命中敌人后，队伍中附近的所有角色获得[dmg]%雷元素伤害加成。',
  cons: 4,
  data: {
    dmg: 20
  }
},
{
  title: '八重神子6命：[大杀生咒禁] 杀生樱在攻击时无视敌人[ignore]%的防御力。',
  cons: 6,
  data: {
    ignore: 60
  }
},
{title: `5.18最后修改：[5.13重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs58ranking} 更新日志:${renew} 其他信息:${information}`}]

