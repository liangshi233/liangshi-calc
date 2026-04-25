import common from '../../../../../lib/common/common.js'
import { Common } from '../../../components/index.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'


/**
 * 星铁API4
 * nanoka.cc
 *
 * 已知问题
 * 更新数据时会缺少CV及介绍数据
 *
 * 如果有新的问题建议去issue反馈
 */


export async function New (e) {
  let cfg = LSconfig.getConfig('user', 'config')
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let characterTime, weaponTime, artifactTime, monsterTime, itemTime, character, status, response, ProxyUrl, artifact, data, weapon, monster, MonsterJson, ItemJson, ItemOk, MonsterOk
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
  character = data.hsr.new.character || []
  weapon = data.hsr.new.lightcone || []
  artifact = data.hsr.new.relicset || []
  monster = data.hsr.new.monster || []
  data.item = data.hsr.new.item || []
  let ver = data.hsr.latest
  if (/完整|全部/.test(e.msg)) {
    status = "完整"
    try {
      let Characterurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/character.json`)
      Characterurl = await Characterurl.json()
      character = Object.keys(Characterurl)
      let Weaponurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/lightcone.json`)
      Weaponurl = await Weaponurl.json()
      weapon = Object.keys(Weaponurl)
      let Artifacturl = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/relicset.json`)
      Artifacturl = await Artifacturl.json()
      artifact = Object.keys(Artifacturl)
      let Monsterurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/monster.json`)
      Monsterurl = await Monsterurl.json()
      monster = Object.keys(Monsterurl)
      let Itemurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/zh/item_all.json`)
      Itemurl = await Itemurl.json()
      data.item = Object.keys(Itemurl)
    } catch (err) { console.error(err) }
  }
  if (/角色|共鸣者/.test(e.msg)) {
    weapon = [], artifact = [], data.item = [], monster = []
  } else if (/武器|光锥/.test(e.msg)) {
    character = [], artifact = [], data.item = [], monster = []
  } else if (/圣遗物|遗器|声骸/.test(e.msg)) {
    character = [], weapon = [], data.item = [], monster = []
  } else if (/物品|材料/.test(e.msg)) {
    character = [], weapon = [], artifact = [], monster = []
  } else if (/敌人|敌怪|怪物|残响|残像|boss|BOSS/.test(e.msg)) {
    character = [], weapon = [], artifact = [], data.item = []
  }
  let UseTime = Math.round(((5 + character.length * 16 + weapon.length * 2 + artifact.length * 1 + monster.length * 1 + data.item.length * 2) / 60) * 10) / 10
  let y = Math.round(UseTime * 0.75 * 10) / 10
  e.reply(`[liangshi-calc] 即将静默更新\n星铁 ${ver}版本新内容\n共计\n\n${character.length}名新角色\n${weapon.length}个新光锥\n${artifact.length}个新遗器\n${monster.length}个新敌人\n${data.item.length}个新物品\n\n预计需要${y}~${UseTime}分钟，请耐心等待.\n(*/ω＼*)`)
  await common.sleep(2000)
  ItemOk = true, MonsterOk = true
  if (!fs.existsSync("./plugins/liangshi-calc/resources/log.json")) { fs.writeFileSync("./plugins/liangshi-calc/resources/log.json", '{}'); console.log(`[liangshi-calc]未找到错误日志文件，已自动创建`)}
  try {
    let url = `${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/zh/item_all.json`
    let url2 = `${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/HardLevelGroup.json`
    if (data.item.length > 0) {
      ItemJson = await fetch(url)
      if (!response.ok) ItemOk = false
      ItemJson = await ItemJson.json()
      fs.writeFile(`./plugins/liangshi-calc/resources/ItemJson.json`, JSON.stringify(ItemJson), 'utf8', (err) => { if (err) { ItemOk = false } else { console.log(`[liangshi-calc] 物品Json已缓存至本地`) }})
    }
    if (monster.length > 0) {
      MonsterJson = await fetch(url2)
      if (!response.ok) MonsterOk = false
      MonsterJson = await MonsterJson.json()
      fs.writeFile(`./plugins/liangshi-calc/resources/MonsterJson.json`, JSON.stringify(MonsterJson), 'utf8', (err) => { if (err) { MonsterOk = false } else { console.log(`[liangshi-calc] 敌人Json已缓存至本地`) }})
    }
  } catch (err) { ItemOk = false; console.error(`[liangshi-calc] Json缓存失败\n${err}`) }
  let instruction = { msg: null, isMaster: true, reply: e.reply }
  for (const charId of character) {
    instruction.msg = `#梁氏覆盖更新星铁${charId}角色数据`
    await common.sleep(2000)
    await CharacterNew(instruction, true)
  }
  characterTime =  `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const weaponId of weapon) {
    instruction.msg = `#梁氏覆盖更新星铁${weaponId}武器数据`
    await common.sleep(1500)
    await WeaponNew(instruction, true)
  }
  weaponTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const artifactId of artifact) {
    await common.sleep(1500)
    instruction.msg = `#梁氏覆盖更新星铁${artifactId}声骸数据`
    await ArtifactNew(instruction, true)
  }
  artifactTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const monsterId of monster) {
    await common.sleep(1500)
    instruction.msg = `#梁氏覆盖更新星铁${monsterId}敌人数据`
    await MonsterNew(instruction, true, MonsterOk)
  }
  monsterTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const itemId of data.item) {
    await common.sleep(1000)
    instruction.msg = `#梁氏覆盖更新星铁${itemId}物品数据`
    await ItemNew(instruction, true, ItemOk)
  }
  itemTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  let verDataPath = `./plugins/miao-plugin/resources/meta-sr/data.json`
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
  let CharacterNamedata, CharacterText, WeaponText, WeaponNamedata, ArtifactText, ArtifactNamedata, MonsterText, MonsterNamedata
  try {
    CharacterText = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/character.json`)
    WeaponText = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/lightcone.json`)
    ArtifactText = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/relicset.json`)
    MonsterText = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${ver}/monster.json`)
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
  CharacterNameText = character.map(id => CharacterNamedata[`${id}`].zh)
  WeaponNameText = weapon.map(id => WeaponNamedata[`${id}`].zh)
  ArtifactNameText = artifact.map(id => ArtifactNamedata[`${id}`].zh)
  MonsterNameText = monster.map(id => MonsterNamedata[`${id}`].zh)
  try {
    let a, c, h
    a = ""
    c = fs.readFileSync('./plugins/miao-plugin/resources/meta-sr/character/data.json', 'utf8')
    c = JSON.parse(c)
    h = fs.readFileSync('./plugins/miao-plugin/resources/meta-sr/weapon/data.json', 'utf8')
    h = JSON.parse(h)
    let chars = character.filter(id => c.hasOwnProperty(id)).map(id => ({
      face: `/meta-sr/character/${c[id].name}/imgs/face.webp`,
      name: c[id].name || "无名",
      abbr: c[id].abbr || c[id].name || "",
      star: c[id].star
    }))

    let weapons = weapon.filter(id => h.hasOwnProperty(id)).map(id => ({
      face: `/meta-sr/weapon/${h[id].type}/${h[id].name}/icon.webp`,
      name: h[id].name,
      abbr: h[id].abbr || h[id].name,
      star: h[id].star
    }))

    let artis = ArtifactNameText.map(id => ({
      face: `/meta-sr/artifact${a}/${id}/arti-0.webp`,
      name: id,
      star: 5
    }))

    let monster = MonsterNameText.map(id => ({
      face: `/meta-sr/monster/${id}/preview.webp`,
      name: id,
      star: 5
    }))

    return await Common.render('wiki/data/ver-new', {
      gamever: ver,
      gameid: "星铁",
      TxName: {
        js: "角色",
        wq: "光锥",
        zb: "遗器",
        dr: "敌人"
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
    if (WeaponNameText.length === 0) WeaponNameText = `本次没有更新任何光锥`
    if (ArtifactNameText.length === 0) ArtifactNameText = `本次没有更新任何遗器`
    if (MonsterNameText.length === 0) MonsterNameText = `本次没有更新任何敌人`
    e.reply(`[liangshi-calc] 星铁 ${ver} 版本更新完成\n已为您更新\n\n角色：\n${CharacterNameText}\n\n光锥：\n${WeaponNameText}\n\n遗器：\n${ArtifactNameText}\n\n敌人：\n${MonsterNameText}\n\n物品${data.item.length}个\n\n重启后即可使用相关内容`)
    return false
  }
}

export async function CharacterNew (e, mode) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR)(.*?)角色(数据|资源|资源数据)?(.*?)$/)
  let CharacterId = TextData[4], verLeve
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
      verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
      verUrl = await verUrl.json()
      verLeve = verUrl.hsr.latest
      url = `${ProxyUrl}https://static.nanoka.cc/hsr/${verLeve}/zh/character/${CharacterId}.json`
      response = await fetch(url)
      if (!response.ok) { console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`); throw new Error() }
      data = await response.json()
      console.log(`[liangshi-calc]角色：${data.name || "无名"} 云端数据读取成功`)
    } catch (err) {
      console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
      if (response.status === 404) {
        if (!mode) e.reply('[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新')
        if (!mode) e.reply('数据更新时间(预估)\n星铁：版本更新当天18：00~次日6：00左右')
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
    let imgs = `./plugins/miao-plugin/resources/meta-sr/character/${CharacterName}/imgs`
    if (!fs.existsSync(imgs)) { fs.mkdirSync(imgs, { recursive: true }); console.log(`[liangshi-calc]角色：${CharacterName} 本地imgs文件夹创建成功`) }
    let skillDesc = (a) => { if (!a) { return {} } let acc = Object.keys(a).sort((a, b) => a - b), ccb = {}, bbx = acc.reduce((max, key) => Math.max(max, a[key].param_list.length), 0); for (let i = 0; i < bbx; i++) { let vvb = [], saa = true, fvv = null; acc.forEach(key => {let vcc = a[key].param_list[i]; if (vcc !== undefined) { vvb.push(vcc); if (fvv === null) fvv = vcc; else if (vcc !== fvv) saa = false }}); ccb[(i + 1).toString()] = { name: `技能伤害${i + 1}`, isSame: saa, values: vvb }} return ccb}
    let damaMap = { 'Quantum': "量子", 'Imaginary': "虚数", 'Thunder': "雷", 'Wind': "风", 'Fire': "火", 'Ice': "冰", 'Physical': "物理" }
    let typeMap = { 'Knight': "存护", 'Priest': "丰饶", 'Shaman': "同谐", 'Warlock': "虚无", 'Rogue': "巡猎", 'Warrior': "毁灭", 'Mage': "智识", 'Memory': "记忆", 'Elation': "欢愉" }
    let attrMap = { '攻击力': "atkPct", '生命值': "hpPct", '防御力': "defPct", '速度': "speed", '效果命中': "effPct", '效果抵抗': "effDef", '击破特攻': "stance", '虚数属性伤害提高': "imaginary", '量子属性伤害提高': "auantum", '雷属性伤害提高': "elec", '冰属性伤害提高': "ice", '火属性伤害提高': "fire", '风属性伤害提高': "wind", '物理属性伤害提高': "phy", '暴击率': "cpct", '暴击伤害': "cdmg", '欢愉度': "elation" }
    let attrKey = { '攻击力': 100, '生命值': 100, '防御力': 100, '速度': 1, '效果命中': 100, '效果抵抗': 100, '击破特攻': 100, '雷属性伤害提高': 100, '冰属性伤害提高': 100, '火属性伤害提高': 100, '风属性伤害提高': 100, '物理属性伤害提高': 100, '暴击率': 100, '暴击伤害': 100, '欢愉度': 100 }
    let skillType = { 'Normal': "普攻", 'BPSkill': "战技", 'Ultra': "终结技", 'Maze': "秘技", 'Servant': "忆灵技", 'Enhance': "忆灵天赋", 'ElationDamage': "欢愉技" }
    let skillTag = { 'SingleAttack': "单攻", 'Bounce': "弹射", 'Blast': "扩散", 'AoEAttack': "群攻", 'Impair': "妨害", 'Enhance': "强化", 'Defence': "防御", 'Restore': "回复", 'Support': "辅助", 'Summon': "召唤", 'MazeAttack': "秘技" }
    CharacterData = {
      "id": CharacterId,
      "key": data.avatar_vo_tag,
      "name": CharacterName,
      "star": data.rarity.slice(-1),
      "elem": damaMap[data.damage_type],
      "allegiance": "",
      "weapon": typeMap[data.base_type],
      "sp": data.sp_need,
      "desc": data.desc.replace(/\\n/g, '').replace(/unbreak/g, 'nobr'),
      "cncv": data.chara_info.va.chinese,
      "jpcv": data.chara_info.va.japanese,
      "baseAttr": {
        "atk": data.stats?.["6"]?.attack_base + (data.stats?.["6"]?.attack_add * 79),
        "hp": data.stats?.["6"]?.hp_base + (data.stats?.["6"]?.hp_add * 79),
        "def": data.stats?.["6"]?.defence_base + (data.stats?.["6"]?.defence_add * 79),
        "speed": data.stats?.["6"]?.speed_base,
        "cpct": data.stats?.["6"]?.critical_chance * 100,
        "cdmg": data.stats?.["6"]?.critical_damage * 100,
        "aggro": data.stats?.["6"]?.base_aggro
      },
      "growAttr": {
        "atk": data.stats?.["0"]?.attack_add,
        "hp": data.stats?.["0"]?.hp_add,
        "def": data.stats?.["0"]?.defence_add,
        "speed": 0
      },
      "eta": 1,
      "talentId": {
        [CharacterId + "01"]: "a",
        [CharacterId + "02"]: "e",
        [CharacterId + "03"]: "q",
        [CharacterId + "04"]: "t",
        [CharacterId + "05"]: "t2",
        [CharacterId + "07"]: "z",
        [CharacterId + "08"]: "a2",
        [CharacterId + "11"]: "e2",
        [CharacterId + "14"]: "q2",
      },
      "talentCons": {
        "3": data.ranks?.["3"]?.desc.includes('战技等级+2') ? "e" : "q",
        "5": data.ranks?.["3"]?.desc.includes('战技等级+2') ? "q" : "e",
        "a": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 3 : 5,
        "e": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 3 : 5,
        "q": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 5 : 3,
        "t": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 5 : 3,
        "me": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 5 : 3,
        "mt": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 3 : 5,
        "xe": [3, 5]
      },
      "talent": {
        "a": {
          "id": data.skills?.[CharacterId + "01"]?.id,
          "name": data.skills?.[CharacterId + "01"]?.name,
          "type": skillType[data.skills?.[CharacterId + "01"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "01"]?.tag],
          "desc": data.skills?.[CharacterId + "01"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "01"]?.level)
        },
        "e": {
          "id": data.skills?.[CharacterId + "02"]?.id,
          "name": data.skills?.[CharacterId + "02"]?.name,
          "type": skillType[data.skills?.[CharacterId + "02"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "02"]?.tag],
          "desc": data.skills?.[CharacterId + "02"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "02"]?.level)
        },
        "q": {
          "id": data.skills?.[CharacterId + "03"]?.id,
          "name": data.skills?.[CharacterId + "03"]?.name,
          "type": skillType[data.skills?.[CharacterId + "03"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "03"]?.tag],
          "desc": data.skills?.[CharacterId + "03"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "03"]?.level)
        },
        "t": {
          "id": data.skills?.[CharacterId + "04"]?.id,
          "name": data.skills?.[CharacterId + "04"]?.name,
          "type": skillType[data.skills?.[CharacterId + "04"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "04"]?.tag],
          "desc": data.skills?.[CharacterId + "04"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "04"]?.level)
        },
        "z": {
          "id": data.skills?.[CharacterId + "07"]?.id,
          "name": data.skills?.[CharacterId + "07"]?.name,
          "type": skillType[data.skills?.[CharacterId + "07"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "07"]?.tag],
          "desc": data.skills?.[CharacterId + "07"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "07"]?.level)
        },
        "a2": {
          "id": data.skills?.[CharacterId + "08"]?.id,
          "name": data.skills?.[CharacterId + "08"]?.name,
          "type": skillType[data.skills?.[CharacterId + "08"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "08"]?.tag],
          "desc": data.skills?.[CharacterId + "08"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "08"]?.level)
        },
        "e2": {
          "id": data.skills?.[CharacterId + "11"]?.id,
          "name": data.skills?.[CharacterId + "11"]?.name,
          "type": skillType[data.skills?.[CharacterId + "11"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "11"]?.tag],
          "desc": data.skills?.[CharacterId + "11"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "11"]?.level)
        },
        "q2": {
          "id": data.skills?.[CharacterId + "14"]?.id,
          "name": data.skills?.[CharacterId + "14"]?.name,
          "type": skillType[data.skills?.[CharacterId + "14"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "14"]?.tag],
          "desc": data.skills?.[CharacterId + "14"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "14"]?.level)
        },
        "t2": {
          "id": data.skills?.[CharacterId + "05"]?.id,
          "name": data.skills?.[CharacterId + "05"]?.name,
          "type": skillType[data.skills?.[CharacterId + "05"]?.type] || "天赋",
          "tag": skillTag[data.skills?.[CharacterId + "05"]?.tag],
          "desc": data.skills?.[CharacterId + "05"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
          "tables": skillDesc(data.skills?.[CharacterId + "05"]?.level)
        }
      },
      "cons": {
        "1": {
          "name": data.ranks?.["1"].name,
          "desc": data.ranks?.["1"]?.desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.ranks?.param_list?.["1"]?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr')
        },
        "2": {
          "name": data.ranks?.["2"].name,
          "desc": data.ranks?.["2"]?.desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.ranks?.param_list?.["2"]?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr')
        },
        "3": {
          "name": data.ranks?.["3"].name,
          "desc": data.ranks?.["3"]?.desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.ranks?.param_list?.["3"]?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr')
        },
        "4": {
          "name": data.ranks?.["4"].name,
          "desc": data.ranks?.["4"]?.desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.ranks?.param_list?.["4"]?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr')
        },
        "5": {
          "name": data.ranks?.["5"].name,
          "desc": data.ranks?.["5"]?.desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.ranks?.param_list?.["5"]?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr')
        },
        "6": {
          "name": data.ranks?.["6"].name,
          "desc": data.ranks?.["6"]?.desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.ranks?.param_list?.["6"]?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr')
        }
      },
      "attr": {
        "0": {
          "promote": 0,
          "maxLevel": 20,
          "cost": {
            [data.stats?.["0"]?.cost?.[0]?.item_id]: data.stats?.["0"]?.cost?.[0]?.item_num,
            [data.stats?.["0"]?.cost?.[1]?.item_id]: data.stats?.["0"]?.cost?.[1]?.item_num
          },
          "grow": {
            "atk": data.stats?.["0"]?.attack_add,
            "hp": data.stats?.["0"]?.hp_add,
            "def": data.stats?.["0"]?.defence_add,
            "speed": 0
          },
          "attrs": {
            "atk": data.stats?.["0"]?.attack_base + (data.stats?.["0"]?.attack_add * 19),
            "hp": data.stats?.["0"]?.hp_base + (data.stats?.["0"]?.hp_add * 19),
            "def": data.stats?.["0"]?.defence_base + (data.stats?.["0"]?.defence_add * 19),
            "speed": data.stats?.["0"]?.speed_base,
            "cpct": data.stats?.["0"]?.critical_chance * 100,
            "cdmg": data.stats?.["0"]?.critical_damage * 100,
            "aggro": data.stats?.["0"]?.base_aggro
          }
        },
        "1": {
          "promote": 1,
          "maxLevel": 30,
          "cost": {
            [data.stats?.["1"]?.cost?.[0]?.item_id]: data.stats?.["1"]?.cost?.[0]?.item_num,
            [data.stats?.["1"]?.cost?.[1]?.item_id]: data.stats?.["1"]?.cost?.[1]?.item_num
          },
          "grow": {
            "atk": data.stats?.["1"]?.attack_add,
            "hp": data.stats?.["1"]?.hp_add,
            "def": data.stats?.["1"]?.defence_add,
            "speed": 0
          },
          "attrs": {
            "atk": data.stats?.["1"]?.attack_base + (data.stats?.["1"]?.attack_add * 29),
            "hp": data.stats?.["1"]?.hp_base + (data.stats?.["1"]?.hp_add * 29),
            "def": data.stats?.["1"]?.defence_base + (data.stats?.["1"]?.defence_add * 29),
            "speed": data.stats?.["1"]?.speed_base,
            "cpct": data.stats?.["1"]?.critical_chance * 100,
            "cdmg": data.stats?.["1"]?.critical_damage * 100,
            "aggro": data.stats?.["1"]?.base_aggro
          }
        },
        "2": {
          "promote": 2,
          "maxLevel": 40,
          "cost": {
            [data.stats?.["2"]?.cost?.[0]?.item_id]: data.stats?.["2"]?.cost?.[0]?.item_num,
            [data.stats?.["2"]?.cost?.[1]?.item_id]: data.stats?.["2"]?.cost?.[1]?.item_num,
            [data.stats?.["2"]?.cost?.[2]?.item_id]: data.stats?.["2"]?.cost?.[2]?.item_num
          },
          "grow": {
            "atk": data.stats?.["2"]?.attack_add,
            "hp": data.stats?.["2"]?.hp_add,
            "def": data.stats?.["2"]?.defence_add,
            "speed": 0
          },
          "attrs": {
            "atk": data.stats?.["2"]?.attack_base + (data.stats?.["2"]?.attack_add * 39),
            "hp": data.stats?.["2"]?.hp_base + (data.stats?.["2"]?.hp_add * 39),
            "def": data.stats?.["2"]?.defence_base + (data.stats?.["2"]?.defence_add * 39),
            "speed": data.stats?.["2"]?.speed_base,
            "cpct": data.stats?.["2"]?.critical_chance * 100,
            "cdmg": data.stats?.["2"]?.critical_damage * 100,
            "aggro": data.stats?.["2"]?.base_aggro
          }
        },
        "3": {
          "promote": 3,
          "maxLevel": 50,
          "cost": {
            [data.stats?.["3"]?.cost?.[0]?.item_id]: data.stats?.["3"]?.cost?.[0]?.item_num,
            [data.stats?.["3"]?.cost?.[1]?.item_id]: data.stats?.["3"]?.cost?.[1]?.item_num,
            [data.stats?.["3"]?.cost?.[2]?.item_id]: data.stats?.["3"]?.cost?.[2]?.item_num
          },
          "grow": {
            "atk": data.stats?.["3"]?.attack_add,
            "hp": data.stats?.["3"]?.hp_add,
            "def": data.stats?.["3"]?.defence_add,
            "speed": 0
          },
          "attrs": {
            "atk": data.stats?.["3"]?.attack_base + (data.stats?.["3"]?.attack_add * 49),
            "hp": data.stats?.["3"]?.hp_base + (data.stats?.["3"]?.hp_add * 49),
            "def": data.stats?.["3"]?.defence_base + (data.stats?.["3"]?.defence_add * 49),
            "speed": data.stats?.["3"]?.speed_base,
            "cpct": data.stats?.["3"]?.critical_chance * 100,
            "cdmg": data.stats?.["3"]?.critical_damage * 100,
            "aggro": data.stats?.["3"]?.base_aggro
          }
        },
        "4": {
          "promote": 4,
          "maxLevel": 60,
          "cost": {
            [data.stats?.["4"]?.cost?.[0]?.item_id]: data.stats?.["4"]?.cost?.[0]?.item_num,
            [data.stats?.["4"]?.cost?.[1]?.item_id]: data.stats?.["4"]?.cost?.[1]?.item_num,
            [data.stats?.["4"]?.cost?.[2]?.item_id]: data.stats?.["4"]?.cost?.[2]?.item_num
          },
          "grow": {
            "atk": data.stats?.["4"]?.attack_add,
            "hp": data.stats?.["4"]?.hp_add,
            "def": data.stats?.["4"]?.defence_add,
            "speed": 0
          },
          "attrs": {
            "atk": data.stats?.["4"]?.attack_base + (data.stats?.["4"]?.attack_add * 59),
            "hp": data.stats?.["4"]?.hp_base + (data.stats?.["4"]?.hp_add * 59),
            "def": data.stats?.["4"]?.defence_base + (data.stats?.["4"]?.defence_add * 59),
            "speed": data.stats?.["4"]?.speed_base,
            "cpct": data.stats?.["4"]?.critical_chance * 100,
            "cdmg": data.stats?.["4"]?.critical_damage * 100,
            "aggro": data.stats?.["4"]?.base_aggro
          }
        },
        "5": {
          "promote": 5,
          "maxLevel": 70,
          "cost": {
            [data.stats?.["5"]?.cost?.[0]?.item_id]: data.stats?.["5"]?.cost?.[0]?.item_num,
            [data.stats?.["5"]?.cost?.[1]?.item_id]: data.stats?.["5"]?.cost?.[1]?.item_num,
            [data.stats?.["5"]?.cost?.[2]?.item_id]: data.stats?.["5"]?.cost?.[2]?.item_num
          },
          "grow": {
            "atk": data.stats?.["5"]?.attack_add,
            "hp": data.stats?.["5"]?.hp_add,
            "def": data.stats?.["5"]?.defence_add,
            "speed": 0
          },
          "attrs": {
            "atk": data.stats?.["5"]?.attack_base + (data.stats?.["5"]?.attack_add * 69),
            "hp": data.stats?.["5"]?.hp_base + (data.stats?.["5"]?.hp_add * 69),
            "def": data.stats?.["5"]?.defence_base + (data.stats?.["5"]?.defence_add * 69),
            "speed": data.stats?.["5"]?.speed_base,
            "cpct": data.stats?.["5"]?.critical_chance * 100,
            "cdmg": data.stats?.["5"]?.critical_damage * 100,
            "aggro": data.stats?.["5"]?.base_aggro
          }
        },
        "6": {
          "promote": 6,
          "maxLevel": 80,
          "cost": {},
          "grow": {
            "atk": data.stats?.["6"]?.attack_add,
            "hp": data.stats?.["6"]?.hp_add,
            "def": data.stats?.["6"]?.defence_add,
            "speed": 0
          },
          "attrs": {
            "atk": data.stats?.["6"]?.attack_base + (data.stats?.["6"]?.attack_add * 79),
            "hp": data.stats?.["6"]?.hp_base + (data.stats?.["6"]?.hp_add * 79),
            "def": data.stats?.["6"]?.defence_base + (data.stats?.["6"]?.defence_add * 79),
            "speed": data.stats?.["6"]?.speed_base,
            "cpct": data.stats?.["6"]?.critical_chance * 100,
            "cdmg": data.stats?.["6"]?.critical_damage * 100,
            "aggro": data.stats?.["6"]?.base_aggro
          }
        }
      },
      "tree": {
        [CharacterId + "201"]: {
          "key": attrMap[data.skill_trees?.point09?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point09?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point09?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "202"]: {
          "key": attrMap[data.skill_trees?.point10?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point10?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point10?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "203"]: {
          "key": attrMap[data.skill_trees?.point11?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point11?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point11?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "204"]: {
          "key": attrMap[data.skill_trees?.point12?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point12?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point12?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "205"]: {
          "key": attrMap[data.skill_trees?.point13?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point13?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point13?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "206"]: {
          "key": attrMap[data.skill_trees?.point14?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point14?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point14?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "207"]: {
          "key": attrMap[data.skill_trees?.point15?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point15?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point15?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "208"]: {
          "key": attrMap[data.skill_trees?.point16?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point16?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point16?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "209"]: {
          "key": attrMap[data.skill_trees?.point17?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point17?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point17?.["1"]?.status_add_list?.[0]?.name]
        },
        [CharacterId + "210"]: {
          "key": attrMap[data.skill_trees?.point18?.["1"]?.status_add_list?.[0]?.name],
          "value": data.skill_trees?.point18?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point18?.["1"]?.status_add_list?.[0]?.name]
        }
      },
      "treeData": {
        [CharacterId + "101"]: {
          "id": data.skill_trees?.point06?.["1"]?.point_id,
          "type": "skill",
          "root": true,
          "name": data.skill_trees?.point06?.["1"]?.point_name,
          "levelReq": 0,
          "desc": data.skill_trees?.point06?.["1"]?.point_desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.skill_trees?.point06?.["1"]?.param_list?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr'),
          "cost": {
            [data.skill_trees?.point06?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point06?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point06?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point06?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point06?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point06?.["1"]?.material_list?.[2].item_num
          },
          "idx": 1,
          "children": [
            CharacterId + "204",
            CharacterId + "205"
          ]
        },
        [CharacterId + "102"]: {
          "id": data.skill_trees?.point07?.["1"]?.point_id,
          "type": "skill",
          "root": true,
          "name": data.skill_trees?.point07?.["1"]?.point_name,
          "levelReq": 0,
          "desc": data.skill_trees?.point07?.["1"]?.point_desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.skill_trees?.point07?.["1"]?.param_list?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr'),
          "cost": {
            [data.skill_trees?.point07?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point07?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point07?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point07?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point07?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point07?.["1"]?.material_list?.[2].item_num,
            [data.skill_trees?.point07?.["1"]?.material_list?.[3].item_id]: data.skill_trees?.point07?.["1"]?.material_list?.[3].item_num
          },
          "idx": 2,
          "children": [
            CharacterId + "206",
            CharacterId + "207"
          ]
        },
        [CharacterId + "103"]: {
          "id": data.skill_trees?.point08?.["1"]?.point_id,
          "type": "skill",
          "root": true,
          "name": data.skill_trees?.point08?.["1"]?.point_name,
          "levelReq": 0,
          "desc": data.skill_trees?.point08?.["1"]?.point_desc.replace(/#(\d+)\[([^\]]*)\]/g, (c, d, e) => {let value = data.skill_trees?.point08?.["1"]?.param_list?.[parseInt(d) - 1] ?? 0; if (e.includes('%')) { value *= 100 } return value.toString()}).replace(/unbreak/g, 'nobr'),
          "cost": {
            [data.skill_trees?.point08?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point08?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point08?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point08?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point08?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point08?.["1"]?.material_list?.[2].item_num,
            [data.skill_trees?.point08?.["1"]?.material_list?.[3].item_id]: data.skill_trees?.point08?.["1"]?.material_list?.[3].item_num
          },
          "idx": 3,
          "children": [
            CharacterId + "208"
          ]
        },
        [CharacterId + "201"]: {
          "id": CharacterId + "201",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point06?.["1"]?.point_name,
          "levelReq": 0,
          "cost": {
            [data.skill_trees?.point09?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point09?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point09?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point09?.["1"]?.material_list?.[1].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point09?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point09?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point09?.["1"]?.status_add_list?.[0]?.name]
          },
          "children": [
            CharacterId + "202",
            CharacterId + "203"
          ]
        },
        [CharacterId + "202"]: {
          "id": CharacterId + "202",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point10?.["1"]?.point_name,
          "levelReq": 0,
          "cost": {
            [data.skill_trees?.point10?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point10?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point10?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point10?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point10?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point10?.["1"]?.material_list?.[2].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point10?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point10?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point10?.["1"]?.status_add_list?.[0]?.name]
          }
        },
        [CharacterId + "203"]: {
          "id": CharacterId + "203",
          "type": "buff",
          "root": true,
          "name": data.skill_trees?.point11?.["1"]?.point_name,
          "levelReq": 1,
          "cost": {
            [data.skill_trees?.point11?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point11?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point11?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point11?.["1"]?.material_list?.[1].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point11?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point11?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point11?.["1"]?.status_add_list?.[0]?.name]
          }
        },
        [CharacterId + "204"]: {
          "id": CharacterId + "204",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point12?.["1"]?.point_name,
          "levelReq": 0,
          "cost": {
            [data.skill_trees?.point12?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point12?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point12?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point12?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point12?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point12?.["1"]?.material_list?.[2].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point12?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point12?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point12?.["1"]?.status_add_list?.[0]?.name]
          }
        },
        [CharacterId + "205"]: {
          "id": CharacterId + "205",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point13?.["1"]?.point_name,
          "levelReq": 0,
          "cost": {
            [data.skill_trees?.point13?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point13?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point13?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point13?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point13?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point13?.["1"]?.material_list?.[2].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point13?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point13?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point13?.["1"]?.status_add_list?.[0]?.name]
          }
        },
        [CharacterId + "206"]: {
          "id": CharacterId + "206",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point14?.["1"]?.point_name,
          "levelReq": 0,
          "cost": {
            [data.skill_trees?.point14?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point14?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point14?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point14?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point14?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point14?.["1"]?.material_list?.[2].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point14?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point14?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point14?.["1"]?.status_add_list?.[0]?.name]
          }
        },
        [CharacterId + "207"]: {
          "id": CharacterId + "207",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point15?.["1"]?.point_name,
          "levelReq": 0,
          "cost": {
            [data.skill_trees?.point15?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point15?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point15?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point15?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point15?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point15?.["1"]?.material_list?.[2].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point15?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point15?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point15?.["1"]?.status_add_list?.[0]?.name]
          }
        },
        [CharacterId + "208"]: {
          "id": CharacterId + "208",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point16?.["1"]?.point_name,
          "levelReq": 0,
          "cost": {
            [data.skill_trees?.point16?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point16?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point16?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point16?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point16?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point16?.["1"]?.material_list?.[2].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point16?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point16?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point16?.["1"]?.status_add_list?.[0]?.name]
          },
          "children": [
            CharacterId + "209"
          ]
        },
        [CharacterId + "209"]: {
          "id": CharacterId + "209",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point17?.["1"]?.point_name,
          "levelReq": 75,
          "cost": {
            [data.skill_trees?.point17?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point17?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point17?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point17?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point17?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point17?.["1"]?.material_list?.[2].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point17?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point17?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point17?.["1"]?.status_add_list?.[0]?.name]
          },
          "children": [
            CharacterId + "210"
          ]
        },
        [CharacterId + "210"]: {
          "id": CharacterId + "210",
          "type": "buff",
          "root": false,
          "name": data.skill_trees?.point18?.["1"]?.point_name,
          "levelReq": 80,
          "cost": {
            [data.skill_trees?.point18?.["1"]?.material_list?.[0].item_id]: data.skill_trees?.point18?.["1"]?.material_list?.[0].item_num,
            [data.skill_trees?.point18?.["1"]?.material_list?.[1].item_id]: data.skill_trees?.point18?.["1"]?.material_list?.[1].item_num,
            [data.skill_trees?.point18?.["1"]?.material_list?.[2].item_id]: data.skill_trees?.point18?.["1"]?.material_list?.[2].item_num,
          },
          "data": {
            [attrMap[data.skill_trees?.point18?.["1"]?.status_add_list?.[0]?.name]]: data.skill_trees?.point18?.["1"]?.status_add_list?.[0]?.value * attrKey[data.skill_trees?.point18?.["1"]?.status_add_list?.[0]?.name]
          }
        }
      }
    }
    if (data.memosprite.legend > 0) {
      CharacterData.talentId = {
        ...CharacterData.talentId,
        ["1" + CharacterId + "01"]: "me",
        ["1" + CharacterId + "02"]: "me2",
        ["1" + CharacterId + "03"]: "mt",
        ["1" + CharacterId + "05"]: "mt1",
        ["1" + CharacterId + "06"]: "mt2"
      }
      CharacterData.talent = {
        ...CharacterData.talent,
        "me": {
          "id": data.memosprite.skills?.["1" + CharacterId + "01"]?.id,
          "name": data.memosprite.skills?.["1" + CharacterId + "01"]?.name,
          "type": skillType[data.memosprite.skills?.["1" + CharacterId + "01"]?.type] || "忆灵天赋",
          "tag": skillTag[data.memosprite.skills?.["1" + CharacterId + "01"]?.tag],
          "desc": data.memosprite.skills?.["1" + CharacterId + "01"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />'),
          "tables": skillDesc(data.memosprite.skills?.["1" + CharacterId + "01"]?.level)
        },
        "mt": {
          "id": data.memosprite.skills?.["1" + CharacterId + "03"]?.id,
          "name": data.memosprite.skills?.["1" + CharacterId + "03"]?.name,
          "type": skillType[data.memosprite.skills?.["1" + CharacterId + "03"]?.type] || "忆灵天赋",
          "tag": skillTag[data.memosprite.skills?.["1" + CharacterId + "03"]?.tag],
          "desc": data.memosprite.skills?.["1" + CharacterId + "03"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />'),
          "tables": skillDesc(data.memosprite.skills?.["1" + CharacterId + "03"]?.level)
        },
        "me2": {
          "id": data.memosprite.skills?.["1" + CharacterId + "02"]?.id,
          "name": data.memosprite.skills?.["1" + CharacterId + "02"]?.name,
          "type": skillType[data.memosprite.skills?.["1" + CharacterId + "02"]?.type] || "忆灵天赋",
          "tag": skillTag[data.memosprite.skills?.["1" + CharacterId + "02"]?.tag],
          "desc": data.memosprite.skills?.["1" + CharacterId + "02"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />'),
          "tables": skillDesc(data.memosprite.skills?.["1" + CharacterId + "02"]?.level)
        },
        "mt1": {
          "id": data.memosprite.skills?.["1" + CharacterId + "05"]?.id,
          "name": data.memosprite.skills?.["1" + CharacterId + "05"]?.name,
          "type": skillType[data.memosprite.skills?.["1" + CharacterId + "05"]?.type] || "忆灵天赋",
          "tag": skillTag[data.memosprite.skills?.["1" + CharacterId + "05"]?.tag],
          "desc": data.memosprite.skills?.["1" + CharacterId + "05"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />'),
          "tables": skillDesc(data.memosprite.skills?.["1" + CharacterId + "05"]?.level)
        },
        "mt2": {
          "id": data.memosprite.skills?.["1" + CharacterId + "06"]?.id,
          "name": data.memosprite.skills?.["1" + CharacterId + "06"]?.name,
          "type": skillType[data.memosprite.skills?.["1" + CharacterId + "06"]?.type] || "忆灵天赋",
          "tag": skillTag[data.memosprite.skills?.["1" + CharacterId + "06"]?.tag],
          "desc": data.memosprite.skills?.["1" + CharacterId + "06"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />'),
          "tables": skillDesc(data.memosprite.skills?.["1" + CharacterId + "06"]?.level)
        }
      }
    } else if (data.memosprite.skills?.[CharacterId + "20"]) {
      CharacterData.talentId = {
        ...CharacterData.talentId,
        [CharacterId + "20"]: "xe"
      }
      CharacterData.talent = {
        ...CharacterData.talent,
        "xe": {
          "id": data.memosprite.skills?.[CharacterId + "20"]?.id,
          "name": data.memosprite.skills?.[CharacterId + "20"]?.name,
          "type": skillType[data.memosprite.skills?.[CharacterId + "20"]?.type] || "欢愉技",
          "tag": skillTag[data.memosprite.skills?.[CharacterId + "20"]?.tag],
          "desc": data.memosprite.skills?.[CharacterId + "20"]?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />'),
          "tables": skillDesc(data.memosprite.skills?.[CharacterId + "20"]?.level)
        }
      }
    }
    for (let key of Object.keys(CharacterData.talent)) { if (!CharacterData.talent[key].desc && !CharacterData.talent[key].name) { delete CharacterData.talent[key] } }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-sr/character/${CharacterName}/data.json`
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
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/avatardrawcard/${CharacterId}.webp`, `${imgs}/splash.webp`, "立绘")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/avatarshopicon/${CharacterId}.webp`, `${imgs}/preview.webp`, "大头")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/avatarroundicon/${CharacterId}.webp`, `${imgs}/face.webp`, "侧头")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_SkillTree1.webp`, `${imgs}/tree-1.webp`, "固有天赋1")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_SkillTree2.webp`, `${imgs}/tree-2.webp`, "固有天赋2")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_SkillTree3.webp`, `${imgs}/tree-3.webp`, "固有天赋3")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Normal.webp`, `${imgs}/talent-a.webp`, "普攻")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_BP.webp`, `${imgs}/talent-e.webp`, "战技")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Ultra.webp`, `${imgs}/talent-q.webp`, "终结技")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Passive.webp`, `${imgs}/talent-t.webp`, "天赋")
    if (data.memosprite.legend > 0) {
      await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_1${CharacterId}_Servant.webp`, `${imgs}/talent-me.webp`, "忆灵技")
      await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_1${CharacterId}_ServantPassive.webp`, `${imgs}/talent-mt.webp`, "忆灵天赋")
    } else if (data.memosprite.skills?.[CharacterId + "20"]) {
      await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Elation.webp`, `${imgs}/talent-xe.webp`, "欢愉技")
    }
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Maze.webp`, `${imgs}/talent-z.webp`, "秘技")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Rank1.webp`, `${imgs}/cons-1.webp`, "1魂")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Rank2.webp`, `${imgs}/cons-2.webp`, "2魂")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Rank3.webp`, `${imgs}/cons-3.webp`, "3魂")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Rank4.webp`, `${imgs}/cons-4.webp`, "4魂")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Rank5.webp`, `${imgs}/cons-5.webp`, "5魂")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/skillicons/SkillIcon_${CharacterId}_Rank6.webp`, `${imgs}/cons-6.webp`, "6魂")
    if (!mode) e.reply(`[liangshi-calc]角色图片资源下载完成`)
    console.log(`[liangshi-calc]图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = "./plugins/miao-plugin/resources/meta-sr/character/data.json", newValue
      if (!fs.existsSync(filePath)) { console.log('[liangshi-calc]找不到文件data.json，请检查mian-plugin配置'); fs.writeFileSync(filePath, '{}') }
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
            "id": CharacterId,
            "key": data.avatar_vo_tag,
            "name": CharacterName,
            "star": data.rarity.slice(-1),
            "elem": damaMap[data.damage_type],
            "weapon": typeMap[data.base_type],
            "sp": data.sp_need,
            "talentId": {
              [CharacterId + "01"]: "a",
              [CharacterId + "08"]: "a2",
              [CharacterId + "02"]: "e",
              [CharacterId + "03"]: "q",
              [CharacterId + "04"]: "t",
              [CharacterId + "07"]: "z"
            },
            "talentCons": {
              "3": data.ranks?.["3"]?.desc.includes('战技等级+2') ? "e" : "q",
              "5": data.ranks?.["3"]?.desc.includes('战技等级+2') ? "q" : "e",
              "a": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 3 : 5,
              "e": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 3 : 5,
              "q": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 5 : 3,
              "t": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 5 : 3,
              "me": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 5 : 3,
              "mt": data.ranks?.["3"]?.desc.includes('战技等级+2') ? 3 : 5,
              "xe": [3, 5]
            }
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

export async function WeaponNew (e, mode) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR)(.*?)(武器|光锥)(数据|资源|资源数据)?(.*?)$/)
  let WeaponId = TextData[4], verLeve
  try {
    if (/^\d{5}$/.test(WeaponId) || /强制|强行|覆盖/.test(e.msg)) {
      console.log(`[liangshi-calc]开始更新ID:${WeaponId}的武器数据`)
      if (!mode) e.reply(`[liangshi-calc]开始更新ID:${WeaponId}的武器数据`)
    } else {
      console.error(`[liangshi-calc]未知的武器ID:${WeaponId}`)
      if (!mode) e.reply('[liangshi-calc]武器ID错误，请检查武器ID格式(5位数字)')
      return false
    }
    let response, ProxyUrl, WeaponData, url, data, verUrl
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
    try {
      verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
      verUrl = await verUrl.json()
      verLeve = verUrl.hsr.latest
      url = `${ProxyUrl}https://static.nanoka.cc/hsr/${verLeve}/zh/lightcone/${WeaponId}.json`
      response = await fetch(url)
      if (!response.ok) { console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`); throw new Error() }
      data = await response.json()
      console.log(`[liangshi-calc]武器：${data.name || "无名"} 云端数据读取成功`)
    } catch (err) {
      console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
      if (response.status === 404) {
        if (!mode) e.reply('[liangshi-calc]云端暂无该武器数据，可等待一段时间后再更新')
        if (!mode) e.reply('数据更新时间(预估)\n星铁：版本更新当天18：00~次日6：00左右')
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
    let typeMap = { 'Knight': "存护", 'Priest': "丰饶", 'Shaman': "同谐", 'Warlock': "虚无", 'Rogue': "巡猎", 'Warrior': "毁灭", 'Mage': "智识", 'Memory': "记忆", 'Elation': "欢愉" }
    let tables = {}, keys = Object.keys(data.refinements?.level).sort((a, b) => parseInt(a) - parseInt(b))
    for (let i = 0; i < data.refinements?.level?.["1"]?.param_list.length || 0; i++) { let values = []; for (const key of keys) { values.push(data.refinements?.level[key].param_list[i]) } tables[(i + 1).toString()] = values }
    let type = typeMap[data.base_type], WeaponName = data.name
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/${type}/${WeaponName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply(`[liangshi-calc]开始更新武器: ${WeaponName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-sr/weapon/${type}/${WeaponName}`, { recursive: true })
      console.log(`[liangshi-calc]武器:${WeaponName} 本地文件夹创建成功`)
    } else { if (!mode) e.reply(`[liangshi-calc]武器: ${WeaponName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
    WeaponData = {
      "id": WeaponId,
      "name": WeaponName,
      "star": data.rarity.slice(-1),
      "desc": data.desc,
      "type": type,
      "typeId": 0,
      "baseAttr": {
        "atk": data.stats[5].base_attack + data.stats[5].base_attack_add * 79,
        "hp": data.stats[5].base_hp + data.stats[5].base_hp_add * 79,
        "def": data.stats[5].base_defence + data.stats[5].base_defence_add * 79
      },
      "growAttr": {
        "atk": data.stats[5].base_attack_add,
        "hp": data.stats[5].base_hp_add,
        "def": data.stats[5].base_defence_add
      },
      "attr": {
        "0": {
          "promote": 0,
          "maxLevel": 20,
          "cost": {
            [data.stats[0].promotion_cost_list[0].item_id]: data.stats[0].promotion_cost_list[0].item_num,
            [data.stats[0].promotion_cost_list[1].item_id]: data.stats[0].promotion_cost_list[1].item_num
          },
          "attrs": {
            "atk": data.stats[0].base_attack,
            "hp": data.stats[0].base_hp,
            "def": data.stats[0].base_defence
          }
        },
        "1": {
          "promote": 1,
          "maxLevel": 30,
          "cost": {
            [data.stats[1].promotion_cost_list[0].item_id]: data.stats[1].promotion_cost_list[0].item_num,
            [data.stats[1].promotion_cost_list[1].item_id]: data.stats[1].promotion_cost_list[1].item_num,
            [data.stats[1].promotion_cost_list[2].item_id]: data.stats[1].promotion_cost_list[2].item_num
          },
          "attrs": {
            "atk": data.stats[1].base_attack,
            "hp": data.stats[1].base_hp,
            "def": data.stats[1].base_defence
          }
        },
        "2": {
          "promote": 2,
          "maxLevel": 40,
          "cost": {
            [data.stats[2].promotion_cost_list[0].item_id]: data.stats[2].promotion_cost_list[0].item_num,
            [data.stats[2].promotion_cost_list[1].item_id]: data.stats[2].promotion_cost_list[1].item_num,
            [data.stats[2].promotion_cost_list[2].item_id]: data.stats[2].promotion_cost_list[2].item_num
          },
          "attrs": {
            "atk": data.stats[2].base_attack,
            "hp": data.stats[2].base_hp,
            "def": data.stats[2].base_defence
          }
        },
        "3": {
          "promote": 3,
          "maxLevel": 50,
          "cost": {
            [data.stats[3].promotion_cost_list[0].item_id]: data.stats[3].promotion_cost_list[0].item_num,
            [data.stats[3].promotion_cost_list[1].item_id]: data.stats[3].promotion_cost_list[1].item_num,
            [data.stats[3].promotion_cost_list[2].item_id]: data.stats[3].promotion_cost_list[2].item_num
          },
          "attrs": {
            "atk": data.stats[3].base_attack,
            "hp": data.stats[3].base_hp,
            "def": data.stats[3].base_defence
          }
        },
        "4": {
          "promote": 4,
          "maxLevel": 60,
          "cost": {
            [data.stats[4].promotion_cost_list[0].item_id]: data.stats[4].promotion_cost_list[0].item_num,
            [data.stats[4].promotion_cost_list[1].item_id]: data.stats[4].promotion_cost_list[1].item_num,
            [data.stats[4].promotion_cost_list[2].item_id]: data.stats[4].promotion_cost_list[2].item_num
          },
          "attrs": {
            "atk": data.stats[4].base_attack,
            "hp": data.stats[4].base_hp,
            "def": data.stats[4].base_defence
          }
        },
        "5": {
          "promote": 5,
          "maxLevel": 70,
          "cost": {
            [data.stats[5].promotion_cost_list[0].item_id]: data.stats[5].promotion_cost_list[0].item_num,
            [data.stats[5].promotion_cost_list[1].item_id]: data.stats[5].promotion_cost_list[1].item_num,
            [data.stats[5].promotion_cost_list[2].item_id]: data.stats[5].promotion_cost_list[2].item_num
          },
          "attrs": {
            "atk": data.stats[5].base_attack,
            "hp": data.stats[5].base_hp,
            "def": data.stats[5].base_defence
          }
        },
        "6": {
          "promote": 6,
          "maxLevel": 80,
          "cost": {},
          "attrs": {
            "atk": data.stats[6].base_attack,
            "hp": data.stats[6].base_hp,
            "def": data.stats[6].base_defence
          }
        }
      },
      "skill": {
        "id": WeaponId,
        "name": data.refinements?.name,
        "desc": data.refinements?.desc.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />').replace(/#/g, '$'),
        "tables": tables
      }
    }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-sr/weapon/${type}/${WeaponName}/data.json`
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
      console.log(`[liangshi-calc]武器：${WeaponName} 数据已写入`)
      if (!mode) e.reply(`[liangshi-calc]武器：${WeaponName}\n数据已写入`)
    } else if (/强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply('[liangshi-calc]武器数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
      console.log(`[liangshi-calc]武器：${WeaponName} 数据已写入`)
      if (!mode) e.reply(`[liangshi-calc]武器：${WeaponName}\n数据已写入`)
    } else {
      if (!mode) e.reply(`[liangshi-calc]武器数据已存在，运行终止。\n如果需要刷新武器数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${WeaponId}武器数据`)
      console.error(`[liangshi-calc]武器：${WeaponName}\n数据已存在`)
      return false
    }
    console.log(`[liangshi-calc]开始下载武器图片资源`)
    let imgs = `./plugins/miao-plugin/resources/meta-sr/weapon/${type}/${WeaponName}`
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/lightconemaxfigures/${WeaponId}.webp`, `${imgs}/splash.webp`, "splash")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/lightconemediumicon/${WeaponId}.webp`, `${imgs}/icon.webp`, "icon")
    if (!mode) e.reply(`[liangshi-calc]武器图片资源下载完成`)
    console.log(`[liangshi-calc]图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-sr/weapon/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取武器配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]武器：${WeaponName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[WeaponId] = { "id": WeaponId, "name": WeaponName, "type": type, "star": data.rarity.slice(-1) }
          console.log(`[liangshi-calc]武器：${WeaponName} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]武器data.json写入失败:\n', err)
              if (!mode) e.reply(`[liangshi-calc]武器：${WeaponName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
              return false
            } else { console.log('[liangshi-calc]武器data.json已更新') }
          })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]武器：${WeaponName} 数据更新完成\n重启后即可使用相关内容`)
    } else { if (!mode) e.reply(`[liangshi-calc]武器：${WeaponName} 数据更新完成\n当前未启用自动写入WeaponData\n手动配置后重启才可使用\n自动写入WeaponData可在config.yaml启用或使用强制更新临时启用一次`)}
    return false
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`) } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}武器数据 进行手动更新\n${err}`)
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

export async function ArtifactNew (e, mode) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?(.*?)$/)
  let ArtifactId = TextData[4], verLeve, ProxyUrl, response, verUrl, ArtifactData, skills = {}, idxs, data
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  try {
    if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ArtifactId}的遗器数据`)
    try {
      verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
      verUrl = await verUrl.json()
      verLeve = verUrl.hsr.latest
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${verLeve}/zh/relicset/${ArtifactId}.json`)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        if (response.status === 404) {
          if (!mode) e.reply(`[liangshi-calc]云端暂无该遗器数据，可等待一段时间后再更新`)
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
    console.log(`[liangshi-calc]开始下载遗器图片资源`)
    let imgs = `./plugins/miao-plugin/resources/meta-sr/artifact/${data.name}`
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/itemfigures/${data.icon?.match(/\/(\d+)(?:\.\w+)?$/)[1]}.webp`, `${imgs}/arti-0.webp`, "套装")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/relicfigures/IconRelic_${ArtifactId}_1.webp`, `${imgs}/arti-1.webp`, "头部")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/relicfigures/IconRelic_${ArtifactId}_2.webp`, `${imgs}/arti-2.webp`, "手部")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/relicfigures/IconRelic_${ArtifactId}_3.webp`, `${imgs}/arti-3.webp`, "躯干")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/relicfigures/IconRelic_${ArtifactId}_4.webp`, `${imgs}/arti-4.webp`, "脚部")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/relicfigures/IconRelic_${ArtifactId}_5.webp`, `${imgs}/arti-5.webp`, "位面球")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/relicfigures/IconRelic_${ArtifactId}_6.webp`, `${imgs}/arti-6.webp`, "连接绳")
    if (!mode) e.reply(`[liangshi-calc]遗器图片资源下载完成`)
    console.log(`[liangshi-calc]图片资源下载完成`)
    let skillsDes = (a, b) => a.replace(/#(\d+)\[i\](%)?/g, (match, ddt, ttd) => (ttd ? (b[parseInt(ddt) - 1] * 100).toFixed(2).replace(/\.00$/, "") : b[parseInt(ddt) - 1].toFixed(4)) + (ttd || "")).replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />')
    skills["2"] = skillsDes(data.require_num["2"].desc, data.require_num["2"].param_list)
    if (data.require_num["4"]?.length > 0) skills["4"] = skillsDes(data.require_num["4"].desc, data.require_num["4"].param_list)
    ArtifactData = {
      "id": ArtifactId,
      "name": data.name,
      "skills": {
        "2": skills["2"],
        "4": skills["4"]
      },
      "idxs": {
        "1": {
          "name": data.parts?.["3" + ArtifactId + "1"]?.name || null,
          "desc": data.parts?.["3" + ArtifactId + "1"]?.desc || null,
          "lore": data.parts?.["3" + ArtifactId + "1"]?.story?.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />') || null,
          "ids": {
            ["3" + ArtifactId + "1"]: 2,
            ["4" + ArtifactId + "1"]: 3,
            ["5" + ArtifactId + "1"]: 4,
            ["6" + ArtifactId + "1"]: 5
          }
        },
        "2": {
          "name": data.parts?.["3" + ArtifactId + "2"]?.name || null,
          "desc": data.parts?.["3" + ArtifactId + "2"]?.desc || null,
          "lore": data.parts?.["3" + ArtifactId + "2"]?.story?.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />') || null,
          "ids": {
            ["3" + ArtifactId + "2"]: 2,
            ["4" + ArtifactId + "2"]: 3,
            ["5" + ArtifactId + "2"]: 4,
            ["6" + ArtifactId + "2"]: 5
          }
        },
        "3": {
          "name": data.parts?.["3" + ArtifactId + "3"]?.name || null,
          "desc": data.parts?.["3" + ArtifactId + "3"]?.desc || null,
          "lore": data.parts?.["3" + ArtifactId + "3"]?.story?.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />') || null,
          "ids": {
            ["3" + ArtifactId + "3"]: 2,
            ["4" + ArtifactId + "3"]: 3,
            ["5" + ArtifactId + "3"]: 4,
            ["6" + ArtifactId + "3"]: 5
          }
        },
        "4": {
          "name": data.parts?.["3" + ArtifactId + "4"]?.name || null,
          "desc": data.parts?.["3" + ArtifactId + "4"]?.desc || null,
          "lore": data.parts?.["3" + ArtifactId + "4"]?.story?.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />') || null,
          "ids": {
            ["3" + ArtifactId + "4"]: 2,
            ["4" + ArtifactId + "4"]: 3,
            ["5" + ArtifactId + "4"]: 4,
            ["6" + ArtifactId + "4"]: 5
          }
        },
        "5": {
          "name": data.parts?.["3" + ArtifactId + "5"]?.name || null,
          "desc": data.parts?.["3" + ArtifactId + "5"]?.desc || null,
          "lore": data.parts?.["3" + ArtifactId + "5"]?.story?.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />') || null,
          "ids": {
            ["3" + ArtifactId + "5"]: 2,
            ["4" + ArtifactId + "5"]: 3,
            ["5" + ArtifactId + "5"]: 4,
            ["6" + ArtifactId + "5"]: 5
          }
        },
        "6": {
          "name": data.parts?.["3" + ArtifactId + "6"]?.name || null,
          "desc": data.parts?.["3" + ArtifactId + "6"]?.desc || null,
          "lore": data.parts?.["3" + ArtifactId + "6"]?.story?.replace(/unbreak/g, 'nobr').replace(/<\/color>/g, '').replace(/<color=#[0-9A-Fa-f]{8}>/g, '').replace(/\\n/g, '<br />') || null,
          "ids": {
            ["3" + ArtifactId + "6"]: 2,
            ["4" + ArtifactId + "6"]: 3,
            ["5" + ArtifactId + "6"]: 4,
            ["6" + ArtifactId + "6"]: 5
          }
        }
      }
    }
    Object.keys(ArtifactData.idxs).forEach(key => {if (ArtifactData.idxs[key].name === null) {delete ArtifactData.idxs[key]}})
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-sr/artifact/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) { console.error('[liangshi-calc]读取遗器配置data.json失败:', err); if (!mode) e.reply(`[liangshi-calc]遗器：${data.name} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`); return false}
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[ArtifactId] = ArtifactData
          console.log(`[liangshi-calc]遗器：${data.name} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]遗器data.json写入失败:\n', err); if (!mode) e.reply(`[liangshi-calc]遗器：${data.name} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`); return false } else { console.log('[liangshi-calc]遗器data.json已更新') }})
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]遗器：${data.name} 数据更新完成\n重启后即可使用相关内容`)
    } else { if (!mode) e.reply(`[liangshi-calc]遗器：${data.name} 数据更新完成\n当前未启用自动写入WeaponData\n手动配置后重启才可使用\n自动写入WeaponData可在config.yaml启用或使用强制更新临时启用一次`)}
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

export async function MonsterNew (e, mode, JsonOk) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, levedata, MonsterData, newValue
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS)(数据|资源|资源数据)?(.*?)$/)
  let ID = TextData[4], verUrl, verLeve
  if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的敌怪数据`)
  try {
    try {
      verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
      verUrl = await verUrl.json()
      verLeve = verUrl.hsr.latest
      if (!JsonOk || !fs.existsSync("./plugins/liangshi-calc/resources/MonsterJson.json")) {
        response = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${verLeve}/HardLevelGroup.json`)
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
        levedata = await response.json()
        console.log(`[liangshi-calc]云端数据读取成功`)
      } else {
        response = fs.readFileSync("./plugins/liangshi-calc/resources/MonsterJson.json", 'utf8')
        levedata = JSON.parse(response)
        console.log(`[liangshi-calc]本地数据读取成功`)
      }
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${verLeve}/zh/monster/${ID}.json`)
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
    let MonsterName = data.name || "无名"
    let imgs = `./plugins/miao-plugin/resources/meta-sr/monster/${MonsterName}`
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/monster/${MonsterName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply(`[liangshi-calc]开始更新敌怪: ${MonsterName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-sr/monster/${MonsterName}`, { recursive: true })
      console.log(`[liangshi-calc]敌怪:${MonsterName} 本地文件夹创建成功`)
    } else { if (!mode) e.reply(`[liangshi-calc]敌怪: ${MonsterName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
    console.log(`[liangshi-calc]开始下载敌怪图片资源`)
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/monsterfigure/Monster_${data.image_path?.match(/\d+/)[0]}.webp`, `${imgs}/splash.webp`, "立绘")
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/monstermiddleicon/Monster_${data.image_path?.match(/\d+/)[0]}.webp`, `${imgs}/preview.webp`, "头像")
    if (!mode) e.reply(`[liangshi-calc]敌怪图片资源下载完成`)
    console.log(`[liangshi-calc]图片资源下载完成`)
    MonsterData = {
      id: data.id,
      name: MonsterName,
      desc: data.desc.replace(/\\n/g, ''),
      camp: data.monster_camp_id,//阵营
      ratio: data.initial_delay_ratio,//首回合延迟
      stance: data.stance_base, //韧性
      weak: data.child?.[0].stance_weak_list, //弱点
      fatigue: data.minimum_fatigue_ratio, //最低抗性
      rank: data.rank, //评级
      child: data.child.length, //变体数量
      attr: {
        Res: {
          PhyRes: data.child?.[0]?.damage_type_resistance .filter(item => item.damage_type === 'Physical').map(item => item.value),
          IceRes: data.child?.[0]?.damage_type_resistance .filter(item => item.damage_type === 'Ice').map(item => item.value),
          FirRes: data.child?.[0]?.damage_type_resistance .filter(item => item.damage_type === 'Fire').map(item => item.value),
          ThuRes: data.child?.[0]?.damage_type_resistance .filter(item => item.damage_type === 'Thunder').map(item => item.value),
          WinRes: data.child?.[0]?.damage_type_resistance .filter(item => item.damage_type === 'Wind').map(item => item.value),
          QuaRes: data.child?.[0]?.damage_type_resistance .filter(item => item.damage_type === 'Quantum').map(item => item.value),
          ImaRes: data.child?.[0]?.damage_type_resistance .filter(item => item.damage_type === 'Imaginary').map(item => item.value)
        },
        hp: levedata.slice(0, 100).map(i => +(data.hp_base * i.HPRatio).toFixed(3)),
        def: levedata.slice(0, 100).map(i => +(data.defence_base * i.DefenceRatio).toFixed(3)),
        atk: levedata.slice(0, 100).map(i => +(data.attack_base * i.AttackRatio).toFixed(3)),
        speed: levedata.slice(0, 100).map(i => +(data.speed_base * i.SpeedRatio).toFixed(3)),
        effPct: levedata.slice(0, 100).map(i => +(0 + (i.StatusProbability || 0) * 100).toFixed(3)), //效果命中
        effDef: levedata.slice(0, 100).map(i => +(data.status_resistance_base + (i.StatusResistance || 0) * 100).toFixed(3)), //效果抵抗
        cdmg: data.critical_damage_base
      },
      skill: data.child?.[0]?.skill_list.map(({ id, skill_name: name, skill_desc: desc, damage_type: type, sp_hit_base: hit }) => ({ id, name, desc, type, hit })),
      drop: {
        level: data.drop[data.drop.length - 1].avatar_exp_reward,
        itme: data.drop[data.drop.length - 1]?.display_item_list?.map(y => y.id ?? "")
      }
    }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-sr/monster/${MonsterName}/data.json`
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
      console.log(`[liangshi-calc]敌怪：${MonsterName} 数据已写入`)
      if (!mode) e.reply(`[liangshi-calc]敌怪：${MonsterName}\n数据已写入`)
    } else if (/强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply('[liangshi-calc]敌怪数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
      console.log(`[liangshi-calc]敌怪：${MonsterName} 数据已写入`)
      if (!mode) e.reply(`[liangshi-calc]敌怪：${MonsterName}\n数据已写入`)
    } else {
      if (!mode) e.reply(`[liangshi-calc]敌怪数据已存在，运行终止。\n如果需要刷新敌怪数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}敌怪数据`)
      console.error(`[liangshi-calc]敌怪：${MonsterName}\n数据已存在`)
    }
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-sr/monster/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取敌怪配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]敌人：${MonsterName} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          newValue = { "id": ID, "name": MonsterName }
          jsonData[ID] = newValue
          console.log(`[liangshi-calc]敌怪：${MonsterName} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]敌怪data.json写入失败:\n', err)
              if (!mode) e.reply(`[liangshi-calc]敌怪：${MonsterName} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
              return false
            } else { console.log('[liangshi-calc]敌怪data.json已更新') }
          })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]敌怪：${MonsterName} 数据更新完成\n重启后即可使用相关内容`)
    } else { if (!mode) e.reply(`[liangshi-calc]敌怪：${MonsterName} 数据更新完成\n当前未启用自动写入MonsterData\n手动配置后重启才可使用\n自动写入MonsterData可在config.yaml启用或使用强制更新临时启用一次`)}
    return false
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
    } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json"
      let oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}'
      let y = JSON.parse(oldLog)
      y[new Date()] = { name: TextData[4], err, text: "武器更新错误" }
      let bbxzData = JSON.stringify(y, null, 2)
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') } })
    }
    return true
  }
}

export async function ItemNew (e, mode, JsonOk) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR)(.*?)物品(数据|资源|资源数据)?(.*?)$/)
  let ID = TextData[4]
  try {
    try {
      verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
      verUrl = await verUrl.json()
      verLeve = verUrl.hsr.latest
      if (!JsonOk || !fs.existsSync("./plugins/liangshi-calc/resources/ItemJson.json")) {
        response = await fetch(`${ProxyUrl}https://static.nanoka.cc/hsr/${verLeve}/zh/item_all.json`)
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
    let ItemData, ItemName, ItemType, rarKay = {
      "SuperRare": 5,
      "VeryRare": 4,
      "Rare": 3,
      "NotNormal": 2
    }
    data = data[ID]
    ItemName = data?.item_name
    ItemType = data?.item_sub_type
    ItemData = {
      "id": ID,
      "name": ItemName,
      "type": ItemType,
      "desc": data?.item_desc?.replace(/\\n/g, ''),
      "stone": data?.item_bg_desc,
      "rarity": rarKay[data?.rarity],
      "display": data?.inventory_display_tag,
      "purpose": data?.purpose_type,
      "pile": data?.pile_limit, //最大堆叠数量
      "from": data?.from?.map(y => y.desc ?? "")
    }
    let imgs = `./plugins/miao-plugin/resources/meta-sr/material`
    await getImg(ProxyUrl + `https://static.nanoka.cc/assets/hsr/itemfigures/${ID}.webp`, `${imgs}/${ItemType}/${ItemName}.webp`, "图标")
    if (!mode) e.reply(`[liangshi-calc]物品图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-sr/material/data.json`
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
