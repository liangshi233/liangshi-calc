import { LSconfig } from '#liangshi'
import path from 'node:path'
import fs from 'node:fs'

function ObTalentName(CharacterName) {
  let cfg = LSconfig.getConfig('user', 'config')
  let NamePath = cfg.namemodel
  let eName, qName, namejsonPath, atName, c1tName, c2tName, c4tName, c6tName
  const jsonPath = path.join(process.cwd(), 'plugins/miao-plugin/resources/liangshi-gs/character', CharacterName, 'data.json')
  try {
    namejsonPath = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    eName = namejsonPath.talent?.e.name
    qName = namejsonPath.talent?.q.name
    atName = namejsonPath.talent?.a.name
    c1tName = namejsonPath.cons?.['1'].name
    c2tName = namejsonPath.cons?.['2'].name
    c4tName = namejsonPath.cons?.['4'].name
    c6tName = namejsonPath.cons?.['5'].name
  } catch (err) {
    eName = '元素战技'
    qName = '元素爆发'
    atName = '普通攻击'
    c1tName = '一命座'
    c2tName = '二命座'
    c4tName = '四命座'
    c6tName = '六命座'
    //console.error('读取异常:', err)
  }
  let aName = '普通攻击'
  let a2Name = '重击'
  let a3Name = '下落攻击'
  let eNameT = 'E'
  let qNameT = 'Q'
  let tName = '天赋'
  let c1Name = '一命'
  let c2Name = '二命'
  let c4Name = '四命'
  let c6Name = '六命'
  if (NamePath !== 1) {
    if (NamePath == 2) {
      aName = atName
      eNameT = eName
      qNameT = qName
      c1Name = c1tName
      c2Name = c2tName
      c4Name = c4tName
      c6Name = c6tName
    } else if (NamePath == 3) {
      eNameT = eName
      qNameT = qName
      c1Name = '一命座'
      c2Name = '二命座'
      c4Name = '四命座'
      c6Name = '六命座'
    } else if (NamePath == 4) {
      eName = '元素战技'
      qName = '元素爆发'
      eNameT = '元素战技'
      qNameT = '元素爆发'
      c1Name = '一命'
      c2Name = '二命'
      c4Name = '四命'
      c6Name = '六命'
    } else if ( NamePath == 5) {
      aName = '普攻'
      a3Name = '下落'
      eName = 'E技能'
      qName = 'Q技能'
      eNameT = 'E技能'
      qNameT = 'Q技能'
    } else if (NamePath == 6) {
      aName = 'A'
      a2Name = 'Z'
      a3Name = '戳'
      eName = 'E'
      qName = 'Q'
      eNameT = 'E'
      qNameT = 'Q'
      tName = 'T'
      c1Name = 'c1'
      c2Name = 'c2'
      c4Name = 'c4'
      c6Name = 'c6'
    }
  }
  let TalentName = { aName, a2Name, a3Name, eName, qName, eNameT, qNameT, tName, c1Name, c2Name, c4Name, c6Name }
  return TalentName
}

export { ObTalentName }
