import plugin from '../../../lib/plugins/plugin.js'
import { Common } from '../components/index.js'
import { CharacterAlias as McCharacterAlias, WeaponAlias as McWeaponAlias, EchoAlias as McEchoAlias, MonsterAlias as McMonsterAlias, ItemAlias as McItemAlias } from '../damage/liangshi-mc/data/alias.js'
import { alias as GsCharacterAlias } from '../../miao-plugin/resources/meta-gs/character/alias.js'
import { alias as GsWeaponAlias } from '../../miao-plugin/resources/meta-gs/weapon/alias.js'
import { setAlias as GsEchoAlias } from '../../miao-plugin/resources/meta-gs/artifact/alias.js'
import { alias as SrCharacterAlias } from '../../miao-plugin/resources/meta-sr/character/alias.js'
import { aliasCfg as SrWeaponAlias } from '../../miao-plugin/resources/meta-sr/weapon/alias.js'
import { aliasCfg as SrEchoAlias } from '../../miao-plugin/resources/meta-sr/artifact/alias.js'
import { exclusive as Mcexclusive } from '../damage/liangshi-mc/data/weapon.js'
import { exclusive as Gsexclusive } from '../damage/liangshi-gs/data/weapon.js'
import { exclusive as Srexclusive } from '../damage/liangshi-sr/data/weapon.js'
import fs from 'node:fs'

let GsItemAlias = {}
let SrItemAlias = {}

export class Wiki extends plugin {
  constructor () {
    super(
        {
          name: 'Wiki',
          dsc: '图鉴查询',
          event: 'message',
          priority: 15000,
          rule: [
            {
              reg: '^#*(LS|ls)?图鉴(查询|查找|寻找)(.*?)(?:第(\\d{1,2})页)?$',
              fnc: 'Wiki'
            }
          ]
        }
    )
  }

  async Wiki (e) {
    let Text = [],record = [], complete = undefined, mz = new Set(), TextData = e.msg.match(/^#*(LS|ls)?图鉴(查询|查找|寻找)(.*?)(?:第(\d{1,2})页)?$/)
    for (let ccb = 0; ccb < TextData[3].length; ccb++) {
      for (let bbc = ccb + 1; bbc <= TextData[3].length; bbc++) {
        Text.push(TextData[3].substring(ccb, bbc))
      }
    }
    Text = Text.sort((a, b) => b.length - a.length)
    for (const Name of Text) {
      if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc`)) {
        let McName = await this.McName(Name)
        if ((McName[0] !== undefined) && (McName[1] !== "false")) {
          if (McName[2] !== "完整") complete = McName[0]; McName[0] = "<span>" + McName[0] +  "</span>"
          let type = {
            "Character": "共鸣者",
            "Weapon": "武器",
            "Echo": "声骸",
            "Monster": "残像",
            "Item": "物品"
          }
          record.push({
            name: McName[0],
            type: type[McName[1]],
            way: McName[2],
            game: "mc",
            icon: McName[3]
          })
        }
      }
      if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs`)) {
        let GsName = await this.GsName(Name)
        if ((GsName[0] !== undefined) && (GsName[1] !== "false")) {
          if (GsName[2] !== "完整") complete = GsName[0]; GsName[0] = "<span>" + GsName[0] +  "</span>"
          let type = {
            "Character": "角色",
            "Weapon": "武器",
            "Echo": "圣遗物",
            "Monster": "魔物",
            "Item": "物品"
          }
          record.push({
            name: GsName[0],
            type: type[GsName[1]],
            way: GsName[2],
            game: "gs",
            icon: GsName[3]
          })
        }
      }
      if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr`)) {
        let SrName = await this.SrName(Name)
        if ((SrName[0] !== undefined) && (SrName[1] !== "false")) {
          if (SrName[2] !== "完整") complete = SrName[0]; SrName[0] = "<span>" + SrName[0] +  "</span>"
          let type = {
            "Character": "角色",
            "Weapon": "光锥",
            "Echo": "遗器",
            "Monster": "敌人",
            "Item": "物品"
          }
          record.push({
            name: SrName[0],
            type: type[SrName[1]],
            way: SrName[2],
            game: "sr",
            icon: SrName[3]
          })
        }
      }
      let BlurName = await this.blur(Name, complete)
      if (BlurName.length !== 0) record.push(...BlurName)
    }
    if (record.length === 0) return e.reply(`未能找到与 ${TextData[3]} 有关内容(*/ω＼*)`)
    record = record.filter(item => {let key = `${item.name}-${item.icon}`; if (mz.has(key)) return false; mz.add(key); return true})
    let one = record.shift(), ccb = [], Page, Counting
    if (TextData[4]) { Page = TextData[4] } else { Page = 1 }
    if (record.length !== 0) {
      Counting = Math.ceil(Math.max(((record.length - 18) / 21), 0)) + 1
      if (Page > Counting) Page = Counting
      for (let i = 0; i < Counting; i++) {
        if (i === 0) {
          ccb[1] = record.slice(0, 18)
        } else {
          ccb[i + 1] = record.slice((i - 1) * 21 + 18, i * 21 + 18)
        }
      }
    }
    return Common.render('wiki/data/query', {
      text: TextData[3],
      num: record.length + 1,
      one: one,
      Page: [Page ,Counting],
      record: ccb[Page]
    }, { e, scale: 1.4 })
  }

  async weaponKey (name, game) {
    let broadblade, gauntlets, pistols, projection, rectifier, sword, bow, catalyst, claymore, polearm, weaponAll = {}
    if (game === 'mc') {
      try {
        broadblade = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/weapon/broadblade/data.json`, 'utf8')
        gauntlets = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/weapon/gauntlets/data.json`, 'utf8')
        pistols = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/weapon/pistols/data.json`, 'utf8')
        projection = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/weapon/projection/data.json`, 'utf8')
        rectifier = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/weapon/rectifier/data.json`, 'utf8')
        sword = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/weapon/sword/data.json`, 'utf8')
        broadblade = Array.from(new Set(Object.values(JSON.parse(broadblade)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'broadblade'; return acc}, {})
        gauntlets = Array.from(new Set(Object.values(JSON.parse(gauntlets)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'gauntlets'; return acc}, {})
        pistols = Array.from(new Set(Object.values(JSON.parse(pistols)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'pistols'; return acc}, {})
        projection = Array.from(new Set(Object.values(JSON.parse(projection)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'projection'; return acc}, {})
        rectifier = Array.from(new Set(Object.values(JSON.parse(rectifier)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'rectifier'; return acc}, {})
        sword = Array.from(new Set(Object.values(JSON.parse(sword)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'sword'; return acc}, {})
        weaponAll = {...broadblade, ...gauntlets, ...pistols, ...projection, ...rectifier, ...sword}
      } catch {}
    } else if (game === 'gs') {
      try {
        bow = fs.readFileSync(`./plugins/miao-plugin/resources/meta-gs/weapon/bow/data.json`, 'utf8')
        catalyst = fs.readFileSync(`./plugins/miao-plugin/resources/meta-gs/weapon/catalyst/data.json`, 'utf8')
        claymore = fs.readFileSync(`./plugins/miao-plugin/resources/meta-gs/weapon/claymore/data.json`, 'utf8')
        polearm = fs.readFileSync(`./plugins/miao-plugin/resources/meta-gs/weapon/polearm/data.json`, 'utf8')
        projection = fs.readFileSync(`./plugins/miao-plugin/resources/meta-gs/weapon/projection/data.json`, 'utf8')
        sword = fs.readFileSync(`./plugins/miao-plugin/resources/meta-gs/weapon/sword/data.json`, 'utf8')
        bow = Array.from(new Set(Object.values(JSON.parse(bow)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'bow'; return acc}, {})
        catalyst = Array.from(new Set(Object.values(JSON.parse(catalyst)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'catalyst'; return acc}, {})
        claymore = Array.from(new Set(Object.values(JSON.parse(claymore)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'claymore'; return acc}, {})
        polearm = Array.from(new Set(Object.values(JSON.parse(polearm)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'polearm'; return acc}, {})
        projection = Array.from(new Set(Object.values(JSON.parse(projection)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'projection'; return acc}, {})
        sword = Array.from(new Set(Object.values(JSON.parse(sword)).map(item => item.name))).reduce((acc, name) => {acc[name] = 'sword'; return acc}, {})
        weaponAll = {...bow, ...catalyst, ...claymore, ...polearm, ...projection, ...sword}
      } catch {}
    } else if (game === 'sr') {
      let weaponJson = JSON.parse(fs.readFileSync(`./plugins/miao-plugin/resources/meta-sr/weapon/data.json`, 'utf8'))
      weaponAll = Object.entries(weaponJson).reduce((acc, [ccb, bbc]) => { acc[bbc.name] = bbc.type; return acc; }, {})
    }
    return weaponAll[name]
  }

  async blur (ccb, bbc) {
    let McCharacter = [], McWeapon = [], McEcho = [], McMonster = [], McItem = [], GsCharacter = [], GsWeapon = [], GsEcho = [], GsItem = [], SrCharacter = [], SrWeapon = [], SrEcho = [], SrItem = []
    let file = (Path) => { let items = fs.readdirSync(Path, { withFileTypes: true }); return items.filter(item => item.isDirectory()).map(item => item.name)}
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc`)) {
      McCharacter = file("./plugins/miao-plugin/resources/meta-mc/character").filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "共鸣者",
        way: "模糊匹配",
        game: "mc",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${Name}/imgs/side.webp`
      }))
      let WeaponFile = [
        ...file("./plugins/miao-plugin/resources/meta-mc/weapon/broadblade"),
        ...file("./plugins/miao-plugin/resources/meta-mc/weapon/gauntlets"),
        ...file("./plugins/miao-plugin/resources/meta-mc/weapon/pistols"),
        ...file("./plugins/miao-plugin/resources/meta-mc/weapon/projection"),
        ...file("./plugins/miao-plugin/resources/meta-mc/weapon/rectifier"),
        ...file("./plugins/miao-plugin/resources/meta-mc/weapon/sword")
      ]
      McWeapon = WeaponFile.filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "武器",
        way: "模糊匹配",
        game: "mc"
      }))
      if (McWeapon.length !== 0) {McWeapon = await Promise.all(McWeapon.map(async (item) => {let weaponKey = await this.weaponKey(item.name.replace(/<\/?span>/gi, ''), "mc"); return {...item, icon: `${process.cwd()}/plugins/miao-plugin/resources/meta-mc/weapon/${weaponKey}/${item.name.replace(/<\/?span>/gi, '')}/icon.webp`}}))}
      McEcho = file("./plugins/miao-plugin/resources/meta-mc/artifact").filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "声骸",
        way: "模糊匹配",
        game: "mc",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/artifact/${Name}/img.webp`
      }))
      McMonster = file("./plugins/miao-plugin/resources/meta-mc/monster").filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "残像",
        way: "模糊匹配",
        game: "mc",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/monster/${Name}/icon.webp`
      }))
      let item = JSON.parse(fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/material/data.json`, 'utf8'))
      McItem = Object.keys(item).filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "物品",
        way: "模糊匹配",
        game: "mc",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/${item[Name]?.type}/${Name}.webp`
      }))
    }
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs`)) {
      GsCharacter = file("./plugins/miao-plugin/resources/meta-gs/character").filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "角色",
        way: "模糊匹配",
        game: "gs",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-gs/character/${Name}/imgs/side.webp`
      }))
      let WeaponFile = [
        ...file("./plugins/miao-plugin/resources/meta-gs/weapon/bow"),
        ...file("./plugins/miao-plugin/resources/meta-gs/weapon/catalyst"),
        ...file("./plugins/miao-plugin/resources/meta-gs/weapon/claymore"),
        ...file("./plugins/miao-plugin/resources/meta-gs/weapon/polearm"),
        ...file("./plugins/miao-plugin/resources/meta-gs/weapon/sword")
      ]
      if (fs.existsSync("./plugins/miao-plugin/resources/meta-gs/weapon/projection")) WeaponFile = [...WeaponFile, ...file("./plugins/miao-plugin/resources/meta-gs/weapon/projection")]
      GsWeapon = WeaponFile.filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "武器",
        way: "模糊匹配",
        game: "gs",
      }))
      if (GsWeapon.length !== 0) {GsWeapon = await Promise.all(GsWeapon.map(async (item) => {let weaponKey = await this.weaponKey(item.name.replace(/<\/?span>/gi, ''), "gs"); return {...item, icon: `${process.cwd()}/plugins/miao-plugin/resources/meta-gs/weapon/${weaponKey}/${item.name.replace(/<\/?span>/gi, '')}/icon.webp`}}))}
      GsEcho = file("./plugins/miao-plugin/resources/meta-gs/artifact/imgs").filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "圣遗物",
        way: "模糊匹配",
        game: "gs",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-gs/artifact/imgs/${Name}/1.webp`
      }))
      let item = JSON.parse(fs.readFileSync(`./plugins/miao-plugin/resources/meta-gs/material/data.json`, 'utf8'))
      GsItem = Object.keys(item).filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "物品",
        way: "模糊匹配",
        game: "gs",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-gs/material/${item[Name]?.type}/${Name}.webp`
      }))
    }
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr`)) {
      SrCharacter = file("./plugins/miao-plugin/resources/meta-sr/character").filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "角色",
        way: "模糊匹配",
        game: "sr",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-sr/character/${Name}/imgs/face.webp`
      }))
      let WeaponFile = [
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/存护"),
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/丰饶"),
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/欢愉"),
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/毁灭"),
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/记忆"),
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/同谐"),
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/虚无"),
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/巡猎"),
        ...file("./plugins/miao-plugin/resources/meta-sr/weapon/智识")
      ]
      SrWeapon = WeaponFile.filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "光锥",
        way: "模糊匹配",
        game: "sr",
      }))
      if (SrWeapon.length !== 0) {SrWeapon = await Promise.all(SrWeapon.map(async (item) => {let weaponKey = await this.weaponKey(item.name.replace(/<\/?span>/gi, ''), "sr"); return {...item, icon: `${process.cwd()}/plugins/miao-plugin/resources/meta-sr/weapon/${weaponKey}/${item.name.replace(/<\/?span>/gi, '')}/icon.webp`}}))}
      SrEcho = file("./plugins/miao-plugin/resources/meta-sr/artifact").filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "遗器",
        way: "模糊匹配",
        game: "sr",
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-sr/artifact/${Name}/arti-0.webp`
      }))
      SrItem = Object.keys(SrItemAlias).filter(key => key.includes(ccb) && (bbc === undefined || key !== bbc)).map(Name => ({
        name: Name.replace(new RegExp(ccb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),`<span>${ccb}</span>`),
        type: "物品",
        way: "模糊匹配",
        game: "sr",
      }))
    }
    return [
      ...McCharacter,
      ...McWeapon,
      ...McEcho,
      ...McMonster,
      ...McItem,
      ...GsCharacter,
      ...GsWeapon,
      ...GsEcho,
      ...GsItem,
      ...SrCharacter,
      ...SrWeapon,
      ...SrEcho,
      ...SrItem,
    ]
  }

  async McName (Name) {
    if (Name.includes("专武")) {if (McCharacterAlias.hasOwnProperty(Name.replace(/专武/g, ''))) return [Mcexclusive[Name.replace(/专武/g, '')],"Weapon", "关联", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/${await this.weaponKey(Mcexclusive[Name.replace(/专武/g, '')], "mc")}/${Mcexclusive[Name.replace(/专武/g, '')]}/icon.webp`];for (const [key, value] of Object.entries(McCharacterAlias)) {if (value.split(',').map(part => part.trim()).includes(Name.replace(/专武/g, ''))) {Name = key; break}}return [Mcexclusive[Name.replace(/专武/g, '')], "Weapon", "关联",  process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/${await this.weaponKey(Mcexclusive[Name.replace(/专武/g, '')], "mc")}/${Mcexclusive[Name.replace(/专武/g, '')]}/icon.webp`]}
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/character/${Name}/data.json`)) return [Name, "Character", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${Name}/imgs/side.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/broadblade/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/broadblade/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/gauntlets/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/gauntlets/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/pistols/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/pistols/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/projection/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/projection/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/rectifier/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/rectifier/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/sword/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/sword/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/artifact/${Name}/data.json`)) return [Name, "Echo", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/artifact/${Name}/img.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/monster/${Name}/data.json`)) return [Name, "Monster", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/monster/${Name}/icon.webp`]
    for (const [key, value] of Object.entries(McCharacterAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Character", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${key}/imgs/side.webp`]}
    for (const [key, value] of Object.entries(McWeaponAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Weapon", "别名",  process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/${await this.weaponKey(key, "mc")}/${key}/icon.webp`]}
    for (const [key, value] of Object.entries(McEchoAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Echo", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/artifact/${key}/imgs.webp`]}
    for (const [key, value] of Object.entries(McMonsterAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Monster", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/monster/${key}/icon.webp`]}
    for (const [key, value] of Object.entries(McItemAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Item", "别名"]}
    if (McCharacterAlias.hasOwnProperty(Name)) return [Name, "Character", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${Name}/imgs/side.webp`]
    if (McWeaponAlias.hasOwnProperty(Name)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/${await this.weaponKey(Name, "mc")}/${Name}/icon.webp`]
    if (McEchoAlias.hasOwnProperty(Name)) return [Name, "Echo", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/artifact/${Name}/img.webp`]
    if (McMonsterAlias.hasOwnProperty(Name)) return [Name, "Monster", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/monster/${Name}/icon.webp`]
    let item = JSON.parse(fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/material/data.json`, 'utf8'))
    if (item[Name]) return [Name, "Item", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/${item[Name]?.type}/${Name}.webp`]
    if (McItemAlias.hasOwnProperty(Name)) return [Name, "Item", "全称"]
    return [Name, "false"]
  }

  async GsName (Name) {
    if (Name.includes("专武")) {if (GsCharacterAlias.hasOwnProperty(Name.replace(/专武/g, ''))) return [Gsexclusive[Name.replace(/专武/g, '')],"Weapon", "关联", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/${await this.weaponKey(Gsexclusive[Name.replace(/专武/g, '')], "gs")}/${Gsexclusive[Name.replace(/专武/g, '')]}/icon.webp`];for (const [key, value] of Object.entries(GsCharacterAlias)) {if (value.split(',').map(part => part.trim()).includes(Name.replace(/专武/g, ''))) {Name = key; break}}return [Gsexclusive[Name.replace(/专武/g, '')], "Weapon", "关联",  process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/${await this.weaponKey(Gsexclusive[Name.replace(/专武/g, '')], "gs")}/${Gsexclusive[Name.replace(/专武/g, '')]}/icon.webp`]}
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/character/${Name}/data.json`)) return [Name, "Character", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/character/${Name}/imgs/side.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/weapon/bow/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/bow/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/weapon/catalyst/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/catalyst/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/weapon/claymore/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/claymore/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/weapon/polearm/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/polearm/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/weapon/projection/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/projection/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/weapon/sword/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/sword/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-gs/artifact/${Name}/data.json`)) return [Name, "Echo", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/artifact/imgs/${Name}/1.webp`]
    for (const [key, value] of Object.entries(GsCharacterAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Character", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/character/${key}/imgs/side.webp`]}
    for (const [key, value] of Object.entries(GsWeaponAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Weapon", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/${await this.weaponKey(key, "gs")}/${key}/icon.webp`]}
    for (const [key, value] of Object.entries(GsEchoAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Echo", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/artifact/imgs/${key}/1.webp`]}
    for (const [key, value] of Object.entries(GsItemAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Item", "别名"]}
    if (GsCharacterAlias.hasOwnProperty(Name)) return [Name, "Character", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/character/${Name}/imgs/side.webp`]
    if (GsWeaponAlias.hasOwnProperty(Name)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/weapon/${await this.weaponKey(Name, "gs")}/${Name}/icon.webp`]
    if (GsEchoAlias.hasOwnProperty(Name)) return [Name, "Echo", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/artifact/imgs/${Name}/1.webp`]
    let item = JSON.parse(fs.readFileSync(`./plugins/miao-plugin/resources/meta-gs/material/data.json`, 'utf8'))
    if (item[Name]) return [Name, "Item", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-gs/material/${item[Name]?.type}/${Name}.webp`]
    if (GsItemAlias.hasOwnProperty(Name)) return [Name, "Item", "全称"]
    return [Name, "false"]
  }

  async SrName (Name) {
    if (Name.includes("专武")) {if (SrCharacterAlias.hasOwnProperty(Name.replace(/专武/g, ''))) return [Srexclusive[Name.replace(/专武/g, '')],"Weapon", "关联", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/${await this.weaponKey(Srexclusive[Name.replace(/专武/g, '')], "sr")}/${Srexclusive[Name.replace(/专武/g, '')]}/icon.webp`];for (const [key, value] of Object.entries(SrCharacterAlias)) {if (value.split(',').map(part => part.trim()).includes(Name.replace(/专武/g, ''))) {Name = key; break}}return [Srexclusive[Name.replace(/专武/g, '')], "Weapon", "关联",  process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/${await this.weaponKey(Srexclusive[Name.replace(/专武/g, '')], "sr")}/${Srexclusive[Name.replace(/专武/g, '')]}/icon.webp`]}
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/character/${Name}/data.json`)) return [Name, "Character", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/character/${Name}/imgs/face.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/存护/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/存护/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/丰饶/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/丰饶/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/欢愉/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/欢愉/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/毁灭/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/毁灭/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/记忆/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/记忆/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/同谐/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/同谐/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/虚无/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/虚无/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/巡猎/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/巡猎/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/weapon/智识/${Name}/data.json`)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/智识/${Name}/icon.webp`]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-sr/artifact/${Name}/arti-0.webp`)) return [Name, "Echo", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/artifact/${Name}/arti-0.webp`]
    for (const [key, value] of Object.entries(SrCharacterAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Character", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/character/${key}/imgs/face.webp`]}
    for (const [key, value] of Object.entries(SrWeaponAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Weapon", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/${await this.weaponKey(key, "sr")}/${key}/icon.webp`]}
    for (const [key, value] of Object.entries(SrEchoAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Echo", "别名", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/artifact/${key}/arti-0.webp`]}
    for (const [key, value] of Object.entries(SrItemAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Item", "别名"]}
    if (SrCharacterAlias.hasOwnProperty(Name)) return [Name, "Character", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/character/${Name}/imgs/face.webp`]
    if (SrWeaponAlias.hasOwnProperty(Name)) return [Name, "Weapon", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/weapon/${await this.weaponKey(Name, "sr")}/${Name}/icon.webp`]
    if (SrEchoAlias.hasOwnProperty(Name)) return [Name, "Echo", "全称", process.cwd() + `/plugins/miao-plugin/resources/meta-sr/artifact/${Name}/arti-0.webp`]
    if (SrItemAlias.hasOwnProperty(Name)) return [Name, "Item", "全称"]
    return [Name, "false"]
  }
}