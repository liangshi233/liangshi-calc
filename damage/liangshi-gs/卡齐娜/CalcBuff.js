import { characterBuffGs, enemyBuffGs, ImaginariumBuff } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
{
  title: '卡齐娜天赋：[山的回声] 队伍中的附近的角色触发「夜魂迸发」,岩元素伤害加成提升[dmg]%',
  data: {
    dmg: 20
  }
},
{
  title: '卡齐娜天赋：[坚岩之重] 冲天转转造成的伤害提升[ePlus]%。',
  sort: 9,
  data: {
    ePlus: ({ calc, attr }) => calc(attr.def) * 20 / 100,
    qPlus: ({ calc, attr }) => calc(attr.def) * 20 / 100
  }
},
{
  title: '卡齐娜1命：[晶片，也是一种宝石] 队伍中的角色获取晶片时，将恢复[_energyevery]点元素能量',
  cons: 1,
  data: {
    _energyevery: 3
  }
},
{
  check: ({ params }) => params.EnemiesNumber >= 1,
  title: '卡齐娜4命：[敌人越多，越要小心] 现在，认真时间！的超级钻钻领域中，存在的敌人数量为[_buff]名或更多时，领域中的队伍中当前场上角色的防御力提升[defPct]%',
  cons: 4,
  data: {
    _buff: ({ params }) => (params.EnemiesNumber || 4),
    defPct: ({ params }) => 4 * ((params.EnemiesNumber || 4) + 1)
  }
},
{
  title: '卡齐娜6命：[这一次，我一定要赢] 队伍中自己的当前场上角色的护盾因任何原因被替换或摧毁时，将造成岩元素范围伤害',
  cons: 6
}]

export const TeamBuff_Kachina = [
{
  check: ({ params }) => params.EnemiesNumber >= 1 && params.team === true && params.Kachina === true,
  title: '卡齐娜4命：[敌人越多，越要小心] 现在，认真时间！的超级钻钻领域中，存在的敌人数量为[_buff]名或更多时，领域中的队伍中当前场上角色的防御力提升[defPct]%',
  cons: 4,
  data: {
    _buff: ({ params }) => (params.EnemiesNumber || 4),
    defPct: ({ params }) => 4 * ((params.EnemiesNumber || 4) + 1)
  }
}]

