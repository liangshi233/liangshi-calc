import { mainAttrData } from './data/mainAttr.js'
import { ObTalentName } from './TalentName.js'
import { RankingKey } from './defDmgKey.js'
import { ParamsData } from './defParams.js'
import { CalcMeasure } from './CalcData.js'
import { TeamJson } from './TeamJson.js'
import { CalcBy } from './CalcBy.js'

import { TeamBuff_Asta } from './艾丝妲/TeamBuff.js'


let TeamBuff = [
  ...TeamBuff_Asta,
]


export { CalcBy, mainAttrData, ObTalentName, RankingKey, TeamBuff, TeamJson, CalcMeasure, ParamsData }
