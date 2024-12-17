import { LSconfig } from '#liangshi'
import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs104ranking = cfg.gs104ranking
let energy = cfg.energymodel
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '灵缰追影'
let eNameT = 'E'
let qName = '索魂命袭'
let qNameT = 'Q'
let zyd = { dmg: 0 , avg: 0 }
let szfhgzyd = { dmg: 0 , avg: 0 }
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '迷羽流击'
  eNameT = '灵缰追影'
  qNameT = '索魂命袭'
 }  else if ( NamePath == 3 ) {
  eNameT = '灵缰追影'
  qNameT = '索魂命袭'
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
const miss = ['a', 'z', 'c', 'h', 'f', 'y', 'dph', 'dps', 'hph', 'hps']
let ranking = 'undefined'
if (!cfg.gs104ranking) {
 if ( rankingOnePath == 'm' ) {
  ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[恰斯卡] 排名规则均未命中，已选择默认排名规则')
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
  ranking = `${gs104ranking}`
}
if (!cfg.energymodel) {
  energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${eName}点按伤害`,
  params: { mn: true,  t: 0 },
  dmg: ({ talent }, dmg) => {
    let deDmg = dmg(talent.e['多重瞄准点按伤害'], 'a,nightsoul')
    szfhgzyd = dmg(talent.e['焕光追影弹伤害'], 'a2,nightsoul', 'scene,vaporize')
    return deDmg
  }
},
{
  title: '追影弹伤害',
  dmg: ({ talent }, dmg) => {
    zyd = dmg(talent.e['追影弹伤害'], 'a2,nightsoul')
    return zyd
  }
},
{
  title: '焕光追影弹伤害',
  dmgKey: 'e',
  params: { t: 3 },
  dmg: ({ talent }, dmg) => dmg(talent.e['焕光追影弹伤害'], 'a2,nightsoul', 'scene')
},
{
  title: `模拟长按${eName}-2火1水队友`,
  params: { mn: true },
  dmg: ({ talent, cons, attr, calc }, { basic, reaction }) => {
    let hgzyd = basic(talent.e['焕光追影弹伤害'] * calc(attr.atk) / 100, 'a2,nightsoul', 'scene')
    let hzfhgzyd = basic(talent.e['焕光追影弹伤害'] * calc(attr.atk) / 100, 'a2,nightsoul', 'scene,vaporize')
    let Z2config = Math.floor(Math.random() * 100) + 1
    let Z3config = Math.floor(Math.random() * 100) + 1
    let Z4config = Math.floor(Math.random() * 100) + 1
    let Z6config = Math.floor(Math.random() * 100) + 1
    let ksDmg = reaction('swirl')
    let Z4element = Z6config > 33 ? (Z4config > 33 ? 0 : 1) : (Z4config > 33 ? 0.5 : 0)
    let Z4Dmg = Z4element > 0.5 ? szfhgzyd : (Z4element > 0 ? hzfhgzyd : hgzyd)
    let Z3Dmg = cons >= 1 ? hgzyd : (Z3config >= 66.6 ? zyd : hgzyd )
    let Z2Dmg = cons >= 1 ? (Z4element >= 0 ? hgzyd : (Z4config > 33 ? (Z2config > 33 ? hgzyd : szfhgzyd) : (Z2config > 33 ? hzfhgzyd : hgzyd))) : (Z4element >= 0 ? zyd : { dmg: zyd.dmg + ksDmg.avg, avg: zyd.avg + ksDmg.avg })
    let cons2 = basic((cons >= 2 ? 400 : 0) * calc(attr.atk) / 100, 'a2,nightsoul', 'scene')
    /*
    遵循2次附着规则，后填先发
    模拟对单，扩散不触发二次反应，无队友buff
    伤害不包括天赋额外流焰弹，初始默认无附着，无附着时不触发扩散
    不计算战技起身伤害，依据天赋概率平均每次装填2.44火弹1.22水弹2.33风弹（0命）、3.33火弹1.66水弹1风弹（1~6命）随机触发
    */
    return {
      dmg: hgzyd.dmg + hgzyd.dmg + Z4Dmg.dmg + Z3Dmg.dmg + Z2Dmg.dmg + zyd.dmg + cons2.dmg,
      avg: hgzyd.avg + hgzyd.avg + Z4Dmg.avg + Z3Dmg.avg + Z2Dmg.avg + zyd.avg + cons2.avg
    }
  }
},
{
  title: `${qName}释放伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['裂风索魂弹伤害'], 'q,nightsoul')
},
{
  title: '索魂弹伤害',
  dmg: ({ talent }, dmg) => dmg(talent.q['索魂弹伤害'], 'q,nightsoul')
},
{
  title: '溢光索魂弹伤害',
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['溢光索魂弹伤害'], 'q,nightsoul', 'scene')
},
{
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
}]

export const defParams = { Nightsoul: true }
export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [characterBuffGs,enemyBuffGs,ImaginariumBuff,
{
  check: ({ params }) => params.t >= 0,
  title: '恰斯卡天赋：[子弹的戏法] 进行元素战技灵缰追影中的多重瞄准的蓄力时,焕光追影弹造成的伤害提升[a2Dmg]%',
  data: {
    a2Dmg: ({ params }) => ( params.t * params.t * 5 + params.t * 5 + 5 ) * ( params.t == 0 ? 0 : 1 ),
    vaporize: ({ params }) => params.t == 0 ? 50 : 0
  }
},
{
  check: ({ params }) => params.mn,
  title: '恰斯卡天赋：[子弹的戏法] 进行元素战技灵缰追影中的多重瞄准的蓄力时,焕光追影弹造成的伤害提升[a2Dmg]%',
  data: {
    a2Dmg: ({ cons }) => cons >= 2 ? 65 : 35
  }
},
{
  title: '恰斯卡4命：[星火，瞬息的击发] 元素爆发索魂命袭中的溢光索魂弹命中敌人时，恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 1.5
  }
},
{
  title: '恰斯卡6命：[相决，斗争的荣光] 且触发固有天赋后，重瞄准中的追影弹和焕光追影弹的暴击伤害提升[a2Cdmg]%',
  cons: 6,
  data: {
    a2Cdmg: 120
  }
},
{title: `12.1最后修改：[11.02重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs104ranking} 更新日志:${renew} 其他信息:${information}`}]

