import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs99ranking = cfg.gs99ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '撷萃调香'
let eNameT = 'E'
let qName = '香氛演绎'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '逐影枪术·改'
  eNameT = '撷萃调香'
  qNameT = '香氛演绎'
 } else if ( NamePath == 3 ) {
  eNameT = '撷萃调香'
  qNameT = '香氛演绎'
 } else if ( NamePath == 4 ) {
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
if (!cfg.gs99ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[艾梅莉埃] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs99ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eName}释放伤害`,
  dmgKey: 'undefined',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  title: `${eName}一阶伤害`,
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·一阶攻击伤害'], 'e')
},
{
  title: `${eName}二阶单枚伤害`,
  dmgKey: 'e',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['柔灯之匣·二阶攻击伤害2'][0], 'e')
},
{
  title: `${eName}三阶伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
},
{
  title: `${eName}三阶激化`,
  params: { spre: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q', 'spread')
},
{
  title: `${qName}完整伤害`,
  dmgKey: 'q',
  dmg: ({ talent , cons }, dmg) => {
    let q1 = dmg(talent.q['柔灯之匣·三阶攻击伤害'], 'q')
    let cons4 = cons >= 4 ? 12 : 4
    return {
      dmg: q1.dmg * cons4 ,
      avg: q1.avg * cons4
    }
  }
},
{
  check: ({ cons }) => cons >= 6,
  title: `${qNameT}后${a2Name}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['重击伤害'], 'a2')
},
{
  title: '浸析伤害',
  params: { e: true },
  dmg: ({ calc, attr }, { basic }) => basic(calc(attr.atk) * 500 / 100, '')
},
{
  title: '燃烧反应伤害',
  dmg: ({}, { reaction }) => reaction('burning')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '艾梅莉埃天赋：[余薰] 每萃集两枚香韵,柔灯之匣·二阶将消耗香韵,并浸析出「清露香氛」,对敌人造成草元素范围伤害。'
},
{
  title: '艾梅莉埃天赋：[顶空集香] 场上存在艾梅莉埃自己创造的柔灯之匣时,队伍中附近的所有角色对燃烧伤害的火元素抗性提升[_res]%',
  data: {
    _res: 85
  }
},
{
  title: '艾梅莉埃天赋：[精馏] 敌人处于燃烧化状态下，造成伤害提升[dmg]%',
  data: {
    dmg: ({ params , calc , attr }) => params.spre === true ? 0 : Math.min( 36 , calc(attr.atk) / 1000 * 15 )
  }
},
{
  check: ({ params }) => params.e === true,
  title: '艾梅莉埃1命：[淡香浸析] 撷萃调香与固有天赋「余薰」的清露香氛造成的伤害提升[dmg]%.',
  cons: 1,
  data: {
    dmg: 20
  }
},
{
  title: '艾梅莉埃2命：[湖光顶调] 撷萃调香、香氛演绎或固有天赋「余薰」的清露香氛（需解锁该固有天赋）命中敌人时，草元素抗性降低[kx]%',
  cons: 2,
  data: {
    kx: 30
  }
},
{
  title: '艾梅莉埃4命：[柔灯心韵] 香氛演绎的持续时间延长[_qSustainedPlus]秒，且每名敌人被香露选为目标的间隔降低[_qSpeedPlus]秒。',
  cons: 4,
  data: {
    _qSustainedPlus: 2 ,
    _qSpeedPlus: 0.3
  }
},
{
  check: ({ params }) => params.q === true,
  title: '艾梅莉埃6命：[茉洁香迹] 施放撷萃调香或香氛演绎时﹐将获得「香迹留驻」使普通攻击与重击将转为无法被附魔覆盖的草元素伤害,并提升造成的伤害[aPlus]',
  cons: 6,
  data: {
    aPlus: ({ calc, attr }) => calc(attr.atk) * 300 / 100 ,
    a2Plus: ({ calc, attr }) => calc(attr.atk) * 300 / 100
  }
},
{ title: `7.9最后修改：[6.2重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs99ranking} 更新日志:${renew} 其他信息:${information}` }]
