import { alias as aliasGs } from '../../miao-plugin/resources/meta-gs/character/alias.js'
import { alias as aliasSr } from '../../miao-plugin/resources/meta-sr/character/alias.js'
import { alias as aliasMc } from '../damage/liangshi-mc/alias.js'
import plugin from '../../../lib/plugins/plugin.js'
import common from '../../../lib/common/common.js'
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
          },
          {
            reg: '^#*(强制)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(计算数据|数据|资源|资源数据)$',
            fnc: 'new'
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
    if (/空|空白/.test(this.e.msg)) {
      const data = fs.readFileSync('plugins/liangshi-calc/config/system/calc_system.json', 'utf8')
      fs.writeFileSync('plugins/liangshi-calc/config/calc.json', data)
      e.reply(`[liangshi-calc]计算条目配置重置成功\n新配置重启后生效`)
      return true
    } else if (/基础/.test(this.e.msg)) {
      JsonPath = 'data/BasicCalc.json'
    } else if (/极简/.test(this.e.msg)) {
      JsonPath = 'data/ConciseCalc.json'
    } else if (/组队|队伍/.test(this.e.msg)) {
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
    if (!/原神|原|ys|YS|gs|GS|鸣潮|明朝|潮|mc|MC/.test(this.e.msg)) {
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
    if (/原神|原|ys|YS|gs|GS/.test(this.e.msg)) {
      GamePath = "gs"
      alias = aliasGs
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(this.e.msg)) {
      GamePath = "sr"
      alias = aliasSr
    } else if (/绝区零|绝|zzz|ZZZ/.test(this.e.msg)) {
      GamePath = "zzz"
      alias = false
    } else if (/鸣潮|明朝|潮|mc|MC/.test(this.e.msg)) {
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
      if (/强制/.test(this.e.msg)) {
        Charactername = TextData[4]
      } else if (/主角|主|旅行者|开拓者|漂泊者/.test(this.e.msg)) {
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
    if (/查看/.test(this.e.msg)) {
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
      if (/删除|移除/.test(this.e.msg)) {
        JsonCharacterData = JsonCharacterData.filter(numeral => numeral !== CalcNumber)
        action = "移除"
      } else {
        e.reply(`[liangshi-calc]条目${CalcNumber}已经被添加了，无需添加`)
        return true
      }
    } else {
      if (/删除|移除/.test(this.e.msg)) {
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

  async new (e) {
    if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ/.test(this.e.msg)) {
      e.reply('[liangshi-calc]暂不支持该游戏更新，运行终止。')
      logger.mark('[liangshi-calc]更新被中断')
      return false
    }
     if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
      return false
    }
    let TextData = e.msg.match(/^#*(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(角色数据|数据|角色计算数据)$/)
    let CharacterId = TextData[3]
    if ((/^\d{4}$/.test(CharacterId) && !/原神|原|ys|YS|gs|GS/.test(TextData[2])) || (!/原神|原|ys|YS|gs|GS/.test(TextData[2]) && /强制|强行|覆盖/.test(this.e.msg))) {
      logger.mark(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
    } else if ((/^\d{8}$/.test(CharacterId) && /原神|原|ys|YS|gs|GS/.test(TextData[2])) || /强制|强行|覆盖/.test(this.e.msg)) {
      logger.mark(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
    } else {
      let CharacterIdUrl
      if (/原神|原|ys|YS|gs|GS/.test(this.e.msg)) {
        CharacterIdUrl = "https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-gs/README.md"
      } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(this.e.msg)) {
        CharacterIdUrl = undefined //(目录名称内容可能含有违规信息)"https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-sr/README.md"
      } else if (/绝区零|绝|zzz|ZZZ/.test(this.e.msg)) {
        CharacterIdUrl = undefined //"https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-zzz/README.md"
      } else if (/鸣潮|明朝|潮|mc|MC/.test(this.e.msg)) {
        CharacterIdUrl = "https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-mc/README.md"
      } else {
        CharacterIdUrl = undefined
      }
      console.error(`[liangshi-calc]未知的角色ID:${CharacterId}`)
      e.reply('[liangshi-calc]角色ID错误，请检查角色ID格式(原神:8位数字,其余:4位数字)')
      e.reply(`[liangshi-calc]角色ID可在${CharacterIdUrl}内对照(新角色ID一般为最新已实装角色ID+1)`)
      return false
    }
    let data, game, GamePath
    let i = /星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(this.e.msg) ? "cn" : "zh"
    if (/原神|原|ys|YS|gs|GS/.test(this.e.msg)) {
      game = "gi"
      GamePath = "gs"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(this.e.msg)) {
      game = "hsr"
      GamePath = "sr"
    } else if (/绝区零|绝|zzz|ZZZ/.test(this.e.msg)) {
      game = "zzz"
      GamePath = "zzz"
    } else if (/鸣潮|明朝|潮|mc|MC/.test(this.e.msg)) {
      game = "ww"
      GamePath = "mc"
    }
    e.reply(`[liangshi-calc]开始更新角色${CharacterId}数据`)
    try {
      let url = `https://api.hakush.in/${game}/data/${i}/character/${CharacterId}.json`
      let response = await fetch(url)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        return false
      }
      data = await response.json()
      logger.mark(`[liangshi-calc]角色:${data.Name} 云端数据读取成功`)
    } catch (err) {
      console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
      e.reply(`[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新`)
      e.reply(`数据更新时间(预估)\n鸣潮：暂无确定时间\n原神：版本更新当天18：00~次日6：00左右\n星穹铁道：版本更新当天18：00~次日6：00左右\n绝区零：undefined`)
      return false
    }
    let CharacterName = data.Name
    let CharacterData
    let icons = `./plugins/miao-plugin/resources/meta-${GamePath}/character/${CharacterName}/icons`
    let imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/character/${CharacterName}/imgs`
    if (!fs.existsSync(icons)) {
      fs.mkdirSync(icons, { recursive: true })
      logger.mark(`[liangshi-calc]角色:${data.Name} 本地icons文件夹创建成功`)
    }
    if (!fs.existsSync(imgs)) {
      fs.mkdirSync(imgs, { recursive: true })
      logger.mark(`[liangshi-calc]角色:${data.Name} 本地imgs文件夹创建成功`)
    }
    let ConsTalent = { a: 0, e: 0, q: 0 }
    if (/鸣潮|明朝|潮|mc|MC/.test(this.e.msg)) {
      CharacterData = {
        "id": data.Id,
        "name": data.Name,
        "abbr": data.Name,
        "title": "???",
        "star": data.Rarity,
        "elem": data.Element,
        "allegiance": data.Country,
        "weapon": data.Weapon,
        "birth": data.CharaInfo.Birth,
        "desc": data.CharaInfo.Info.replace(/<a[^>]*>(.*?)<\/a>/g, '$1').replace(/\n/g, ''),
        "cncv": data.CharaInfo.CVNameCn,
        "jpcv": data.CharaInfo.CVNameJp,
        "costume": false,
        "ver": 1,
        "baseAttr": {
          "hp": data.Stats["6"]["90"].Life,
          "atk": data.Stats["6"]["90"].Atk,
          "def": data.Stats["6"]["90"].Def
        },
        "materials": {
          "boss": data.Ascensions["6"][0].Key,
          "specialty": data.Ascensions["6"][1].Key,
          "normal": data.Ascensions["6"][2].Key,
          "talent": data.SkillTrees["1"].Skill.Consume["10"][0].Key,
          "weekly": data.SkillTrees["1"].Skill.Consume["10"][2].Key
        },
        "talent": {
          "a": {
            "name": data.SkillTrees["1"].Skill.Name,
            "desc": data.SkillTrees["1"].Skill.Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["1"].Skill.Level).sort((a, b) => a.id - b.id)
          },
          "e": {
            "name": data.SkillTrees["2"].Skill.Name,
            "desc": data.SkillTrees["2"].Skill.Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["2"].Skill.Level).sort((a, b) => a.id - b.id)
          },
          "q": {
            "name": data.SkillTrees["3"].Skill.Name,
            "desc": data.SkillTrees["3"].Skill.Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["3"].Skill.Level).sort((a, b) => a.id - b.id)
          },
          "t": {
            "name": data.SkillTrees["7"].Skill.Name,
            "desc": data.SkillTrees["7"].Skill.Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["7"].Skill.Level).sort((a, b) => a.id - b.id)
          },
          "l": {
            "name": data.SkillTrees["6"].Skill.Name,
            "desc": data.SkillTrees["6"].Skill.Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["6"].Skill.Level).sort((a, b) => a.id - b.id)
          },
          "o": {
            "name": data.SkillTrees["8"].Skill.Name,
            "desc": data.SkillTrees["8"].Skill.Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["8"].Skill.Level).sort((a, b) => a.id - b.id)
          }
        },
        "cons": {
          "1": {
            "name": data.Chains["1"].Name,
            "desc": data.Chains["1"].Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== '')
          },
          "2": {
            "name": data.Chains["2"].Name,
            "desc": data.Chains["2"].Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== '')
          },
          "3": {
            "name": data.Chains["3"].Name,
            "desc": data.Chains["3"].Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== '')
          },
          "4": {
            "name": data.Chains["4"].Name,
            "desc": data.Chains["4"].Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== '')
          },
          "5": {
            "name": data.Chains["5"].Name,
            "desc": data.Chains["5"].Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== '')
          },
          "6": {
            "name": data.Chains["6"].Name,
            "desc": data.Chains["6"].Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== '')
          }
        },
        "passive": [
          {
            "name": data.SkillTrees["4"].Skill.Name,
            "desc": data.SkillTrees["4"].Skill.Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== '')
          },
          {
            "name": data.SkillTrees["5"].Skill.Name,
            "desc": data.SkillTrees["5"].Skill.Desc.replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== '')
          }
        ],
        "details": {
          "1": [
            data.Stats["0"]["1"].Life,
            data.Stats["0"]["1"].Atk,
            data.Stats["0"]["1"].Def
          ],
          "20": [
            data.Stats["0"]["20"].Life,
            data.Stats["0"]["20"].Atk,
            data.Stats["0"]["20"].Def
          ],
          "40": [
            data.Stats["1"]["40"].Life,
            data.Stats["1"]["40"].Atk,
            data.Stats["1"]["40"].Def
          ],
          "50": [
            data.Stats["2"]["50"].Life,
            data.Stats["2"]["50"].Atk,
            data.Stats["2"]["50"].Def
          ],
          "60": [
            data.Stats["3"]["60"].Life,
            data.Stats["3"]["60"].Atk,
            data.Stats["3"]["60"].Def
          ],
          "70": [
            data.Stats["4"]["70"].Life,
            data.Stats["4"]["70"].Atk,
            data.Stats["4"]["70"].Def
          ],
          "80": [
            data.Stats["5"]["80"].Life,
            data.Stats["5"]["80"].Atk,
            data.Stats["5"]["80"].Def
          ],
          "90": [
            data.Stats["6"]["90"].Life,
            data.Stats["6"]["90"].Atk,
            data.Stats["6"]["90"].Def
          ],
          "20+": [
            data.Stats["1"]["20"].Life,
            data.Stats["1"]["20"].Atk,
            data.Stats["1"]["20"].Def
          ],
          "40+": [
            data.Stats["2"]["40"].Life,
            data.Stats["2"]["40"].Atk,
            data.Stats["2"]["40"].Def
          ],
          "50+": [
            data.Stats["3"]["50"].Life,
            data.Stats["3"]["50"].Atk,
            data.Stats["3"]["50"].Def
          ],
          "60+": [
            data.Stats["4"]["60"].Life,
            data.Stats["4"]["60"].Atk,
            data.Stats["4"]["60"].Def
          ],
          "70+": [
            data.Stats["5"]["70"].Life,
            data.Stats["5"]["70"].Atk,
            data.Stats["5"]["70"].Def
          ],
          "80+": [
            data.Stats["6"]["80"].Life,
            data.Stats["6"]["80"].Atk,
            data.Stats["6"]["80"].Def
          ]
        },
        "UpdateTime": `[liangshi-calc] ${new Date()}`
      }
    } else if (/原神|原|ys|YS|gs|GS/.test(this.e.msg)) {
      let WeaponKey = {
        "WEAPON_SWORD_ONE_HAND": "sword",
        "WEAPON_CLAYMORE": "claymore",
        "WEAPON_POLE": "polearm",
        "WEAPON_BOW": "bow",
        "WEAPON_CATALYST": "catalyst"
      }
      let RarityKey = {
        "QUALITY_ORANGE_SP": 5,
        "QUALITY_ORANGE": 5,
        "QUALITY_PURPLE": 4
      }
      let GrowKey = {
        "FIGHT_PROP_HP_PERCENT": "hpPct",
        "FIGHT_PROP_ATTACK_PERCENT": "atkPct",
        "FIGHT_PROP_DEFENSE_PERCENT": "defPct",
        "FIGHT_PROP_CHARGE_EFFICIENCY": "recharge",
        "FIGHT_PROP_ELEMENT_MASTERY": "mastery",
        "FIGHT_PROP_CRITICAL_HURT": "cdmg",
        "FIGHT_PROP_CRITICAL": "cpct",
        "FIGHT_PROP_HEAL_ADD": "heal",
        "FIGHT_PROP_ICE_ADD_HURT": "dmg",
        "FIGHT_PROP_GRASS_ADD_HURT": "dmg",
        "FIGHT_PROP_ROCK_ADD_HURT": "dmg",
        "FIGHT_PROP_WIND_ADD_HURT": "dmg",
        "FIGHT_PROP_WATER_ADD_HURT": "dmg",
        "FIGHT_PROP_FIRE_ADD_HURT": "dmg",
        "FIGHT_PROP_ELEC_ADD_HURT": "dmg",
        "FIGHT_PROP_PHYSICAL_ADD_HURT": "phy"
      }
      if (data.Constellations[2].Desc.includes("元素爆发") || data.Constellations[4].Desc.includes("元素爆发")) {
        ConsTalent.q = data.Constellations[2].Desc.includes("元素爆发") ? 3 : 5
      }
      if (data.Constellations[2].Desc.includes("元素战技") || data.Constellations[4].Desc.includes("元素战技")) {
        ConsTalent.e = data.Constellations[2].Desc.includes("元素战技") ? 3 : 5
      }
      if (data.Constellations[2].Desc.includes("普通攻击") || data.Constellations[4].Desc.includes("普通攻击")) {
        ConsTalent.a = data.Constellations[2].Desc.includes("普通攻击") ? 3 : 5
      }
      CharacterData = {
        "id": CharacterId,
        "name": data.Name,
        "abbr": data.Name,
        "title": data.CharaInfo.Title,
        "star": RarityKey[data.Rarity],
        "elem": data.Element.toLowerCase(),
        "allegiance": data.CharaInfo.Native,
        "weapon": WeaponKey[data.Weapon],
        "birth": `${data.CharaInfo.Birth[0]}-${data.CharaInfo.Birth[1]}`,
        "astro": data.CharaInfo.Constellation,
        "desc": data.CharaInfo.Detail,
        "cncv": data.CharaInfo.VA.Chinese,
        "jpcv": data.CharaInfo.VA.Japanese,
        "costume": false,
        "ver": 1,
        "baseAttr": {
          "hp": Math.round(data.BaseHP * data.StatsModifier.HP["90"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_HP),
          "atk": Math.round((data.BaseATK * data.StatsModifier.ATK["90"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_ATTACK) * 100) / 100,
          "def": Math.round((data.BaseDEF * data.StatsModifier.DEF["90"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_DEFENSE) * 100) / 100
        },
        "growAttr": {
          "key": GrowKey[Object.keys(data.StatsModifier.Ascension[0])[3]],
          "value": data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] >= 1 ? data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] : (data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] * 100)
        },
        "talentId": {
          [data.Skills[0].Id]: "a",
          [data.Skills[1].Id]: "e",
          [data.Skills[2].Id]: "q"
        },
        "talentCons": ConsTalent,
        "materials": {
          "gem": data.Materials.Ascensions[5].Mats[0].Name,
          "boss": data.Materials.Ascensions[5].Mats[1].Name,
          "specialty": data.Materials.Ascensions[5].Mats[2].Name,
          "normal": data.Materials.Ascensions[5].Mats[3].Name,
          "talent": data.Materials.Talents[0][8].Mats[0].Name,
          "weekly": data.Materials.Talents[0][8].Mats[2].Name
        },
        "talent": {
          "a": {
            "id": data.Skills[0].Id,
            "name": data.Skills[0].Name,
            "desc": data.Skills[0].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0),
            "tables": await this.convertPromoteToTables(data.Skills[0].Promote)
          },
          "e": {
            "id": data.Skills[1].Id,
            "name": data.Skills[1].Name,
            "desc": data.Skills[1].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0),
            "tables": await this.convertPromoteToTables(data.Skills[1].Promote)
          },
          "q": {
            "id": data.Skills[2].Id,
            "name": data.Skills[2].Name,
            "desc": data.Skills[2].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0),
            "tables": await this.convertPromoteToTables(data.Skills[2].Promote)
          }
        },
        "talentData": {
          "a": await this.TalentPromote(data.Skills[0]),
          "e": await this.TalentPromote(data.Skills[1]),
          "q": await this.TalentPromote(data.Skills[2])
        },
        "cons": {
          "1": {
            "name": data.Constellations[0].Name,
            "desc": data.Constellations[0].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          },
          "2": {
            "name": data.Constellations[1].Name,
            "desc": data.Constellations[1].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          },
          "3": {
            "name": data.Constellations[2].Name,
            "desc": data.Constellations[2].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          },
          "4": {
            "name": data.Constellations[3].Name,
            "desc": data.Constellations[3].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          },
          "5": {
            "name": data.Constellations[4].Name,
            "desc": data.Constellations[4].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          },
          "6": {
            "name": data.Constellations[5].Name,
            "desc": data.Constellations[5].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          }
        },
        "passive": [
          {
            "name": data.Passives[2].Name,
            "desc": data.Passives[2].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          },
          {
            "name": data.Passives[0].Name,
            "desc": data.Passives[0].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          },
          {
            "name": data.Passives[1].Name,
            "desc": data.Passives[1].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          }
        ],
        "attr": {
          "keys": [
            "hpBase",
            "atkBase",
            "defBase",
            `${GrowKey[Object.keys(data.StatsModifier.Ascension[0])[3]]}`
          ],
          "details": {
            "1": [
              data.BaseHP,
              data.BaseATK,
              data.BaseDEF,
              0
            ],
            "20": [
              data.BaseHP * data.StatsModifier.HP["20"],
              data.BaseATK * data.StatsModifier.ATK["20"],
              data.BaseDEF * data.StatsModifier.DEF["20"],
              0
            ],
            "40": [
              data.BaseHP * data.StatsModifier.HP["40"] + data.StatsModifier.Ascension[0].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["40"] + data.StatsModifier.Ascension[0].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["40"] + data.StatsModifier.Ascension[0].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[0])[3]] >= 1 ? data.StatsModifier.Ascension[0][Object.keys(data.StatsModifier.Ascension[0])[3]] : (data.StatsModifier.Ascension[0][Object.keys(data.StatsModifier.Ascension[0])[3]] * 100)
            ],
            "50": [
              data.BaseHP * data.StatsModifier.HP["50"] + data.StatsModifier.Ascension[1].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["50"] + data.StatsModifier.Ascension[1].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["50"] + data.StatsModifier.Ascension[1].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[1])[3]] >= 1 ? data.StatsModifier.Ascension[1][Object.keys(data.StatsModifier.Ascension[1])[3]] : (data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[1])[3]] * 100)
            ],
            "60": [
              data.BaseHP * data.StatsModifier.HP["60"] + data.StatsModifier.Ascension[2].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["60"] + data.StatsModifier.Ascension[2].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["60"] + data.StatsModifier.Ascension[2].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[2])[3]] >= 1 ? data.StatsModifier.Ascension[2][Object.keys(data.StatsModifier.Ascension[2])[3]] : (data.StatsModifier.Ascension[2][Object.keys(data.StatsModifier.Ascension[2])[3]] * 100)
            ],
            "70": [
              data.BaseHP * data.StatsModifier.HP["70"] + data.StatsModifier.Ascension[3].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["70"] + data.StatsModifier.Ascension[3].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["70"] + data.StatsModifier.Ascension[3].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[3])[3]] >= 1 ? data.StatsModifier.Ascension[3][Object.keys(data.StatsModifier.Ascension[3])[3]] : (data.StatsModifier.Ascension[3][Object.keys(data.StatsModifier.Ascension[3])[3]] * 100)
            ],
            "80": [
              data.BaseHP * data.StatsModifier.HP["80"] + data.StatsModifier.Ascension[4].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["80"] + data.StatsModifier.Ascension[4].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["80"] + data.StatsModifier.Ascension[4].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[4])[3]] >= 1 ? data.StatsModifier.Ascension[4][Object.keys(data.StatsModifier.Ascension[4])[3]] : (data.StatsModifier.Ascension[4][Object.keys(data.StatsModifier.Ascension[4])[3]] * 100)
            ],
            "90": [
              data.BaseHP * data.StatsModifier.HP["90"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["90"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["90"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] >= 1 ? data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] : (data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] * 100)
            ],
            "20+": [
              data.BaseHP * data.StatsModifier.HP["20"] + data.StatsModifier.Ascension[0].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["20"] + data.StatsModifier.Ascension[0].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["20"] + data.StatsModifier.Ascension[0].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[0])[3]] >= 1 ? data.StatsModifier.Ascension[0][Object.keys(data.StatsModifier.Ascension[0])[3]] : (data.StatsModifier.Ascension[0][Object.keys(data.StatsModifier.Ascension[0])[3]] * 100)
            ],
            "40+": [
              data.BaseHP * data.StatsModifier.HP["40"] + data.StatsModifier.Ascension[1].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["40"] + data.StatsModifier.Ascension[1].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["40"] + data.StatsModifier.Ascension[1].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[1])[3]] >= 1 ? data.StatsModifier.Ascension[1][Object.keys(data.StatsModifier.Ascension[1])[3]] : (data.StatsModifier.Ascension[1][Object.keys(data.StatsModifier.Ascension[1])[3]] * 100)
            ],
            "50+": [
              data.BaseHP * data.StatsModifier.HP["50"] + data.StatsModifier.Ascension[2].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["50"] + data.StatsModifier.Ascension[2].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["50"] + data.StatsModifier.Ascension[2].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[2])[3]] >= 1 ? data.StatsModifier.Ascension[2][Object.keys(data.StatsModifier.Ascension[2])[3]] : (data.StatsModifier.Ascension[2][Object.keys(data.StatsModifier.Ascension[2])[3]] * 100)
            ],
            "60+": [
              data.BaseHP * data.StatsModifier.HP["60"] + data.StatsModifier.Ascension[3].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["60"] + data.StatsModifier.Ascension[3].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["60"] + data.StatsModifier.Ascension[3].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[3])[3]] >= 1 ? data.StatsModifier.Ascension[3][Object.keys(data.StatsModifier.Ascension[3])[3]] : (data.StatsModifier.Ascension[3][Object.keys(data.StatsModifier.Ascension[3])[3]] * 100)
            ],
            "70+": [
              data.BaseHP * data.StatsModifier.HP["70"] + data.StatsModifier.Ascension[4].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["70"] + data.StatsModifier.Ascension[4].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["70"] + data.StatsModifier.Ascension[4].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[4])[3]] >= 1 ? data.StatsModifier.Ascension[4][Object.keys(data.StatsModifier.Ascension[4])[3]] : (data.StatsModifier.Ascension[4][Object.keys(data.StatsModifier.Ascension[4])[3]] * 100)
            ],
            "80+": [
              data.BaseHP * data.StatsModifier.HP["80"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_HP,
              data.BaseATK * data.StatsModifier.ATK["80"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_ATTACK,
              data.BaseDEF * data.StatsModifier.DEF["80"] + data.StatsModifier.Ascension[5].FIGHT_PROP_BASE_DEFENSE,
              data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] >= 1 ? data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] : (data.StatsModifier.Ascension[5][Object.keys(data.StatsModifier.Ascension[5])[3]] * 100)
            ]
          }
        },
        "UpdateTime": `[liangshi-calc] ${new Date()}`
      }
    }
    logger.mark('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-${GamePath}/character/${CharacterName}/data.json`
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(CharacterData, null, 2), 'utf8')
      logger.mark(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
    } else if (/强制|强行|覆盖/.test(this.e.msg)) {
      e.reply('[liangshi-calc]角色数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(CharacterData, null, 2), 'utf8')
      logger.mark(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
    } else {
      e.reply('[liangshi-calc]角色数据已存在，运行终止。')
      console.error(`[liangshi-calc]角色：${CharacterName} 数据已存在`)
    }
    e.reply(`[liangshi-calc]角色数据资源下载完成`)
    logger.mark(`[liangshi-calc]开始下载角色图片资源`)
    let IconUrl = `https://api.hakush.in/${game}/`
    if (/鸣潮|明朝|潮|mc|MC/.test(this.e.msg)) {
      let SkinName = Object.keys(data.Skin)[0]
      await this.getImg((data.Skin[SkinName].Portrait.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${imgs}/splash.webp`, "立绘")
      await this.getImg((data.Skin[SkinName].Background.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${imgs}/face.webp`, "大头")
      await this.getImg((data.Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${imgs}/side.webp`, "侧头")
      await this.getImg((data.SkillTrees["4"].Skill.Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/passive-0.webp`, "固有天赋1")
      await this.getImg((data.SkillTrees["5"].Skill.Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/passive-1.webp`, "固有天赋2")
      await this.getImg((data.SkillTrees["2"].Skill.Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/talent-e.webp`, "共鸣技能")
      await this.getImg((data.SkillTrees["3"].Skill.Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/talent-q.webp`, "共鸣解放")
      await this.getImg((data.SkillTrees["6"].Skill.Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/talent-i.webp`, "变奏技能")
      await this.getImg((data.SkillTrees["8"].Skill.Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/talent-o.webp`, "延奏技能")
      await this.getImg((data.SkillTrees["7"].Skill.Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/talent-t.webp`, "共鸣回路")
      await this.getImg((data.Chains["1"].Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/cons-1.webp`, "1链")
      await this.getImg((data.Chains["2"].Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/cons-2.webp`, "2链")
      await this.getImg((data.Chains["3"].Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/cons-3.webp`, "3链")
      await this.getImg((data.Chains["4"].Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/cons-4.webp`, "4链")
      await this.getImg((data.Chains["5"].Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/cons-5.webp`, "5链")
      await this.getImg((data.Chains["6"].Icon.replace(/^\/Game\/Aki\//, IconUrl)).replace(/\.[^/.]+$/, '.webp'), `${icons}/cons-6.webp`, "6链")
    } else if (/原神|原|ys|YS|gs|GS/.test(this.e.msg)) {
      await this.getImg(IconUrl + "UI/UI_Gacha_AvatarImg_" + data.Icon.replace("UI_AvatarIcon_", "") + ".webp", `${imgs}/splash.webp`, "立绘")
      await this.getImg(IconUrl + "UI/" + data.Icon + ".webp", `${imgs}/face.webp`, "大头")
      await this.getImg(IconUrl + "UI/" + data.CharaInfo.Namecard.Icon + ".webp", `${imgs}/card.webp`, "名片")
      await this.getImg(IconUrl + "UI/" + data.Passives[2].Icon + ".webp", `${icons}/passive-0.webp`, "固有天赋1")
      await this.getImg(IconUrl + "UI/" + data.Passives[0].Icon + ".webp", `${icons}/passive-1.webp`, "固有天赋2")
      await this.getImg(IconUrl + "UI/" + data.Passives[1].Icon + ".webp", `${icons}/passive-2.webp`, "固有天赋3")
      await this.getImg(IconUrl + "UI/" + data.Skills[1].Promote[0].Icon + ".webp", `${icons}/talent-e.webp`, "元素战技")
      await this.getImg(IconUrl + "UI/" + data.Skills[2].Promote[0].Icon + ".webp", `${icons}/talent-q.webp`, "元素爆发")
      await this.getImg(IconUrl + "UI/" + data.Constellations[0].Icon + ".webp", `${icons}/cons-1.webp`, "1命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[1].Icon + ".webp", `${icons}/cons-2.webp`, "2命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[2].Icon + ".webp", `${icons}/cons-3.webp`, "3命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[3].Icon + ".webp", `${icons}/cons-4.webp`, "4命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[4].Icon + ".webp", `${icons}/cons-5.webp`, "5命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[5].Icon + ".webp", `${icons}/cons-6.webp`, "6命")
    }
    e.reply(`[liangshi-calc]角色图片资源下载完成`)
    logger.mark(`[liangshi-calc]图片资源下载完成`)
    let cfg = LSconfig.getConfig('user', 'config')
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(this.e.msg)) {
      let filePath
      if (/鸣潮|明朝|潮|mc|MC/.test(this.e.msg)) {
        filePath = "./plugins/miao-plugin/resources/meta-mc/character/data.json"
        if (!fs.existsSync(filePath)) {
          console.log('[liangshi-calc]找不到文件data.json，请检查mian-waves配置')
          e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
          e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
          return false
        }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取角色配置data.json失败:\n', err)
            e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
            e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            const newValue = {
              "id": data.Id,
              "name": CharacterName,
              "abbr": CharacterName,
              "star": data.Rarity,
              "elem": data.Element,
              "weapon": data.Weapon
            }
            if (!jsonData.hasOwnProperty(CharacterId)) {
              jsonData[CharacterId] = newValue
              console.log(`[liangshi-calc]角色${CharacterId}配置data.json成功`)
              const updatedData = JSON.stringify(jsonData, null, 2)
              fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                  console.error('[liangshi-calc]角色data.json写入失败:\n', err)
                  e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
                  e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
                  return false
                } else {
                  console.log('[liangshi-calc]角色data.json已更新')
                }
              })
            } else {
              console.log(`[liangshi-calc]角色${CharacterId}已配置过，取消写入`)
            }
          } catch (err) {
            console.error('[liangshi-calc]自动配置data.json失败:\n', err)
          }
        })
      } else if (/原神|原|ys|YS|gs|GS/.test(this.e.msg)) {
        let RarityKey = {
          "QUALITY_ORANGE_SP": 5,
          "QUALITY_ORANGE": 5,
          "QUALITY_PURPLE": 4
        }
        let WeaponKey = {
          "WEAPON_SWORD_ONE_HAND": "sword",
          "WEAPON_CLAYMORE": "claymore",
          "WEAPON_POLE": "polearm",
          "WEAPON_BOW": "bow",
          "WEAPON_CATALYST": "catalyst"
        }
        filePath = "./plugins/miao-plugin/resources/meta-gs/character/data.json"
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取角色配置data.json失败:', err)
            e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
            e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            let newValue = {
              "id": Number(CharacterId),
              "name": data.Name,
              "abbr": data.Name,
              "star": RarityKey[data.Rarity],
              "elem": data.Element.toLowerCase(),
              "weapon": WeaponKey[data.Weapon],
              "talentId": {
                [data.Skills[0].Id]: "a",
                [data.Skills[1].Id]: "e",
                [data.Skills[2].Id]: "q"
              },
              "talentCons": ConsTalent
            }
            if (!jsonData.hasOwnProperty(CharacterId)) {
              jsonData[CharacterId] = newValue
              console.log(`[liangshi-calc]角色${CharacterId}配置data.json成功`)
              let updatedData = JSON.stringify(jsonData, null, 2)
              fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                  console.error('[liangshi-calc]角色data.json写入失败:\n', err)
                  e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
                  e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
                  return false
                } else {
                  console.log('[liangshi-calc]角色data.json已更新')
                }
              })
            } else {
              console.log(`[liangshi-calc]角色${CharacterId}已配置过，取消写入`)
            }
          } catch (err) {
            console.error('[liangshi-calc]自动配置data.json失败:\n', err)
          }
        })
      }
      e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n重启后即可使用${CharacterName}相关内容`)
      e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
    } else {
      e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n当前未启用自动写入CharacterData\n手动配置后重启才可使用\n自动写入CharacterData可在config.yaml启用或使用强制更新临时启用一次`)
      e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
    }
    return true
  }

  async convertPromoteToTables(promoteData) {
    const tables = []
    const levels = Object.keys(promoteData).sort((a, b) => a - b)
    const descMap = {}
    for (const level of levels) {
      const data = promoteData[level]
      if (!data?.Desc) continue
      for (const desc of data.Desc) {
        if (!desc?.trim()) continue
        try {
          const [name, paramStr = ''] = desc.split("|")
          if (!name) continue
          if (!descMap[name]) {
            descMap[name] = {
              name,
              paramParts: [],
            }
          }
          const paramRegex = /{param(\d+):([^}]+)}/g
          let match
          const params = []
          while ((match = paramRegex.exec(paramStr)) !== null) {
            params.push({
              index: parseInt(match[1]) - 1,
              format: match[2],
            })
          }
          if (params.length > 0) {
            if (params.length === 1 && !paramStr.includes("+") && !paramStr.includes("/")) {
              descMap[name].paramParts.push({
                type: "simple",
                index: params[0].index,
                format: params[0].format,
              })
            } else {
              const separator = paramStr.includes("/") ? "/" :
                paramStr.includes("+") ? "+" : null
              if (separator) {
                const parts = paramStr.split(separator).map(p => p.trim())
                const compoundParts = []
                for (const part of parts) {
                  const paramMatch = part.match(/{param(\d+):([^}]+)}/) ||
                    part.match(/param(\d+)/)
                  if (paramMatch) {
                    const index = parseInt(paramMatch[1]) - 1
                    const format = paramMatch[2] || "F1P"
                    compoundParts.push({ index, format })
                  }
                }
                if (compoundParts.length > 0) {
                  descMap[name].paramParts.push({
                    type: "compound",
                    separator,
                    parts: compoundParts,
                  })
                }
              }
            }
          } else if (paramStr.includes("+") || paramStr.includes("/")) {
            const separator = paramStr.includes("/") ? "/" : "+"
            const parts = paramStr.split(separator).map(p => p.trim())
            const compoundParts = []
            for (const part of parts) {
              const paramMatch = part.match(/param(\d+)/)
              if (paramMatch) {
                compoundParts.push({
                  index: parseInt(paramMatch[1]) - 1,
                  format: "F1P",
                })
              }
            }
            if (compoundParts.length > 0) {
              descMap[name].paramParts.push({
                type: "compound",
                separator,
                parts: compoundParts,
              })
            }
          }
        } catch (e) {
        }
      }
    }
    for (const type of Object.values(descMap)) {
      const values = []
      let hasError = false
      for (const level of levels) {
        if (hasError) {
          values.push(false)
          continue
        }
        try {
          const data = promoteData[level]
          if (!data?.Param) {
            values.push(false)
            continue
          }
          let value = ""
          for (const paramPart of type.paramParts) {
            if (paramPart.type === "simple") {
              const { index, format } = paramPart
              if (index >= data.Param.length) {
                value = false
                break
              }
              value = await this.formatParam(data.Param[index], format)
            } else if (paramPart.type === "compound") {
              const formattedParts = await Promise.all(
                paramPart.parts.map(async (part) => {
                  if (part.index >= data.Param.length) {
                    return false
                  }
                  return await this.formatParam(data.Param[part.index], part.format)
                })
              )
              value = formattedParts.join(` ${paramPart.separator} `)
            }
          }
          values.push(value)
        } catch (e) {
          values.push(false)
          hasError = true
        }
      }
      tables.push({
        name: type.name,
        unit: "",
        isSame: values.length > 1 && values.every(v => v === values[0]),
        values,
      })
    }
    return tables
  }

  async formatParam(value, format) {
    try {
      const num = parseFloat(value)
      if (isNaN(num)) return value.toString()
      switch (format) {
        case "F1P": return `${(num * 100).toFixed(1)}%`
        case "P": return `${Math.round(num * 100)}%`
        case "F1": return `${Math.round(num)}点`
        default: return value.toString()
      }
    } catch (e) {
      return false
    }
  }

  async TalentPromote (data) {
    const result = {}
    const promote = data.Promote
    const levelKeys = Object.keys(promote).sort((a, b) => parseInt(a) - parseInt(b))
    const templateDesc = promote[levelKeys[0]].Desc.filter(desc => desc.trim() !== "")
    templateDesc.forEach(desc => {
      const name = desc.split('|')[0]
      const format = desc.split('|')[1]
      const hasMultipleParams = (format.match(/\{param\d+:[^}]+\}/g) || []).length > 1
      const hasAsterisk = /\*/.test(format)
      const hasSlash = /\//.test(format)
      if (hasMultipleParams || hasSlash) {
        result[name] = []
        result[name + "2"] = []
      }
      if (hasAsterisk) {
        result[name] = []
        result[name + "2"] = []
      } else if (!hasMultipleParams && !hasSlash) {
        result[name] = []
      }
    })
    levelKeys.forEach(levelKey => {
      const levelData = promote[levelKey]
      const params = levelData.Param
      const currentLevelValues = {}
      templateDesc.forEach(desc => {
        const name = desc.split('|')[0]
        const format = desc.split('|')[1]
        const hasMultipleParams = (format.match(/\{param\d+:[^}]+\}/g) || []).length > 1
        const hasAsterisk = /\*/.test(format)
        const hasSlash = /\//.test(format)
        const paramMatches = format.match(/\{param(\d+):[^}]+\}/g) || []
        const paramInfo = paramMatches.map(match => {
          const index = parseInt(match.match(/\d+/)[0]) - 1
          const formatType = match.match(/:([^}]+)/)[1]
          return { index, formatType }
        })
        const extractedValues = paramInfo.map(({ index, formatType }) => {
          let value = params[index]
          const shouldMultiplyBy100 = formatType.includes("P")
          if (shouldMultiplyBy100) {
            value *= 100
          }
          return value
        })
        const asteriskMatch = format.match(/\*(\d+)/)
        const multiplier = asteriskMatch ? parseInt(asteriskMatch[1]) : 1
        const slashMatch = format.match(/\//)
        let sum = null
        if (hasMultipleParams && !hasSlash && !hasAsterisk) {
          sum = extractedValues.reduce((acc, val) => acc + val, 0)
        }
        if (hasAsterisk) {
          currentLevelValues[name] = extractedValues[0] * multiplier
          currentLevelValues[name + "2"] = [[extractedValues[0], multiplier]]
        } else if (hasSlash) {
          currentLevelValues[name] = extractedValues
          currentLevelValues[name + "2"] = extractedValues
        } else if (hasMultipleParams) {
          currentLevelValues[name] = sum
          currentLevelValues[name + "2"] = extractedValues
        } else {
          currentLevelValues[name] = extractedValues[0]
        }
      })
      for (const key in currentLevelValues) {
        if (!result[key]) {
          result[key] = []
        }
        result[key].push(currentLevelValues[key])
      }
    })
    return result
  }

  async getImg (url, Path, name) {
    if (!await common.downFile(url, Path)) {
      console.error(`[liangshi-calc]下载${name}图片失败`)
      return false
    }
    logger.mark(`[liangshi-calc]下载${name}图片成功`)
    return true
  }

}
