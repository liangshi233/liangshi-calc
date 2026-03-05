import plugin from '../../../lib/plugins/plugin.js'
import common from '../../../lib/common/common.js'
import { Common } from '../components/index.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'

/**
 * 已知问题
 * 更新角色数据时角色天赋顺序会被打乱
 * 更新声骸数据时会丢失代号数据
 * 更新敌人数据时会丢失重量瘫痪时间等数据
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
            reg: '^#*(梁氏|liangshi)?一键更新(鸣潮|明朝|潮|mc|MC)(最|当前最)?新版本(完整|全部)?(角色|共鸣者|武器|光锥|圣遗物|声骸|遗器|物品|材料|敌人|敌怪|怪物|残响|残像|boss|BOSS)?(数据|资源|内容|资源数据)$',
            fnc: 'New'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(角色|共鸣者)(数据|资源|资源数据)?$',
            fnc: 'CharacterNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?$',
            fnc: 'WeaponNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?$',
            fnc: 'ArtifactNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS)(数据|资源|资源数据)?$',
            fnc: 'MonsterNew'
          },
          {
            reg: '^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?$',
            fnc: 'ItemNew'
          }
        ]
      }
    )
  }

  async New (e) {
    let cfg = LSconfig.getConfig('user', 'config')
    if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
    let characterTime, weaponTime, artifactTime, monsterTime, itemTime, apiKey, character, status, response, ProxyUrl, artifact, data, weapon, monster, ItemJson, ItemOk, url2
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
    try {
      response = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/new`)
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
      console.log(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      console.error(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    character = data[1].character || []
    weapon = data[1].weapon || []
    monster = data[1].monster || []
    artifact = data[1].echo || []
    data.item = data[1].item || []
    if (/完整|全部/.test(e.msg)) {
      status = "完整"
      try {
        let Characterurl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/character`)
        Characterurl = await Characterurl.json()
        character = Characterurl.roleList.map(item => item.Id)
        let Weaponurl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/weapon`)
        Weaponurl = await Weaponurl.json()
        weapon = Weaponurl.weapons.map(item => item.Id)
        let Artifacturl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/echo`)
        Artifacturl = await Artifacturl.json()
        artifact = Artifacturl.Echo.map(item => item.Id)
        let Monsterurl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/monster`)
        Monsterurl = await Monsterurl.json()
        monster = Monsterurl.monsterList.map(item => item.Id)
        let Itemurl = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`)
        Itemurl = await Itemurl.json()
        data.item = Itemurl.itemList.map(item => item.Id)
      } catch (err) {
        console.error(err)
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
    e.reply(`[liangshi-calc] 即将静默更新\n鸣潮 ${data[0].ResVer}版本新内容\n共计\n\n${character.length}名新共鸣者\n${weapon.length}个新武器\n${artifact.length}个新声骸\n${monster.length}个新残像\n${data.item.length}个新物品\n\n预计需要${y}~${UseTime}分钟，请耐心等待.\n(*/ω＼*)`)
    await common.sleep(2000)
    ItemOk = true
    if (!fs.existsSync("./plugins/liangshi-calc/resources/log.json")) { fs.writeFileSync("./plugins/liangshi-calc/resources/log.json", '{}'); console.log(`[liangshi-calc]未找到错误日志文件，已自动创建`)}
    try {
      let url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`
      url2 = `${ProxyUrl}https://api.encore.moe/zh-Hans/echo`
      let EchoJson = await fetch(url2)
      EchoJson = await EchoJson.json()
      if (artifact.length > 0) { fs.writeFile(`./plugins/liangshi-calc/resources/EchoJson.json`, JSON.stringify(EchoJson), 'utf8', (err) => { if (err) { console.error(`[liangshi-calc] 声骸Json储存失败`); fs.unlink('./plugins/liangshi-calc/resources/EchoJson.json', (err) => { if (!err) { console.warn(`[liangshi-calc] 声骸Json储存错误残留文件已清理`) }})} else { console.log(`[liangshi-calc] 声骸Json已缓存至本地`) }}) }
      if (data.item.length > 0) {
        ItemJson = await fetch(url)
        if (!response.ok) ItemOk = false
        ItemJson = await ItemJson.json()
        fs.writeFile(`./plugins/liangshi-calc/resources/ItemJson.json`, JSON.stringify(ItemJson), 'utf8', (err) => { if (err) { ItemOk = false } else { console.log(`[liangshi-calc] 物品Json已缓存至本地`) }})
      }
    } catch (err) { ItemOk = false; console.error(`[liangshi-calc] Json缓存失败\n${err}`) }
    let instruction = { msg: null, isMaster: true, reply: e.reply }
    for (const charId of character) {
      instruction.msg = `#梁氏覆盖更新鸣潮${charId}角色数据`
      await common.sleep(2000)
      await this.CharacterNew(instruction, true)
    }
    characterTime =  `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    for (const weaponId of weapon) {
      instruction.msg = `#梁氏覆盖更新鸣潮${weaponId}武器数据`
      await common.sleep(1500)
      await this.WeaponNew(instruction, true)
    }
    weaponTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    for (const artifactId of artifact) {
      await common.sleep(1500)
      instruction.msg = `#梁氏覆盖更新鸣潮${artifactId}声骸数据`
      await this.ArtifactNew(instruction, true)
    }
    artifactTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    for (const monsterId of monster) {
      await common.sleep(1500)
      instruction.msg = `#梁氏覆盖更新鸣潮${monsterId}敌人数据`
      await this.MonsterNew(instruction, true)
    }
    monsterTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    for (const itemId of data.item) {
      await common.sleep(1000)
      instruction.msg = `#梁氏覆盖更新鸣潮${itemId}物品数据`
      await this.ItemNew(instruction, true, ItemOk)
    }
    itemTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
    await common.sleep(2000)
    let verDataPath = `./plugins/miao-plugin/resources/meta-mc/data.json`
    if (!fs.existsSync(verDataPath)) fs.writeFileSync(verDataPath, '{}')
    fs.readFile(verDataPath, 'utf8', (err, TextData) => {
      if (err) return false
      try {
        let verData = JSON.parse(TextData)
        let Time = new Date()
        let dayTime = `${Time.getFullYear()}-${Time.getMonth() + 1}-${Time.getDate()} ${Time.getHours()}:${Time.getMinutes()}`
        verData.ver = data[0].ResVer
        verData.time = dayTime
        let api = "encore.moe"
        verData[dayTime] = {
          "ver": data[0].ResVer,
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
        fs.writeFile(verDataPath, updatedData, 'utf8', (err) => { if (err) return false })
      } catch (err) { console.error(err) }
    })
    if (artifact.length > 0) { fs.unlink('./plugins/liangshi-calc/resources/EchoJson.json', (err) => { if (!err) { console.log(`[liangshi-calc] 声骸Json缓存已删除`) } })}
    if (data.item.length > 0) { fs.unlink('./plugins/liangshi-calc/resources/ItemJson.json', (err) => { if (err) { console.error('[liangshi-calc] 物品Json缓存删除失败:', err.message) } else { console.log(`[liangshi-calc] 物品Json缓存已删除`) }})}
    let CharacterNamedata, CharacterText, WeaponText, WeaponNamedata, ArtifactText, ArtifactNamedata, MonsterText, MonsterNamedata
    try {
      CharacterText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/character`)
      WeaponText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/weapon`)
      ArtifactText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/echo`)
      MonsterText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/monster`)
      CharacterNamedata = await CharacterText.json()
      WeaponNamedata = await WeaponText.json()
      ArtifactNamedata = await ArtifactText.json()
      MonsterNamedata = await MonsterText.json()
      console.log(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      console.warn(`[liangshi-calc]云端数据读取异常`)
      e.reply('[liangshi-calc]网络不佳，请稍后重试')
      return false
    }
    let CharacterNameText, WeaponNameText, ArtifactNameText, MonsterNameText
    CharacterNameText = character.map(id => CharacterNamedata.roleList.find(role => role.Id === id).Name)
    WeaponNameText = weapon.map(id => WeaponNamedata.weapons.find(role => role.Id === id).Name)
    ArtifactNameText = artifact.map(id => ArtifactNamedata.Echo.find(role => role.Id === id).Name)
    MonsterNameText = monster.map(id => MonsterNamedata.monsterList.find(role => role.Id === id).Name)
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
        face: `/meta-mc/character/${c[id].name}/imgs/${webp}.webp`,
        name: c[id].name || "无名",
        abbr: c[id].abbr || c[id].name || "",
        star: c[id].star
      }))

      let weapons = weapon.filter(id => j.hasOwnProperty(id)).map(id => ({
        face: `/meta-mc/weapon/${j[id].type}/${j[id].name}/icon.webp`,
        name: j[id].name,
        abbr: j[id].abbr || j[id].name,
        star: j[id].star
      }))

      let artis = ArtifactNameText.map(id => ({
        face: `/meta-mc/artifact${a}/${id}/${webp3}.webp`,
        name: id,
        star: 5
      }))
      let monster = MonsterNameText.map(id => ({
        face: `/meta-mc/monster/${id}/icon.webp`,
        name: id,
        star: 5
      }))
      let TxName = { js: "共鸣者", wq: "武器", zb: "声骸", dr: "残像" }
      return await Common.render('wiki/data/ver-new', {
        gamever: data[0].ResVer,
        gameid: "鸣潮",
        TxName: TxName,
        jsNum: character.length,
        wqNum: weapon.length,
        zbNum: artifact.length,
        drNum: monster.length,
        wpNum: data.item.length,
        chars,
        weapons,
        artis,
        monster,
        servName: "encore.moe",
        updateTime: { characterTime, weaponTime, artifactTime, monsterTime, itemTime },
        elem: 'hydro'
      }, { e, scale: 1.6, retType: 'base64' })
    } catch (err) {
      console.error('[liangshi-calc] 生成图片时遇到了一些问题，但这并不影响功能:', err)
      if (CharacterNameText.length === 0) CharacterNameText = `本次没有更新任何共鸣者`
      if (WeaponNameText.length === 0) WeaponNameText = `本次没有更新任何武器`
      if (ArtifactNameText.length === 0) ArtifactNameText = `本次没有更新任何声骸`
      if (MonsterNameText.length === 0) MonsterNameText = `本次没有更新任何残像`
      e.reply(`[liangshi-calc] 鸣潮 ${data[0].ResVer} 版本更新完成\n已为您更新\n\n共鸣者：\n${CharacterNameText}\n\n武器：\n${WeaponNameText}\n\n声骸：\n${ArtifactNameText}\n\n残像：\n${MonsterNameText}\n\n物品${data.item.length}个\n\n重启后即可使用相关内容`)
      return false
    }
  }

  async CharacterNew (e, mode) {
    if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
    let cfg = LSconfig.getConfig('user', 'config')
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)角色(数据|资源|资源数据)?$/)
    let CharacterId = TextData[4]
    try {
      if (/^\d{4}$/.test(CharacterId) || /强制|强行|覆盖/.test(e.msg)) {
        console.log(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
        if (!mode) e.reply(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
      } else {
        console.error(`[liangshi-calc]未知的角色ID:${CharacterId}`)
        if (!mode) e.reply('[liangshi-calc]角色ID错误，请检查角色ID格式(4位数字)')
        if (!mode) e.reply(`[liangshi-calc]角色ID可在https://gitee.com/liangshi233/liangshi-calc/blob/master/damage/liangshi-mc/README.md内对照 (新版本角色ID可使用 #梁氏检查鸣潮更新 查看)`)
        return false
      }
      let response, ProxyUrl, apiKey, CharacterData, ItemText, url, data
      if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
      if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
      try {
        url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/character/${CharacterId}`
        response = await fetch(url)
        if (!response.ok) { console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`); return false }
        data = await response.json()
        console.log(`[liangshi-calc]角色：${data.Name.Content || data.Name || "无名"} 云端数据读取成功`)
      } catch (err) {
        console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
        if (response.status === 404) {
          if (!mode) e.reply('[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新')
          if (!mode) e.reply('数据更新时间(预估)\n鸣潮：版本更新后14天18：00~次日6：00左右')
        } else if (response.status === 429) {
          if (!mode) e.reply('[liangshi-calc]你更新的速度太快了，请稍等一下再试吧(*/ω＼*)')
        } else if (response.status >= 500) {
          if (!mode) e.reply('[liangshi-calc]云端服务器可能正在维护，请稍等一下再试吧(*/ω＼*)')
        } else if (cfg.ProxyUrl) {
          if (!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议检查配置的代理后再试(*/ω＼*)')
        } else {
          if (!mode) e.reply('[liangshi-calc]请求异常，可能是网络超时，建议使用代理后再试(*/ω＼*)')
        }
        return false
      }
      let CharacterName = data.Name.Content || data.Name || "无名"
      let icons = `./plugins/miao-plugin/resources/meta-mc/character/${CharacterName}/icons`
      let imgs = `./plugins/miao-plugin/resources/meta-mc/character/${CharacterName}/imgs`
      if (!fs.existsSync(icons)) { fs.mkdirSync(icons, { recursive: true }); console.log(`[liangshi-calc]角色：${data.Name || "无名"} 本地icons文件夹创建成功`) }
      if (!fs.existsSync(imgs)) { fs.mkdirSync(imgs, { recursive: true }); console.log(`[liangshi-calc]角色：${data.Name || "无名"} 本地imgs文件夹创建成功`) }
      ItemText = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`)
      let ItemNamedata = await ItemText.json()
      ItemNamedata = ItemNamedata.itemList.reduce((acc, item) => {acc[item.Id] = item;return acc}, {})
      let mcTalName = (data) => {
        if (!data) return ""
        let a = {}
        for (let item of data) {
          let b = [], c = [], d = false
          for (let e of item.values) { if (/[+\-*]/.test(e)) { d = true; break } }
          for (let e of item.values) {
            let f, parts = []
            if (/[+\-*]/.test(e)) {
              let numbers = e.match(/\d+\.?\d*/g).map(Number)
              f = eval(e.replace(/%/g, ''))
              parts = numbers
            } else { f = parseFloat(e); parts = [f] }
            b.push(f)
            if (d) c.push(parts)
          }
          a[item.attributeName] = b
          if (d) a[`${item.attributeName}2`] = c
        }
        return a
      }
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
        "5": "rectifier"
      }
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
        "tag": {
          "keys": data.Tag,
          "name": data.Tags.map(item => item.TagName)
        },
        "Features": data.SkillInputs[0].SkillDescList.map(str => str.replace(/<span[^>]*>(.*?)<\/span>/g, '<color=Highlight>$1</color>')),
        "ver": 1,
        "baseAttr": {
          "hp": data.Properties[0].GrowthValues[95].value,
          "atk": data.Properties[1].GrowthValues[95].value,
          "def": data.Properties[2].GrowthValues[95].value
        },
        "Weakness": {
          "ratio": 10000,
          "mastery": 10
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
            "desc": data.Skills[0]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== ''),
            "tables": data.Skills[0]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
          },
          "e": {
            "name": data.Skills[1]?.SkillName,
            "desc": data.Skills[1]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== ''),
            "tables": data.Skills[1]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
          },
          "q": {
            "name": data.Skills[2]?.SkillName,
            "desc": data.Skills[2]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== ''),
            "tables": data.Skills[2]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
          },
          "t": {
            "name": data.Skills[6]?.SkillName,
            "desc": data.Skills[6]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== ''),
            "tables": data.Skills[6]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
          },
          "i": {
            "name": data.Skills[5]?.SkillName,
            "desc": data.Skills[5]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== ''),
            "tables": data.Skills[5]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
          },
          "o": {
            "name": data.Skills[8]?.SkillName,
            "desc": data.Skills[8]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== ''),
            "tables": data.Skills[8]?.SkillAttributes.map(item => {let param = item.Description ? item.values.map(val => `${val}${item.Description}`) : [...item.values];let isSame = new Set(param).size === 1; return { name: item.attributeName, isSame: isSame, values: param }})
          }
        },
        "talentData": {
          "a": mcTalName(data.Skills[0]?.SkillAttributes),
          "e": mcTalName(data.Skills[1]?.SkillAttributes),
          "q": mcTalName(data.Skills[2]?.SkillAttributes),
          "t": mcTalName(data.Skills[6]?.SkillAttributes),
          "i": mcTalName(data.Skills[5]?.SkillAttributes),
          "o": mcTalName(data.Skills[8]?.SkillAttributes),
        },
        "cons": {
          "1": {
            "name": data.ResonantChain[0]?.NodeName,
            "desc": data.ResonantChain[0]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== '')
          },
          "2": {
            "name": data.ResonantChain[1]?.NodeName,
            "desc": data.ResonantChain[1]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== '')
          },
          "3": {
            "name": data.ResonantChain[2]?.NodeName,
            "desc": data.ResonantChain[2]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== '')
          },
          "4": {
            "name": data.ResonantChain[3]?.NodeName,
            "desc": data.ResonantChain[3]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== '')
          },
          "5": {
            "name": data.ResonantChain[4]?.NodeName,
            "desc": data.ResonantChain[4]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== '')
          },
          "6": {
            "name": data.ResonantChain[5]?.NodeName,
            "desc": data.ResonantChain[5]?.AttributesDescription.replace(/<[^>]*>/g, '').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== '')
          }
        },
        "passive": [
          {
            "name": data.Skills[3]?.SkillName,
            "desc":  data.Skills[3]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== '')
          },
          {
            "name": data.Skills[4]?.SkillName,
            "desc":  data.Skills[4]?.SkillDescribe.replace(/<span[^>]*class="font-bold[^"]*"[^>]*>([^<]+)<\/span>/g,'<h3>$1</h3>').replace(/<br><br>/g, 'liangshi').replace(/<br>/g, '').replace(/<(?!h3\b|\/h3\b|liangshi)[^>]*>/g, '').split('liangshi').map(item => item.trim()).map(item => {return /^<h3>.*<\/h3>$/.test(item) ? item : item.replace(/<h3>|<\/h3>/g, '')}).flatMap(item => {if (/^<h3>.*<\/h3>$/.test(item)) {return [item]} else {return item.split('。').slice(0, -1).map(p => p + '。').concat(item.split('。').slice(-1))}}).filter(item => item !== '')
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
        }
      }
      console.log('[liangshi-calc]数据处理完成')
      let path = `./plugins/miao-plugin/resources/meta-mc/character/${CharacterName}/data.json`
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(CharacterData, null, 2), 'utf8')
        console.log(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
        if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据已写入`)
      } else if (/强制|强行|覆盖/.test(e.msg)) {
        if (!mode) e.reply('[liangshi-calc]角色数据已存在，当前为强制模式，尝试覆盖写入。')
        fs.writeFileSync(path, JSON.stringify(CharacterData, null, 2), 'utf8')
        console.log(`[liangshi-calc]角色：${CharacterName} 数据已写入`)
        if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据已写入`)
      } else {
        if (!mode) e.reply(`[liangshi-calc]角色数据已存在，运行终止。\n如果需要刷新角色数据至最新预览版本请使用覆盖更新\n例：#覆盖更新鸣潮${CharacterId}数据`)
        console.error(`[liangshi-calc]角色：${CharacterName}\n数据已存在`)
      }
      if (!mode) e.reply(`[liangshi-calc]角色数据资源下载完成`)
      console.log(`[liangshi-calc]开始下载角色图片资源`)
      await this.getImg(ProxyUrl + data.RolePortrait, `${imgs}/splash.webp`, "立绘")
      await this.getImg(ProxyUrl + data.FormationRoleCard, `${imgs}/face.webp`, "大头")
      await this.getImg(ProxyUrl + data.RoleHeadIconBig, `${imgs}/side.webp`, "侧头")
      await this.getImg(ProxyUrl + data.Skills[3]?.Icon, `${icons}/passive-0.webp`, "固有天赋1")
      await this.getImg(ProxyUrl + data.Skills[4]?.Icon, `${icons}/passive-1.webp`, "固有天赋2")
      await this.getImg(ProxyUrl + data.Skills[1]?.Icon, `${icons}/talent-e.webp`, "共鸣技能")
      await this.getImg(ProxyUrl + data.Skills[2]?.Icon, `${icons}/talent-q.webp`, "共鸣解放")
      await this.getImg(ProxyUrl + data.Skills[5]?.Icon, `${icons}/talent-i.webp`, "变奏技能")
      await this.getImg(ProxyUrl + data.Skills[8]?.Icon, `${icons}/talent-o.webp`, "延奏技能")
      await this.getImg(ProxyUrl + data.Skills[6]?.Icon, `${icons}/talent-t.webp`, "共鸣回路")
      await this.getImg(`${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[0]?.NodeIcon, `${icons}/cons-1.webp`, "1链")
      await this.getImg(`${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[1]?.NodeIcon, `${icons}/cons-2.webp`, "2链")
      await this.getImg(`${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[2]?.NodeIcon, `${icons}/cons-3.webp`, "3链")
      await this.getImg(`${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[3]?.NodeIcon, `${icons}/cons-4.webp`, "4链")
      await this.getImg(`${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[4]?.NodeIcon, `${icons}/cons-5.webp`, "5链")
      await this.getImg(`${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data` + data.ResonantChain[5]?.NodeIcon, `${icons}/cons-6.webp`, "6链")
      if (!mode) e.reply(`[liangshi-calc]角色图片资源下载完成`)
      console.log(`[liangshi-calc]图片资源下载完成`)
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath = "./plugins/miao-plugin/resources/meta-mc/character/data.json", newValue
        if (!fs.existsSync(filePath)) { console.log('[liangshi-calc]找不到文件data.json，请检查mian-waves配置'); fs.writeFileSync(filePath, '{}') }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取角色配置data.json失败:\n', err)
            if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
            if (!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            newValue = {
              "id": data.Id,
              "name": data.Name.Content || "无名",
              "abbr": data.Name.Content || "",
              "star": data.QualityId,
              "elem": elemKey[`${data.ElementName}`],
              "weapon": weaponKey[`${data.WeaponType}`]
            }
            jsonData[CharacterId] = newValue
            console.log(`[liangshi-calc]角色${CharacterId} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error('[liangshi-calc]角色data.json写入失败:\n', err)
                if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
                if (!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
                return false
              } else { console.log('[liangshi-calc]角色data.json已更新') }
            })
          } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
        })
        if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n重启后即可使用${CharacterName}相关内容`)
        if (!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
      } else {
        if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n当前未启用自动写入CharacterData\n手动配置后重启才可使用\n自动写入CharacterData可在config.yaml启用或使用强制更新临时启用一次`)
        if (!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
      }
      return true
    } catch (err) {
      if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`) } else {
        console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}角色数据 进行手动更新\n${err}`)
        let lj = "./plugins/liangshi-calc/resources/log.json"
        let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
        let y = JSON.parse(oldLog)
        y[new Date()] = { name: TextData[4], err, text: "角色更新错误" }
        let bbxzData = JSON.stringify(y, null, 2)
        fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') }})
      }
      return true
    }
  }

  async WeaponNew (e, mode) {
    if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, ProxyUrl, data, WeaponType, WeaponData, apiKey, IconUrl, newValue, counter = -1
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?$/)
    try {
      let ID = TextData[4]
      if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的武器数据`)
      try {
        response = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/weapon/${ID}`)
        if (!response.ok) {
          console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
          if (response.status === 404) {
            if (!mode) e.reply('[liangshi-calc]云端暂无该武器数据，可等待一段时间后再更新')
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
        console.log(`[liangshi-calc]云端数据读取成功`)
      } catch (err) {
        if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
        console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
        return false
      }
      if (ID < 21020000) { WeaponType = "broadblade" } else if (ID < 21030000) { WeaponType = "sword" } else if (ID < 21040000) { WeaponType = "pistols" } else if (ID < 21050000) { WeaponType = "gauntlets" } else if (ID < 80000000) { WeaponType = "rectifier" } else { WeaponType = "projection" }
      IconUrl = `${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data`
      let WeaponName = data.WeaponName
      let imgs = `./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/${WeaponName}`
      if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/${WeaponName}`) || /强制|强行|覆盖/.test(e.msg)) {
        if (!mode) e.reply(`[liangshi-calc]开始更新武器: ${WeaponName}`)
        fs.mkdirSync(`./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/${WeaponName}`, { recursive: true })
        console.log(`[liangshi-calc]武器:${WeaponName} 本地文件夹创建成功`)
      } else { if (!mode) e.reply(`[liangshi-calc]武器: ${WeaponName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
      await this.getImg(ProxyUrl + IconUrl + data.Icon.split('.')[0] + ".png", `${imgs}/icon.webp`, "icon")
      if (!mode) e.reply(`[liangshi-calc]武器图片资源下载完成`)
      let key = { "生命": "hpPct", "攻击": "atkPct", "防御": "atkPct", "共鸣效率": "recharge", "暴击": "cpct", "暴击伤害": "cdmg" }
      let IconData, IconResponse, url
      try {
        url = `${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/item`
        IconResponse = await fetch(url)
        if (!response.ok) { console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`); IconData = {} } else { IconData = await IconResponse.json() }
        console.log(`[liangshi-calc]云端数据读取成功`)
      } catch (err) {
        IconData = {}
        console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      }
      if (data.Name?.includes("投影·") || data.WeaponName?.includes("投影·")) {
        WeaponData = {
          "id": Number(ID),
          "name": data.WeaponName,
          "star": data.ResonName,
          "desc": data.AttributesDescription.replace(/\n/g, '')
        }
      } else {
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
          }
        }
      }
      console.log('[liangshi-calc]数据处理完成')
      let path = `./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/${data.Name || data.WeaponName}/data.json`
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
        console.log(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据已写入`)
        if (!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName}\n数据已写入`)
      } else if (/强制|强行|覆盖/.test(e.msg)) {
        if (!mode) e.reply('[liangshi-calc]武器数据已存在，当前为强制模式，尝试覆盖写入。')
        fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
        console.log(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据已写入`)
        if (!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName}\n数据已写入`)
      } else {
        if (!mode) e.reply(`[liangshi-calc]武器数据已存在，运行终止。\n如果需要刷新武器数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}武器数据`)
        console.error(`[liangshi-calc]武器：${data.Name || data.WeaponName}\n数据已存在`)
        return false
      }
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath = `./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/data.json`
        if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取武器配置data.json失败:', err)
            if (!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            newValue = { "id": ID, "name": data.WeaponName, "star": data.QualityName === "SR" ? 4 : 5 }
            jsonData[ID] = newValue
            console.log(`[liangshi-calc]武器：${data.Name || data.WeaponName} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error('[liangshi-calc]武器data.json写入失败:\n', err)
                if (!mode) e.reply(`[liangshi-calc]武器：${data.Name} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
                return false
              } else { console.log('[liangshi-calc]武器data.json已更新') }
            })
          } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
        })
        if (!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据更新完成\n重启后即可使用相关内容`)
      } else { if (!mode) e.reply(`[liangshi-calc]武器：${data.Name || data.WeaponName} 数据更新完成\n当前未启用自动写入WeaponData\n手动配置后重启才可使用\n自动写入WeaponData可在config.yaml启用或使用强制更新临时启用一次`)}
      return false
    } catch (err) {
      if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`) } else {
        console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
        let lj = "./plugins/liangshi-calc/resources/log.json"
        let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
        let y = JSON.parse(oldLog)
        y[new Date()] = { name: TextData[4], err, text: "武器更新错误" }
        let bbxzData = JSON.stringify(y, null, 2)
        fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') }})
      }
      return true
    }
  }

  async ArtifactNew (e, mode) {
    if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, ProxyUrl, data, apiKey, p
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?$/)
    try {
      let ID = TextData[4]
      if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的声骸数据`)
      try {
        response = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/echo/${ID}`)
        if (!response.ok) {
          console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
          if (response.status === 404) {
            if (!mode)  e.reply(`[liangshi-calc]云端暂无该声骸数据，可等待一段时间后再更新`)
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
        console.log(`[liangshi-calc]云端数据读取成功`)
      } catch (err) {
        if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
        console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
        return false
      }
      let imgName = data.Name || data.MonsterName
      let imgs = `./plugins/miao-plugin/resources/meta-mc/artifact/${imgName}`
      if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/artifact/${imgName}`) || /强制|强行|覆盖/.test(e.msg)) {
        if (!mode) e.reply(`[liangshi-calc]开始更新声骸: ${imgName}`)
        fs.mkdirSync(`./plugins/miao-plugin/resources/meta-mc/artifact/${imgName}`, { recursive: true })
        console.log(`[liangshi-calc]声骸:${imgName} 本地imgs文件夹创建成功`)
      } else { if (!mode) e.reply(`[liangshi-calc]声骸: ${imgName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
      await this.getImg(ProxyUrl + data.Icon, `${imgs}/img.webp`, "声骸")
      await this.getImg(ProxyUrl + data.Skill?.BattleViewIcon, `${imgs}/skill.webp`, "技能")
      if (!mode) e.reply(`[liangshi-calc]声骸图片资源下载完成`)
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath = `./plugins/miao-plugin/resources/meta-mc/artifact/data.json`
        if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`)}
        let EchoJson, jsonNOK, yx, jx
        if (fs.existsSync('./plugins/liangshi-calc/resources/EchoJson.json')) { try { EchoJson = fs.readFileSync('./plugins/liangshi-calc/resources/EchoJson.json','utf8'); EchoJson = JSON.parse(EchoJson); console.log(`[liangshi-calc]声骸Json读取成功`) } catch (err) { console.error(`[liangshi-calc]声骸Json读取失败,尝试重新获取`); jsonNOK = true }}
        if (!fs.existsSync('./plugins/liangshi-calc/resources/EchoJson.json') || jsonNOK) {
          let url2 = `${ProxyUrl}https://api.encore.moe/zh-Hans/echo`
          EchoJson = await fetch(url2)
          EchoJson = await EchoJson.json()
          if (mode) { fs.writeFile(`./plugins/liangshi-calc/resources/EchoJson.json`, JSON.stringify(EchoJson), 'utf8', (err) => {if (err) { console.error(`[liangshi-calc]声骸Json储存失败`); fs.unlink('./plugins/liangshi-calc/resources/EchoJson.json', (err) => { if (!err) { console.warn(`[liangshi-calc]声骸Json储存错误残留文件已清理`) }})} else { console.error(`[liangshi-calc] 声骸Json已缓存至本地`) }})}
        }
        EchoJson = EchoJson.Echo.reduce((acc, item) => { acc[item.Id] = { ...item }; return acc }, {})
        let i = EchoJson[data.MonsterId].FetterGroups
        let textcl = (items) => {
          return items.reduce((acc, item) => {
            let effect = item.Fetters.length === 2 ? { 2: data?.FetterDetails?.[item.Name]?.EffectDescriptions?.[0] || item.Fetters[0].EffectDescription, 5: data?.FetterDetails?.[item.Name]?.EffectDescriptions?.[1] || item.Fetters[1].EffectDescription } : { 3: data?.FetterDetails?.[item.Name]?.EffectDescriptions?.[0] || item.Fetters[0].EffectDescription }
            acc[item.Id] = { id: String(item.Id), name: item.Name, sets: [data.MonsterId], effect: effect }
            return acc
          }, {})
        }
        if (fs.existsSync(filePath)) { yx = {}; try { yx = fs.readFileSync(filePath,'utf8'); yx = JSON.parse(yx); console.log(`[liangshi-calc]声骸data读取成功`)} catch (err) { console.error(`[liangshi-calc]声骸data读取失败,尝试重新生成`) }} else { yx = {} }
        i = textcl(i)
        jx = { ...yx }
        for (const key in i) {
          if (yx.hasOwnProperty(key)) {
            let yxk = yx[key]
            let ik = i[key]
            let ox = { ...yxk, ...ik }
            if (yxk.sets && ik.sets) { ox.sets = [...new Set([...yxk.sets, ...ik.sets])] }
            jx[key] = ox
          } else { jx[key] = i[key] }
        }
        fs.writeFile(filePath, JSON.stringify(jx, null, 2), 'utf8', (err) => { if (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) } else { console.log(`[liangshi-calc]声骸：${imgName} 配置data.json成功`) }})
        let gx = {}, cb = {}
        let o = data.Skill.DescriptionEx.replace(/\u003Cbr\u003E/g, '').replace(/<color=[^>]>/g, '').replace(/<\/color>/g, '').replace(/<size=[^>]>/g, '').replace(/<\/size>/g, '')
        p = data.Skill.LevelDescStrArray[data.Skill.LevelDescStrArray.length - 1].ArrayString
        p.forEach((dx, oc) => { cb[dx.trim()] = oc })
        let k = Object.entries(cb).sort((a, b) => b[1] - a[1]).reverse()
        let lszw = 'liangshi', ly = o
        for (const [g, f] of k) {ly = ly.replace(new RegExp(`${g.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\w%])`),`${lszw}${f}${lszw}`)}
        ly = ly.replace(new RegExp(`${lszw}(\\d+)${lszw}`, 'g'),'$[$1]').replace(new RegExp(`\\${lszw}.*\\${lszw}`, 'g'), '')
        o = ly.replace(/]%/g, ']')
        let datas = data.Skill.LevelDescStrArray
        let maxLength = datas.reduce((mx, gu) => Math.max(mx, gu.ArrayString.length), 0)
        for (let i = 0; i < maxLength; i++) { gx[i] = [] }
        datas.forEach(xx => { xx.ArrayString.forEach((xn, un) => { gx[un].push(xn) }) })
        datas = gx
        let ArtifactData = {
          "id": data.Id || data.MonsterId,
          "Name": data.Name || data.MonsterName,
          "Type": data.Handbook?.TypeDescrtption || "",
          "Intensity": data.Handbook?.Intensity || "",
          "Place": data.Handbook?.Place || "",
          "Code": data.Code || "",
          "desc": (data.Skill.SimpleDesc || data.Skill?.SimplyDescription).replace(/\n/g, '').replace(/<size=40><color=Title>/g, '').replace(/<\/color><\/size>/g, ''),
          "Rarity": [2, 3, 4, 5],
          "Group": data.FetterGroup,
          "affixData": {
            "text": o.replace(/\n/g, ''),
            "datas": datas
          }
        }
        let path = `./plugins/miao-plugin/resources/meta-mc/artifact/${imgName}/data.json`
        if (!fs.existsSync(path)) {
          fs.writeFileSync(path, JSON.stringify(ArtifactData, null, 2), 'utf8')
          console.log(`[liangshi-calc]声骸：${imgName} 数据已写入`)
          if (!mode) e.reply(`[liangshi-calc]声骸：${imgName} 数据已写入`)
        } else if (/强制|强行|覆盖/.test(e.msg)) {
          if (!mode) e.reply('[liangshi-calc]声骸数据已存在，当前为强制模式，尝试覆盖写入。')
          fs.writeFileSync(path, JSON.stringify(ArtifactData, null, 2), 'utf8')
          console.log(`[liangshi-calc]声骸：${imgName} 数据已写入`)
          if (!mode) e.reply(`[liangshi-calc]声骸：${imgName} 数据已写入`)
        } else {
          if (!mode) e.reply(`[liangshi-calc]声骸数据已存在，运行终止。\n如果需要刷新声骸数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}声骸数据`)
          console.error(`[liangshi-calc]声骸：${imgName}\n数据已存在`)
        }
        if (!mode) e.reply(`[liangshi-calc]声骸：${imgName} 数据更新完成\n重启后即可使用相关内容`)
      } else { if (!mode) e.reply(`[liangshi-calc]声骸：${imgName} 数据更新完成\n当前未启用自动写入ArtifactData\n手动配置后重启才可使用\n自动写入ArtifactData可在config.yaml启用或使用强制更新临时启用一次`)}
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
        fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) {console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') }})
      }
      return true
    }
  }

  async MonsterNew (e, mode) {
    if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, ProxyUrl, data, MonsterData, apiKey, IconUrl, newValue
    if (cfg.mcApi === 3) apiKey = "-v2"; else apiKey = ""
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS)(数据|资源|资源数据)?$/)
    let ID = TextData[4]
    if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的敌怪数据`)
    try {
      try {
        response = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/zh-Hans/monster/${ID}`)
        if (!response.ok) {
          console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
          if (response.status === 404) {
            if (!mode) e.reply('[liangshi-calc]云端暂无该武器数据，可等待一段时间后再更新')
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
        console.log(`[liangshi-calc]云端数据读取成功`)
      } catch (err) {
        if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
        console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
        return false
      }
      IconUrl = `${ProxyUrl}https://api${apiKey}.encore.moe/resource/Data`
      if (data.Name === "") data.Name = "无名"
      let imgs = `./plugins/miao-plugin/resources/meta-mc/monster/${data.Name}`
      if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/monster/${data.Name}`) || /强制|强行|覆盖/.test(e.msg)) {
        if (!mode) e.reply(`[liangshi-calc]开始更新敌怪: ${data.Name}`)
        fs.mkdirSync(`./plugins/miao-plugin/resources/meta-mc/monster/${data.Name}`, { recursive: true })
        console.log(`[liangshi-calc]敌怪:${data.Name} 本地文件夹创建成功`)
      } else { if (!mode) e.reply(`[liangshi-calc]敌怪: ${data.Name} 已经存在，如需更新数据请使用覆盖更新。`); return false }
      await this.getImg(ProxyUrl + IconUrl + data.Icon, `${imgs}/icon.webp`, "icon")
      if (!mode) e.reply(`[liangshi-calc]敌怪图片资源下载完成`)
      let HPattr = [], DEFattr = [], ATKattr = [], HARattr = [], REGattr = []
      Object.values(data.GrowthRates).forEach(item => {
        HPattr.push((item.LifeMaxRatio / 10000 * data.Properties.LifeMax.Value).toFixed(4) * 1)
        ATKattr.push((item.AtkRatio / 10000 * data.Properties.Atk.Value).toFixed(4) * 1)
        DEFattr.push((item.DefRatio / 10000 * data.Properties.Def.Value).toFixed(4) * 1)
        HARattr.push((item.HardnessMaxRatio / 10000 * data.Properties.HardnessMax.Value).toFixed(4) * 1)
        REGattr.push((item.RageMaxRatio / 10000 * data.Properties.RageMax.Value).toFixed(4) * 1)
      })
      MonsterData = {
        id: data.Id,
        name: data.Name,
        desc: data.UndiscoveredDes,
        descAll: data.DiscoveredDes.split("<br>").map(item => item.replace(/<\/?span[^>]*>/g, '')),
        rarity: data.RarityId,
        element: data.ElementIdArray[0],
        elementArray: data.ElementIdArray,
        echo: data.AttributeComponent.PropertyId,
        attr: {
          Mass: "-", //重量
          WeakTime: "-", //共振恢复时间
          ParalysisTime: "-", //最大瘫痪时间
          Res: {
            PhyRes: data.Properties.DamageResistancePhys.Value,
            GlaRes: data.Properties.DamageResistanceElement1.Value,
            FusRes: data.Properties.DamageResistanceElement2.Value,
            EleRes: data.Properties.DamageResistanceElement3.Value,
            AerRes: data.Properties.DamageResistanceElement4.Value,
            SpeRes: data.Properties.DamageResistanceElement5.Value,
            HavRes: data.Properties.DamageResistanceElement6.Value
          },
          hp: HPattr,
          def: DEFattr,
          atk: ATKattr,
          hardness: HARattr, //共振度
          rage: REGattr //狂暴度
        }
      }
      console.log('[liangshi-calc]数据处理完成')
      let path = `./plugins/miao-plugin/resources/meta-mc/monster/${data.Name}/data.json`
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
        console.log(`[liangshi-calc]敌怪：${data.Name} 数据已写入`)
        if (!mode) e.reply(`[liangshi-calc]敌怪：${data.Name}\n数据已写入`)
      } else if (/强制|强行|覆盖/.test(e.msg)) {
        if (!mode) e.reply('[liangshi-calc]敌怪数据已存在，当前为强制模式，尝试覆盖写入。')
        fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
        console.log(`[liangshi-calc]敌怪：${data.Name} 数据已写入`)
        if (!mode) e.reply(`[liangshi-calc]敌怪：${data.Name}\n数据已写入`)
      } else {
        if (!mode) e.reply(`[liangshi-calc]敌怪数据已存在，运行终止。\n如果需要刷新敌怪数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}敌怪数据`)
        console.error(`[liangshi-calc]敌怪：${data.Name}\n数据已存在`)
      }
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath = `./plugins/miao-plugin/resources/meta-mc/monster/data.json`
        if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取敌怪配置data.json失败:', err)
            if (!mode) e.reply(`[liangshi-calc]敌人：${data.Name} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            newValue = { "id": ID, "name": data.Name }
            jsonData[ID] = newValue
            console.log(`[liangshi-calc]敌怪：${data.Name} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => {
              if (err) {
                console.error('[liangshi-calc]敌怪data.json写入失败:\n', err)
                if (!mode) e.reply(`[liangshi-calc]敌怪：${data.Name} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
                return false
              } else { console.log('[liangshi-calc]敌怪data.json已更新') }
            })
          } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
        })
        if (!mode) e.reply(`[liangshi-calc]敌怪：${data.Name} 数据更新完成\n重启后即可使用相关内容`)
      } else { if (!mode) e.reply(`[liangshi-calc]敌怪：${data.Name} 数据更新完成\n当前未启用自动写入MonsterData\n手动配置后重启才可使用\n自动写入MonsterData可在config.yaml启用或使用强制更新临时启用一次`)}
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
            console.log('[liangshi-calc]错误内容已记录')
          }
        })
      }
      return true
    }
  }

  async ItemNew (e, mode) {
    if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
    let cfg = LSconfig.getConfig('user', 'config')
    let response, ProxyUrl, data, url, apiKey, itemJson
    if (cfg.mcApi === 3 ) apiKey = "-v2"; else apiKey = ""
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = ""}
    let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?$/)
    try {
      let ID = TextData[4]
      try {
        response = await fetch(`${ProxyUrl}https://api${apiKey}.encore.moe/api/zh-Hans/item/${TextData[4]}`)
        console.log(`${ProxyUrl}https://api${apiKey}.encore.moe/api/zh-Hans/item/${TextData[4]}`)
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
        console.log(`[liangshi-calc]云端数据读取成功`)
      } catch (err) {
        if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
        console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
        return false
      }
      let ItemData, ItemName, ItemType
      url = `${ProxyUrl}${data.Icon}`
      let imgs = `./plugins/miao-plugin/resources/meta-mc/material`
      ItemType = data?.TypeName
      ItemData = {
        "id": ID,
        "name": data.Name,
        "type": ItemType,
        "tag": data.TypeName,
        "Desc": data.AttributesDescription.split('\n'),
        "Bg": data.BgDescription?.split('\n'),
        "Source": data.AccessDescriptions,
        "star": data.QualityId,
        "Bag": data.ShowInBag, //是否显示在背包中
        "Del": data.Destructible, //是否可被摧毁
        "Use": data.ShowUseButton, //是否可在背包中使用
        "Red": data.RedDotDisableRule, //获得时是否有红点
        "Capcity": data.MaxCapcity, //最大容量
        "Stackable": data.MaxStackableNum, //最大堆叠
        "Dec": data.DecomposeInfo, //分解产物
        "Leve": data.UseLevel //使用等级限制
      }
      ItemName = data.Name
      await this.getImg(ProxyUrl + url, `${imgs}/${ItemType}/${data.Name}.webp`, "图标")
      if (!mode) e.reply(`[liangshi-calc]物品图片资源下载完成`)
      if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
        let filePath = `./plugins/miao-plugin/resources/meta-mc/material/data.json`
        if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
        fs.readFile(filePath, 'utf8', (err, TextData) => {
          if (err) {
            console.error('[liangshi-calc]读取物品配置data.json失败:', err)
            if (!mode) e.reply(`[liangshi-calc]物品：${ItemName} 数据更新完成\n尝试自动写入data时失败\n请手动添加后重启使用`)
            return false
          }
          try {
            let jsonData = JSON.parse(TextData)
            jsonData[ItemName] = ItemData
            console.log(`[liangshi-calc]物品：${ItemName} 配置data.json成功`)
            let updatedData = JSON.stringify(jsonData, null, 2)
            fs.writeFile(filePath, updatedData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]物品data.json写入失败:\n', err); if (!mode) e.reply(`[liangshi-calc]物品：${ItemName} 数据更新完成\n尝试自动写入Data时失败\n请手动添加后重启使用`); return false } else { console.log('[liangshi-calc]物品data.json已更新')}})
          } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
        })
        if (!mode) e.reply(`[liangshi-calc]物品：${ItemName} 数据更新完成\n重启后即可使用相关内容`)
      } else { if (!mode) e.reply(`[liangshi-calc]物品：${ItemName} 数据更新完成\n当前未启用自动写入ItemData\n手动配置后重启才可使用\n自动写入ItemData可在config.yaml启用或使用强制更新临时启用一次`)}
      return true
    } catch (err) {
     if (!mode) {
       e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
     } else {
       console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData}数据 进行手动更新\n${err}`)
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
           console.log('[liangshi-calc]错误内容已记录')
         }
       })
     }
     return true
    }
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
          fs.writeFile(filePath, bbxzData, 'utf8', (err) => {if (err) { console.error('[liangshi-calc]下载失败内容已记录失败:\n', err); return false } else { console.log('[liangshi-calc]下载失败内容已记录') }})
          return false
        }
        console.log(`[liangshi-calc]下载${name}图片成功`)
        return true
      }
      console.log(`[liangshi-calc]下载${name}图片成功`)
      return true
    } catch (err) {
      console.log(err)
      return true
    }
  }
}
