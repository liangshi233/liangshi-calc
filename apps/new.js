import { alias as aliasGs } from '../../miao-plugin/resources/meta-gs/character/alias.js'
import { alias as aliasSr } from '../../miao-plugin/resources/meta-sr/character/alias.js'
import { alias as aliasMc } from '../damage/liangshi-mc/data/alias.js'
import plugin from '../../../lib/plugins/plugin.js'
import common from '../../../lib/common/common.js'
import { Common } from '../components/index.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'

/**
 * 已知问题
 * 使用API 2和3 更新鸣潮角色数据时角色天赋顺序会被打乱
 * 使用API 2和3 更新鸣潮声骸数据时会丢失代号数据
 *
 * 如果有新的问题建议去issue反馈
 */

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
            reg: '^#*(梁氏|liangshi)?检查(鸣潮|明朝|潮|mc|MC)更新$',
            fnc: 'VerNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?一键更新(原神|原|ys|YS|gs|GS|鸣潮|明朝|潮|mc|MC|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR)(最|当前最)?新版本(完整|全部)?(角色|共鸣者|武器|光锥|圣遗物|声骸|遗器|物品|材料|敌人|敌怪|怪物|残响|残像|boss|BOSS)?(数据|资源|内容|资源数据)$',
            fnc: 'New'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(角色|共鸣者)(数据|资源|资源数据)?$',
            fnc: 'CharacterNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?$',
            fnc: 'ArtifactNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?$',
            fnc: 'WeaponNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?$',
            fnc: 'ItemNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS)(数据|资源|资源数据)?$',
            fnc: 'MonsterNew'
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
    if (!/鸣潮|明朝|潮|mc|MC/.test(e.msg)) { e.reply('不支持的功能'); return true }
    let characterTime, weaponTime, artifactTime, monsterTime, itemTime, url, apiKey, character, status, response, game, GamePath, GameName, ProxyUrl, version, artifact, data, CharacterName, ArtifactName, weapon, WeaponName, monster, MonsterName, ItemJson, ItemOk, s, u, url2, servName
    let i = "zh"
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
      game = "ww"
      GamePath = "mc"
      GameName = "鸣潮"
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    try {
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        if (cfg.mcApi === 2 || cfg.mcApi === 3) {
          url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/new`
          servName = "encore.moe"
        } else {
          url = `${ProxyUrl}https://api.hakush.in/${game}/new.json`
          servName = "hakush.in"
        }
      } else {
        url = `${ProxyUrl}https://api.hakush.in/${game}/new.json`
        servName = "hakush.in"
      }
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
    if (cfg.mcApi === 2 || cfg.mcApi === 3) {
      version = data[0].ResVer
      character = data[1].character
      weapon = data[1].weapon
      monster = data.monster
      artifact = data[1].echo
      data.item = data[1].item
    } else {
      version = data.hotfix
      character = data.character
      weapon = data.weapon
      monster = data.monster
      artifact = data.echo
    }
    CharacterName = "共鸣者"
    ArtifactName = "声骸"
    WeaponName = "武器"
    MonsterName = "残像"
    s = "echo"
    u = "weapon"
    if (/完整|全部/.test(e.msg)) {
      let Characterurl, Weaponurl, Artifacturl, Monsterurl, Itemurl
      status = "完整"
      try {
        if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
          Characterurl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/character`)
          Characterurl = await Characterurl.json()
          character = Characterurl.roleList.map(item => item.Id)
          Weaponurl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/weapon`)
          Weaponurl = await Weaponurl.json()
          weapon = Weaponurl.weapons.map(item => item.Id)
          Artifacturl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/echo`)
          Artifacturl = await Artifacturl.json()
          artifact = Artifacturl.Echo.map(item => item.Id)
          Itemurl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`)
          Itemurl = await Itemurl.json()
          data.item = Itemurl.itemList.map(item => item.Id)
        } else {
          Characterurl = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/character.json`)
          Characterurl = await Characterurl.json()
          character = Object.keys(Characterurl).map(Number)
          Weaponurl = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/${u}.json`)
          Weaponurl = await Weaponurl.json()
          weapon = Object.keys(Weaponurl).map(Number)
          Artifacturl = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/${s}.json`)
          Artifacturl = await Artifacturl.json()
          artifact = Object.keys(Artifacturl).map(Number)
          Monsterurl = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/monster.json`)
          Monsterurl = await Monsterurl.json()
          monster = Object.keys(Monsterurl).map(Number)
          Itemurl = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/${i}/item_all.json`)
          Itemurl = await Itemurl.json()
          data.item = Object.keys(Itemurl).map(Number)
        }
      } catch (err) {
        logger.mark(err)
      }
    }
    if (/角色|共鸣者/.test(e.msg)) {
      weapon = [], artifact = [], data.item = [], monster = []
    } else if (/武器|光锥/.test(e.msg)) {
      character = [], artifact = [], data.item = [], monster = []
    } else if (/圣遗物|声骸/.test(e.msg)) {
      character = [], weapon = [], data.item = [], monster = []
    } else if (/物品|材料/.test(e.msg)) {
      character = [], weapon = [], artifact = [], monster = []
    } else if (/敌人|敌怪|怪物|残响|残像|boss|BOSS/.test(e.msg)) {
      character = [], weapon = [], artifact = [], data.item = []
    }
    let UseTime = Math.round(((5 + character.length * 16 + weapon.length * 2 + artifact.length * 1 + monster.length * 1 + data.item.length * 2) / 60) * 10) / 10
    let y = Math.round(UseTime * 0.75 * 10) / 10
    e.reply(`[liangshi-calc] 即将静默更新\n${GameName} ${version}版本新内容\n共计\n\n${character.length}名新${CharacterName}\n${weapon.length}个新${WeaponName}\n${artifact.length}个新${ArtifactName}\n${monster.length}个新${MonsterName}\n${data.item.length}个新物品\n\n预计需要${y}~${UseTime}分钟，请耐心等待.\n(*/ω＼*)`)
    await common.sleep(2000)
    ItemOk = true
    if (!fs.existsSync("./plugins/liangshi-calc/resources/log.json")) {
      fs.writeFileSync("./plugins/liangshi-calc/resources/log.json", '{}')
      logger.mark(`[liangshi-calc]未找到错误日志文件，已自动创建`)
    }
    try {
      let url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/item_all.json`
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
        url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`
        url2 = `${ProxyUrl}https://api.encore.moe/zh-Hans/echo`
        let EchoJson = await fetch(url2)
        EchoJson = await EchoJson.json()
        fs.writeFile(`./plugins/liangshi-calc/resources/EchoJson.json`, JSON.stringify(EchoJson), 'utf8', (err) => {
          if (err) {
            logger.error(`[liangshi-calc] 声骸Json储存失败`)
            fs.unlink('./plugins/liangshi-calc/resources/EchoJson.json', (err) => {
              if (!err) {
                console.warn(`[liangshi-calc] 声骸Json储存错误残留文件已清理`)
              }
            })
          } else {
            logger.info(`[liangshi-calc] 声骸Json已缓存至本地`)
          }
        })
      }
      ItemJson = await fetch(url)
      if (!response.ok) {
        ItemOk = false
      }
      ItemJson = await ItemJson.json()
      fs.writeFile(`./plugins/liangshi-calc/resources/ItemJson.json`, JSON.stringify(ItemJson), 'utf8', (err) => {
        if (err) {
          ItemOk = false
        } else {
          logger.info(`[liangshi-calc] 物品Json已缓存至本地`)
        }
      })
    } catch (error) {
      ItemOk = false
      logger.error(`[liangshi-calc] Json缓存失败\n${error}`)
    }
    let instruction = { msg: null, isMaster: true, reply: e.reply }
    for (const charId of character) {
      instruction.msg = `#梁氏覆盖更新${GameName}${charId}角色数据`
      await common.sleep(2000)
      await this.CharacterNew(instruction, true)
    }
    characterTime =  `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    for (const weaponId of weapon) {
      instruction.msg = `#梁氏覆盖更新${GameName}${weaponId}武器数据`
      await common.sleep(1500)
      await this.WeaponNew(instruction, true)
    }
    weaponTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    for (const artifactId of artifact) {
      await common.sleep(1500)
      instruction.msg = `#梁氏覆盖更新${GameName}${artifactId}圣遗物数据`
      await this.ArtifactNew(instruction, true)
    }
    artifactTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && cfg.mcApi === 1) {
      for (const monsterId of monster) {
        await common.sleep(1500)
        instruction.msg = `#梁氏覆盖更新${GameName}${monsterId}敌人数据`
        await this.MonsterNew(instruction, true)
      }
    }
    monsterTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    for (const itemId of data.item) {
      await common.sleep(1000)
      instruction.msg = `#梁氏覆盖更新${GameName}${itemId}物品数据`
      await this.ItemNew(instruction, true, ItemOk)
    }
    itemTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    let verDataPath = `./plugins/miao-plugin/resources/meta-${GamePath}/data.json`
    if (!fs.existsSync(verDataPath)) fs.writeFileSync(verDataPath, '{}')
    fs.readFile(verDataPath, 'utf8', (err, TextData) => {
      if (err) return false
      try {
        let verData = JSON.parse(TextData)
        let Time = new Date()
        let dayTime = `${Time.getFullYear()}-${Time.getMonth() + 1}-${Time.getDate()} ${Time.getHours()}:${Time.getMinutes()}`
        verData.ver = version
        verData.time = dayTime
        let api = (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) ? "encore.moe" : "hakush.in"
        verData[dayTime] = {
          "ver": version,
          "api": api,
          "time": dayTime,
          "artifact": artifact,
          "character": character,
          "monster": monster,
          "material": data.item,
          "weapon": weapon,
          "status": status
        }
        let updatedData = JSON.stringify(verData, null, 2)
        fs.writeFile(verDataPath, updatedData, 'utf8', (err) => {
          if (err) return false
        })
      } catch (err) {
        console.log(err)
      }
    })
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 3 || cfg.mcApi === 2)) {
      fs.unlink('./plugins/liangshi-calc/resources/EchoJson.json', (err) => {
        if (!err) {
          logger.fatal(`[liangshi-calc] 声骸Json缓存已删除`)
        }
      })
    }
    fs.unlink('./plugins/liangshi-calc/resources/ItemJson.json', (err) => {
      if (err) {
        console.error('[liangshi-calc] 物品Json缓存删除失败:', err.message)
      } else {
        logger.info(`[liangshi-calc] 物品Json缓存已删除`)
      }
    })
    let CharacterNamedata, CharacterText, WeaponText, WeaponNamedata, ArtifactText, ArtifactNamedata, MonsterText, MonsterNamedata
    try {
      CharacterText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/character.json`)
      WeaponText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/${u}.json`)
      ArtifactText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/${s}.json`)
      MonsterText =  await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/monster.json`)
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
        CharacterText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/character`)
        WeaponText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/${u}`)
        ArtifactText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/${s}`)
        MonsterText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/monster.json`)
      }
      CharacterNamedata = await CharacterText.json()
      WeaponNamedata = await WeaponText.json()
      ArtifactNamedata = await ArtifactText.json()
      logger.mark(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      logger.mark(`[liangshi-calc]云端数据读取异常`)
      e.reply('[liangshi-calc]网络不佳，请稍后重试')
      return false
    }
    let CharacterNameText, WeaponNameText, ArtifactNameText, MonsterNameText
    if (cfg.mcApi === 2 || cfg.mcApi === 3) {
      CharacterNameText = character.map(id => CharacterNamedata.roleList.find(role => role.Id === id).Name)
      WeaponNameText = weapon.map(id => WeaponNamedata.weapons.find(role => role.Id === id).Name)
      ArtifactNameText = artifact.map(id => ArtifactNamedata.Echo.find(role => role.Id === id).Name)
      MonsterNameText = monster.map(id => MonsterNamedata.Monster.find(role => role.Id === id).Name)
    } else {
      CharacterNameText = character.map(num => CharacterNamedata[num.toString()]?.["zh-Hans"] ?? `${num.toString()}`)
      WeaponNameText = weapon.map(num => WeaponNamedata[num.toString()]?.["zh-Hans"] ?? `${num.toString()}`)
      ArtifactNameText = artifact.map(num => ArtifactNamedata[num.toString()]?.["zh-Hans"] ?? `${num.toString()}`)
      MonsterNameText = monster.map(num => MonsterNamedata[num.toString()]?.["zh-Hans"] ?? `${num.toString()}`)
    }
    try {
      let webp, webp3, a, b, c, d, i, f, g, h, j
      webp = "side"
      webp3 = "img"
      a = ""
      c = fs.readFileSync('./plugins/miao-plugin/resources/meta-mc/character/data.json', 'utf8')
      c = JSON.parse(c)
      d = fs.readFileSync('./plugins/miao-plugin/resources/meta-mc/weapon/broadblade/data.json', 'utf8')
      d = JSON.parse(d)
      i = fs.readFileSync('./plugins/miao-plugin/resources/meta-mc/weapon/gauntlets/data.json', 'utf8')
      i = JSON.parse(i)
      f = fs.readFileSync('./plugins/miao-plugin/resources/meta-mc/weapon/pistols/data.json', 'utf8')
      f = JSON.parse(f)
      g = fs.readFileSync('./plugins/miao-plugin/resources/meta-mc/weapon/rectifier/data.json', 'utf8')
      g = JSON.parse(g)
      h = fs.readFileSync('./plugins/miao-plugin/resources/meta-mc/weapon/sword/data.json', 'utf8')
      h = JSON.parse(h)
      Object.values(d).forEach(ccb => {ccb.type = "broadblade"})
      Object.values(i).forEach(ccb => {ccb.type = "gauntlets"})
      Object.values(f).forEach(ccb => {ccb.type = "pistols"})
      Object.values(g).forEach(ccb => {ccb.type = "rectifier"})
      Object.values(h).forEach(ccb => {ccb.type = "sword"})
      j = { ...d, ...i, ...f, ...g, ...h }
      let chars = character.filter(id => c.hasOwnProperty(id)).map(id => ({
        face: `/meta-${GamePath}/character/${c[id].name}/imgs/${webp}.webp`,
        name: c[id].name || "无名",
        abbr: c[id].abbr || c[id].name || "",
        star: c[id].star
      }))
      let weapons = weapon.filter(id => j.hasOwnProperty(id)).map(id => ({
        face: `/meta-${GamePath}/weapon/${j[id].type}/${j[id].name}/icon.webp`,
        name: j[id].name,
        abbr: j[id].abbr || j[id].name,
        star: j[id].star
      }))
      let artis = ArtifactNameText.map(id => ({
        face: `/meta-${GamePath}/artifact${a}/${id}/${webp3}.webp`,
        name: id,
        star: 5
      }))
      let monster = {}
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && cfg.mcApi === 1) {
        monster = MonsterNameText.map(id => ({
          face: `/meta-${GamePath}/monster/${id}/icon.webp`,
          name: id,
          star: 5
        }))
      }
      return await Common.render('wiki/data/ver-new', {
        gamever: version,
        gameid: GameName,
        TxName: {
          js: CharacterName,
          wq: WeaponName,
          zb: ArtifactName,
          dr: MonsterName
        },
        jsNum: character.length,
        wqNum: weapon.length,
        zbNum: artifact.length,
        drNum: monster.length,
        wpNum: data.item.length,
        chars,
        weapons,
        artis,
        monster,
        servName,
        updateTime: { characterTime, weaponTime, artifactTime, monsterTime, itemTime },
        elem: 'hydro'
      }, { e, scale: 1.6, retType: 'base64' })
    } catch (err) {
      console.error('[liangshi-calc] 生成图片时遇到了一些问题，但这并不影响功能:', err)
      if (CharacterNameText.length === 0) CharacterNameText = `本次没有更新任何${CharacterName}`
      if (WeaponNameText.length === 0) WeaponNameText = `本次没有更新任何${WeaponName}`
      if (ArtifactNameText.length === 0) ArtifactNameText = `本次没有更新任何${ArtifactName}`
      e.reply(`[liangshi-calc] ${GameName} ${version} 版本更新完成\n已为您更新\n\n${CharacterName}：\n${CharacterNameText}\n\n${WeaponName}：\n${WeaponNameText}\n\n${ArtifactName}：\n${ArtifactNameText}\n\n物品${data.item.length}个\n\n重启后即可使用相关内容`)
      return false
    }
  }

  async ItemNew (e, mode, JsonOk) {
    if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
      return false
    }
    if (!/鸣潮|明朝|潮|mc|MC/.test(e.msg)) { e.reply('不支持的功能'); return true }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, game, GamePath, ProxyUrl, data, url, apiKey, itemJson
    let i = "zh"
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
    game = "ww"
    GamePath = "mc"
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?$/)
    try {
      let ID = TextData[4]
      if (!JsonOk) {
        try {
          if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
            url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`
          } else {
            url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/item_all.json`
          }
          response = await fetch(url)
          if (!response.ok) {
            console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
            if (response.status === 404) {
              if (!mode) e.reply('[liangshi-calc]云端暂无该物品数据，可等待一段时间后再更新')
            } else if (response.status === 429) {
              if (!mode) e.reply('[liangshi-calc]你查询的速度太快了，请稍等一下再试吧(*/ω＼*)')
            } else if (response.status >= 500) {
              if (!mode) e.reply('[liangshi-calc]云端服务器可能正在维护，请稍等一下再试吧(*/ω＼*)')
            } else if (cfg.ProxyUrl) {
              if (!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议检查配置的代理后再试(*/ω＼*)')
            } else {
              if (!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议使用代理后再试(*/ω＼*)')
            }
            return false
          }
          data = await response.json()
          logger.mark(`[liangshi-calc]云端数据读取成功`)
        } catch (err) {
          if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
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
      let ItemData, ItemId, ItemName, ItemType, Tag
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
        Tag = "TypeName"
        itemJson = data.itemList.reduce((ccb, item) => {ccb[item.Id] = {...item}; return ccb}, {})
        url = `${ProxyUrl}${itemJson[`${ID}`].Icon}`
      } else {
        Tag = "Tag"
        itemJson = data
        url = `${ProxyUrl}https://api.hakush.in/${game}/UI/` + itemJson[`${ID}`].Icon.replace(/^\/Game\/Aki\/UI\//, '').split('.')[0] + '.webp'
      }
      if (!itemJson[`${ID}`]) {
        if (!mode) e.reply('[liangshi-calc]未知的物品')
        return false
      }
      let imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/material`
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        let key = {
          "经验": "none",
          "通用货币": "consume",
          "高级货币": "consume",
          "消耗品": "food",
          "活跃度": "none",
          "特殊代币": "consume",
          "活动道具": "consume",
          "影响力": "none",
          "探索工具": "widget",
          "唤取凭证": "consume",
          "唤取兑换代币": "consume",
          "月相观测凭证": "consume",
          "先约电台": "consume",
          "礼券": "consume",
          "物资箱": "consume",
          "回音频段": "talent",
          "任务道具": "consume",
          "声骸养成材料": "exchange",
          "存在异常，如有疑问请联系官方客服": "undefined",
          "材料": "exchange",
          "药品": "food",
          "合成配方-制药": "consume",
          "药材": "exchange",
          "食材": "exchange",
          "印造材料": "exchange",
          "共鸣者经验材料": "exchange",
          "武器经验材料": "exchange",
          "声骸异相": "Phantom_Appearance",
          "印造配方": "consume",
          "随机声骸道具": "consume",
          "关卡道具": "consume",
          "菜肴": "food",
          "回音残片": "consume",
          "信物": "Token",
          "鸣奏之匣": "Melode_Box",
          "食谱": "consume",
          "加工品": "consume",
          "好感度": "none",
          "合成配方-构造": "consume",
          "合成成品-药剂": "consume",
          "合成成品-玩法道具": "consume",
          "称号": "title"
        }
        ItemType = itemJson[`${ID}`]?.[Tag]?.[0]
        if (itemJson[`${ID}`]?.[Tag]?.includes("武器与技能素材")) {
          //40体秘境武器天赋素材 与 敌人素材
          ItemId = +ID + (5 - (itemJson[`${ID}`].QualityId || itemJson[`${ID}`].Rarity))
          let wq1Name = itemJson[`${ItemId - 3}`].Name
          let wq2Name = itemJson[`${ItemId - 2}`].Name
          let wq3Name = itemJson[`${ItemId - 1}`].Name
          let wq4Name = itemJson[`${ItemId}`].Name
          ItemData = {
            "id": ItemId,
            "name": wq4Name,
            "type": ItemType,
            "tag": itemJson[`${ID}`]?.[Tag],
            "tagNum": itemJson[`${ID}`]?.TagNum,
            "Desc": itemJson[`${ID}`]?.Desc.split('\n'),
            "Bg": itemJson[`${ID}`]?.Bg?.split('\n'),
            "Source": itemJson[`${ID}`]?.Source,
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
        } else if (itemJson[`${ID}`]?.[Tag]?.includes("突破材料")) {
          //地图采集素材
          ItemData = {
            "id": ID,
            "name": itemJson[`${ID}`].name,
            "type": ItemType,
            "tag": itemJson[`${ID}`]?.[Tag],
            "tagNum": itemJson[`${ID}`]?.TagNum,
            "Desc": itemJson[`${ID}`]?.Desc.split('\n'),
            "Bg": itemJson[`${ID}`]?.Bg?.split('\n'),
            "Source": itemJson[`${ID}`]?.Source,
            "star": 1
          }
          ItemName = itemJson[`${ID}`].Name
        } else if (itemJson[`${ID}`]?.[Tag]?.includes("技能升级材料")) {
          //60体周本材料
          ItemData = {
            "id": ID,
            "name": itemJson[`${ID}`].Name,
            "type": ItemType,
            "tag": itemJson[`${ID}`]?.[Tag],
            "tagNum": itemJson[`${ID}`]?.TagNum,
            "Desc": itemJson[`${ID}`]?.Desc.split('\n'),
            "Bg": itemJson[`${ID}`]?.Bg?.split('\n'),
            "Source": itemJson[`${ID}`]?.Source,
            "star": 4
          }
          ItemName = itemJson[`${ID}`].Name
        } else if (itemJson[`${ID}`]?.[Tag]?.includes("共鸣者突破材料")) {
          //60体Boss材料
          ItemData = {
            "id": ID,
            "name": itemJson[`${ID}`].Name,
            "type": ItemType,
            "tag": itemJson[`${ID}`]?.[Tag],
            "tagNum": itemJson[`${ID}`]?.TagNum,
            "Desc": itemJson[`${ID}`]?.Desc.split('\n'),
            "Bg": itemJson[`${ID}`]?.Bg?.split('\n'),
            "Source": itemJson[`${ID}`]?.Source,
            "star": 4
          }
          ItemName = itemJson[`${ID}`].Name
        } else {
          //未知物品
          ItemName = itemJson[`${ID}`].Name
          ItemData = {
            "id": ID,
            "name": itemJson[`${ID}`].Name,
            "type": ItemType,
            "tag": itemJson[`${ID}`]?.[Tag],
            "tagNum": itemJson[`${ID}`]?.TagNum,
            "Desc": itemJson[`${ID}`]?.Desc.split('\n'),
            "Bg": itemJson[`${ID}`]?.Bg?.split('\n'),
            "Source": itemJson[`${ID}`]?.Source,
            "star": itemJson[`${ID}`].Rarity || itemJson[`${ID}`].QualityId
          }
        }
      }
      await this.getImg(url, `${imgs}/${ItemType}/${itemJson[`${ID}`].Name}.webp`, "图标")
      if (!mode) e.reply(`[liangshi-calc]物品图片资源下载完成`)
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath = `./plugins/miao-plugin/resources/meta-${GamePath}/material/data.json`
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '{}')
          logger.mark(`[liangshi-calc]未找到data.json文件，已自动创建`)
        }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取物品配置data.json失败:', err)
            if (!mode) e.reply(`[liangshi-calc]物品：${itemJson[`${ID}`].Name || itemJson[`${ID}`].ItemName} 数据更新完成\n尝试自动写入data时失败\n请手动添加后重启使用`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
              if (!jsonData[ItemType]) jsonData[ItemType] = {}
              jsonData[ItemType][ID] = ItemData
            } else {
              jsonData[ItemName] = ItemData
            }
            logger.mark(`[liangshi-calc]物品：${itemJson[`${ID}`].Name || itemJson[`${ID}`].ItemName} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error('[liangshi-calc]物品data.json写入失败:\n', err)
                if (!mode) e.reply(`[liangshi-calc]物品：${itemJson[`${ID}`].Name} 数据更新完成\n尝试自动写入Data时失败\n请手动添加后重启使用`)
                return false
              } else {
                logger.mark('[liangshi-calc]物品data.json已更新')
              }
            })
          } catch (err) {
            console.error('[liangshi-calc]自动配置data.json失败:\n', err)
          }
        })
        if (!mode) e.reply(`[liangshi-calc]物品：${itemJson[`${ID}`].Name || itemJson[`${ID}`].ItemName} 数据更新完成\n重启后即可使用相关内容`)
      } else {
        if (!mode) e.reply(`[liangshi-calc]物品：${itemJson[`${ID}`].Name || itemJson[`${ID}`].ItemName} 数据更新完成\n当前未启用自动写入ItemData\n手动配置后重启才可使用\n自动写入ItemData可在config.yaml启用或使用强制更新临时启用一次`)
      }
      return true
    } catch (err) {
      if (!mode) {
        e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
      } else {
        console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
        let lj = "./plugins/liangshi-calc/resources/log.json"
        let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
        let y = JSON.parse(oldLog)
        y[new Date()] = { name: TextData[4], err, text: "物品更新错误" }
        let bbxzData = JSON.stringify(y, null, 2)
        fs.writeFile(lj, bbxzData, 'utf8', (err) => {
          if (err) {
            console.error('[liangshi-calc]错误内容记录失败:\n', err)
            return false
          } else {
            logger.mark('[liangshi-calc]错误内容已记录')
          }
        })
      }
      return true
    }
  }

  async WeaponNew (e, mode) {
    if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
      return false
    }
    if (!/鸣潮|明朝|潮|mc|MC/.test(e.msg)) { e.reply('不支持的功能'); return true }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, game, GamePath, ProxyUrl, data, WeaponType, bonus, WeaponData, url, apiKey, IconUrl, newValue
    let i = "zh"
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
    let counter = -1
    game = "ww"
    GamePath = "mc"
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?$/)
    try {
      let ID = TextData[4]
      if(!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的武器数据`)
      try {
        if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
          url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/weapon/${ID}`
        } else {
          url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/weapon/${ID}.json`
        }
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
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        if (ID < 21020000) {
          WeaponType = "broadblade"
        } else if (ID < 21030000) {
          WeaponType = "sword"
        } else if (ID < 21040000) {
          WeaponType = "pistols"
        } else if (ID < 21050000) {
          WeaponType = "gauntlets"
        } else if (ID < 80000000)  {
          WeaponType = "rectifier"
        } else {
          WeaponType = "projection"
        }
      }
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
        IconUrl = `${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data`
      } else {
        IconUrl = `${ProxyUrl}https://api.hakush.in/${game}/`
      }
      let WeaponName = (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) ? data.WeaponName : data.Name
      let imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/${WeaponName}`
      if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/${WeaponName}`) || /强制|强行|覆盖/.test(e.msg)) {
        if(!mode) e.reply(`[liangshi-calc]开始更新武器: ${WeaponName}`)
        fs.mkdirSync(`./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/${WeaponName}`, { recursive: true })
        logger.mark(`[liangshi-calc]武器:${WeaponName} 本地文件夹创建成功`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]武器: ${WeaponName} 已经存在，如需更新数据请使用覆盖更新。`)
        return false
      }
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        if (cfg.mcApi === 2 || cfg.mcApi === 3) {
          await this.getImg(IconUrl + data.Icon.split('.')[0] + ".png", `${imgs}/icon.webp`, "icon")
        } else {
          await this.getImg(IconUrl + data.Icon.replace(/^\/Game\/Aki\//, '').split('.')[0] + ".webp", `${imgs}/icon.webp`, "icon")
        }
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
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        let IconData, IconResponse, url, ValueKey
        try {
          if (cfg.mcApi === 2 || cfg.mcApi === 3) {
            url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`
          } else {
            url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/item.json`
          }
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
        if (data.Name?.includes("投影·") || data.WeaponName?.includes("投影·")) {
          if (cfg.mcApi === 2 || cfg.mcApi === 3) {
            WeaponData = {
              "id": Number(ID),
              "name": data.WeaponName,
              "star": data.ResonName,
              "desc": data.AttributesDescription.replace(/\n/g, ''),
              "UpdateTime": `[liangshi-calc] ${new Date()}`
            }
          } else {
            WeaponData = {
              "id": Number(ID),
              "name": data.Name,
              "star": data.Rarity,
              "desc": data.Desc.replace(/\n/g, ''),
              "UpdateTime": `[liangshi-calc] ${new Date()}`
            }
          }
        } else {
          if (cfg.mcApi === 2 || cfg.mcApi === 3) {
            WeaponData = {
              "id": Number(ID),
              "name": data.WeaponName,
              "affixTitle": data.ResonName,
              "star": data.QualityId,
              "desc": data.AttributesDescription.replace(/\n/g, ''),
              "attr": {
                "atk": {
                  "1": Number(data.Properties[0].GrowthValues[0].Value),
                  "20": Number(data.Properties[0].GrowthValues[19].Value),
                  "40": Number(data.Properties[0].GrowthValues[39].Value),
                  "50": Number(data.Properties[0].GrowthValues[49].Value),
                  "60": Number(data.Properties[0].GrowthValues[59].Value),
                  "70": Number(data.Properties[0].GrowthValues[69].Value),
                  "80": Number(data.Properties[0].GrowthValues[79].Value),
                  "90": Number(data.Properties[0].GrowthValues[89].Value),
                  "20+": Number(data.Properties[0].GrowthValues[19].Value),
                  "40+": Number(data.Properties[0].GrowthValues[39].Value),
                  "50+": Number(data.Properties[0].GrowthValues[49].Value),
                  "60+": Number(data.Properties[0].GrowthValues[59].Value),
                  "70+": Number(data.Properties[0].GrowthValues[69].Value),
                  "80+": Number(data.Properties[0].GrowthValues[79].Value)
                },
                "bonusKey": key[data.Properties[1].Name],
                "bonusData": {
                  "1": Number(data.Properties[1].GrowthValues[0].Value.replace('%', '')),
                  "20": Number(data.Properties[1].GrowthValues[19].Value.replace('%', '')),
                  "40": Number(data.Properties[1].GrowthValues[39].Value.replace('%', '')),
                  "50": Number(data.Properties[1].GrowthValues[49].Value.replace('%', '')),
                  "60": Number(data.Properties[1].GrowthValues[59].Value.replace('%', '')),
                  "70": Number(data.Properties[1].GrowthValues[69].Value.replace('%', '')),
                  "80": Number(data.Properties[1].GrowthValues[79].Value.replace('%', '')),
                  "90": Number(data.Properties[1].GrowthValues[89].Value.replace('%', '')),
                  "20+": Number(data.Properties[1].GrowthValues[19].Value.replace('%', '')),
                  "40+": Number(data.Properties[1].GrowthValues[39].Value.replace('%', '')),
                  "50+": Number(data.Properties[1].GrowthValues[49].Value.replace('%', '')),
                  "60+": Number(data.Properties[1].GrowthValues[59].Value.replace('%', '')),
                  "70+": Number(data.Properties[1].GrowthValues[69].Value.replace('%', '')),
                  "80+": Number(data.Properties[1].GrowthValues[79].Value.replace('%', ''))
                }
              },
              "materials": {
                "weapon": IconData.itemList.find(item => item.Id === (data.Breaches[4]?.Consume[0]?.Key || data.Breaches[5]?.Consume[0]?.Key))?.Name,
                "monster": IconData.itemList.find(item => item.Id === (data.Breaches[4]?.Consume[1]?.Key || data.Breaches[5]?.Consume[1]?.Key))?.Name
              },
              "affixData": {
                "text": data.Desc.replace(/<span[^>]*>(.*?)<\/span>/g, () => {counter++; return `$[${counter}]`}),
                "datas": data.DescParams.map(item => item.ArrayString)
              },
              "UpdateTime": `[liangshi-calc] ${new Date()}`
            }
          } else {
            if (["暴击", "暴击伤害", "共鸣效率"].includes(data.Stats["0"]["1"][1].Name)) {
              ValueKey = 0.01
            } else if (["生命", "防御", "攻击"].includes(data.Stats["0"]["1"][1].Name)) {
              ValueKey = 100
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
                  "1": data.Stats["0"]["1"][1].Value * ValueKey,
                  "20": data.Stats["0"]["20"][1].Value * ValueKey,
                  "40": data.Stats["1"]["40"][1].Value * ValueKey,
                  "50": data.Stats["2"]["50"][1].Value * ValueKey,
                  "60": data.Stats["3"]["60"][1].Value * ValueKey,
                  "70": data.Stats["4"]["70"][1].Value * ValueKey,
                  "80": data.Stats["5"]["80"][1].Value * ValueKey,
                  "90": data.Stats["6"]["90"][1].Value * ValueKey,
                  "20+": data.Stats["1"]["20"][1].Value * ValueKey,
                  "40+": data.Stats["2"]["40"][1].Value * ValueKey,
                  "50+": data.Stats["3"]["50"][1].Value * ValueKey,
                  "60+": data.Stats["4"]["60"][1].Value * ValueKey,
                  "70+": data.Stats["5"]["70"][1].Value * ValueKey,
                  "80+": data.Stats["6"]["80"][1].Value * ValueKey
                }
              },
              "materials": {
                "weapon": IconData[`${data.Ascensions["4"]?.[0].Key}`]?.name,
                "monster": IconData[`${data.Ascensions["4"]?.[1].Key}`]?.name
              },
              "affixData": {
                "text": data.Effect.replace(/\{(\d+)\}/g, '$[$1]'),
                "datas": data.Param
              },
              "UpdateTime": `[liangshi-calc] ${new Date()}`
            }
          }
        }
      }
      logger.mark('[liangshi-calc]数据处理完成')
      let path = `./plugins/miao-plugin/resources/meta-${GamePath}/weapon/${WeaponType}/${data.Name || data.WeaponName}/data.json`
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
        logger.mark(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据已写入`)
        if(!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName}\n数据已写入`)
      } else if (/强制|强行|覆盖/.test(e.msg)) {
        if(!mode) e.reply('[liangshi-calc]武器数据已存在，当前为强制模式，尝试覆盖写入。')
        fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
        logger.mark(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据已写入`)
        if(!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName}\n数据已写入`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]武器数据已存在，运行终止。\n如果需要刷新武器数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}武器数据`)
        console.error(`[liangshi-calc]武器：${data.Name || data.WeaponName}\n数据已存在`)
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
            if (!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
              newValue = { "id": ID, "name": data.WeaponName, "star": data.QualityName === "SR" ? 4 : 5 }
            } else {
              newValue = { "id": ID, "name": data.Name, "star": data.Rarity }
            }
            jsonData[ID] = newValue
            logger.mark(`[liangshi-calc]武器：${data.Name || data.WeaponName} 配置data.json成功`)
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
        if(!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据更新完成\n重启后即可使用相关内容`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据更新完成\n当前未启用自动写入WeaponData\n手动配置后重启才可使用\n自动写入WeaponData可在config.yaml启用或使用强制更新临时启用一次`)
      }
      return false
    } catch (err) {
      if (!mode) {
        e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
      } else {
        console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
        let lj = "./plugins/liangshi-calc/resources/log.json"
        let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
        let y = JSON.parse(oldLog)
        y[new Date()] = { name: TextData[4], err, text: "武器更新错误" }
        let bbxzData = JSON.stringify(y, null, 2)
        fs.writeFile(lj, bbxzData, 'utf8', (err) => {
          if (err) {
            console.error('[liangshi-calc]错误内容记录失败:\n', err)
            return false
          } else {
            logger.mark('[liangshi-calc]错误内容已记录')
          }
        })
      }
      return true
    }
  }

  async ArtifactNew (e, mode) {
    if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
      return false
    }
    if (!/鸣潮|明朝|潮|mc|MC/.test(e.msg)) { e.reply('不支持的功能'); return true }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, game, GamePath, ProxyUrl, data, zb, url, apiKey, p
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
    let i = /星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg) ? "cn" : "zh"
    game = "ww"
    GamePath = "mc"
    zb = "声骸"
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?$/)
    try {
      let ID = TextData[4]
      if(!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的${zb}数据`)
      try {
        p = "echo"
        if ((cfg.mcApi === 2 || cfg.mcApi === 3) && /鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
          url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/${p}/${ID}`
        } else {
          url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/${p}/${ID}.json`
        }
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
      let imgPath, imgs, imgName
      let IconUrl = `${ProxyUrl}https://api.hakush.in/${game}/`
      imgPath = ""
      imgName = data.Name || data.MonsterName
      imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/artifact${imgPath}/${imgName}`
      if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-${GamePath}/artifact${imgPath}/${imgName}`) || /强制|强行|覆盖/.test(e.msg)) {
        if(!mode) e.reply(`[liangshi-calc]开始更新${zb}: ${imgName}`)
        fs.mkdirSync(`./plugins/miao-plugin/resources/meta-${GamePath}/artifact${imgPath}/${imgName}`, { recursive: true })
        logger.mark(`[liangshi-calc]${zb}:${imgName} 本地imgs文件夹创建成功`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]${zb}: ${imgName} 已经存在，如需更新数据请使用覆盖更新。`)
        return false
      }
      if (cfg.mcApi === 2 || cfg.mcApi === 3) {
        await this.getImg(data.Icon, `${imgs}/img.webp`, "声骸")
      } else {
        await this.getImg(IconUrl + data.Icon.replace(/^\/Game\/Aki\//, '').split('.')[0] + ".webp", `${imgs}/img.webp`, "声骸")
        await this.getImg(IconUrl + data.Skill.Icon.replace(/^\/Game\/Aki\//, '').split('.')[0] + ".webp", `${imgs}/skill.webp`, "技能")
      }
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath = `./plugins/miao-plugin/resources/meta-${GamePath}/artifact/data.json`
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '{}')
          logger.mark(`[liangshi-calc]未找到data.json文件，已自动创建`)
        }
        if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
          let EchoJson, jsonNOK, yx, jx = {}
          if (cfg.mcApi === 2 || cfg.mcApi === 3) {
            if (fs.existsSync('./plugins/liangshi-calc/resources/EchoJson.json')) {
              try {
                EchoJson = fs.readFileSync('./plugins/liangshi-calc/resources/EchoJson.json','utf8')
                EchoJson = JSON.parse(EchoJson)
                logger.mark(`[liangshi-calc]声骸Json读取成功`)
              } catch (err) {
                logger.error(`[liangshi-calc]声骸Json读取失败,尝试重新获取`)
                jsonNOK = true
              }
            }
            if (!fs.existsSync('./plugins/liangshi-calc/resources/EchoJson.json') || jsonNOK) {
              let url2 = `${ProxyUrl}https://api.encore.moe/zh-Hans/echo`
              EchoJson = await fetch(url2)
              EchoJson = await EchoJson.json()
              if (mode) {
                fs.writeFile(`./plugins/liangshi-calc/resources/EchoJson.json`, JSON.stringify(EchoJson), 'utf8', (err) => {
                  if (err) {
                    logger.fatal(`[liangshi-calc]声骸Json储存失败`)
                    fs.unlink('./plugins/liangshi-calc/resources/EchoJson.json', (err) => {
                      if (!err) {
                        console.warn(`[liangshi-calc]声骸Json储存错误残留文件已清理`)
                      }
                    })
                  } else {
                    logger.fatal(`[liangshi-calc] 声骸Json已缓存至本地`)
                  }
                })
              }
            }
            EchoJson = EchoJson.Echo.reduce((acc, item) => { acc[item.Id] = { ...item }; return acc }, {})
            let i = EchoJson[data.MonsterId].FetterGroups
            let textcl = (items) => {
              return items.reduce((acc, item) => {
                let effect = item.Fetters.length === 2 ? { 2: item.Fetters[0].EffectDescription, 5: item.Fetters[1].EffectDescription } : { 3: item.Fetters[0].EffectDescription }
                acc[item.Id] = {
                  id: String(item.Id),
                  name: item.Name,
                  sets: [data.MonsterId],
                  effect: effect
                }
                return acc
              }, {})
            }
            if (fs.existsSync(filePath)) {
              yx = {}
              try {
                yx = fs.readFileSync(filePath,'utf8')
                yx = JSON.parse(yx)
                logger.mark(`[liangshi-calc]声骸data读取成功`)
              } catch (err) {
                logger.error(`[liangshi-calc]声骸data读取失败,尝试重新生成`)
              }
            } else { yx = {} }
            i = textcl(i)
            jx = { ...yx }
            for (const key in i) {
              if (yx.hasOwnProperty(key)) {
                let yxk = yx[key]
                let ik = i[key]
                let ox = { ...yxk, ...ik }
                if (yxk.sets && ik.sets) { ox.sets = [...new Set([...yxk.sets, ...ik.sets])] }
                jx[key] = ox
              } else {
                jx[key] = i[key]
              }
            }
            fs.writeFile(filePath, JSON.stringify(jx, null, 2), 'utf8', (err) => {
              if (err) {
                console.error('[liangshi-calc]自动配置data.json失败:\n', err)
              } else {
                logger.mark(`[liangshi-calc]${zb}：${imgName} 配置data.json成功`)
              }
            })
          } else {
            let z = (t, u) => {
              if (!t || !Array.isArray(u)) return t
              return t.replace(/\{(\d+)\}/g, (match, index) => {
                let h = parseInt(index, 10)
                return h >= 0 && h < u.length ? u[h] : match
              })
            }
            let n = Object.keys(data.Group)[0]
            let v = data.Group[n]
            let j = Object.keys(v.Set || {})
            let k = {}
            j.forEach(key => {
              let n = v.Set[key]
              if (n && n.Desc && Array.isArray(n.Param)) k[key] = z(n.Desc, n.Param)
            })
            fs.readFile(filePath, 'utf8', (err, TextData) => {
              if (err) {
                console.error('[liangshi-calc]读取声骸配置data.json失败:', err)
                if (!mode) e.reply(`[liangshi-calc]声骸：${imgName} 数据更新完成\n尝试自动写入ArtifactData时失败\n请手动添加后重启使用`)
                return false
              }
              try {
                let jsonData = JSON.parse(TextData)
                let setsPath = Array.isArray(jsonData[n]?.sets) ? jsonData[n].sets : []
                if (!setsPath.includes(data.Id)) setsPath.push(data.Id)
                let newValue = {
                  "id": Object.keys(data.Group)[0],
                  "name": data.Group[`${Object.keys(data.Group)[0]}`].Name,
                  "sets": setsPath,
                  "effect": k,
                  "UpdateTime": `[liangshi-calc] ${new Date()}`
                }
                jsonData[n] = newValue
                let GroupKey = Object.keys(data.Group).map(Number).map(String)
                if (GroupKey.length > 1) {
                  for (let i = 0; i < GroupKey.length - 1; i++) {
                    let currentKey = GroupKey[i + 1]
                    let SetsPath = Array.isArray(jsonData[currentKey]?.sets) ? jsonData[currentKey].sets : []
                    if (!SetsPath.includes(data.Id)) SetsPath.push(data.Id)
                    let ccb = {}
                    Object.keys(data?.Group?.[currentKey]?.Set || {}).forEach(key => {
                      let n = data?.Group[currentKey]?.Set[key]
                      if (n && n.Desc && Array.isArray(n.Param)) ccb[key] = z(n.Desc, n.Param)
                    })
                    let newValue = {
                      "id": `${data?.Group?.[currentKey]?.Id}`,
                      "name": data?.Group?.[currentKey]?.Name,
                      "sets": SetsPath,
                      "effect": ccb,
                      "UpdateTime": `[liangshi-calc] ${new Date()}`
                    }
                    jsonData[currentKey] = newValue
                  }
                }
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
          }
          let y = data.Skill.Param
          let o, datas = {}, gx = {}, cb = {}
          if (cfg.mcApi === 2 || cfg.mcApi === 3) {
            o = data.Skill.DescriptionEx.replace(/\u003Cbr\u003E/g, '').replace(/<color=[^>]>/g, '').replace(/<\/color>/g, '').replace(/<size=[^>]>/g, '').replace(/<\/size>/g, '')
            p = data.Skill.LevelDescStrArray[data.Skill.LevelDescStrArray.length - 1].ArrayString
            p.forEach((dx, oc) => { cb[dx.trim()] = oc })
            let k = Object.entries(cb).sort((a, b) => b[1] - a[1]).reverse()
            let lszw = 'liangshi', ly = o
            for (const [g, f] of k) {ly = ly.replace(new RegExp(`${g.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w%])`),`${lszw}${f}${lszw}`)}
            ly = ly.replace(new RegExp(`${lszw}(\\d+)${lszw}`, 'g'),'$[$1]').replace(new RegExp(`\\${lszw}.*\\${lszw}`, 'g'), '')
            o = ly.replace(/]%/g, ']')
            datas = data.Skill.LevelDescStrArray
            let maxLength = datas.reduce((mx, gu) => Math.max(mx, gu.ArrayString.length), 0)
            for (let i = 0; i < maxLength; i++) { gx[i] = [] }
            datas.forEach(xx => { xx.ArrayString.forEach((xn, un) => { gx[un].push(xn) }) })
            datas = gx
          } else {
            y.forEach(subArray => {
              subArray.forEach((value, index) => {
                if (!datas[index]) {
                  datas[index] = []
                }
                datas[index].push(value)
              })
            })
            o = data.Skill.Desc.replace(/\{(\d+)\}/g, (p0, p1) => { return `$[${p1}]` })
          }
          let ArtifactData = {
            "id": data.Id || data.MonsterId,
            "Name": data.Name || data.MonsterName,
            "Type": data.Type,//API2还没做
            "Intensity": data.Intensity,//API2还没做
            "Place": data.Place,//API2还没做
            "Code": data.Code || data.Handbook?.Intensity || "",
            "desc": (data.Skill.SimpleDesc || data.Skill?.SimplyDescription).replace(/\n/g, '').replace(/<size=40><color=Title>/g, '').replace(/<\/color><\/size>/g, ''),
            "Rarity": data.Rarity,//API2还没做
            "Group": Object.keys(data.Group),//API2还没做
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
            console.error(`[liangshi-calc]声骸：${imgName}\n数据已存在`)
          }
        }
        if (!mode) e.reply(`[liangshi-calc]${zb}：${imgName} 数据更新完成\n重启后即可使用相关内容`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]${zb}：${imgName} 数据更新完成\n当前未启用自动写入ArtifactData\n手动配置后重启才可使用\n自动写入ArtifactData可在config.yaml启用或使用强制更新临时启用一次`)
      }
      return false
    } catch (err) {
      if (!mode) {
        e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
      } else {
        console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
        let lj = "./plugins/liangshi-calc/resources/log.json"
        let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
        let y = JSON.parse(oldLog)
        y[new Date()] = { name: TextData[4], err, text: "装备更新错误" }
        let bbxzData = JSON.stringify(y, null, 2)
        fs.writeFile(lj, bbxzData, 'utf8', (err) => {
          if (err) {
            console.error('[liangshi-calc]错误内容记录失败:\n', err)
            return false
          } else {
            logger.mark('[liangshi-calc]错误内容已记录')
          }
        })
      }
      return true
    }
  }

  async MonsterNew (e, mode) {
    if (!e.isMaster) {
      e.reply('你不可以更新哦~(*/ω＼*)')
      return false
    }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, game, GamePath, ProxyUrl, data, MonsterData, url, apiKey, IconUrl, newValue
    let i = /星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg) ? "cn" : "zh"
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
    game = "ww"
    GamePath = "mc"
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS)(数据|资源|资源数据)?$/)
    let ID = TextData[4]
    if(!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的敌怪数据`)
    try {
      try {
        if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
          url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/monster/${ID}`
          e.reply('[liangshi-calc]此API尚未适配，请切换至API1(*/ω＼*)')
        } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
          url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/monster/${ID}.json`
        } else {
          e.reply('[liangshi-calc]不支持的游戏(*/ω＼*)')
          return false
        }
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
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
        IconUrl = `${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data`
      } else {
        IconUrl = `${ProxyUrl}https://api.hakush.in/${game}/`
      }
      if (data.Name === "") data.Name = "无名"
      let imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/monster/${data.Name}`
      if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-${GamePath}/monster/${data.Name}`) || /强制|强行|覆盖/.test(e.msg)) {
        if(!mode) e.reply(`[liangshi-calc]开始更新敌怪: ${data.Name}`)
        fs.mkdirSync(`./plugins/miao-plugin/resources/meta-${GamePath}/monster/${data.Name}`, { recursive: true })
        logger.mark(`[liangshi-calc]敌怪:${data.Name} 本地文件夹创建成功`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]敌怪: ${data.Name} 已经存在，如需更新数据请使用覆盖更新。`)
        return false
      }
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        if (cfg.mcApi === 2 || cfg.mcApi === 3) {
          await this.getImg(IconUrl + data.Icon, `${imgs}/icon.webp`, "icon")
        } else {
          await this.getImg(IconUrl + data.Icon.replace(/^\/Game\/Aki\//, '').split('.')[0] + ".webp", `${imgs}/icon.webp`, "icon")
        }
      }
      if(!mode) e.reply(`[liangshi-calc]敌怪图片资源下载完成`)
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        if (cfg.mcApi === 2 || cfg.mcApi === 3) {
          MonsterData = {}
        } else {
          let HPattr = [], DEFattr = [], ATKattr = [], HARattr = [], REGattr = []
          Object.values(data.Stats).forEach(item => {
            HPattr.push(item.Life)
            DEFattr.push(item.Atk)
            ATKattr.push(item.Def)
            HARattr.push(item.HardnessMax)
            REGattr.push(item.RageMax)
          })
          MonsterData = {
            id: data.Id,
            name: data.Name,
            desc: data.Desc,
            descAll: data.DescOpen.replace(/<color\s*=\s*(["']?)([^"'>]*?)\1\s*>(.*?)<\/\s*color\s*>/g, '$3').split('\n'),
            rarity: data.Rarity,
            element: data.Element,
            elementArray: data.ElementArray,
            echo: data.Echo,
            attr: {
              Mass: data.BaseStats.Mass,
              WeakTime: data.BaseStats.WeakTime,
              ParalysisTime: data.BaseStats.ParalysisTimeMax,
              Res: {
                PhyRes: data.BaseStats.DamageResistancePhys,
                GlaRes: data.BaseStats.DamageResistanceElement1,
                FusRes: data.BaseStats.DamageResistanceElement2,
                EleRes: data.BaseStats.DamageResistanceElement3,
                AerRes: data.BaseStats.DamageResistanceElement4,
                SpeRes: data.BaseStats.DamageResistanceElement5,
                HavRes: data.BaseStats.DamageResistanceElement6
              },
              hp: HPattr,
              def: DEFattr,
              atk: ATKattr,
              hardness: HARattr,
              rage: REGattr
            }
          }
        }
      }
      logger.mark('[liangshi-calc]数据处理完成')
      let path = `./plugins/miao-plugin/resources/meta-${GamePath}/monster/${data.Name}/data.json`
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
        logger.mark(`[liangshi-calc]敌怪：${data.Name} 数据已写入`)
        if(!mode) e.reply(`[liangshi-calc]敌怪：${data.Name}\n数据已写入`)
      } else if (/强制|强行|覆盖/.test(e.msg)) {
        if(!mode) e.reply('[liangshi-calc]敌怪数据已存在，当前为强制模式，尝试覆盖写入。')
        fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
        logger.mark(`[liangshi-calc]敌怪：${data.Name} 数据已写入`)
        if(!mode) e.reply(`[liangshi-calc]敌怪：${data.Name}\n数据已写入`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]敌怪数据已存在，运行终止。\n如果需要刷新敌怪数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}敌怪数据`)
        console.error(`[liangshi-calc]敌怪：${data.Name}\n数据已存在`)
      }
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath = `./plugins/miao-plugin/resources/meta-${GamePath}/monster/data.json`
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '{}')
          logger.mark(`[liangshi-calc]未找到data.json文件，已自动创建`)
        }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取敌怪配置data.json失败:', err)
            if (!mode) e.reply(`[liangshi-calc]敌人：${data.Name} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
              newValue = {
                "id": ID,
                "name": data.Name
              }
            } else {
              newValue = {
                "id": ID,
                "name": data.Name
              }
            }
            jsonData[ID] = newValue
            logger.mark(`[liangshi-calc]敌怪：${data.Name} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error('[liangshi-calc]敌怪data.json写入失败:\n', err)
                if (!mode) e.reply(`[liangshi-calc]敌怪：${data.Name} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
                return false
              } else {
                logger.mark('[liangshi-calc]敌怪data.json已更新')
              }
            })
          } catch (err) {
            console.error('[liangshi-calc]自动配置data.json失败:\n', err)
          }
        })
        if(!mode) e.reply(`[liangshi-calc]敌怪：${data.Name} 数据更新完成\n重启后即可使用相关内容`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]敌怪：${data.Name} 数据更新完成\n当前未启用自动写入MonsterData\n手动配置后重启才可使用\n自动写入MonsterData可在config.yaml启用或使用强制更新临时启用一次`)
      }
      return false
    } catch (err) {
      if (!mode) {
        e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
      } else {
        console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
        let lj = "./plugins/liangshi-calc/resources/log.json"
        let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
        let y = JSON.parse(oldLog)
        y[new Date()] = { name: TextData[4], err, text: "武器更新错误" }
        let bbxzData = JSON.stringify(y, null, 2)
        fs.writeFile(lj, bbxzData, 'utf8', (err) => {
          if (err) {
            console.error('[liangshi-calc]错误内容记录失败:\n', err)
            return false
          } else {
            logger.mark('[liangshi-calc]错误内容已记录')
          }
        })
      }
      return true
    }
  }

  async VerNew (e) {
    let cfg = LSconfig.getConfig('user', 'config')
    let url, character, response, game, GameName, ProxyUrl, version, artifact, data, CharacterName, ArtifactName, weapon, WeaponName
    if (!/鸣潮|明朝|潮|mc|MC/.test(e.msg)) { e.reply('不支持的功能'); return true }
    game = "ww"
    GameName = "鸣潮"
    if (cfg.ProxyUrl) {
      ProxyUrl = cfg.ProxyUrl
    } else {
      ProxyUrl = ""
    }
    try {
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && cfg.mcApi === 2) {
        url = `${ProxyUrl}https://api.encore.moe/zh-Hans/new`
      } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && cfg.mcApi === 3) {
        url = `${ProxyUrl}https://api-v2.encore.moe/zh-Hans/new`
      } else {
        url = `${ProxyUrl}https://api.hakush.in/${game}/new.json`
      }
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
    if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
      if (cfg.mcApi === 2 || cfg.mcApi === 3) {
        version = data[0].ResVer
        character = data[1].character.length > 0 ? data[1].character : "本次无此内容更新"
        weapon = data[1].weapon.length > 0 ? data[1].weapon : "本次无此内容更新"
        artifact = data[1].echo.length > 0 ? data[1].echo : "本次无此内容更新"
      } else {
        version = data.hotfix
        character = data.character.length > 0 ? data.character : "本次无此内容更新"
        weapon = data.weapon.length > 0 ? data.weapon : "本次无此内容更新"
        artifact = data.echo.length > 0 ? data.echo : "本次无此内容更新"
      }
      CharacterName = "共鸣者"
      ArtifactName = "声骸"
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
    if (!/鸣潮|明朝|潮|mc|MC/.test(e.msg)) { e.reply('不支持的功能'); return true }
    let cfg = LSconfig.getConfig('user', 'config')
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)角色(数据|资源|资源数据)?$/)
    let CharacterId = TextData[4]
    try {
      if ((/^\d{4}$/.test(CharacterId) || /强制|强行|覆盖/.test(e.msg))) {
        logger.mark(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
        if(!mode) e.reply(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
      } else {
        let CharacterIdUrl, GameName
        if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
          CharacterIdUrl = "https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-mc/README.md"
          GameName = "鸣潮"
        } else {
          CharacterIdUrl = undefined
          GameName = undefined
        }
        console.error(`[liangshi-calc]未知的角色ID:${CharacterId}`)
        if(!mode) e.reply('[liangshi-calc]角色ID错误，请检查角色ID格式(4位数字)')
        if(!mode) e.reply(`[liangshi-calc]角色ID可在${CharacterIdUrl}内对照 (新版本角色ID可使用 #梁氏检查${GameName}更新 查看)`)
        return false
      }
      let data, game, GamePath
      let i = "zh"
      game = "ww"
      GamePath = "mc"
      let response, ProxyUrl, apiKey, CharacterData, ItemText, url
      if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
      if (cfg.ProxyUrl) {
        ProxyUrl = cfg.ProxyUrl
      } else {
        ProxyUrl = ""
      }
      try {
        if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
          url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/character/${CharacterId}`
        } else {
          url = `${ProxyUrl}https://api.hakush.in/${game}/data/${i}/character/${CharacterId}.json`
        }
        response = await fetch(url)
        if (!response.ok) {
          console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
          return false
        }
        data = await response.json()
        logger.mark(`[liangshi-calc]角色：${data.Name.Content || data.Name} 云端数据读取成功`)
      } catch (err) {
        console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
        if (response.status === 404) {
          if(!mode) e.reply('[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新')
          if(!mode) e.reply('数据更新时间(预估)\n鸣潮：版本更新后14天18：00~次日6：00左右')
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
      let CharacterName = data.Name.Content || data.Name
      let Qkey = 2
      let icons = `./plugins/miao-plugin/resources/meta-${GamePath}/character/${CharacterName}/icons`
      let imgs = `./plugins/miao-plugin/resources/meta-${GamePath}/character/${CharacterName}/imgs`
      if (!fs.existsSync(icons)) {
        fs.mkdirSync(icons, { recursive: true })
        logger.mark(`[liangshi-calc]角色：${data.Name} 本地icons文件夹创建成功`)
      }
      if (!fs.existsSync(imgs)) {
        fs.mkdirSync(imgs, { recursive: true })
        logger.mark(`[liangshi-calc]角色：${data.Name} 本地imgs文件夹创建成功`)
      }
      let ConsTalent = { a: 0, e: 0, q: 0 }
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
        ItemText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`)
      } else {
        ItemText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/zh/item.json`)
      }
      let ItemNamedata = await ItemText.json()
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) ItemNamedata = ItemNamedata.itemList.reduce((acc, item) => {acc[item.Id] = item;return acc}, {})
      let elemKey = {
        "1": "glacio",
        "冷凝": "glacio",
        "2": "fusion",
        "热熔": "fusion",
        "3": "electro",
        "导电": "electro",
        "4": "aero",
        "气动": "aero",
        "5": "spectrp",
        "衍射": "spectrp",
        "6": "havoc",
        "湮灭": "havoc"
      }
      let weaponKey = {
        "1": "broadblade",
        "2": "sword",
        "3": "pistols",
        "4": "gauntlets",
        "5": "rectifier",
        "Mage": "智识",
        "Knight": "存护",
        "Rogue": "巡猎",
        "Warlock": "虚无",
        "Warrior": "毁灭",
        "Shaman": "同协",
        "Priest": "丰饶",
        "Memory": "记忆"
      }
      let damageKey = {
        "Wind": "风",
        "Fire": "火",
        "Ice": "冰",
        "Thunder": "雷",
        "Quantum": "量子",
        "Imaginary": "虚数",
        "Physical": "物理"
      }
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        if (cfg.mcApi === 2 || cfg.mcApi === 3) {
          CharacterData = {
            "id": data.Id,
            "name": data.Name.Content || "无名",
            "abbr": data.Name.Content || "",
            "title": data.favorRole.TalentName.Content,
            "star": data.QualityId,
            "elem": elemKey[`${data.ElementName}`],
            "allegiance": data.favorRole.Country.Content,
            "weapon": weaponKey[`${data.WeaponType}`],
            "birth": data.favorRole.Birthday.Content,
            "desc": data.favorRole.Info.Content.replace(/<a[^>]*>(.*?)<\/a>/g, '$1').replace(/\n/g, '').replace(/<te href=\d+>|<\/te>/g, '').replace('<br>', ''),
            "cncv": data.favorRole.CVNameCn.Content,
            "jpcv": data.favorRole.CVNameJp.Content,
            "costume": false,
            "ver": 1,
            "baseAttr": {
              "hp": data.Properties[0].GrowthValues[95].value,
              "atk": data.Properties[1].GrowthValues[95].value,
              "def": data.Properties[2].GrowthValues[95].value
            },
            "Weakness": {
              "ratio": 100,
              "mastery": 0
            },
            "materials": {
              "boss": ItemNamedata?.[`${data.Breaches[5].Items[0].Key}`]?.name || ItemNamedata?.[`${data.Breaches[5].Items[0].Key}`]?.Name || data.Breaches[5].Items[0].Key,
              "specialty": ItemNamedata?.[`${data.Breaches[5].Items[1].Key}`]?.name || ItemNamedata?.[`${data.Breaches[5].Items[1].Key}`]?.Name || data.Breaches[5].Items[1].Key,
              "normal": ItemNamedata?.[`${data.Breaches[6].Items[2]?.Key}`]?.name || ItemNamedata?.[`${data.Breaches[6].Items[2]?.Key}`]?.Name || ItemNamedata?.[`${data.Breaches[5].Items[2].Key}`]?.name || ItemNamedata?.[`${data.Breaches[5].Items[2].Key}`]?.Name || data.Breaches[5].Items[2].Key,
              "talent": ItemNamedata?.[`${data.Skills[0]?.Consumes[8].Consume[0].Key}`]?.name || ItemNamedata?.[`${data.Skills[0]?.Consumes[8].Consume[0].Key}`]?.Name || data.Skills[0]?.Consumes[8].Consume[0].Key,
              "weekly": ItemNamedata?.[`${data.Skills[0]?.Consumes[8].Consume[2].Key}`]?.name || ItemNamedata?.[`${data.Skills[0]?.Consumes[8].Consume[2].Key}`]?.Name || data.Skills[0]?.Consumes[8].Consume[2].Key
            },
            "talent": {
              "a": {
                "name": data.Skills[0]?.SkillName,
                "desc": data.Skills[0].SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '').map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}),
                "tables": data.Skills[0].SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
              },
              "e": {
                "name": data.Skills[1]?.SkillName,
                "desc": data.Skills[1]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '').map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}),
                "tables": data.Skills[1]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
              },
              "q": {
                "name": data.Skills[2]?.SkillName,
                "desc": data.Skills[2]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '').map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}),
                "tables": data.Skills[2]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
              },
              "t": {
                "name": data.Skills[6]?.SkillName,
                "desc": data.Skills[6]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '').map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}),
                "tables": data.Skills[6]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
              },
              "i": {
                "name": data.Skills[5]?.SkillName,
                "desc": data.Skills[5]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '').map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}),
                "tables": data.Skills[5]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
              },
              "o": {
                "name": data.Skills[8]?.SkillName,
                "desc": data.Skills[8]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '').map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}),
                "tables": data.Skills[8]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
              }
            },
            "talentData": {
              "a": await this.mcTalName(data.Skills[0]?.SkillAttributes),
              "e": await this.mcTalName(data.Skills[1]?.SkillAttributes),
              "q": await this.mcTalName(data.Skills[2]?.SkillAttributes),
              "t": await this.mcTalName(data.Skills[6]?.SkillAttributes),
              "i": await this.mcTalName(data.Skills[5]?.SkillAttributes),
              "o": await this.mcTalName(data.Skills[8]?.SkillAttributes),
            },
            "cons": {
              "1": {
                "name": data.ResonantChain[0]?.NodeName,
                "desc": data.ResonantChain[0]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '')
              },
              "2": {
                "name": data.ResonantChain[1]?.NodeName,
                "desc": data.ResonantChain[1]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '')
              },
              "3": {
                "name": data.ResonantChain[2]?.NodeName,
                "desc": data.ResonantChain[2]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '')
              },
              "4": {
                "name": data.ResonantChain[3]?.NodeName,
                "desc": data.ResonantChain[3]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '')
              },
              "5": {
                "name": data.ResonantChain[4]?.NodeName,
                "desc": data.ResonantChain[4]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '')
              },
              "6": {
                "name": data.ResonantChain[5]?.NodeName,
                "desc": data.ResonantChain[5]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '')
              }
            },
            "passive": [
              {
                "name": data.Skills[3]?.SkillName,
                "desc":  data.Skills[3]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '').map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')})
              },
              {
                "name": data.Skills[4]?.SkillName,
                "desc":  data.Skills[4]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).filter(item => item !== '').map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')})
              }
            ],
            "attr": {
              "tree": {
                "1": {
                  "name": data.SkillTree[0]?.PropertyNodeDescribe,
                  "key": data.SkillTree[0]?.PropertyNodeTitle,
                  "value": parseFloat(data.SkillTree[0]?.PropertyNodeDescribe.match(/\d+\.?\d*/))
                },
                "2": {
                  "name": data.SkillTree[1]?.PropertyNodeDescribe,
                  "key": data.SkillTree[1]?.PropertyNodeTitle,
                  "value": parseFloat(data.SkillTree[1]?.PropertyNodeDescribe.match(/\d+\.?\d*/))
                },
                "3": {
                  "name": data.SkillTree[2]?.PropertyNodeDescribe,
                  "key": data.SkillTree[2]?.PropertyNodeTitle,
                  "value": parseFloat(data.SkillTree[2]?.PropertyNodeDescribe.match(/\d+\.?\d*/))
                },
                "4": {
                  "name": data.SkillTree[3]?.PropertyNodeDescribe,
                  "key": data.SkillTree[3]?.PropertyNodeTitle,
                  "value": parseFloat(data.SkillTree[3]?.PropertyNodeDescribe.match(/\d+\.?\d*/))
                },
                "5": {
                  "name": data.SkillTree[4]?.PropertyNodeDescribe,
                  "key": data.SkillTree[4]?.PropertyNodeTitle,
                  "value": parseFloat(data.SkillTree[4]?.PropertyNodeDescribe.match(/\d+\.?\d*/))
                },
                "6": {
                  "name": data.SkillTree[5]?.PropertyNodeDescribe,
                  "key": data.SkillTree[5]?.PropertyNodeTitle,
                  "value": parseFloat(data.SkillTree[5]?.PropertyNodeDescribe.match(/\d+\.?\d*/))
                },
                "7": {
                  "name": data.SkillTree[6]?.PropertyNodeDescribe,
                  "key": data.SkillTree[6]?.PropertyNodeTitle,
                  "value": parseFloat(data.SkillTree[6]?.PropertyNodeDescribe.match(/\d+\.?\d*/))
                },
                "8": {
                  "name": data.SkillTree[7]?.PropertyNodeDescribe,
                  "key": data.SkillTree[7]?.PropertyNodeTitle,
                  "value": parseFloat(data.SkillTree[7]?.PropertyNodeDescribe.match(/\d+\.?\d*/))
                }
              },
              "details": {
                "1": [
                  data.Properties[0].GrowthValues[0].value,
                  data.Properties[1].GrowthValues[0].value,
                  data.Properties[2].GrowthValues[0].value
                ],
                "20": [
                  data.Properties[0].GrowthValues[19].value,
                  data.Properties[1].GrowthValues[19].value,
                  data.Properties[2].GrowthValues[19].value
                ],
                "40": [
                  data.Properties[0].GrowthValues[40].value,
                  data.Properties[1].GrowthValues[40].value,
                  data.Properties[2].GrowthValues[40].value
                ],
                "50": [
                  data.Properties[0].GrowthValues[51].value,
                  data.Properties[1].GrowthValues[51].value,
                  data.Properties[2].GrowthValues[51].value
                ],
                "60": [
                  data.Properties[0].GrowthValues[62].value,
                  data.Properties[1].GrowthValues[62].value,
                  data.Properties[2].GrowthValues[62].value
                ],
                "70": [
                  data.Properties[0].GrowthValues[73].value,
                  data.Properties[1].GrowthValues[73].value,
                  data.Properties[2].GrowthValues[73].value
                ],
                "80": [
                  data.Properties[0].GrowthValues[84].value,
                  data.Properties[1].GrowthValues[84].value,
                  data.Properties[2].GrowthValues[84].value
                ],
                "90": [
                  data.Properties[0].GrowthValues[95].value,
                  data.Properties[1].GrowthValues[95].value,
                  data.Properties[2].GrowthValues[95].value
                ],
                "20+": [
                  data.Properties[0].GrowthValues[20].value,
                  data.Properties[1].GrowthValues[20].value,
                  data.Properties[2].GrowthValues[20].value
                ],
                "40+": [
                  data.Properties[0].GrowthValues[41].value,
                  data.Properties[1].GrowthValues[41].value,
                  data.Properties[2].GrowthValues[41].value
                ],
                "50+": [
                  data.Properties[0].GrowthValues[52].value,
                  data.Properties[1].GrowthValues[52].value,
                  data.Properties[2].GrowthValues[52].value
                ],
                "60+": [
                  data.Properties[0].GrowthValues[63].value,
                  data.Properties[1].GrowthValues[63].value,
                  data.Properties[2].GrowthValues[63].value
                ],
                "70+": [
                  data.Properties[0].GrowthValues[74].value,
                  data.Properties[1].GrowthValues[74].value,
                  data.Properties[2].GrowthValues[74].value
                ],
                "80+": [
                  data.Properties[0].GrowthValues[85].value,
                  data.Properties[1].GrowthValues[85].value,
                  data.Properties[2].GrowthValues[85].value
                ]
              }
            },
            "UpdateTime": `[liangshi-calc] ${new Date()}`
          }
        } else {
          CharacterData = {
            "id": data.Id,
            "name": data.Name || "无名",
            "abbr": data.Name || "",
            "title": data.CharaInfo.TalentName,
            "star": data.Rarity,
            "elem": elemKey[`${data.Element}`],
            "allegiance": data.CharaInfo.Country,
            "weapon": weaponKey[`${data.Weapon}`],
            "birth": data.CharaInfo.Birth,
            "desc": data.CharaInfo.Info.replace(/<te href=\d+>|<\/te>/g, '').replace(/<a[^>]*>(.*?)<\/a>/g, '$1').replace(/\n/g, ''),
            "cncv": data.CharaInfo.CVNameCn,
            "jpcv": data.CharaInfo.CVNameJp,
            "costume": false,
            "tag": {
              keys: Object.keys(data.Tag),
              name: Object.values(data.Tag).map(ccb => ccb.Name)
            },
            "Features": data.ForteNew?.Features,
            "ver": 1,
            "baseAttr": {
              "hp": data.Stats["6"]["90"].Life,
              "atk": data.Stats["6"]["90"].Atk,
              "def": data.Stats["6"]["90"].Def
            },
            "Weakness": {
              "ratio": data.StatsWeakness?.BreakWeaknessRatio,
              "mastery": data.StatsWeakness?.WeaknessMastery
            },
            "materials": {
              "boss": ItemNamedata?.[`${data.Ascensions["6"][0].Key}`]?.name || data.Ascensions["6"][0].Key,
              "specialty": ItemNamedata?.[`${data.Ascensions["6"][1].Key}`]?.name || data.Ascensions["6"][1].Key,
              "normal": ItemNamedata?.[`${data.Ascensions["6"][2].Key}`]?.name || data.Ascensions["6"][2].Key,
              "talent": ItemNamedata?.[`${data.SkillTrees["1"].Skill.Consume["10"][0].Key}`]?.name || data.SkillTrees["1"].Skill.Consume["10"][0].Key,
              "weekly": ItemNamedata?.[`${data.SkillTrees["1"].Skill.Consume["10"][2].Key}`]?.name || data.SkillTrees["1"].Skill.Consume["10"][2].Key
            },
            "talent": {
              "a": {
                "name": data.SkillTrees["1"].Skill.Name,
                "desc": data.SkillTrees["1"].Skill.Desc.replace(/<a\s+href=([^>]*)>/g, '$1').replace(/<te href=\d+>|<\/te>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["1"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
                "tables": Object.values(data.SkillTrees["1"].Skill.Level).sort((a, b) => a.id - b.id).map(i => { const {Format, Param, ...rest} = i; const paramValues = [...Param[0]]; const isSame = paramValues.every(p => p === paramValues[0]); const result = { id: rest.id, ...Object.fromEntries( Object.entries(rest).filter(([key]) => key !== "id").map(([key, val]) => [key === "Name" ? "name" : key, val])), isSame, values: paramValues }; if (Format?.includes("{0}")) result.values = paramValues.map(p => `${p}${Format.replace("{0}", "").trim()}`); return result})
              },
              "e": {
                "name": data.SkillTrees["2"].Skill.Name,
                "desc": data.SkillTrees["2"].Skill.Desc.replace(/<a\s+href=([^>]*)>/g, '$1').replace(/<te href=\d+>|<\/te>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["2"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
                "tables": Object.values(data.SkillTrees["2"].Skill.Level).sort((a, b) => a.id - b.id).map(i => { const {Format, Param, ...rest} = i; const paramValues = [...Param[0]]; const isSame = paramValues.every(p => p === paramValues[0]); const result = { id: rest.id, ...Object.fromEntries( Object.entries(rest).filter(([key]) => key !== "id").map(([key, val]) => [key === "Name" ? "name" : key, val])), isSame, values: paramValues }; if (Format?.includes("{0}")) result.values = paramValues.map(p => `${p}${Format.replace("{0}", "").trim()}`); return result})
              },
              "q": {
                "name": data.SkillTrees["3"].Skill.Name,
                "desc": data.SkillTrees["3"].Skill.Desc.replace(/<a\s+href=([^>]*)>/g, '$1').replace(/<te href=\d+>|<\/te>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["3"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
                "tables": Object.values(data.SkillTrees["3"].Skill.Level).sort((a, b) => a.id - b.id).map(i => { const {Format, Param, ...rest} = i; const paramValues = [...Param[0]]; const isSame = paramValues.every(p => p === paramValues[0]); const result = { id: rest.id, ...Object.fromEntries( Object.entries(rest).filter(([key]) => key !== "id").map(([key, val]) => [key === "Name" ? "name" : key, val])), isSame, values: paramValues }; if (Format?.includes("{0}")) result.values = paramValues.map(p => `${p}${Format.replace("{0}", "").trim()}`); return result})
              },
              "t": {
                "name": data.SkillTrees["7"].Skill.Name,
                "desc": data.SkillTrees["7"].Skill.Desc.replace(/<a\s+href=([^>]*)>/g, '$1').replace(/<te href=\d+>|<\/te>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["7"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
                "tables": Object.values(data.SkillTrees["7"].Skill.Level).sort((a, b) => a.id - b.id).map(i => { const {Format, Param, ...rest} = i; const paramValues = [...Param[0]]; const isSame = paramValues.every(p => p === paramValues[0]); const result = { id: rest.id, ...Object.fromEntries( Object.entries(rest).filter(([key]) => key !== "id").map(([key, val]) => [key === "Name" ? "name" : key, val])), isSame, values: paramValues }; if (Format?.includes("{0}")) result.values = paramValues.map(p => `${p}${Format.replace("{0}", "").trim()}`); return result})
              },
              "i": {
                "name": data.SkillTrees["6"].Skill.Name,
                "desc": data.SkillTrees["6"].Skill.Desc.replace(/<a\s+href=([^>]*)>/g, '$1').replace(/<te href=\d+>|<\/te>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["6"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
                "tables": Object.values(data.SkillTrees["6"].Skill.Level).sort((a, b) => a.id - b.id).map(i => { const {Format, Param, ...rest} = i; const paramValues = [...Param[0]]; const isSame = paramValues.every(p => p === paramValues[0]); const result = { id: rest.id, ...Object.fromEntries( Object.entries(rest).filter(([key]) => key !== "id").map(([key, val]) => [key === "Name" ? "name" : key, val])), isSame, values: paramValues }; if (Format?.includes("{0}")) result.values = paramValues.map(p => `${p}${Format.replace("{0}", "").trim()}`); return result})
              },
              "o": {
                "name": data.SkillTrees["8"].Skill.Name,
                "desc": data.SkillTrees["8"].Skill.Desc.replace(/<a\s+href=([^>]*)>/g, '$1').replace(/<te href=\d+>|<\/te>/g, '').replace(/\{(\d+)\}/g, (m, i) => data.SkillTrees["8"].Skill.Param[i] || m).replace(/<a[^>]*>([^<]+)<\/a>/g, '$1').replace(/\u003Csize=40\u003E\u003Ccolor=Title\u003E(.*?)\u003C\/color\u003E\u003C\/size\u003E/g, '<h3>$1</h3>').replace(/\u003C\/?[a-zA-Z]+(=[a-zA-Z0-9]+)?\u003E/g, '').split('\n').filter(line => line.trim() !== ''),
                "tables": Object.values(data.SkillTrees["8"].Skill.Level).sort((a, b) => a.id - b.id).map(i => { const {Format, Param, ...rest} = i; const paramValues = [...Param[0]]; const isSame = paramValues.every(p => p === paramValues[0]); const result = { id: rest.id, ...Object.fromEntries( Object.entries(rest).filter(([key]) => key !== "id").map(([key, val]) => [key === "Name" ? "name" : key, val])), isSame, values: paramValues }; if (Format?.includes("{0}")) result.values = paramValues.map(p => `${p}${Format.replace("{0}", "").trim()}`); return result})
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
        }
      }
      if (Qkey === 3) {
        CharacterData.talentId[data.Skills[2].Id] = "t"
        CharacterData.talent["t"] = {
          "id": data.Skills[2].Id,
          "name": data.Skills[2].Name,
          "desc": data.Skills[2].Desc.split(/\\n/).map(l=>(l=l.trim(),/^<color=#[^>]+>[^<]+<\/color>$/.test(l)?l.replace(/<color=#[^>]+>(.*?)<\/color>/,'<h3>$1</h3>'):/^<color=[^>]+>[^<]+<\/color>$/.test(l)?'':l.replace(/<color=#FFD780FF>(.*?)<\/color>/g,'$1').replace(/<color=[^>]+>(.*?)<\/color>/g,'$1'))).map(l=>l.replace(/{LINK#S\d+}/g,'').replace(/{LINK#N\d+}/g,'').replace(/{\/LINK}/g,'')).filter(l=>l.length>0),
          "tables": await this.convertPromoteToTables(data.Skills[2].Promote)
        }
        CharacterData.talentData["t"] = await this.TalentPromote(data.Skills[2])
      }
      logger.mark('[liangshi-calc]数据处理完成')
      let path = `./plugins/miao-plugin/resources/meta-${GamePath}/character/${CharacterName}/data.json`
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(CharacterData, null, 2), 'utf8')
        logger.mark(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
        if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据已写入`)
      } else if (/强制|强行|覆盖/.test(e.msg)) {
        if(!mode) e.reply('[liangshi-calc]角色数据已存在，当前为强制模式，尝试覆盖写入。')
        fs.writeFileSync(path, JSON.stringify(CharacterData, null, 2), 'utf8')
        logger.mark(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
        if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据已写入`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]角色数据已存在，运行终止。\n如果需要刷新角色数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${GamePath}${CharacterId}数据`)
        console.error(`[liangshi-calc]角色：${CharacterName}\n数据已存在`)
      }
      if(!mode) e.reply(`[liangshi-calc]角色数据资源下载完成`)
      logger.mark(`[liangshi-calc]开始下载角色图片资源`)
      let IconUrl = `${ProxyUrl}https://api.hakush.in/${game}/`
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        if(cfg.mcApi === 2 || cfg.mcApi === 3) {
          await this.getImg(data.RolePortrait, `${imgs}/splash.webp`, "立绘")
          await this.getImg(data.FormationRoleCard, `${imgs}/face.webp`, "大头")
          await this.getImg(data.RoleHeadIconBig, `${imgs}/side.webp`, "侧头")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.Skills[3]?.Icon.split('.')[0] + ".png", `${icons}/passive-0.webp`, "固有天赋1")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.Skills[4]?.Icon.split('.')[0] + ".png", `${icons}/passive-1.webp`, "固有天赋2")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.Skills[1]?.Icon.split('.')[0] + ".png", `${icons}/talent-e.webp`, "共鸣技能")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.Skills[2]?.Icon.split('.')[0] + ".png", `${icons}/talent-q.webp`, "共鸣解放")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.Skills[5]?.Icon.split('.')[0] + ".png", `${icons}/talent-i.webp`, "变奏技能")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.Skills[8]?.Icon.split('.')[0] + ".png", `${icons}/talent-o.webp`, "延奏技能")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.Skills[6]?.Icon.split('.')[0] + ".png", `${icons}/talent-t.webp`, "共鸣回路")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[0]?.NodeIcon, `${icons}/cons-1.webp`, "1链")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[1]?.NodeIcon, `${icons}/cons-2.webp`, "2链")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[2]?.NodeIcon, `${icons}/cons-3.webp`, "3链")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[3]?.NodeIcon, `${icons}/cons-4.webp`, "4链")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[4]?.NodeIcon, `${icons}/cons-5.webp`, "5链")
          await this.getImg(`https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[5]?.NodeIcon, `${icons}/cons-6.webp`, "6链")
        } else {
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
        }
      }
      if(!mode) e.reply(`[liangshi-calc]角色图片资源下载完成`)
      logger.mark(`[liangshi-calc]图片资源下载完成`)
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath, newValue
        if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
          filePath = "./plugins/miao-plugin/resources/meta-mc/character/data.json"
          if (!fs.existsSync(filePath)) {
            logger.mark('[liangshi-calc]找不到文件data.json，请检查mian-waves配置')
            fs.writeFileSync(filePath, '{}')
          }
          fs.readFile(filePath, 'utf8', (err, TextData) => {
            if (err) {
              console.error('[liangshi-calc]读取角色配置data.json失败:\n', err)
              if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
              if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
              return false
            }
            try {
              let jsonData = JSON.parse(TextData)
              if (/鸣潮|明朝|潮|mc|MC/.test(e.msg) && (cfg.mcApi === 2 || cfg.mcApi === 3)) {
                newValue = {
                  "id": data.Id,
                  "name": data.Name.Content || "无名",
                  "abbr": data.Name.Content || "",
                  "star": data.QualityId,
                  "elem": elemKey[`${data.ElementName}`],
                  "weapon": weaponKey[`${data.WeaponType}`]
                }
              } else {
                newValue = {
                  "id": data.Id,
                  "name": CharacterName,
                  "abbr": CharacterName.length >= 5 ? CharacterName.slice(-2) : CharacterName,
                  "star": data.Rarity,
                  "elem": elemKey[`${data.Element}`],
                  "weapon": weaponKey[`${data.Weapon}`]
                }
              }
              jsonData[CharacterId] = newValue
              logger.mark(`[liangshi-calc]角色${CharacterId} 配置data.json成功`)
              const updatedData = JSON.stringify(jsonData, null, 2)
              fs.writeFile(filePath, updatedData, 'utf8', (err) => {
                if (err) {
                  console.error('[liangshi-calc]角色data.json写入失败:\n', err)
                  if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
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
        if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n重启后即可使用${CharacterName}相关内容`)
        if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
      } else {
        if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n当前未启用自动写入CharacterData\n手动配置后重启才可使用\n自动写入CharacterData可在config.yaml启用或使用强制更新临时启用一次`)
        if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
      }
      return true
    } catch (err) {
      if (!mode) {
        e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
      } else {
        console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}角色数据 进行手动更新\n${err}`)
        let lj = "./plugins/liangshi-calc/resources/log.json"
        let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
        let y = JSON.parse(oldLog)
        y[new Date()] = { name: TextData[4], err, text: "角色更新错误" }
        let bbxzData = JSON.stringify(y, null, 2)
        fs.writeFile(lj, bbxzData, 'utf8', (err) => {
          if (err) {
            console.error('[liangshi-calc]错误内容记录失败:\n', err)
            return false
          } else {
            logger.mark('[liangshi-calc]错误内容已记录')
          }
        })
      }
      return true
    }
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
              multiplier: multiplier || null,
              originalTemplates: []
            }
          }
          descMap[name].originalTemplates.push(descPart)
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
                  paramStr.includes("+") ? "+" :
                      paramStr.includes("到") ? "到" : null
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
      let unit = ""
      let unitName = ""
      const sampleTemplate = type.originalTemplates[0] || ''
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
          let value = type.name
          if (type.paramParts.length === 0) {
            values.push(value)
            continue
          }
          let processedTemplate = sampleTemplate
          for (const paramPart of type.paramParts) {
            if (paramPart.type === "simple") {
              const { index, format } = paramPart
              if (index >= data.Param.length) {
                value = false
                break
              }
              const paramValue = await this.formatParam(data.Param[index], format, true)
              const paramRegex = new RegExp(`{param${index + 1}:[^}]+}`, 'g')
              processedTemplate = processedTemplate.replace(paramRegex, paramValue)
            } else if (paramPart.type === "compound") {
              const formattedParts = await Promise.all(
                paramPart.parts.map(async (part) => {
                  if (part.index >= data.Param.length) {
                    return false
                  }
                  return await this.formatParam(data.Param[part.index], part.format, true)
                })
              )
              const paramRegex = new RegExp(`{param${paramPart.parts[0].index + 1}:[^}]+}`, 'g')
              processedTemplate = processedTemplate.replace(paramRegex, formattedParts[0])
              if (formattedParts.length > 1) {
                let replaceMap = new Map()
                paramPart.parts.forEach((part, idx) => {
                  let regex = new RegExp(`\\{param${part.index + 1}:[^}]+\\}`)
                  replaceMap.set(regex, formattedParts[idx])
                })
                let currentTemplate = processedTemplate
                replaceMap.forEach((value, regex) => { currentTemplate = currentTemplate.replace(regex, value) })
                processedTemplate = currentTemplate
              }
            }
          }
          processedTemplate = processedTemplate.replace(/{param\d+:[^}]+}/g, '').replace(/{param\d+}/g, '').split('|').pop()
          if (processedTemplate.endsWith('/') || processedTemplate.endsWith('+')) {
            processedTemplate = processedTemplate.slice(0, -1)
          }
          processedTemplate = processedTemplate.replace(/([+\/])/g, " $1 ")
          unitName = sampleTemplate.split('|').pop().replace(/{param\d+:[^}]+}/g, '').replace(/{param\d+}/g, '')
          // miao-plugin原版对于混合倍率(100%攻击力+100%元素精通)显示方式为：抬头显示元素精通，倍率显示”100%攻击力+100%“
          // 此处优化显示为”100%攻击力+100%元素精通“，如需还原为miao-plugin原版显示方式只需将下方(![XXXX].some(key => processedTemplate.includes(key))改为true即可
          // 如需改为特殊优化版【抬头显示”攻击力+元素精通“，倍率显示”100%+100%“】，将unitConfig改为true即可
          let unitConfig = false
          if (!unitConfig) {
            if (processedTemplate.endsWith('元素精通') && !['生命值上限', '防御力', '攻击力'].some(key => processedTemplate.includes(key))) {
              processedTemplate = processedTemplate.slice(0, -4)
              unit = "元素精通"
            } else if (processedTemplate.endsWith('生命值上限') && !['元素精通', '防御力', '攻击力'].some(key => processedTemplate.includes(key))) {
              processedTemplate = processedTemplate.slice(0, -5)
              unit = "生命值上限"
            } else if (processedTemplate.endsWith('防御力') && !['元素精通', '生命值上限', '攻击力'].some(key => processedTemplate.includes(key))) {
              processedTemplate = processedTemplate.slice(0, -3)
              unit = "防御力"
            }
          } else {
            if (unitName.includes("+") || unitName.includes("/")) {
              unit = unitName
              processedTemplate = processedTemplate.replace(/生命值上限|防御力|攻击力|元素精通/g, '')

            } else {
              if (processedTemplate.endsWith('元素精通')) {
                processedTemplate = processedTemplate.slice(0, -4)
                unit = "元素精通"
              } else if (processedTemplate.endsWith('生命值上限')) {
                processedTemplate = processedTemplate.slice(0, -5)
                unit = "生命值上限"
              } else if (processedTemplate.endsWith('防御力')) {
                processedTemplate = processedTemplate.slice(0, -3)
                unit = "防御力"
              }
            }
          }
          if (processedTemplate.endsWith('每点元素能量')) {
            processedTemplate = processedTemplate.slice(0, -6)
            unit = "每点元素能量"
          }
          value = processedTemplate
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
        unit,
        isSame: values.length > 1 && values.every(v => v === values[0]),
        values,
      })
    }
    return tables
  }

  async formatParam(value, format, skipUnit = false) {
    try {
      const num = parseFloat(value)
      if (isNaN(num)) return value.toString()
      switch (format) {
        case "F2P":
        case "F1P": return `${parseFloat((num * 100).toFixed(2))}%`
        case "P": return `${parseFloat((num * 100).toFixed(2))}%`
        case "I": return skipUnit ? `${parseFloat(num.toFixed(2))}` : `${parseFloat(num.toFixed(2))}点`
        case "F1": return skipUnit ? `${parseFloat(num.toFixed(1))}` : `${parseFloat(num.toFixed(1))}点`
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
          currentLevelValues[name + "2"] = [...extractedValues, multiplier]
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

  async mcTalName(inputData) {
    if (!inputData) return ""
    let a = {}
    for (const item of inputData) {
      let b = []
      let c = []
      let d = false
      for (const e of item.values) {
        if (/[+\-*]/.test(e)) {
          d = true
          break
        }
      }
      for (const e of item.values) {
        let f
        let parts = []
        if (/[+\-*]/.test(e)) {
          let numbers = e.match(/\d+\.?\d*/g).map(Number)
          f = eval(e.replace(/%/g, ''))
          parts = numbers
        }
        else {
          f = parseFloat(e)
          parts = [f]
        }
        b.push(f)
        if (d) {
          c.push(parts)
        }
      }
      a[item.attributeName] = b
      if (d) {
        a[`${item.attributeName}2`] = c
      }
    }
    return a
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
    try {
      if (!await common.downFile(url, Path)) {
        console.error(`[liangshi-calc]下载${name}图片失败，5秒后重试`)
        await common.sleep(5000)
        if (!await common.downFile(url, Path)) {
          console.error(`[liangshi-calc]重试下载${name}图片失败`)
          let filePath = "./plugins/liangshi-calc/resources/log.json"
          let oldLog = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '{}'
          let y = JSON.parse(oldLog)
          y[new Date()] = { url, Path, name, text: "下载图片错误" }
          let bbxzData = JSON.stringify(y, null, 2)
          fs.writeFile(filePath, bbxzData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]下载失败内容已记录失败:\n', err)
              return false
            } else {
              logger.mark('[liangshi-calc]下载失败内容已记录')
            }
          })
          return false
        }
        logger.mark(`[liangshi-calc]下载${name}图片成功`)
        return true
      }
      logger.mark(`[liangshi-calc]下载${name}图片成功`)
      return true
    } catch (err) {
      console.log(err)
      return true
    }
  }
}