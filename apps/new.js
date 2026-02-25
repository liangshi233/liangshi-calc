import { alias as aliasGs } from '../../miao-plugin/resources/meta-gs/character/alias.js'
import { alias as aliasSr } from '../../miao-plugin/resources/meta-sr/character/alias.js'
import { alias as aliasMc } from '../damage/liangshi-mc/data/alias.js'
import plugin from '../../../lib/plugins/plugin.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'


export class calc extends plugin {
  constructor () {
    super(
      {
        name: 'liangshicalc',
        dsc: 'liangshicalc拓展',
        event: 'message',
        priority: 5000,
        rule: [
          {
            reg: '^#*重置(计算条目|条目|计算)为(基础|极简|组队|队伍|空|空白)$',
            fnc: 'initial'
          },
          {
            reg: '^#*(强制)?(添加|增加|删除|移除|查看)(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(计算条目|条目|计算)(.*?)$',
            fnc: 'add'
          }
        ]
      }
    )
  }

  async initial (e) {
    let cfg = LSconfig.getConfig('user', 'config')
    if (!e.isMaster) {
      e.reply('你不可以设置哦~(*/ω＼*)')
      return false
    }
    if (!cfg.calcLiangK) {
      e.reply('请先启用calcLiangK才可使用此功能哦~(*/ω＼*)')
      return false
    }
    let McData, GsData, JsonPath
    if (/空|空白/.test(e.msg)) {
      const data = fs.readFileSync('plugins/liangshi-calc/config/system/calc_system.json', 'utf8')
      fs.writeFileSync('plugins/liangshi-calc/config/calc.json', data)
      e.reply(`[liangshi-calc]计算条目配置重置成功\n新配置重启后生效`)
      return true
    } else if (/基础/.test(e.msg)) {
      JsonPath = 'data/BasicCalc.json'
    } else if (/极简/.test(e.msg)) {
      JsonPath = 'data/ConciseCalc.json'
    } else if (/组队|队伍/.test(e.msg)) {
      JsonPath = 'data/TeamCalc.json'
    }
    McData = JSON.parse(fs.readFileSync(`plugins/liangshi-calc/damage/liangshi-mc/${JsonPath}`, 'utf8'))
    GsData = JSON.parse(fs.readFileSync(`plugins/liangshi-calc/damage/liangshi-gs/${JsonPath}`, 'utf8'))
    let Data = { ...GsData, ...McData }
    fs.writeFileSync('plugins/liangshi-calc/config/calc.json', JSON.stringify(Data, null, 2), 'utf8')
    e.reply(`[liangshi-calc]计算条目配置重置成功\n新配置重启后生效`)
    return true
  }

  async add (e) {
    let cfg = LSconfig.getConfig('user', 'config')
    if (!/原神|原|ys|YS|gs|GS|鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      e.reply('[liangshi-calc]暂不支持该游戏设置。')
      return false
    }
    if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
      return false
    }
    if (!cfg.calcLiangK) {
      e.reply('请先启用calcLiangK才可使用此功能哦~(*/ω＼*)')
      return false
    }
    let TextData = e.msg.match(/^#*(强制)?(添加|增加|删除|移除|查看)(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(计算条目|条目|计算)(.*?)$/)
    let GamePath, alias, Charactername, action
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      GamePath = "gs"
      alias = aliasGs
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      GamePath = "sr"
      alias = aliasSr
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      GamePath = "zzz"
      alias = false
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      GamePath = "mc"
      alias = aliasMc
    }
    if (alias[TextData[4]]) {
      Charactername = TextData[4]
    } else {
      for (const [key, aliases] of Object.entries(alias)) {
        if (aliases.split(',').includes(TextData[4])) {
          Charactername = key
        }
      }
    }
    if (!Charactername) {
      if (/强制/.test(e.msg)) {
        Charactername = TextData[4]
      } else if (/主角|主|旅行者|开拓者|漂泊者/.test(e.msg)) {
        if (GamePath === "gs") {
          let elementKey = {
            "" : "旅行者/null",
            "风" : "旅行者/anemo",
            "岩" : "旅行者/geo",
            "雷" : "旅行者/electro",
            "草" : "旅行者/dendro",
            "水" : "旅行者/hydro",
            "火" : "旅行者/pyro",
            "冰" : "旅行者/cryo",

            "无" : "旅行者/null",
            "风神" : "旅行者/anemo",
            "地理" : "旅行者/geo",
            "电" : "旅行者/electro",
            "丹德罗" : "旅行者/dendro",
            "水电" : "旅行者/hydro",
            "火焰兵" : "旅行者/pyro",
            "冷冻" : "旅行者/cryo"

          }
          let elementName = TextData[4].replace(/主角|主|旅行者/g, "")
          Charactername = elementKey[elementName] || false
          if (!Charactername) {
            e.reply(`[liangshi-calc]未能找到角色${TextData[4]}\n如果是未来或未更新的角色，请使用强制添加/移除`)
            return false
          }
        } else if (GamePath === "mc") {
          let elementKey = {
            "气动" : "漂泊者/气动",
            "衍射" : "漂泊者/衍射",
            "湮灭" : "漂泊者/湮灭",
            "导电" : "漂泊者/导电",
            "热熔" : "漂泊者/热熔",
            "冷凝" : "漂泊者/冷凝",

            "风" : "漂泊者/气动",
            "光" : "漂泊者/衍射",
            "暗" : "漂泊者/湮灭",
            "电" : "漂泊者/导电",
            "雷" : "漂泊者/导电",
            "火" : "漂泊者/热熔",
            "冰" : "漂泊者/冷凝",

            "航空" : "漂泊者/气动",
            "斯派克" : "漂泊者/衍射",
            "大破坏" : "漂泊者/湮灭",
            "电解" : "漂泊者/导电",
            "融合" : "漂泊者/热熔",
            "冰川" : "漂泊者/冷凝"

          }
          let elementName = TextData[4].replace(/主角|主|漂泊者/g, "")
          Charactername = elementKey[elementName] || false
          if (!Charactername) {
            e.reply(`[liangshi-calc]未能找到角色${TextData[4]}\n如果是未来或未更新的角色，请使用强制添加/移除`)
            return false
          }
        } else {
          e.reply(`[liangshi-calc]未能找到角色${TextData[4]}\n如果是未来或未更新的角色，请使用强制添加/移除`)
          return false
        }
      } else {
        e.reply(`[liangshi-calc]未能找到角色${TextData[4]}\n如果是未来或未更新的角色，请使用强制添加/移除`)
        return false
      }
    }
    if (!fs.existsSync('plugins/liangshi-calc/config/calc.json')) {
      const data = fs.readFileSync('plugins/liangshi-calc/config/system/calc_system.json', 'utf8')
      fs.writeFileSync('plugins/liangshi-calc/config/calc.json', data)
      logger.mark(`[liangshi-calc] 尚未自定义条目配置，已自动生成自定义条目配置文件`)
    }
    let JsonData = JSON.parse(fs.readFileSync(`plugins/liangshi-calc/config/calc.json`, 'utf8'))
    let JsonCharacterData = JsonData[`${Charactername}`] || [] //目前还没有出现纯数字角色名，以防万一
    if (/查看/.test(e.msg)) {
      e.reply(`[liangshi-calc]当前角色${Charactername}的配置为\n${JsonCharacterData}`)
      return true
    }

    let CalcNumber = TextData[6]
    let NumberMap = {
      '零': 0, '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9,
      '〇': 0, '壹': 1, '贰': 2, '叁': 3, '肆': 4, '伍': 5, '陆': 6, '柒': 7, '捌': 8, '玖': 9
    }
    for (const [ch, num] of Object.entries(NumberMap)) {
      CalcNumber = CalcNumber.replace(new RegExp(ch, 'g'), num)
    }
    CalcNumber = Number(CalcNumber.replace(/[^\d]/g, ''))
    if (JsonCharacterData.includes(CalcNumber)) {
      if (/删除|移除/.test(e.msg)) {
        JsonCharacterData = JsonCharacterData.filter(numeral => numeral !== CalcNumber)
        action = "移除"
      } else {
        e.reply(`[liangshi-calc]条目${CalcNumber}已经被添加了，无需添加`)
        return true
      }
    } else {
      if (/删除|移除/.test(e.msg)) {
        e.reply(`[liangshi-calc]条目${CalcNumber}没有被添加，无需移除`)
        return true
      } else {
        JsonCharacterData.push(CalcNumber)
        action = "添加"
      }
    }
    JsonData[`${Charactername}`] = JsonCharacterData
    JsonData = JSON.stringify(JsonData, null, 2)
    fs.writeFileSync(`plugins/liangshi-calc/config/calc.json`, JsonData, 'utf8')
    e.reply(`[liangshi-calc]${Charactername}的条目${CalcNumber}${action}成功`)
  }
}