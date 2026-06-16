import plugin from '../../../lib/plugins/plugin.js'
import { Common } from '../components/index.js'
import { CharacterAlias, WeaponAlias, EchoAlias, ItemAlias, MonsterAlias } from '../damage/liangshi-mc/data/alias.js'
import { abbr } from '../resources/wiki/Wuthering Waves/abbr.js'
import { source, matNum, attrKey, exclusive } from '../damage/liangshi-mc/data/weapon.js'
import fs from 'node:fs'

export class Wiki extends plugin {
  constructor () {
    super(
      {
        name: 'wuwaWiki',
        dsc: '鸣潮图鉴',
        event: 'message',
        priority: 5000,
        rule: [
          {
            reg: '^#*(mc|MC|鸣潮|鸣朝|明潮|明朝|鸟潮|鸟朝|鸟巢)(.*?)图鉴$',
            fnc: 'McWiki'
          },
          {
            reg: '^#*(mc|MC|鸣潮|鸣朝|明潮|明朝|鸟潮|鸟朝|鸟巢)(.*?)(天赋|技能|共鸣链|命座)$',
            fnc: 'Mctalent'
          }
        ]
      }
    )
  }

  async McWiki (e) {
    let TextData = e.msg.match(/^#*(mc|MC|鸣潮|鸣朝|明潮|明朝|鸟潮|鸟朝|鸟巢|ls|LS)(.*?)图鉴$/)
    let text = await this.McName(TextData[2])
    if (text[0] === "") return false
    if (text[1] === "Character") {
      let wikiJson = await this.McJson(text)
      return Common.render('wiki/Wuthering Waves/character-mc-wiki', {
        data: wikiJson.data,
        attr: wikiJson.attr,
        detail: wikiJson.detail,
        imgs: wikiJson.imgs,
        Tag: wikiJson.Tag,
        Features: wikiJson.Features,
        holding: wikiJson.holding,
        usage: wikiJson.usage,
        materials: wikiJson.materials,
        elem: wikiJson.elem
      }, { e, scale: 1.4 })
    } else if (text[1] === "Weapon") {
      let wikiJson = await this.McWeapon(text)
      return Common.render('wiki/Wuthering Waves/weapon-mc-wiki', {
        data: wikiJson.data,
        attr: wikiJson.attr,
        skill: wikiJson.skill,
        materials: wikiJson.materials,
        imgs: wikiJson.imgs
      }, { e, scale: 1.4 })
    } else if (text[1] === "Echo") {
      let wikiJson = await this.McEcho(text)
      return Common.render('wiki/Wuthering Waves/echo-mc-wiki', {
        data: wikiJson.data,
        imgs: wikiJson.imgs,
        Group: wikiJson.Group,
        skillDesc: wikiJson.skillDesc,
        type: wikiJson.type
      }, { e, scale: 1.4 })
    } else if (text[1] === "Monster") {
      let wikiJson = await this.McMonster(text)
      return Common.render('wiki/Wuthering Waves/monster-mc-wiki', {
        data: wikiJson.data,
        base: wikiJson.base,
        res: wikiJson.res,
        attr: wikiJson.attr,
        imgs: wikiJson.imgs
      }, { e, scale: 1.4 })
    } else {
      let wikiJson = await this.McItem(text)
      if (!wikiJson) return false
      return Common.render('wiki/Wuthering Waves/item-mc-wiki', {
        data: wikiJson.data,
        bg: wikiJson.bg,
        imgs: wikiJson.imgs
      }, { e, scale: 1.4 })
    }
  }

  async Mctalent (e) {
    let TextData = e.msg.match(/^#*(mc|MC|鸣潮|鸣朝|明潮|明朝|鸟潮|鸟朝|鸟巢|ls|LS)(.*?)(天赋|技能|共鸣链|命座)$/)
    let mode, text = await this.McName(TextData[2])
    if (TextData[3] === "天赋" || TextData[3] === "技能") { mode = "talent" } else { mode = "cons" }
    if (!text) return false
    let wikiJson = await this.McJson(text)
    return Common.render('wiki/Wuthering Waves/character-mc-talent', {
      saveId: `${mode}-${wikiJson.data.id}`,
      ...wikiJson.data,
      game: "gs",
      detail: wikiJson.detail,
      imgs:  wikiJson.imgs,
      mode,
      lvs: [
        'Lv1', 'Lv2', 'Lv3',
        'Lv4', 'Lv5', 'Lv6',
        'Lv7', 'Lv8', 'Lv9',
        'Lv10', 'Lv11', 'Lv12',
        'Lv13', 'Lv14', 'Lv15'
      ],
      line: wikiJson.line,
    }, { e, scale: 1.1 })
  }

  async McJson (text) {
    let ChaJson
    let elemKey = {
      "glacio": "冷凝",
      "fusion": "热熔",
      "electro": "导电",
      "aero": "气动",
      "spectrp": "衍射",
      "havoc": "湮灭"
    }
    let elemYsKey = {
      "glacio": "cryo",
      "fusion": "pyro",
      "electro": "quantum",
      "aero": "anemo",
      "spectrp": "geo",
      "havoc": "electro"
    }
    let weaponKey = {
      "broadblade": "长刃",
      "sword": "迅刀",
      "pistols": "配枪",
      "gauntlets": "臂铠",
      "rectifier": "音感仪"
    }
    try {
      ChaJson = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/character/${text[0]}/data.json`, 'utf8')
      ChaJson = JSON.parse(ChaJson)
    } catch (err) {
      console.warn("遇到了些问题，若重试后仍有此问题建议重新更新数据")
      console.warn(err)
      return false
    }
    let KeyName = {
      "生存治疗": "生存治疗",
      "主力输出": "主力输出",
      "快速协奏": "快速协奏",
      "普攻伤害": "普攻伤害",
      "重击伤害": "重击伤害",
      "共鸣技能伤害": "共技伤害",
      "共鸣解放伤害": "共解伤害",
      "声骸技能伤害": "声骸伤害",
      "牵引": "牵引",
      "协同攻击": "协同攻击",
      "凝滞": "凝滞",
      "共鸣解放充能": "充能效率",
      "共振摧毁": "共振摧毁",
      "抗打断": "抗打断",
      "伤害加深": "伤害加深",
      "湮灭伤害加深": "湮灭加深",
      "气动伤害加深": "气动加深",
      "导电伤害加深": "导电加深",
      "热熔伤害加深": "热熔加深",
      "冷凝伤害加深": "冷凝加深",
      "衍射伤害加深": "衍射加深",
      "普攻伤害加深": "普攻加深",
      "重击伤害加深": "重击加深",
      "共鸣技能伤害加深": "共技加深",
      "共鸣解放伤害加深": "共解加深",
      "协同攻击伤害加深": "协同加深",
      "声骸技能伤害加深": "声骸加深",
      "风蚀": "风蚀效应",
      "电磁": "电磁效应",
      "霜渐": "霜渐效应",
      "聚爆": "聚爆效应",
      "光噪": "光噪效应",
      "虚湮": "虚湮效应",
      "震谐响应": "震谐响应",
      "集谐响应": "集谐响应",
      "骇破响应": "骇破响应",
      "谐度破坏增幅": "谐度增幅",
      "偏谐值累积效率": "偏谐效率",
    }
    let data = {
      id: ChaJson.id,
      name: ChaJson.name,
      abbr: ChaJson.abbr,
      title: ChaJson.title,
      star: ChaJson.star,
      elem: elemYsKey[ChaJson.elem],
      allegiance: ChaJson.allegiance,
      weapon: ChaJson.weapon,
      birthday: ChaJson.birth,
      astro: elemKey[ChaJson.elem],
      cncv: ChaJson.cncv,
      jpcv: ChaJson.jpcv,
      desc: ChaJson.desc,
      talentCons: { a: 0, e: 0, q: 0 },
      weaponTypeName: weaponKey[ChaJson.weapon],
      elemName: elemKey[ChaJson.elem]
    }
    let terNum = Math.floor((ChaJson.attr.tree["1"].value + ChaJson.attr.tree["4"].value + ChaJson.attr.tree["5"].value + ChaJson.attr.tree["8"].value) * 100) / 100
    let attr = [
      { title: '基础生命', value: Math.floor(ChaJson.baseAttr.hp * 100) / 100 },
      { title: '基础攻击', value: Math.floor(ChaJson.baseAttr.atk * 100) / 100 },
      { title: '基础防御', value: Math.floor(ChaJson.baseAttr.def * 100) / 100 },
      { title: `天赋·${ChaJson.attr.tree["1"]?.key ? ChaJson.attr.tree["1"].key.slice(0, 2) : "未知"}`, value: terNum }
    ]
    let line = [
      { label: '基础生命', num: Math.floor(ChaJson.baseAttr.hp * 100) / 100 },
      { label: '基础攻击', num: Math.floor(ChaJson.baseAttr.atk * 100) / 100 },
      { label: '基础防御', num: Math.floor(ChaJson.baseAttr.def * 100) / 100 },
      { label: `天赋·${ChaJson.attr.tree["1"]?.key ? ChaJson.attr.tree["1"].key.slice(0, 2) : "未知"}`, num: terNum }
    ]
    let detail = ChaJson
    let Features = ChaJson.Features?.map(ccb => ccb.replace(/<color=[^>]*>(.*?)<\/color>/g, '<span class="highlight">$1</span>'))
    let imgs = {
      face: `/meta-mc/character/${ChaJson.name}/imgs/side.webp`,
      qFace: `/meta-mc/character/${ChaJson.name}/imgs/side.webp`,
      side: `/meta-mc/character/${ChaJson.name}/imgs/side.webp`,
      gacha: `/meta-mc/character/${ChaJson.name}/imgs/gacha.webp`,
      splash: fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/imgs/pool.webp`) ? `/meta-mc/character/${ChaJson.name}/imgs/pool.webp`: `/meta-mc/character/${ChaJson.name}/imgs/splash.webp`,
      card: `../../liangshi-calc/resources/wiki/Wuthering Waves/card/${ChaJson.elem}.png`,
      banner: `/meta-mc/character/${ChaJson.name}/imgs/banner.webp`,
      cons1: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/cons-1.webp`,
      cons2: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/cons-2.webp`,
      cons3: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/cons-3.webp`,
      cons4: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/cons-4.webp`,
      cons5: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/cons-5.webp`,
      cons6: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/cons-6.webp`,
      passive0: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/passive-0.webp`,
      passive1: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/passive-1.webp`,
      passive2: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/passive-2.webp`,
      passive3: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/passive-3.webp`,
      a: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/weaponKey/${ChaJson.weapon}.webp`,
      e: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/talent-e.webp`,
      q: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/talent-q.webp`,
      o: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/talent-o.webp`,
      i: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/talent-i.webp`,
      t: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${ChaJson.name}/icons/talent-t.webp`
    }
    let Tag = ChaJson.tag.name
    Tag = Tag.map(id => ({
      img: `../../liangshi-calc/resources/wiki/Wuthering%20Waves/RoleLabel/${KeyName[id] || "未知"}.webp`,
      name: KeyName[id] || id,
      star: 1
    }))
    let materials = [
      {
        label: "贝币",
        star: 3,
        icon: 'meta-mc/material/通用货币/贝币.webp',
        type: 'avatar_material',
        num: '170000'
      },
      {
        label: ChaJson.materials.boss || null,
        star: 4,
        icon: `meta-mc/material/共鸣者突破材料/${ChaJson.materials.boss}.webp`,
        type: 'boss',
        num: '46'
      },
      {
        label: abbr[ChaJson.materials.normal] || ChaJson.materials.normal || null,
        star: 5,
        icon: `meta-mc/material/武器与技能素材/${ChaJson.materials.normal}.webp`,
        type: 'normal',
        num: '4/12/12/4'
      },
      {
        label: ChaJson.materials.specialty || null,
        star: 1,
        icon: `meta-mc/material/突破材料/${ChaJson.materials.specialty}.webp`,
        type: 'specialty',
        num: '60'
      },
      {
        label: abbr[ChaJson.materials.talent] || ChaJson.materials.talent || null,
        star: 5,
        icon: `meta-mc/material/武器与技能素材/${ChaJson.materials.talent}.webp`,
        type: 'talent',
        num: ''
      },
      {
        label: abbr[ChaJson.materials.weekly] || ChaJson.materials.weekly || null,
        star: 4,
        icon: `meta-mc/material/技能升级材料/${ChaJson.materials.weekly}.webp`,
        type: 'weekly',
        num: ''
      }
    ]
    materials = materials.filter(item => item.label !== null)
    let elem = elemYsKey[ChaJson.elem]
    return { data, attr, detail, imgs, Tag, materials, elem, line, Features }
  }

  async McWeapon (text) {
    let type, WeaJson, ItemJson
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/broadblade/${text[0]}/data.json`)) type = "broadblade"
    else if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/gauntlets/${text[0]}/data.json`)) type = "gauntlets"
    else if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/pistols/${text[0]}/data.json`)) type = "pistols"
    else if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/projection/${text[0]}/data.json`)) type = "projection"
    else if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/rectifier/${text[0]}/data.json`)) type = "rectifier"
    else if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/sword/${text[0]}/data.json`)) type = "sword"
    else return false
    try {
      WeaJson = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/weapon/${type}/${text[0]}/data.json`, 'utf8')
      WeaJson = JSON.parse(WeaJson)
      ItemJson = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/material/data.json`, 'utf8')
      ItemJson = JSON.parse(ItemJson)
    } catch (err) {
      console.warn("遇到了些问题，若重试后仍有此问题建议重新更新数据")
      console.warn(err)
      return false
    }
    let materials = [
      {
        label: "特级能源核心",
        star: 5,
        icon: process.cwd() + '/plugins/miao-plugin/resources/meta-mc/material/武器经验材料/特级能源核心.webp',
        type: 'exchange',
        num: matNum[WeaJson.star].exp
      },
      {
        label: "贝币",
        star: 3,
        icon: process.cwd() + '/plugins/miao-plugin/resources/meta-mc/material/通用货币/贝币.webp',
        type: 'avatar_material',
        num: matNum[WeaJson.star].avatar_material
      },
      {
        label: WeaJson.materials.weapon || null,
        star: 5,
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/武器与技能素材/${WeaJson.materials.weapon}.webp`,
        type: 'talent',
        num: matNum[WeaJson.star].talent[0]
      },
      {
        label: Object.keys(ItemJson[WeaJson.materials.weapon]?.items)?.[2] || null,
        star: 4,
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/武器与技能素材/${Object.keys(ItemJson[WeaJson.materials.weapon]?.items)?.[2]}.webp`,
        type: 'talent',
        num: matNum[WeaJson.star].talent[1]
      },
      {
        label: Object.keys(ItemJson[WeaJson.materials.weapon]?.items)?.[1] || null,
        star: 3,
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/武器与技能素材/${Object.keys(ItemJson[WeaJson.materials.weapon]?.items)?.[1]}.webp`,
        type: 'talent',
        num: matNum[WeaJson.star].talent[1]
      },
      {
        label: Object.keys(ItemJson[WeaJson.materials.weapon]?.items)?.[0] || null,
        star: 2,
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/武器与技能素材/${Object.keys(ItemJson[WeaJson.materials.weapon]?.items)?.[0]}.webp`,
        type: 'talent',
        num: matNum[WeaJson.star].talent[1]
      },
      {
        label: WeaJson.materials.monster || null,
        star: 5,
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/武器与技能素材/${WeaJson.materials.monster}.webp`,
        type: 'normal',
        num: matNum[WeaJson.star].normal[0]
      },
      {
        label: Object.keys(ItemJson[WeaJson.materials.monster]?.items)?.[2] || null,
        star: 4,
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/武器与技能素材/${Object.keys(ItemJson[WeaJson.materials.monster]?.items)?.[2]}.webp`,
        type: 'normal',
        num: matNum[WeaJson.star].normal[1]
      },
      {
        label: Object.keys(ItemJson[WeaJson.materials.monster]?.items)?.[1] || null,
        star: 3,
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/武器与技能素材/${Object.keys(ItemJson[WeaJson.materials.monster]?.items)?.[1]}.webp`,
        type: 'normal',
        num: matNum[WeaJson.star].normal[2]
      },
      {
        label: Object.keys(ItemJson[WeaJson.materials.monster]?.items)?.[0] || null,
        star: 2,
        icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/武器与技能素材/${Object.keys(ItemJson[WeaJson.materials.monster]?.items)?.[0]}.webp`,
        type: 'normal',
        num: matNum[WeaJson.star].normal[3]
      }
    ]
    let SourceKey = []
    for (const [key, zfc] of Object.entries(source)) {
      if (Array.isArray(zfc) && zfc.includes(WeaJson.name)) {
        SourceKey.push(key)
      }
    }
    SourceKey = SourceKey.length > 0 ? SourceKey.join(',') : '限定唤取'
    let skillDesc = WeaJson.affixData?.text?.replace(/\$\[(\d+)\]/g, (bbc, ccb) => {
      let cbc = WeaJson.affixData?.datas[ccb]
      if (!cbc) return bbc
      return cbc.every(bcb => bcb === cbc[0]) ? cbc[0] : `<span class="strong">${cbc.join('/')}</span>`
    })
    let skill = {
      text: WeaJson.affixTitle,
      desc: [skillDesc],
    }
    let data = {
      name: WeaJson.name,
      star: WeaJson.star,
      desc: WeaJson.desc,
      affixTitle: WeaJson.affixTitle,
      source: SourceKey
    }
    let attr = WeaJson.attr
    let exclusiveName
    for (let key in exclusive) {
      if (exclusive.hasOwnProperty(key) && exclusive[key] === WeaJson.name) {
        exclusiveName = key
        break
      }
    }
    let imgs = {
      icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/weapon/${type}/${WeaJson.name}/icon.webp`,
      type: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/weaponKey/${type}.webp`,
      character: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/character/${exclusiveName}/imgs/side.webp`
    }
    let bonusKey = {
      "atkPct": "攻击力",
      "hpPct": "生命值",
      "defPct": "防御力",
      "recharge": "共鸣效率",
      "cpct": "暴击率",
      "cdmg": "暴击伤害",
    }
    attr.attrText = {
      atk: `${attrKey[WeaJson.star]?.[attr.atk[1]]?.front || ""}${Math.floor(attr.atk[90])}${attrKey[WeaJson.star]?.[attr.atk[1]]?.after || ""}`,
      bonus: `${attrKey[WeaJson.star]?.[attr.atk[1]]?.opFront || ""}${Math.floor(attr.bonusData[90])}%${attrKey[WeaJson.star]?.[attr.atk[1]]?.after || ""}`
    }
    attr.bonusKey = bonusKey[WeaJson.attr?.bonusKey]
    return {
      data: data,
      attr: attr,
      skill: skill,
      materials: materials,
      imgs: imgs,
      bonusKey: bonusKey[WeaJson.attr?.bonusKey],
    }
  }

  async McEcho (text) {
    let EchoJson, GroupJson
    try {
      EchoJson = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/artifact/${text[0]}/data.json`, 'utf8')
      EchoJson = JSON.parse(EchoJson)
      GroupJson = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/artifact/data.json`, 'utf8')
      GroupJson = JSON.parse(GroupJson)
    } catch (err) {
      console.warn("遇到了些问题，若重试后仍有此问题建议重新更新数据")
      console.warn(err)
      return false
    }
    let Cons, Group
    Group = EchoJson.Group.map(key => {if (GroupJson.hasOwnProperty(key)) {return GroupJson[key]} return null})
    Group = Group.map(({ sets, UpdateTime, effect: oldEffect, ...rest }) => {
      let newEffect = oldEffect ? Object.entries(oldEffect).map(([key, value]) => `<span class="suit">${key}件套：</span>${value}<br>`) : []
      newEffect = newEffect.map((ccb, bbc) => bbc === newEffect.length - 1 ? ccb.replace(/<br>$/, '') : ccb).join('')
      if (!fs.existsSync(process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/${rest.id}.webp`)) rest.id = 99
      return {
        ...rest,
        effect: newEffect,
        icon: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/${rest.id}.webp`
      }
    })
    if (EchoJson.Intensity === "海啸级") Cons = "Cons4"
    else if (EchoJson.Intensity === "怒涛级") Cons = "Cons4"
    else if (EchoJson.Intensity === "巨浪级") Cons = "Cons3"
    else if (EchoJson.Intensity === "轻波级") Cons = "Cons1"
    else Cons = "Cons？"
    let data = {
      Name: EchoJson.Name,
      Type: EchoJson.Type,
      Rarity: EchoJson.Rarity,
      Intensity: EchoJson.Intensity,
      Place: EchoJson.Place,
      Code: EchoJson.Code,
      Cons: Cons
    }
    let skillDesc = EchoJson.affixData?.text?.replace(/\$\[(\d+)\]/g, (bbc, ccb) => {
      let cbc = EchoJson.affixData?.datas[ccb]
      if (!cbc) return bbc
      return cbc.every(bcb => bcb === cbc[0]) ? cbc[0] : `<span class="strong">${cbc.join('/')}</span>`
    })
    let imgs = {
      icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/artifact/${text[0]}/img.webp`,
      skill: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/artifact/${text[0]}/skill.webp`
    }
    let typeKey = {}
    if (skillDesc.includes("湮灭伤害")) typeKey.elem = "湮灭"
    else if (skillDesc.includes("衍射伤害")) typeKey.elem = "衍射"
    else if (skillDesc.includes("冷凝伤害")) typeKey.elem = "冷凝"
    else if (skillDesc.includes("热熔伤害")) typeKey.elem = "热熔"
    else if (skillDesc.includes("导电伤害")) typeKey.elem = "导电"
    else if (skillDesc.includes("气动伤害")) typeKey.elem = "气动"
    else if (skillDesc.includes("物理伤害")) typeKey.elem = "物理"
    else typeKey.elem = "无"
    if (skillDesc.includes("幻形")) typeKey.skill = "幻形"
    else if (skillDesc.includes("召唤")) typeKey.skill = "召唤"
    else if (skillDesc.includes("发动")) typeKey.skill = "增益"
    else typeKey.skill = "其他"
    if (skillDesc.includes("对策技")) typeKey.key = "对策技"
    else if (skillDesc.includes("特殊技")) typeKey.key = "特殊技"
    else if (skillDesc.includes("定身")) typeKey.key = "定身"
    else if (skillDesc.includes("逆势回击")) typeKey.key = "逆势回击"
    else if (skillDesc.includes("不会受到伤害")) typeKey.key = "金身"
    else typeKey.key = "无"
    return {
      data: data,
      imgs: imgs,
      Group: Group,
      skillDesc: skillDesc,
      type: typeKey
    }
  }

  async McMonster (text) {
    let MonsterJson, res, attr = []
    try {
      MonsterJson = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/monster/${text[0]}/data.json`, 'utf8')
      MonsterJson = JSON.parse(MonsterJson)
    } catch (err) {
      console.warn("遇到了些问题，若重试后仍有此问题建议重新更新数据")
      console.warn(err)
      return false
    }
    let eleKey = {
      "0": "物理",
      "1": "冷凝",
      "2": "热熔",
      "3": "导电",
      "4": "气动",
      "5": "衍射",
      "6": "湮灭"
    }
    let rarKey = {
      "1": "轻波级",
      "2": "巨浪级",
      "3": "怒涛级",
      "4": "海啸级"
    }
    if (MonsterJson.descAll.length > 0 && /^该敌人.+?伤害抗性提高。$/.test(MonsterJson.descAll[0])) MonsterJson.descAll.shift()
    let MosData = {
      name: MonsterJson.name,
      desc: MonsterJson.desc,
      descAll: MonsterJson.descAll,
      rarity: rarKey[MonsterJson.rarity],
      element: eleKey[MonsterJson.element],
      echo: MonsterJson.echo,
    }
    let base = {
      Mass: MonsterJson.attr.Mass,
      WeakTime: MonsterJson.attr.WeakTime,
      ParalysisTime: MonsterJson.attr.ParalysisTime,
    }
    let imgs = {
      icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/monster/${text[0]}/icon.webp`,
    }
    if (MonsterJson.attr.Res.PhyRes) {
      res = [
        {
          name: "物理抗性",
          num: MonsterJson.attr.Res.PhyRes / 100 + "%",
          key: "phy",
          icon: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/0.webp`,
        },
        {
          name: "冷凝抗性",
          num: MonsterJson.attr.Res.GlaRes / 100 + "%",
          key: "gal",
          icon: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/1.webp`,
        },
        {
          name: "热熔抗性",
          num: MonsterJson.attr.Res.FusRes / 100 + "%",
          key: "fus",
          icon: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/2.webp`,
        },
        {
          name: "导电抗性",
          num: MonsterJson.attr.Res.EleRes / 100 + "%",
          key: "ele",
          icon: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/3.webp`,
        },
        {
          name: "气动抗性",
          num: MonsterJson.attr.Res.AerRes / 100 + "%",
          key: "are",
          icon: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/4.webp`,
        },
        {
          name: "衍射抗性",
          num: MonsterJson.attr.Res.SpeRes / 100 + "%",
          key: "spe",
          icon: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/5.webp`,
        },
        {
          name: "湮灭抗性",
          num: MonsterJson.attr.Res.HavRes / 100 + "%",
          key: "hav",
          icon: process.cwd() + `/plugins/liangshi-calc/resources/wiki/Wuthering Waves/echoKey/6.webp`,
        }
      ]
    }
    let attrKey = [1, 20, 40, 60, 80, 90, 95, 100, 105, 110, 115, 120]
    if (MonsterJson.attr.hp[0]) {
      for (let i = 0; i < 120; i++) {
        if (attrKey.includes(i + 1)) {
          attr.push({
            num: i + 1,
            hp: MonsterJson.attr.hp[i],
            def: MonsterJson.attr.def[i],
            atk: MonsterJson.attr.atk[i],
            hardness: MonsterJson.attr.hardness[i],
            rage: MonsterJson.attr.rage[i]
          })
        }
      }
    }
    return {
      data: MosData,
      base: base,
      res: res,
      attr: attr,
      imgs: imgs
    }
  }

  async McItem (text) {
    let ItemJson
    try {
      ItemJson = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/material/data.json`, 'utf8')
      ItemJson = JSON.parse(ItemJson)
    } catch (err) {
      console.warn("遇到了些问题，若重试后仍有此问题建议重新更新数据")
      console.warn(err)
      return false
    }
    ItemJson = ItemJson[text[0]]
    if (!ItemJson) return false
    let imgs = {
      icon: process.cwd() + `/plugins/miao-plugin/resources/meta-mc/material/${ItemJson.type}/${ItemJson.name}.webp`,
    }
    if (ItemJson.Source.length === 0) ItemJson.Source = ["未知"]
    if (ItemJson.Source.length < 5) ItemJson.Source = [...ItemJson.Source, ...Array(5 - ItemJson.Source.length).fill('')]
    return {
      data: {
        name: ItemJson.name,
        type: ItemJson.type,
        tag: ItemJson.tag,
        star: ItemJson.star,
        desc: ItemJson.Desc,
        source: ItemJson.Source,
      },
      bg: ItemJson.Bg,
      imgs: imgs
    }
  }

  async McName (Name) {
    if (Name.includes("专武")) {if (CharacterAlias.hasOwnProperty(Name.replace(/专武/g, ''))) return [exclusive[Name.replace(/专武/g, '')], "Weapon"];for (const [key, value] of Object.entries(CharacterAlias)) {if (value.split(',').map(part => part.trim()).includes(Name.replace(/专武/g, ''))) {Name = key; break}} return [exclusive[Name], "Weapon"]}
    if (Name.includes("敌人")) {
      if (MonsterAlias.hasOwnProperty(Name.replace(/敌人/g, ''))) return [Name.replace(/敌人/g, ''), "Monster"]
      for (const [key, value] of Object.entries(MonsterAlias)) { if (value.split(',').map(part => part.trim()).includes(Name.replace(/敌人/g, ''))) return [key, "Monster"]}
      if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/monster/${Name.replace(/敌人/g, '')}/data.json`)) return [Name.replace(/敌人/g, ''), "Monster"]
    }
    if (CharacterAlias.hasOwnProperty(Name)) return [Name, "Character"]
    for (const [key, value] of Object.entries(CharacterAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Character"]}
    if (WeaponAlias.hasOwnProperty(Name)) return [Name, "Weapon"]
    for (const [key, value] of Object.entries(WeaponAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Weapon"]}
    if (EchoAlias.hasOwnProperty(Name)) return [Name, "Echo"]
    for (const [key, value] of Object.entries(EchoAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Echo"]}
    if (MonsterAlias.hasOwnProperty(Name)) return [Name, "Monster"]
    for (const [key, value] of Object.entries(MonsterAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Monster"]}
    if (ItemAlias.hasOwnProperty(Name)) return [Name, "Item"]
    for (const [key, value] of Object.entries(ItemAlias)) { if (value.split(',').map(part => part.trim()).includes(Name)) return [key, "Item"]}
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/character/${Name}/data.json`)) return [Name, "Character"]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/broadblade/${Name}/data.json`)) return [Name, "Weapon"]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/gauntlets/${Name}/data.json`)) return [Name, "Weapon"]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/pistols/${Name}/data.json`)) return [Name, "Weapon"]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/projection/${Name}/data.json`)) return [Name, "Weapon"]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/rectifier/${Name}/data.json`)) return [Name, "Weapon"]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/weapon/sword/${Name}/data.json`)) return [Name, "Weapon"]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/artifact/${Name}/data.json`)) return [Name, "Echo"]
    if (fs.existsSync(`./plugins/miao-plugin/resources/meta-mc/monster/${Name}/data.json`)) return [Name, "Monster"]
    try {
      let ItemJson = fs.readFileSync(`./plugins/miao-plugin/resources/meta-mc/material/data.json`, 'utf8')
      ItemJson = JSON.parse(ItemJson)
      if (ItemJson[Name] !== undefined) return [Name, "Item"]
    } catch (err) {
      return [Name, "false"]
    }
    return [Name, "false"]
  }

}
