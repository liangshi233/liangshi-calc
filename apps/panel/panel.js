import { getTargetUid } from '../../../miao-plugin/apps/profile/ProfileCommon.js'
import { mainIdMap } from '../../../miao-plugin/resources/meta-gs/artifact/extra.js'
import { groupRank } from '../../../miao-plugin/config/cfg.js'
import { LSconfig } from '#liangshi'
import crypto from 'crypto'
import fs from 'node:fs'


export async function importPanel (e, key) {
  let a, b, c, d, f, g, h , i, j, k, l, m, n, o, q, r, s, u, JMkey, source = "share"
  let uid = await getTargetUid(e)
  let cfg = LSconfig.getConfig('user', 'config')
  a = key.indexOf('：')
  if (a === -1) { b = a } else { b = key.substring(a + 1).trim() }
  if (!b || b === -1) b = key
  c = b.indexOf('-')
  if (c === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false }
  d = b.substring(0, c).trim()
  f = b.substring(c + 1).trim()
  let p = (z) => {
    let numberKey = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', y = 0n
    for (let i = 0; i < z.length; i++) {
      let char = z[i], index = numberKey.indexOf(char)
      if (index === -1) { e.reply(`[liangshi-calc] 分享码包含异常数据,请检查完整性(*/ω＼*)`); throw new Error(`[liangshi-calc] 第${i}位出现异常字符'${char}'`) }
      y = y * 62n + BigInt(index)
    } return y.toString()
  }
  let artisKey = (num, base, mode) => {
    let ge = num % base
    let numX = Math.floor(num / base)
    let gd = numX % base
    numX = Math.floor(numX / base)
    let gc = numX % base
    numX = Math.floor(numX / base)
    let gb = numX % base
    numX = Math.floor(numX / base)
    let ga = numX % base
    if (mode) { numX = Math.floor(numX / base); let gf = numX % base;  return [ga, gb, gc, gd, ge, gf]
    } else { return [ga, gb, gc, gd, ge] }
  }
  if (d === "G") {
    let artisMainIdMap = { "11": 14001, "12": 10002, "13": 10003, "14": 10004, "15": 10005, "16": 10006, "21": 10007, "22": 10008, "31": 13007, "32": 13008, "33": 13009, "41": 15008, "42": 15009, "43": 15010, "44": 15011, "45": 15012, "46": 15013, "47": 15014, "48": 15015, }
    let numKey = { "1": 102, "2": 103, "3": 105, "4": 106, "5": 108, "6": 109, "7": 123, "8": 124, "9": 120, "0": 122 }
    g = f.indexOf('_')
    if (g === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false }
    l = f.substring(g + 1).trim(); g = p(f.substring(0, g).trim()); h = l.indexOf('*')
    if (h === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false }
    m = l.substring(h + 1).trim(); h = p(l.substring(0, h).trim()); i = m.indexOf('=')
    if (i === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false }
    n = m.substring(i + 1).trim(); i = p(m.substring(0, i).trim()); k = n.indexOf('^')
    if (k === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false }
    q = n.substring(k + 1).trim(); k = p(n.substring(0, k).trim()); j = q.indexOf('&')
    if (j === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false }
    o = q.substring(j + 1).trim(); j = p(q.substring(0, j).trim()); r = o.indexOf('*')
    if (r === -1) { if (!uid) { e.reply("[liangshi-calc] 分享码中未包含UID，请手动指定UID"); return false } console.log("分享码中未包含UID，已自动使用绑定UID")
    } else {
      s = o.substring(r + 1).trim(); o = p(o.substring(0, r).trim()); u = s.indexOf('/')
      if (u === -1) { uid = p(s) } else {
        JMkey = s.substring(u + 1).trim()
        uid = p(s.substring(0, u).trim())
        let kkb = b.indexOf('/'), ccb = await TextHash(b.substring(0, kkb).trim())
        let gyText = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEQVtjdDKYxL2fYBrP0zZ/onp+
dVmQ+7hI/dbzfRJVx9wwSsNirkDa3qqHmdNZ8V9DKPKsb9f89os9mPrBtHREhYDM
0zWddaMEEHrGT8ESBBlj9oxNUcOGBF6jNZNQIJyAiT7OdmVGN8WvDOHOLTh407u0
XS3/hk2WboJpQPI36QIDAQAB
-----END PUBLIC KEY-----`
        try {
          let Tex = crypto.createVerify('RSA-SHA256')
          Tex.update(ccb, 'hex')
          let acc = Buffer.from(JMkey, 'hex'), bcc = crypto.createPublicKey({ key: gyText, format: 'pem', type: 'spki' })
          if (Tex.verify(bcc, acc)) { e.reply(`[liangshi-calc] 签名验证成功`); source = "enka" } else { e.reply(`[liangshi-calc] 不正确的签名，可能是数据缺失或被篡改`); return false }
        } catch (err) { console.error(err.message); e.reply(`[liangshi-calc] 遇到了一些错误，请稍后重试(*/ω＼*)`); return false }
      }
    }
    if (!cfg.DisabledRankingProtection) { if (source !== "enka" && groupRank) { console.log('[liangshi-calc] 当前已开启排行榜保护，需关闭群排行榜功能或禁用排行榜保护才可导入'); e.reply('[liangshi-calc] 当前已开启排行榜保护，不可导入未签名的面板'); return false } }
    if (uid < 100000010 && !e.isMaster && source !== "enka") { e.reply('[liangshi-calc] 为保护数据,当前不允许导入未经验证的预设面板,请更换UID后再试'); return false }
    if (uid < 100000010) source = "customize"
    let Json, JsonO, artisJson, weaponSwordJson, weaponPolearmJson, weaponClaymoreJson, weaponCatalystJson, weaponBowJson, weaponJson, characterJson
    try {
      if (!fs.existsSync(`./data/PlayerData/gs/${uid}.json`)) { Json = { "uid": uid, "name": "旅行者", "level": "", "word": "", "face": "", "card": "", "sign": "", "info": false, "_mys": (new Date()) * 1, "avatars": {} } } else { Json = JSON.parse(fs.readFileSync(`./data/PlayerData/gs/${uid}.json`, 'utf8')) }
      artisJson = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/artifact/data.json', 'utf8')
      characterJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/character/data.json', 'utf8'))
      weaponSwordJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/sword/data.json', 'utf8'))
      weaponPolearmJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/polearm/data.json', 'utf8'))
      weaponClaymoreJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/claymore/data.json', 'utf8'))
      weaponCatalystJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/catalyst/data.json', 'utf8'))
      weaponBowJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/bow/data.json', 'utf8'))
      weaponJson = { ...weaponSwordJson, ...weaponPolearmJson, ...weaponClaymoreJson, ...weaponCatalystJson, ...weaponBowJson }
      JsonO = Json//; Json = Json.avatars
    } catch (err) {  e.reply(`读取本地数据的时遇到了一些问题，等待一会试吧(*/ω＼*)`); console.error(`[liangshi-calc] 读取本地文件错误：${err}`); return true }
    let characterID = Number(g.substring(0, 8)), characterCo = Number(g.charAt(8)), characterPr = Number(g.charAt(9)), characterTaKey = g.charAt(10), characterTa = g.substring(11), TaKey1, TaKey2, TaKey3
    if (characterTaKey === "1" || characterTaKey === "4" || characterTaKey  === "5" || characterTaKey === "7") TaKey1 = 2; else TaKey1 = 1
    if (characterTaKey === "2" || characterTaKey === "4" || characterTaKey  === "6" || characterTaKey === "7") TaKey2 = 2; else TaKey2 = 1
    if (characterTaKey === "3" || characterTaKey === "5" || characterTaKey  === "6" || characterTaKey === "7") TaKey3 = 2; else TaKey3 = 1
    let characterTaA = Number(characterTa.substring(0, TaKey1))
    characterTa = characterTa.substring(TaKey1)
    let characterTaE = Number(characterTa.substring(0, TaKey2))
    characterTa = characterTa.substring(TaKey2)
    let characterTaQ = Number(characterTa.substring(0, TaKey3)), characterLv = Number(characterTa.substring(TaKey3))
    let talent = { "a": characterTaA, "e": characterTaE, "q": characterTaQ }
    let weaponID = h.substring(0, 5), weaponCo = Number(h.charAt(5)), weaponPr = Number(h.charAt(6)), weaponLv = Number(h.substring(7)), weapon, artisID = []
    if (weaponJson[weaponID]?.name) { weapon = { "name": weaponJson[weaponID]?.name, "level": weaponLv, "promote": weaponPr, "affix": weaponCo } } else { weapon = {} }
    for (let ix = 0; ix < i.length; ix += 5) artisID.push(i.substring(ix, ix + 5))
    let artisLv = artisKey(k, 21), artisSt = artisKey(j, 6), artisMa = o.slice(0, 6), artisMaId = [artisMa.substring(0, 2), artisMa.substring(2, 4), artisMa.substring(4, 6)], artisAt = o.slice(6), artisAtNum = [artisAt.substring(0, 1), artisAt.substring(1, 2), artisAt.substring(2, 3), artisAt.substring(3, 4), artisAt.substring(4, 5)], artisAtId = artisAt.slice(5).match(/.{1,2}/g)
    let hgp = [], ccb = 0, artis1, artis2, artis3, artis4, artis5
    for (let Str of artisAtNum) { hgp.push(artisAtId.slice(ccb, ccb + parseInt(Str, 10))); ccb += parseInt(Str, 10) }
    hgp = hgp.map(mbn => mbn.map(item => { if (numKey[item[0]] !== undefined) return numKey[item[0]].toString() + item.slice(1); return item }))
    hgp = hgp.map((vbn, gjh) => vbn.map(item => { return parseInt(item, 10) + artisSt[gjh] * 100000 }))
    if (artisSt[0] !== 0) { artis1 = { "level": artisLv[0], "star": artisSt[0], "name": await ArtisIDNameKey(artisID[0], artisJson, true), "mainId": 14001, "attrIds": hgp[0] }  } else { artis1 = {} }  if (artisSt[1] !== 0) { artis2 = { "level": artisLv[1], "star": artisSt[1], "name": await ArtisIDNameKey(artisID[1], artisJson, true), "mainId": 10003, "attrIds": hgp[1] }  } else { artis2 = {} }  if (artisSt[2] !== 0) { artis3 = { "level": artisLv[2], "star": artisSt[2], "name": await ArtisIDNameKey(artisID[2], artisJson, true), "mainId": artisMainIdMap[artisMaId[0]], "attrIds": hgp[2] }  } else { artis3 = {} }  if (artisSt[3] !== 0) { artis4 = { "level": artisLv[3], "star": artisSt[3], "name": await ArtisIDNameKey(artisID[3], artisJson, true), "mainId": artisMainIdMap[artisMaId[1]], "attrIds": hgp[3] }  } else { artis4 = {} }  if (artisSt[4] !== 0) { artis5 = { "level": artisLv[4], "star": artisSt[4], "name": await ArtisIDNameKey(artisID[4], artisJson, true), "mainId": artisMainIdMap[artisMaId[2]], "attrIds": hgp[4] }  } else { artis5 = {} }
    JsonO.avatars[characterID] = { "name": characterJson[characterID]?.name || "TxtCharName", "id": characterID, "elem": characterJson[characterID]?.elem || "absent", "level": characterLv, "promote": characterPr, "fetter": 10, "costume": 0, "cons": characterCo, "talent": talent, "weapon": weapon, "artis": { "1": artis1,   "2": artis2,   "3": artis3,   "4": artis4,   "5": artis5 }, "_source": source, "_time": (new Date()) * 1, "_update": (new Date()) * 1, "_talent": (new Date()) * 1 }
    fs.writeFileSync(`./data/PlayerData/gs/${uid}.json`, JSON.stringify(JsonO, null, 2), 'utf8')
    e.reply(`[liangshi-calc]已成功为${uid}导入了${characterJson[characterID]?.name || "TxtCharName"}面板\n使用 #重载面板 后即可使用`)
    return true
  } else if (d === "S") {
    let Json, characterJson, JsonO, teKey = [[], ["101"], ["102"], ["103"], ["101","102"], ["101","103"], ["102","103"], ["101","102","103"], ["101","102","103"]]; g = f.indexOf('_')
    if (g === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false } l = f.substring(g + 1).trim(); g = p(f.substring(0, g).trim()); h = l.indexOf('&')
    if (h === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false } m = l.substring(h + 1).trim(); h = p(l.substring(0, h).trim()); i = m.indexOf('*')
    if (i === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false } n = m.substring(i + 1).trim(); i = p(m.substring(0, i).trim()); k = n.indexOf('=')
    if (k === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false } q = n.substring(k + 1).trim(); k = p(n.substring(0, k).trim()); j = q.indexOf('^')
    if (j === -1) { e.reply(`[liangshi-calc] 分享码格式错误(*/ω＼*)`); return false } o = q.substring(j + 1).trim(); j = p(q.substring(0, j).trim()); j = artisKey(j, 21, true); r = o.indexOf('*')
    if (r === -1) { if (!uid) { e.reply("[liangshi-calc] 分享码中未包含UID，请手动指定UID"); return false } console.log("分享码中未包含UID，已自动使用绑定UID") } else {
      s = o.substring(r + 1).trim(); o = p(o.substring(0, r).trim()); u = s.indexOf('/')
      if (u === -1) { uid = p(s) } else { JMkey = s.substring(u + 1).trim(); uid = p(s.substring(0, u).trim())
        let kkb = b.indexOf('/'), ccb = await TextHash(b.substring(0, kkb).trim()), gyText = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDEQVtjdDKYxL2fYBrP0zZ/onp+
dVmQ+7hI/dbzfRJVx9wwSsNirkDa3qqHmdNZ8V9DKPKsb9f89os9mPrBtHREhYDM
0zWddaMEEHrGT8ESBBlj9oxNUcOGBF6jNZNQIJyAiT7OdmVGN8WvDOHOLTh407u0
XS3/hk2WboJpQPI36QIDAQAB
-----END PUBLIC KEY-----`
        try { let Tex = crypto.createVerify('RSA-SHA256'); Tex.update(ccb, 'hex'); let acc = Buffer.from(JMkey, 'hex'), bcc = crypto.createPublicKey({ key: gyText, format: 'pem', type: 'spki' }); if (Tex.verify(bcc, acc)) { e.reply(`[liangshi-calc] 签名验证成功`); source = "enka" } else { e.reply(`[liangshi-calc] 不正确的签名，可能是数据缺失或被篡改`); return false }} catch (err) { console.error(err.message); e.reply(`[liangshi-calc] 遇到了一些错误，请稍后重试(*/ω＼*)`); return false }
      }
    }
    if (!cfg.DisabledRankingProtection) { if (source !== "enka" && groupRank) { console.log('[liangshi-calc] 当前已开启排行榜保护，需关闭群排行榜功能或禁用排行榜保护才可导入'); e.reply('[liangshi-calc] 当前已开启排行榜保护，不可导入未签名的面板'); return false}}
    if (uid < 100000010 && !e.isMaster && source !== "enka") { e.reply('[liangshi-calc] 为保护数据,当前不允许导入未经验证的预设面板,请更换UID后再试'); return false } if (uid < 100000010) source = "customize"
    try { if (!fs.existsSync(`./data/PlayerData/gs/${uid}.json`)) { Json = { "uid": uid, "name": "开拓者", "level": "", "word": "", "face": "", "card": "", "sign": "", "info": false, "_profile": (new Date()) * 1, "avatars": {} }} else { Json = JSON.parse(fs.readFileSync(`./data/PlayerData/sr/${uid}.json`, 'utf8')) } characterJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-sr/character/data.json', 'utf8')); JsonO = Json } catch (err) { e.reply(`读取本地数据的时遇到了一些问题，等待一会试吧(*/ω＼*)`); console.error(`[liangshi-calc] 读取本地文件错误：${err}`); return true }
    let characterID = Number(g.substring(0, 4)), characterCo = Number(g.charAt(4)), characterPr = Number(g.charAt(5)), characterTaKey = g.charAt(6), characterTa = g.substring(7), TaKey2, TaKey3, TaKey4
    if (characterTaKey === "1" || characterTaKey === "4" || characterTaKey  === "5" || characterTaKey === "7") TaKey2 = 2; else TaKey2 = 1
    if (characterTaKey === "2" || characterTaKey === "4" || characterTaKey  === "6" || characterTaKey === "7") TaKey3 = 2; else TaKey3 = 1
    if (characterTaKey === "3" || characterTaKey === "5" || characterTaKey  === "6" || characterTaKey === "7") TaKey4 = 2; else TaKey4 = 1
    let talent = { a: Number(characterTa.charAt(0)), e: Number(characterTa.substring(1, TaKey2 + 1)), q: Number(characterTa.substring(TaKey2 + 1, TaKey2 + TaKey3 + 1)), t: Number(characterTa.substring(TaKey2 + TaKey3 + 1, TaKey2 + TaKey3 + TaKey4 + 1)), me: Number(characterTa.substring(TaKey2 + TaKey3 + TaKey4 + 1, TaKey2 + TaKey3 + TaKey4 + 2)), mt: Number(characterTa.substring(TaKey2 + TaKey3 + TaKey4 + 2, TaKey2 + TaKey3 + TaKey4 + 3)) }
    let characterLv = characterTa.substring(TaKey2 + TaKey3 + TaKey4 + 3)
    let szjy = b => { let a = []; for (let i = 0; i < 10; i++) { if (b & (1 << i)) { a.push(`${201 + i}`) } } return a }
    let treesOne = h.charAt(0), treesTwo = h.substring(1,5); treesOne = teKey[treesOne]; treesTwo = szjy(treesTwo); let trees = [...treesOne, ...treesTwo].map(ccb => characterID + ccb)
    let weapon = { "id": Number(i.substring(0, 5)), "level": i.substring(7), "promote": i.charAt(6), "affix": i.charAt(5) }
    let mainId = o.substring(0, 5), mainNum = o.substring(5, 11); o = o.substring(11).match(/.{1,4}/g) || []; o = o.map(s => { let [a, b] = [s.slice(0,2), s.slice(2)]; return `${a.replace(/^0+/, '')},${Math.floor(parseInt(b, 10) / 8)},${parseInt(b, 10) % 8}`})
    let artis1 = { "level": j[0], "id": k.substring(0, 5), "mainId": 1, "attrIds": o.slice(0, Number(mainNum.charAt(0))) }
    let artis2 = { "level": j[1], "id": k.substring(5, 10), "mainId": 1, "attrIds": o.slice(Number(mainNum.charAt(0)), Number(mainNum.charAt(0)) + Number(mainNum.charAt(1))) }
    let artis3 = { "level": j[2], "id": k.substring(10, 15), "mainId": Number(mainId.charAt(0)), "attrIds": o.slice(Number(mainNum.charAt(0)) + Number(mainNum.charAt(1)), Number(mainNum.charAt(0)) + Number(mainNum.charAt(1)) + Number(mainNum.charAt(2))) }
    let artis4 = { "level": j[3], "id": k.substring(15, 20), "mainId": Number(mainId.charAt(1)), "attrIds": o.slice(Number(mainNum.charAt(0)) + Number(mainNum.charAt(1)) + Number(mainNum.charAt(2)), Number(mainNum.charAt(0)) + Number(mainNum.charAt(1)) + Number(mainNum.charAt(2)) + Number(mainNum.charAt(3))) }
    let artis5 = { "level": j[4], "id": k.substring(20, 25), "mainId": Number(mainId.substring(2, 4)), "attrIds": o.slice(Number(mainNum.charAt(0)) + Number(mainNum.charAt(1)) + Number(mainNum.charAt(2)) + Number(mainNum.charAt(3)), Number(mainNum.charAt(0)) + Number(mainNum.charAt(1)) + Number(mainNum.charAt(2)) + Number(mainNum.charAt(3)) + Number(mainNum.charAt(4))) }
    let artis6 = { "level": j[5], "id": k.substring(25, 30), "mainId": Number(mainId.charAt(4)), "attrIds": o.slice(Number(mainNum.charAt(0)) + Number(mainNum.charAt(1)) + Number(mainNum.charAt(2)) + Number(mainNum.charAt(3)) + Number(mainNum.charAt(4)), Number(mainNum.charAt(0)) + Number(mainNum.charAt(1)) + Number(mainNum.charAt(2)) + Number(mainNum.charAt(3)) + Number(mainNum.charAt(4)) + Number(mainNum.charAt(5))) }
    JsonO.avatars[characterID] = { "name": characterJson[characterID]?.name, "id": characterID, "elem": characterJson[characterID]?.elem, "level": characterLv, "promote": characterPr, "cons": characterCo, "talent": talent, "trees": trees, "weapon": weapon, "artis": { "1": artis1, "2": artis2, "3": artis3, "4": artis4, "5": artis5, "6": artis6 }, "_source": source, "_time": (new Date()) * 1, "_update": (new Date()) * 1, "_talent": (new Date()) * 1 }
    fs.writeFileSync(`./data/PlayerData/sr/${uid}.json`, JSON.stringify(JsonO, null, 2), 'utf8')
    e.reply(`[liangshi-calc]已成功为${uid}导入了${characterJson[characterID]?.name || "TxtCharName"}面板\n使用 #重载面板 后即可使用`)
  } else { e.reply(`[liangshi-calc]未知的分享码类型,请检查分享码正确性`) }
  return true
}

export async function exportPanel (e, gameText, data, uid) {
  let key, game, character, characterID, characterLv, characterCo, characterPr, characterTaKey, TaKey, characterTa,trees , weapon, weaponID, weaponLv, weaponCo, weaponPr, artis, artisID1, artisID2, artisID3, artisID4, artisID5, artisLv, artisSt, artisAt, artisAtID, artisMaId, artisJson, weaponSwordJson, weaponPolearmJson, weaponClaymoreJson, weaponCatalystJson, weaponBowJson, weaponJson, numberKey = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  if (gameText === "原神") { game = "G" } else if (gameText === "崩坏:星穹铁道") { game = "S" } else if (gameText === "绝区零") { game = "Z" } else { game = "W" }
  if (gameText === "原神") {
    try {
      artisJson = fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/artifact/data.json', 'utf8')
      weaponSwordJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/sword/data.json', 'utf8'))
      weaponPolearmJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/polearm/data.json', 'utf8'))
      weaponClaymoreJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/claymore/data.json', 'utf8'))
      weaponCatalystJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/catalyst/data.json', 'utf8'))
      weaponBowJson = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/bow/data.json', 'utf8'))
      weaponJson = { ...weaponSwordJson, ...weaponPolearmJson, ...weaponClaymoreJson, ...weaponCatalystJson, ...weaponBowJson }
    } catch (err) { e.reply(`读取本地数据的时候遇到了一些问题，等待一会试吧(*/ω＼*)`); console.error(`[liangshi-calc] 读取本地文件错误：${err}`); return true }
    let IDkey = num => { let s = ''; while (num > 0n) { let er = num % 62n; s = numberKey[Number(er)] + s; num = num / 62n } return s || '0' }
    let WeaponIDNameKey = (r, s) => { for (let t in s) { if (s.hasOwnProperty(t)) { let u = s[t]; if (u.name === r) return u.id } } return 10000 }
    let Artiskey = num => { let numKey = { 102: "1", 103: "2", 105: "3", 106: "4", 108: "5", 109: "6", 123: "7", 124: "8", 120: "9", 122: "0" }, h = num.toString() /*let num1 = parseInt(h.substring(0, 2), 10)*/; return numKey[parseInt(h.substring(2, 5), 10)] + parseInt(h.substring(5, 6), 10).toString()}
    let Ta1Le = data.talent.a, Ta2Le = data.talent.e, Ta3Le = data.talent.q
    if (Ta1Le < 10 && Ta2Le < 10 && Ta3Le < 10) { TaKey = 0 } else if (Ta1Le >= 10 && Ta2Le < 10 && Ta3Le < 10) { TaKey = 1 } else if (Ta1Le < 10 && Ta2Le >= 10 && Ta3Le < 10) { TaKey = 2 } else if (Ta1Le < 10 && Ta2Le < 10 && Ta3Le >= 10) { TaKey = 3 } else if (Ta1Le >= 10 && Ta2Le >= 10 && Ta3Le < 10) { TaKey = 4 } else if (Ta1Le >= 10 && Ta2Le < 10 && Ta3Le >= 10) { TaKey = 5 } else if (Ta1Le < 10 && Ta2Le >= 10 && Ta3Le >= 10) { TaKey = 6 } else if (Ta1Le >= 10 && Ta2Le >= 10 && Ta3Le >= 10) { TaKey = 7 } else { TaKey = 8 }
    let artisMainIdMap = { 'hpPlus': "11", 'hp': "12", 'atkPlus': "13", 'atk': "14", 'defPlus': "15", 'def': "16", 'recharge': "21", 'mastery': "22", 'cpct': "31", 'cdmg': "32", 'heal': "33", 'pyro': "41", 'electro': "42", 'cryo': "43", 'hydro': "44", 'anemo': "45", 'geo': "46", 'dendro': "47", 'phy': "48" }
    characterID = data.id; characterCo = data.cons; characterPr = data.promote; characterTaKey = TaKey; characterTa = BigInt(Ta1Le.toString() + Ta2Le.toString() + Ta3Le.toString()); characterLv = data.level
    character = IDkey(BigInt(characterID.toString() + characterCo.toString() + characterPr.toString() + characterTaKey.toString() + characterTa.toString() + characterLv.toString()))
    weaponID = WeaponIDNameKey(data.weapon.name, weaponJson); weaponCo = data.weapon.affix; weaponPr = data.weapon.promote; weaponLv = data.weapon.level
    weapon = IDkey(BigInt(weaponID.toString() + weaponCo.toString() + weaponPr.toString() + weaponLv.toString()))
    artisID1 = await ArtisIDNameKey(data.artis[1]?.name, artisJson); artisID2 = await ArtisIDNameKey(data.artis[2]?.name, artisJson); artisID3 = await ArtisIDNameKey(data.artis[3]?.name, artisJson); artisID4 = await ArtisIDNameKey(data.artis[4]?.name, artisJson); artisID5 = await ArtisIDNameKey(data.artis[5]?.name, artisJson)
    artisLv = data.artis[1].level * Math.pow(21, 4) + data.artis[2]?.level * Math.pow(21, 3) + data.artis[3]?.level * Math.pow(21, 2) + data.artis[4].level * 21 + data.artis[4]?.level
    artisSt = data.artis[1].star * Math.pow(6, 4) + data.artis[2]?.star * Math.pow(6, 3) + data.artis[3]?.star * Math.pow(6, 2) + data.artis[4].star * 6 + data.artis[5]?.star
    artisMaId = (artisMainIdMap[mainIdMap[data.artis[3]?.mainId]] ?? '00') + (artisMainIdMap[mainIdMap[data.artis[4]?.mainId]] ?? '00') + (artisMainIdMap[mainIdMap[data.artis[5]?.mainId]] ?? '00')
    artisAt = data.artis[1].attrIds.length.toString() + data.artis[2]?.attrIds.length.toString() + data.artis[3]?.attrIds.length.toString() + data.artis[4]?.attrIds.length.toString() + data.artis[5]?.attrIds.length.toString()
    artisAtID = data.artis[1].attrIds.concat(data.artis[2]?.attrIds, data.artis[3]?.attrIds, data.artis[4]?.attrIds, data.artis[5]?.attrIds)
    artisAtID = artisAtID.map(num => Artiskey(num)).join('')
    artis = IDkey(BigInt(artisID1.toString() + artisID2.toString() + artisID3.toString() + artisID4.toString() + artisID5.toString())) + "=" + IDkey(BigInt(artisLv.toString())) + "^" + IDkey(BigInt(artisSt.toString())) + "&" + IDkey(BigInt(artisMaId.toString() + artisAt.toString() + artisAtID))
    key = game + "-" + character + "_" + weapon + "*" + artis + "*" + IDkey(BigInt(uid))
  } else if (gameText === "崩坏:星穹铁道") {
    let IDkey = num => { let s = ''; while (num > 0n) { let er = num % 62n; s = numberKey[Number(er)] + s; num = num / 62n } return s || '0' }
    let srArtCl = a => { return a.map(b => { let [num1, num2, num3] = b.split(',').map(Number); return num1.toString().padStart(2, '0') + (num2 * 8 + num3).toString().padStart(2, '0')})}
    let Ta0Le = data.talent.a, Ta1Le = data.talent.e, Ta2Le = data.talent.q, Ta3Le = data.talent.t, Ta4Le = data.talent.me || 0, Ta5Le = data.talent.mt || 0, treOne, treTwo
    if (Ta1Le < 10 && Ta2Le < 10 && Ta2Le < 10) { TaKey = 0 } else if (Ta1Le >= 10 && Ta2Le < 10 && Ta3Le < 10) { TaKey = 1 } else if (Ta1Le < 10 && Ta2Le >= 10 && Ta3Le < 10) { TaKey = 2 } else if (Ta1Le < 10 && Ta2Le < 10 && Ta3Le >= 10) { TaKey = 3 } else if (Ta1Le >= 10 && Ta2Le >= 10 && Ta3Le < 10) { TaKey = 4 } else if (Ta1Le >= 10 && Ta2Le < 10 && Ta3Le >= 10) { TaKey = 5 } else if (Ta1Le < 10 && Ta2Le >= 10 && Ta3Le >= 10) { TaKey = 6 } else if (Ta1Le >= 10 && Ta2Le >= 10 && Ta3Le >= 10) { TaKey = 7 } else { TaKey = 8 }
    characterID = data.id; characterCo = data.cons; characterPr = data.promote; characterTaKey = TaKey; characterTa = BigInt(Ta0Le.toString() + Ta1Le.toString() + Ta2Le.toString() + Ta3Le.toString() + Ta4Le.toString() + Ta5Le.toString()); characterLv = data.level
    character = IDkey(BigInt(characterID.toString() + characterCo.toString() + characterPr.toString() + characterTaKey.toString() + characterTa.toString() + characterLv.toString()))
    data.trees = data.trees.map(item => item.substring(4))
    if (!data.trees.includes("101") && !data.trees.includes("102") && !data.trees.includes("103")) { treOne = 0 } else if (data.trees.includes("101") && !data.trees.includes("102") && !data.trees.includes("103")) { treOne = 1 } else if (!data.trees.includes("101") && data.trees.includes("102") && !data.trees.includes("103")) { treOne = 2 } else if (!data.trees.includes("101") && !data.trees.includes("102") && data.trees.includes("103")) { treOne = 3 } else if (data.trees.includes("101") && data.trees.includes("102") && !data.trees.includes("103")) { treOne = 4 } else if (data.trees.includes("101") && !data.trees.includes("102") && data.trees.includes("103")) { treOne = 5 } else if (!data.trees.includes("101") && data.trees.includes("102") && data.trees.includes("103")) { treOne = 6 } else { treOne = 7 }
    let trezt = [data.trees.includes("201"), data.trees.includes("202"), data.trees.includes("203"), data.trees.includes("204"), data.trees.includes("205"), data.trees.includes("206"), data.trees.includes("207"), data.trees.includes("208"), data.trees.includes("209"), data.trees.includes("210")]
    treTwo = trezt.reduce((b, c, d) => b | (c << d), 0); trees = IDkey(BigInt(treOne.toString() + treTwo.toString()))
    weaponID = data.weapon.id; weaponCo = data.weapon.affix; weaponPr = data.weapon.promote; weaponLv = data.weapon.level
    weapon = IDkey(BigInt(weaponID.toString() + weaponCo.toString() + weaponPr.toString() + weaponLv.toString()))
    artisID1 = data.artis[1]?.id ?? "10000"; artisID2 = data.artis[2]?.id ?? "10000"; artisID3 = data.artis[3]?.id ?? "10000"; artisID4 = data.artis[4]?.id ?? "10000"; artisID5 = data.artis[5]?.id ?? "10000"; let artisID6 = data.artis[6]?.id ?? "10000"
    artisLv = data.artis[1]?.level * Math.pow(21, 5) + data.artis[2]?.level * Math.pow(21, 4) + data.artis[3]?.level * Math.pow(21, 3) + data.artis[4]?.level * Math.pow(21, 2) + data.artis[5].level * 21 + data.artis[6]?.level
    artisMaId = String(data.artis[3]?.mainId ?? "0") + String(data.artis[4]?.mainId ?? "0") + String(data.artis[5]?.mainId ?? 0).padStart(2, '0') + String(data.artis[6]?.mainId ?? "0")
    artisAt = data.artis[1]?.attrIds.length.toString() + data.artis[2]?.attrIds.length.toString() + data.artis[3]?.attrIds.length.toString() + data.artis[4]?.attrIds.length.toString() + data.artis[5]?.attrIds.length.toString() + data.artis[6]?.attrIds.length.toString()
    let artisNr = [srArtCl(data.artis[1]?.attrIds), srArtCl(data.artis[2]?.attrIds), srArtCl(data.artis[3]?.attrIds), srArtCl(data.artis[4]?.attrIds), srArtCl(data.artis[5]?.attrIds), srArtCl(data.artis[6]?.attrIds)]
    artisAtID = [].concat(...artisNr).join('')
    artis = IDkey(BigInt(artisID1.toString() + artisID2.toString() + artisID3.toString() + artisID4.toString() + artisID5.toString() + artisID6.toString())) + "=" + IDkey(BigInt(artisLv.toString())) + "^"+ IDkey(BigInt(artisMaId.toString() + artisAt.toString() + artisAtID.toString()))
    key = game + "-" + character  + "_" + trees + "&" + weapon + "*" + artis + "*" + IDkey(BigInt(uid))
  } else { e.reply(`尚未适配此内容，等待后续更新后再试吧(*/ω＼*)`); return false }
  e.reply(`[liangshi-calc] 分享成功, 你现在可以使用以下分享码导出面板了`)
  e.reply(`${gameText}-${data.name}：${key}`)
}

export async function ArtisIDNameKey(y, z, mode) { let g = "name", r = "id"; if (mode) { r = "name"; g = "id" } try { let data = JSON.parse(z); for (let c in data) { let item = data[c], b = item.idxs || {}; for (let a in b) { if (b[a][g] === y) { return b[a][r] || '10000' } } } return '10000' } catch (err) { console.log(`[liangshi-calc] 圣遗物读取错误${err}`); return '10000' } }

export async function TextHash(a) { return crypto.createHash('sha256').update(a).digest('hex') }
