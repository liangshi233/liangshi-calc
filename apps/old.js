import plugin from '../../../lib/plugins/plugin.js'
import common from '../../../lib/common/common.js'
import { LSconfig } from '#liangshi'
import path from 'node:path'
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
            reg: '^#*(梁氏|liangshi)?(查询|检查|查看)(鸣潮|原神)?(资源|数据)版本(更新记录|更新历史记录)?$',
            fnc: 'ver'
          },
          {
            reg: '^#*(梁氏|liangshi)?(回退|回溯|撤回)(鸣潮|原神)?(.*?)(资源|数据)更新$',
            fnc: 'back'
          }
        ]
      }
    )
  }

  async back (e) {
    let cfg = LSconfig.getConfig('user', 'config')
    let dataPath, Json, game, s, CharacterText, WeaponText, ArtifactText, ItemText, CharacterNamedata, WeaponNamedata, ArtifactNamedata, Itemdata, CharacterNameText, WeaponNameText, ArtifactNameText, ItemNameText, ProxyUrl = ""
    if (cfg.ProxyUrl) ProxyUrl = cfg.ProxyUrl
    if (/原神/.test(e.msg)) {
      game = "gi"
      s = "artifact"
      dataPath = './plugins/miao-plugin/resources/meta-gs/data.json'
      if (!fs.existsSync(dataPath)) {
        return e.reply('你还没有安装过，无法回退(*/ω＼*)\n使用 #梁氏一键更新原神最新版本资源 可安装新内容')
      } else {
        Json = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      }
    } else {
      game = "ww"
      s = "echo"
      dataPath = './plugins/miao-plugin/resources/meta-mc/data.json'
      if (!fs.existsSync(dataPath)) {
        return e.reply('你还没有安装过，无法回退(*/ω＼*)\n使用 #梁氏一键更新鸣潮最新版本资源 可安装新内容')
      } else {
        Json = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      }
    }
    let time = e.msg.match(/^#*(梁氏|liangshi)?(回退|回溯|撤回)(鸣潮|原神)?(.*?)(资源|数据)更新$/)
    if (Json[time[4]]) {
      if (Json[time[4]].status === "完整") return e.reply('[liangshi-calc]该更新为全量更新，不支持回退(*/ω＼*)')
      if (Json[time[4]].status === "回退") return e.reply('[liangshi-calc]该更新已被回退，请勿重复回退(*/ω＼*)')
      e.reply('[liangshi-calc]开始回退，请稍候')
      let character = Json[time[4]].character
      let weapon = Json[time[4]].weapon
      let artifact = Json[time[4]].artifact
      let itme = Json[time[4]].material
      CharacterText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/character.json`)
      WeaponText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/weapon.json`)
      ArtifactText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/${s}.json`)
      ItemText = await fetch(`${ProxyUrl}https://api.hakush.in/${game}/data/zh/item_all.json`)
      CharacterNamedata = await CharacterText.json()
      WeaponNamedata = await WeaponText.json()
      ArtifactNamedata = await ArtifactText.json()
      Itemdata = await ItemText.json()
      if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {
        CharacterNameText = character.map(num => CharacterNamedata[num.toString()]?.["zh-Hans"] ?? `${num.toString()}`)
        WeaponNameText = weapon.map(num => WeaponNamedata[num.toString()]?.["zh-Hans"] ?? `${num.toString()}`)
        ArtifactNameText = artifact.map(num => ArtifactNamedata[num.toString()]?.["zh-Hans"] ?? `${num.toString()}`)
        ItemNameText = itme.map(num => Itemdata[num.toString()]?.["Name"] ?? `${num.toString()}`)
      } else {
        CharacterNameText = character.map(num => CharacterNamedata[num.toString()]?.CHS ?? `${num.toString()}`)
        WeaponNameText = weapon.map(num => WeaponNamedata[num.toString()]?.CHS ?? `${num.toString()}`)
        ArtifactNameText = artifact.map(id => {
          let item = ArtifactNamedata[id]
          if (!item?.set) return "未知套装"
          const firstSetKey = Object.keys(item.set)[0]
          return item.set[firstSetKey]?.name?.CHS ?? "未知名字"
        })
        ItemNameText = itme.map(num => Itemdata[num.toString()]?.["Name"] ?? `${num.toString()}`)
      }
      CharacterNameText.forEach(name => {
        let targetDir = path.join(dataPath.replace(/\/data.json/g, ''), "character", name)
        if (fs.existsSync(targetDir)) try {fs.rmSync(targetDir, { recursive: true, force: true })} catch {}
      })
      character = character.map(item => String(item))
      let CharacterJsonPath = path.join(dataPath.replace(/\/data.json/g, ''), "character", "data.json")
      let CharacterJson = JSON.parse(fs.readFileSync(CharacterJsonPath, 'utf8'))
      Object.keys(CharacterJson).forEach(key => {if (character.includes(key)) delete CharacterJson[key]})
      fs.writeFileSync(CharacterJsonPath, JSON.stringify(CharacterJson, null, 2) + '\n', 'utf8')
      artifact = artifact.map(item => String(item))
      ArtifactNameText.forEach(name => {
        let targetDir = path.join(dataPath.replace(/\/data.json/g, ''), "artifact/imgs", name)
        if (fs.existsSync(targetDir)) try {fs.rmSync(targetDir, { recursive: true, force: true })} catch {}
      })
      let ArtifactJsonPath = path.join(dataPath.replace(/\/data.json/g, ''), "artifact", "data.json")
      let ArtifactJson = JSON.parse(fs.readFileSync(ArtifactJsonPath, 'utf8'))
      Object.keys(ArtifactJson).forEach(key => {if (artifact.includes(key)) delete ArtifactJson[key]})
      fs.writeFileSync(ArtifactJsonPath, JSON.stringify(ArtifactJson, null, 2) + '\n', 'utf8')
      weapon = weapon.map(item => String(item))
      let WeaponKeyPath = path.join(dataPath.replace(/\/data.json/g, ''), "weapon")
      WeaponKeyPath = fs.readdirSync(WeaponKeyPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
      WeaponKeyPath.forEach(subDir => {
        let WeaponKey = path.join(path.join(dataPath.replace(/\/data.json/g, ''), "weapon"), subDir)
        WeaponNameText.forEach(name => {
          let targetDir = path.join(WeaponKey, name)
          if (fs.existsSync(targetDir)) try {fs.rmSync(targetDir, { recursive: true, force: true })} catch {}
        })
      })
      let basePath = path.join(dataPath.replace(/\/data.json/g, ''), "weapon")
      let subDirs = fs.readdirSync(basePath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
      for (const dir of subDirs) {
        let filePath = path.join(basePath, dir, 'data.json')
        let data = fs.readFileSync(filePath, 'utf8')
        let jsonData = JSON.parse(data)
        Object.keys(jsonData).forEach(key => {if (weapon.includes(key)) delete jsonData[key]})
        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf8')
      }
      ItemNameText = ItemNameText.map(item => String(item))
      let ItemKeyPath = path.join(dataPath.replace(/\/data.json/g, ''), "material")
      ItemKeyPath = fs.readdirSync(ItemKeyPath, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name)
      ItemKeyPath.forEach(subDir => {
        let ItemKey = path.join(path.join(dataPath.replace(/\/data.json/g, ''), "material"), subDir)
        let entries = fs.readdirSync(ItemKey, { withFileTypes: true })
        entries.forEach(entry => {
          let targetPath = path.join(ItemKey, entry.name)
          if (entry.isFile()) {
            let ext = path.extname(entry.name).toLowerCase()
            if (ext === '.webp' || ext === '.WEBP') {
              let baseName = path.basename(entry.name, ext)
              if (ItemNameText.includes(baseName)) try {fs.unlinkSync(targetPath)} catch {}
            }
          } else if (entry.isDirectory()) {
            if (ItemNameText.includes(entry.name)) try {fs.rmSync(targetPath, { recursive: true, force: true })} catch {}
          }
        })
      })
      let ItemJsonPath = path.join(dataPath.replace(/\/data.json/g, ''), "material", "data.json")
      let ItemJson = JSON.parse(fs.readFileSync(ItemJsonPath, 'utf8'))
      Object.keys(ItemJson).forEach(key => {if (ItemNameText.includes(key)) delete ItemJson[key]})
      fs.writeFileSync(ItemJsonPath, JSON.stringify(ItemJson, null, 2) + '\n', 'utf8')
      Json[time[4]].status = "回退"
      fs.writeFileSync(dataPath, JSON.stringify(Json, null, 2) + '\n', 'utf8')
      e.reply('[liangshi-calc]回退成功,重启后生效')
    } else {
      return e.reply('错误的日期，可使用 #梁氏查询鸣潮数据版本更新记录 查询您更新的时间\n示例 #梁氏回退鸣潮1970-01-01 00:00数据更新')
    }
  }

  async ver (e) {
    let cfg = LSconfig.getConfig('user', 'config')
    let gsPath = './plugins/miao-plugin/resources/meta-gs/data.json'
    let mcPath = './plugins/miao-plugin/resources/meta-mc/data.json'
    let gsNew, mcNew, gsTime, mcTime, gsJson, mcJson, gsResponse, mcResponse
    let ProxyUrl = ""
    if (cfg.ProxyUrl) ProxyUrl = cfg.ProxyUrl
    try {
      let gsUrl = `${ProxyUrl}https://api.hakush.in/gi/new.json`
      let mcUrl = `${ProxyUrl}https://api.hakush.in/ww/new.json`
      gsResponse = await fetch(gsUrl)
      gsResponse = await gsResponse.json()
      mcResponse = await fetch(mcUrl)
      mcResponse = await mcResponse.json()
    } catch (err) {
      gsResponse.version = "加载失败"
      mcResponse.version = "加载失败"
    }
    if (!fs.existsSync(gsPath)) {
      gsNew = '未安装过更新'
      gsTime = '无'
    } else {
      gsJson = JSON.parse(fs.readFileSync(gsPath, 'utf8'))
      gsNew = gsJson.ver
      gsTime = gsJson.time
    }
    if (!fs.existsSync(mcPath)) {
      mcNew = '未安装过更新'
      mcTime = '无'
    } else {
      mcJson = JSON.parse(fs.readFileSync(mcPath, 'utf8'))
      mcNew = mcJson.ver
      mcTime = mcJson.time
    }
    if (/更新记录|更新历史记录/.test(e.msg)) {
      let verKey, verJson
      if (/原神/.test(e.msg)) {
        e.reply(`[liangshi-calc]数据更新历史记录\n当前版本：${gsNew}(当前最新:${gsResponse.version})`)
        verKey = Object.keys(gsJson)
        verJson = gsJson
      } else {
        e.reply(`[liangshi-calc]数据更新历史记录\n当前版本：${mcNew}(当前最新:${mcResponse.version})`)
        verKey = Object.keys(mcJson)
        verJson = mcJson
      }
      e.reply('---历史更新记录(最近5次)---')
      await common.sleep(1000)
      let count = 1
      if (verKey.length >= 3) {
        let verData = verKey.slice(2)
        verData = verData.length >= 5 ? verData.slice(-5) : verData
        verData = [...verData].reverse()
        for (const key of verData) {
          e.reply(`${count}.\n更新时间：${verJson[key].time}\n更新版本：${verJson[key].ver}\n更新角色数：${verJson[key].character.length}\n更新武器数：${verJson[key].weapon.length}\n更新装备数：${verJson[key].artifact.length}\n更新物品数：${verJson[key].material.length}\n更新状态：${verJson[key].status || "正常"}`)
          count++
          await common.sleep(200)
        }
      } else {
        e.reply('你还没有更新过(*/ω＼*)')
      }
      return true
    }
    e.reply(`[liangshi-calc]当前安装的版本\n原神：${gsNew}(当前最新:${gsResponse.version})\n最后更新时间:${gsTime}\n鸣潮：${mcNew}(当前最新:${mcResponse.version})\n最后更新时间:${mcTime}`)
  }
}
