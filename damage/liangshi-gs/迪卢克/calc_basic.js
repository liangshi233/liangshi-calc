import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs16ranking = cfg.gs16ranking
let energy = cfg.energymodel
let e1Dmg = { avg: 0 , dmg: 0 }
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '逆焰之刃'
let eNameT = 'E'
let qName = '黎明'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '淬炼之剑'
  eNameT = '逆焰之刃'
  qNameT = '黎明'
 }  else if ( NamePath == 3 ) {
  eNameT = '逆焰之刃'
  qNameT = '黎明'
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
const miss = ['z', 'h', 'f', 'y', 'hph', 'hps', 'dph', 'dps']
let ranking = 'undefined'
if (!cfg.gs16ranking) {
 if (rankingOnePath == 'm') {
  ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
   if (rankingTwoPath == 'm') {
    ranking = 'q'
   } else if (miss.includes(rankingTwoPath)) {
     if (rankingThreePath == 'm') {
      ranking = 'q'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[迪卢克] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs16ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eName}第一段伤害`,
  dmg: ({ talent }, dmg) => {
    e1Dmg = dmg(talent.e['一段伤害'], 'e')
    return e1Dmg
  }
},
{
  title: `${eName}第一段融化`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['一段伤害'], 'e', 'melt')
},
{
  title: `${eName}完整伤害`,
  dmgKey: 'e',
  params: { e: true },
  dmg: ({ talent }, dmg ) => {
    let e1 = e1Dmg
    let e2 = dmg(talent.e['二段伤害'], 'e')
    let e3 = dmg(talent.e['三段伤害'], 'e')
    return {
      dmg: e1.dmg + e2.dmg + e3.dmg ,
      avg: e1.avg + e2.avg + e3.avg
    }
  }
},
{
  title: `${qName}爆发伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q')
},
{
  title: `${qName}爆发蒸发`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'vaporize')
},
{
  title: `${qName}爆发融化`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['斩击伤害'], 'q', 'melt')
},
{
  title: `${qName}每段伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['持续伤害'], 'q')
},
{
  title: `${qNameT}后${aName}一段伤害`,
  dmgKey: 'a',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['一段伤害'], 'a')
},
{
  title: `${qNameT}后高空${a3Name}伤害`,
  dmgKey: 'c',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.a['低空/高空坠地冲击伤害'][1], 'a3')
}]

export const defParams = { monv: 3 }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  title: '迪卢克天赋：[永不休止] 重击的体力消耗降低[_a2StaminaPct]%，持续时间延长[_a2SustainedPlus]秒',
  data: {
    _a2StaminaPct: 50 ,
    _a2SustainedPlus: 3
  }
},
{
  check: ({ params }) =>  params.q === true ,
  title: '迪卢克天赋：[熔毁之翼] 黎明提供的火元素附魔效果持续期间，获得[dmg]%火元素伤害加成',
  data: {
    dmg: 20
  }
},
{
  title: '迪卢克1命：[罪罚裁断] 对于生命值高于50%的敌人，造成伤害提高[dmg]%',
  cons: 1,
  data: {
    dmg: 15
  }
},
{
  title: '迪卢克2命：[罪罚裁断] 受到伤害时，攻击力提高[atkPct]%，攻击速度提高[_aSpeed]%',
  cons: 2,
  data: {
    atkPct: 10 * 3 ,
    _aSpeed: 5 * 3
  }
},
{
  check: ({ params }) =>  params.e === true ,
  title: '迪卢克4命：[罪罚裁断] 施放逆焰之刃的2秒后，下一段逆焰之刃的伤害提高[eDmg]%',
  cons: 4,
  data: {
    eDmg: 40
  }
},
{
  title: '迪卢克6命：[清算黑暗的炎之剑] 施放逆焰之刃后，普通攻击的攻击速度提升[_aSpeed]%，造成伤害提高[aDmg]%',
  cons: 6,
  data: {
    _aSpeed: 30 ,
    aDmg: 30
  }
},
 'vaporize',
{title: `5.25最后修改：[5.12重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs16ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]

