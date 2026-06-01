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

export async function WeaponNew (e, mode) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function ArtifactNew (e, mode) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function MonsterNew (e, mode, JsonOk) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

export async function ItemNew (e, mode, JsonOk) { if(!mode) e.reply('[liangshi-calc]暂不支持使用此API更新(ಥ_ಥ)\n请在设置中切换API后再试'); return false }

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
