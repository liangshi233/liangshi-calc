import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let sr1308ranking = cfg.sr1308ranking
let aName = '普通攻击'
let eName = '八雷飞渡'
let eNameT = 'E'
let qName = '残梦尽染，一刀缭断'
let q1Name = '啼泽雨斩'
let q2Name = '黄泉返渡'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '三途枯榷'
  eNameT = '八雷飞渡'
  qNameT = '残梦尽染，一刀缭断'
 } else if ( NamePath == 3 ) {
  eNameT = '八雷飞渡'
  qNameT = '残梦尽染，一刀缭断'
 } else if ( NamePath == 4 ) {
  eName = '战技'
  qName = '终结技'
  eNameT = '战技'
  qNameT = '终结技'
  q1Name = '终结斩'
  q2Name = '终结尾'
 } else if ( NamePath == 5 ) {
  aName = '普攻'
  eName = 'E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  qNameT = 'Q技能'
  q1Name = 'Q技能斩'
  q2Name = 'Q技能尾'
 } else if ( NamePath == 6 ) {
  aName = 'A'
  eName = 'E'
  qName = 'Q'
  eNameT = 'E'
  qNameT = 'Q'
  q1Name = 'Q斩'
  q2Name = 'Q尾'
 }
}
const miss = ['z','c','f','h','y','dps','dph','hph','hps']
let ranking = 'undefined'
if (!cfg.sr1308ranking) {
 if ( rankingOnePath == 'm' )  {
  ranking = 'q'
 } else if (miss.includes(rankingOnePath)) {
    if ( rankingTwoPath == 'm' )  {
     ranking = 'q'
    } else if (miss.includes(rankingTwoPath)) {
      if ( rankingThreePath == 'm' )  {
       ranking = 'q'
      } else if (miss.includes(rankingThreePath)) {
       logger.mark('[黄泉] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${sr1308ranking}`
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}伤害`,
  dmgKey: 'a',
  dmg: ({ talent , cons }, dmg) => {
     let talentConfig = cons >= 6 ? 'q' : 'a'
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let aDmg = dmg(talent.a['技能伤害'] * talentDmg , `${talentConfig}`)
     return aDmg
  }
},
{
  title: `${eName}主目标伤害`,
  dmgKey: 'e',
  dmg: ({ talent , cons }, dmg) => {
     let talentConfig = cons >= 6 ? 'q' : 'e'
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let eDmg = dmg(talent.e['单体伤害'] * talentDmg , `${talentConfig}`)
     return eDmg
  }
},
{
  title: `${eName}相邻目标伤害`,
  dmg: ({ talent , cons }, dmg) => {
     let talentConfig = cons >= 6 ? 'q' : 'e'
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let e2Dmg = dmg(talent.e['相邻目标伤害'] * talentDmg , `${talentConfig}`)
     return e2Dmg
  }
},
{
  title: `${q1Name}单次伤害`,
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => {
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let q1Dmg = dmg( ( talent.q['啼泽雨斩伤害'] + talent.q['集真赤最高倍率'] ) * talentDmg , 'q')
     return q1Dmg
  }
},
{
  title: `${q2Name}伤害`,
  dmgKey: 'undefined',
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => {
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let q2Dmg = dmg(talent.q['黄泉返渡伤害'] * talentDmg , 'q')
     return q2Dmg
  }
},
{
  title: '集真赤消除额外伤害',
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => {
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let q3Dmg = dmg(talent.q['消去集真赤伤害'] * talentDmg , 'q')
     return q3Dmg
  }
},
{
  title: `${qName}完整伤害`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent , cons }, dmg) => {
     let talentDmg = cons >= 1 ? 1.6 : 1.15
     let q4Dmg = dmg( ( talent.q['黄泉返渡伤害'] + talent.q['啼泽雨斩伤害'] * 3 + talent.q['集真赤最高倍率'] ) * talentDmg , 'q')
     return q4Dmg
  }
}]

export const mainAttr = 'atk,cpct,cdmg,speed'
export const defDmgKey = `${ranking}`

export const buffs = [
{
  check: ({ params }) => params.q === true,
  title: '黄泉天赋：[红叶时雨，万倾一空] 终结技期间可无视弱点属性削减敌方韧性，并使敌方全体全属性抗性降低[kx]%',
  data: {
    kx: ({ talent }) => talent.t['抗性降低']
  }
},
{
  title: '黄泉行迹：[奈落] 我方队伍中存在[buffCount]名「虚无」命途角色，使普攻、战技、终结技造成的伤害为原伤害的1[_dmg]%',
  tree: 2,
  data: {
    buffCount: ({ cons }) => cons >= 2 ? 2 : 1 ,
    _dmg: ({ cons }) => Math.max( 0 , ( cons >= 2 ? 2 : 1 ) * 45 - 30 )
  }
},
{
  title: '黄泉行迹：[雷心] 终结技的【啼泽雨斩】击中持有【集真赤】的敌方目标时，使黄泉造成的伤害提高[dmg]%，并在发动【黄泉返渡】时额外造成6次伤害',
  tree: 3,
  data: {
    dmg: 30 * 3
  }
},
{
  title: '黄泉1魂：[高天寥落真言始] 对处于负面效果的敌方目标造成伤害时暴击率提高[cpct]%',
  cons: 1,
  data: {
    cpct: 18
  }
},
{
  title: '黄泉2魂：[霆鼓俱寂，瑟风亦止] 行迹【奈落】最高数值所需求「虚无」命途角色的数量减少1名',
  cons: 2
},
{
  title: '黄泉4魂：[亘焰燎照镜中人] 在敌方目标进入战斗时，使其陷入终结技伤害易伤状态，受到的终结技伤害提高[qEnemydmg]%',
  cons: 4,
  data: {
    qEnemydmg: 12
  }
},
{
  title: '黄泉6魂：[灾咎解桎梏] 终结技伤害全属性抗性穿透提高[kx]%，施放普攻、战技造成的伤害同时视为终结技伤害。',
  cons: 6,
  data: {
    kx: 20
  }
},
{title: `3.26最后修改：[3.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${sr1308ranking} 更新日志:${renew} 其他信息:${information}`}]

