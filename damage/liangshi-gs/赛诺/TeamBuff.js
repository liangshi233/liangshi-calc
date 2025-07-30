import fs from 'node:fs'

let TeamData = null
try {
  TeamData = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/赛诺/TeamData.json', 'utf8')
  TeamData = JSON.parse(TeamData)
} catch (err) {
  console.error('组队数据读取失败:', err)
}

export const TeamBuff_Cyno = [
{
  check: ({ params, cons, uid }) => ((!TeamData[uid] ? cons : TeamData[uid].base.Tcharacter.cons) >= 4) && params.team === true && params.Cyno === true,
  title: '赛诺4命：[巡仪·蒇护禁罔] 处于圣仪·煟煌随狼行的启途誓使状态下时，触发感电、超导、超载、原激化、超激化、超绽放、雷元素扩散反应后，将为队伍中附近的所有角色恢复[_energyevery]点元素能量。',
  data: {
    _energyevery: 3
  }
}]
