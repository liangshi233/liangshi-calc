import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  check: ({ params }) => params.Wave_Momentum != undefined,
  title: '玛拉妮技能：[踏鲨破浪] 浪势充能使鲨鲨撕咬造成的伤害提升[aPlus]巨浪鲨鲨撕咬伤害额外提升[_aPlus]',
  sort: 9,
  data: {
    aPlus: ({ talent, calc, attr, params }) => calc(attr.hp) * talent.e['浪势充能伤害提升'] / 100 * params.Wave_Momentum,
    _aPlus: ({ talent, calc, attr }) => calc(attr.hp) * talent.e['巨浪鲨鲨撕咬伤害额外提升'] / 100
  }
},
{
  title: '玛拉妮天赋：[纳塔最好的向导] 队伍中的附近的角色触发「夜魂迸发」,爆瀑飞弹造成的伤害提升[qPlus]',
  sort: 9,
  data: {
    qPlus: ({ calc, attr }) => calc(attr.hp) * 45 / 100
  }
},
{
  check: ({ params }) => params.first === true,
  title: '玛拉妮1命：[悠闲的「梅兹特利」…] 进入夜魂加持状态后的第一次巨浪鲨鲨撕咬及它所触发的鲨鲨飞弹造成的伤害提升[aPlus]',
  cons: 1,
  sort: 9,
  data: {
    aPlus: ({ calc, attr }) => calc(attr.hp) * 66 / 100
  }
},
{
  title: '玛拉妮4命：[鲨鲨主食是豚豚。] 爆瀑飞弹造成的伤害提升[qDmg]%,获得豚豚球时恢复[_energyevery]点元素能量',
  cons: 4,
  data: {
    _energyevery: 3,
    qDmg: 75
  }
},
{
  title: '玛拉妮6命：[「流泉之众」的精神] 命之座「悠闲的「梅兹特利」…」的伤害提升效果，移除原本每次夜魂加持只能触发一次的限制。',
  cons: 6
}]
