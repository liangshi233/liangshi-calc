import { characterBuffGs, enemyBuffGs, ImaginariumBuff, MasteryGs } from '../../../resources/CalcBuff/index.js'

export const CalcBuff = [
characterBuffGs,
enemyBuffGs,
ImaginariumBuff,
MasteryGs,
{
  title: '伊法天赋：[场中医者视野] 队伍中所有角色当前夜魂值的总和[buff]，队伍中附近的角色触发的扩散反应与感电反应造成的伤害提高[swirl]%',
  data: {
    buff: ({ params }) => params["队伍夜魂值总和占位"] || 9999,
    swirl: ({ params, cons }) => Math.min(((params["队伍夜魂值总和占位"] || 9999)), (cons >= 2 ? 200 : 150)) * 0.15,
    electroCharged: ({ params, cons }) => Math.min(((params["队伍夜魂值总和占位"] || 9999)), (cons >= 2 ? 200 : 150)) * 0.15
  }
},
{
  title: '伊法天赋：[互助救援协议] 队伍中的附近的角色触发「夜魂迸发」时，元素精通提升[mastery]',
  data: {
    mastery: 100
  }
},
{
  title: '伊法1命：[藤典药剂的备制] 「援护射击」命中敌人时，将恢复[_energyevery]点元素能量',
  cons: 1,
  data: {
    _energyevery: 6
  }
},
{
  title: '伊法2命：[祈祷弹道的助灵] 持有「救援要义」的上限提升至200.0点',
  cons: 2
}]
