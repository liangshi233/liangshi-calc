import { LSconfig } from '#liangshi'
import fs from 'node:fs'

function RankingKey(CharacterName) {
  let cfg = LSconfig.getConfig('user', 'config')
  let rankingOnePath = cfg.rankingOnemodel
  let rankingTwoPath = cfg.rankingTwomodel
  let rankingThreePath = cfg.rankingThreemodel
  let UserRanking, PresetsRanking, PresetsMiss
  try {
    if (fs.existsSync('plugins/liangshi-calc/config/ranking.json')) {
      const data = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/config/system/ranking_system.json', 'utf8')
      fs.writeFileSync('plugins/liangshi-calc/config/ranking.json', data)
      logger.mark(`[liangshi-calc] 尚未自定义排名规则，已自动生成自定义排名规则文件`)
    }
    UserRanking = fs.readFileSync('plugins/liangshi-calc/config/ranking.json', 'utf8')
    PresetsRanking = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/data/Ranking.json', 'utf8')
    UserRanking = UserRanking[CharacterName]
    PresetsRanking = PresetsRanking[CharacterName]
    if (cfg.calcLiangK || cfg.calcLiangQ) {
      PresetsMiss = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/data/AllMiss.json', 'utf8')
      PresetsRanking = PresetsRanking[0]
    } else if (cfg.calcLiangT) {
      PresetsMiss = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/data/TeamMiss.json', 'utf8')
      PresetsRanking = PresetsRanking[1]
    } else if (cfg.calcLiangJ) {
      PresetsMiss = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/data/ConciseMiss.json', 'utf8')
      PresetsRanking = PresetsRanking[2]
    } else if (cfg.calcLiang) {
      PresetsMiss = fs.readFileSync('plugins/liangshi-calc/damage/liangshi-gs/data/BasicMiss.json', 'utf8')
      PresetsRanking = PresetsRanking[3]
    } else {
      //这里应该直接返回miao的排名
      return false
    }
    PresetsMiss = PresetsMiss[CharacterName]
  } catch (err) {
    console.error(`[liangshi-calc] 角色${CharacterName}排名配置文件读取失败`)
    return false
  }
  if (!UserRanking) {
    if (rankingOnePath === 'm') {
      return PresetsRanking
    } else if (PresetsMiss.includes(rankingOnePath) || !rankingOnePath) {
      if (rankingTwoPath === 'm') {
        return PresetsRanking
      } else if (PresetsMiss.includes(rankingTwoPath) || !rankingTwoPath) {
        if (rankingThreePath === 'm') {
          return PresetsRanking
        } else if (PresetsMiss.includes(rankingThreePath) || !rankingThreePath) {
          logger.mark(`[liangshi-calc] 角色${CharacterName}通用排名规则均未命中，已选择默认排名规则`)
          return PresetsRanking
        } else {
          return rankingThreePath
        }
      } else {
        return rankingTwoPath
      }
    } else {
      return rankingOnePath
    }
  } else if (UserRanking === 'm') {
    return PresetsRanking
  } else {
    return UserRanking
  }
}

export { RankingKey }
