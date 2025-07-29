import fs from 'node:fs'

let TeamData = null
try {
  TeamData = fs.readFileSync('plugins/liangshi-calc/damage/meta-gs/砂糖/TeamData.json', 'utf8')
  TeamData = JSON.parse(TeamData)
} catch (err) {
  console.error('组队数据读取失败:', err)
}


export const TeamBuff_Sucrose = [
  {
    check: ({ params }) => params.team === true && params.Sucrose === true,
    title: '砂糖天赋：[触媒置换术] 砂糖触发扩散反应时,使队伍中所有对应元素类型的角色元素精通提升[mastery]点',
    data: {
      mastery: ({ element }) => ['冰', '水', '火', '雷'].includes(element) ? 50 : 0
    }
  },
  {
    check: ({ params }) => params.team === true && params.Sucrose === true,
    title: '砂糖天赋：[小小的慧风] 风灵作成·陆叁零捌或禁·风灵作成·染伍同构贰型命中敌人时,为队伍中所有角色提供[mastery]元素精通加成',
    data: {
      mastery: 1000 * 0.2
    }
  },
  {
    check: ({ params, cons, uid }) => ((!TeamData[uid] ? cons : TeamData[uid].base.Tcharacter.cons) >= 6) && params.team === true && params.Sucrose === true,
    title: '砂糖天赋：[混元熵增论] 元素爆发发生了元素转化，队伍中所有角色获得[dmg]%伤害加成',
    data: {
      dmg: ({ element }) => ['冰', '水', '火', '雷'].includes(element) ? 20 : 0
    }
  }
]
