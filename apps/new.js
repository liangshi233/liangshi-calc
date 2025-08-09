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
            reg: '^#*(梁氏|liangshi)?检查(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)更新$',
            fnc: 'VerNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?一键更新(原神|原|ys|YS|gs|GS|鸣潮|明朝|潮|mc|MC)(最|当前最)?(新版本|新版本数据|新版本资源|新版本内容|新版本资源数据)$',
            fnc: 'New'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)角色(数据|资源|资源数据)?$',
            fnc: 'CharacterNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?$',
            fnc: 'ArtifactNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?$',
            fnc: 'WeaponNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?$',
            fnc: 'ItemNew'
          }
        ]
      }
    )
  }


  async New (e) {
    let cfg = LSconfig.getConfig('user', 'config')
     if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
       return false
     }
    let response, game, GameName, ProxyUrl, version, artifact, data, CharacterName, ArtifactName, weapon, WeaponName, ItemJson, ItemOk, s, u
    let i = /星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg) ? "cn" : "zh"
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      game = "gi"
      GameName = "原神"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      game = "hsr"
      GameName = "崩坏：星穹铁道"
      e.reply('[liangshi-calc]不支持的游戏(*/ω＼*)')
      return false
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      game = "zzz"
      GameName = "绝区零"
      e.reply('[liangshi-calc]不支持的游戏(*/ω＼*)')
      return false
    } else {
      game = "ww"
      GameName = "鸣潮"
    }
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    try {
      let url = `${ProxyUrl}https://api.hakush.in/${game}/new.json`
      response = await fetch(url)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        if (response.status === 404) {
          e.reply('[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新')
        } else if (response.status === 429) {
          e.reply('[liangshi-calc]你查询的速度太快了，请稍等一下再试吧(*/ω＼*)')
        } else if (response.status >= 500) {
          e.reply('[liangshi-calc]云端服务器可能正在维护，请稍等一下再试吧(*/ω＼*)')
        } else if (cfg.ProxyUrl) {
          e.reply('[liangshi-calc]请求异常，可能是网络超时，建议检查配置的代理后再试(*/ω＼*)')
        } else {
          e.reply('[liangshi-calc]请求异常，可能是网络超时，建议使用代理后再试(*/ω＼*)')
        }
        return false
      }
      data = await response.json()
      logger.mark(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      logger.mark(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    let character = data.character
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      version = data.hotfix
      weapon = data.weapon
      artifact = data.echo
      CharacterName = "共鸣者"
      ArtifactName = "声骸"
      WeaponName = "武器"
      s = "echo"
      u = "weapon"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      version = data.version
      weapon = data.lightcone
      artifact = data.relicset
      CharacterName = "角色"
      ArtifactName = "遗器"
      WeaponName = "光锥"
      s = "relicset"
      u = "lightcone"
    } else {
      version = data.version
      weapon = data.weapon
      artifact = data.artifact
      CharacterName = "角色"
      ArtifactName = "圣遗物"
      WeaponName = "武器"
      s = "artifact"
      u = "weapon"
    }
    let UseTime = Math.round(((5 + character.length * 20 + weapon.length * 4 + artifact.length * 3 + data.item.length * 4) / 60) * 10) / 10
    let y = Math.round(UseTime * 0.8 * 10) / 10
    e.reply(`[liangshi-calc] 即将静默更新\n${GameName} ${version}版本新内容\n共计\n\n${character.length}名新${CharacterName}\n${weapon.length}个新${WeaponName}\n${artifact.length}个新${ArtifactName}\n${data.item.length}个新物品\n\n预计需要${y}~${UseTime}分钟，请耐心等待.\n(*/ω＼*)`)
    await common.sleep(2000)
    ItemOk = true
    try {
      let url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/item_all.json`
      ItemJson = await fetch(url)
      if (!response.ok) {
        ItemOk = false
      }
      ItemJson = await ItemJson.json()
      fs.writeFile(`./plugins/liangshi-calc/resources/ItemJson.json`, JSON.stringify(ItemJson), 'utf8', (err) => {
        if (err) {
          ItemOk = false
        } else {
          logger.fatal(`[liangshi-calc] 物品Json已缓存至本地`)
        }
      })
    } catch (error) {
      ItemOk = false
      logger.fatal(`[liangshi-calc] 失败\n${error}`)
    }
    let instruction = { msg: null, isMaster: true, reply: e.reply }
    for (const charId of data.character) {
      instruction.msg = `#梁氏覆盖更新${GameName}${charId}角色数据`
      await common.sleep(2000)
      await this.CharacterNew(instruction, true)
    }
    await common.sleep(5000)
    logger.fatal(`[liangshi-calc] ${CharacterName}更新完成`)
    for (const weaponId of weapon) {
      instruction.msg = `#梁氏覆盖更新${GameName}${weaponId}武器数据`
      await common.sleep(2000)
      await this.WeaponNew(instruction, true)
    }
    await common.sleep(5000)
    logger.fatal(`[liangshi-calc] ${WeaponName}更新完成`)
    for (const artifactId of artifact) {
      await common.sleep(2000)
      instruction.msg = `#梁氏覆盖更新${GameName}${artifactId}圣遗物数据`
      await this.ArtifactNew(instruction, true)
    }
    await common.sleep(5000)
    logger.fatal(`[liangshi-calc] ${ArtifactName}更新完成`)
    for (const itemId of data.item) {
      await common.sleep(2000)
      instruction.msg = `#梁氏覆盖更新${GameName}${itemId}物品数据`
      await this.ItemNew(instruction, true, ItemOk)
    }
    await common.sleep(5000)
    logger.fatal(`[liangshi-calc] 物品更新完成`)
    fs.unlink('./plugins/liangshi-calc/resources/ItemJson.json', (err) => {
      if (err) {
        console.error('[liangshi-calc] 物品Json缓存删除失败:', err.message)
      } else {
        logger.fatal(`[liangshi-calc] 物品Json缓存已删除`)
      }
    })
    let CharacterNamedata, CharacterText, WeaponText, WeaponNamedata, ArtifactText, ArtifactNamedata
    try {
      CharacterText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/character.json`)
      WeaponText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/${u}.json`)
      ArtifactText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/${s}.json`)
      CharacterNamedata = await CharacterText.json()
      WeaponNamedata = await WeaponText.json()
      ArtifactNamedata = await ArtifactText.json()
      logger.mark(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      logger.mark(`[liangshi-calc]云端数据读取异常`)
    }
    let CharacterNameText, WeaponNameText, ArtifactNameText
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      CharacterNameText = character.map(num => CharacterNamedata[num.toString()]?.["zh-Hans"])
      WeaponNameText = weapon.map(num => WeaponNamedata[num.toString()]?.["zh-Hans"])
      ArtifactNameText = artifact.map(num => ArtifactNamedata[num.toString()]?.["zh-Hans"])
    } else {
      CharacterNameText = character.map(num => CharacterNamedata[num.toString()]?.CHS)
      WeaponNameText = weapon.map(num => WeaponNamedata[num.toString()]?.CHS)
      ArtifactNameText = artifact.map(id => {
        let item = ArtifactNamedata[id]
        if (!item?.set) return "未知套装"
        const firstSetKey = Object.keys(item.set)[0]
        return item.set[firstSetKey]?.name?.CHS ?? "未知名字"
      })
    }
    e.reply(`[liangshi-calc] ${GameName} ${version} 版本更新完成\n已为您更新\n\n${CharacterName}：\n${CharacterNameText}\n\n${WeaponName}：\n${WeaponNameText}\n\n${ArtifactName}：\n${ArtifactNameText}\n\n物品${data.item.length}个\n\n重启后即可使用相关内容`)
    return false
  }

  async ItemNew (e, mode, JsonOk) {
     if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
       return false
     }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, game, GamePath, ProxyUrl, data
    let i = /星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg) ? "cn" : "zh"
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      game = "gi"
      GamePath = "gs"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      game = "hsr"
      GamePath = "sr"
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      game = "zzz"
      GamePath = "zzz"
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      game = "ww"
      GamePath = "mc"
    }
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?$/)
    let ID = TextData[4]
    if (!JsonOk) {
      try {
        let url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/item_all.json`
        response = await fetch(url)
        if (!response.ok) {
          console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
          if (response.status === 404) {
            if(!mode) e.reply('[liangshi-calc]云端暂无该物品数据，可等待一段时间后再更新')
          } else if (response.status === 429) {
            if(!mode) e.reply('[liangshi-calc]你查询的速度太快了，请稍等一下再试吧(*/ω＼*)')
          } else if (response.status >= 500) {
            if(!mode) e.reply('[liangshi-calc]云端服务器可能正在维护，请稍等一下再试吧(*/ω＼*)')
          } else if (cfg.ProxyUrl) {
            if(!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议检查配置的代理后再试(*/ω＼*)')
          } else {
            if(!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议使用代理后再试(*/ω＼*)')
          }
          return false
        }
        data = await response.json()
        logger.mark(`[liangshi-calc]云端数据读取成功`)
      } catch (err) {
        if(!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
        logger.mark(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
        return false
      }
    } else {
      try {
        let ItemJson = fs.readFileSync('./plugins/liangshi-calc/resources/ItemJson.json', 'utf8')
        data = JSON.parse(ItemJson)
      } catch (err) {
        console.error('[liangshi-calc]物品缓存data.json读取失败:', err)
        return false
      }
    }
    let ItemData, ItemId, ItemName, ItemType
    if (!data[`${ID}`]) {
      if(!mode) e.reply('[liangshi-calc]未知的物品')
      return false
    }
    let url = `${ProxyUrl}https://api.hakush.in/${game}/UI/`
    let imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/material`
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      if (/区域特产/.test(data[`${ID}`].Type)) {
        //地图采集素材
        ItemType = "specialty"
        ItemData = {
          "id": ID,
          "name": data[`${ID}`].Name,
          "type": ItemType,
          "star": 1
        }
        ItemName = data[`${ID}`].Name
      } else if (data[`${ID}`].Type === "角色天赋素材") {
        //20体秘境天赋素材
        let text = data[`${ID}`].Name.match(/「(..)」的(..)/)
        ItemId = +ID + (4 - data[`${ID}`].Rank)
        let tf1Name = `「${text[1]}」的教导`
        let tf2Name = `「${text[1]}」的指引`
        let tf3Name = `「${text[1]}」的哲学`
        ItemType = "talent"
        ItemData = {
          "id": ItemId,
          "name": tf3Name,
          "type": ItemType,
          "star": 4,
          "items": {
            [tf1Name]: {
              "id": ItemId - 2,
              "name": tf1Name,
              "type": ItemType,
              "star": 2
            },
            [tf2Name]: {
              "id": ItemId - 1,
              "name": tf2Name,
              "type": ItemType,
              "star": 3
            },
            [tf3Name]: {
              "id": ItemId,
              "name": tf3Name,
              "type": ItemType,
              "star": 4
            }
          }
        }
        ItemName = tf3Name
      } else if (data[`${ID}`].Type === "武器突破素材") {
        //20体秘境武器素材
        ItemId = +ID + (5 - data[`${ID}`].Rank)
        let wq1Name = data[`${ItemId - 3}`].Name
        let wq2Name = data[`${ItemId - 2}`].Name
        let wq3Name = data[`${ItemId - 1}`].Name
        let wq4Name = data[`${ItemId}`].Name
        ItemType = "weapon"
        ItemData = {
          "id": ItemId,
          "name": wq4Name,
          "type": ItemType,
          "star": 5,
          "items": {
            [wq1Name]: {
              "id": ItemId - 3,
              "name": wq1Name,
              "type": ItemType,
              "star": 2
            },
            [wq2Name]: {
              "id": ItemId - 2,
              "name": wq2Name,
              "type": ItemType,
              "star": 3
            },
            [wq3Name]: {
              "id": ItemId - 1,
              "name": wq3Name,
              "type": ItemType,
              "star": 4
            },
            [wq4Name]: {
              "id": ItemId,
              "name": wq4Name,
              "type": ItemType,
              "star": 5
            }
          }
        }
        ItemName = wq4Name
      } else if (data[`${ID}`].Type === "角色培养素材") {
        //40体Boss素材 或 60体周本素材
        if (/70级以上/.test(data[`${ID}`].JumpDescs[0])) {
          // 60体周本素材
          ItemType = "weekly"
          ItemData = {
            "id": ID,
            "name": data[`${ID}`].Name,
            "type": ItemType,
            "star": 5
          }
          ItemName = data[`${ID}`].Name
        } else if (/30级以上/.test(data[`${ID}`].JumpDescs[0])) {
          //40体Boss素材
          ItemType = "boss"
          ItemData = {
            "id": ID,
            "name": data[`${ID}`].Name,
            "type": ItemType,
            "star": 4
          }
          ItemName = data[`${ID}`].Name
        }
      } else if (data[`${ID}`].Type === "角色与武器培养素材") {
        //普通敌人素材或精英敌人素材
        if (data[`${ID}`].Rank === 1 || (data[`${ID}`].Rank === 2 && /40级以上/.test(data[`${ID}`].JumpDescs[0])) || (data[`${ID}`].Rank === 3 && /60级以上/.test(data[`${ID}`].JumpDescs[0]))) {
          //普通敌人素材
          ItemId = +ID + (3 - data[`${ID}`].Rank)
          let wp1Name = data[`${ItemId - 2}`].Name
          let wp2Name = data[`${ItemId - 1}`].Name
          let wp3Name = data[`${ItemId}`].Name
          ItemType = "normal"
          ItemData = {
            "id": ItemId,
            "name": wp3Name,
            "type": ItemType,
            "star": 3,
            "items": {
              [wp1Name]: {
                "id": ItemId - 2,
                "name": wp1Name,
                "type": ItemType,
                "star": 1
              },
              [wp2Name]: {
                "id": ItemId - 1,
                "name": wp2Name,
                "type": ItemType,
                "star": 2
              },
              [wp3Name]: {
                "id": ItemId,
                "name": wp3Name,
                "type": ItemType,
                "star": 3
              }
            }
          }
          ItemName = wp3Name
        } else if (data[`${ID}`].Rank === 4 || (data[`${ID}`].Rank === 3 && /40级以上/.test(data[`${ID}`].JumpDescs[0])) || (data[`${ID}`].Rank === 2 && !/级以上/.test(data[`${ID}`].JumpDescs[0]))) {
          //精英敌人素材
          ItemId = +ID + (4 - data[`${ID}`].Rank)
          let wp2Name = data[`${ItemId - 2}`].Name
          let wp3Name = data[`${ItemId - 1}`].Name
          let wp4Name = data[`${ItemId}`].Name
          ItemType = "monster"
          ItemData = {
            "id": ItemId,
            "name": wp4Name,
            "type": ItemType,
            "star": 4,
            "items": {
              [wp2Name]: {
                "id": ItemId - 2,
                "name": wp2Name,
                "type": ItemType,
                "star": 2
              },
              [wp3Name]: {
                "id": ItemId - 1,
                "name": wp3Name,
                "type": ItemType,
                "star": 3
              },
              [wp4Name]: {
                "id": ItemId,
                "name": wp4Name,
                "type": ItemType,
                "star": 4
              }
            }
          }
          ItemName = wp4Name
        }
      } else {
        //未知物品
        ItemName = data[`${ID}`].Name
        ItemType =  data[`${ID}`].MaterialType.startsWith("MATERIAL_") ? data[`${ID}`].MaterialType.replace("MATERIAL_", "").toLowerCase() : data[`${ID}`].MaterialType.toLowerCase()
        ItemData = {
          "id": ID,
          "name": data[`${ID}`].Name,
          "type": ItemType,
          "star": data[`${ID}`].Rank
        }
      }
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      let key = {
        "通用货币": "consume",
        "高级货币": "consume",
        "消耗品": "food",
        "特殊代币": "consume",
        "活动道具": "consume",
        "探索工具": "widget",
        "唤取凭证": "consume",
        "唤取兑换代币": "consume",
        "月相观测凭证": "consume",
        "礼券": "consume",
        "物资箱": "consume",
        "任务道具": "consume",
        "声骸养成材料": "exchange",
        "存在异常，如有疑问请联系官方客服": "undefined",
        "材料": "exchange",
        "药品": "food",
        "药材": "exchange",
        "食材": "exchange",
        "印造材料": "exchange",
        "共鸣者经验材料": "exchange",
        "武器经验材料": "exchange",
        "声骸异相": "Phantom_Appearance",
        "印造配方": "consume",
        "关卡道具": "consume",
        "菜肴": "food",
        "回音残片": "consume",
        "信物": "Token",
        "鸣奏之匣": "Melode_Box",
        "加工品": "consume",
        "称号": "title"
      }
      if (data[`${ID}`]?.Tag?.includes("武器与技能素材")) {
        //40体秘境武器天赋素材 与 敌人素材
        if (ID > 43020010 && ID < 43020055) {
          //40体秘境武器天赋素材
          ItemType = "weapon"
        } else {
          //敌人素材
          ItemType = "monster"
        }
        ItemId = +ID + (5 - data[`${ID}`].Rank)
        let wq1Name = data[`${ItemId - 3}`].Name
        let wq2Name = data[`${ItemId - 2}`].Name
        let wq3Name = data[`${ItemId - 1}`].Name
        let wq4Name = data[`${ItemId}`].Name
        ItemData = {
          "id": ItemId,
          "name": wq4Name,
          "type": ItemType,
          "star": 5,
          "items": {
            [wq1Name]: {
              "id": ItemId - 3,
              "name": wq1Name,
              "type": ItemType,
              "star": 2
            },
            [wq2Name]: {
              "id": ItemId - 2,
              "name": wq2Name,
              "type": ItemType,
              "star": 3
            },
            [wq3Name]: {
              "id": ItemId - 1,
              "name": wq3Name,
              "type": ItemType,
              "star": 4
            },
            [wq4Name]: {
              "id": ItemId,
              "name": wq4Name,
              "type": ItemType,
              "star": 5
            }
          }
        }
        ItemName = wq4Name
      } else if (data[`${ID}`]?.Tag?.includes("突破材料")) {
        //地图采集素材
        ItemType = "specialty"
        ItemData = {
          "id": ID,
          "name": data[`${ID}`].name,
          "type": ItemType,
          "star": 1
        }
        ItemName = data[`${ID}`].Name
      } else if (data[`${ID}`]?.Tag?.includes("技能升级材料")) {
        //60体周本材料
        ItemType = "weekly"
        ItemData = {
          "id": ID,
          "name": data[`${ID}`].Name,
          "type": ItemType,
          "star": 4
        }
        ItemName = data[`${ID}`].Name
      } else if (data[`${ID}`]?.Tag?.includes("共鸣者突破材料")) {
        //60体Boss材料
        ItemType = "boss"
        ItemData = {
          "id": ID,
          "name": data[`${ID}`].Name,
          "type": ItemType,
          "star": 4
        }
        ItemName = data[`${ID}`].Name
      } else {
        //未知物品
        ItemName = data[`${ID}`].Name
        ItemType =  key[`${data[`${ID}`]?.Tag}`]
        ItemData = {
          "id": ID,
          "name": data[`${ID}`].Name,
          "type": ItemType,
          "star": data[`${ID}`].Rarity
        }
      }
    }
    await this.getImg((url + data[`${ID}`].Icon.replace(/^\/Game\/Aki\/UI\//, '').split('.')[0] + '.webp'), `${imgs}/${ItemType}/${data[`${ID}`].Name}.webp`, "图标")
    if(!mode) e.reply(`[liangshi-calc]物品图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-${GamePath}/material/data.json`
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}')
        logger.mark(`[liangshi-calc]未找到data.json文件，已自动创建`)
      }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取物品配置data.json失败:', err)
          if(!mode) e.reply(`[liangshi-calc]物品：${data[`${ID}`].Name} 数据更新完成\n尝试自动写入data时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[ItemName] = ItemData
          logger.mark(`[liangshi-calc]物品：${data[`${ID}`].Name} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]物品data.json写入失败:\n', err)
              if(!mode) e.reply(`[liangshi-calc]物品：${data[`${ID}`].Name} 数据更新完成\n尝试自动写入Data时失败\n请手动添加后重启使用`)
              return false
            } else {
              logger.mark('[liangshi-calc]物品data.json已更新')
            }
          })
        } catch (err) {
          console.error('[liangshi-calc]自动配置data.json失败:\n', err)
        }
      })
      if(!mode) e.reply(`[liangshi-calc]物品：${data[`${ID}`].Name} 数据更新完成\n重启后即可使用相关内容`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]物品：${data[`${ID}`].Name} 数据更新完成\n当前未启用自动写入ItemData\n手动配置后重启才可使用\n自动写入ItemData可在config.yaml启用或使用强制更新临时启用一次`)
    }
  }

  async WeaponNew (e, mode) {
     if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
       return false
     }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, game, GamePath, ProxyUrl, data, WeaponType, bonus, WeaponData
    let i = /星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg) ? "cn" : "zh"
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      game = "gi"
      GamePath = "gs"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      game = "hsr"
      GamePath = "sr"
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      game = "zzz"
      GamePath = "zzz"
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      game = "ww"
      GamePath = "mc"
    }
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?$/)
    let ID = TextData[4]
    if(!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的武器数据`)
    try {
      let url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/weapon/${ID}.json`
      response = await fetch(url)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        if (response.status === 404) {
          if(!mode) e.reply('[liangshi-calc]云端暂无该武器数据，可等待一段时间后再更新')
        } else if (response.status === 429) {
          if(!mode) e.reply('[liangshi-calc]你查询的速度太快了，请稍等一下再试吧(*/ω＼*)')
        } else if (response.status >= 500) {
          if(!mode) e.reply('[liangshi-calc]云端服务器可能正在维护，请稍等一下再试吧(*/ω＼*)')
        } else if (cfg.ProxyUrl) {
          if(!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议检查配置的代理后再试(*/ω＼*)')
        } else {
          if(!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议使用代理后再试(*/ω＼*)')
        }
        return false
      }
      data = await response.json()
      logger.mark(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      if(!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      logger.mark(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      if (ID < 12000) {
        WeaponType = "sword"
      } else if (ID < 13000) {
        WeaponType = "claymore"
      } else if (ID < 14000) {
        WeaponType = "polearm"
      } else if (ID < 15000) {
        WeaponType = "catalyst"
      } else {
        WeaponType = "bow"
      }
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      if (ID < 21020000) {
        WeaponType = "broadblade"
      } else if (ID < 21030000) {
        WeaponType = "sword"
      } else if (ID < 21040000) {
        WeaponType = "pistols"
      } else if (ID < 21050000) {
        WeaponType = "gauntlets"
      } else {
        WeaponType = "rectifier"
      }
    }
    let IconUrl = `${ProxyUrl}https://api.hakush.in/${game}/`
    let imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/${data.Name}`
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/${data.Name}`) || /强制|强行|覆盖/.test(e.msg)) {
      if(!mode) e.reply(`[liangshi-calc]开始更新武器: ${data.Name}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/${data.Name}`, { recursive: true })
      logger.mark(`[liangshi-calc]武器:${data.Name} 本地文件夹创建成功`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]武器: ${data.Name} 已经存在，如需更新数据请使用覆盖更新。`)
      return false
    }
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await this.getImg(IconUrl + data.Icon.replace(/^\/Game\/Aki\//, '').split('.')[0] + ".webp", `${imgs}/icon.webp`, "icon")
    } else {
      await this.getImg(IconUrl + "UI/" + data.Icon + ".webp", `${imgs}/icon.webp`, "icon")
      await this.getImg(IconUrl + "UI/" + data.Icon.replace("UI_", "UI_Gacha_") + ".webp", `${imgs}/gacha.webp`, "gacha")
      await this.getImg(IconUrl + "UI/" + data.Icon + "_Awaken" + ".webp", `${imgs}/awaken.webp`, "awaken")
    }
    if(!mode) e.reply(`[liangshi-calc]武器图片资源下载完成`)
    let key = {
      FIGHT_PROP_HP_PERCENT: "hpPct",
      "生命": "hpPct",
      FIGHT_PROP_ATTACK_PERCENT: "atkPct",
      "攻击": "atkPct",
      FIGHT_PROP_DEFENSE_PERCENT: "defPct",
      "防御": "atkPct",
      FIGHT_PROP_ELEMENT_MASTERY: "mastery",
      FIGHT_PROP_CHARGE_EFFICIENCY: "recharge",
      "共鸣效率": "recharge",
      FIGHT_PROP_CRITICAL: "cpct",
      "暴击": "cpct",
      FIGHT_PROP_CRITICAL_HURT: "cdmg",
      "暴击伤害": "cdmg",
      FIGHT_PROP_PHYSICAL_ADD_HURT: "phy"
    }
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      if (key[Object.keys(data.StatsModifier)[1]] === "mastery") {
        bonus = 1
      } else {
        bonus = 100
      }
      WeaponData = {
        "id": ID,
        "name": data.Name,
        "affixTitle": data.Refinement["1"].Name,
        "star": data.Rarity,
        "desc": data.Desc,
        "attr": {
          "atk": {
            "1": data.StatsModifier.ATK.Base,
            "20": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["20"],
            "40": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["40"] + Object.values(data.Ascension["1"])[0],
            "50": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["50"] + Object.values(data.Ascension["2"])[0],
            "60": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["60"] + Object.values(data.Ascension["3"])[0],
            "70": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["70"] + Object.values(data.Ascension["4"])[0],
            "80": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["80"] + Object.values(data.Ascension["5"])[0],
            "90": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["90"] + Object.values(data.Ascension["6"])[0],
            "20+": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["20"] + Object.values(data.Ascension["1"])[0],
            "40+": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["40"] + Object.values(data.Ascension["2"])[0],
            "50+": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["50"] + Object.values(data.Ascension["3"])[0],
            "60+": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["60"] + Object.values(data.Ascension["4"])[0],
            "70+": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["70"] + Object.values(data.Ascension["5"])[0],
            "80+": data.StatsModifier.ATK.Base * data.StatsModifier.ATK.Levels["80"] + Object.values(data.Ascension["6"])[0]
          },
          "bonusKey": key[Object.keys(data.StatsModifier)[1]],
          "bonusData": {
            "1": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus,
            "20": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["20"],
            "40": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["40"],
            "50": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["50"],
            "60": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["60"],
            "70": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["70"],
            "80": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["80"],
            "90": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["90"],
            "20+": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["20"],
            "40+": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["40"],
            "50+": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["50"],
            "60+": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["60"],
            "70+": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["70"],
            "80+": data.StatsModifier[Object.keys(data.StatsModifier)[1]].Base * bonus * data.StatsModifier[Object.keys(data.StatsModifier)[1]].Levels["80"],
          }
        },
        "materials": {
          "weapon": data.Materials["6"].Mats[0].Name,
          "monster": data.Materials["6"].Mats[1].Name,
          "normal": data.Materials["6"].Mats[2].Name
        },
        "affixData": await this.WeaponPromote(data.Refinement),
        "UpdateTime": `[liangshi-calc] ${new Date()}`
      }
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      let IconData, IconResponse
      try {
        let url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/item.json`
        IconResponse = await fetch(url)
        if (!response.ok) {
          console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
          IconData = {}
        } else {
          IconData = await IconResponse.json()
        }
        logger.mark(`[liangshi-calc]云端数据读取成功`)
      } catch (err) {
        IconData = {}
        logger.mark(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      }
      WeaponData = {
        "id": ID,
        "name": data.Name,
        "affixTitle": data.EffectName,
        "star": data.Rarity,
        "desc": data.Desc.replace(/\n/g, ''),
        "attr": {
          "atk": {
            "1": data.Stats["0"]["1"][0].Value,
            "20": data.Stats["0"]["20"][0].Value,
            "40": data.Stats["1"]["40"][0].Value,
            "50": data.Stats["2"]["50"][0].Value,
            "60": data.Stats["3"]["60"][0].Value,
            "70": data.Stats["4"]["70"][0].Value,
            "80": data.Stats["5"]["80"][0].Value,
            "90": data.Stats["6"]["90"][0].Value,
            "20+": data.Stats["1"]["20"][0].Value,
            "40+": data.Stats["2"]["40"][0].Value,
            "50+": data.Stats["3"]["50"][0].Value,
            "60+": data.Stats["4"]["60"][0].Value,
            "70+": data.Stats["5"]["70"][0].Value,
            "80+": data.Stats["6"]["80"][0].Value
          },
          "bonusKey": key[data.Stats["0"]["1"][1].Name],
          "bonusData": {
            "1": data.Stats["0"]["1"][1].Value,
            "20": data.Stats["0"]["20"][1].Value,
            "40": data.Stats["1"]["40"][1].Value,
            "50": data.Stats["2"]["50"][1].Value,
            "60": data.Stats["3"]["60"][1].Value,
            "70": data.Stats["4"]["70"][1].Value,
            "80": data.Stats["5"]["80"][1].Value,
            "90": data.Stats["6"]["90"][1].Value,
            "20+": data.Stats["1"]["20"][1].Value,
            "40+": data.Stats["2"]["40"][1].Value,
            "50+": data.Stats["3"]["50"][1].Value,
            "60+": data.Stats["4"]["60"][1].Value,
            "70+": data.Stats["5"]["70"][1].Value,
            "80+": data.Stats["6"]["80"][1].Value
          }
        },
        "materials": {
          "weapon": IconData[`${data.Ascensions["5"][0].Key}`].name,
          "monster": IconData[`${data.Ascensions["5"][1].Key}`].name
        },
        "affixData": {
          "text": data.Effect.replace(/\{(\d+)\}/g, '$[$1]'),
          "datas": data.Param
        },
        "UpdateTime": `[liangshi-calc] ${new Date()}`
      }
    }
    logger.mark('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/${data.Name}/data.json`
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
      logger.mark(`[liangshi-calc]武器：${data.Name} 数据已写入`)
      if(!mode) e.reply(`[liangshi-calc]武器：${data.Name} 数据已写入`)
    } else if (/强制|强行|覆盖/.test(e.msg)) {
      if(!mode) e.reply('[liangshi-calc]武器数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
      logger.mark(`[liangshi-calc]武器：${data.Name} 数据已写入`)
      if(!mode) e.reply(`[liangshi-calc]武器：${data.Name} 数据已写入`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]武器数据已存在，运行终止。\n如果需要刷新武器数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}武器数据`)
      console.error(`[liangshi-calc]武器：${data.Name} 数据已存在`)
    }
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/data.json`
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}')
        logger.mark(`[liangshi-calc]未找到data.json文件，已自动创建`)
      }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取武器配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]武器：${data.Name} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          let newValue = {
            "id": ID,
            "name": data.Name,
            "star": data.Rarity
          }
          jsonData[ID] = newValue
          logger.mark(`[liangshi-calc]武器：${data.Name} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]武器data.json写入失败:\n', err)
              if (!mode) e.reply(`[liangshi-calc]武器：${data.Name} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
              return false
            } else {
              logger.mark('[liangshi-calc]武器data.json已更新')
            }
          })
        } catch (err) {
          console.error('[liangshi-calc]自动配置data.json失败:\n', err)
        }
      })
      if(!mode) e.reply(`[liangshi-calc]武器：${data.Name} 数据更新完成\n重启后即可使用相关内容`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]武器：${data.Name} 数据更新完成\n当前未启用自动写入WeaponData\n手动配置后重启才可使用\n自动写入WeaponData可在config.yaml启用或使用强制更新临时启用一次`)
    }
    return false
  }

  async ArtifactNew (e, mode) {
     if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
       return false
     }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, game, GamePath, ProxyUrl, data, zb
    let i = /星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg) ? "cn" : "zh"
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      game = "gi"
      GamePath = "gs"
      zb = "圣遗物"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      game = "hsr"
      GamePath = "sr"
      zb = "遗器"
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      game = "zzz"
      GamePath = "zzz"
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      game = "ww"
      GamePath = "mc"
      zb = "声骸"
    }
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?$/)
    let ID = TextData[4]
    if(!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的${zb}数据`)
    try {
      let p
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)){
        p = "echo"
      } else {
        p = "artifact"
      }
      let url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/${p}/${ID}.json`
      response = await fetch(url)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        if (response.status === 404) {
          if(!mode)  e.reply(`[liangshi-calc]云端暂无该${zb}数据，可等待一段时间后再更新`)
        } else if (response.status === 429) {
          if(!mode) e.reply('[liangshi-calc]你查询的速度太快了，请稍等一下再试吧(*/ω＼*)')
        } else if (response.status >= 500) {
          if(!mode) e.reply('[liangshi-calc]云端服务器可能正在维护，请稍等一下再试吧(*/ω＼*)')
        } else if (cfg.ProxyUrl) {
          if(!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议检查配置的代理后再试(*/ω＼*)')
        } else {
          if(!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议使用代理后再试(*/ω＼*)')
        }
        return false
      }
      data = await response.json()
      logger.mark(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      if(!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      logger.mark(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    let IconUrl = `${ProxyUrl}https://api.hakush.in/${game}/`
    let imgPath, imgs, imgName
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      imgPath = ""
      imgName = data.Name
    } else {
      imgPath = "/imgs"
      imgName = data.Affix[0].Name
    }
    imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/artifact${imgPath}/${imgName}`
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-${GamePath}/artifact${imgPath}/${imgName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if(!mode) e.reply(`[liangshi-calc]开始更新${zb}: ${imgName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-${GamePath}/artifact${imgPath}/${imgName}`, { recursive: true })
      logger.mark(`[liangshi-calc]${zb}:${imgName} 本地imgs文件夹创建成功`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]${zb}: ${imgName} 已经存在，如需更新数据请使用覆盖更新。`)
      return false
    }
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await this.getImg(IconUrl + "UI/" + data.Parts.EQUIP_RING.Icon + ".webp", `${imgs}/4.webp`, "空之杯")
      await this.getImg(IconUrl + "UI/" + data.Parts.EQUIP_NECKLACE.Icon + ".webp", `${imgs}/2.webp`, "死之羽")
      await this.getImg(IconUrl + "UI/" + data.Parts.EQUIP_DRESS.Icon + ".webp", `${imgs}/5.webp`, "理之冠")
      await this.getImg(IconUrl + "UI/" + data.Parts.EQUIP_BRACER.Icon + ".webp", `${imgs}/1.webp`, "生之花")
      await this.getImg(IconUrl + "UI/" + data.Parts.EQUIP_SHOES.Icon + ".webp", `${imgs}/3.webp`, "时之沙")
      if(!mode) e.reply(`[liangshi-calc]${zb}图片资源下载完成`)
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      await this.getImg(IconUrl + data.Icon.replace(/^\/Game\/Aki\//, '').split('.')[0] + ".webp", `${imgs}/img.webp`, "声骸")
    }
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-${GamePath}/artifact/data.json`
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}')
        logger.mark(`[liangshi-calc]未找到data.json文件，已自动创建`)
      }
      if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取${zb}配置data.json失败:', err)
            if (!mode) e.reply(`[liangshi-calc]${zb}：${imgName} 数据更新完成\n尝试自动写入ArtifactData时失败\n请手动添加后重启使用`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            let newValue = {
              "id": ID,
              "name": data.Affix[0].Name,
              "sets": {
                "1": {
                  "id": `${data.Parts.EQUIP_BRACER.Story}`,
                  "name": data.Parts.EQUIP_BRACER.Name
                },
                "2": {
                  "id": `${data.Parts.EQUIP_NECKLACE.Story}`,
                  "name": data.Parts.EQUIP_NECKLACE.Name
                },
                "3": {
                  "id": `${data.Parts.EQUIP_SHOES.Story}`,
                  "name": data.Parts.EQUIP_SHOES.Name
                },
                "4": {
                  "id": `${data.Parts.EQUIP_RING.Story}`,
                  "name": data.Parts.EQUIP_RING.Name
                },
                "5": {
                  "id": `${data.Parts.EQUIP_DRESS.Story}`,
                  "name": data.Parts.EQUIP_DRESS.Name
                }
              },
              "effect": {
                "2": data.Affix[0].Desc,
                "4": data.Affix[1].Desc
              },
              "UpdateTime": `[liangshi-calc] ${new Date()}`
            }
            jsonData[ID] = newValue
            logger.mark(`[liangshi-calc]${zb}：${imgName} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error(`[liangshi-calc]${zb}data.json写入失败:\n`, err)
                if (!mode) e.reply(`[liangshi-calc]${zb}：${imgName} 数据更新完成\n尝试自动写入ArtifactData时失败\n请手动添加后重启使用`)
                return false
              } else {
                logger.mark(`[liangshi-calc]${zb}data.json已更新`)
              }
            })
          } catch (err) {
            console.error('[liangshi-calc]自动配置data.json失败:\n', err)
          }
        })
      } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        let n = Object.keys(data.Group)[0]
        let m = Object.keys(data.Group[`${n}`].Set)[0]
        let l = Object.keys(data.Group[`${n}`].Set)[1] || null
        let k = l ? {
          [m]: data.Group[`${n}`].Set[`${m}`].Desc.replace(/\{(\d+)\}/g, (match, index) => {
            let c = parseInt(index, 10)
            return data.Group[`${n}`].Set[`${m}`].Param[c] || match
          }),
          [l]: data.Group[`${n}`].Set[`${l}`].Desc.replace(/\{(\d+)\}/g, (match, index) => {
            let c = parseInt(index, 10)
            return data.Group[`${n}`].Set[`${l}`].Param[c] || match
          })
        } : {
          [m]: data.Group[`${n}`].Set[`${m}`].Desc.replace(/\{(\d+)\}/g, (match, index) => {
            let c = parseInt(index, 10)
            return data.Group[`${n}`].Set[`${m}`].Param[c] || match
          })
        }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取声骸配置data.json失败:', err)
            if (!mode) e.reply(`[liangshi-calc]声骸：${imgName} 数据更新完成\n尝试自动写入ArtifactData时失败\n请手动添加后重启使用`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            let newValue = {
              "id": Object.keys(data.Group)[0],
              "name": data.Group[`${Object.keys(data.Group)[0]}`].Name,
              "sets": {},
              "effect": k,
              "UpdateTime": `[liangshi-calc] ${new Date()}`
            }
            jsonData[n] = newValue
            logger.mark(`[liangshi-calc]${zb}：${imgName} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error(`[liangshi-calc]${zb}data.json写入失败:\n`, err)
                if (!mode) e.reply(`[liangshi-calc]${zb}：${imgName} 数据更新完成\n尝试自动写入ArtifactData时失败\n请手动添加后重启使用`)
                return false
              } else {
                logger.mark(`[liangshi-calc]${zb}data.json已更新`)
              }
            })
          } catch (err) {
            console.error('[liangshi-calc]自动配置data.json失败:\n', err)
          }
        })
        let y = data.Skill.Param
        let datas = {}
        y.forEach(subArray => {
          subArray.forEach((value, index) => {
            if (!datas[index]) {
              datas[index] = []
            }
            datas[index].push(value)
          })
        })
        let o = data.Skill.Desc.replace(/\{(\d+)\}/g, (match, p1) => {
          return `$[${p1}]`
        })
        let ArtifactData = {
          "id": data.id,
          "Name": data.Name,
          "Code": data.Code,
          "desc": data.Skill.SimpleDesc.replace(/\n/g, ''),
          "affixData": {
            "text": o.replace(/\n/g, ''),
            "datas": datas
          }
        }
        let path = `./plugins/miao-plugin/resources/meta-${GamePath}/artifact/${imgName}/data.json`
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, JSON.stringify(ArtifactData, null, 2), 'utf8')
          logger.mark(`[liangshi-calc]声骸：${imgName} 数据已写入`)
          if(!mode) e.reply(`[liangshi-calc]声骸：${imgName} 数据已写入`)
        } else if (/强制|强行|覆盖/.test(e.msg)) {
          if(!mode) e.reply('[liangshi-calc]声骸数据已存在，当前为强制模式，尝试覆盖写入。')
          fs.writeFileSync(path, JSON.stringify(ArtifactData, null, 2), 'utf8')
          logger.mark(`[liangshi-calc]声骸：${imgName} 数据已写入`)
          if(!mode) e.reply(`[liangshi-calc]声骸：${imgName} 数据已写入`)
        } else {
          if(!mode) e.reply(`[liangshi-calc]声骸数据已存在，运行终止。\n如果需要刷新声骸数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}声骸数据`)
          console.error(`[liangshi-calc]声骸：${imgName} 数据已存在`)
        }
      }
      if (!mode) e.reply(`[liangshi-calc]${zb}：${imgName} 数据更新完成\n重启后即可使用相关内容`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]${zb}：${imgName} 数据更新完成\n当前未启用自动写入ArtifactData\n手动配置后重启才可使用\n自动写入ArtifactData可在config.yaml启用或使用强制更新临时启用一次`)

    }
    return false
  }

  async VerNew (e) {
    let cfg = LSconfig.getConfig('user', 'config')
    let response, game, GameName, ProxyUrl, version, artifact, data, CharacterName, ArtifactName, weapon, WeaponName
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      game = "gi"
      GameName = "原神"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      game = "hsr"
      GameName = "崩坏：星穹铁道"
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      game = "zzz"
      GameName = "绝区零"
    } else {
      game = "ww"
      GameName = "鸣潮"
    }
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    try {
      let url = `${ProxyUrl}https://api.hakush.in/${game}/new.json`
      response = await fetch(url)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        if (response.status === 404) {
          e.reply('[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新')
        } else if (response.status === 429) {
          e.reply('[liangshi-calc]你查询的速度太快了，请稍等一下再试吧(*/ω＼*)')
        } else if (response.status >= 500) {
          e.reply('[liangshi-calc]云端服务器可能正在维护，请稍等一下再试吧(*/ω＼*)')
        } else if (cfg.ProxyUrl) {
          e.reply('[liangshi-calc]请求异常，可能是网络超时，建议检查配置的代理后再试(*/ω＼*)')
        } else {
          e.reply('[liangshi-calc]请求异常，可能是网络超时，建议使用代理后再试(*/ω＼*)')
        }
        return false
      }
      data = await response.json()
      logger.mark(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      logger.mark(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    let character = data.character.length > 0 ? data.character : "本次无此内容更新"
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      version = data.hotfix
      weapon = data.weapon.length > 0 ? data.weapon : "本次无此内容更新"
      artifact = data.echo.length > 0 ? data.echo : "本次无此内容更新"
      CharacterName = "共鸣者"
      ArtifactName = "声骸"
      WeaponName = "武器"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      version = data.version
      weapon = data.lightcone.length > 0 ? data.lightcone : "本次无此内容更新"
      artifact = data.relicset.length > 0 ? data.relicset : "本次无此内容更新"
      CharacterName = "角色"
      ArtifactName = "遗器"
      WeaponName = "光锥"
    } else {
      version = data.version
      weapon = data.weapon.length > 0 ? data.weapon : "本次无此内容更新"
      artifact = data.artifact.length > 0 ? data.artifact : "本次无此内容更新"
      ArtifactName = "圣遗物"
      CharacterName = "角色"
      WeaponName = "武器"
    }
    e.reply(`[liangshi-calc] 检查到更新\n当前${GameName}的最新版本为${version}\n以下为新内容\n\n${CharacterName}ID\n${character}\n\n${WeaponName}ID\n${weapon}\n\n${ArtifactName}ID\n${artifact}`)
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

  async CharacterNew (e, mode) {
     if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
       return false
     }
    if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      if(!mode) e.reply('[liangshi-calc]暂不支持该游戏更新，运行终止。')
      logger.mark('[liangshi-calc]更新被中断')
      return false
    }
    let cfg = LSconfig.getConfig('user', 'config')
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)(.*?)角色(数据|资源|资源数据)?$/)
    let CharacterId = TextData[4]
    if ((/^\d{4}$/.test(CharacterId) && !/原神|原|ys|YS|gs|GS/.test(TextData[3])) || (!/原神|原|ys|YS|gs|GS/.test(TextData[3]) && /强制|强行|覆盖/.test(e.msg))) {
      logger.mark(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
      if(!mode) e.reply(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
    } else if ((/^\d{8}$/.test(CharacterId) && /原神|原|ys|YS|gs|GS/.test(TextData[3])) || /强制|强行|覆盖/.test(e.msg)) {
      logger.mark(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
      if(!mode) e.reply(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
    } else {
      let CharacterIdUrl, GameName
      if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
        CharacterIdUrl = "https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-gs/README.md"
        GameName = "原神"
      } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
        CharacterIdUrl = undefined //(目录名称内容可能含有违规信息)"https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-sr/README.md"
        GameName = "星铁"
      } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
        CharacterIdUrl = undefined //"https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-zzz/README.md"
        GameName = "绝区零"
      } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        CharacterIdUrl = "https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-mc/README.md"
        GameName = "鸣潮"
      } else {
        CharacterIdUrl = undefined
        GameName = undefined
      }
      console.error(`[liangshi-calc]未知的角色ID:${CharacterId}`)
      if(!mode) e.reply('[liangshi-calc]角色ID错误，请检查角色ID格式(原神:8位数字,其余:4位数字)')
      if(!mode) e.reply(`[liangshi-calc]角色ID可在${CharacterIdUrl}内对照 (新版本角色ID可使用 #梁氏检查${GameName}更新 查看)`)
      return false
    }
    let data, game, GamePath
    let i = /星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg) ? "cn" : "zh"
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      game = "gi"
      GamePath = "gs"
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      game = "hsr"
      GamePath = "sr"
    } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) {
      game = "zzz"
      GamePath = "zzz"
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      game = "ww"
      GamePath = "mc"
    }
    if(!mode) e.reply(`[liangshi-calc]开始更新角色${CharacterId}数据`)
    let response, ProxyUrl
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    try {
      let url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/character/${CharacterId}.json`
      response = await fetch(url)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        return false
      }
      data = await response.json()
      logger.mark(`[liangshi-calc]角色:${data.Name}云端数据读取成功`)
    } catch (err) {
      console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
      if (response.status === 404) {
        if(!mode) e.reply('[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新')
        if(!mode) e.reply('数据更新时间(预估)\n鸣潮：暂无确定时间\n原神：版本更新当天18：00~次日6：00左右\n星穹铁道：版本更新当天18：00~次日6：00左右\n绝区零：undefined')
      } else if (response.status === 429) {
        if(!mode) e.reply('[liangshi-calc]你更新的速度太快了，请稍等一下再试吧(*/ω＼*)')
      } else if (response.status >= 500) {
        if(!mode) e.reply('[liangshi-calc]云端服务器可能正在维护，请稍等一下再试吧(*/ω＼*)')
      } else if (cfg.ProxyUrl) {
        if(!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议检查配置的代理后再试(*/ω＼*)')
      } else {
        if(!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议使用代理后再试(*/ω＼*)')
      }
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

    let ItemText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/zh/item.json`)
    let ItemNamedata = await ItemText.json()
    let elemKey = {
      "1": "glacio",
      "2": "fusion",
      "3": "electro",
      "4": "aero",
      "5": "spectrp",
      "6": "havoc"
    }
    let weaponKey = {
      "1": "broadblade",
      "2": "sword",
      "3": "pistols",
      "4": "gauntlets",
      "5": "rectifier"
    }
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      CharacterData = {
        "id": data.Id,
        "name": data.Name,
        "abbr": data.Name,
        "title": data.CharaInfo.TalentName,
        "star": data.Rarity,
        "elem": elemKey[`${data.Element}`],
        "allegiance": data.CharaInfo.Country,
        "weapon": weaponKey[`${data.Weapon}`],
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
          "boss": ItemNamedata?.[`${data.Ascensions["6"][0].Key}`]?.name || data.Ascensions["6"][0].Key,
          "specialty": ItemNamedata?.[`${data.Ascensions["6"][1].Key}`]?.name || data.Ascensions["6"][1].Key,
          "normal": ItemNamedata?.[`${data.Ascensions["6"][2].Key}`]?.name || data.Ascensions["6"][2].Key,
          "talent": ItemNamedata?.[`${data.SkillTrees["1"].Skill.Consume["10"][0].Key}`]?.name || data.SkillTrees["1"].Skill.Consume["10"][0].Key,
          "weekly": ItemNamedata?.[`${data.SkillTrees["1"].Skill.Consume["10"][2].Key}`]?.name ||data.SkillTrees["1"].Skill.Consume["10"][2].Key
        },
        "talent": {
          "a": {
            "name": data.SkillTrees["1"].Skill.Name,
            "desc": data.SkillTrees["1"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["1"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["1"].Skill.Level).sort((a, b) => a.id - b.id).map(i => ({ ...i, Param: i.Param[0] }))
          },
          "e": {
            "name": data.SkillTrees["2"].Skill.Name,
            "desc": data.SkillTrees["2"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["2"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["2"].Skill.Level).sort((a, b) => a.id - b.id).map(i => ({ ...i, Param: i.Param[0] }))
          },
          "q": {
            "name": data.SkillTrees["3"].Skill.Name,
            "desc": data.SkillTrees["3"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["3"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["3"].Skill.Level).sort((a, b) => a.id - b.id).map(i => ({ ...i, Param: i.Param[0] }))
          },
          "t": {
            "name": data.SkillTrees["7"].Skill.Name,
            "desc": data.SkillTrees["7"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["7"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["7"].Skill.Level).sort((a, b) => a.id - b.id).map(i => ({ ...i, Param: i.Param[0] }))
          },
          "i": {
            "name": data.SkillTrees["6"].Skill.Name,
            "desc": data.SkillTrees["6"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["6"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["6"].Skill.Level).sort((a, b) => a.id - b.id).map(i => ({ ...i, Param: i.Param[0] }))
          },
          "o": {
            "name": data.SkillTrees["8"].Skill.Name,
            "desc": data.SkillTrees["8"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["8"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
            "tables": Object.values(data.SkillTrees["8"].Skill.Level).sort((a, b) => a.id - b.id).map(i => ({ ...i, Param: i.Param[0] }))
          }
        },
        "talentData": {
          "a": await this.mcName(data.SkillTrees["1"].Skill),
          "e": await this.mcName(data.SkillTrees["2"].Skill),
          "q": await this.mcName(data.SkillTrees["3"].Skill),
          "t": await this.mcName(data.SkillTrees["7"].Skill),
          "i": await this.mcName(data.SkillTrees["6"].Skill),
          "o": await this.mcName(data.SkillTrees["8"].Skill),
        },
        "cons": {
          "1": {
            "name": data.Chains["1"].Name,
            "desc": data.Chains["1"].Desc.replace(/<size=40><color=Title>(.*?)<\/color><\/size>/g, '<h3>$1<\/h3>').replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/<\/?[^>]+>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.Chains["1"].Param[i] || m).split('\n').filter(line => line.trim() !== '')
          },
          "2": {
            "name": data.Chains["2"].Name,
            "desc": data.Chains["2"].Desc.replace(/<size=40><color=Title>(.*?)<\/color><\/size>/g, '<h3>$1<\/h3>').replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/<\/?[^>]+>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.Chains["2"].Param[i] || m).split('\n').filter(line => line.trim() !== '')
          },
          "3": {
            "name": data.Chains["3"].Name,
            "desc": data.Chains["3"].Desc.replace(/<size=40><color=Title>(.*?)<\/color><\/size>/g, '<h3>$1<\/h3>').replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/<\/?[^>]+>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.Chains["3"].Param[i] || m).split('\n').filter(line => line.trim() !== '')
          },
          "4": {
            "name": data.Chains["4"].Name,
            "desc": data.Chains["4"].Desc.replace(/<size=40><color=Title>(.*?)<\/color><\/size>/g, '<h3>$1<\/h3>').replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/<\/?[^>]+>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.Chains["4"].Param[i] || m).split('\n').filter(line => line.trim() !== '')
          },
          "5": {
            "name": data.Chains["5"].Name,
            "desc": data.Chains["5"].Desc.replace(/<size=40><color=Title>(.*?)<\/color><\/size>/g, '<h3>$1<\/h3>').replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/<\/?[^>]+>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.Chains["5"].Param[i] || m).split('\n').filter(line => line.trim() !== '')
          },
          "6": {
            "name": data.Chains["6"].Name,
            "desc": data.Chains["6"].Desc.replace(/<size=40><color=Title>(.*?)<\/color><\/size>/g, '<h3>$1<\/h3>').replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/<\/?[^>]+>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.Chains["6"].Param[i] || m).split('\n').filter(line => line.trim() !== '')
          }
        },
        "passive": [
          {
            "name": data.SkillTrees["4"].Skill.Name,
            "desc": data.SkillTrees["4"].Skill.Desc.replace(/<size=40><color=Title>(.*?)<\/color><\/size>/g, '<h3>$1<\/h3>').replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/<\/?[^>]+>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["4"].Skill.Param[i] || m).split('\n').filter(line => line.trim() !== '')
          },
          {
            "name": data.SkillTrees["5"].Skill.Name,
            "desc": data.SkillTrees["5"].Skill.Desc.replace(/<size=40><color=Title>(.*?)<\/color><\/size>/g, '<h3>$1<\/h3>').replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/<\/?[^>]+>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["5"].Skill.Param[i] || m).split('\n').filter(line => line.trim() !== '')
          }
        ],
        "attr": {
          "tree": {
            "1": {
              "name": data.SkillTrees["9"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["9"].Skill.Param[i] || m),
              "key": data.SkillTrees["9"].Skill.Name,
              "value": parseFloat(data.SkillTrees["9"].Skill.Param[0].replace('%', ''))
            },
            "2": {
              "name": data.SkillTrees["10"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["10"].Skill.Param[i] || m),
              "key": data.SkillTrees["10"].Skill.Name,
              "value": parseFloat(data.SkillTrees["10"].Skill.Param[0].replace('%', ''))

            },
            "3": {
              "name": data.SkillTrees["11"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["11"].Skill.Param[i] || m),
              "key": data.SkillTrees["11"].Skill.Name,
              "value": parseFloat(data.SkillTrees["11"].Skill.Param[0].replace('%', ''))
            },
            "4": {
              "name": data.SkillTrees["12"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["12"].Skill.Param[i] || m),
              "key": data.SkillTrees["12"].Skill.Name,
              "value": parseFloat(data.SkillTrees["12"].Skill.Param[0].replace('%', ''))
            },
            "5": {
              "name": data.SkillTrees["13"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["13"].Skill.Param[i] || m),
              "key": data.SkillTrees["13"].Skill.Name,
              "value": parseFloat(data.SkillTrees["13"].Skill.Param[0].replace('%', ''))
            },
            "6": {
              "name": data.SkillTrees["14"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["14"].Skill.Param[i] || m),
              "key": data.SkillTrees["14"].Skill.Name,
              "value": parseFloat(data.SkillTrees["14"].Skill.Param[0].replace('%', ''))
            },
            "7": {
              "name": data.SkillTrees["15"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["15"].Skill.Param[i] || m),
              "key": data.SkillTrees["15"].Skill.Name,
              "value": parseFloat(data.SkillTrees["15"].Skill.Param[0].replace('%', ''))
            },
            "8": {
              "name": data.SkillTrees["16"].Skill.Desc.replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["16"].Skill.Param[i] || m),
              "key": data.SkillTrees["16"].Skill.Name,
              "value": parseFloat(data.SkillTrees["16"].Skill.Param[0].replace('%', ''))
            }
          },
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
          }
        },
        "UpdateTime": `[liangshi-calc] ${new Date()}`
      }
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
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
        "abbr": data.Name.length >= 5 ? data.Name.slice(-2) : data.Name,
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
          },
          data.Passives?.[3] ? {
            "name": data.Passives?.[3]?.Name,
            "desc": data.Passives?.[3]?.Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          } : undefined,
          data.Passives?.[4] ? {
            "name": data.Passives?.[4]?.Name,
            "desc": data.Passives?.[4]?.Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0)
          } : undefined,
        ].filter(Boolean),
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
      if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
    } else if (/强制|强行|覆盖/.test(e.msg)) {
      if(!mode) e.reply('[liangshi-calc]角色数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(CharacterData, null, 2), 'utf8')
      logger.mark(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
      if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]角色数据已存在，运行终止。\n如果需要刷新角色数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${GamePath}${CharacterId}数据`)
      console.error(`[liangshi-calc]角色：${CharacterName} 数据已存在`)
    }
    if(!mode) e.reply(`[liangshi-calc]角色数据资源下载完成`)
    logger.mark(`[liangshi-calc]开始下载角色图片资源`)
    let IconUrl = `${ProxyUrl}https://api.hakush.in/${game}/`
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
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
    } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      await this.getImg(IconUrl + "UI/UI_Gacha_AvatarImg_" + data.Icon.replace("UI_AvatarIcon_", "") + ".webp", `${imgs}/splash.webp`, "立绘")
      await this.getImg(IconUrl + "UI/" + data.Icon + ".webp", `${imgs}/face.webp`, "大头")
      await this.getImg(IconUrl + "UI/" + data.CharaInfo.Namecard.Icon + ".webp", `${imgs}/card.webp`, "名片")
      await this.getImg(IconUrl + "UI/" + data.Passives[2].Icon + ".webp", `${icons}/passive-0.webp`, "固有天赋1")
      await this.getImg(IconUrl + "UI/" + data.Passives[0].Icon + ".webp", `${icons}/passive-1.webp`, "固有天赋2")
      await this.getImg(IconUrl + "UI/" + data.Passives[1].Icon + ".webp", `${icons}/passive-2.webp`, "固有天赋3")
      await this.getImg(IconUrl + "UI/" + data.Passives?.[3]?.Icon + ".webp", `${icons}/passive-3.webp`, "固有天赋4")
      await this.getImg(IconUrl + "UI/" + data.Skills[1].Promote[0].Icon + ".webp", `${icons}/talent-e.webp`, "元素战技")
      await this.getImg(IconUrl + "UI/" + data.Skills[2].Promote[0].Icon + ".webp", `${icons}/talent-q.webp`, "元素爆发")
      await this.getImg(IconUrl + "UI/" + data.Constellations[0].Icon + ".webp", `${icons}/cons-1.webp`, "1命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[1].Icon + ".webp", `${icons}/cons-2.webp`, "2命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[2].Icon + ".webp", `${icons}/cons-3.webp`, "3命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[3].Icon + ".webp", `${icons}/cons-4.webp`, "4命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[4].Icon + ".webp", `${icons}/cons-5.webp`, "5命")
      await this.getImg(IconUrl + "UI/" + data.Constellations[5].Icon + ".webp", `${icons}/cons-6.webp`, "6命")
    }
    if(!mode) e.reply(`[liangshi-calc]角色图片资源下载完成`)
    logger.mark(`[liangshi-calc]图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        filePath = "./plugins/miao-plugin/resources/meta-mc/character/data.json"
        if (!fs.existsSync(filePath)) {
          logger.mark('[liangshi-calc]找不到文件data.json，请检查mian-waves配置')
          fs.writeFileSync(filePath, '{}')
        }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取角色配置data.json失败:\n', err)
            if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
            if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
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
            jsonData[CharacterId] = newValue
            logger.mark(`[liangshi-calc]角色${CharacterId} 配置data.json成功`)
            const updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error('[liangshi-calc]角色data.json写入失败:\n', err)
                if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
                if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
                return false
              } else {
                logger.mark('[liangshi-calc]角色data.json已更新')
              }
            })
          } catch (err) {
            console.error('[liangshi-calc]自动配置data.json失败:\n', err)
          }
        })
      } else if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
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
            if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
            if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
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
            jsonData[CharacterId] = newValue
            logger.mark(`[liangshi-calc]角色${CharacterId} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error('[liangshi-calc]角色data.json写入失败:\n', err)
                if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
                if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
                return false
              } else {
                logger.mark('[liangshi-calc]角色data.json已更新')
              }
            })
          } catch (err) {
            console.error('[liangshi-calc]自动配置data.json失败:\n', err)
          }
        })
      }
      if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n重启后即可使用${CharacterName}相关内容`)
      if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName} 数据更新完成\n当前未启用自动写入CharacterData\n手动配置后重启才可使用\n自动写入CharacterData可在config.yaml启用或使用强制更新临时启用一次`)
      if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
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
          const [descPart, multiplier = ''] = desc.split("*")
          const [name, paramStr = ''] = descPart.split("|")
          if (!name) continue
          if (!descMap[name]) {
            descMap[name] = {
              name,
              paramParts: [],
              multiplier: multiplier || null
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
          if (value !== false && type.multiplier) {
            value += `*${type.multiplier}`
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

  async WeaponPromote(WeaponData) {
    const result = {
      affixData: {
        text: "",
        datas: {}
      }
    }
    const levels = Object.values(WeaponData)
    if (levels.length === 0) return result
    const templateDesc = levels[0].Desc
    const colorRegex = /<color=#99FFFFFF>(.*?)<\/color>/g
    const placeholders = []
    let match
    let lastIndex = 0
    let processedText = ""
    colorRegex.lastIndex = 0
    while ((match = colorRegex.exec(templateDesc)) !== null) {
      processedText += templateDesc.slice(lastIndex, match.index)
      const placeholderIndex = placeholders.length
      processedText += `$[${placeholderIndex}]`
      placeholders.push({
        index: placeholderIndex,
        values: []
      })
      lastIndex = colorRegex.lastIndex
    }
    processedText += templateDesc.slice(lastIndex)
    levels.forEach(level => {
      const desc = level.Desc
      colorRegex.lastIndex = 0
      let valueIndex = 0
      let valueMatch
      while ((valueMatch = colorRegex.exec(desc)) !== null) {
        if (valueIndex >= placeholders.length) {
          break
        }
        const content = valueMatch[1]
        placeholders[valueIndex].values.push(content)
        valueIndex++
      }
    })
    result.affixData.text = processedText
    placeholders.forEach(ph => {
      result.affixData.datas[ph.index] = ph.values
    })
    return result
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
      const name = desc.split('|')[0].trim()
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
        const name = desc.split('|')[0].trim()
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
          currentLevelValues[name + "2"] = [extractedValues[0], multiplier]
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

  async mcName(data) {
    let result = {}
    for (const levelKey in data.Level) {
      let levelData = data.Level[levelKey]
      let name = levelData.Name
      let params = levelData.Param[0]
      result[name] = params.map(param => {
        const cleanParam = param.replace(/%/g, '')
        if (cleanParam.includes('+')) {
          return cleanParam.split('+').reduce((sum, p) => sum + parseFloat(p), 0)
        } else if (cleanParam.includes('*')) {
          return cleanParam.split('*').reduce((prod, p) => prod * parseFloat(p), 1)
        } else {
          return parseFloat(cleanParam)
        }
      })
      let hasOperation = params.some(param => param.includes('+') || param.includes('*'))
      if (hasOperation) {
        const name2 = `${name}2`
        result[name2] = params.map(param => {
          const cleanParam = param.replace(/%/g, '')
          if (cleanParam.includes('+')) {
            return cleanParam.split('+').map(p => parseFloat(p))
          } else if (cleanParam.includes('*')) {
            return cleanParam.split('*').map(p => parseFloat(p))
          } else {
            return [parseFloat(cleanParam)]
          }
        })
      }
    }
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