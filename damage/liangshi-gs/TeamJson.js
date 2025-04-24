import fs from 'node:fs'

function TeamJson(CharacterName) {
  let TeamData = null
  try {
    TeamData = fs.readFileSync(`plugins/liangshi-calc/damage/liangshi-gs/${CharacterName}/TeamData.json`, 'utf8')
    TeamData = JSON.parse(TeamData)
  } catch (err) {
    console.error(`${CharacterName}组队数据读取失败:`, err)
  }
  return TeamData
}

export { TeamJson }
