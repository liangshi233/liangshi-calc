import { LSconfig } from '#liangshi'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs30ranking = cfg.gs30ranking
let energy = cfg.energymodel
let hName = '玉璋护盾'
let aName = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName = '地心'
let e2Name = '地心·磐礴'
let eNameT = 'E'
let e2NameT = '长E'
let qName = '天星'
let qNameT = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName = '岩雨'
  eNameT = '地心'
  e2NameT = '地心·磐礴'
  qNameT = '天星'
 } else if ( NamePath == 3 ) {
  eNameT = '地心'
  e2NameT = '地心·磐礴'
  qNameT = '天星'
 } else if ( NamePath == 4 ) { 
  hName = '元素战技护盾'
  eName = '元素战技'
  e2Name = '长按元素战技'
  qName = '元素爆发'
  eNameT = '元素战技'
  e2NameT = '长按元素战技'
  qNameT = '元素爆发'
 } else if ( NamePath == 5 ) { 
  hName = 'E技能盾'
  aName = '普攻'
  a3Name = '下落'
  eName = 'E技能'
  e2Name = '长按E技能'
  qName = 'Q技能'
  eNameT = 'E技能'
  e2NameT = '长按E技能'
  qNameT = 'Q技能'
 } else if ( NamePath == 6 ) {
  hName = 'E盾'
  aName = 'A'
  a2Name = 'Z'
  a3Name = '戳'
  eName = 'E'
  e2Name = '长E'
  qName = 'Q'
  eNameT = 'E'
  e2NameT = '长E'
  qNameT = 'Q'
 }
}
const miss = ['z', 'c', 'f', 'y','dph','dps','hph','hps']
let ranking = 'undefined'
if (!cfg.gs30ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'h'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'h'
   }  else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'h'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[钟离] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${gs30ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '11.28-修正岩脊伤害异常问题'
 renew = '1.29-修正多段类普攻无法多次获取伤害值提升类buff的问题'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  title: `${aName}前五段`,
  dmgKey: 'a',
  dmg: ({ talent }, dmg) => {
    let t1 = dmg(talent.a['一段伤害'], 'a', 'phy')
    let t2 = dmg(talent.a['二段伤害'], 'a', 'phy')
    let t3 = dmg(talent.a['三段伤害'], 'a', 'phy')
    let t4 = dmg(talent.a['四段伤害'], 'a', 'phy')
    let t5 = dmg(talent.a['五段伤害'] / 4 , 'a', 'phy')
    return {
      dmg: t1.dmg + t2.dmg + t3.dmg + t4.dmg + t5.dmg * 4 ,
      avg: t1.avg + t2.avg + t3.avg + t4.avg + t5.avg * 4
    }
  }
},
{
  title: `${hName}量`,
  dmgKey: 'h',
  params: { hd: true },
  dmg: ({ attr, calc, talent }, { shield }) => shield(talent.e['护盾基础吸收量'] + calc(attr.hp) * talent.e['护盾附加吸收量'] / 100)
},
{
  title: `${eName}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][0], 'e')
},
{
  title: '共鸣伤害',
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['岩脊伤害/共鸣伤害'][1], 'e')
},
{
  title: `${e2Name}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['长按伤害'], 'e')
},
{
  title: `${qName}伤害`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  title: `钟鹤云重 ${aName}前五段`,
  params: { teamA: true },
  dmg: ({ talent }, dmg) => {
    let t1 = dmg(talent.a['一段伤害'], 'a')
    let t2 = dmg(talent.a['二段伤害'], 'a')
    let t3 = dmg(talent.a['三段伤害'], 'a')
    let t4 = dmg(talent.a['四段伤害'], 'a')
    let t5 = dmg(talent.a['五段伤害'] / 4 , 'a')
    return {
      dmg: t1.dmg + t2.dmg + t3.dmg + t4.dmg + t5.dmg * 4 ,
      avg: t1.avg + t2.avg + t3.avg + t4.avg + t5.avg * 4
    }
  }
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'hp,atk,cpct,cdmg'

export const buffs = [
{
  check: ({ params }) => params.hd === true,
  title: '钟离天赋：[悬岩宸断] 玉璋护盾受到伤害时提升护盾强效5%,至多提高[shield]%',
  data: {
    shield: 25
  }
},
{
  check: ({ params }) => params.hd === true,
  title: '玉璋护盾：[属性 - 岩] 对所有元素伤害与物理伤害有[shieldInc]%的额外吸收效果。',
  data: {
    shieldInc: 50
  }
},
{
  title: '钟离天赋：[炊金馔玉] 基于生命值上限，普通攻击重击下落攻击伤害提高[aPlus]，岩脊,共鸣与长按伤害提高[ePlus]，天星伤害提高[qPlus]',
  sort: 9,
  data: {
	aPlus: ({ attr, calc }) => calc(attr.hp) * 0.0139,
  	a2Plus: ({ attr, calc }) => calc(attr.hp) * 0.0139,
	a3Plus: ({ attr, calc }) => calc(attr.hp) * 0.0139,
    ePlus: ({ attr, calc }) => calc(attr.hp) * 0.019,
    qPlus: ({ attr, calc }) => calc(attr.hp) * 0.33
  }
},
{
  title: '钟离技能：[玉璋护盾] 处于玉璋护盾庇护下的角色使附近小范围敌人的所有元素抗性与物理抗性降低[kx]%',
  data: {
    kx: 20
  }
},
{
  check: ({ cons , params }) => cons >= 2 && params.teamA === true,
  title: '申鹤2命：[定蒙] 神女遣灵真诀领域中的当前场上角色，冰元素伤害的暴击伤害提高[aCdmg]%',
  sort: 1,
  data: {
    aCdmg: 15
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '申鹤技能：[神女遣灵真诀] 结成领域,使其中敌人的冰元素抗性与物理抗性降低[kx]%',
  data: {
    kx: 15
  }
},
{
  check: ({ cons , params }) => cons >= 6 && params.teamA === true,
  title: '申鹤技能：[仰灵威召将役咒] 普通攻击对敌人造成冰元素伤害时,造成的伤害提高[aPlus]%',
  sort: 9,
  data: {
    aPlus: 4009.0
  }
},
{
  check: ({ cons , params }) => cons < 6 && params.teamA === true,
  title: '申鹤技能：[仰灵威召将役咒] 普通攻击对敌人造成冰元素伤害时,造成的伤害提高[aPlus]%',
  sort: 9,
  data: {
    aPlus: 2767.2
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '申鹤天赋：[缚灵通真法印] 申鹤施放仰灵威召将役咒后将使附近的队伍中所有角色根据技能释放形式对应伤害提高[dmg]%',
  sort: 1,
  data: {
    dmg: 15
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '申鹤天赋：[大洞弥罗尊法] 处于神女遣灵真诀的领域中的当前场上角色，冰元素伤害加成提高[dmg]%',
  sort: 1,
  data: {
    dmg: 15
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '申鹤圣遗物：[昔日宗室之仪4] 释放元素爆发后，队伍中所有角色攻击力提升[atkPct]%',
  sort: 1,
  data: {
    atkPct: 20
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '云堇技能：[破嶂见旌仪] 对敌人造成普通攻击伤害时，造成的伤害提高[aPlus]',
  sort: 9,
  data: {
	aPlus: 2261.6
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '云堇2命：[诸般切末] 施放破嶂见旌仪后，附近队伍中所有角色普通攻击造成的伤害提高[aDmg]%',
  sort: 9,
  data: {
    aDmg: 15
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '云堇6命：[庄谐并举] 处于「飞云旗阵」状态下普通攻击的攻击速度提升[_aSpeed]%',
  data: {
    _aSpeed: 12
  }
},
{
  check: ({ cons , params , artis }) => params.teamA === true && artis.千岩牢固 !== 4 ,
  title: '重云圣遗物：[千岩牢固4] 元素战技命中敌人使队伍中附近的所有角色攻击力提升[atkPct]%护盾强效果提升[shield]% { 该圣遗物效果不可叠加 }',
  sort: 1,
  data: {
    atkPct: 20,
    shield: 30
  }
},
{
  check: ({ cons , params }) => ((cons < 6 && cons > 1) && params.teamA === true),
  title: '重云武器：[狼的末路-精1] 攻击命中生命值低于30%的敌人时队伍中所有成员的攻击力提高[atkPct]%',
  sort: 1,
  data: {
    atkPct: 40
  }
},
{
  check: ({ cons , params }) => (cons >= 6 && params.teamA === true),
  title: '重云武器：[狼的末路-精5] 攻击命中生命值低于30%的敌人时队伍中所有成员的攻击力提高[atkPct]%',
  sort: 1,
  data: {
    atkPct: 80
  }
},
{
  check: ({ params }) => params.teamB === true,
  title: '胡桃天赋：[蝶隐之时] 蝶引来生施加的彼岸蝶舞状态结束后，队伍中所有角色的暴击率提高[qCpct]%',
  data: {
    qCpct: 12
  }
},
{
  check: ({ params }) => params.teamB === true,
  title: '夜兰天赋：[妙转随心]「玄掷玲珑」存在期间能使队伍中自己的当前场上角色造成的伤害提高，至多提高[qDmg]%',
  data: {
	eDmg: 35,
	qDmg: 50
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '元素共鸣：[坚定之岩] 护盾强效提升[shield]%，造成的伤害提升[dmg]%，降低敌人[kx]%岩元素抗性',
  data: {
    shield: 25,
    dmg: 15,
    kx: 20
  }
},
{
  check: ({ params }) => params.teamA === true,
  title: '元素共鸣：[粉碎之冰] 攻击处于冰元素附着或冻结下的敌人时，暴击率提高[cpct]%',
  data: {
    cpct: 15
  }
},
{
  check: ({ params }) => params.teamB === true,
  title: '元素共鸣：[愈疗之水] 生命值上限提升[hpPct]%',
  data: {
  	hpPct: 25
  }
},
{title: `2.29最后修改：[10.19重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs30ranking} 魔物产球设置:${energy} 更新日志:${renew} 其他信息:${information}`}]