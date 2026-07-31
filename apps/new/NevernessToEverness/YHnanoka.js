import common from '../../../../../lib/common/common.js'
import { Common } from '../../../components/index.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'


/**
 * 异环API2
 * nanoka.cc
 *
 * 如果有新的问题建议去issue反馈
 */


export async function New (e) {
  let cfg = LSconfig.getConfig('user', 'config')
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let characterTime, weaponTime, artifactTime, monsterTime, itemTime, character, status, response, ProxyUrl, artifact, data, weapon, monster, ItemJson, ConsoleJson, ItemOk, ConsoleOK
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  try {
    response = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
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
  character = data.nte.new.character || []
  weapon = data.nte.new.weapon || []
  artifact = data.nte.new.console || []
  monster = data.nte.new.monster || []
  data.item = data.nte.new.item || []
  let ver = data.nte.latest
  if (/完整|全部/.test(e.msg)) {
    status = "完整"
    try {
      let Characterurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${ver}/character.json`)
      Characterurl = await Characterurl.json()
      character = Object.keys(Characterurl)
      let Weaponurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${ver}/weapon.json`)
      Weaponurl = await Weaponurl.json()
      weapon = Object.keys(Weaponurl)
      let Artifacturl = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${ver}/zh/console.json`)
      Artifacturl = await Artifacturl.json()
      artifact = Object.keys(Artifacturl)
      let Monsterurl = null
      monster = []
      let Itemurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${ver}/zh/item.json`)
      Itemurl = await Itemurl.json()
      data.item = Object.keys(Itemurl)
    } catch (err) { console.error(err) }
  }
  if (/角色|共鸣者/.test(e.msg)) {
    weapon = [], artifact = [], data.item = [], monster = []
  } else if (/武器|光锥|弧盘/.test(e.msg)) {
    character = [], artifact = [], data.item = [], monster = []
  } else if (/圣遗物|遗器|声骸|终端|卡带/.test(e.msg)) {
    character = [], weapon = [], data.item = [], monster = []
  } else if (/物品|材料/.test(e.msg)) {
    character = [], weapon = [], artifact = [], monster = []
  } else if (/敌人|敌怪|怪物|残响|残像|boss|BOSS|异象/.test(e.msg)) {
    character = [], weapon = [], artifact = [], data.item = []
  }
  let UseTime = Math.round(((5 + character.length * 16 + weapon.length * 2 + artifact.length * 1 + monster.length * 1 + data.item.length * 2) / 60) * 10) / 10
  let y = Math.round(UseTime * 0.75 * 10) / 10
  e.reply(`[liangshi-calc] 即将静默更新\n异环 ${ver}版本新内容\n共计\n\n${character.length}名新角色\n${weapon.length}个新弧盘\n${artifact.length}个新终端\n${monster.length}个新异象\n${data.item.length}个新物品\n\n预计需要${y}~${UseTime}分钟，请耐心等待.\n(*/ω＼*)`)
  await common.sleep(2000)
  ItemOk = true, ConsoleOK = true
  if (!fs.existsSync("./plugins/liangshi-calc/resources/log.json")) { fs.writeFileSync("./plugins/liangshi-calc/resources/log.json", '{}'); console.log(`[liangshi-calc]未找到错误日志文件，已自动创建`)}
  try {
    let url = `${ProxyUrl}https://static.nanoka.cc/nte/${ver}/zh/item.json`
    let url2 = `${ProxyUrl}https://static.nanoka.cc/nte/${ver}/zh/console.json`
    if (data.item.length > 0) {
      ItemJson = await fetch(url)
      if (!response.ok) ItemOk = false
      ItemJson = await ItemJson.json()
      fs.writeFile(`./plugins/liangshi-calc/resources/ItemJson.json`, JSON.stringify(ItemJson), 'utf8', (err) => { if (err) { ItemOk = false } else { console.log(`[liangshi-calc] 物品Json已缓存至本地`) }})
    }
    if (artifact.length > 0) {
      ConsoleJson = await fetch(url2)
      if (!response.ok) ConsoleOK = false
      ConsoleJson = await ConsoleJson.json()
      fs.writeFile(`./plugins/liangshi-calc/resources/ConsoleJson.json`, JSON.stringify(ConsoleJson), 'utf8', (err) => { if (err) { ItemOk = false } else { console.log(`[liangshi-calc] 终端Json已缓存至本地`) }})
    }
  } catch (err) { ItemOk = false; console.error(`[liangshi-calc] Json缓存失败\n${err}`) }
  let instruction = { msg: null, isMaster: true, reply: e.reply }
  for (const charId of character) {
    instruction.msg = `#梁氏覆盖更新异环${charId}角色数据`
    await common.sleep(2000)
    /await CharacterNew(instruction, true, ItemOk)
  }
  characterTime =  `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const weaponId of weapon) {
    instruction.msg = `#梁氏覆盖更新异环${weaponId}武器数据`
    await common.sleep(1500)
    await WeaponNew(instruction, true)
  }
  weaponTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const artifactId of artifact) {
    await common.sleep(1500)
    instruction.msg = `#梁氏覆盖更新异环${artifactId}声骸数据`
    await ArtifactNew(instruction, true, ConsoleOK)
  }
  artifactTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const monsterId of monster) {
    //await common.sleep(1500)
    instruction.msg = `#梁氏覆盖更新异环${monsterId}敌人数据`
    //await MonsterNew(instruction, true)
  }
  monsterTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const itemId of data.item) {
    await common.sleep(1000)
    instruction.msg = `#梁氏覆盖更新异环${itemId}物品数据`
    await ItemNew(instruction, true, ItemOk)
  }
  itemTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  let verDataPath = `./plugins/miao-plugin/resources/meta-yh/data.json`
  if (!fs.existsSync(verDataPath)) fs.writeFileSync(verDataPath, '{}')
  fs.readFile(verDataPath, 'utf8', (err, TextData) => {
    if (err) return false
    try {
      let verData = JSON.parse(TextData)
      let Time = new Date()
      let dayTime = `${Time.getFullYear()}-${Time.getMonth() + 1}-${Time.getDate()} ${Time.getHours()}:${Time.getMinutes()}`
      verData.ver = ver
      verData.time = dayTime
      let api = "nanoka.cc"
      verData[dayTime] = {
        "ver": ver,
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
  if (data.item.length > 0) { fs.unlink('./plugins/liangshi-calc/resources/ItemJson.json', (err) => { if (err) { console.error('[liangshi-calc] 物品Json缓存删除失败:', err.message) } else { console.log(`[liangshi-calc] 物品Json缓存已删除`) }})}
  if (artifact.length > 0) { fs.unlink('./plugins/liangshi-calc/resources/ConsoleJson.json', (err) => { if (err) { console.error('[liangshi-calc] 终端Json缓存删除失败:', err.message) } else { console.log(`[liangshi-calc] 终端Json缓存已删除`) }})}
  let CharacterNamedata, CharacterText, WeaponText, WeaponNamedata, ArtifactText, ArtifactNamedata, MonsterText, MonsterNamedata
  try {
    CharacterText = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${ver}/character.json`)
    WeaponText = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${ver}/weapon.json`)
    ArtifactText = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${ver}/zh/console.json`)
    MonsterText = null
    CharacterNamedata = await CharacterText.json()
    WeaponNamedata = await WeaponText.json()
    ArtifactNamedata = await ArtifactText.json()
    MonsterNamedata = {}
    console.log(`[liangshi-calc]云端数据读取成功`)
  } catch (err) {
    console.warn(`[liangshi-calc]云端数据读取异常`)
    e.reply('[liangshi-calc]网络不佳，请稍后重试')
    return false
  }
  let CharacterNameText, WeaponNameText, ArtifactNameText, MonsterNameText
  CharacterNameText = character.map(id => CharacterNamedata[`${id}`].zh)
  WeaponNameText = weapon.map(id => WeaponNamedata[`${id}`].zh)
  ArtifactNameText = artifact.map(id => ArtifactNamedata[`${id}`].name)
  MonsterNameText = []
  try {
    let c, h
    c = fs.readFileSync('./plugins/miao-plugin/resources/meta-yh/character/data.json', 'utf8')
    c = JSON.parse(c)
    h = fs.readFileSync('./plugins/miao-plugin/resources/meta-yh/weapon/data.json', 'utf8')
    h = JSON.parse(h)
    let chars = character.filter(id => c.hasOwnProperty(id)).map(id => ({
      face: `/meta-yh/character/${c[id].name}/imgs/face.webp`,
      name: c[id].name || "无名",
      abbr: c[id].abbr || c[id].name || "",
      star: c[id].star
    }))

    let weapons = weapon.filter(id => h.hasOwnProperty(id)).map(id => ({
      face: `/meta-yh/weapon/${h[id].type}/${h[id].name}/icon.webp`,
      name: h[id].name,
      abbr: h[id].abbr || h[id].name,
      star: h[id].star
    }))

    let artis = ArtifactNameText.map(id => ({
      face: `/meta-yh/artifact/${/^[\u2160-\u2183]+型驱动$/.test(id) ? id : id}/5.webp`,
      name: id,
      star: 5
    }))
    let consoleKey = { "Ⅱ型驱动": "cell2_style1_1", "Ⅲ型驱动": "cell3_style1_1", "Ⅳ型驱动": "cell4_style1_1" }
    let monster = MonsterNameText.map(id => ({
      face: `/meta-yh/monster/${/^cell\d+_style\d+_\d+$/.test(id) ? consoleKey[id] : id}/preview.webp`,
      name: id,
      star: 5
    }))
    return await Common.render('wiki/data/ver-new', {
      gamever: ver,
      gameid: "异环",
      TxName: {
        js: "角色",
        wq: "弧盘",
        zb: "终端",
        dr: "异象"
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
      servName: "nanoka.cc",
      updateTime: { characterTime, weaponTime, artifactTime, monsterTime, itemTime },
      elem: 'hydro'
    }, { e, scale: 1.6, retType: 'base64' })
  } catch (err) {
    console.error('[liangshi-calc] 生成图片时遇到了一些问题，但这并不影响功能:', err)
    if (CharacterNameText.length === 0) CharacterNameText = `本次没有更新任何角色`
    if (WeaponNameText.length === 0) WeaponNameText = `本次没有更新任何弧盘`
    if (ArtifactNameText.length === 0) ArtifactNameText = `本次没有更新任何终端`
    if (MonsterNameText.length === 0) MonsterNameText = `本次没有更新任何异象`
    e.reply(`[liangshi-calc] 异环 ${ver} 版本更新完成\n已为您更新\n\n角色：\n${CharacterNameText}\n\n弧盘：\n${WeaponNameText}\n\n终端：\n${ArtifactNameText}\n\n异象：\n${MonsterNameText}\n\n物品${data.item.length}个\n\n重启后即可使用相关内容`)
    return false
  }
}

export async function CharacterNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(异环|YH|yh|NTE|nte)(.*?)(角色|共鸣者)(数据|资源|资源数据)?(.*?)$/)
  let CharacterId = TextData[4], verLeve, itemdata
  try {
    if (/^\d{4}$/.test(CharacterId) || /强制|强行|覆盖/.test(e.msg)) {
      console.log(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
      if (!mode) e.reply(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
    } else {
      console.error(`[liangshi-calc]未知的角色ID:${CharacterId}`)
      if (!mode) e.reply('[liangshi-calc]角色ID错误，请检查角色ID格式(4位数字)')
      return false
    }
    let response, ProxyUrl, CharacterData, url, data, verUrl
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.nte.latest
      } else { verLeve = version }
      url = `${ProxyUrl}https://static.nanoka.cc/nte/${verLeve}/zh/character/${CharacterId}.json`
      response = await fetch(url)
      if (!response.ok) { console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`); throw new Error() }
      data = await response.json()
      console.log(`[liangshi-calc]角色：${data.name || "无名"} 云端数据读取成功`)
    } catch (err) {
      console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
      if (response.status === 404) {
        if (!mode) e.reply('[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新')
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
    let CharacterName = data.name.replace(/<\/?unbreak>/g, '').replace(/\./g, '') || "无名"
    let imgs = `./plugins/miao-plugin/resources/meta-yh/character/${CharacterName}/imgs`
    if (!fs.existsSync(imgs)) { fs.mkdirSync(imgs, { recursive: true }); console.log(`[liangshi-calc]角色：${CharacterName} 本地imgs文件夹创建成功`) }
    if (!JsonOk || !fs.existsSync("./plugins/liangshi-calc/resources/ItemJson.json")) {
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${verLeve}/zh/item.json`)
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
      itemdata = await response.json()
      console.log(`[liangshi-calc]云端数据读取成功`)
    } else {
      response = fs.readFileSync("./plugins/liangshi-calc/resources/ItemJson.json", 'utf8')
      itemdata = JSON.parse(response)
      console.log(`[liangshi-calc]本地数据读取成功`)
    }
    let taleData = (a) => {
      return a.map(item => {
        item.name = item.label; item.isSame = item.values.every(val => val === item.values[0]);
        let pr = item.values.map(val => { return val.match(/[\u4e00-\u9fa5]+/g) ? val.match(/[\u4e00-\u9fa5]+/g).join('') : '' })
        if (pr[0] && pr.every(part => part === pr[0])) { item.unit = pr[0]; item.values = item.values.map(val => val.replace(/[\u4e00-\u9fa5]+/g, '')) } else { item.unit = '' }
        delete item.label; delete item.key;
        return { name: item.name, isSame: item.isSame, unit: item.unit, values: item.values }
      }) ?? []
    }
    let taleKey = (a) => {
      let cd = a.replace(/[^\d.%+\-*/]/g, '')
      if (!/[+\-*/]/.test(cd)) return parseFloat(cd.replace('%', ''))
      return cd.split(/[+\-*/]/).filter(s => s.length > 0).map(s => parseFloat(s.replace('%', '')))
    }
    CharacterData = {
      "id": CharacterId,
      "name": CharacterName,
      "abbr": CharacterName.length > 4 ? CharacterName.slice(-2) : CharacterName,
      "star": data.rarity,
      "elem": data.element_name,
      "allegiance": data.faction,
      "weapon": "",
      "birth": "",
      "desc": data.desc,
      "cncv": data.voice_chinese,
      "jpcv": data.voice_japanese,
      "costume": false,
      "tag": {
        "name": data.char_tags.map(item => item.name)
      },
      "ver": 1,
      "growAttr": {
        "type": data.equip_slots.special_desc,
        "key": data.equip_slots.stats[0].name,
        "value": data.equip_slots.stats[0].value
      },
      "baseAttr": {
        "atk": data.stats?.[1]?.values[79],
        "hp": data.stats?.[0]?.values[79],
        "def": data.stats?.[2]?.values[79],
        "cpct": data.stats?.[3]?.values[79],
        "cdmg": data.stats?.[4]?.values[79]
      },
      "materials": {
        "boss": Object.values(itemdata).find(v => v.id === data.breakthrough[5].items_id[1])?.name,
        "normal": Object.values(itemdata).find(v => v.id === data.breakthrough[5].items_id[0])?.name,
        "talent": Object.values(itemdata).find(v => v.id === data.abilities[0].materials[8].items_id[1])?.name,
        "weekly": Object.values(itemdata).find(v => v.id === data.abilities[0].materials[8].items_id[3])?.name
      },
      "talent": {
        "a": {
          "name": data.abilities[0]?.name,
          "desc": data.abilities[0]?.phases.flatMap(item => [`<h3>${item.name.replace(/<[^>]*>/g, '')}</h3>`, ...item.desc.replace(/<[^>]*>/g, '').split('\r\n')]),
          "tables": taleData(data.abilities[0]?.param_rows)
        },
        "e": {
          "name": data.abilities[1]?.name,
          "desc": data.abilities[1]?.phases.flatMap(item => [`<h3>${item.name.replace(/<[^>]*>/g, '')}</h3>`, ...item.desc.replace(/<[^>]*>/g, '').split('\r\n')]),
          "tables": taleData(data.abilities[1]?.param_rows)
        },
        "q": {
          "name": data.abilities[2]?.name,
          "desc": data.abilities[2]?.phases.flatMap(item => [`<h3>${item.name.replace(/<[^>]*>/g, '')}</h3>`, ...item.desc.replace(/<[^>]*>/g, '').split('\r\n')]),
          "tables": taleData(data.abilities[2]?.param_rows)
        },
        "t": {
          "name": data.abilities[3]?.name,
          "desc": data.abilities[3]?.phases.flatMap(item => [`<h3>${item.name.replace(/<[^>]*>/g, '')}</h3>`, ...item.desc.replace(/<[^>]*>/g, '').split('\r\n')]),
          "tables": taleData(data.abilities[3]?.param_rows)
        }
      },
      "talentData": {
        "a": data.abilities[0]?.param_rows.reduce((acc, item) => { acc[item.name] = item.values.map(value => taleKey(value)); return acc }, {}),
        "e": data.abilities[1]?.param_rows.reduce((acc, item) => { acc[item.name] = item.values.map(value => taleKey(value)); return acc }, {}),
        "q": data.abilities[2]?.param_rows.reduce((acc, item) => { acc[item.name] = item.values.map(value => taleKey(value)); return acc }, {}),
        "t": data.abilities[3]?.param_rows.reduce((acc, item) => { acc[item.name] = item.values.map(value => taleKey(value)); return acc }, {}),
      },
      "cons": {
        "1": {
          "name": data.awaken?.[0]?.name,
          "desc": data.awaken?.[0]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        "2": {
          "name": data.awaken?.[1]?.name,
          "desc": data.awaken?.[1]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        "3": {
          "name": data.awaken?.[2]?.name,
          "desc": data.awaken?.[2]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        "4": {
          "name": data.awaken?.[3]?.name,
          "desc": data.awaken?.[3]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        "5": {
          "name": data.awaken?.[4]?.name,
          "desc": data.awaken?.[4]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        "6": {
          "name": data.awaken?.[5]?.name,
          "desc": data.awaken?.[5]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        "7": {
          "name": data.resonance?.[0]?.name,
          "desc": data.resonance?.[0]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        "8": {
          "name": data.resonance?.[1]?.name,
          "desc": data.resonance?.[1]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        }
      },
      "passive": [
        {
          "name": data.abilities[4]?.name,
          "desc": data.abilities[4]?.phases[0]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        {
          "name": data.abilities[5]?.name,
          "desc": data.abilities[5]?.phases[0]?.desc.replace(/<[^>]*>/g, '').split('\r\n')
        },
        {
          "name": data.abilities[6]?.name,
          "desc": data.abilities[6]?.phases?.map(o => o.desc.replace(/<Green2>(.*?)<\/>/g,'$1'))
        },
        {
          "name": data.abilities[7]?.name,
          "desc": data.abilities[7]?.phases?.map(o => o.desc.replace(/<Green2>(.*?)<\/>/g,'$1'))
        }
      ],
      "attr": {
        "details": {
          "1": [
            data.stats?.[0]?.values[0],
            data.stats?.[1]?.values[0],
            data.stats?.[2]?.values[0],
            data.stats?.[3]?.values[0],
            data.stats?.[4]?.values[0]
          ],
          "20": [
            data.stats?.[0]?.values[19],
            data.stats?.[1]?.values[19],
            data.stats?.[2]?.values[19],
            data.stats?.[3]?.values[19],
            data.stats?.[4]?.values[19]
          ],
          "30": [
            data.stats?.[0]?.values[29],
            data.stats?.[1]?.values[29],
            data.stats?.[2]?.values[29],
            data.stats?.[3]?.values[29],
            data.stats?.[4]?.values[29]
          ],
          "40": [
            data.stats?.[0]?.values[39],
            data.stats?.[1]?.values[39],
            data.stats?.[2]?.values[39],
            data.stats?.[3]?.values[39],
            data.stats?.[4]?.values[39]
          ],
          "50": [
            data.stats?.[0]?.values[49],
            data.stats?.[1]?.values[49],
            data.stats?.[2]?.values[49],
            data.stats?.[3]?.values[49],
            data.stats?.[4]?.values[49]
          ],
          "60": [
            data.stats?.[0]?.values[59],
            data.stats?.[1]?.values[59],
            data.stats?.[2]?.values[59],
            data.stats?.[3]?.values[59],
            data.stats?.[4]?.values[59]
          ],
          "70": [
            data.stats?.[0]?.values[69],
            data.stats?.[1]?.values[69],
            data.stats?.[2]?.values[69],
            data.stats?.[3]?.values[69],
            data.stats?.[4]?.values[69]
          ],
          "80": [
            data.stats?.[0]?.values[79],
            data.stats?.[1]?.values[79],
            data.stats?.[2]?.values[79],
            data.stats?.[3]?.values[79],
            data.stats?.[4]?.values[79]
          ]
        }
      }
    }
    CharacterData.passive = CharacterData.passive.filter(mhy => Object.values(mhy).some(op => op !== undefined))
    for (let key of Object.keys(CharacterData.talent)) { if (!CharacterData.talent[key].desc && !CharacterData.talent[key].name) { delete CharacterData.talent[key] } }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-yh/character/${CharacterName}/data.json`
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
      if (!mode) e.reply(`[liangshi-calc]角色数据已存在，运行终止。\n如果需要刷新角色数据至最新预览版本请使用覆盖更新\n例：#覆盖更新异环${CharacterId}数据`)
      console.error(`[liangshi-calc]角色：${CharacterName}\n数据已存在`)
    }
    if (!mode) e.reply(`[liangshi-calc]角色数据资源下载完成`)
    console.log(`[liangshi-calc]开始下载角色图片资源`)
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.fashion[0].portrait_img.replace(/\d$/, '')}.webp`, `${imgs}/splash.webp`, "立绘")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.icon}.webp`, `${imgs}/face.webp`, "侧头")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.fashion[0].display_icon.replace(/_\d$/, '')}.webp`, `${imgs}/gacha.webp`, "gacha")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.abilities[4].icon}.webp`, `${imgs}/tree-0.webp`, "固有天赋1")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.abilities[5].icon}.webp`, `${imgs}/tree-1.webp`, "固有天赋2")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.abilities[6].icon}.webp`, `${imgs}/tree-2.webp`, "都市特技1")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.abilities[6].icon}.webp`, `${imgs}/tree-3.webp`, "都市特技2")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.abilities[0].icon}.webp`, `${imgs}/talent-a.webp`, "普通攻击")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.abilities[1].icon}.webp`, `${imgs}/talent-e.webp`, "变轨技能")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.abilities[2].icon}.webp`, `${imgs}/talent-q.webp`, "极轨终结")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.abilities[3].icon}.webp`, `${imgs}/talent-t.webp`, "援护技")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.awaken[0].icon}.webp`, `${imgs}/cons-1.webp`, "1觉")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.awaken[1].icon}.webp`, `${imgs}/cons-2.webp`, "2觉")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.awaken[2].icon}.webp`, `${imgs}/cons-3.webp`, "3觉")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.awaken[3].icon}.webp`, `${imgs}/cons-4.webp`, "4觉")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.awaken[4].icon}.webp`, `${imgs}/cons-5.webp`, "5觉")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.awaken[5].icon}.webp`, `${imgs}/cons-6.webp`, "6觉")
    if (!mode) e.reply(`[liangshi-calc]角色图片资源下载完成`)
    console.log(`[liangshi-calc]图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = "./plugins/miao-plugin/resources/meta-yh/character/data.json", newValue
      if (!fs.existsSync(filePath)) { console.log('[liangshi-calc]找不到文件data.json，请检查mian-plugin配置'); fs.writeFileSync(filePath, '{}') }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取角色配置data.json失败:\n', err)
          if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
          if (!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}觉醒 查看角色觉醒\n#XX面板换${CharacterName} 通过替换查看角色面板`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          newValue = {
            "id": CharacterId,
            "name": CharacterName,
            "star": data.rarity,
            "elem": data.element_name
          }
          jsonData[CharacterId] = newValue
          console.log(`[liangshi-calc]角色${CharacterId} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]角色data.json写入失败:\n', err)
              if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
              if (!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}觉醒 查看角色觉醒\n#XX面板换${CharacterName} 通过替换查看角色面板`)
              return false
            } else { console.log('[liangshi-calc]角色data.json已更新') }
          })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n重启后即可使用${CharacterName}相关内容`)
      if (!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}觉醒 查看角色觉醒\n#XX面板换${CharacterName} 通过替换查看角色面板`)
    } else {
      if (!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n当前未启用自动写入CharacterData\n手动配置后重启才可使用\n自动写入CharacterData可在config.yaml启用或使用强制更新临时启用一次`)
      if (!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}觉醒 查看角色觉醒\n#XX面板换${CharacterName} 通过替换查看角色面板`)
    }
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

export async function WeaponNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(异环|YH|yh|NTE|nte)(.*?)(武器|光锥|弧盘)(数据|资源|资源数据)?(.*?)$/)
  let WeaponId = TextData[4], verLeve
  try {
    if (/^\d{5}$/.test(WeaponId) || /强制|强行|覆盖/.test(e.msg)) {
      console.log(`[liangshi-calc]开始更新ID:${WeaponId}的弧盘数据`)
      if (!mode) e.reply(`[liangshi-calc]开始更新ID:${WeaponId}的弧盘数据`)
    } else {
      console.error(`[liangshi-calc]未知的弧盘ID:${WeaponId}`)
      if (!mode) e.reply('[liangshi-calc]弧盘ID错误，请检查弧盘ID格式')
      return false
    }
    let response, ProxyUrl, WeaponData, url, data, verUrl, itemdata
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.nte.latest
      } else { verLeve = version }
      url = `${ProxyUrl}https://static.nanoka.cc/nte/${verLeve}/zh/weapon/${WeaponId}.json`
      response = await fetch(url)
      if (!response.ok) { console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`); throw new Error() }
      data = await response.json()
      console.log(`[liangshi-calc]弧盘：${data.name || "无名"} 云端数据读取成功`)
    } catch (err) {
      console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
      if (response.status === 404) {
        if (!mode) e.reply('[liangshi-calc]云端暂无该弧盘数据，可等待一段时间后再更新')
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
    if (!JsonOk || !fs.existsSync("./plugins/liangshi-calc/resources/ItemJson.json")) {
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${verLeve}/zh/item.json`)
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
      itemdata = await response.json()
      console.log(`[liangshi-calc]云端数据读取成功`)
    } else {
      response = fs.readFileSync("./plugins/liangshi-calc/resources/ItemJson.json", 'utf8')
      itemdata = JSON.parse(response)
      console.log(`[liangshi-calc]本地数据读取成功`)
    }
    let type = data.type_name, WeaponName = data.name
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-yh/weapon/${type}/${WeaponName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply(`[liangshi-calc]开始更新弧盘: ${WeaponName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-yh/weapon/${type}/${WeaponName}`, { recursive: true })
      console.log(`[liangshi-calc]弧盘:${WeaponName} 本地文件夹创建成功`)
    } else { if (!mode) e.reply(`[liangshi-calc]弧盘: ${WeaponName} 已经存在，如需更新数据请使用覆盖更新。`); return false }

    WeaponData = {
      "id": WeaponId,
      "name": WeaponName,
      "star": data.rarity,
      "desc": data.description,
      "type": type,
      "attr": {
        "atk": {
          "1": data.stats[0].values[0],
          "20": data.stats[0].values[19],
          "30": data.stats[0].values[29],
          "40": data.stats[0].values[39],
          "50": data.stats[0].values[49],
          "60": data.stats[0].values[59],
          "70": data.stats[0].values[69],
          "80": data.stats[0].values[79]
        },
        "bonusKey": data.stats[1].name,
        "bonusData": {
          "1": data.stats[1].values[0],
          "20": data.stats[1].values[19],
          "30": data.stats[1].values[29],
          "40": data.stats[1].values[39],
          "50": data.stats[1].values[49],
          "60": data.stats[1].values[59],
          "70": data.stats[1].values[69],
          "80": data.stats[1].values[79]
        }
      },
      "materials": {
        "weapon": Object.values(itemdata).find(v => v.id === data.materials[5].items_id[0])?.name,
        "monster": Object.values(itemdata).find(v => v.id === data.materials[5].items_id[1])?.name
      },
      "skill": {
        "name": data.effect?.name,
        "desc": data.effect.description.replace(/<lv>\{(\d+)\}<\/>/g, '$[$1]').replace(/\r\n/g, ''),
        "tables": data.effect?.values.map(item => item.values)
      }
    }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-yh/weapon/${type}/${WeaponName}/data.json`
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
      console.log(`[liangshi-calc]弧盘：${WeaponName} 数据已写入`)
      if (!mode) e.reply(`[liangshi-calc]弧盘：${WeaponName}\n数据已写入`)
    } else if (/强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply('[liangshi-calc]弧盘数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
      console.log(`[liangshi-calc]弧盘：${WeaponName} 数据已写入`)
      if (!mode) e.reply(`[liangshi-calc]弧盘：${WeaponName}\n数据已写入`)
    } else {
      if (!mode) e.reply(`[liangshi-calc]弧盘数据已存在，运行终止。\n如果需要刷新弧盘数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${WeaponId}弧盘数据`)
      console.error(`[liangshi-calc]弧盘：${WeaponName}\n数据已存在`)
      return false
    }
    console.log(`[liangshi-calc]开始下载弧盘图片资源`)
    let imgs = `./plugins/miao-plugin/resources/meta-yh/weapon/${type}/${WeaponName}`
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.icon}.webp`, `${imgs}/icon-s.webp`, "icon-s")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.card_icon}.webp`, `${imgs}/splash.webp`, "splash")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.original_icon}.webp`, `${imgs}/icon.webp`, "icon")
    if (!mode) e.reply(`[liangshi-calc]弧盘图片资源下载完成`)
    console.log(`[liangshi-calc]图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-yh/weapon/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取弧盘配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]弧盘：${WeaponName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[WeaponId] = { "id": WeaponId, "name": WeaponName, "type": type, "star": data.rarity }
          console.log(`[liangshi-calc]弧盘：${WeaponName} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]弧盘data.json写入失败:\n', err)
              if (!mode) e.reply(`[liangshi-calc]弧盘：${WeaponName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
              return false
            } else { console.log('[liangshi-calc]弧盘data.json已更新') }
          })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]弧盘：${WeaponName} 数据更新完成\n重启后即可使用相关内容`)
    } else { if (!mode) e.reply(`[liangshi-calc]弧盘：${WeaponName} 数据更新完成\n当前未启用自动写入WeaponData\n手动配置后重启才可使用\n自动写入WeaponData可在config.yaml启用或使用强制更新临时启用一次`)}
    return false
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`) } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}弧盘数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json"
      let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
      let y = JSON.parse(oldLog)
      y[new Date()] = { name: TextData[4], err, text: "弧盘更新错误" }
      let bbxzData = JSON.stringify(y, null, 2)
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') }})
    }
    return true
  }
}

export async function ArtifactNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(异环|YH|yh|NTE|nte)(.*?)(圣遗物|声骸|遗器|终端|卡带|驱动块)(数据|资源|资源数据)?(.*?)$/)
  let ArtifactId = TextData[4], verLeve, ProxyUrl, response, verUrl, ArtifactData, data
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  try {
    if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ArtifactId}的终端数据`)
    if (!JsonOk || !fs.existsSync("./plugins/liangshi-calc/resources/ConsoleJson.json")) {
      try {
        if (!version) {
          verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
          verUrl = await verUrl.json()
          verLeve = verUrl.nte.latest
        } else { verLeve = version }
        response = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${verLeve}/zh/console.json`)
        if (!response.ok) {
          console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
          if (response.status === 404) {
            if (!mode) e.reply(`[liangshi-calc]云端暂无该终端数据，可等待一段时间后再更新`)
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
    } else {
      response = fs.readFileSync("./plugins/liangshi-calc/resources/ConsoleJson.json", 'utf8')
      data = JSON.parse(response)
      console.log(`[liangshi-calc]本地数据读取成功`)
    }
    data = data[ArtifactId]
    console.log(`[liangshi-calc]开始下载终端图片资源`)
    let imgName = /^cell\d+_style\d+_\d+$/.test(ArtifactId) ? data.type_geometry : data.name
    let imgs = `./plugins/miao-plugin/resources/meta-yh/artifact/${imgName}/`
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.family[2].icon}.webp`, `${imgs}/5.webp`, "img-5")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.family[1].icon}.webp`, `${imgs}/4.webp`, "img-4")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.family[0].icon}.webp`, `${imgs}/3.webp`, "img-3")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.set_effect?.set_icon}.webp`, `${imgs}/skill.webp`, "skill")
    if (!mode) e.reply(`[liangshi-calc]终端图片资源下载完成`)
    console.log(`[liangshi-calc]图片资源下载完成`)
    if (/^cell\d+_style\d+_\d+$/.test(ArtifactId)) {
      ArtifactData = {
        "id": ArtifactId,
        "name": data.name,
        "type": data.type,
        "key": data.type_geometry,
        "num": data.own_grid_num
      }
    } else {
      ArtifactData = {
        "id": ArtifactId,
        "name": data.name,
        "type": data.type,
        "geometry": data.set_effect.geometry.map(item => item.id),
        "skills": data.set_effect.conditions.reduce((acc, item) => {
          acc[item.condition] = item.desc; return acc;
        }, {})
      }
    }

    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-yh/artifact/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) { console.error('[liangshi-calc]读取终端配置data.json失败:', err); if (!mode) e.reply(`[liangshi-calc]终端：${data.name} 数据更新完成\n尝试自动写入ArtifactData时失败\n请手动添加后重启使用`); return false}
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[ArtifactId] = ArtifactData
          console.log(`[liangshi-calc]终端：${data.name} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]终端data.json写入失败:\n', err); if (!mode) e.reply(`[liangshi-calc]终端：${data.name} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`); return false } else { console.log('[liangshi-calc]终端data.json已更新') }})
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]终端：${data.name} 数据更新完成\n重启后即可使用相关内容`)
    } else { if (!mode) e.reply(`[liangshi-calc]终端：${data.name} 数据更新完成\n当前未启用自动写入WeaponData\n手动配置后重启才可使用\n自动写入WeaponData可在config.yaml启用或使用强制更新临时启用一次`)}
    return false
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
    } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json"
      let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
      let y = JSON.parse(oldLog)
      y[new Date()] = { name: TextData[4], err, text: "装备更新错误" }
      let bbxzData = JSON.stringify(y, null, 2)
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') }})
    }
    return true
  }
}

export async function MonsterNew (e, mode, JsonOk, version) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function ItemNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(异环|YH|yh|NTE|nte)(.*?)物品(数据|资源|资源数据)?(.*?)$/)
  let ID = TextData[4]
  try {
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.nte.latest
      } else { verLeve = version }
      if (!JsonOk || !fs.existsSync("./plugins/liangshi-calc/resources/ItemJson.json")) {
        response = await fetch(`${ProxyUrl}https://static.nanoka.cc/nte/${verLeve}/zh/item.json`)
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
      } else {
        response = fs.readFileSync("./plugins/liangshi-calc/resources/ItemJson.json", 'utf8')
        data = JSON.parse(response)
        console.log(`[liangshi-calc]本地数据读取成功`)
      }
    } catch (err) {
      if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    let ItemData, ItemName, ItemType
    data = data[ID]
    ItemName = data?.name
    ItemType = data?.tags[0] || "未知"
    ItemData = {
      "id": ID,
      "name": ItemName,
      "type": ItemType,
      "desc": data?.context,
      "stone": data?.item_bg_desc,
      "rarity": data.rarity,
      "type_name": data?.type_name,
      "purpose": data?.purpose_type,
      "pile": data?.max_amount //最大堆叠数量
    }
    let imgs = `./plugins/miao-plugin/resources/meta-yh/material`
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/nte${data.icon}.webp`, `${imgs}/${ItemType}/${ItemName}.webp`, "图标")
    if (!mode) e.reply(`[liangshi-calc]物品图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-yh/material/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取物品配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]物品：${ItemName} 数据更新完成\n尝试自动写入data时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[ItemType] = jsonData[ItemType] || {}
          jsonData[ItemType][ItemName] = ItemData
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
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') } })
    }
    return true
  }
}

export async function getImg (url, Path, name) {
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
