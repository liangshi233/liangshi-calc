import fs from 'node:fs'

let TeamData = null
try {
  TeamData = fs.readFileSync('plugins/liangshi-calc/damage/meta-gs/伊涅芙/TeamData.json', 'utf8')
  TeamData = JSON.parse(TeamData)
} catch (err) {
  console.error('组队数据读取失败:', err)
}


export const TeamBuff_Ineffa = [
{
  check: ({ params }) => params.team === true && params.Ineffa === true,
  title: '伊涅芙天赋：[全相重构协议] 施放元素爆发后元素精通提升[mastery]%',
  data: {
    mastery: 120
  }
},
{
  check: ({ params }) => params.team === true && params.Ineffa === true && params.Lunar === true,
  title: '月兆祝赐：[象拟中继] 队伍中的角色触发感电反应时，将转为触发月感电反应,基础伤害提升[fyplus]',
  data: {
    fypct: 14
  }
},
{
  check: ({ params, cons, uid }) => ((!TeamData[uid] ? cons : TeamData[uid].base.Tcharacter.cons) >= 1) && params.team === true && params.Ineffa === true && params.Lunar === true,
  title: '伊涅芙1命：[循环整流引擎] 展开光流屏障护盾时，月感电反应造成的伤害提升[electroCharged]%',
  data: {
    lunarCharged: 50
  }
}]
