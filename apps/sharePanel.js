import { alias as GSaliasC } from '../../miao-plugin/resources/meta-gs/character/alias.js'
import { alias as SRaliasC } from '../../miao-plugin/resources/meta-sr/character/alias.js'
import { alias as GSaliasW } from '../../miao-plugin/resources/meta-gs/weapon/alias.js'
import { abbr as SRaliasW } from '../../miao-plugin/resources/meta-sr/weapon/alias.js'
import { setAlias as GSaliasA } from '../../miao-plugin/resources/meta-gs/artifact/alias.js'
import { aliasCfg as SRaliasA} from '../../miao-plugin/resources/meta-sr/artifact/alias.js'
import { exclusive as GSexclusive } from '../damage/liangshi-gs/data/weapon.js'
import { exclusive as SRexclusive } from '../damage/liangshi-sr/data/weapon.js'
import { getTargetUid } from '../../miao-plugin/apps/profile/ProfileCommon.js'
import { exportPanel, importPanel } from './panel/panel.js'
import plugin from '../../../lib/plugins/plugin.js'
import fs from 'node:fs'

export class calc extends plugin {
  constructor () {
    super(
      {
        name: 'liangshicalc',
        dsc: '面板拓展',
        event: 'message',
        priority: 1000,
        rule: [
          {
            reg: '^#*(导入|传入|加载|载入)面板(.*?)$',
            fnc: 'importPanel'
          },
          {
            reg: '^#*(导出|分享|提取|载出)(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)\\s*(\\d{9,10})?(.*?)面板$',
            fnc: 'exportPanel'
          },
          {
            reg: '^#*(生成|创建)(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)预设面板(.*?)$',
            fnc: 'customPanel'
          }
        ]
      }
    )
  }

  async importPanel (e) { return await importPanel(e, /^#*(导入|传入|加载|载入)面板(.*?)$/.exec(e.msg)[2]) }

  async exportPanel (e) {
    let r, gameText, chId, data
    let uid = /^#*(导出|分享|提取|载出)(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)\s*(\d{9,10})?(.*?)面板$/.exec(e.msg)[3] || await getTargetUid(e)
    let name = /^#*(导出|分享|提取|载出)(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)\s*(\d{9,10})?(.*?)面板$/.exec(e.msg)[4]
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) { gameText = "原神"; r = `./data/PlayerData/gs/${uid}.json` } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) { gameText = "崩坏:星穹铁道"; r = `./data/PlayerData/sr/${uid}.json` } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) { gameText = "绝区零"; r = `./data/PlayerData/zzz/${uid}.json` } else { gameText = "鸣潮";  r = `./data/PlayerData/www/${uid}.json` }
    if (!fs.existsSync(r)) { e.reply(`此UID还没更新过面板，更新一下面板试吧(*/ω＼*)`); return true }
    try { data = JSON.parse(fs.readFileSync(r, 'utf8')).avatars } catch (err) { e.reply(`读取本地数据的时候遇到了一些问题，等待一会试吧(*/ω＼*)`); return true }
    let p = (a, b) => { return Object.values(b).some(c =>c?.name === a) }
    if ((name in data) || p(name,data)) { if (p(name,data)) { chId = Object.entries(data).find(([d, c]) => c?.name === name); name = chId[0] } data = data[name]} else { e.reply(`此UID还没有此角色的面板，更新一下面板试吧(*/ω＼*)`); return true }
    return await exportPanel(e, gameText, data, uid)
  }

  async customPanel (e) {
    let TextData = e.msg.match(/^#*(生成|创建)(原神|原|ys|YS|gs|GS|星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR|绝区零|绝|zzz|ZZZ|鸣潮|明朝|潮|mc|MC)预设面板(.*?)$/)
    let CharacterData, ArtifactData, Text = TextData[3].split(','), CharacterId = Number(Text[0]), CharacterName, WeaponId = Number(Text[1]), WeaponName, ArtifactId = Number(Text[2]), ArtifactName = [], mainKey = [], attrKey, jsonData
    if (/原神|原|ys|YS|gs|GS/.test(e.msg)) {
      let CharacterNameKey = (a) => { if (GSaliasC.hasOwnProperty(a)) { return a } else { for (let key in GSaliasC) { if (GSaliasC.hasOwnProperty(key)) { let ccb = GSaliasC[key].split(','); if (ccb.includes(a)) { return key } } } } }
      try { CharacterData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/character/data.json', 'utf8')) } catch (err) { console.error('[liangshi-calc]角色索引data.json读取失败:', err); return false }
      if (!isNaN(CharacterId)) { if (CharacterId < 1000) CharacterId = CharacterId + 10000000; CharacterName = CharacterData[CharacterId]?.name; if (CharacterName === "" || !CharacterData) { e.reply(`[liangshi-calc]未能找到角色ID${CharacterId}，请使用角色名字再试吧(*/ω＼*)`); return false }
      } else { CharacterName = CharacterNameKey(Text[0]) || ""; if (CharacterName === "" || !CharacterData) { e.reply(`[liangshi-calc]未能找到角色${Text[0]}，请使用角色全名或ID再试吧(*/ω＼*)`); return false } CharacterId = Object.keys(CharacterData).find(key => CharacterData[key].name === CharacterName) }
      if (!isNaN(WeaponId)) { try { let BowData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/bow/data.json', 'utf8')), CatalystData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/catalyst/data.json', 'utf8')), ClaymoreData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/claymore/data.json', 'utf8')), PolearmData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/polearm/data.json', 'utf8')), SwordData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/weapon/sword/data.json', 'utf8')); WeaponName = BowData[WeaponId]?.name || CatalystData[WeaponId]?.name || ClaymoreData[WeaponId]?.name || PolearmData[WeaponId]?.name || SwordData[WeaponId]?.name; if (WeaponName === "" || !WeaponName) { e.reply(`[liangshi-calc]未能找到武器ID${Text[1]}，请使用武器名称再试吧(*/ω＼*)`); return false } } catch (err) { console.error('[liangshi-calc]武器索引data.json读取失败:', err); return false }
      } else {
        if ((Text[1] === "专武") || (Text[1] === "专光")) { WeaponName = GSexclusive[CharacterName] || ""; if (WeaponName === "" || !WeaponName) { e.reply(`[liangshi-calc]未能找到角色${CharacterName}的专属武器，请使用武器名称再试吧(*/ω＼*)`); return false }
        } else if (/专武|专光/.test(Text[1])) { let WeaponCharacter = CharacterNameKey(Text[1].replace(/专武|专光/,'')) || ""; WeaponName = GSexclusive[WeaponCharacter] || ""; if (WeaponName === "" || !WeaponName) e.reply(`[liangshi-calc]未能找到角色${CharacterNameKey(Text[1].replace(/专武|专光/,''))}的专属武器，请使用武器名称再试吧(*/ω＼*)`)
        } else { if (GSaliasW.hasOwnProperty(Text[1])) { WeaponName = Text[1] } else { for (let key in GSaliasW) { if (GSaliasW.hasOwnProperty(key)) { let ccb = GSaliasW[key].split(','); if (ccb.includes(Text[1])) { WeaponName = key; break } } } } if (WeaponName === "" || !WeaponName) { e.reply(`[liangshi-calc]未能找到武器${Text[1]}，请使用武器全名或ID再试吧(*/ω＼*)`); return false } }
      }
      try { ArtifactData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-gs/artifact/data.json', 'utf8'))
      } catch (err) { console.error('[liangshi-calc]圣遗物索引data.json读取失败:', err); return false }
      let ArtifactNameKey = (a) => { if (GSaliasA.hasOwnProperty(a)) { return a } else { for (let key in GSaliasA) { if (GSaliasA.hasOwnProperty(key)) { let ccb = GSaliasA[key].split(','); if (ccb.includes(a)) { return key } } }}}
      if (!isNaN(ArtifactId)) {
        if (Text[2].length === 14) {
          let ArtKey = [ Text[2].slice(0, 6), Text[2].slice(6, 7), Text[2].slice(7, 13), Text[2].slice(13) ]
          if (ArtKey[1] !== 2 || ArtKey[1] !== 2) { e.reply(`[liangshi-calc]圣遗物套装ID${Text[2]}格式错误，请使用套装全名或检查ID再试吧(*/ω＼*)`); return false }
          ArtifactName = [ ArtifactData[ArtKey[0]]?.idxs?.["1"].name, ArtifactData[ArtKey[0]]?.idxs?.["2"].name, ArtifactData[ArtKey[2]]?.idxs?.["3"].name, ArtifactData[ArtKey[2]]?.idxs?.["4"].name, "祭冰礼冠"]
        } else if (Text[2].length === 7) { let ArtKey = [ Text[2].slice(0, 6), Text[2].slice(6) ]; let art1Name = Text[2].slice(6) === 4 ? ArtifactData[ArtKey[0]]?.idxs?.["1"].name : "角斗士的留恋"; let art2Name = Text[2].slice(6) === 4 ? ArtifactData[ArtKey[0]]?.idxs?.["2"].name : "琴师的箭羽"; ArtifactName = [ art1Name, art2Name, ArtifactData[ArtKey[0]]?.idxs?.["3"].name, ArtifactData[ArtKey[0]]?.idxs?.["4"].name, "祭冰礼冠" ]} else { ArtifactName = [ "角斗士的留恋", "琴师的箭羽", "流放者怀表", "教官的茶杯", "战狂的鬼面" ] }
      } else {
        if (/^[^24]+2[^24]+2$/.exec(Text[2])) { ArtifactName = [ ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^([^24]+)2([^24]+)2$/)[1]))]?.idxs?.["1"]?.name, ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^([^24]+)2([^24]+)2$/)[1]))]?.idxs?.["2"]?.name, ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^([^24]+)2([^24]+)2$/)[2]))]?.idxs?.["3"]?.name, ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^([^24]+)2([^24]+)2$/)[2]))]?.idxs?.["4"]?.name, "祭冰礼冠"]
        } else if (/^(.*?)4$/.exec(Text[2])) { ArtifactName = [ ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^(.*?)4$/)[1]))]?.idxs?.["1"]?.name, ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^(.*?)4$/)[1]))]?.idxs?.["2"]?.name, ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^(.*?)4$/)[1]))]?.idxs?.["3"]?.name, ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^(.*?)4$/)[1]))]?.idxs?.["4"]?.name, "祭冰礼冠"]
        } else if (/^(.*?)2$/.exec(Text[2])) { ArtifactName = [ "角斗士的留恋", "琴师的箭羽", ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^(.*?)2$/)[1]))]?.idxs?.["3"]?.name, ArtifactData[Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(Text[2].match(/^(.*?)2$/)[1]))]?.idxs?.["4"]?.name, "祭冰礼冠"]
        } else { ArtifactName = [ "角斗士的留恋", "琴师的箭羽", "流放者怀表", "教官的茶杯", "战狂的鬼面"] }
        if (ArtifactName.length === 0) { e.reply(`[liangshi-calc]未能找到圣遗物套装${Text[2]}，请使用套装全名或ID再试吧(*/ω＼*)`); return false }
      }
      let dmgkey = { 'pyro': '火伤', 'electro': '雷伤', 'cryo': '冰伤', 'hydro': '水伤', 'anemo': '风伤', 'geo': '岩伤', 'dendro': '草伤', 'phy': '物伤' }
      let dmgMap = { '大攻': 10004, '大生': 10002, '大防': 10006, '充能': 10007, '精通': 10008, '暴击': 13007, '暴伤': 13008, '治疗': 13009, '火伤': 15008, '雷伤': 15009, '冰伤': 15010, '水伤': 15011, '风伤': 15012, '岩伤': 15013, '草伤': 15014, '物伤': 15015 }
      let arrtMap = { '大生': 501034, '生命': 501034, '小生': 501024, '大攻': 501064, '攻击': 501034, '小攻': 501054, '大防': 501094, '防御': 501094, '小防': 501084, '充能': 501234, '精通': 501244, '暴击': 501204, '暴伤': 501224, '空白': 100000 }
      let cpct = 0, attName = Text[4]
      if (/偏移/.test(Text[4])) { attName = Text[4].match(/^(.*?)偏移(.*?)$/)[1]; cpct = Text[4].match(/^(.*?)偏移(.*?)$/)[2] }
      if (/预设/.test(Text[3])) {
        if (Text[3] === "预设1" || Text[3] === "预设10") { mainKey = ["大攻", dmgkey[CharacterData[CharacterId]?.elem], "暴伤"]
        } else if (Text[3] === "预设2" || Text[3] === "预设20") { mainKey = ["大攻", "大攻", "暴伤"]
        } else if (Text[3] === "预设3" || Text[3] === "预设30") { mainKey = ["大攻", "大攻", "治疗"]
        } else if (Text[3] === "预设4" || Text[3] === "预设40") { mainKey = ["大攻", "大攻", "大攻"]
        } else if (Text[3] === "预设11") { mainKey = ["大生", dmgkey[CharacterData[CharacterId]?.elem], "暴伤"]
        } else if (Text[3] === "预设12") { mainKey = ["大防", dmgkey[CharacterData[CharacterId]?.elem], "暴伤"]
        } else if (Text[3] === "预设13") { mainKey = ["精通", dmgkey[CharacterData[CharacterId]?.elem], "暴伤"]
        } else if (Text[3] === "预设14") { mainKey = ["充能", dmgkey[CharacterData[CharacterId]?.elem], "暴伤"]
        } else if (Text[3] === "预设21") { mainKey = ["大生", "大生", "暴伤"]
        } else if (Text[3] === "预设22") { mainKey = ["大防", "大防", "暴伤"]
        } else if (Text[3] === "预设23") { mainKey = ["精通", "精通", "暴伤"]
        } else if (Text[3] === "预设31") { mainKey = ["大生", "大生", "治疗"]
        } else if (Text[3] === "预设32") { mainKey = ["大防", "大防", "治疗"]
        } else if (Text[3] === "预设33") { mainKey = ["精通", "精通", "治疗"]
        } else if (Text[3] === "预设41") { mainKey = ["大生", "大生", "大生"]
        } else if (Text[3] === "预设42") { mainKey = ["大防", "大防", "大防"]
        } else if (Text[3] === "预设43") { mainKey = ["精通", "精通", "精通"]
        } else { mainKey = ["大攻", dmgkey[CharacterData[CharacterId]?.elem], "暴伤"] }
      } else { let mainText = Text[3].replace(/大生命|大生|生命/g, '大生,').replace(/大攻击|大攻|攻击/g, '大攻,').replace(/大防御|大防|防御/g, '大防,').replace(/充能效率|元素充能|元素充能效率|充能/g, '充能,').replace(/元素精通|精通/g, '精通,').replace(/治疗加成|治疗/g, '治疗,').replace(/暴击伤害|爆击伤害|暴伤|爆伤/g, '暴伤,').replace(/暴击率|爆击率|暴击|爆击/g, '暴击,').replace(/火伤|火伤加成|火元素伤害|火元素伤害加成/g, '火伤,').replace(/雷伤|雷伤加成|雷元素伤害|雷元素伤害加成/g, '雷伤,').replace(/冰伤|冰伤加成|冰元素伤害|冰元素伤害加成/g, '冰伤,').replace(/水伤|水伤加成|水元素伤害|水元素伤害加成/g, '水伤,').replace(/风伤|风伤加成|风元素伤害|风元素伤害加成/g, '风伤,').replace(/岩伤|岩伤加成|岩元素伤害|岩元素伤害加成/g, '岩伤,').replace(/草伤|草伤加成|草元素伤害|草元素伤害加成/g, '草伤,').replace(/物伤|物理伤|物伤加成|物理伤加成|物理伤害|物理伤害加成/g, '物伤,').split(',').filter(item => item !== ''); mainKey = [ mainText[0] || "大攻", mainText[1] || dmgkey[CharacterData[CharacterId]?.elem], mainText[2] || "暴伤" ] }
      if (/预设/.test(Text[4])) {
        if (attName === "预设1" || attName === "预设10") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '小攻'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '精通'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小攻'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '大攻', '小攻'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大攻', '小攻', '精通']
          }
        } else if (attName === "预设2" || attName === "预设20") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '小攻'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '精通'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小攻'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小攻'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大攻', '小攻', '精通']
          }
        } else if (attName === "预设3" || attName === "预设30") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '小攻'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '精通'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小攻'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小攻'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大攻', '小攻', '精通']
          }
        } else if (attName === "预设4" || attName === "预设40") {
          attrKey = {
            "1": ['大攻', '大攻', '大攻', '大攻', '大攻', '大攻', '小攻', '暴伤', '暴击'],
            "2": ['大攻', '大攻', '大攻', '大攻', '大攻', '大攻', '充能', '暴伤', '暴击'],
            "3": ['小攻', '小攻', '小攻', '小攻', '小攻', '小攻', '充能', '暴伤', '暴击'],
            "4": ['小攻', '小攻', '小攻', '小攻', '小攻', '小攻', '充能', '暴伤', '暴击'],
            "5": ['小攻', '小攻', '小攻', '小攻', '小攻', '小攻', '充能', '暴伤', '暴击']
          }
        } else if (attName === "预设11") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大生', '精通'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大生', '小生'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小生'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '大生', '小生'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大生', '小生', '精通']
          }
        } else if (attName === "预设12") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大防', '小防'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大防', '小防'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小防'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '大防', '小防'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大防', '小防', '精通']
          }
        } else if (attName === "预设13") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '小攻'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '充能'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '大攻', '小攻'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '大攻', '小攻'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大攻', '小攻', '充能']
          }
        } else if (attName === "预设21") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大生', '精通'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大生', '小生'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小生'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小生'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大生', '小生', '精通']
          }
        } else if (attName === "预设22") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大防', '小防'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大防', '小防'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小防'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '精通', '小防'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大防', '小防', '精通']
          }
        } else if (attName === "预设23") {
          attrKey = {
            "1": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '小攻'],
            "2": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '充能'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '大攻', '小攻'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴击', '大攻', '小攻'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '大攻', '小攻', '充能']
          }
        } else if (attName === "预设31") {
          attrKey = {
            "1": ['大生', '大生', '大生', '大生', '大生', '大生', '充能', '暴伤', '暴击'],
            "2": ['大生', '大生', '大生', '大生', '大生', '大生', '小生', '暴伤', '暴击'],
            "3": ['小生', '小生', '小生', '小生', '小生', '小生', '充能', '暴伤', '暴击'],
            "4": ['小生', '小生', '小生', '小生', '小生', '小生', '充能', '暴伤', '暴击'],
            "5": ['大生', '大生', '大生', '大生', '大生', '大生', '小生', '暴伤', '暴击']
          }
        } else if (attName === "预设32") {
          attrKey = {
            "1": ['大防', '大防', '大防', '大防', '大防', '大防', '小防', '暴伤', '暴击'],
            "2": ['大防', '大防', '大防', '大防', '大防', '大防', '小防', '暴伤', '暴击'],
            "3": ['小防', '小防', '小防', '小防', '小防', '小防', '充能', '暴伤', '暴击'],
            "4": ['小防', '小防', '小防', '小防', '小防', '小防', '充能', '暴伤', '暴击'],
            "5": ['大防', '大防', '大防', '大防', '大防', '大防', '小防', '暴伤', '暴击']
          }
        } else if (attName === "预设33") {
          attrKey = {
            "1": ['精通', '精通', '精通', '精通', '精通', '精通', '充能', '暴伤', '暴击'],
            "2": ['精通', '精通', '精通', '精通', '精通', '精通', '充能', '暴伤', '暴击'],
            "3": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '充能'],
            "4": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '充能'],
            "5": ['精通', '精通', '精通', '精通', '精通', '精通', '暴伤', '暴击', '大攻']
          }
        } else if (attName === "预设34") {
          attrKey = {
            "1": ['充能', '充能', '充能', '充能', '充能', '充能', '精通', '暴伤', '暴击'],
            "2": ['充能', '充能', '充能', '充能', '充能', '充能', '精通', '暴伤', '暴击'],
            "3": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '小攻'],
            "4": ['充能', '充能', '充能', '充能', '充能', '充能', '精通', '暴伤', '暴击'],
            "5": ['充能', '充能', '充能', '充能', '充能', '充能', '精通', '暴伤', '暴击']
          }
        } else if (attName === "预设41") {
          attrKey = {
            "1": ['大生', '大生', '大生', '大生', '大生', '大生', '充能', '暴伤', '暴击'],
            "2": ['大生', '大生', '大生', '大生', '大生', '大生', '小生', '暴伤', '暴击'],
            "3": ['小生', '小生', '小生', '小生', '小生', '小生', '充能', '暴伤', '暴击'],
            "4": ['小生', '小生', '小生', '小生', '小生', '小生', '充能', '暴伤', '暴击'],
            "5": ['小生', '小生', '小生', '小生', '小生', '小生', '充能', '暴伤', '暴击']
          }
        } else if (attName === "预设42") {
          attrKey = {
            "1": ['大防', '大防', '大防', '大防', '大防', '大防', '小防', '暴伤', '暴击'],
            "2": ['大防', '大防', '大防', '大防', '大防', '大防', '小防', '暴伤', '暴击'],
            "3": ['小防', '小防', '小防', '小防', '小防', '小防', '充能', '暴伤', '暴击'],
            "4": ['小防', '小防', '小防', '小防', '小防', '小防', '充能', '暴伤', '暴击'],
            "5": ['小防', '小防', '小防', '小防', '小防', '小防', '充能', '暴伤', '暴击']
          }
        } else if (attName === "预设43") {
          attrKey = {
            "1": ['精通', '精通', '精通', '精通', '精通', '精通', '充能', '暴伤', '暴击'],
            "2": ['精通', '精通', '精通', '精通', '精通', '精通', '充能', '暴伤', '暴击'],
            "3": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '充能'],
            "4": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '充能'],
            "5": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '充能']
          }
        } else if (attName === "预设44") {
          attrKey = {
            "1": ['充能', '充能', '充能', '充能', '充能', '充能', '精通', '暴伤', '暴击'],
            "2": ['充能', '充能', '充能', '充能', '充能', '充能', '精通', '暴伤', '暴击'],
            "3": ['暴击', '暴击', '暴击', '暴击', '暴击', '暴击', '暴伤', '大攻', '小攻'],
            "4": ['充能', '充能', '充能', '充能', '充能', '充能', '精通', '暴伤', '暴击'],
            "5": ['充能', '充能', '充能', '充能', '充能', '充能', '精通', '暴伤', '暴击']
          }
        } else if (attName === "预设45") {
          attrKey = {
            "1": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大攻', '小攻'],
            "2": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大攻', '充能'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '小攻', '充能'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大攻', '小攻'],
            "5": ['大攻', '大攻', '大攻', '大攻', '大攻', '大攻', '小攻', '精通', '充能']
          }
        } else if (attName === "预设46") {
          attrKey = {
            "1": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大生', '充能'],
            "2": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大生', '小生'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '小生', '充能'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大生', '小生'],
            "5": ['大生', '大生', '大生', '大生', '大生', '大生', '小生', '精通', '充能']
          }
        } else if (attName === "预设47") {
          attrKey = {
            "1": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大防', '小防'],
            "2": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大防', '大攻'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '小防', '大攻'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大防', '小防'],
            "5": ['大防', '大防', '大防', '大防', '大防', '大防', '小防', '大攻', '小攻']
          }
        } else if (attName === "预设47") {
          attrKey = {
            "1": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大攻', '小攻'],
            "2": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大攻', '充能'],
            "3": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '充能', '小攻', '大攻'],
            "4": ['暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '暴伤', '精通', '大攻', '小攻'],
            "5": ['精通', '精通', '精通', '精通', '精通', '精通', '大攻', '小攻', '充能']
          }
        } else { e.reply(`未知的圣遗物副词条配置:${attName}`) }
        if (cpct >= 3.9) { cpct = Math.floor(cpct / 3.9) } else { cpct = 0 }
      } else {
        if (/\d/.test(attName)) {
          let text = attName.replace(/小生命|小生/g, '小生').replace(/大生命|大生|生命/g, '大生').replace(/小攻击|小攻/g, '小攻').replace(/大攻击|大攻|攻击/g, '大攻').replace(/小防御|小防/g, '小防').replace(/大防御|大防|防御/g, '大防').replace(/充能效率|元素充能|元素充能效率|充能/g, '充能').replace(/元素精通|精通/g, '精通').replace(/暴击伤害|爆击伤害|暴伤|爆伤/g, '暴伤').replace(/暴击率|爆击率|暴击|爆击/g, '暴击').match(/(\d+[^\d]*)/g), oop = {}, tx = {}
          text.forEach(item => { let [zzc, attr] = item.split(/([0-9]+)/).filter(Boolean), count = parseInt(zzc); oop[attr] = (oop[attr] || 0) + count })
          let yyc = Array.from({ length: 5 }, () => ({ items: [], types: new Set(), banned: [], remaining: 9 }));
          yyc[0].banned = ['小生']; yyc[1].banned = ['小攻']; yyc[2].banned = [mainKey[0]]; yyc[3].banned = [mainKey[1]]; yyc[4].banned = [mainKey[2]]
          let distribute = (attr, count) => { for (let i = 0; i < yyc.length && count > 0; i++) { let yyb = yyc[i]; if (yyb.banned.includes(attr) || yyb.types.size >= 4) continue; let yya = Math.min( count, yyb.remaining, 4 - yyb.types.size ); if (yya > 0) { for (let j = 0; j < yya; j++) { yyb.items.push(attr) } yyb.types.add(attr); yyb.remaining -= yya; count -= yya }}}
          Object.entries(oop).forEach(([attr, count]) => { distribute(attr, count) });
          yyc.forEach((yyb, index) => { tx[index + 1] = yyb.items }); attrKey = tx
        } else { let text = attName.replace(/小生命|小生/g, '小生').replace(/大生命|大生|生命/g, '大生').replace(/小攻击|小攻/g, '小攻').replace(/大攻击|大攻|攻击/g, '大攻').replace(/小防御|小防/g, '小防').replace(/大防御|大防|防御/g, '大防').replace(/充能效率|元素充能|元素充能效率|充能/g, '充能').replace(/暴击伤害|爆击伤害|暴伤|爆伤/g, '暴伤').replace(/暴击率|爆击率|暴击|爆击/g, '暴击').substring(0, 90), ccb = {}; for (let i = 0; i < 5; i++) { let bbc = text.substring(i * 18, (i * 18) + 18), cbc = []; for (let j = 0; j < bbc.length; j += 2) { cbc.push(bbc.substring(j, j + 2)) } ccb[(i + 1).toString()] = cbc } attrKey = ccb }
      }
      let ccd = new Set(Object.keys(dmgMap))
      for (let i = 0; i < mainKey.length; i++) { if (ccd.has(mainKey[i])) { mainKey[i] = dmgMap[mainKey[i]] } }
      for (let key in attrKey) { for (let i = 0; i < attrKey[key].length; i++) { let item = attrKey[key][i]; attrKey[key][i] = arrtMap.hasOwnProperty(item) ? arrtMap[item] : item }}
      if (cpct > 0) { for (let key in attrKey) { if (attrKey.hasOwnProperty(key)) { let bc = attrKey[key], bbc = Math.min(cpct, Math.max(0, bc.filter(item => item === 501204).length - 1)), cb = 0; for (let i = 0; i < bc.length && cb < bbc; i++) { if (bc[i] === 501204) { bc[i] = 501224; cb++ } } cpct -= bbc; if (cpct <= 0) break }} }
      jsonData = { "name": CharacterName, "id": CharacterId, "elem": CharacterData[CharacterId]?.elem, "level": 100, "promote": 6, "fetter": 10, "costume": 0, "cons": 6, "talent": { "a": 10, "e": 10, "q": 10 }, "weapon": { "name": WeaponName, "level": 90, "promote": 6, "affix": 5 }, "artis": { "1": { "level": 20, "star": 5, "name": ArtifactName[0], "mainId": 14001, "attrIds": attrKey["1"] }, "2": { "level": 20, "star": 5, "name": ArtifactName[1], "mainId": 10003, "attrIds": attrKey["2"] }, "3": { "level": 20, "star": 5, "name": ArtifactName[2], "mainId": mainKey[0], "attrIds": attrKey["3"] }, "4": { "level": 20, "star": 5, "name": ArtifactName[3], "mainId": mainKey[1], "attrIds": attrKey["4"] }, "5": { "level": 20, "star": 5, "name": ArtifactName[4], "mainId": mainKey[2], "attrIds": attrKey["5"] } }, "_source": "customize", "_time": 1601258400, "_update": 1601258400, "_talent": 1601258400 }
    } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) {
      let CharacterData, ArtifactData, elem, artName, Text = TextData[3].split(','), CharacterId = Number(Text[0]), CharacterName, WeaponId = Number(Text[1]), WeaponName, ArtifactId = Number(Text[2]), ArtifactName = [], mainKey = [], attrKey
      let CharacterNameKey = (a) => { if (SRaliasC.hasOwnProperty(a)) { return a } else { for (let key in SRaliasC) { if (SRaliasC.hasOwnProperty(key)) { let ccb = SRaliasC[key].split(','); if (ccb.includes(a)) { return key } } } } }
      try { CharacterData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-sr/character/data.json', 'utf8')) } catch (err) { console.error('[liangshi-calc]角色索引data.json读取失败:', err); return false }
      if (!isNaN(CharacterId)) { CharacterName = CharacterData[CharacterId]?.name; elem = CharacterData[CharacterId].elem; if (CharacterName === "" || !CharacterData) { e.reply(`[liangshi-calc]未能找到角色ID${CharacterId}，请使用角色名字再试吧(*/ω＼*)`); return false }
      } else { CharacterName = CharacterNameKey(Text[0]) || ""; if (CharacterName === "" || !CharacterData) { e.reply(`[liangshi-calc]未能找到角色${Text[0]}，请使用角色全名或ID再试吧(*/ω＼*)`); return false } CharacterId = Object.keys(CharacterData).find(key => CharacterData[key].name === CharacterName); elem = Object.values(CharacterData).find(item => item.name === CharacterName).elem}
      if (!isNaN(WeaponId)) { WeaponName = WeaponId } else {
        if ((Text[1] === "专武") || (Text[1] === "专光")) { WeaponName = SRexclusive[CharacterName] || "";  if (WeaponName === "" || !WeaponName) { e.reply(`[liangshi-calc]未能找到角色${CharacterName}的专属武器，请使用武器名称再试吧(*/ω＼*)`); return false }
        } else if (/专武|专光/.test(Text[1])) { let WeaponCharacter = CharacterNameKey(Text[1].replace(/专武|专光/,'')) || ""; WeaponName = SRexclusive[WeaponCharacter] || ""; if (WeaponName === "" || !WeaponName) e.reply(`[liangshi-calc]未能找到角色${CharacterNameKey(Text[1].replace(/专武|专光/,''))}的专属武器，请使用武器名称再试吧(*/ω＼*)`) } else { if (SRaliasW.hasOwnProperty(Text[1])) { WeaponName = Text[1] } else { for (let key in SRaliasW) { if (SRaliasW.hasOwnProperty(key)) { let ccb = SRaliasW[key].split(','); if (ccb.includes(Text[1])) { WeaponName = key; break } } } } if (WeaponName === "" || !WeaponName) { e.reply(`[liangshi-calc]未能找到武器${Text[1]}，请使用武器全名或ID再试吧(*/ω＼*)`); return false } }
        try { let WeaponData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-sr/weapon/data.json', 'utf8')); for (let key in WeaponData) { if (WeaponData[key].name === WeaponName) { WeaponId = key; break } }} catch (err) { console.error(err) }
      }
      try { ArtifactData = JSON.parse(fs.readFileSync('./plugins/miao-plugin/resources/meta-sr/artifact/data.json', 'utf8'))
      } catch (err) { console.error('[liangshi-calc]遗器索引data.json读取失败:', err); return false }
      let ArtifactNameKey = (a) => { if (SRaliasA.hasOwnProperty(a)) { return a } else { for (let key in SRaliasA) { if (SRaliasA.hasOwnProperty(key)) { let ccb = SRaliasA[key].split(','); if (ccb.includes(a)) { return key } } } } }
      if (!isNaN(ArtifactId)) {
        if (Text[2].length === 8) { let ArtKey = [Text[2].slice(0, 3), Text[2].slice(3, 4), Text[2].slice(4, 7), Text[2].slice(7, 8)]; if (ArtKey[1] === 4) {ArtifactName = [ 6 + ArtKey[0] + 1, 6 + ArtKey[0] + 2, 6 + ArtKey[0] + 3, 6 + ArtKey[0] + 4, 6 + ArtKey[2] + 5, 6 + ArtKey[2] + 6 ] } else if (ArtKey[1] === 2) { if (ArtKey[2] < 300) { ArtifactName = [ 6 + ArtKey[0] + 1, 6 + ArtKey[0] + 2, 6 + ArtKey[2] + 3, 6 + ArtKey[2] + 4, 63015, 63026 ] } else { ArtifactName = [ 6 + ArtKey[0] + 1, 6 + ArtKey[0] + 2, 61013, 61024, 6 + ArtKey[2] + 5, 6 + ArtKey[2] + 6 ] }} else { e.reply(`[liangshi-calc]遗器套装ID${Text[2]}格式错误，请使用套装全名或检查ID再试吧(*/ω＼*)`); return false }
        } else if (Text[2].length === 4) { let ArtKey = [ Text[2].slice(0, 3), Text[2].slice(3, 4) ]; if (ArtKey[1] === 4) { ArtifactName = [ 6 + ArtKey[0] + 1, 6 + ArtKey[0] + 2, 6 + ArtKey[0] + 3, 6 + ArtKey[0] + 4, 63015, 63026 ] } else if (ArtKey[2] === 2) { if (ArtKey[0] < 300) { ArtifactName = [ 6 + ArtKey[0] + 1, 6 + ArtKey[0] + 2, 61013, 61024, 63015, 63026 ] } else { ArtifactName = [ 61011, 61022, 61033, 61044, 6 + ArtKey[0] + 5, 6 + ArtKey[0] + 6 ]}}
        } else if (Text[2].length === 12) { let ArtKey = [ Text[2].slice(0, 3), Text[2].slice(3, 4), Text[2].slice(4, 7), Text[2].slice(7, 8), Text[2].slice(8, 11), Text[2].slice(11, 12) ]; ArtifactName = [ 6 + ArtKey[0] + 1, 6 + ArtKey[0] + 2, 6 + ArtKey[2] + 3, 6 + ArtKey[2] + 4, 6 + ArtKey[4] + 5, 6 + ArtKey[4] + 6 ]}
      } else {
        if (/^[^24]+2[^24]+2[^24]+2$/.exec(Text[2])) { let name = Text[2].match(/^([^24]+)2([^24]+)2([^24]+)2$/); artName = [ ArtifactNameKey(name[1]), ArtifactNameKey(name[2]), ArtifactNameKey(name[3]) ]; ArtifactName = [ 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[0]) + 1, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[0]) + 2, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[1]) + 3, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[1]) + 4, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[2]) + 5, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[2]) + 6 ]
        } else if (/^[^24]+4[^24]+2$/.exec(Text[2])) { let name = Text[2].match(/^([^24]+)4([^24]+)2$/); artName = [ ArtifactNameKey(name[1]), ArtifactNameKey(name[1]), ArtifactNameKey(name[2]) ]; ArtifactName = [ 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[0]) + 1, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[0]) + 2, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[1]) + 3, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[1]) + 4, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[2]) + 5, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === artName[2]) + 6 ]
        } else if (/^(.*?)4$/.exec(Text[2])) { let name = Text[2].match(/^(.*?)4$/); ArtifactName = [ 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 1, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 2, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 3, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 4, 63015, 63026 ]
        } else if (/^[^24]+2[^24]+2$/.exec(Text[2])) { let name = Text[2].match(/^([^24]+)2([^24]+)2$/); if (Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[2])) < 300) { ArtifactName = [ 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 1, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 2, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[2])) + 3, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[2])) + 4, 63015, 63026 ] } else { ArtifactName = [ 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 1, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 2, 61013, 61024, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[2])) + 5, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[2])) + 6 ] }
        } else if (/^(.*?)2$/.exec(Text[2])) { let name = Text[2].match(/^(.*?)2$/); if (Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) < 300) { ArtifactName = [ 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 1, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 2, 61013, 61024, 63015, 63026] } else { ArtifactName = [ 61011, 61022, 61033, 61044, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 5, 6 + Object.keys(ArtifactData).find(key => ArtifactData[key].name === ArtifactNameKey(name[1])) + 6] }
        } else { e.reply(`[liangshi-calc]未能找到遗器套装${Text[2]}，请使用套装全名或ID再试吧(*/ω＼*)`); return false }
      }
      let cpct = 0, attName = Text[4], dmgMap1 = { '大生': 1, '大攻': 2, '大防': 3, '暴击': 4, '暴伤': 5, '治疗': 6, '命中': 7, '抵抗': 8
      }, dmgMap2 = { '大生': 1, '大攻': 2, '大防': 3, '速度': 4
      }, dmgMap3 = { '大生': 1, '大攻': 2, '大防': 3, '物伤': 4, '火伤': 5, '冰伤': 6, '雷伤': 7, '风伤': 8, '量伤': 9, '虚伤': 10
      }, dmgMap4 = { '击破': 1, '充能': 2, '大生': 3, '大攻': 4, '大防': 5
      }, dmgkey = { '火': "火伤", '雷': "雷伤", '冰': "冰伤", '风': "风伤", '虚数': "虚伤", '量子': "量伤", '物理': "物伤"
      }, attrMap = { '小生': 1, '小攻': 2, '小防': 3, '大生': 4, '大攻': 5, '大防': 6, '速度': 7, '暴击': 8, '暴伤': 9, '命中': 10, '抵抗': 11, '击破': 12, '充能': 13 }, ccb = {}
      if (/偏移/.test(Text[4])) { attName = Text[4].match(/^(.*?)偏移(.*?)$/)[1]; cpct = Text[4].match(/^(.*?)偏移(.*?)$/)[2] }
      if (/预设/.test(Text[3])) {
        if (Text[3] === "预设1" || Text[3] === "预设10") { mainKey = ["暴伤", "大攻", dmgkey[CharacterData[CharacterId]?.elem], "大攻"]
        } else if (Text[3] === "预设11") { mainKey = ["暴伤", "大生", dmgkey[CharacterData[CharacterId]?.elem], "大生"]
        } else if (Text[3] === "预设12") { mainKey = ["暴伤", "大防", dmgkey[CharacterData[CharacterId]?.elem], "大防"]
        } else if (Text[3] === "预设15") { mainKey = ["暴伤", "速度", dmgkey[CharacterData[CharacterId]?.elem], "大攻"]
        } else if (Text[3] === "预设16") { mainKey = ["暴伤", "速度", dmgkey[CharacterData[CharacterId]?.elem], "大生"]
        } else if (Text[3] === "预设17") { mainKey = ["暴伤", "速度", dmgkey[CharacterData[CharacterId]?.elem], "大防"]
        } else if (Text[3] === "预设2" || Text[3] === "预设20") { mainKey = ["治疗", "大攻", "大攻", "大攻"]
        } else if (Text[3] === "预设21") { mainKey = ["治疗", "大生", "大生", "大生"]
        } else if (Text[3] === "预设22") { mainKey = ["治疗", "大防", "大防", "大防"]
        } else if (Text[3] === "预设25") { mainKey = ["治疗", "速度", "大攻", "大攻"]
        } else if (Text[3] === "预设26") { mainKey = ["治疗", "速度", "大生", "大生"]
        } else if (Text[3] === "预设27") { mainKey = ["治疗", "速度", "大防", "大防"]
        } else if (Text[3] === "预设3" || Text[3] === "预设30") { mainKey = ["命中", "大攻", "大攻", "大攻"]
        } else if (Text[3] === "预设31") { mainKey = ["命中", "大生", "大生", "大生"]
        } else if (Text[3] === "预设32") { mainKey = ["命中", "大防", "大防", "大防"]
        } else if (Text[3] === "预设35") { mainKey = ["命中", "速度", "大攻", "大攻"]
        } else if (Text[3] === "预设36") { mainKey = ["命中", "速度", "大生", "大生"]
        } else if (Text[3] === "预设37") { mainKey = ["命中", "速度", "大防", "大防"]
        } else if (Text[3] === "预设4" || Text[3] === "预设40") { mainKey = ["击破", "大攻", "大攻", "大攻"]
        } else if (Text[3] === "预设41") { mainKey = ["击破", "大生", "大生", "大生"]
        } else if (Text[3] === "预设42") { mainKey = ["击破", "大防", "大防", "大防"]
        } else if (Text[3] === "预设45") { mainKey = ["击破", "速度", "大攻", "大攻"]
        } else if (Text[3] === "预设46") { mainKey = ["击破", "速度", "大生", "大生"]
        } else if (Text[3] === "预设47") { mainKey = ["击破", "速度", "大防", "大防"]
        } else if (Text[3] === "预设5" || Text[3] === "预设50") { mainKey = ["大攻", "大攻", "大攻", "大攻"]
        } else if (Text[3] === "预设51") { mainKey = ["大生", "大生", "大生", "大生"]
        } else if (Text[3] === "预设52") { mainKey = ["大防", "大防", "大防", "大防"]
        } else if (Text[3] === "预设53") { mainKey = ["暴伤", "速度", dmgkey[CharacterData[CharacterId]?.elem], "大攻"]
        } else if (Text[3] === "预设54") { mainKey = ["命中", "大攻", dmgkey[CharacterData[CharacterId]?.elem], "大攻"]
        } else if (Text[3] === "预设55") { mainKey = ["抵抗", "大攻", dmgkey[CharacterData[CharacterId]?.elem], "大攻"]
        } else { mainKey = ["暴伤", "大攻", dmgkey[CharacterData[CharacterId]?.elem], "大攻"] }
        mainKey = [dmgMap1[mainKey[0]], dmgMap2[mainKey[1]], dmgMap3[mainKey[2]], dmgMap4[mainKey[3]]]
      } else { let mainText = Text[3].replace(/大生命|大生|生命/g, '大生,').replace(/大攻击|大攻|攻击/g, '大攻,').replace(/大防御|大防|防御/g, '大防,').replace(/充能效率|元素充能|元素充能效率|充能/g, '充能,').replace(/速度|速/g, '速度,').replace(/击破特攻|击破|特攻/g, '击破,').replace(/效果命中|命中/g, '命中,').replace(/效果抵抗|抵抗/g, '抵抗,').replace(/治疗加成|治疗/g, '治疗,').replace(/暴击伤害|爆击伤害|暴伤|爆伤/g, '暴伤,').replace(/暴击率|爆击率|暴击|爆击/g, '暴击,').replace(/火伤|火伤加成|火元素伤害|火元素伤害加成/g, '火伤,').replace(/雷伤|雷伤加成|雷元素伤害|雷元素伤害加成/g, '雷伤,').replace(/冰伤|冰伤加成|冰元素伤害|冰元素伤害加成/g, '冰伤,').replace(/风伤|风伤加成|风元素伤害|风元素伤害加成/g, '风伤,').replace(/虚数|虚伤|虚伤加成|虚数加成|虚数伤害|虚数元素伤害|虚数伤害加成|虚数元素伤害加成/g, '虚伤,').replace(/量子|量伤|量伤加成|量子加成|量子伤害|量子元素伤害|量子伤害加成|量子元素伤害加成/g, '量伤,').replace(/物理|物伤|物伤加成|物理伤害|物理伤害加成/g, '物伤,').split(',').filter(item => item !== ''); mainKey = [dmgMap1[mainText[0] || "暴伤"], dmgMap2[mainText[1] || "大攻"], dmgMap3[mainText[2] || dmgkey[CharacterData[CharacterId]?.elem]], dmgMap4[mainText[3] || "大攻"]] }
      if (mainKey.includes(undefined)) { e.reply(`[liangshi-calc]遗器主词条${Text[3]}输入有误，请使用属性全名或ID再试吧(*/ω＼*)`); return false }
      if (/预设/.test(attName)) {
        if (attName === "预设1" || attName === "预设10") {
          ccb = {
            '1': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大攻", "小攻"],
            '2': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小攻", "速度"],
            '3': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "大攻", "小攻", "速度"],
            '4': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "速度", "小攻"],
            '5': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "暴击", "大攻", "小攻"],
            '6': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小攻", "速度"]
          }
        } else if (attName === "预设11") {
          ccb = {
            '1': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大生", "小生"],
            '2': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小生", "速度"],
            '3': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "大生", "小生", "速度"],
            '4': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "速度", "小生"],
            '5': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "暴击", "大生", "小生"],
            '6': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小生", "速度"]
          }
        } else if (attName === "预设12") {
          ccb = {
            '1': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大防", "小防"],
            '2': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小防", "速度"],
            '3': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "大防", "小防", "速度"],
            '4': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "速度", "小防"],
            '5': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "暴击", "大防", "小防"],
            '6': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小防", "速度"]
          }
        } else if (attName === "预设15") {
          ccb = {
            '1': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大攻", "小攻"],
            '2': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小攻", "速度"],
            '3': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "大攻", "小攻", "速度"],
            '4': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "大攻", "小攻"],
            '5': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "暴击", "大攻", "小攻"],
            '6': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小攻", "速度"]
          }
        } else if (attName === "预设16") {
          ccb = {
            '1': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大生", "小生"],
            '2': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小生", "速度"],
            '3': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "大生", "小生", "速度"],
            '4': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "大攻", "小生"],
            '5': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "暴击", "大生", "小生"],
            '6': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小生", "速度"]
          }
        } else if (attName === "预设17") {
          ccb = {
            '1': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大防", "小防"],
            '2': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小防", "速度"],
            '3': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "大防", "小防", "速度"],
            '4': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "大攻", "小防"],
            '5': ["暴伤", "暴伤", "暴伤", "暴伤", "暴伤", "暴击", "暴击", "大防", "小防"],
            '6': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "小防", "速度"]
          }
        } else if (attName === "预设2" || attName === "预设20") {
          ccb = {
            '1': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '2': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "暴击", "暴伤", "速度"],
            '3': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '4': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"],
            '5': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"],
            '6': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设21") {
          ccb = {
            '1': ["大生", "大生", "大生", "大生", "大生", "大生", "暴击", "暴伤", "速度"],
            '2': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '3': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '4': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"],
            '5': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"],
            '6': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设22") {
          ccb = {
            '1': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '2': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '3': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '4': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"],
            '5': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"],
            '6': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设25") {
          ccb = {
            '1': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '2': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "暴击", "暴伤", "速度"],
            '3': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '4': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "暴伤"],
            '5': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"],
            '6': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设26") {
          ccb = {
            '1': ["大生", "大生", "大生", "大生", "大生", "大生", "暴击", "暴伤", "速度"],
            '2': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '3': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '4': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "暴伤"],
            '5': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"],
            '6': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设27") {
          ccb = {
            '1': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '2': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '3': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '4': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "暴伤"],
            '5': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"],
            '6': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设3" || attName === "预设30") {
          ccb = {
            '1': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "命中", "速度"],
            '2': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "暴击", "命中", "速度"],
            '3': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '4': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "命中", "速度"],
            '5': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "命中", "速度"],
            '6': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "命中", "速度"]
          }
        } else if (attName === "预设31") {
          ccb = {
            '1': ["大生", "大生", "大生", "大生", "大生", "大生", "暴击", "命中", "速度"],
            '2': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "命中", "速度"],
            '3': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '4': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "命中", "速度"],
            '5': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "命中", "速度"],
            '6': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "命中", "速度"]
          }
        } else if (attName === "预设32") {
          ccb = {
            '1': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "命中", "速度"],
            '2': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "命中", "速度"],
            '3': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '4': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "命中", "速度"],
            '5': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "命中", "速度"],
            '6': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "命中", "速度"]
          }
        } else if (attName === "预设35") {
          ccb = {
            '1': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "命中", "速度"],
            '2': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "暴击", "命中", "速度"],
            '3': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '4': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "命中", "暴击"],
            '5': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "命中", "速度"],
            '6': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "命中", "速度"]
          }
        } else if (attName === "预设36") {
          ccb = {
            '1': ["大生", "大生", "大生", "大生", "大生", "大生", "暴击", "命中", "速度"],
            '2': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "命中", "速度"],
            '3': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '4': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "命中", "暴击"],
            '5': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "命中", "速度"],
            '6': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "命中", "速度"]
          }
        } else if (attName === "预设37") {
          ccb = {
            '1': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "命中", "速度"],
            '2': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "命中", "速度"],
            '3': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '4': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "命中", "暴击"],
            '5': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "命中", "速度"],
            '6': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "命中", "速度"]
          }
        } else if (attName === "预设4" || attName === "预设40") {
          ccb = {
            '1': ["击破", "击破", "击破", "击破", "击破", "击破", "大攻", "小攻", "速度"],
            '2': ["击破", "击破", "击破", "击破", "击破", "击破", "大攻", "暴击", "速度"],
            '3': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '4': ["击破", "击破", "击破", "击破", "击破", "击破", "小攻", "暴击", "速度"],
            '5': ["击破", "击破", "击破", "击破", "击破", "击破", "小攻", "暴击", "速度"],
            '6': ["击破", "击破", "击破", "击破", "击破", "击破", "小攻", "暴击", "速度"]
          }
        } else if (attName === "预设41") {
          ccb = {
            '1': ["击破", "击破", "击破", "击破", "击破", "击破", "大生", "暴击", "速度"],
            '2': ["击破", "击破", "击破", "击破", "击破", "击破", "大生", "小生", "速度"],
            '3': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '4': ["击破", "击破", "击破", "击破", "击破", "击破", "小生", "暴击", "速度"],
            '5': ["击破", "击破", "击破", "击破", "击破", "击破", "小生", "暴击", "速度"],
            '6': ["击破", "击破", "击破", "击破", "击破", "击破", "小生", "暴击", "速度"]
          }
        } else if (attName === "预设42") {
          ccb = {
            '1': ["击破", "击破", "击破", "击破", "击破", "击破", "大防", "小防", "速度"],
            '2': ["击破", "击破", "击破", "击破", "击破", "击破", "大防", "小防", "速度"],
            '3': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '4': ["击破", "击破", "击破", "击破", "击破", "击破", "小防", "暴击", "速度"],
            '5': ["击破", "击破", "击破", "击破", "击破", "击破", "小防", "暴击", "速度"],
            '6': ["击破", "击破", "击破", "击破", "击破", "击破", "小防", "暴击", "速度"]
          }
        } else if (attName === "预设45") {
          ccb = {
            '1': ["击破", "击破", "击破", "击破", "击破", "击破", "大攻", "小攻", "速度"],
            '2': ["击破", "击破", "击破", "击破", "击破", "击破", "大攻", "暴击", "速度"],
            '3': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '4': ["击破", "击破", "击破", "击破", "击破", "击破", "小攻", "暴击", "大攻"],
            '5': ["击破", "击破", "击破", "击破", "击破", "击破", "小攻", "暴击", "大攻"],
            '6': ["击破", "击破", "击破", "击破", "击破", "击破", "小攻", "暴击", "大攻"]
          }
        } else if (attName === "预设46") {
          ccb = {
            '1': ["击破", "击破", "击破", "击破", "击破", "击破", "大生", "暴击", "速度"],
            '2': ["击破", "击破", "击破", "击破", "击破", "击破", "大生", "小生", "速度"],
            '3': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '4': ["击破", "击破", "击破", "击破", "击破", "击破", "小生", "暴击", "大生"],
            '5': ["击破", "击破", "击破", "击破", "击破", "击破", "小生", "暴击", "大生"],
            '6': ["击破", "击破", "击破", "击破", "击破", "击破", "小生", "暴击", "大生"]
          }
        } else if (attName === "预设47") {
          ccb = {
            '1': ["击破", "击破", "击破", "击破", "击破", "击破", "大防", "小防", "速度"],
            '2': ["击破", "击破", "击破", "击破", "击破", "击破", "大防", "小防", "速度"],
            '3': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '4': ["击破", "击破", "击破", "击破", "击破", "击破", "小防", "暴击", "大防"],
            '5': ["击破", "击破", "击破", "击破", "击破", "击破", "小防", "暴击", "大防"],
            '6': ["击破", "击破", "击破", "击破", "击破", "击破", "小防", "暴击", "大防"]
          }
        } else if (attName === "预设5" || attName === "预设50") {
          ccb = {
            '1': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "小攻", "暴击", "速度"],
            '2': ["大攻", "大攻", "大攻", "大攻", "大攻", "大攻", "暴击", "暴伤", "速度"],
            '3': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"],
            '4': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"],
            '5': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"],
            '6': ["小攻", "小攻", "小攻", "小攻", "小攻", "小攻", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设51") {
          ccb = {
            '1': ["大生", "大生", "大生", "大生", "大生", "大生", "暴击", "暴伤", "速度"],
            '2': ["大生", "大生", "大生", "大生", "大生", "大生", "小生", "暴击", "速度"],
            '3': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"],
            '4': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"],
            '5': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"],
            '6': ["小生", "小生", "小生", "小生", "小生", "小生", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设52") {
          ccb = {
            '1': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '2': ["大防", "大防", "大防", "大防", "大防", "大防", "小防", "暴击", "速度"],
            '3': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"],
            '4': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"],
            '5': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"],
            '6': ["小防", "小防", "小防", "小防", "小防", "小防", "暴击", "暴伤", "速度"]
          }
        } else if (attName === "预设53") {
          ccb = {
            '1': ["速度", "速度", "速度", "速度", "速度", "速度", "暴击", "暴伤", "大攻"],
            '2': ["速度", "速度", "速度", "速度", "速度", "速度", "暴击", "暴伤", "大攻"],
            '3': ["速度", "速度", "速度", "速度", "速度", "速度", "暴击", "暴伤", "大攻"],
            '4': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大攻", "小攻"],
            '5': ["速度", "速度", "速度", "速度", "速度", "速度", "暴击", "暴伤", "大攻"],
            '6': ["速度", "速度", "速度", "速度", "速度", "速度", "暴击", "暴伤", "大攻"]
          }
        } else if (attName === "预设54") {
          ccb = {
            '1': ["命中", "命中", "命中", "命中", "命中", "命中", "暴击", "暴伤", "大攻"],
            '2': ["命中", "命中", "命中", "命中", "命中", "命中", "暴击", "暴伤", "大攻"],
            '3': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大攻", "小攻"],
            '4': ["命中", "命中", "命中", "命中", "命中", "命中", "暴击", "暴伤", "大攻"],
            '5': ["命中", "命中", "命中", "命中", "命中", "命中", "暴击", "暴伤", "大攻"],
            '6': ["命中", "命中", "命中", "命中", "命中", "命中", "暴击", "暴伤", "大攻"]
          }
        } else if (attName === "预设55") {
          ccb = {
            '1': ["抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "暴击", "暴伤", "大攻"],
            '2': ["抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "暴击", "暴伤", "大攻"],
            '3': ["暴击", "暴击", "暴击", "暴击", "暴击", "暴击", "暴伤", "大攻", "小攻"],
            '4': ["抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "暴击", "暴伤", "大攻"],
            '5': ["抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "暴击", "暴伤", "大攻"],
            '6': ["抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "抵抗", "暴击", "暴伤", "大攻"]
          }
        }
        if (cpct >= 3.2) { cpct = Math.floor(cpct / 3.2) } else { cpct = 0 }
        if (cpct > 0) { for (let key in ccb) { if (ccb.hasOwnProperty(key)) { let bc = ccb[key], bbc = Math.min(cpct, Math.max(0, bc.filter(item => item === "暴击").length - 1)), cb = 0; for (let i = 0; i < bc.length && cb < bbc; i++) { if (bc[i] === "暴击") { bc[i] = "暴伤"; cb++ } } cpct -= bbc; if (cpct <= 0) break } } }
      } else {
        let artext = attName.replace(/小生命|小生/g, '小生').replace(/大生命|大生|生命/g, '大生').replace(/小攻击|小攻/g, '小攻').replace(/大攻击|大攻|攻击/g, '大攻').replace(/小防御|小防/g, '小防').replace(/大防御|大防|防御/g, '大防').replace(/充能效率|元素充能|元素充能效率|充能/g, '充能').replace(/速度|速/g, '速度').replace(/击破特攻|击破|特攻/g, '击破').replace(/效果命中|命中/g, '命中').replace(/效果抵抗|抵抗/g, '抵抗').replace(/暴击伤害|爆击伤害|暴伤|爆伤/g, '暴伤').replace(/暴击率|爆击率|暴击|爆击/g, '暴击'); let txt = artext.substring(0, 108)
        for (let i = 0; i < 6; i++) { let bbc = txt.substring(i * 18, (i * 18) + 18), cbc = []; for (let j = 0; j < bbc.length; j += 2) { cbc.push(bbc.substring(j, j + 2)) } ccb[(i + 1).toString()] = cbc}
      }
      Object.keys(ccb).forEach(key => {ccb[key] = ccb[key].map(item => attrMap[item])})
      Object.keys(ccb).forEach(key => { let ddb = {}; ccb[key].forEach(num => { ddb[num] = (ddb[num] || 0) + 1 }); let op = new Set(), uniqueNums = ccb[key].filter(num => { return op.has(num) ? false : op.add(num) }); ccb[key] = uniqueNums.map(num => { return `${num},${Math.floor((ddb[num] * 10) / 8)},${(ddb[num] * 10) % 8}` });}); attrKey = ccb
      jsonData = { "name": CharacterName, "id": CharacterId, "elem": elem, "level": 80, "promote": 6, "cons": 6, "talent": { "a": 6, "e": 10, "q": 10, "t": 10 }, "trees": [ CharacterId + "101", CharacterId + "102", CharacterId + "103", CharacterId + "201", CharacterId + "202", CharacterId + "203", CharacterId + "204", CharacterId + "205", CharacterId + "206", CharacterId + "207", CharacterId + "208", CharacterId + "209", CharacterId + "210"], "weapon": { "id": WeaponId, "level": 80, "promote": 6, "affix": 5 }, "artis": { "1": { "level": 15, "id": ArtifactName[0], "mainId": 1, "attrIds": attrKey["1"] }, "2": { "level": 15, "id": ArtifactName[1], "mainId": 1, "attrIds": attrKey["2"] }, "3": { "level": 15, "id": ArtifactName[2], "mainId": mainKey[0], "attrIds": attrKey["3"] }, "4": { "level": 15, "id": ArtifactName[3], "mainId": mainKey[1], "attrIds": attrKey["4"] }, "5": { "level": 15, "id": ArtifactName[4], "mainId": mainKey[2], "attrIds": attrKey["5"] }, "6": { "level": 15, "id": ArtifactName[5], "mainId": mainKey[3], "attrIds": attrKey["6"] } }, "_source": "customize", "_time": 1686741329711, "_update": 1686741329711, "_talent": 1686741329711 }
    } else if (/鸣潮|明朝|潮|mc|MC/.test(e.msg)) {/*=-=*/}
    let r, data, Json, gameText
    if (e.isMaster) { if (/原神|原|ys|YS|gs|GS/.test(e.msg)) { r = `./data/PlayerData/gs/100000000.json` } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) { r = `./data/PlayerData/sr/100000000.json` } try { Json = fs.readFileSync(r, 'utf8'); data = JSON.parse(Json); data.avatars[jsonData.id] = jsonData; fs.writeFileSync(r, JSON.stringify(data, null, 2), 'utf8'); e.reply(`已自动写入至极限面板，重载面板后即可查看`)} catch (err) { e.reply(`写入本地数据的时候遇到了一些问题，等待一会试吧(*/ω＼*)`); console.error(`[liangshi-calc] 写入本地文件错误：${err}`); return true }
    } else { if (/原神|原|ys|YS|gs|GS/.test(e.msg)) { gameText = "原神" } else if (/星铁|崩坏星穹铁道|崩坏：星穹铁道|铁道|sr|SR/.test(e.msg)) { gameText = "崩坏:星穹铁道" } else if (/绝区零|绝|zzz|ZZZ/.test(e.msg)) { gameText = "绝区零" } else { gameText = "鸣潮" } await exportPanel(e, gameText, jsonData, "100000000") }
    return true
  }
}
