import { LSconfig } from '#liangshi'
import { DefaultRankingData } from './DefaultRanking.js'
import { UserRankingData } from '../../config/ranking.js'
import { BasicMiss } from './BasicMissKey.js'
import path from 'node:path'
import fs from 'node:fs'

function RankingKey(CharacterName) {
  let cfg = LSconfig.getConfig('user', 'config')
  let miss = BasicMiss[CharacterName]
  let rankingOnePath = cfg.rankingOnemodel
  let rankingTwoPath = cfg.rankingTwomodel
  let rankingThreePath = cfg.rankingThreemodel
  let ranking = 'undefined'
  if (!UserRankingData[CharacterName]) {
    if (rankingOnePath == 'm') {
      ranking = DefaultRankingData[CharacterName]
    } else if (miss.includes(rankingOnePath)) {
      if (rankingTwoPath == 'm') {
        ranking = DefaultRankingData[CharacterName]
      } else if (miss.includes(rankingTwoPath)) {
        if (rankingThreePath == 'm') {
          ranking = DefaultRankingData[CharacterName]
        } else if (miss.includes(rankingThreePath)) {
          logger.mark(`[${CharacterName}] 排名规则均未命中，已选择默认排名规则`)
          ranking = DefaultRankingData[CharacterName]
        } else {
          ranking = `${rankingThreePath}`
        }
      } else {
        ranking = `${rankingTwoPath}`
      }
    } else {
      ranking = `${rankingOnePath}`
    }
  } else {
    ranking = UserRankingData[CharacterName]
  }
  return ranking
}

export { RankingKey }
