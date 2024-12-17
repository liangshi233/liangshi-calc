import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs101ranking = cfg.gs101ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '悬猎 · 游骋高狩'
let eNameT = 'E'
let qName = '向伟大圣龙致意'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '夜阳斗技'
  eNameT = '悬猎 · 游骋高狩'
  qNameT = '向伟大圣龙致意'
 }  else if ( NamePath == 3 ) {
  eNameT = '悬猎 · 游骋高狩'
  qNameT = '向伟大圣龙致意'
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
if (!cfg.gs101ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[基尼奇] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs101ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: '环绕射击单枚',
  dmg: ({ talent }, dmg) => dmg(talent.e['环绕射击伤害'], 'e,nightsoul')
},
{
  title: '环绕射击单枚激化',
  dmg: ({ talent }, dmg) => dmg(talent.e['环绕射击伤害'], 'e,nightsoul', 'spread')
},
{
  title: '迴猎贯鳞炮伤害',
  dmgKey: 'e',
  params: { jp: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul')
},
{
  title: '迴猎贯鳞炮激化',
  params: { jp: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul', 'spread')
},
{
  check: ({ cons }) => cons >= 2,
  title: '2命首次猎贯鳞炮',
  params: { jp: true ,cons2: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['迴猎贯鳞炮伤害'], 'e,nightsoul')
},
{
  title: `${qName}释放伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul')
},
{
  title: `${qName}释放激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q,nightsoul', 'spread')
},
{
  title: `${qName}龙息伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['龙息伤害'], 'q,nightsoul')
},
{
  title: `${qName}龙息激化`,
  dmg: ({ talent }, dmg) => dmg(talent.q['龙息伤害'], 'q,nightsoul', 'spread')
}]

export const defParams = { Nightsoul: true }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  check: ({ params }) => params.jp === true ,
  title: '基尼奇天赋：[焰灵的契约] 队伍中的附近的角色触发「夜魂迸发」迴猎贯鳞炮造成的伤害提高[_ePlus] { 该效果单人不生效 }',
  data: {
    _ePlus: ({ calc , attr }) => calc(attr.atk) * 320 / 100
  }
},
{
  check: ({ params }) => params.jp === true ,
  title: '基尼奇1命：[七鹦之喙] 通过悬猎 · 游骋高狩进行空中摆荡落地后移动速度提升[_jSpeed]%，迴猎贯鳞炮的暴击伤害提升[eCdmg]%',
  cons: 1,
  data: {
    _jSpeed: 30 ,
    eCdmg: 100
  }
},
{
  title: '基尼奇2命：[星虎之掌] 元素战技命中敌人使其草元素抗性降低[kx]%,猎贯鳞炮的伤害提升[eDmg]%',
  cons: 2,
  data: {
    kx: 30,
    eDmg: ({ params }) => params.cons2 === true ? 100 : 0
  }
},
{
  title: '基尼奇4命：[蜂鸟之羽] 进行环绕射击或施放迴猎贯鳞炮后，将恢复[_energyevery]点元素能量。 向伟大圣龙致意造成的伤害提升[qDmg]%',
  cons: 4,
  data: {
    _energyevery: 5,
    qDmg: 70
  }
},
{title: `9.30最后修改：[8.16重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs101ranking} 更新日志:${renew} 其他信息:${information}`}]

