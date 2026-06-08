import common from '../../../../../lib/common/common.js'
import { Common } from '../../../components/index.js'
import { LSconfig } from '#liangshi'
import fs from 'node:fs'


/**
 * 鸣潮API3
 * nanoka.cc
 *
 * 适配中
 *
 * 如果有新的问题建议去issue反馈
 */


export async function New (e) { e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function CharacterNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)角色(数据|资源|资源数据)?(.*?)$/)
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
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.ww.latest
      } else { verLeve = version }
      url = `${ProxyUrl}https://static.nanoka.cc/ww/${verLeve}/zh/character/${CharacterId}.json`
      response = await fetch(url)
      if (!response.ok) { console.error(`[liangshi-calc]访问云端时发生错误:${response.status}`); throw new Error() }
      data = await response.json()
      console.log(`[liangshi-calc]角色：${data.name || "无名"} 云端数据读取成功`)
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
    let CharacterName = data.name || "无名"
    let icons = `./plugins/miao-plugin/resources/meta-mc/character/${CharacterName}/icons`
    let imgs = `./plugins/miao-plugin/resources/meta-mc/character/${CharacterName}/imgs`
    if (!fs.existsSync(icons)) { fs.mkdirSync(icons, { recursive: true }); console.log(`[liangshi-calc]角色：${data.name || "无名"} 本地icons文件夹创建成功`) }
    if (!fs.existsSync(imgs)) { fs.mkdirSync(imgs, { recursive: true }); console.log(`[liangshi-calc]角色：${data.name || "无名"} 本地imgs文件夹创建成功`) }
    let talentData = (ccb) => {
      let bbc = {}
      for (const key in ccb) {
        if (ccb.hasOwnProperty(key)) {
          let val = [], val2 = [], yjs = false;
          for (let param of ccb[key].param[0]) { let clData = param.replace(/%/g, ''); if (/[+\-*/]/.test(clData)) {yjs = true; val.push(eval(clData)); val2.push(clData.match(/[-+]?\d*\.?\d+/g).map(Number))} else {val.push(parseFloat(clData))}}
          bbc[ccb[key].name] = val; if (yjs) { bbc[`${ccb[key].name}2`] = val2 }
        }
      }
      return bbc
    }
    let ItemText = await fetch(`${ProxyUrl}https://static.nanoka.cc/ww/${verLeve}/zh/item.json`)
    let ItemNamedata = await ItemText.json()
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
      "id": data.id,
      "name": data.name || "无名",
      "abbr": data.nick_name || "",
      "title": data.chara_info.talent_name,
      "star": data.rarity,
      "elem": elemKey[data.element],
      "allegiance": data.chara_info.country,
      "weapon": weaponKey[data.weapon],
      "birth": data.chara_info.birth,
      "desc": data.desc.replace(/<a[^>]*>(.*?)<\/a>/g, '$1').replace(/\n/g, '').replace(/<te href=\d+>|<\/te>/g, '').replace('<br>', ''),
      "cncv": data.chara_info.cv_name_cn,
      "jpcv": data.chara_info.cv_name_jp,
      "costume": false,
      "tag": {
        "keys": Object.keys(data.tag).map(Number),
        "name": Object.values(data.tag).map(a => a.name)
      },
      "Features": data.forte_new?.features,
      "ver": 1,
      "baseAttr": {
        "hp": data.stats["6"]["90"].life,
        "atk": data.stats["6"]["90"].atk,
        "def": data.stats["6"]["90"].def
      },
      "Weakness": {
        "ratio": data.stats_weakness?.break_weakness_ratio || 10000,
        "mastery": data.stats_weakness?.weakness_mastery || 0
      },
      "materials": {
        "boss": ItemNamedata?.[data.ascensions?.["6"]?.[0]?.key]?.name || data.ascensions?.["6"]?.[0]?.key,
        "specialty": ItemNamedata?.[data.ascensions?.["6"]?.[1]?.key]?.name || data.ascensions?.["6"]?.[2]?.key,
        "normal": ItemNamedata?.[data.ascensions?.["6"]?.[2]?.key]?.name || data.ascensions?.["6"]?.[0]?.key,
        "talent": ItemNamedata?.[data.skill_trees?.["1"]?.skill?.consume?.["10"]?.[0]?.key]?.name || data.skill_trees?.["1"]?.skill?.consume?.["10"]?.[0]?.key,
        "weekly": ItemNamedata?.[data.skill_trees?.["1"]?.skill?.consume?.["10"]?.[2]?.key]?.name || data.skill_trees?.["1"]?.skill?.consume?.["10"]?.[2]?.key,
      },
      "talent": {
        "a": {
          "name": data.skill_trees["1"]?.skill.name,
          "desc": data.skill_trees["1"]?.skill.desc.replace(/\{(\d+)}/g, (a, b) => data.skill_trees["1"]?.skill.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=40>(.*?)<\/size>/g, '<h3>$1<\/h3>').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== ''),
          "tables": Object.entries(data.skill_trees["1"]?.skill.level).map(([a, b]) => { let da = { name: b.name, isSame: false, values: b.param[0] }; if (b.format !== null) {let txtd = b.format.indexOf('{0}'); if (txtd !== -1) { da.values = da.values.map(p => b.format.substring(0, txtd) + p + b.format.substring(txtd + 3))}} da.isSame = da.values.length > 0 && da.values.every(p => p === da.values[0]); return da})
        },
        "e": {
          "name": data.skill_trees["2"]?.skill.name,
          "desc": data.skill_trees["2"]?.skill.desc.replace(/\{(\d+)}/g, (a, b) => data.skill_trees["2"]?.skill.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=40>(.*?)<\/size>/g, '<h3>$1<\/h3>').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== ''),
          "tables": Object.entries(data.skill_trees["2"]?.skill.level).map(([a, b]) => { let da = { name: b.name, isSame: false, values: b.param[0] }; if (b.format !== null) {let txtd = b.format.indexOf('{0}'); if (txtd !== -1) { da.values = da.values.map(p => b.format.substring(0, txtd) + p + b.format.substring(txtd + 3))}} da.isSame = da.values.length > 0 && da.values.every(p => p === da.values[0]); return da})
        },
        "q": {
          "name": data.skill_trees["3"]?.skill.name,
          "desc": data.skill_trees["3"]?.skill.desc.replace(/\{(\d+)}/g, (a, b) => data.skill_trees["3"]?.skill.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=40>(.*?)<\/size>/g, '<h3>$1<\/h3>').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== ''),
          "tables": Object.entries(data.skill_trees["3"]?.skill.level).map(([a, b]) => { let da = { name: b.name, isSame: false, values: b.param[0] }; if (b.format !== null) {let txtd = b.format.indexOf('{0}'); if (txtd !== -1) { da.values = da.values.map(p => b.format.substring(0, txtd) + p + b.format.substring(txtd + 3))}} da.isSame = da.values.length > 0 && da.values.every(p => p === da.values[0]); return da})
        },
        "t": {
          "name": data.skill_trees["7"]?.skill.name,
          "desc": data.skill_trees["7"]?.skill.desc.replace(/\{(\d+)}/g, (a, b) => data.skill_trees["7"]?.skill.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=40>(.*?)<\/size>/g, '<h3>$1<\/h3>').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== ''),
          "tables": Object.entries(data.skill_trees["7"]?.skill.level).map(([a, b]) => { let da = { name: b.name, isSame: false, values: b.param[0] }; if (b.format !== null) {let txtd = b.format.indexOf('{0}'); if (txtd !== -1) { da.values = da.values.map(p => b.format.substring(0, txtd) + p + b.format.substring(txtd + 3))}} da.isSame = da.values.length > 0 && da.values.every(p => p === da.values[0]); return da})
        },
        "i": {
          "name": data.skill_trees["6"]?.skill.name,
          "desc": data.skill_trees["6"]?.skill.desc.replace(/\{(\d+)}/g, (a, b) => data.skill_trees["6"]?.skill.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=40>(.*?)<\/size>/g, '<h3>$1<\/h3>').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== ''),
          "tables": Object.entries(data.skill_trees["6"]?.skill.level).map(([a, b]) => { let da = { name: b.name, isSame: false, values: b.param[0] }; if (b.format !== null) {let txtd = b.format.indexOf('{0}'); if (txtd !== -1) { da.values = da.values.map(p => b.format.substring(0, txtd) + p + b.format.substring(txtd + 3))}} da.isSame = da.values.length > 0 && da.values.every(p => p === da.values[0]); return da})
        },
        "o": {
          "name": data.skill_trees["8"]?.skill.name,
          "desc": data.skill_trees["8"]?.skill.desc.replace(/\{(\d+)}/g, (a, b) => data.skill_trees["8"]?.skill.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=40>(.*?)<\/size>/g, '<h3>$1<\/h3>').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== ''),
          "tables": Object.entries(data.skill_trees["8"]?.skill.level).map(([a, b]) => { let da = { name: b.name, isSame: false, values: b.param[0] }; if (b.format !== null) {let txtd = b.format.indexOf('{0}'); if (txtd !== -1) { da.values = da.values.map(p => b.format.substring(0, txtd) + p + b.format.substring(txtd + 3))}} da.isSame = da.values.length > 0 && da.values.every(p => p === da.values[0]); return da})
        }
      },
      "talentData": {
        "a": talentData(data.skill_trees["1"]?.skill.level),
        "e": talentData(data.skill_trees["2"]?.skill.level),
        "q": talentData(data.skill_trees["3"]?.skill.level),
        "t": talentData(data.skill_trees["7"]?.skill.level),
        "i": talentData(data.skill_trees["6"]?.skill.level),
        "o": talentData(data.skill_trees["8"]?.skill.level)
      },
      "cons": {
        "1": {
          "name": data.chains?.["1"]?.name,
          "desc": data.chains?.["1"]?.desc.replace(/\{(\d+)}/g, (a, b) => data.chains?.["1"]?.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== '')
        },
        "2": {
          "name": data.chains?.["2"]?.name,
          "desc": data.chains?.["2"]?.desc.replace(/\{(\d+)}/g, (a, b) => data.chains?.["2"]?.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== '')
        },
        "3": {
          "name": data.chains?.["3"]?.name,
          "desc": data.chains?.["3"]?.desc.replace(/\{(\d+)}/g, (a, b) => data.chains?.["3"]?.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== '')
        },
        "4": {
          "name": data.chains?.["4"]?.name,
          "desc": data.chains?.["4"]?.desc.replace(/\{(\d+)}/g, (a, b) => data.chains?.["4"]?.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== '')
        },
        "5": {
          "name": data.chains?.["5"]?.name,
          "desc": data.chains?.["5"]?.desc.replace(/\{(\d+)}/g, (a, b) => data.chains?.["5"]?.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== '')
        },
        "6": {
          "name": data.chains?.["6"]?.name,
          "desc": data.chains?.["6"]?.desc.replace(/\{(\d+)}/g, (a, b) => data.chains?.["6"]?.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== '')
        }
      },
      "passive": [
        {
          "name": data.skill_trees["4"]?.skill.name,
          "desc": data.skill_trees["4"]?.skill.desc.replace(/\{(\d+)}/g, (a, b) => data.skill_trees["4"]?.skill.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=40>(.*?)<\/size>/g, '<h3>$1<\/h3>').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== '')
        },
        {
          "name": data.skill_trees["5"]?.skill.name,
          "desc": data.skill_trees["5"]?.skill.desc.replace(/\{(\d+)}/g, (a, b) => data.skill_trees["5"]?.skill.param[parseInt(b)]).replace(/<te href=\w+>|<\/te>/g, '').replace(/<color=\w+>|<\/color>/g, '').replace(/<size=40>(.*?)<\/size>/g, '<h3>$1<\/h3>').replace(/<size=10><\/size>/g, '').split('\n').filter(item => item !== '')
        },
      ],
      "attr": {
        "tree": {
          "1": {
            "name": data.skill_trees["9"]?.skill.name + data.skill_trees["9"]?.skill.param[0],
            "key": data.skill_trees["9"]?.skill.name,
            "value": parseFloat(data.skill_trees["9"]?.skill.param[0].match(/\d+\.?\d*/))
          },
          "2": {
            "name": data.skill_trees["10"]?.skill.name + data.skill_trees["10"]?.skill.param[0],
            "key": data.skill_trees["10"]?.skill.name,
            "value": parseFloat(data.skill_trees["10"]?.skill.param[0].match(/\d+\.?\d*/))
          },
          "3": {
            "name": data.skill_trees["11"]?.skill.name + data.skill_trees["11"]?.skill.param[0],
            "key": data.skill_trees["11"]?.skill.name,
            "value": parseFloat(data.skill_trees["11"]?.skill.param[0].match(/\d+\.?\d*/))
          },
          "4": {
            "name": data.skill_trees["12"]?.skill.name + data.skill_trees["12"]?.skill.param[0],
            "key": data.skill_trees["12"]?.skill.name,
            "value": parseFloat(data.skill_trees["12"]?.skill.param[0].match(/\d+\.?\d*/))
          },
          "5": {
            "name": data.skill_trees["13"]?.skill.name + data.skill_trees["13"]?.skill.param[0],
            "key": data.skill_trees["13"]?.skill.name,
            "value": parseFloat(data.skill_trees["13"]?.skill.param[0].match(/\d+\.?\d*/))
          },
          "6": {
            "name": data.skill_trees["14"]?.skill.name + data.skill_trees["14"]?.skill.param[0],
            "key": data.skill_trees["14"]?.skill.name,
            "value": parseFloat(data.skill_trees["14"]?.skill.param[0].match(/\d+\.?\d*/))
          },
          "7": {
            "name": data.skill_trees["15"]?.skill.name + data.skill_trees["15"]?.skill.param[0],
            "key": data.skill_trees["15"]?.skill.name,
            "value": parseFloat(data.skill_trees["15"]?.skill.param[0].match(/\d+\.?\d*/))
          },
          "8": {
            "name": data.skill_trees["16"]?.skill.name + data.skill_trees["16"]?.skill.param[0],
            "key": data.skill_trees["16"]?.skill.name,
            "value": parseFloat(data.skill_trees["16"]?.skill.param[0].match(/\d+\.?\d*/))
          }
        },
        "details": {
          "1": [
            data.stats?.["0"]?.["1"]?.life,
            data.stats?.["0"]?.["1"]?.atk,
            data.stats?.["0"]?.["1"]?.def
          ],
          "20": [
            data.stats?.["0"]?.["20"]?.life,
            data.stats?.["0"]?.["20"]?.atk,
            data.stats?.["0"]?.["20"]?.def
          ],
          "40": [
            data.stats?.["1"]?.["40"]?.life,
            data.stats?.["1"]?.["40"]?.atk,
            data.stats?.["1"]?.["40"]?.def
          ],
          "50": [
            data.stats?.["2"]?.["50"]?.life,
            data.stats?.["2"]?.["50"]?.atk,
            data.stats?.["2"]?.["50"]?.def
          ],
          "60": [
            data.stats?.["3"]?.["60"]?.life,
            data.stats?.["3"]?.["60"]?.atk,
            data.stats?.["3"]?.["60"]?.def
          ],
          "70": [
            data.stats?.["4"]?.["70"]?.life,
            data.stats?.["4"]?.["70"]?.atk,
            data.stats?.["4"]?.["70"]?.def
          ],
          "80": [
            data.stats?.["5"]?.["80"]?.life,
            data.stats?.["5"]?.["80"]?.atk,
            data.stats?.["5"]?.["80"]?.def
          ],
          "90": [
            data.stats?.["6"]?.["90"]?.life,
            data.stats?.["6"]?.["90"]?.atk,
            data.stats?.["6"]?.["90"]?.def
          ],
          "20+": [
            data.stats?.["1"]?.["20"]?.life,
            data.stats?.["1"]?.["20"]?.atk,
            data.stats?.["1"]?.["20"]?.def
          ],
          "40+": [
            data.stats?.["2"]?.["40"]?.life,
            data.stats?.["2"]?.["40"]?.atk,
            data.stats?.["2"]?.["40"]?.def
          ],
          "50+": [
            data.stats?.["3"]?.["50"]?.life,
            data.stats?.["3"]?.["50"]?.atk,
            data.stats?.["3"]?.["50"]?.def
          ],
          "60+": [
            data.stats?.["4"]?.["60"]?.life,
            data.stats?.["4"]?.["60"]?.atk,
            data.stats?.["4"]?.["60"]?.def
          ],
          "70+": [
            data.stats?.["5"]?.["70"]?.life,
            data.stats?.["5"]?.["70"]?.atk,
            data.stats?.["5"]?.["70"]?.def
          ],
          "80+": [
            data.stats?.["6"]?.["80"]?.life,
            data.stats?.["6"]?.["80"]?.atk,
            data.stats?.["6"]?.["80"]?.def
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
    let imgurl = "https://static.nanoka.cc/assets/ww"
    await getImg(ProxyUrl + imgurl + data.skin?.[Object.keys(data.skin)[0]]?.portrait.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${imgs}/splash.webp`, "立绘")
    await getImg(ProxyUrl + imgurl + data.background.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${imgs}/face.webp`, "大头")
    await getImg(ProxyUrl + imgurl + data.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${imgs}/side.webp`, "侧头")
    await getImg(ProxyUrl + imgurl + data.skill_trees["4"]?.skill.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/passive-0.webp`, "固有天赋1")
    await getImg(ProxyUrl + imgurl + data.skill_trees["5"]?.skill.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/passive-1.webp`, "固有天赋2")
    await getImg(ProxyUrl + imgurl + data.skill_trees["2"]?.skill.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/talent-e.webp`, "共鸣技能")
    await getImg(ProxyUrl + imgurl + data.skill_trees["3"]?.skill.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/talent-q.webp`, "共鸣解放")
    await getImg(ProxyUrl + imgurl + data.skill_trees["6"]?.skill.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/talent-i.webp`, "变奏技能")
    await getImg(ProxyUrl + imgurl + data.skill_trees["7"]?.skill.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/talent-t.webp`, "共鸣回路")
    await getImg(ProxyUrl + imgurl + data.skill_trees["8"]?.skill.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/talent-o.webp`, "延奏技能")
    await getImg(ProxyUrl + imgurl + data.chains["1"]?.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/cons-1.webp`, "1链")
    await getImg(ProxyUrl + imgurl + data.chains["2"]?.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/cons-2.webp`, "2链")
    await getImg(ProxyUrl + imgurl + data.chains["3"]?.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/cons-3.webp`, "3链")
    await getImg(ProxyUrl + imgurl + data.chains["4"]?.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/cons-4.webp`, "4链")
    await getImg(ProxyUrl + imgurl + data.chains["5"]?.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/cons-5.webp`, "5链")
    await getImg(ProxyUrl + imgurl + data.chains["6"]?.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${icons}/cons-6.webp`, "6链")
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
            "id": data.id,
            "name": data.name || "无名",
            "abbr": data.nick_name || "",
            "star": data.rarity,
            "elem": elemKey[data.element],
            "weapon": weaponKey[data.weapon]
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

export async function WeaponNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, WeaponType, WeaponData, IconUrl, newValue, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(武器|光锥)(数据|资源|资源数据)?(.*?)$/), ID = TextData[4]
  try {
    if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的武器数据`)
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.ww.latest
      } else { verLeve = version }
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/ww/${verLeve}/zh/weapon/${ID}.json`)
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
      data = await response.json()
      console.log(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    if (ID < 21020000) { WeaponType = "broadblade" } else if (ID < 21030000) { WeaponType = "sword" } else if (ID < 21040000) { WeaponType = "pistols" } else if (ID < 21050000) { WeaponType = "gauntlets" } else if (ID < 80000000) { WeaponType = "rectifier" } else { WeaponType = "projection" }
    let WeaponName = data.name || "无名"
    let imgs = `./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/${WeaponName}`
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/${WeaponName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply(`[liangshi-calc]开始更新武器: ${WeaponName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/${WeaponName}`, { recursive: true })
      console.log(`[liangshi-calc]武器:${WeaponName} 本地文件夹创建成功`)
    } else { if (!mode) e.reply(`[liangshi-calc]武器: ${WeaponName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
    IconUrl = `${ProxyUrl}https://static.nanoka.cc/assets/ww`
    await getImg(ProxyUrl + IconUrl + data.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${imgs}/icon.webp`, "icon")
    if (!mode) e.reply(`[liangshi-calc]武器图片资源下载完成`)
    let key = { "生命": "hpPct", "攻击": "atkPct", "防御": "atkPct", "共鸣效率": "recharge", "暴击": "cpct", "暴击伤害": "cdmg" }
    let ItemData, IconResponse, attrKey
    if (data.name?.includes("投影·")) {
      WeaponData = {
        "id": Number(ID),
        "name": WeaponName,
        "star": data.rarity,
        "desc": data.desc.replace(/\n/g, '')
      }
    } else {
      try {
        if (!JsonOk) {
          IconResponse = await fetch(`${ProxyUrl}https://static.nanoka.cc/ww/${verLeve}/zh/item_all.json`)
          if (!IconResponse.ok) {
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
          ItemData = await IconResponse.json()
          console.log(`[liangshi-calc]云端数据读取成功`)
        } else {
          response = fs.readFileSync("./plugins/liangshi-calc/resources/ItemJson.json", 'utf8')
          ItemData = JSON.parse(response)
          console.log(`[liangshi-calc]本地数据读取成功`)
        }
      } catch (err) {
        ItemData = {}
        console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      }
      if (data.stats["0"]?.["1"]?.[1].is_percent) { attrKey = 100 } else { attrKey = 1 }
      WeaponData = {
        "id": Number(ID),
        "name": WeaponName,
        "affixTitle": data.effect_name,
        "star": data.rarity,
        "desc": data.desc.replace(/\n/g, ''),
        "attr": {
          "atk": {
            "1": Number(data.stats["0"]?.["1"]?.[0].value),
            "20": Number(data.stats["0"]?.["20"]?.[0].value),
            "40": Number(data.stats["1"]?.["40"]?.[0].value),
            "50": Number(data.stats["2"]?.["50"]?.[0].value),
            "60": Number(data.stats["3"]?.["60"]?.[0].value),
            "70": Number(data.stats["4"]?.["70"]?.[0].value),
            "80": Number(data.stats["5"]?.["80"]?.[0].value),
            "90": Number(data.stats["6"]?.["90"]?.[0].value),
            "20+": Number(data.stats["1"]?.["20"]?.[0].value),
            "40+": Number(data.stats["2"]?.["40"]?.[0].value),
            "50+": Number(data.stats["3"]?.["50"]?.[0].value),
            "60+": Number(data.stats["4"]?.["60"]?.[0].value),
            "70+": Number(data.stats["5"]?.["70"]?.[0].value),
            "80+": Number(data.stats["6"]?.["80"]?.[0].value)
          },
          "bonusKey": key[data.stats["0"]?.["1"]?.[1].name],
          "bonusData": {
            "1": Number(data.stats["0"]?.["1"]?.[1].value) / attrKey,
            "20": Number(data.stats["0"]?.["20"]?.[1].value) / attrKey,
            "40": Number(data.stats["1"]?.["40"]?.[1].value) / attrKey,
            "50": Number(data.stats["2"]?.["50"]?.[1].value) / attrKey,
            "60": Number(data.stats["3"]?.["60"]?.[1].value) / attrKey,
            "70": Number(data.stats["4"]?.["70"]?.[1].value) / attrKey,
            "80": Number(data.stats["5"]?.["80"]?.[1].value) / attrKey,
            "90": Number(data.stats["6"]?.["90"]?.[1].value) / attrKey,
            "20+": Number(data.stats["1"]?.["20"]?.[1].value) / attrKey,
            "40+": Number(data.stats["2"]?.["40"]?.[1].value) / attrKey,
            "50+": Number(data.stats["3"]?.["50"]?.[1].value) / attrKey,
            "60+": Number(data.stats["4"]?.["60"]?.[1].value) / attrKey,
            "70+": Number(data.stats["5"]?.["70"]?.[1].value) / attrKey,
            "80+": Number(data.stats["6"]?.["80"]?.[1].value) / attrKey
          }
        },
        "materials": {
          "weapon": ItemData[data.ascensions?.["5"]?.[0]?.key || data.ascensions?.["4"]?.[0]?.key].name,
          "monster": ItemData[data.ascensions?.["5"]?.[1]?.key || data.ascensions?.["4"]?.[1]?.key].name
        },
        "affixData": {
          "text": data.effect.replace(/\{(.*?)}/g, '\$[$1]'),
          "datas": data.param
        }
      }
    }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/${WeaponName}/data.json`
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
      if (!mode) e.reply(`[liangshi-calc]武器数据已存在，运行终止。\n如果需要刷新武器数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}武器数据`)
      console.error(`[liangshi-calc]武器：${WeaponName}\n数据已存在`)
      return false
    }
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-mc/weapon/${WeaponType}/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取武器配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]武器：${WeaponName} 数据更新完成\n尝试自动写入WeaponData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          newValue = { "id": ID, "name": WeaponName, "star": data.rarity }
          jsonData[ID] = newValue
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

export async function ArtifactNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, p, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(圣遗物|声骸|遗器)(数据|资源|资源数据)?(.*?)$/)
  try {
    let ID = TextData[4]
    if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的声骸数据`)
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.ww.latest
      } else { verLeve = version }
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/ww/${verLeve}/zh/echo/${ID}.json`)
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
      data = await response.json()
      console.log(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    let EchoName = data.name || "无名"
    let imgs = `./plugins/miao-plugin/resources/meta-mc/artifact/${EchoName}`
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/artifact/${EchoName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply(`[liangshi-calc]开始更新声骸: ${EchoName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-mc/artifact/${EchoName}`, { recursive: true })
      console.log(`[liangshi-calc]声骸:${EchoName} 本地imgs文件夹创建成功`)
    } else { if (!mode) e.reply(`[liangshi-calc]声骸: ${EchoName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
    let IconUrl = `${ProxyUrl}https://static.nanoka.cc/assets/ww`
    await getImg(ProxyUrl + IconUrl + data.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${imgs}/img.webp`, "声骸")
    await getImg(ProxyUrl + IconUrl + data.skill?.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${imgs}/skill.webp`, "技能")
    if (!mode) e.reply(`[liangshi-calc]声骸图片资源下载完成`)
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-mc/artifact/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`)}
      let ArtData = fs.readFileSync(filePath, 'utf8')
      let affData = (o) => {
        let r = {}
        for (let k in o) {
          if (o.hasOwnProperty(k)) {
            let e = { ...o[k] }, s = e.set, h = {}
            for (const sk in s) { if (s.hasOwnProperty(sk)) { let i = { ...s[sk] }, { desc: t, param: p } = i, nd = t || ''; nd = nd.replace(/\{(\d+)\}/g, (m, idx) => p?.[idx] ?? m); h[sk] = nd }}
            e.effect = h; delete e.set; r[k] = e
          }
        }
        return r
      }
      let DataID = (a, b) => { Object.keys(b).forEach(key => { if (a.hasOwnProperty(key)) { a[key].id = b[key].id; a[key].name = b[key].name; a[key].effect = b[key].effect; a[key].icon = undefined; a[key].color = undefined } else { a[key] = { ...b[key], sets: a[key]?.sets || [], icon: undefined, color: undefined } }}); return a }
      let Sets = (a, b, c) => { b.forEach(num => { let key = String(num); if (a.hasOwnProperty(key)) { if (!a[key].sets) { a[key].sets = [c] } else { if (!a[key].sets.includes(c)) { a[key].sets.push(c) } } } }); return a }
      fs.writeFile(filePath, JSON.stringify(Sets(DataID(JSON.parse(ArtData), affData(data.group)), Object.keys(data.group), data.id), null, 2), 'utf8', (err) => { if (err) { console.error(`[liangshi-calc]声骸：${EchoName}自动配置data.json失败:\n`, err) } else { console.log(`[liangshi-calc]声骸：${EchoName} 配置data.json成功`) }})
      let skillMap = {}; data.skill.param.forEach(c => {c.forEach((a, b) => {(skillMap[b] || (skillMap[b] = [])).push(a)})})
      let ArtifactData = {
        "id": data.id,
        "Name": EchoName,
        "Type": data.type || "",
        "Intensity": data.intensity || "",
        "Place": data.place || "",
        "Code": data.code || "",
        "desc": data.skill.simple_desc.replace(/\n/g, '').replace(/<size=40><color=Title>/g, '').replace(/<\/color><\/size>/g, ''),
        "Rarity": data.rarity || [2, 3, 4, 5],
        "Group": Object.keys(data.group).map(Number),
        "affixData": {
          "text": data.skill.desc.replace(/\{(.*?)}/g, '\$[$1]').replace(/\n/g, ''),
          "datas": skillMap
        }
      }
      let path = `./plugins/miao-plugin/resources/meta-mc/artifact/${EchoName}/data.json`
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, JSON.stringify(ArtifactData, null, 2), 'utf8')
        console.log(`[liangshi-calc]声骸：${EchoName} 数据已写入`)
        if (!mode) e.reply(`[liangshi-calc]声骸：${EchoName} 数据已写入`)
      } else if (/强制|强行|覆盖/.test(e.msg)) {
        if (!mode) e.reply('[liangshi-calc]声骸数据已存在，当前为强制模式，尝试覆盖写入。')
        fs.writeFileSync(path, JSON.stringify(ArtifactData, null, 2), 'utf8')
        console.log(`[liangshi-calc]声骸：${EchoName} 数据已写入`)
        if (!mode) e.reply(`[liangshi-calc]声骸：${EchoName} 数据已写入`)
      } else {
        if (!mode) e.reply(`[liangshi-calc]声骸数据已存在，运行终止。\n如果需要刷新声骸数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}声骸数据`)
        console.error(`[liangshi-calc]声骸：${EchoName}\n数据已存在`)
      }
      if (!mode) e.reply(`[liangshi-calc]声骸：${EchoName} 数据更新完成\n重启后即可使用相关内容`)
    } else { if (!mode) e.reply(`[liangshi-calc]声骸：${EchoName} 数据更新完成\n当前未启用自动写入ArtifactData\n手动配置后重启才可使用\n自动写入ArtifactData可在config.yaml启用或使用强制更新临时启用一次`)}
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

export async function MonsterNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, MonsterData, newValue, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = "" }
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)(敌人|敌怪|怪物|残响|残像|boss|BOSS)(数据|资源|资源数据)?(.*?)$/), ID = TextData[4]
  if (!mode) e.reply(`[liangshi-calc]开始更新ID:${ID}的敌怪数据`)
  try {
    try {
      if (!version) {
        verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
        verUrl = await verUrl.json()
        verLeve = verUrl.ww.latest
      } else { verLeve = version }
      response = await fetch(`${ProxyUrl}https://static.nanoka.cc/ww/${verLeve}/zh/monster/${ID}.json`)
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
      data = await response.json()
      console.log(`[liangshi-calc]云端数据读取成功`)
    } catch (err) {
      if (!mode) e.reply('[liangshi-calc]云端数据读取异常，请稍后再试(*/ω＼*)')
      console.log(`[liangshi-calc]云端数据读取异常，请稍后再试\n${err}`)
      return false
    }
    let MonName = data.name || "无名"
    let imgs = `./plugins/miao-plugin/resources/meta-mc/monster/${MonName}`
    if (!fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/monster/${MonName}`) || /强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply(`[liangshi-calc]开始更新敌怪: ${MonName}`)
      fs.mkdirSync(`./plugins/miao-plugin/resources/meta-mc/monster/${MonName}`, { recursive: true })
      console.log(`[liangshi-calc]敌怪:${MonName} 本地文件夹创建成功`)
    } else { if (!mode) e.reply(`[liangshi-calc]敌怪: ${MonName} 已经存在，如需更新数据请使用覆盖更新。`); return false }
    let IconUrl = `${ProxyUrl}https://static.nanoka.cc/assets/ww`
    await getImg(ProxyUrl + IconUrl + data.icon.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${imgs}/icon.webp`, "icon")
    if (!mode) e.reply(`[liangshi-calc]敌怪图片资源下载完成`)
    let HPattr = [], DEFattr = [], ATKattr = [], HARattr = [], REGattr = []
    Object.values(data.stats).forEach(item => {
      HPattr.push(item.life.toFixed(4) * 1)
      ATKattr.push(item.atk.toFixed(4) * 1)
      DEFattr.push(item.def.toFixed(4) * 1)
      HARattr.push(item.hardness_max.toFixed(4) * 1)
      REGattr.push(item.rage_max.toFixed(4) * 1)
    })
    MonsterData = {
      id: Number(ID),
      name: MonName,
      desc: data.desc,
      descAll: data.desc_open.replace(/<\/?color[^>]*>/g, '').split("\n"),
      rarity: data.rarity,
      element: data.element,
      elementArray: data.element_array,
      echo: data.echo,
      attr: {
        Mass: data.base_stats.mass, //重量
        WeakTime: data.base_stats.weak_time, //共振恢复时间
        ParalysisTime: data.base_stats.paralysis_time_max, //最大瘫痪时间
        Res: {
          PhyRes: data.base_stats.damage_resistance_phys,
          GlaRes: data.base_stats.damage_resistance_element1,
          FusRes: data.base_stats.damage_resistance_element2,
          EleRes: data.base_stats.damage_resistance_element3,
          AerRes: data.base_stats.damage_resistance_element4,
          SpeRes: data.base_stats.damage_resistance_element5,
          HavRes: data.base_stats.damage_resistance_element6
        },
        hp: HPattr,
        def: DEFattr,
        atk: ATKattr,
        hardness: HARattr, //共振度
        rage: REGattr //狂暴度
      }
    }
    console.log('[liangshi-calc]数据处理完成')
    let path = `./plugins/miao-plugin/resources/meta-mc/monster/${MonName}/data.json`
    if (!fs.existsSync(path)) {
      fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
      console.log(`[liangshi-calc]敌怪：${MonName} 数据已写入`)
      if (!mode) e.reply(`[liangshi-calc]敌怪：${MonName}\n数据已写入`)
    } else if (/强制|强行|覆盖/.test(e.msg)) {
      if (!mode) e.reply('[liangshi-calc]敌怪数据已存在，当前为强制模式，尝试覆盖写入。')
      fs.writeFileSync(path, JSON.stringify(MonsterData, null, 2), 'utf8')
      console.log(`[liangshi-calc]敌怪：${MonName} 数据已写入`)
      if (!mode) e.reply(`[liangshi-calc]敌怪：${MonName}\n数据已写入`)
    } else {
      if (!mode) e.reply(`[liangshi-calc]敌怪数据已存在，运行终止。\n如果需要刷新敌怪数据至最新预览版本请使用覆盖更新\n例：#覆盖更新${ID}敌怪数据`)
      console.error(`[liangshi-calc]敌怪：${MonName}\n数据已存在`)
    }
    if (cfg.AutoUpdateData || /强制|强行|覆盖/.test(e.msg)) {
      let filePath = `./plugins/miao-plugin/resources/meta-mc/monster/data.json`
      if (!fs.existsSync(filePath)) { fs.writeFileSync(filePath, '{}'); console.log(`[liangshi-calc]未找到data.json文件，已自动创建`) }
      fs.readFile(filePath, 'utf8', (err, TextData) => {
        if (err) {
          console.error('[liangshi-calc]读取敌怪配置data.json失败:', err)
          if (!mode) e.reply(`[liangshi-calc]敌人：${MonName} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
          return false
        }
        try {
          let jsonData = JSON.parse(TextData)
          newValue = { "id": ID, "name": MonName }
          jsonData[ID] = newValue
          console.log(`[liangshi-calc]敌怪：${MonName} 配置data.json成功`)
          let updatedData = JSON.stringify(jsonData, null, 2)
          fs.writeFile(filePath, updatedData, 'utf8', (err) => {
            if (err) {
              console.error('[liangshi-calc]敌怪data.json写入失败:\n', err)
              if (!mode) e.reply(`[liangshi-calc]敌怪：${MonName} 数据更新完成\n尝试自动写入MonsterData时失败\n请手动添加后重启使用`)
              return false
            } else { console.log('[liangshi-calc]敌怪data.json已更新') }
          })
        } catch (err) { console.error('[liangshi-calc]自动配置data.json失败:\n', err) }
      })
      if (!mode) e.reply(`[liangshi-calc]敌怪：${MonName} 数据更新完成\n重启后即可使用相关内容`)
    } else { if (!mode) e.reply(`[liangshi-calc]敌怪：${MonName} 数据更新完成\n当前未启用自动写入MonsterData\n手动配置后重启才可使用\n自动写入MonsterData可在config.yaml启用或使用强制更新临时启用一次`)}
    return false
  } catch (err) {
    if (!mode) { e.reply(`[liangshi-calc]更新错误,建议检查网络状态,如网络正常可复制下方信息前往762197317反馈\n\n${err}`)
    } else {
      console.error(`[liangshi-calc]更新遇到了一些错误,已跳过此内容更新\n建议使用 #强制更新${TextData[3]}${TextData[4]}${TextData[5]}数据 进行手动更新\n${err}`)
      let lj = "./plugins/liangshi-calc/resources/log.json", oldLog = fs.existsSync(lj) ? fs.readFileSync(lj, 'utf8') : '{}', y = JSON.parse(oldLog)
      y[new Date()] = { name: TextData[4], err, text: "敌怪更新错误" }
      let bbxzData = JSON.stringify(y, null, 2)
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false } else { console.log('[liangshi-calc]错误内容已记录') } })
    }
    return true
  }
}

export async function ItemNew (e, mode, JsonOk, version) {
  if (!e.isMaster) { e.reply('你不可以更新哦~(*/ω＼*)'); return false }
  let cfg = LSconfig.getConfig('user', 'config')
  let response, ProxyUrl, data, url, verUrl, verLeve
  if (cfg.ProxyUrl) { ProxyUrl = cfg.ProxyUrl } else { ProxyUrl = ""}
  let TextData = e.msg.match(/^#*(梁氏|liangshi)?(强制|强行|覆盖)?更新(鸣潮|明朝|潮|mc|MC)(.*?)物品(数据|资源|资源数据)?(.*?)$/), ID = TextData[4]
  try {
    if (!version) {
      verUrl = await fetch(`${ProxyUrl}https://static.nanoka.cc/manifest.json`)
      verUrl = await verUrl.json()
      verLeve = verUrl.ww.latest
    } else { verLeve = version }
    if (!JsonOk) {
      try {
        response = await fetch(`${ProxyUrl}https://static.nanoka.cc/ww/${verLeve}/zh/item_all.json`)
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
    let ItemData, ItemName, ItemType, items, itemStarName, ItemJs
    if (!data[ID]) { console.log(`[liangshi-calc]找不到此物品`); return false }
    ItemJs = data[ID] || {}
    url = `${ProxyUrl}${ItemJs.icon}`
    let imgs = `./plugins/miao-plugin/resources/meta-mc/material`
    ItemType = ItemJs.tag[0]
    ItemName = ItemJs.name
    ItemData = {
      "id": ID,
      "name": ItemName,
      "type": ItemType,
      "tag": ItemJs?.tag[0],
      "Desc": ItemJs.desc.split('\n'),
      "Bg": ItemJs.bg?.split('\n'),
      "Source": ItemJs.source,
      "star": ItemJs.rarity,
      "Bag": undefined, //是否显示在背包中?
      "Del": undefined, //是否可被摧毁
      "Use": undefined, //是否可在背包中使用
      "Red": undefined, //获得时是否有红点
      "Capcity": undefined, //最大容量?
      "Stackable": undefined, //最大堆叠?
      "Dec": undefined, //分解产物
      "Leve": undefined //使用等级限制
    }
    if (ItemType === "武器与技能素材") {
      let itemID = Number(ID) + 5 - ItemJs.rarity
      let itemJson1 = data[itemID - 3]
      let itemJson2 = data[itemID - 2]
      let itemJson3 = data[itemID - 1]
      itemStarName = data[itemID].Name
      items = {
        [itemJson1.Name]: {
          "id": itemID - 3,
          "name": itemJson1.Name,
          "type": "武器与技能素材",
          "star": 2
        },
        [itemJson2.Name]: {
          "id": itemID - 2,
          "name": itemJson2.Name,
          "type": "武器与技能素材",
          "star": 3
        },
        [itemJson3.Name]: {
          "id": itemID - 1,
          "name": itemJson3.Name,
          "type": "武器与技能素材",
          "star": 4
        },
        [itemStarName]: {
          "id": itemID,
          "name": itemStarName,
          "type": "武器与技能素材",
          "star": 5
        }
      }
    }
    let IconUrl = `${ProxyUrl}https://static.nanoka.cc/assets/ww`
    await getImg(ProxyUrl + IconUrl + url.replace(/\/Game\/Aki\/UI/g, '').replace(/\.[^.]*$/, '') + ".webp", `${imgs}/${ItemType}/${ItemName}.webp`, "图标")
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
          if (ItemType === "武器与技能素材") {
            if (!jsonData[itemStarName]) jsonData[itemStarName] = {}
            jsonData[itemStarName].items = items
          }
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
      fs.writeFile(lj, bbxzData, 'utf8', (err) => { if (err) { console.error('[liangshi-calc]错误内容记录失败:\n', err); return false  } else { console.log('[liangshi-calc]错误内容已记录') }})
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
