import { CurrentImaginarium } from '../FantasticalBlessings.js'
let NowImaginarium = CurrentImaginarium()

//开幕祝福
export const ImaginariumBuff = {
  check: ({ characterName }) => NowImaginarium.includes(characterName),
  title: '幻境祝福：[开幕角色] 角色编入队伍后，生命值、攻击力与防御力提升[hpPct]%,该效果不论是否在幻想真境剧诗中都将生效。',
  data: {
    hpPct: 20,
    atkPct: 20,
    defPct: 20
  }
}

//火草 草火 燃烧
export const burningBuff = [{
  check: ({ params }) => params.ImaginariumBuff >= 1,
  title: '辉彩祝福：[燃烧*原态] 角色对燃烧伤害的火元素抗性提升，燃烧反应造成的伤害提升[burning]%',
  data: {
    burning: 500
  }
},
{
  check: ({ params }) => params.ImaginariumBuff >= 3,
  title: '辉彩祝福：[燃烧*进阶] 燃烧反应造成的伤害提升[burning]%',
  data: {
    burning: 100
  }
}]

//火雷 雷火 超载
export const overloadedBuff = [{
  check: ({ params, element }) => params.ImaginariumBuff >= 1 && ['火', '雷'].includes(element),
  title: '辉彩祝福：[超载*原态] 对敌人触发超载反应后，敌人抗性降低[kx]%',
  data: {
    kx: 5.5 * 4
  }
},
{
  check: ({ params, element }) => params.ImaginariumBuff >= 3 && ['火', '雷'].includes(element),
  title: '辉彩祝福：[超载*进阶] 对敌人触发超载反应后，敌人抗性降低[kx]%',
  data: {
    kx: 1.5 * 4
  }
}]

//水雷 雷水 感电
export const electroChargedBuff = [{
  check: ({ params }) => params.ImaginariumBuff >= 1,
  title: '辉彩祝福：[感电*原态] 触发感电反应时，感电反应造成的伤害提升[electroCharged]%',
  data: {
    electroCharged: 250
  }
},
{
  check: ({ params }) => params.ImaginariumBuff >= 2,
  title: '辉彩祝福：[感电*分支] 每2秒随机为当前场上角色恢复[_energyevery]%点元素能量',
  data: {
    _energyevery: 2
  }
},
{
  check: ({ params }) => params.ImaginariumBuff >= 3,
  title: '辉彩祝福：[感电*进阶] 触发感电反应时，感电反应造成的伤害提升[electroCharged]%',
  data: {
    electroCharged: 50
  }
}]

//冰雷 雷冰 超导 没出现过
export const superConductBuff = [{}]

//雷草 草雷 激化
export const spreadBuff = [{
  check: ({ params, element }) => params.ImaginariumBuff >= 2 && ['草', '雷'].includes(element),
  title: '辉彩祝福：[激化*分支] 受角色触发的原激化反应影响的敌人抗性降低[kx]%',
  data: {
    kx: 10
  }
}]

//水草 草水 绽放
export const bloomBuff = [{
  check: ({ params }) => params.ImaginariumBuff >= 1,
  title: '辉彩祝福：[绽放*原态] 草原核造成的伤害（包含烈绽放、超绽放）提升[bloom]%',
  data: {
    bloom: 150,
    burgeon: 150,
    hyperBloom: 150
  }
},
{
  check: ({ params }) => params.ImaginariumBuff >= 3,
  title: '辉彩祝福：[绽放*进阶] 草原核造成的伤害（包含烈绽放、超绽放）提升[bloom]%',
  data: {
    bloom: 50,
    burgeon: 50,
    hyperBloom: 50
  }
},
{
  check: ({ params, element }) => params.ImaginariumBuff >= 4 && ['草', '水'].includes(element),
  title: '辉彩祝福：[绽放*极致] 产生草原核时，队伍中所有角色获得[dmg]%伤害加成',
  data: {
    dmg: 18 * 4
  }
}]



//水火 火水 蒸发
export const vaporizeBuff = [{
  check: ({ params, element }) => params.ImaginariumBuff >= 1 && ['火', '水'].includes(element),
  title: '辉彩祝福：[蒸发*原态] 对敌人触发蒸发反应后，敌人的火元素与水元素抗性降低[kx]%',
  data: {
    kx: 25
  }
},
{
  check: ({ params, element }) => params.ImaginariumBuff >= 3 && ['火', '水'].includes(element),
  title: '辉彩祝福：[蒸发*进阶] 对敌人触发蒸发反应后，敌人的火元素与水元素抗性降低[kx]%',
  data: {
    kx: 5
  }
},
{
  check: ({ params }) => params.ImaginariumBuff >= 4,
  title: '辉彩祝福：[蒸发*极致] 蒸发反应造成的伤害提升[vaporize]%',
  data: {
    vaporize: 50
  }
}]

//冰火 火冰 融化
export const meltBuff = [{
  check: ({ params }) => params.ImaginariumBuff >= 2,
  title: '辉彩祝福：[融化*分支] 角色触发融化反应造成的伤害提升[melt]%',
  data: {
    melt: 30
  }
},
{
  check: ({ params, element }) => params.ImaginariumBuff >= 4 && ['火', '冰'].includes(element),
  title: '辉彩祝福：[融化*极致] 被冰霜崩破或炽升火柱命中敌人的火元素和冰元素抗性降低[kx]%',
  data: {
    kx: 40
  }
}/*,
{
  check: ({ params, element }) => params.ImaginariumBuff >= 4 && ['火', '冰'].includes(element),
  title: '辉彩祝福：[融化*极致] 高度温差效果持续期间，暴击伤害提升[cdmg]%',
  data: {
    cdmg: 90
  }
}*/]

//？岩  结晶
export const crystallizeBuff = [{
  check: ({ params, element }) => params.ImaginariumBuff >= 1 && !['风', '草'].includes(element),
  title: '辉彩祝福：[结晶*原态] 获得结晶反应产生的晶片后，获得[dmg]%元素伤害加成',
  data: {
    dmg: 50
  }
},
{
  check: ({ params, element }) => params.ImaginariumBuff >= 3 && !['风', '草'].includes(element),
  title: '辉彩祝福：[结晶*进阶] 获得结晶反应产生的晶片后，获得[dmg]%元素伤害加成',
  data: {
    dmg: 10
  }
}]

//？风 风？ 扩散
export const swirlBuff = [{
  check: ({ params, element }) => params.ImaginariumBuff >= 1 && ['风', '雷'].includes(element),
  title: '辉彩祝福：[扩散*原态] 角色对敌人触发雷元素扩散反应时，扩散反应造成的伤害提升[dmg]%，恢复[_energyevery]点元素能量',
  data: {
    swirl: 80 * 3,
    _energyevery: 1.5
  }
},
{
  check: ({ params, element }) => params.ImaginariumBuff >= 1 && ['风', '水'].includes(element),
  title: '辉彩祝福：[扩散*原态] 角色对敌人触发水元素扩散反应时，扩散反应造成的伤害提升[dmg]%，生命值上限提升[hpPct]%',
  data: {
    swirl: 80 * 3,
    hpPct: 8 * 3
  }
},
//火风 风火 扩散
{
  check: ({ params, element }) => params.ImaginariumBuff >= 1 && ['风', '火'].includes(element),
  title: '辉彩祝福：[扩散*原态] 角色对敌人触发火元素扩散反应时，扩散反应造成的伤害提升[dmg]%，攻击力提升[atkPct]%',
  data: {
    swirl: 80 * 3,
    atkPct: 9 * 3
  }
},
{
  check: ({ params, element }) => params.ImaginariumBuff >= 3 && ['风', '火'].includes(element),
  title: '辉彩祝福：[扩散*进阶] 角色对敌人触发火元素扩散反应时，扩散反应造成的伤害提升[dmg]%，攻击力提升[atkPct]%',
  data: {
    swirl: 20 * 3,
    atkPct: 2 * 3
  }
},
{
  check: ({ params, element }) => params.ImaginariumBuff >= 4 && ['风', '火'].includes(element),
  title: '辉彩祝福：[扩散*极致] 造成的伤害提升[dmg]%',
  data: {
    dmg: 50
  }
}/*,
{
  check: ({ params, element }) => params.ImaginariumBuff >= 4 && ['风', '火'].includes(element),
  title: '辉彩祝福：[扩散*极致] 炽岚命中敌人时敌人抗性降低[kx]%',
  data: {
    kx: 5 * 3
  }
}*/]