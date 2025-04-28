import { LSconfig } from '#liangshi'
import { characterBuffSr, enemyBuffSr } from '../../../resources/CalcBuff/index.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1218ranking = cfg.sr1218ranking
let aName = '普通攻击'
let eName = '燔燎急袭'
let eNameT = 'E'
let qName = '鼎阵妙法，奇正相生'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '仁火攻心'
  eNameT = '燔燎急袭'
  qNameT = '鼎阵妙法，奇正相生'
 } else if ( NamePath == 3 ) {
  eNameT = '燔燎急袭'
  qNameT = '鼎阵妙法，奇正相生'
 } else if ( NamePath == 4 ) {
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
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
const miss = ['z','c','e','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1218ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'q'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'q'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[椒丘] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr1218ranking}`
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
  title: `${eName}主目标伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['目标伤害'], 'e')
},
{
  title: `${eName}相邻目标伤害`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['相邻目标伤害'], 'e')
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: '烬煨持续伤害',
  dmg: ({ talent , cons }, dmg ) => {
  let cxsh = dmg(talent.t['持续伤害'] + ( cons >= 2 ? 3 : 0 ), 'dot', 'skillDot')
  return {
     avg: cxsh.avg
  }
 }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,speed'

export const buffs = [characterBuffSr,enemyBuffSr,
{
  title: '椒丘技能：[鼎阵妙法，奇正相生] 处于结界中时，敌方目标受到的终结技伤害提高[qDmg]%',
  data: {
    qDmg: ({ talent }) => talent.q['终结技伤害提高'] * 100
  }
},
{
  title: '椒丘天赋：[四示八权，纤滋精味] 使用普攻、战技、终结技击中敌人时使敌人受到的伤害提高[enemydmg]%。',
  data: {
    enemydmg: ({ talent , cons }) => talent.t['1层伤害提高'] * 100 + talent.t['叠加伤害提高'] * 100 * ( cons >= 6 ? 9 : 5 )
  }
},
{
  check: ({ attr, calc }) => calc(attr.effPct) >= 80,
  title: '椒丘行迹：[举炊] 效果命中大于80%时，则额外提高[atkPct]%攻击力。',
  tree: 2,
  data: {
    atkPct: ({ attr, calc }) => Math.min( 240 , ( Math.floor( ( calc(attr.effPct) - 80 ) / 15 ) * 60 ) )
  }
},
{
  title: '椒丘行迹：[爟火] 战斗开始时，立即恢复[_energyevery]点能量',
  tree: 3,
  data: {
    _energyevery: 15
  }
},
{
  title: '椒丘1魂：[五味五走，生熟有定] 我方目标攻击处于【烬煨】状态的敌方目标时，造成的伤害提高[dmg]%',
  cons: 1,
  data: {
    dmg: 40
  }
},
{
  title: '椒丘2魂：[爽口作疾，厚味措毒] 敌方目标处于【烬煨】状态时，【烬煨】对其造成的火属性持续伤害倍率提高[_dotPlus]%',
  cons: 2,
  data: {
    _dotPlus: 300
  }
},
{
  title: '椒丘4魂：[藏腑和平，****气资荣] 结界存在时，敌方目标的攻击力降低[_enemyatk]%。',
  cons: 4,
  data: {
    _enemyatk: 15
  }
},
{
  title: '椒丘6魂：[九沸九变，火为之纪] 【烬煨】的层数上限提升至9，【烬煨】会使目标的全属性抗性降低[kx]%。',
  cons: 4,
  data: {
    kx: 3 * 9
  }
},
{title: `7.31最后修改：[6.18重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1218ranking} 更新日志:${renew} 其他信息:${information}`}]
