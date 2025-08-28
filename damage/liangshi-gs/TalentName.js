import { LSconfig } from '#liangshi'
import path from 'node:path'
import fs from 'node:fs'

function ObTalentName(CharacterName) {
  let cfg = LSconfig.getConfig('user', 'config')
  let NamePath = cfg.namemodel
  let namejsonPath, aMName, eMName, qMName, c1MName, c2MName, c4MName, c6MName
  const jsonPath = path.join(process.cwd(), 'plugins/miao-plugin/resources/meta-gs/character', CharacterName, 'data.json')
  let DeleteName = "普通攻击·"
  try {
    if (CharacterName.includes("null")) {
      namejsonPath = {
        talent: {
          a: {
            "name": "普通攻击·故去的追忆"
          }
        }
      }
    } else {
      namejsonPath = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    }
    aMName = namejsonPath.talent?.a.name
    aMName = aMName.replace(DeleteName, "")
    eMName = namejsonPath.talent?.e.name
    qMName = namejsonPath.talent?.q.name
    c1MName = namejsonPath.cons?.['1'].name
    c2MName = namejsonPath.cons?.['2'].name
    c4MName = namejsonPath.cons?.['4'].name
    c6MName = namejsonPath.cons?.['6'].name
  } catch (err) {
    aMName = '普通攻击'
    eMName = '元素战技'
    qMName = '元素爆发'
    c1MName = '一命座'
    c2MName = '二命座'
    c4MName = '四命座'
    c6MName = '六命座'
    //console.error('读取异常:', err)
  }

  let Data = {
    "0": "Auto",
    "1": "完整名称",
    "2": "简化部分",
    "3": "通俗叫法",
    "4": "字母简化",
    "5": "纯字母",
    "6": "过长/组队特化纯字母",
    "7": "过长/组队特化全称",
    "8": "自定义预留1",
    "9": "自定义预留2"
  }

  let aNameData = {
    "0": "普通攻击",
    "1": aMName,
    "2": "普通攻击",
    "3": "普通攻击",
    "4": "普攻",
    "5": "A",
    "6": "A",
    "7": aMName,
    "8": "",
    "9": ""
  }

  let aTNameData = {
    "0": "A",
    "1": aMName,
    "2": "普通攻击",
    "3": "普通攻击",
    "4": "普攻",
    "5": "A",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let a2NameData = {
    "0": "重击",
    "1": "重击",
    "2": "重击",
    "3": "重击",
    "4": "重",
    "5": "Z",
    "6": "Z",
    "7": "重击",
    "8": "",
    "9": ""
  }

  let a2TNameData = {
    "0": "重",
    "1": "重击",
    "2": "重击",
    "3": "重击",
    "4": "重",
    "5": "Z",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let a3NameData = {
    "0": "下落",
    "1": "下落攻击",
    "2": "下落攻击",
    "3": "下落",
    "4": "戳",
    "5": "C",
    "6": "C",
    "7": "下落攻击",
    "8": "",
    "9": ""
  }

  let a3TNameData = {
    "0": "下落",
    "1": "下落攻击",
    "2": "下落攻击",
    "3": "下落",
    "4": "戳",
    "5": "C",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let eNameData = {
    "0": eMName,
    "1": eMName,
    "2": eMName,
    "3": "元素战技",
    "4": "E技能",
    "5": "E",
    "6": "E",
    "7": eMName,
    "8": "",
    "9": ""
  }

  let eTNameData = {
    "0": "E",
    "1": eMName,
    "2": eMName,
    "3": "元素战技",
    "4": "E技能",
    "5": "E",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let qNameData = {
    "0": qMName,
    "1": qMName,
    "2": qMName,
    "3": "元素爆发",
    "4": "Q技能",
    "5": "Q",
    "6": "Q",
    "7": qMName,
    "8": "",
    "9": ""
  }

  let qTNameData = {
    "0": "Q",
    "1": qMName,
    "2": qMName,
    "3": "元素爆发",
    "4": "Q技能",
    "5": "Q",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let tNameData = {
    "0": "天赋",
    "1": "天赋",
    "2": "天赋",
    "3": "天赋",
    "4": "天赋",
    "5": "T",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let c1NameData = {
    "0": "一命",
    "1": c1MName,
    "2": "一命座",
    "3": "一命",
    "4": "一命",
    "5": "C1",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let c2NameData = {
    "0": "二命",
    "1": c2MName,
    "2": "二命座",
    "3": "二命",
    "4": "二命",
    "5": "C2",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let c4NameData = {
    "0": "四命",
    "1": c4MName,
    "2": "四命座",
    "3": "四命",
    "4": "四命",
    "5": "C4",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }

  let c6NameData = {
    "0": "六命",
    "1": c6MName,
    "2": "六命座",
    "3": "六命",
    "4": "六命",
    "5": "C6",
    "6": null,
    "7": null,
    "8": "",
    "9": ""
  }


  let aName, aNameT, a2Name, a2NameT, a3Name, a3NameT, eName, eNameT, qName, qNameT, tName, c1Name, c2Name, c4Name, c6Name

  if (NamePath > 9 && NamePath < 100) {
    let NamePath1 = Math.floor(NamePath / 10)
    let NamePath2 = NamePath % 10
    aName = `[${aNameData[NamePath1]}]${aNameData[NamePath2]}`
    aNameT = !`${aTNameData[NamePath1]}` ? `${aTNameData[NamePath2]}` : `[${aTNameData[NamePath1]}]${aTNameData[NamePath2]}`
    a2Name = `[${a2NameData[NamePath1]}]${a2NameData[NamePath2]}`
    a2NameT = !`${a2TNameData[NamePath1]}` ? `${a2TNameData[NamePath2]}` : `[${a2TNameData[NamePath1]}]${a2TNameData[NamePath2]}`
    a3Name = `[${a3NameData[NamePath1]}]${a3NameData[NamePath2]}`
    a3NameT = !`${a3TNameData[NamePath1]}` ? `${a3TNameData[NamePath2]}` : `[${a3TNameData[NamePath1]}]${a3TNameData[NamePath2]}`
    eName = `[${eNameData[NamePath1]}]${eNameData[NamePath2]}`
    eNameT = !`${eTNameData[NamePath1]}` ? `${eTNameData[NamePath2]}` : `[${eTNameData[NamePath1]}]${eTNameData[NamePath2]}`
    qName = `[${qNameData[NamePath1]}]${qNameData[NamePath2]}`
    qNameT = !`${qTNameData[NamePath1]}` ? `${qTNameData[NamePath2]}` : `[${qTNameData[NamePath1]}]${qTNameData[NamePath2]}`
    tName = !`${tNameData[NamePath1]}` ? `${tNameData[NamePath1]}` : `[${tNameData[NamePath1]}]${tNameData[NamePath2]}`
    c1Name = !`${c1NameData[NamePath1]}` ? `${c1NameData[NamePath2]}` : `[${c1NameData[NamePath1]}]${c1NameData[NamePath2]}`
    c2Name = !`${c2NameData[NamePath1]}` ? `${c2NameData[NamePath2]}` : `[${c2NameData[NamePath1]}]${c2NameData[NamePath2]}`
    c4Name = !`${c4NameData[NamePath1]}` ? `${c4NameData[NamePath2]}` : `[${c4NameData[NamePath1]}]${c4NameData[NamePath2]}`
    c6Name = !`${c6NameData[NamePath1]}` ? `${c6NameData[NamePath2]}` : `[${c6NameData[NamePath1]}]${c6NameData[NamePath2]}`
  } else {
    if (NamePath > 99 || NamePath < 0) {
      console.error('[liangshi-calc] NamePath配置错误，请重新配置')
      NamePath = 0
    }
    aName = aNameData[NamePath]
    aNameT = aTNameData[NamePath]
    a2Name = a2NameData[NamePath]
    a2NameT = a2TNameData[NamePath]
    a3Name = a3NameData[NamePath]
    a3NameT = a3TNameData[NamePath]
    eName = eNameData[NamePath]
    eNameT = eTNameData[NamePath]
    qName = qNameData[NamePath]
    qNameT = qTNameData[NamePath]
    tName = tNameData[NamePath]
    c1Name = c1NameData[NamePath]
    c2Name = c2NameData[NamePath]
    c4Name = c4NameData[NamePath]
    c6Name = c6NameData[NamePath]
  }
  let TalentName = { aName, aNameT, a2Name, a2NameT, a3Name, a3NameT, eName, eNameT, qName, qNameT, tName, c1Name, c2Name, c4Name, c6Name }
  return TalentName
}

export { ObTalentName }
