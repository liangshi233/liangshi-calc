import fs from 'node:fs'
import { WeaponTeam } from '../weapon/index.js'

let TeamData = null
try {
  TeamData = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/夜兰/TeamData.json', 'utf8')
  TeamData = JSON.parse(TeamData)
} catch (err) {
  console.error('组队数据读取失败:', err)
}
let TeamWeapon = WeaponTeam(TeamData, "Ye_Lan", "若水", "夜兰")


export const TeamBuff_Ye_Lan = [
  {
    check: ({ params }) => params.team === true && params.Ye_Lan === true && !params.TruceTime,
    title: '夜兰天赋：[猜先有方] 「玄掷玲珑」存在[buff]秒，使队伍中自己的当前场上角色造成的伤害提高[dmg]%',
    data: {
      buff: 7.5,
      dmg: 7.5 * 3.5 + 1
    }
  },
  ...TeamWeapon
]
