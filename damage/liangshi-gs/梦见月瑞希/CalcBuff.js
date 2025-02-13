import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Twenty_Three_Nights === true,
  title: '梦见月瑞希1命：[宿雾若水遥] 二十三夜待状态下的敌人受到风元素伤害而触发扩散反应的伤害值提升[fyplus]',
  cons: 1,
  sort: 9,
  data: {
    fyplus: ({ attr, calc }) => calc(attr.mastery) * 1100 / 100
  }
},
{
  title: '梦见月瑞希2命：[缠忆君影梦相见] 进入梦浮状态时，为附近的队伍中所有其他角色提供[_dmg]%元素伤害加成',
  cons: 2,
  sort: 9,
  data: {
    _dmg: ({ attr, calc }) => calc(attr.mastery) * 2 / 100
  }
},
{
  title: '梦见月瑞希4命：[泉轻流花暖] 拾取元素爆发安乐秘汤疗法中的梦见风名物点心时，将同时造成伤害与治疗，并恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 5
  }
},
{
  title: '梦见月瑞6命：[慕念萦心间] 梦浮状态下时，队伍中附近的角色触发的扩散反应造成的伤害,暴击率提升[_swirlCpct]暴击伤害提升[_swirlCdmg]%',
  cons: 6,
  data: {
    _swirlCpct: 30,
    _swirlCdmg: 100
  }
},
{
  title: '梦见月瑞希天赋：[名月浮声] 在梦浮状态下触发扩散反应时，梦浮状态的持续时间延长[_tSustainedPlus]秒。',
  data: {
    _tSustainedPlus: 2.5
  }
},
{
  title: '梦见月瑞希天赋：[昼想夜梦] 队伍中附近的其他角色的元素类型为火元素、水元素、冰元素或雷元素的攻击命中敌人时,元素精通提升[mastery]点',
  data: {
    mastery: 100
  }
},
{
  title: '梦见月瑞希技能：[秋沙歌枕巡礼] 触发的扩散反应造成的伤害提升[swirl]%',
  sort: 9,
  data: {
    swirl: ({ attr, calc, talent }) => calc(attr.mastery) * talent.e['每点精通提升扩散伤害百分比']
  }
}]
