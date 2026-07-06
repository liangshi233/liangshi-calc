import common from '../../../../../lib/common/common.js'
import { Common } from '../../../components/index.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'


/**
 * 原神API4
 * nanoka.cc
 *
 * 如果有新的问题建议去issue反馈
 */


export async function New (e) {
  let cfg = LSconfig.getConfig('user', 'config')
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let characterTime, weaponTime, artifactTime, monsterTime, itemTime, url, character, status, response, ProxyUrl, version, artifact, data, weapon, monster, ItemJson, ItemOk
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  try {
    url = `${ProxyUrl}https://static.nanoka.cc/manifest.json`
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
    console.log(`[liangshi-calc]云端数据读取成功`)
  } catch (err) {
    e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
    console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
    return false
  }
  version = data.gi.latest || "1.0.00"
  character = data.gi.new.character || []
  weapon = data.gi.new.weapon || []
  artifact = data.gi.new.artifact || []
  monster = data.gi.new.monster || []
  if (/完整|全部/.test(e.msg)) {
    let Characterurl, Weaponurl, Artifacturl, Monsterurl, Itemurl
    status = "完整"
    try {
      Characterurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/character.json`)
      Characterurl = await Characterurl.json()
      character = Object.keys(Characterurl).map(Number)
      Weaponurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/weapon.json`)
      Weaponurl = await Weaponurl.json()
      weapon = Object.keys(Weaponurl).map(Number)
      Artifacturl = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/artifact.json`)
      Artifacturl = await Artifacturl.json()
      artifact = Object.keys(Artifacturl).map(Number)
      Monsterurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/monster.json`)
      Monsterurl = await Monsterurl.json()
      monster = Object.keys(Monsterurl).map(Number)
      Itemurl = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/zh/item_all.json`)
      Itemurl = await Itemurl.json()
      data.gi.new.item = Object.keys(Itemurl).map(Number)
    } catch (err) { console.log(err) }
  }
  if (/角色|共鸣者/.test(e.msg)) {
    weapon = [], artifact = [], data.gi.new.item = [], monster = []
  } else if (/武器|光锥|弧盘/.test(e.msg)) {
    character = [], artifact = [], data.gi.new.item = [], monster = []
  } else if (/圣遗物|声骸|遗器|终端|卡带|驱动块/.test(e.msg)) {
    character = [], weapon = [], data.gi.new.item = [], monster = []
  } else if (/物品|材料/.test(e.msg)) {
    character = [], weapon = [], artifact = [], monster = []
  } else if (/敌人|敌怪|怪物|残响|残像|boss|BOSS|异象/.test(e.msg)) {
    character = [], weapon = [], artifact = [], data.gi.new.item = []
  }
  let UseTime = Math.round(((5 + character.length * 16 + weapon.length * 2 + artifact.length * 1 + monster.length * 1 + data.gi.new.item.length * 2) / 60) * 10) / 10
  let y = Math.round(UseTime * 0.75 * 10) / 10
  e.reply(`[liangshi-calc] 即将静默更新\n原神 ${version}版本新内容\n共计\n\n${character.length}名新角色\n${weapon.length}个新武器\n${artifact.length}个新圣遗物\n${monster.length}个新敌人\n${data.gi.new.item.length}个新物品\n\n预计需要${y}~${UseTime}分钟，请耐心等待.\n(*/ω＼*)`)
  await common.sleep(2000)
  ItemOk = true
  if (!fs.existsSync("./plugins/liangshi-calc/resources/log.json")) { fs.writeFileSync("./plugins/liangshi-calc/resources/log.json", '{}'); console.log(`[liangshi-calc]未找到错误日志文件，已自动创建`)}
  if ((data.gi.new.item.length + monster.length) > 0) {
    try {
      let url = `${ProxyUrl}https://static.nanoka.cc/gi/${version}/zh/item_all.json`
      ItemJson = await fetch(url)
      if (!response.ok) { ItemOk = false }
      ItemJson = await ItemJson.json()
      fs.writeFile(`./plugins/liangshi-calc/resources/ItemJson.json`, JSON.stringify(ItemJson), 'utf8', (err) => { if (err) { ItemOk = false } else { console.log(`[liangshi-calc] 物品Json已缓存至本地`) } })
    } catch (error) { ItemOk = false; console.error(`[liangshi-calc] Json缓存失败\n${error}`) }
  }
  let instruction = { msg: null, isMaster: true, reply: e.reply }
  for (const charId of character) {
    instruction.msg = `#梁氏覆盖更新原神${charId}角色数据`
    await common.sleep(2000)
    await CharacterNew(instruction, true, version)
  }
  characterTime =  `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const weaponId of weapon) {
    instruction.msg = `#梁氏覆盖更新原神${weaponId}武器数据`
    await common.sleep(1500)
    await WeaponNew(instruction, true, version)
  }
  weaponTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const artifactId of artifact) {
    await common.sleep(1500)
    instruction.msg = `#梁氏覆盖更新原神${artifactId}圣遗物数据`
    await ArtifactNew(instruction, true, version)
  }
  artifactTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const monsterId of monster) {
    await common.sleep(1500)
    instruction.msg = `#梁氏覆盖更新原神${monsterId}敌人数据`
    await MonsterNew(instruction, true, ItemOk, version)
  }
  monsterTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  for (const itemId of data.gi.new.item) {
    await common.sleep(1000)
    instruction.msg = `#梁氏覆盖更新原神${itemId}物品数据`
    await ItemNew(instruction, true, ItemOk, version)
  }
  itemTime = `${new Date().getFullYear()}-${(new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1)}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()} ${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`
  await common.sleep(2000)
  let verDataPath = `./plugins/miao-plugin/resources/meta-gs/data.json`
  if (!fs.existsSync(verDataPath)) fs.writeFileSync(verDataPath, '{}')
  fs.readFile(verDataPath, 'utf8', (err, TextData) => {
    if (err) return false
    try {
      let verData = JSON.parse(TextData)
      let Time = new Date()
      let dayTime = `${Time.getFullYear()}-${Time.getMonth() + 1}-${Time.getDate()} ${Time.getHours()}:${Time.getMinutes()}`
      verData.ver = version
      verData.time = dayTime
      let api = "nanoka.cc"
      verData[dayTime] = {
        "ver": version,
        "api": api,
        "time": dayTime,
        "artifact": artifact,
        "character": character,
        "monster": monster,
        "material": data.gi.new.item,
        "weapon": weapon,
        "status": status
      }
      let updatedData = JSON.stringify(verData, null, 2)
      fs.writeFile(verDataPath, updatedData, 'utf8', (err) => { if (err) return false })
    } catch (err) { console.log(err) }
  })
  if ((data.gi.new.item.length + monster.length) > 0) fs.unlink('./plugins/liangshi-calc/resources/ItemJson.json', (err) => { if (err) { console.error('[liangshi-calc] 物品Json缓存删除失败:', err.message) } else { console.log(`[liangshi-calc] 物品Json缓存已删除`) }})
  let CharacterNamedata, CharacterText, WeaponText, WeaponNamedata, ArtifactText, ArtifactNamedata, MonsterText, MonsterNamedata
  try {
    CharacterText = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/character.json`)
    WeaponText = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/weapon.json`)
    ArtifactText = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/artifact.json`)
    MonsterText =  await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${version}/monster.json`)
    CharacterNamedata = await CharacterText.json()
    WeaponNamedata = await WeaponText.json()
    ArtifactNamedata = await ArtifactText.json()
    MonsterNamedata = await MonsterText.json()
    console.log(`[liangshi-calc]云端数据读取成功`)
  } catch (err) { console.log(`[liangshi-calc]云端数据读取异常`); e.reply('[liangshi-calc]网络不佳，请稍后重试'); return false }

  let CharacterNameText = character.map(num => CharacterNamedata[num.toString()]?.["zh"] ?? `${num.toString()}`)
  let WeaponNameText = weapon.map(num => WeaponNamedata[num.toString()]?.["zh"] ?? `${num.toString()}`)
  let ArtifactNameText = artifact.map(num => ArtifactNamedata[num.toString()]?.["set"]?.["2" + num.toString() + "0"]?.["name"]?.["zh"] ?? `${num.toString()}`)
  let MonsterNameText = monster.map(num => MonsterNamedata[num.toString()]?.["zh"] ?? `${num.toString()}`)
  try {
    let c, b, d, i, f, g, h, j
    c = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/character/data.json', 'utf8')
    c = JSON.parse(c)
    d = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/bow/data.json', 'utf8')
    d = JSON.parse(d)
    i = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/catalyst/data.json', 'utf8')
    i = JSON.parse(i)
    f = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/claymore/data.json', 'utf8')
    f = JSON.parse(f)
    g = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/polearm/data.json', 'utf8')
    g = JSON.parse(g)
    b = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/projection/data.json', 'utf8')
    b = JSON.parse(b)
    h = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/sword/data.json', 'utf8')
    h = JSON.parse(h)
    Object.values(d).forEach(ccb => {ccb.type = "bow"})
    Object.values(i).forEach(ccb => {ccb.type = "catalyst"})
    Object.values(f).forEach(ccb => {ccb.type = "claymore"})
    Object.values(g).forEach(ccb => {ccb.type = "polearm"})
    Object.values(b).forEach(ccb => {ccb.type = "projection"})
    Object.values(h).forEach(ccb => {ccb.type = "sword"})
    j = { ...d, ...i, ...f, ...g, ...b, ...h }
    let chars = character.filter(id => c.hasOwnProperty(id)).map(id => ({
      face: `/meta-gs/character/${c[id].name}/imgs/face.webp`,
      name: c[id].name || "无名",
      abbr: c[id].abbr || c[id].name || "",
      star: c[id].star
    }))
    let weapons = weapon.filter(id => j.hasOwnProperty(id)).map(id => ({
      face: `/meta-gs/weapon/${j[id].type}/${j[id].name}/icon.webp`,
      name: j[id].name,
      abbr: j[id].abbr || j[id].name,
      star: j[id].star
    }))
    let artis = ArtifactNameText.map(id => ({
      face: `/meta-gs/artifact/imgs/${id}/1.webp`,
      name: id,
      star: 5
    }))
    let monster = MonsterNameText.map(id => ({
      face: `/meta-gs/monster/${id}/icon.webp`,
      name: id,
      star: 5
    }))
    return await Common.render('wiki/data/ver-new', {
      gamever: version,
      gameid: "原神",
      TxName: { js: "角色", wq: "武器", zb: "圣遗物", dr: "敌人" },
      jsNum: character.length,
      wqNum: weapon.length,
      zbNum: artifact.length,
      drNum: monster.length,
      wpNum: data.gi.new.item.length,
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
    if (WeaponNameText.length === 0) WeaponNameText = `本次没有更新任何武器`
    if (ArtifactNameText.length === 0) ArtifactNameText = `本次没有更新任何圣遗物`
    e.reply(`[liangshi-calc] 原神 ${version} 版本更新完成\n已为您更新\n\n角色：\n${CharacterNameText}\n\n武器：\n${WeaponNameText}\n\n圣遗物：\n${ArtifactNameText}\n\n物品${data.gi.new.item.length}个\n\n重启后即可使用相关内容`)
    return false
  }
}

export async function CharacterNew (e, mode, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS)(.*?)(角色|共鸣者)(数据|资源|资源数据)?(.*?)$/)
  let CharacterId = TextData[4], verLeve
  try {
    if (/^\d{8}$/.test(CharacterId) || /强制|强行|覆盖/.test(e.msg)) {
      console.log(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
      if (!mode) e.reply(`[liangshi-calc]开始更新ID:${CharacterId}的角色数据`)
    } else {
      console.error(`[liangshi-calc]未知的角色ID:${CharacterId}`)
      if (!mode) e.reply('[liangshi-calc]角色ID错误，请检查角色ID格式(8位数字)')
      return false
    }
    let response, ProxyUrl, CharacterData, url, data, verUrl
    if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.gi.latest
      } else { verLeve = version }
      url = `${ProxyUrl}https://static.nanoka.cc/gi/${verLeve}/zh/character/${CharacterId}.json`
      response = await fetch(url)
      if (!response.ok) { console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`); throw new Error() }
      data = await response.json()
      console.log(`[liangshi-calc]角色：${data.name || "无名"} 云端数据读取成功`)
    } catch (err) {
      console.error("[liangshi-calc]云端拉取数据时发生错误\n", err)
      if (response.status === 404) {
        if (!mode) e.reply('[liangshi-calc]云端暂无该角色数据，可等待一段时间后再更新')
        if (!mode) e.reply('数据更新时间(预估)\n原神：版本更新当天18：00~次日6：00左右')
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
    let imgs = `./plugins/miao-plugin/resources/meta-gs/character/${CharacterName}/imgs`
    let icons = `./plugins/miao-plugin/resources/meta-gs/character/${CharacterName}/icons`
    if (!fs.existsSync(imgs)) { fs.mkdirSync(imgs, { recursive: true }); console.log(`[liangshi-calc]角色：${CharacterName} 本地imgs文件夹创建成功`) }
    if (!fs.existsSync(icons)) { fs.mkdirSync(icons, { recursive: true }); console.log(`[liangshi-calc]角色：${CharacterName} 本地icons文件夹创建成功`) }
    let talentData = (p) => Object.entries(p).sort(([a], [b]) => a - b).reduce((r, [l, d]) => {
      d.desc.forEach((ln, i) => {
        if (!ln.trim()) return
        let [k,...s] = ln.split('|'), t = s.join('|').trim(), x = k.trim(), re = /({param\d+:F?\d?P?I?})|([\+\-\*\/])(\d*\.?\d+)/g
        let pr = [], cp = [], li = 0, m
        while((m = re.exec(t)) !== null) {
          let seg = t.slice(li,m.index).trim()
          if (seg) {
            let ps = seg.split(/([\+\-\*\/])/).filter(Boolean)
            ps.forEach(pt => { let n = Number(pt); if (!isNaN(n)) { pr.push(n); cp.push(n) } })
          }
          if (m[1]) {
            let pm = m[1].match(/{param(\d+):(F?\d?P?I?)}/)
            if (pm) {
              let v = d.param[+pm[1] - 1]
              let f = pm[2]
              v = (() => {
                if (f.includes('I')) return Math.round(v)
                if (f.includes('P')) v = v * 100
                if (f.includes('F')){ let m = Math.pow(10,f.match(/F(\d)/)?.[1] || 2); return Math.round(v * m) / m } else { v = Math.round(v) }
                return v
              })()
              pr.push(v); cp.push(v)
            }
          } else if (m[2] && m[3]) { let n = Number(m[3]); if(!isNaN(n)){ pr.push(n); cp.push(`${m[2]}${n}`) } }
          li = re.lastIndex
        }
        let suf = t.slice(li).trim()
        if (suf) { let ps = suf.split(/([\+\-\*\/])/).filter(Boolean); ps.forEach(pt => { let n = Number(pt); if(!isNaN(n)){pr.push(n); cp.push(n)} }) }
        let hasOp = /[\+\-\*\/]/.test(t), op = t.match(/[+\-*/]/g) || []
        if (!r[x]) { r[x] = Array(Object.keys(p).length).fill(null) }
        let idx = Object.keys(p).indexOf(l)
        if (pr.length > 1 || hasOp) {
          let nk =`${x}2`, res
          if (!r[nk]) { r[nk] = Array(Object.keys(p).length).fill([]) }
          r[nk][idx] = pr.filter(v => !isNaN(v))
          try {
            if (pr.length === 0) throw new Error()
            if (pr.length === 1) throw new Error()
            if (op.length === 0) throw new Error()
            let vo = op.slice(0, Math.min(op.length, pr.length-1))
            res = pr[0]
            for (let i = 0; i < vo.length; i++){
              let n = pr[i+1];
              switch(vo[i]) {
                case'+': res+=n; break
                case'-': res-=n; break
                case'*': res*=n; break
                case'/': res/=n; break
                default: throw new Error()
              }
            }
          } catch(e) { res = pr[0] }
          r[x][idx] = Math.round(res * 100) / 100 || 100
        } else { r[x][idx] = pr[0] ?? (d.param?.length ? Math.round(d.param[0]) : null) }
      })
      return r
    },{})
    let tablesData = (a) => { let b = Object.values(a), c = b[0]; return c.desc .filter(d => d.trim() !== "") .map(d => { let [e, f] = d.split('|'), g = f.match(/[\u4e00-\u9fa5]+$/), h = g ? g[0] : "", i = g ? f.replace(g[0], '') : f, j = b.map(() => i); return { name: e.trim(), unit: h, isSame: false, values: j }})}
    let tfData = (a, b) => { return a.map(c => { let d = c.values.map((e, f) => { return e.replace(/{param(\d+):([A-Z0-9.]+)}/g, (g, h, i) => { let j = f.toString(), k = b[j]?.param?.[parseInt(h) - 1], l; if (i.includes('P')) { let m = k * 100; if (i.startsWith('F')) { let n = parseInt(i.substring(1, i.indexOf('P'))); l = `${m.toFixed(n)}%` } else { l = `${Math.round(m)}%` } } else if (i.includes('F')) { let n = parseInt(i.substring(1)); l = k?.toFixed(n) } else if (i === 'I') { l = Math.floor(k).toString() } else { l = Math.round(k).toString() } return l})}); return { ...c, values: d }})}
    let Qkey = data.constellations[2].desc.includes("替代冲刺") ? 3 : 2
    let weaKey = { WEAPON_SWORD_ONE_HAND: "sword", WEAPON_CLAYMORE: "claymore", WEAPON_POLE: "polearm", WEAPON_CATALYST: "catalyst",  WEAPON_BOW: "bow" }
    let gowKey = {
      "fight_prop_hp_percent": "hpPct",
      "fight_prop_attack_percent": "atkPct",
      "fight_prop_defense_percent": "defPct",
      "fight_prop_charge_efficiency": "recharge",
      "fight_prop_element_mastery": "mastery",
      "fight_prop_critical_hurt": "cdmg",
      "fight_prop_critical": "cpct",
      "fight_prop_heal_add": "heal",
      "fight_prop_ice_add_hurt": "dmg",
      "fight_prop_grass_add_hurt": "dmg",
      "fight_prop_rock_add_hurt": "dmg",
      "fight_prop_wind_add_hurt": "dmg",
      "fight_prop_water_add_hurt": "dmg",
      "fight_prop_fire_add_hurt": "dmg",
      "fight_prop_elec_add_hurt": "dmg",
    }
    CharacterData = {
      "id": CharacterId,
      "name": data.name,
      "abbr": data.name.length >= 5 ? data.name.slice(-2) : data.name,
      "title": data.chara_info.title,
      "star": data.rarity === "QUALITY_PURPLE" ? 4 : 5,
      "elem": data.element.toLowerCase(),
      "allegiance": data.chara_info.native,
      "weapon": weaKey[data.weapon],
      "birth": `${data.chara_info.birth[0] || 1}-${data.chara_info.birth[1] || 1}`,
      "astro": data.chara_info.constellation,
      "desc": data.desc,
      "cncv": data.chara_info.va.chinese,
      "jpcv": data.chara_info.va.japanese,
      "costume": false,
      "ver": 1,
      "baseAttr": {
        "hp": Math.round(data.base_hp * data.stats_modifier?.hp?.["100"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_hp),
        "atk": Math.round((data.base_atk * data.stats_modifier?.atk?.["100"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_attack) * 100) / 100,
        "def": Math.round((data.base_def * data.stats_modifier?.def?.["100"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_defense) * 100) / 100
      },
      "growAttr": {
        "key": gowKey[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]],
        "value": Math.round((data.stats_modifier?.ascension?.[5]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)) * 100) / 100
      },
      "talentId": {
        [10001 + CharacterId.slice(-3) * 10]: "a",
        [10002 + CharacterId.slice(-3) * 10]: "e",
        [10005 + CharacterId.slice(-3) * 10]: "q"
      },
      "talentCons": {
        "a": 0,
        "e": 0,
        "q": 0
      },
      "materials": {
        "gem": data.materials.ascensions?.[5]?.mats?.[0].name,
        "boss": data.materials.ascensions?.[5]?.mats?.[1].name,
        "specialty": data.materials.ascensions?.[5]?.mats?.[2].name,
        "normal": data.materials.ascensions?.[5]?.mats?.[3].name,
        "talent": data.materials.talents?.[0]?.[8]?.mats?.[0].name,
        "weekly": data.materials.talents?.[0]?.[8]?.mats?.[2].name
      },
      "talent": {
        "a": {
          "id": data.skills?.[0].id,
          "name": data.skills?.[0].name,
          "desc": data.skills?.[0].desc.replace(/^<color=#FFD780FF>(.*?)<\/color>\\n/g, '<h3>$1</h3>\\n').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== ""),
          "tables": tfData(tablesData(data.skills?.[0].promote), data.skills?.[0].promote).map(item => ({ ...item, isSame: new Set(item.values).size === 1 }))
        },
        "e": {
          "id": data.skills?.[1].id,
          "name": data.skills?.[1].name,
          "desc": data.skills?.[1].desc.replace(/^<color=#FFD780FF>(.*?)<\/color>\\n/g, '<h3>$1</h3>\\n').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== ""),
          "tables": tfData(tablesData(data.skills?.[1].promote), data.skills?.[1].promote).map(item => ({ ...item, isSame: new Set(item.values).size === 1 }))
        },
        "q": {
          "id": data.skills?.[Qkey].id,
          "name": data.skills?.[Qkey].name,
          "desc": data.skills?.[Qkey].desc.replace(/^<color=#FFD780FF>(.*?)<\/color>\\n/g, '<h3>$1</h3>\\n').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== ""),
          "tables": tfData(tablesData(data.skills?.[Qkey].promote), data.skills?.[Qkey].promote).map(item => ({ ...item, isSame: new Set(item.values).size === 1 }))
        }
      },
      "talentData": {
        "a": talentData(data.skills?.[0]?.promote),
        "e": talentData(data.skills?.[1]?.promote),
        "q": talentData(data.skills?.[Qkey]?.promote)
      },
      "cons": {
        "1": {
          "name": data.constellations?.[0]?.name,
          "desc": data.constellations?.[0]?.desc.replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== "")
        },
        "2": {
          "name": data.constellations?.[1]?.name,
          "desc": data.constellations?.[1]?.desc.replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== "")
        },
        "3": {
          "name": data.constellations?.[2]?.name,
          "desc": data.constellations?.[2]?.desc.replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== "")
        },
        "4": {
          "name": data.constellations?.[3]?.name,
          "desc": data.constellations?.[3]?.desc.replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== "")
        },
        "5": {
          "name": data.constellations?.[4]?.name,
          "desc": data.constellations?.[4]?.desc.replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== "")
        },
        "6": {
          "name": data.constellations?.[5]?.name,
          "desc": data.constellations?.[5]?.desc.replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== "")
        }
      },
      "passive": data.passives.map(({ icon, unlock, param_list, ...rest }) => ({ ...rest, desc: rest.desc.replace(/\{LINK#\w+}|\{\/LINK}/g, '').replace(/\\n\\n<color=#FFD780FF>(.*?)<\/color>\\n/g, '\\n\\n<h3>$1</h3>\\n').replace(/<color=#\w+>|<\/color>/g, '').split('\\n').filter(item => item !== "") })),
      "attr": {
        "keys": [
          "hpBase",
          "atkBase",
          "defBase",
          gowKey[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]]
        ],
        "details": {
          "1": [
            data.base_hp * data.stats_modifier?.hp?.["1"],
            data.base_atk * data.stats_modifier?.atk?.["1"],
            data.base_def * data.stats_modifier?.def?.["1"],
            0
          ],
          "20": [
            data.base_hp * data.stats_modifier?.hp?.["20"],
            data.base_atk * data.stats_modifier?.atk?.["20"],
            data.base_def * data.stats_modifier?.def?.["20"],
            0
          ],
          "40": [
            data.base_hp * data.stats_modifier?.hp?.["40"] + data.stats_modifier?.ascension?.[0]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["40"] + data.stats_modifier?.ascension?.[0]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["40"] + data.stats_modifier?.ascension?.[0]?.fight_prop_base_defense,
            0
          ],
          "50": [
            data.base_hp * data.stats_modifier?.hp?.["50"] + data.stats_modifier?.ascension?.[1]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["50"] + data.stats_modifier?.ascension?.[1]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["50"] + data.stats_modifier?.ascension?.[1]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[1]?.[Object.keys(data.stats_modifier?.ascension?.[1])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "60": [
            data.base_hp * data.stats_modifier?.hp?.["60"] + data.stats_modifier?.ascension?.[2]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["60"] + data.stats_modifier?.ascension?.[2]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["60"] + data.stats_modifier?.ascension?.[2]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[3]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "70": [
            data.base_hp * data.stats_modifier?.hp?.["70"] + data.stats_modifier?.ascension?.[3]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["70"] + data.stats_modifier?.ascension?.[3]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["70"] + data.stats_modifier?.ascension?.[3]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[3]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "80": [
            data.base_hp * data.stats_modifier?.hp?.["80"] + data.stats_modifier?.ascension?.[4]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["80"] + data.stats_modifier?.ascension?.[4]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["80"] + data.stats_modifier?.ascension?.[4]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[4]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "90": [
            data.base_hp * data.stats_modifier?.hp?.["90"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["90"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["90"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[5]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "100": [
            data.base_hp * data.stats_modifier?.hp?.["100"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["100"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["100"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[5]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "20+": [
            data.base_hp * data.stats_modifier?.hp?.["20"] + data.stats_modifier?.ascension?.[0]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["20"] + data.stats_modifier?.ascension?.[0]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["20"] + data.stats_modifier?.ascension?.[0]?.fight_prop_base_defense,
            0
          ],
          "40+": [
            data.base_hp * data.stats_modifier?.hp?.["40"] + data.stats_modifier?.ascension?.[1]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["40"] + data.stats_modifier?.ascension?.[1]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["40"] + data.stats_modifier?.ascension?.[1]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[1]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "50+": [
            data.base_hp * data.stats_modifier?.hp?.["50"] + data.stats_modifier?.ascension?.[2]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["50"] + data.stats_modifier?.ascension?.[2]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["50"] + data.stats_modifier?.ascension?.[2]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[3]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "60+": [
            data.base_hp * data.stats_modifier?.hp?.["60"] + data.stats_modifier?.ascension?.[3]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["60"] + data.stats_modifier?.ascension?.[3]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["60"] + data.stats_modifier?.ascension?.[3]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[3]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "70+": [
            data.base_hp * data.stats_modifier?.hp?.["70"] + data.stats_modifier?.ascension?.[4]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["70"] + data.stats_modifier?.ascension?.[4]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["70"] + data.stats_modifier?.ascension?.[4]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[4]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "80+": [
            data.base_hp * data.stats_modifier?.hp?.["80"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["80"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["80"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[5]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ],
          "90+": [
            data.base_hp * data.stats_modifier?.hp?.["90"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_hp,
            data.base_atk * data.stats_modifier?.atk?.["90"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_attack,
            data.base_def * data.stats_modifier?.def?.["90"] + data.stats_modifier?.ascension?.[5]?.fight_prop_base_defense,
            data.stats_modifier?.ascension?.[5]?.[Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]] * ((Object.keys(data.stats_modifier?.ascension?.[0])[Object.keys(data.stats_modifier?.ascension?.[0]).length - 1]) === "fight_prop_element_mastery" ? 1 : 100)
          ]
        }
      }
    }
    if ((data.constellations[2]?.desc.includes(data.skills[2].name) || data.constellations[4].desc.includes(data.skills[2].name)) && !data.constellations[2].desc.includes("替代冲刺")) {
      CharacterData.talentCons.q = data.constellations[2].desc.includes(data.skills[2].name) ? 3 : 5
    } else if (data.constellations[2]?.desc.includes(data.skills[3].name) || data.constellations[4].desc.includes(data.skills[3].name)) {
      CharacterData.talentCons.q = data.constellations[2].desc.includes(data.skills[3].name) ? 3 : 5
    }
    if (data.constellations[2]?.desc.includes(data.skills[1].name) || data.constellations[4].desc.includes(data.skills[1].name)) {
      CharacterData.talentCons.e = data.constellations[2].desc.includes(data.skills[1].name) ? 3 : 5
    }
    if (data.constellations[2]?.desc.includes(data.skills[0].name) || data.constellations[4].desc.includes(data.skills[0].name)) {
      CharacterData.talentCons.a = data.constellations[2].desc.includes(data.skills[0].name) ? 3 : 5
    }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-gs/character/${CharacterName}/data.json`
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
    let IconUrl = `${ProxyUrl}https://static.nanoka.cc/assets/gi/`
    await getImg(IconUrl + data.icon.replace("UI_AvatarIcon_", "UI_Gacha_AvatarImg_") + ".webp", `${imgs}/splash.webp`, "立绘")
    await getImg(IconUrl + data.icon + ".webp", `${imgs}/face.webp`, "大头")
    await getImg(IconUrl + data.chara_info.namecard.icon + ".webp", `${imgs}/card.webp`, "名片")
    await getImg(IconUrl + data.passives?.[0]?.icon + ".webp", `${icons}/passive-0.webp`, "固有天赋1")
    await getImg(IconUrl + data.passives?.[1]?.icon + ".webp", `${icons}/passive-1.webp`, "固有天赋2")
    await getImg(IconUrl + data.passives?.[2]?.icon + ".webp", `${icons}/passive-2.webp`, "固有天赋3")
    await getImg(IconUrl + data.passives?.[3]?.icon + ".webp", `${icons}/passive-3.webp`, "固有天赋4")
    await getImg(IconUrl + data.skills[1].promote[0].icon + ".webp", `${icons}/talent-e.webp`, "元素战技")
    await getImg(IconUrl + data.skills[Qkey].promote[Qkey].icon + ".webp", `${icons}/talent-q.webp`, "元素爆发")
    if (Qkey === 3) await getImg(IconUrl + data.skills[2].promote[0].icon + ".webp", `${icons}/talent-t.webp`, "替代冲刺")
    await getImg(IconUrl + data.constellations[0]?.icon + ".webp", `${icons}/cons-1.webp`, "1命")
    await getImg(IconUrl + data.constellations[1]?.icon + ".webp", `${icons}/cons-2.webp`, "2命")
    await getImg(IconUrl + data.constellations[2]?.icon + ".webp", `${icons}/cons-3.webp`, "3命")
    await getImg(IconUrl + data.constellations[3]?.icon + ".webp", `${icons}/cons-4.webp`, "4命")
    await getImg(IconUrl + data.constellations[4]?.icon + ".webp", `${icons}/cons-5.webp`, "5命")
    await getImg(IconUrl + data.constellations[5]?.icon + ".webp", `${icons}/cons-6.webp`, "6命")
    if(!mode) e.reply(`[liangshi-calc]角色图片资源下载完成`)
    console.log(`[liangshi-calc]图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = "./plugins/miao-plugin/resources/meta-gs/character/data.json"
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取角色配置data.json失败:', err)
          if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
          if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[CharacterId] = {
            "id": Number(CharacterId),
            "name": data.name,
            "abbr": data.name.length >= 5 ? data.name.slice(-2) : data.name,
            "star": data.rarity === "QUALITY_PURPLE" ? 4 : 5,
            "elem": CharacterData.elem,
            "weapon": CharacterData.weapon,
            "talentId": CharacterData.talentId,
            "talentCons": CharacterData.talentCons
          }
          console.log(`[liangshi-calc]角色${CharacterId} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]角色data.json写入失败:\n', err)
              if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n尝试自动写入CharacterData时失败\n请手动添加后重启使用`)
              if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
              return false
            } else { console.log('[liangshi-calc]角色data.json已更新') }
          })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n重启后即可使用${CharacterName}相关内容`)
      if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]角色：${CharacterName}\n数据更新完成\n当前未启用自动写入CharacterData\n手动配置后重启才可使用\n自动写入CharacterData可在config.yaml启用或使用强制更新临时启用一次`)
      if(!mode) e.reply(`#${CharacterName}图鉴 查看角色信息\n#${CharacterName}天赋 查看角色天赋\n#${CharacterName}命座 查看角色命座\n#XX面板换${CharacterName} 通过替换查看角色面板`)
    }
    return true
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`) } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}角色数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json"
      let y = JSON.parse(fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}')
      y[new Date()] = { name: TextData[4], err, text: "角色更新错误" }
      let bbxzData = JSON.stringify(y, null, 2)
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else {console.log('[liangshi-calc]错误内容已记录') }})
    }
  }
  return false
}

export async function WeaponNew (e, mode, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, WeaponType, bonus, WeaponData, filePath, IconUrl, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS)(.*?)(武器|光锥|弧盘)(数据|资源|资源数据)?(.*?)$/), ID = TextData[4]
  try {
    if(!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的武器数据`)
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.gi.latest
      } else { verLeve = version }
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${verLeve}/zh/weapon/${ID}.json`)
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
      console.log(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      if(!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    if (ID < 12000) { WeaponType = "sword" } else if (ID < 13000) { WeaponType = "claymore" } else if (ID < 14000) { WeaponType = "polearm" } else if (ID < 15000) { WeaponType = "catalyst" } else if (ID < 30000) { WeaponType = "bow" } else { WeaponType = "projection" }
    let WeaponName = data.name || "无名"; IconUrl = `${ProxyUrl}https://static.nanoka.cc/assets/gi/`
    let imgs = `./plugins/miao-plugin/resources/meta-gs/weapon/${WeaponType}/${WeaponName}`
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/weapon/${WeaponType}/${WeaponName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if(!mode) e.reply(`[liangshi-calc]开始更新武器: ${WeaponName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-gs/weapon/${WeaponType}/${WeaponName}`, { recursive: true })
      console.log(`[liangshi-calc]武器:${WeaponName} 本地文件夹创建成功`)
    } else { if(!mode) e.reply(`[liangshi-calc]武器: ${WeaponName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
    if (WeaponType === "projection") {
      await getImg(IconUrl + data.icon.replace("UI_", "UI_Gacha_").replace(/_\{0\}$/, "") + ".webp", `${imgs}/gacha.webp`, "gacha")
      await getImg(IconUrl + data.icon.replace(/\{0\}$/, "") + "Great_" + "Fire" + ".webp", `${imgs}/fire.webp`, "火")
      await getImg(IconUrl + data.icon.replace(/\{0\}$/, "") + "Great_" + "Water" + ".webp", `${imgs}/water.webp`, "水")
      await getImg(IconUrl + data.icon.replace(/\{0\}$/, "") + "Great_" + "Rock" + ".webp", `${imgs}/rock.webp`, "岩")
      await getImg(IconUrl + data.icon.replace(/\{0\}$/, "") + "Great_" + "Ice" + ".webp", `${imgs}/ice.webp`, "冰")
      await getImg(IconUrl + data.icon.replace(/\{0\}$/, "") + "Great_" + "Grass" + ".webp", `${imgs}/grass.webp`, "草")
      await getImg(IconUrl + data.icon.replace(/\{0\}$/, "") + "Great_" + "Electric" + ".webp", `${imgs}/electric.webp`, "雷")
      await getImg(IconUrl + data.icon.replace(/\{0\}$/, "") + "Great_" + "Wind" + ".webp", `${imgs}/wind.webp`, "风")
    } else {
      await getImg(IconUrl + data.icon + ".webp", `${imgs}/icon.webp`, "icon")
      await getImg(IconUrl + data.icon.replace("UI_", "UI_Gacha_") + ".webp", `${imgs}/gacha.webp`, "gacha")
      await getImg(IconUrl + data.icon + ".webp", `${imgs}/awaken.webp`, "awaken")
    }
    if(!mode) e.reply(`[liangshi-calc]武器图片资源下载完成`)
    let WeaponPromote = (WeaponData) => {
      let yyu = { text: "", datas: {} }, yuu = Object.values(WeaponData)
      if (yuu.length === 0) return yyu
      let yreg = /<color=#99FFFFFF>(.*?)<\/color>/g, pxx = [], xpp, xxp = 0, uui = ""
      yreg.lastIndex = 0
      while ((xpp = yreg.exec(yuu[0].desc)) !== null) {
        uui += yuu[0].desc.slice(xxp, xpp.index)
        uui += `$[${pxx.length}]`
        pxx.push({ index: pxx.length, values: [] })
        xxp = yreg.lastIndex
      }
      uui += yuu[0].desc.slice(xxp)
      yuu.forEach(level => {yreg.lastIndex = 0; let rrt = 0, rtt; while ((rtt = yreg.exec(level.desc)) !== null) { if (rrt >= pxx.length) break; pxx[rrt].values.push(rtt[1]); rrt++ }})
      yyu.text = uui.replace(/\\n/g, '')
      pxx.forEach(ph => { yyu.datas[ph.index] = ph.values })
      return yyu
    }
    let key = {
      fight_prop_hp_percent: "hpPct",
      fight_prop_attack_percent: "atkPct",
      fight_prop_defense_percent: "defPct",
      fight_prop_element_mastery: "mastery",
      fight_prop_charge_efficiency: "recharge",
      fight_prop_crirical: "cpct",
      fight_prop_critical_hurt: "cdmg",
      fight_prop_physical_add_hurt: "phy"
    }
    if (WeaponType !== "projection") {
      if (key[Object.keys(data.stats_modifier)[1]] === "mastery") { bonus = 1 } else { bonus = 100 }
      WeaponData = {
        "id": Number(ID),
        "name": WeaponName,
        "affixTitle": data.refinement?.["1"]?.name || "",
        "star": data.rarity,
        "desc": data.desc.replace(/\\n/g, ''),
        "attr": {
          "atk": {
            "1": data.stats_modifier.atk.base,
            "20": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["20"],
            "40": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["40"] + Object.values(data.ascension["1"])[0],
            "50": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["50"] + Object.values(data.ascension["2"])[0],
            "60": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["60"] + Object.values(data.ascension["3"])[0],
            "70": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["70"] + Object.values(data.ascension["4"])[0],
            "80": data.stats_modifier.atk.base * data.stats_modifier.atk.levels?.["80"] + Object.values(data.ascension?.["5"] || {})?.[0] || undefined,
            "90": data.stats_modifier.atk.base * data.stats_modifier.atk.levels?.["90"] + Object.values(data.ascension?.["6"] || {})?.[0] || undefined,
            "20+": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["20"] + Object.values(data.ascension["1"])[0],
            "40+": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["40"] + Object.values(data.ascension["2"])[0],
            "50+": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["50"] + Object.values(data.ascension["3"])[0],
            "60+": data.stats_modifier.atk.base * data.stats_modifier.atk.levels["60"] + Object.values(data.ascension["4"])[0],
            "70+": data.stats_modifier.atk.base * data.stats_modifier.atk.levels?.["70"] + Object.values(data.ascension?.["5"] || {})?.[0] || undefined,
            "80+": data.stats_modifier.atk.base * data.stats_modifier.atk.levels?.["80"] + Object.values(data.ascension?.["6"] || {})?.[0] || undefined
          },
          "bonusKey": key[Object.keys(data.stats_modifier || {})?.[1]] || undefined,
          "bonusData": {
            "1": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus || undefined,
            "20": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["20"] || undefined,
            "40": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["40"] || undefined,
            "50": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["50"] || undefined,
            "60": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["60"] || undefined,
            "70": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["70"] || undefined,
            "80": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["80"] || undefined,
            "90": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["90"] || undefined,
            "20+": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["20"] || undefined,
            "40+": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["40"] || undefined,
            "50+": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["50"] || undefined,
            "60+": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["60"] || undefined,
            "70+": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["70"] || undefined,
            "80+": data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].base * bonus * data.stats_modifier?.[Object.keys(data.stats_modifier || {})?.[1]].levels["80"] || undefined,
          }
        },
        "materials": {
          "weapon": data.materials?.["6"]?.mats?.[0]?.name || data.materials?.["4"]?.mats?.[0]?.name,
          "monster": data.materials?.["6"]?.mats?.[1]?.name || data.materials?.["4"]?.mats?.[1]?.name,
          "normal": data.materials?.["6"]?.mats?.[2]?.name || data.materials?.["4"]?.mats?.[2]?.name
        },
        "affixData": await WeaponPromote(data.refinement)
      }
    } else {
      let WeaponTypeKey = { WEAPON_SWORD_ONE_HAND: "sword", WEAPON_CLAYMORE: "claymore", WEAPON_POLE: "polearm", WEAPON_CATALYST: "catalyst", WEAPON_BOW: "bow" }
      WeaponData = { "id": Number(ID), "name": WeaponName, "star": data.Rarity, "desc": data.Desc, "WeaponType": WeaponTypeKey[data.WeaponType]    }
    }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-gs/weapon/${WeaponType}/${WeaponName}/data.json`
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
      console.log(`[liangshi-calc]武器：${WeaponName} 数据已写入`)
      if(!mode) e.reply(`[liangshi-calc]武器：${WeaponName}\n数据已写入`)
    } else if (/强制|强行|覆盖/.test(e.msg)) {
      if(!mode) e.reply('[liangshi-calc]武器数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(WeaponData, null, 2), 'utf8')
      console.log(`[liangshi-calc]武器：${WeaponName} 数据已写入`)
      if(!mode) e.reply(`[liangshi-calc]武器：${WeaponName}\n数据已写入`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]武器数据已存在，运行终止。\n如果需要刷新武器数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}武器数据`)
      console.error(`[liangshi-calc]武器：${WeaponName}\n数据已存在`)
    }
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      filePath = `./plugins/miao-plugin/resources/meta-gs/weapon/${WeaponType}/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取武器配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]武器：${WeaponName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[ID] = { "id": ID, "name": WeaponName, "star": data.rarity }
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
      if(!mode) e.reply(`[liangshi-calc]武器：${WeaponName} 数据更新完成\n重启后即可使用相关内容`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]武器：${WeaponName} 数据更新完成\n当前未启用自动写入WeaponData\n手动配置后重启才可使用\n自动写入WeaponData可在config.yaml启用或使用强制更新临时启用一次`)
    }
    return false
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
    } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json"
      let y = JSON.parse(fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}')
      y[new Date()] = { name: TextData[4], err, text: "武器更新错误" }
      let bbxzData = JSON.stringify(y, null, 2)
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') }})
    }
    return true
  }
}

export async function ArtifactNew (e, mode, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS)(.*?)(圣遗物|声骸|遗器|终端|卡带|驱动块)(数据|资源|资源数据)?(.*?)$/), ID = TextData[4]
  try {
    if(!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的圣遗物数据`)
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.gi.latest
      } else { verLeve = version }
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${verLeve}/zh/artifact/${ID}.json`)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        if (response.status === 404) {
          if(!mode)  e.reply(`[liangshi-calc]云端暂无该圣遗物数据，可等待一段时间后再更新`)
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
      console.log(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      if(!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    let IconUrl = `${ProxyUrl}https://static.nanoka.cc/assets/gi/`, imgName = data.affix[0].name || ID, imgs = `./plugins/miao-plugin/resources/meta-gs/artifact/imgs/${imgName}`
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/artifact/imgs/${imgName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if(!mode) e.reply(`[liangshi-calc]开始更新圣遗物: ${imgName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-gs/artifact/imgs/${imgName}`, { recursive: true })
      console.log(`[liangshi-calc]圣遗物:${imgName} 本地imgs文件夹创建成功`)
    } else { if(!mode) e.reply(`[liangshi-calc]圣遗物: ${imgName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
    await getImg(IconUrl + "UI_RelicIcon_" + ID + "_4.webp", `${imgs}/1.webp`, "生之花")
    await getImg(IconUrl + "UI_RelicIcon_" + ID + "_2.webp", `${imgs}/2.webp`, "死之羽")
    await getImg(IconUrl + "UI_RelicIcon_" + ID + "_5.webp", `${imgs}/3.webp`, "时之沙")
    await getImg(IconUrl + "UI_RelicIcon_" + ID + "_1.webp", `${imgs}/4.webp`, "空之杯")
    await getImg(IconUrl + "UI_RelicIcon_" + ID + "_3.webp", `${imgs}/5.webp`, "理之冠")
    if(!mode) e.reply(`[liangshi-calc]圣遗物图片资源下载完成`)
    let artData = JSON.parse(fs.readFileSync("./plugins/liangshi-calc/resources/wiki/Genshin Impact/ArtifactMap.json", 'utf8'))
    let artID = artData[ID] || (ID * 10 - 1100049)
    let story1 = [], story2 = [], story3 = [], story4 = [], story5 = []
    try {
      story1 = await fetch(`https://raw.githubusercontent.com/DimbreathBot/AnimeGameData/refs/heads/master/Readable/CHS/Relic${ID}_1.txt`)
      story1 = await story1.text()
      await common.sleep(500)
      story2 = await fetch(`https://raw.githubusercontent.com/DimbreathBot/AnimeGameData/refs/heads/master/Readable/CHS/Relic${ID}_2.txt`)
      story2 = await story2.text()
      await common.sleep(500)
      story3 = await fetch(`https://raw.githubusercontent.com/DimbreathBot/AnimeGameData/refs/heads/master/Readable/CHS/Relic${ID}_3.txt`)
      story3 = await story3.text()
      await common.sleep(500)
      story4 = await fetch(`https://raw.githubusercontent.com/DimbreathBot/AnimeGameData/refs/heads/master/Readable/CHS/Relic${ID}_4.txt`)
      story4 = await story4.text()
      await common.sleep(500)
      story5 = await fetch(`https://raw.githubusercontent.com/DimbreathBot/AnimeGameData/refs/heads/master/Readable/CHS/Relic${ID}_5.txt`)
      story5 = await story5.text()
    } catch (err) {
      console.error(`[liangshi-calc]获取圣遗物故事数据失败:`, err)
    }
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-gs/artifact/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error(`[liangshi-calc]读取圣遗物配置data.json失败:`, err)
          if (!mode) e.reply(`[liangshi-calc]圣遗物：${imgName} 数据更新完成\n尝试自动写入ArtifactData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let l = data.need?.[0] || null
          let m = data.need?.[1] || null
          let k = m ? { [l]: data.affix[0].desc, [m]: data.affix[1].desc } : { [l]: data.affix?.[0]?.desc }
          let jsonData = JSON.parse(TextData)
          let newValue = {
            "id": artID,
            "name": imgName,
            "rank": data.rank,
            "idxs": {
              "1": {
                "id": data.parts?.equip_bracer?.story ? (Object.keys(data.parts?.equip_bracer?.story)[0] || `${ID}43`) : `${ID}43`,
                "name": data.parts?.equip_bracer?.name,
                "desc": data.parts?.equip_bracer?.desc,
                "story": story4.split('\n').filter(item => item !== "").filter(item => item !== " ")
              },
              "2": {
                "id": data.parts?.equip_necklace?.story ? (Object.keys(data.parts?.equip_necklace?.story)[0] || `${ID}23`) : `${ID}23`,
                "name": data.parts?.equip_necklace?.name,
                "desc": data.parts?.equip_necklace?.desc,
                "story": story2.split('\n').filter(item => item !== "").filter(item => item !== " ")
              },
              "3": {
                "id": data.parts?.equip_shoes?.story ? (Object.keys(data.parts?.equip_shoes?.story)[0] || `${ID}53`) : `${ID}53`,
                "name": data.parts?.equip_shoes?.name,
                "desc": data.parts?.equip_shoes?.desc,
                "story": story5.split('\n').filter(item => item !== "").filter(item => item !== " ")
              },
              "4": {
                "id": data.parts?.equip_ring?.story ? (Object.keys(data.parts?.equip_ring?.story)[0] || `${ID}13`) : `${ID}13`,
                "name": data.parts?.equip_ring?.name,
                "desc": data.parts?.equip_ring?.desc,
                "story": story1.split('\n').filter(item => item !== "").filter(item => item !== " ")
              },
              "5": {
                "id": data.parts?.equip_dress?.story ? (Object.keys(data.parts?.equip_dress?.story)[0] || `${ID}33`) : `${ID}33`,
                "name": data.parts?.equip_dress?.name,
                "desc": data.parts?.equip_dress?.desc,
                "story": story3.split('\n').filter(item => item !== "").filter(item => item !== " ")
              }
            },
            "skills": k
          }
          newValue.idxs = Object.fromEntries(Object.entries(newValue.idxs).filter(([key, value]) => { return value.id !== undefined || value.name !== undefined }))
          jsonData[artID] = newValue
          console.log(`[liangshi-calc]圣遗物：${imgName} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => { if (err) { console.error(`[liangshi-calc]圣遗物data.json写入失败:\n`, err); if (!mode) e.reply(`[liangshi-calc]圣遗物：${imgName}\n数据更新完成\n尝试自动写入ArtifactData时失败\n请手动添加后重启使用`); return false } else { console.log(`[liangshi-calc]圣遗物data.json已更新`) } })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]圣遗物：${imgName} 数据更新完成\n重启后即可使用相关内容`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]圣遗物：${imgName} 数据更新完成\n当前未启用自动写入ArtifactData\n手动配置后重启才可使用\n自动写入ArtifactData可在config.yaml启用或使用强制更新临时启用一次`)
    }
    return false
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
    } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json"
      let y = JSON.parse(fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}')
      y[new Date()] = { name: TextData[4], err, text: "装备更新错误" }
      let bbxzData = JSON.stringify(y, null, 2)
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') }})
    }
    return true
  }
}

export async function MonsterNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, itemdata, data, verUrl, verLeve, MonsterName, MonsterData, drops = [], dropsId = []
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS|异象)(数据|资源|资源数据)?(.*?)$/), ID = TextData[4]
  try {
    if(!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的敌人数据`)
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.gi.latest
      } else { verLeve = version }
      if (!JsonOk || !fs.existsSync("./plugins/liangshi-calc/resources/ItemJson.json")) {
        response = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${verLeve}/zh/item_all.json`)
        if (!response.ok) {
          console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
          if (response.status === 404) {
            if (!mode) e.reply('[liangshi-calc]云端暂无该敌人数据，可等待一段时间后再更新')
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
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${verLeve}/zh/monster/${ID}.json`)
      if (!response.ok) {
        console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`)
        if (response.status === 404) {
          if(!mode)  e.reply(`[liangshi-calc]云端暂无该圣遗物数据，可等待一段时间后再更新`)
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
      console.log(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      if(!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    MonsterName = data.name
    let imgs = `./plugins/miao-plugin/resources/meta-gs/monster/${MonsterName}`
    await getImg(ProxyUrl + "https://static.nanoka.cc/assets/gi/" + data.icon + ".webp", `${imgs}/icon.webp`, "icon")
    if(!mode) e.reply(`[liangshi-calc]敌人图片资源下载完成`)
    let MonCod = { "ELEMENTAL": "元素生命", "HILICHURL": "丘丘部族", "ABYSS": "深渊", "FATUI": "愚人众", "AUTOMATRON": "自律机关", "HUMAN": "其他人类势力", "BEAST": "异种魔兽", "BOSS": "值得铭记的强敌", "AVIARY": "禽鸟", "ANIMAL": "走兽", "FISH": "游鱼", "CRITTER": "其他" }
    let MonType = { "MONSTER_ORDINARY": "普通", "MONSTER_BOSS": "首领" }
    let childData = data.child?.[Object.keys(data.child)[0]]
    if (childData?.kill_drop_id) { drops = 100.0; dropsId = childData?.kill_drop_id }
    if (!childData) { childData = { hp_drops: [] } }
    MonsterData = {
      "id": ID,
      "name": MonsterName,
      "title": data.special_names,
      "desc": data.desc.replace(/\\n/g, ''),
      "codex": MonCod[data.codex],
      "type": MonType[childData?.type],
      "speName": data.special_names, // 出现过的相关名字
      "legend": childData?.local_legend, //地方传奇
      "drops": [drops, ...childData?.hp_drops.map(item => item.hp_percent ?? null).filter(val => val !== null)], //元素能量掉落阈值
      "dropsId": [dropsId, ...childData?.hp_drops.map(item => item.drop_id ?? null).filter(val => val !== null)], //元素能量掉落类型
      "reward": data.reward?.map(item => item.id).map(id => itemdata[id]?.name).filter(item => item !== null),
      "attr": {
        "Res": {
          "FirRes": childData?.sub_hurt?.fire * 10000,
          "GraRes": childData?.sub_hurt?.grass * 10000,
          "WatRes": childData?.sub_hurt?.water * 10000,
          "EleRes": childData?.sub_hurt?.elec * 10000,
          "WinRes": childData?.sub_hurt?.wind * 10000,
          "IceRes": childData?.sub_hurt?.ice * 10000,
          "RocRes": childData?.sub_hurt?.rock * 10000,
          "PhyRes": childData?.sub_hurt?.physical * 10000
        },
        "hp": childData?.base?.hp,
        "atk": childData?.base?.atk,
        "def": childData?.base?.def,
        "em": childData?.base?.em
      }
    }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-gs/monster/${MonsterName}/data.json`
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
      console.log(`[liangshi-calc]敌人：${MonsterName} 数据已写入`)
      if(!mode) e.reply(`[liangshi-calc]敌人：${MonsterName}\n数据已写入`)
    } else if (/强制|强行|覆盖/.test(e.msg)) {
      if(!mode) e.reply('[liangshi-calc]敌人数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
      console.log(`[liangshi-calc]敌人：${MonsterName} 数据已写入`)
      if(!mode) e.reply(`[liangshi-calc]敌人：${MonsterName}\n数据已写入`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]敌人数据已存在，运行终止。\n如果需要刷新敌人数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}敌人数据`)
      console.error(`[liangshi-calc]敌人：${MonsterName}\n数据已存在`)
    }
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-gs/monster/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取敌人配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]敌人：${MonsterName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          jsonData[ID] = { "id": ID, "name": MonsterName, "codex": MonCod[data.codex] }
          console.log(`[liangshi-calc]敌人：${MonsterName} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]敌人data.json写入失败:\n', err)
              if (!mode) e.reply(`[liangshi-calc]敌人：${MonsterName} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
              return false
            } else { console.log('[liangshi-calc]敌人data.json已更新') }
          })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if(!mode) e.reply(`[liangshi-calc]敌人：${MonsterName} 数据更新完成\n重启后即可使用相关内容`)
    } else {
      if(!mode) e.reply(`[liangshi-calc]敌人：${MonsterName} 数据更新完成\n当前未启用自动写入MonsterData\n手动配置后重启才可使用\n自动写入MonsterData可在config.yaml启用或使用强制更新临时启用一次`)
    }
    return false
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
    } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json"
      let y = JSON.parse(fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}')
      y[new Date()] = { name: TextData[4], err, text: "敌人更新错误" }
      let bbxzData = JSON.stringify(y, null, 2)
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') }})
    }
    return true
  }
}

export async function ItemNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, url, itemJson, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(原神|原|ys|YS|gs|GS)(.*?)物品(数据|资源|资源数据)?(.*?)$/), ID = TextData[4]
  try {
    if (!version) {
      verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
      verUrl = await verUrl.json()
      verLeve = verUrl.gi.latest
    } else { verLeve = version }
    if (!JsonOk) {
      try {
        response = await fetch(`${ProxyUrl}https://static.nanoka.cc/gi/${verLeve}/zh/item_all.json`)
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
    } else { try { let ItemJson = fs.readFileSync('./plugins/liangshi-calc/resources/ItemJson.json', 'utf8'); data = JSON.parse(ItemJson) } catch (err) { console.error('[liangshi-calc]物品缓存data.json读取失败:', err); return false } }
    let ItemData, ItemType = itemJson?.material_type.replace(/MATERIAL_/g, '').toLowerCase(); itemJson = data[`${ID}`]; let ItemName = itemJson.name
    if (!itemJson) { if (!mode) e.reply('[liangshi-calc]未知的物品'); return false }
    ItemData = {
      "id": ID,
      "name": ItemName,
      "type": ItemType,
      "star": itemJson.rank,
      "desc": itemJson.desc.replace(/\\n/g, ''),
      "list": itemJson.type,
      "source": [...itemJson.jump_descs, ...itemJson.source_list],
    }
    if (itemJson.type.includes('区域特产')) itemJson.type = "specialty" //地图上的采集物
    if (itemJson.type.includes('角色培养素材')) {
      if (itemJson.jump_descs.includes('70级以上')) ItemData.type = "weekly" //60体周本素材
      if (itemJson.jump_descs.includes('30级以上')) ItemData.type = "boss" //40体Boss素材
    }
    if (itemJson.type.includes('角色与武器培养素材')) {
      if (itemJson.rank === 1) ItemData.type = "normal" // 普通敌人素材
      if (itemJson.jump_descs.includes('40级以上') && itemJson.rank === 2) ItemData.type = "normal" //普通敌人素材
      if (itemJson.jump_descs.includes('60级以上') && itemJson.rank === 3) ItemData.type = "normal" //普通敌人素材
      if (itemJson.jump_descs.includes('40级以上') && itemJson.rank === 3) ItemData.type = "monster" //精英敌人素材
      if (itemJson.rank === 4 || itemJson.rank === 2) ItemData.type = "monster" //精英敌人素材
    }
    if (itemJson.type.includes('武器突破素材')) ItemData.type = "weapon"
    if (itemJson.type.includes('角色天赋素材')) ItemData.type = "talent"
    let imgs = `./plugins/miao-plugin/resources/meta-gs/material`
    await getImg(ProxyUrl + "https://static.nanoka.cc/assets/gi/" + itemJson.icon + ".webp", `${imgs}/${ItemData.type}/${ItemName}.webp`, "图标")
    if(!mode) e.reply(`[liangshi-calc]物品图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-gs/material/data.json`
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
          //if (!jsonData[ItemName]) { jsonData[ItemName] = ItemData } else { jsonData[ItemName] = { ...jsonData[ItemName], ...ItemData } }
          if (itemJson.name.includes('的') && itemJson.type.includes('角色天赋素材')) {
            let text = itemJson.name.match(/「(..)」的(..)/)
            let ItemId = +ID + (4 - itemJson.rank)
            let tf3Name = `「${text[1]}」的哲学`
            let items = {
              [`「${text[1]}」的教导`]: {
                "id": ItemId - 2,
                "name": `「${text[1]}」的教导`,
                "type": "talent",
                "star": 2
              },
              [`「${text[1]}」的指引`]: {
                "id": ItemId - 1,
                "name": `「${text[1]}」的指引`,
                "type": "talent",
                "star": 3
              },
              [`「${text[1]}」的哲学`]: {
                "id": ItemId,
                "name": `「${text[1]}」的哲学`,
                "type": "talent",
                "star": 4
              }
            }
            if (!jsonData[tf3Name]) jsonData[tf3Name] = {}
            jsonData[tf3Name] = { ...jsonData[tf3Name], items: items }
          }
          if (itemJson.type.includes('武器突破素材')) {
            let ItemId = +ID + (5 - data[`${ID}`].rank)
            let wq4Name = data[`${ItemId}`].name
            let items = {
              [data[`${ItemId - 3}`].name]: {
                "id": ItemId - 3,
                "name": data[`${ItemId - 3}`].name,
                "type": "weapon",
                "star": 2
              },
              [data[`${ItemId - 2}`].name]: {
                "id": ItemId - 2,
                "name": data[`${ItemId - 2}`].name,
                "type": "weapon",
                "star": 3
              },
              [data[`${ItemId - 1}`].name]: {
                "id": ItemId - 1,
                "name": data[`${ItemId - 1}`].name,
                "type": "weapon",
                "star": 4
              },
              [wq4Name]: {
                "id": ItemId,
                "name": wq4Name,
                "type": "weapon",
                "star": 5
              }
            }
            if (!jsonData[wq4Name]) jsonData[wq4Name] = {}
            jsonData[wq4Name] = { ...jsonData[wq4Name], items: items }
          }
          if (itemJson.type.includes('角色与武器培养素材')) {
            let wp4Name, items
            if ((itemJson.rank === 1) || (itemJson.jump_descs.includes('40级以上') && itemJson.rank === 2) || (itemJson.jump_descs.includes('60级以上') && itemJson.rank === 3)) {
              let ItemId = +ID + (3 - itemJson.rank)
              let wp2Name = data[`${ItemId - 2}`].name
              let wp3Name = data[`${ItemId - 1}`].name
              wp4Name = data[`${ItemId}`].name
              items =  {
                [wp2Name]: {
                  "id": ItemId - 2,
                  "name": wp2Name,
                  "type": "normal",
                  "star": 1
                },
                [wp3Name]: {
                  "id": ItemId - 1,
                  "name": wp3Name,
                  "type": "normal",
                  "star": 2
                },
                [wp4Name]: {
                  "id": ItemId,
                  "name": wp4Name,
                  "type": "normal",
                  "star": 3
                }
              }
            } else {
              let ItemId = +ID + (4 - itemJson.rank)
              let wp2Name = data[`${ItemId - 2}`].name
              let wp3Name = data[`${ItemId - 1}`].name
              wp4Name = data[`${ItemId}`].name
              items =  {
                [wp2Name]: {
                  "id": ItemId - 2,
                  "name": wp2Name,
                  "type": "monster",
                  "star": 2
                },
                [wp3Name]: {
                  "id": ItemId - 1,
                  "name": wp3Name,
                  "type": "monster",
                  "star": 3
                },
                [wp4Name]: {
                  "id": ItemId,
                  "name": wp4Name,
                  "type": "monster",
                  "star": 4
                }
              }
            }
            if (!jsonData[wp4Name]) jsonData[wp4Name] = {}
            jsonData[wp4Name] = { ...jsonData[wp4Name], items: items }
          }
          console.log(`[liangshi-calc]物品：${ItemName} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) { console.error('[liangshi-calc]物品data.json写入失败:\n', err); if (!mode) e.reply(`[liangshi-calc]物品：${ItemName} 数据更新完成\n尝试自动写入Data时失败\n请手动添加后重启使用`); return false
            } else { console.log('[liangshi-calc]物品data.json已更新') }
          })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]物品：${ItemName} 数据更新完成\n重启后即可使用相关内容`)
    } else {
      if (!mode) e.reply(`[liangshi-calc]物品：${ItemName} 数据更新完成\n当前未启用自动写入ItemData\n手动配置后重启才可使用\n自动写入ItemData可在config.yaml启用或使用强制更新临时启用一次`)
    }
    return true
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`) } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json"
      let y = JSON.parse(fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}')
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
