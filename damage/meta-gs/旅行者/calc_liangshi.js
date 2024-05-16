import LSconfig from '../../../../../plugins/liangshi-calc/components/LSconfig.js'

let cfg = LSconfig.getConfig('user', 'config')
let NamePath = cfg.namemodel
let rankingOnePath = cfg.rankingOnemodel
let rankingTwoPath = cfg.rankingTwomodel
let rankingThreePath = cfg.rankingThreemodel
let gs2010ranking = cfg.gs2010ranking
let energy = cfg.energymodel
let aName1 = '普通攻击' , aName2 = '普通攻击' , aName3 = '普通攻击' , aName4 = '普通攻击' , aName5 = '普通攻击' , aName6 = '普通攻击'
let a2Name = '重击'
let a3Name = '下落攻击'
let eName1 = ''
let eName2 = '风涡剑'
let eName3 = '星陨剑'
let eName4 = '雷影剑'
let eName5 = '草缘剑'
let eName6 = '水纹剑'
let eName1T = 'E' , eName2T = 'E' , eName3T = 'E' , eName4T = 'E' , eName5T = 'E' , eName6T = 'E'
let qName1 = ''
let qName2 = '风息激荡'
let qName3 = '岩潮叠嶂'
let qName4 = '雷轰电转'
let qName5 = '偃草若化'
let qName6 = '扬水制流'
let qName1T = 'Q' , qName2T = 'Q' , qName3T = 'Q' , qName4T = 'Q' , qName5T = 'Q' , qName6T = 'Q'
if ( NamePath !== 1 ) {
 if ( NamePath == 2 ) {
  aName1 = '故去的追忆'
  aName2 = '异邦铁风'
  aName3 = '异邦岩峰'
  aName4 = '异邦惊雷'
  aName5 = '异邦草翦'
  aName6 = '异邦激流'
  eName1T = ''
  eName2T = '风涡剑'
  eName3T = '星陨剑'
  eName4T = '雷影剑'
  eName5T = '草缘剑'
  eName6T = '水纹剑'
  qName1T = ''
  qName2T = '风息激荡'
  qName3T = '岩潮叠嶂'
  qName4T = '雷轰电转'
  qName5T = '偃草若化'
  qName6T = '扬水制流'
 } else if ( NamePath == 3 ) {
  eName1T = ''
  eName2T = '风涡剑'
  eName3T = '星陨剑'
  eName4T = '雷影剑'
  eName5T = '草缘剑'
  eName6T = '水纹剑'
  qName1T = ''
  qName2T = '风息激荡'
  qName3T = '岩潮叠嶂'
  qName4T = '雷轰电转'
  qName5T = '偃草若化'
  qName6T = '扬水制流'
 } else if ( NamePath == 4 ) {
  eName1 = eName2 = eName3 = eName4 = eName5 = eName6 = '元素战技'
  qName1 = qName2 = qName3 = qName4 = qName5 = qName6 = '元素爆发'
  eName1T = eName2T = eName3T = eName4T = eName5T = eName6T = '元素战技'
  qName1T = qName2T = qName3T = qName4T = qName5T = qName6T = '元素爆发'
 } else if ( NamePath == 5 ) {
  aName1 = aName2 = aName3 = aName4 = aName5 = aName6 = '普攻'
  a3Name = '下落'
  eName1 = eName2 = eName3 = eName4 = eName5 = eName6 = 'E技能'
  qName1 = qName2 = qName3 = qName4 = qName5 = qName6 = 'Q技能'
  eName1T = eName2T = eName3T = eName4T = eName5T = eName6T = 'E技能'
  qName1T = qName2T = qName3T = qName4T = qName5T = qName6T = 'Q技能'
 } else if ( NamePath == 6 ) {
  aName1 = aName2 = aName3 = aName4 = aName5 = aName6 = 'A'
  a2Name = 'Z'
  a3Name = '戳'
  eName1 = eName2 = eName3 = eName4 = eName5 = eName6 = 'E'
  qName1 = qName2 = qName3 = qName4 = qName5 = qName6 = 'Q'
  eName1T = eName2T = eName3T = eName4T = eName5T = eName6T = 'E'
  qName1T = qName2T = qName3T = qName4T = qName5T = qName6T = 'Q'
 }
}
const miss = ['a', 'z', 'c', 'h', 'f', 'y', 'dph', 'hph', 'dps', 'hps']
let ranking = 'undefined'
if (!cfg.gs2010ranking) {
 if ( rankingOnePath == 'm' ) {
 ranking = 'e'
 } else if (miss.includes(rankingOnePath)) {
   if ( rankingTwoPath == 'm' ) {
    ranking = 'e'
   } else if (miss.includes(rankingTwoPath)) {
     if ( rankingThreePath == 'm' ) {
      ranking = 'e'
     } else if (miss.includes(rankingThreePath)) {
      logger.mark('[旅行者] 排名规则均未命中，已选择默认排名规则')
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
 ranking = `${gs2010ranking}`
}
if (!cfg.namemodel) {
energy = 0
}
let renew = '无'
let information = '如有问题请输入 #伤害计算反馈'

export const details = [
{
  check: ({ element }) => element === '风',
  title: `${aName2}风刃伤害`,
  dmgKey: 'a',
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 60 / 100, 'a')
},
{
  check: ({ element }) => element === '风',
  title: '初始切割伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['初始切割伤害'], 'e')
},
{
  check: ({ element }) => element === '风',
  title: '初始爆风伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['初始爆风伤害'], 'e')
},
{
  check: ({ element }) => element === '风',
  title: '最大切割伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['最大切割伤害'], 'e')
},
{
  check: ({ element }) => element === '风',
  title: '最大爆风伤害',
  dmg: ({ talent }, dmg) => dmg(talent.e['最大爆风伤害'], 'e')
},
{
  check: ({ element }) => element === '风',
  title: `${eName2}完整伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => {
    let e1 = dmg(talent.e['初始切割伤害'], 'e')
    let e3 = dmg(talent.e['最大切割伤害'], 'e')
    let e4 = dmg(talent.e['最大爆风伤害'], 'e')
    return {
      dmg: e1.dmg * 2 + e3.dmg * 4 + e4.dmg,
      avg: e1.avg * 2 + e3.avg * 4 + e4.avg
    }
  }
},
{
  check: ({ element }) => element === '风',
  title: `${qName2}每跳伤害`,
  dmgKey: 'undefined',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['龙卷风伤害'], 'q')
},
{
  check: ({ element }) => element === '风',
  title: `${qName2}完整伤害`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['龙卷风伤害'], 'q')
    return {
      dmg: q1.dmg * 9,
      avg: q1.avg * 9
    }
  }
},
{
  check: ({ element }) => element === '风',
  title: '扩散反应伤害',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('swirl')
},
{
  check: ({ element }) => element === '岩',
  title: `${aName3}崩毁伤害`,
  dmgKey: 'a',
  dmg: ({ attr, calc }, { basic }) => basic(calc(attr.atk) * 60 / 100, 'a')
},
{
  check: ({ element }) => element === '岩',
  title: `${eName3}伤害`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  check: ({ element }) => element === '岩',
  title: `${qName3}单段伤害`,
  dmgKey: 'undefined',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['地震波单次伤害'], 'q')
},
{
  check: ({ element }) => element === '岩',
  title: `${qName3}完整伤害`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => {
    let q1 = dmg(talent.q['地震波单次伤害'], 'q')
    return {
      dmg: q1.dmg * 4,
      avg: q1.avg * 4
    }
  }
},
{
  check: ({ cons , element }) => cons >= 1 && element === '岩',
  title: `${qName3T}后${eName3}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  check: ({ element }) => element === '岩',
  title: '结晶护盾吸收量',
  dmgKey: 'r',
  dmg: ({}, { reaction }) => reaction('crystallize')
},
{
  check: ({ element }) => element === '雷',
  title: `${eName4}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  check: ({ element }) => element === '雷',
  title: `${eName4}激化`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'aggravate')
},
{
  check: ({ element }) => element === '雷',
  title: `${eName4}元素充能提升`,
  dmgKey: 'f',
  params: { e: true },
  dmg: ({ attr , calc }) => {
    return {
      avg: Format.percent( ( calc(attr.recharge) * 10 / 100 + 20 ) / 100 ),
      type: 'text'
    }
  }
},
{
  check: ({ element }) => element === '雷',
  title: `${qName4}释放伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  check: ({ element }) => element === '雷',
  title: `${qName4}释放激化`,
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'aggravate')
},
{
  check: ({ element }) => element === '雷',
  title: `${qName4}落雷伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q')
},
{
  check: ({ cons , element }) => cons >= 6 && element === '雷',
  title: `${qName4}强化落雷`,
  params: { q: true , q2: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q')
},
{
  check: ({ element }) => element === '雷',
  title: `${qName4}落雷激化`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q', 'aggravate')
},
{
  check: ({ cons , element }) => cons >= 6 && element === '雷',
  check: ({ cons }) => cons >= 6,
  title: `${qName4}强化落雷激化`,
  params: { q: true , q2: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['威光落雷伤害'], 'q', 'aggravate')
},
{
  check: ({ element }) => element === '草',
  title: `${eName5}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  check: ({ element }) => element === '草',
  title: `${eName5}激化`,
  dmgKey: 'e',
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},
{
  check: ({ element }) => element === '草',
  title: `${qName5}单段伤害`,
  dmgKey: 'undefined',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['草灯莲攻击伤害'], 'q')
},
{
  check: ({ element }) => element === '草',
  title: `${qName5}单段激化`,
  dmgKey: 'q',
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['草灯莲攻击伤害'], 'q', 'spread')
},
{
  check: ({ element }) => element === '草',
  title: `${qName5}爆发伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.q['激烈爆发伤害'], 'q')
},
{
  check: ({ element }) => element === '草',
  title: `${qName5T}后${eName5}伤害`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e')
},
{
  check: ({ element }) => element === '草',
  title: `${qName5T}后${eName5}激化`,
  params: { q: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['技能伤害'], 'e', 'spread')
},
{
  check: ({ element }) => element === '草',
  title: '草原核伤害',
  dmgKey: 'r',
  dmg: ({calc, attr}, { reaction }) => reaction('bloom')
},
{
  check: ({ element }) => element === '水',
  title: '水滴伤害',
  dmgKey: 'undefined',
  dmg: ({ talent }, dmg) => dmg(talent.e['露滴伤害'], 'e')
},
{
  check: ({ element }) => element === '水',
  title: `${eName6}伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e')
},
{
  check: ({ element }) => element === '水',
  title: `${eName6}蒸发`,
  dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e', 'vaporize')
},
{
  check: ({ element }) => element === '水',
  title: '充盈水滴伤害',
  params: { e: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['露滴伤害'], 'e')
},
{
  check: ({ element }) => element === '水',
  title: `充盈${eName6}伤害`,
  params: { e2: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e')
},
{
  check: ({ element }) => element === '水',
  title: `充盈${eName6}蒸发`,
  dmgKey: 'e',
  params: { e2: true },
  dmg: ({ talent }, dmg) => dmg(talent.e['喷发激流伤害'], 'e', 'vaporize')
},
{
  check: ({ element }) => element === '水',
  title: `${qName6}单段伤害`,
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q')
},
{
  check: ({ element }) => element === '水',
  title: `${qName6}单段蒸发`,
  dmgKey: 'q',
  dmg: ({ talent }, dmg) => dmg(talent.q['技能伤害'], 'q', 'vaporize')
}]

export const defDmgKey = `${ranking}`
export const mainAttr = 'atk,cpct,cdmg,mastery'

export const buffs = [
{
  title: '任务加成：[单手剑战斗技巧•八] 在任务『近在咫尺的目标』中使用『单手剑战斗技巧•八』后，基础攻击力提升[_atkPlus]点 { 此效果暂不参与计算 }',
  data: {
    _atkPlus: 3
  }
},
{
  title: '旅行者2命：[革新的旋风] 元素充能效率提升[recharge]%',
  check: ({ element }) => element === '风',
  cons: 2,
  data: {
    recharge: 16
  }
},
{
  title: '旅行者4命：[眷护的和风] 风涡剑持续期间，受到的伤害降低[_reduction]%',
  check: ({ element }) => element === '风',
  cons: 4,
  data: {
    _reduction: 10
  }
},
{
  title: '旅行者6命：[纠缠的信风] 受到风息激荡伤害的目标，风元素抗性下降[kx]%',
  check: ({ params , element }) => params.q === true && element === '风',
  cons: 6,
  data: {
    kx: 20
  }
},
{
  title: '旅行者天赋：[破碎的绝岩] 星陨剑的冷却时间减少[_ecdPlus]秒',
  check: ({ element }) => element === '岩',
  data: {
    _ecdPlus: 2
  }
},
{
  title: '旅行者1命：[巍然的青岩] 队伍中角色处于岩潮叠嶂的岩嶂包围中时，暴击率提升[cpct]%，并提高抗打断能力。',
  check: ({ params , element }) => params.q === true && element === '岩',
  cons: 1,
  data: {
    cpct: 10
  }
},
{
  title: '旅行者4命：[巍然的青岩] 岩潮叠嶂引发的震荡波击中敌人，会恢复[_energyevery]点元素能量。',
  check: ({ element }) => element === '岩',
  cons: 4,
  data: {
    _energyevery: 25
  }
},
{
  title: '旅行者6命：[永世的磐岩] 岩潮叠嶂的岩嶂持续时间延长[_qSustainedPlus]秒；星陨剑的荒星持续时间延长[_eSustainedPlus]秒。',
  check: ({ element }) => element === '岩',
  cons: 6,
  data: {
    _qSustainedPlus: 5 ,
    _eSustainedPlus: 10
  }
},
{
  title: '旅行者技能：[雷影剑] 吸收丰穰勾玉，在持续时间内提高元素充能效率[recharge]%。',
  check: ({ params , element }) => params.e !== true && element === '雷',
  data: {
    recharge: ({ attr , calc }) => calc(attr.recharge) * 10 / 100 + 20
  }
},
{
  title: '旅行者天赋：[转瞬的迅雷] 队伍中附近的其他角色获取雷影剑产生的丰穰勾玉时，雷影剑的冷却时间减少[_ecdPlus]秒。 { 该效果单人不生效 }',
  check: ({ element }) => element === '雷',
  data: {
    _ecdPlus: 1.5
  }
},
{
  title: '旅行者1命：[丰穰的春雷] 释放雷影剑能产生的丰穰勾玉数量提升至3枚',
  check: ({ element }) => element === '雷',
  cons: 1
},
{
  title: '旅行者2命：[震怒的苍雷] 雷轰电转的威光命中敌人后，会使敌人的雷元素抗性降低[kx]%',
  check: ({ params , element }) => params.q === true && element === '雷',
  cons: 2,
  data: {
    kx: 15
  }
},
{
  title: '旅行者6命：[撼世的神雷] 雷轰电转每引发2次威光落雷，就使下一次威光落雷造成的伤害提高[qDmg]%，并为当前角色额外恢复[_energyevery]点元素能量。',
  check: ({ params , element }) => params.q2 === true && element === '雷',
  cons: 6,
  data: {
    qDmg: 15 ,
    _energyevery: 1
  }
},
{
  title: '旅行者天赋：[蔓生的埜草] 草灯莲将在其存在期间每秒获得一层莲光遍照效果，使其领域内的当前场上角色的元素精通提升[mastery]点元素精通。',
  check: ({ params , element }) => params.q === true && element === '草',
  data: {
    mastery: 60
  }
},
{
  title: '旅行者天赋：[繁庑的丛草] 草缘剑造成的伤害提升[eDmg]%，偃草若化造成的伤害提升[qDmg]%',
  check: ({ element }) => element === '草',
  data: {
    eDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery)) * 0.15),
    qDmg: ({ calc, attr }) => Math.min(100, (calc(attr.mastery)) * 0.1),
  }
},
{
  title: '旅行者1命：[寄身的倚草] 草缘剑命中敌人后，将恢复[_energyevery]点元素能量。',
  check: ({ element }) => element === '草',
  cons: 1,
  data: {
    _energyevery: 3.5
  }
},
{
  title: '旅行者2命：[健韧的劲草] 草灯莲的存在时间延长[_qSustainedPlus:]秒。',
  check: ({ element }) => element === '草',
  cons: 2,
  data: {
    _qSustainedPlus: 3
  }
},
{
  title: '旅行者6命：[蕴思的霜草] 处于草灯莲的莲光遍照效果影响下的角色获得[dmg]%草元素伤害加成',
  check: ({ params , element }) => params.q === true && element === '草',
  cons: 6,
  data: {
    dmg: 12
  }
},
{
  title: '旅行者技能：[水纹剑] 长按施放时，若生命值高于50%，露滴造成的伤害将提高[ePlus]，并且每秒损失[_deHp]生命值。',
  check: ({ params , element }) => params.e === true && element === '水',
  data: {
    ePlus: ({ talent, calc, attr }) => calc(attr.hp) * talent.e['充盈伤害增加'] / 100 ,
    _deHp: ({ calc, attr }) => calc(attr.hp) * 4 / 100
  }
},
{
  title: '旅行者天赋：[澄明的净水] 长按施放水纹剑时如果通过充盈消耗了生命值，则在施放结束时的喷发激流造成的伤害提高[ePlus]',
  check: ({ params , element }) => params.e2 === true && element === '水',
  data: {
    ePlus: ({ calc, attr }) => Math.min( 5000 , ( ( calc(attr.hp) * 50 / 100 ) * 45 / 100 ) )
  }
},
{
  title: '旅行者1命：[微澜的湖水] 拾取源水之滴后，将恢复[_energyevery]点元素能量。',
  check: ({ element }) => element === '水',
  cons: 1,
  data: {
    _energyevery: 2
  }
},
{
  title: '旅行者2命：[潺涓的碧水] 扬水制流的浮水泡沫移动的速度降低30%，持续时间延长[_qSustainedPlus]秒。',
  check: ({ element }) => element === '水',
  cons: 2,
  data: {
    _qSustainedPlus: 3
  }
},
{title: `5.15最后修改：[10.26重置] 显示模式:${NamePath} 排行设置:${rankingOnePath},${rankingTwoPath},${rankingThreePath} 专属排行设置:${gs2010ranking} 更新日志:${renew} 其他信息:${information}`}]
