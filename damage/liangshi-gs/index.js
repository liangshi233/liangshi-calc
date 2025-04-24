import { mainAttrData } from './mainAttr.js'
import { ObTalentName } from './TalentName.js'
import { RankingKey } from './defDmgKey.js'
import { TeamJson } from './TeamJson.js'

import { TeamBuff_Kamisato_Ayaka } from './神里绫华/TeamBuff.js'
import { TeamBuff_Jean } from './琴/TeamBuff.js'
import { TeamBuff_Lisa } from './丽莎/TeamBuff.js'
import { TeamBuff_Barbara } from './芭芭拉/TeamBuff.js'
import { TeamBuff_Kaeya } from './凯亚/TeamBuff.js'
import { TeamBuff_Diluc } from './迪卢克/TeamBuff.js'
import { TeamBuff_Razor } from './雷泽/TeamBuff.js'
import { TeamBuff_Amber } from './安柏/TeamBuff.js'
import { TeamBuff_Venti } from './温迪/TeamBuff.js'
import { TeamBuff_Xiang_Ling } from './香菱/TeamBuff.js'
import { TeamBuff_Bei_Dou } from './北斗/TeamBuff.js'
import { TeamBuff_Xing_Qiu } from './行秋/TeamBuff.js'
import { TeamBuff_Xiao } from './魈/TeamBuff.js'
import { TeamBuff_Ning_Guang } from './凝光/TeamBuff.js'
import { TeamBuff_Klee } from './可莉/TeamBuff.js'
import { TeamBuff_Zhong_Li } from './钟离/TeamBuff.js'
import { TeamBuff_Fischl } from './菲谢尔/TeamBuff.js'
import { TeamBuff_Bennett } from './班尼特/TeamBuff.js'
import { TeamBuff_Tartaglia } from './达达利亚/TeamBuff.js'
import { TeamBuff_Noelle } from './诺艾尔/TeamBuff.js'
import { TeamBuff_Qi_Qi } from './七七/TeamBuff.js'
import { TeamBuff_Chong_Yun } from './重云/TeamBuff.js'
import { TeamBuff_Gan_Yu } from './甘雨/TeamBuff.js'
import { TeamBuff_Albedo } from './阿贝多/TeamBuff.js'
import { TeamBuff_Diona } from './迪奥娜/TeamBuff.js'
import { TeamBuff_Mona } from './莫娜/TeamBuff.js'
import { TeamBuff_Ke_Qing } from './刻晴/TeamBuff.js'
import { TeamBuff_Sucrose } from './砂糖/TeamBuff.js'
import { TeamBuff_Xin_Yan } from './辛焱/TeamBuff.js'
import { TeamBuff_Rosaria } from './罗莎莉亚/TeamBuff.js'
import { TeamBuff_Hu_Tao } from './胡桃/TeamBuff.js'
import { TeamBuff_Kaedehara_Kazuha } from './枫原万叶/TeamBuff.js'
import { TeamBuff_Yanfei } from './烟绯/TeamBuff.js'
import { TeamBuff_Yoimiya } from './宵宫/TeamBuff.js'
import { TeamBuff_Thoma } from './托马/TeamBuff.js'
import { TeamBuff_Eula } from './优菈/TeamBuff.js'
import { TeamBuff_Raiden_Shogun } from './雷电将军/TeamBuff.js'
import { TeamBuff_Sayu } from './早柚/TeamBuff.js'
import { TeamBuff_Sangonomiya_Kokomi } from './珊瑚宫心海/TeamBuff.js'
import { TeamBuff_Gorou } from './五郎/TeamBuff.js'
import { TeamBuff_Kujou_Sara } from './九条裟罗/TeamBuff.js'
import { TeamBuff_Arataki_Itto } from './荒泷一斗/TeamBuff.js'
import { TeamBuff_Yae_Miko } from './八重神子/TeamBuff.js'
import { TeamBuff_Shikanoin_Heizou } from './鹿野院平藏/TeamBuff.js'
import { TeamBuff_Ye_Lan } from './夜兰/TeamBuff.js'
import { TeamBuff_Kirara } from './绮良良/TeamBuff.js'
import { TeamBuff_Aloy } from './埃洛伊/TeamBuff.js'
import { TeamBuff_Shen_He } from './申鹤/TeamBuff.js'
import { TeamBuff_Yun_Jin } from './云堇/TeamBuff.js'
import { TeamBuff_Kuki_Shinobu } from './久岐忍/TeamBuff.js'
import { TeamBuff_Kamisato_Ayato } from './神里绫人/TeamBuff.js'
import { TeamBuff_Collei } from './柯莱/TeamBuff.js'
import { TeamBuff_Dori } from './多莉/TeamBuff.js'
import { TeamBuff_Tighnari } from './提纳里/TeamBuff.js'
import { TeamBuff_Nilou } from './妮露/TeamBuff.js'
import { TeamBuff_Cyno } from './赛诺/TeamBuff.js'
import { TeamBuff_Candace } from './坎蒂丝/TeamBuff.js'
import { TeamBuff_Nahida } from './纳西妲/TeamBuff.js'
import { TeamBuff_Layla } from './莱依拉/TeamBuff.js'
import { TeamBuff_Wanderer } from './流浪者/TeamBuff.js'
import { TeamBuff_Faruzan } from './珐露珊/TeamBuff.js'
import { TeamBuff_Yao_Yao } from './瑶瑶/TeamBuff.js'
import { TeamBuff_Alhaitham } from './艾尔海森/TeamBuff.js'
import { TeamBuff_Dehya } from './迪希雅/TeamBuff.js'
import { TeamBuff_Mika } from './米卡/TeamBuff.js'
import { TeamBuff_Kaveh } from './卡维/TeamBuff.js'
import { TeamBuff_Bai_Zhu } from './白术/TeamBuff.js'
import { TeamBuff_Lynette } from './琳妮特/TeamBuff.js'
import { TeamBuff_Lyney } from './林尼/TeamBuff.js'
import { TeamBuff_Freminet } from './菲米尼/TeamBuff.js'
import { TeamBuff_Wriothesley } from './莱欧斯利/TeamBuff.js'
import { TeamBuff_Neuvillette } from './那维莱特/TeamBuff.js'
import { TeamBuff_Charlotte } from './夏洛蒂/TeamBuff.js'
import { TeamBuff_Furina } from './芙宁娜/TeamBuff.js'
import { TeamBuff_Chevreuse } from './夏沃蕾/TeamBuff.js'
import { TeamBuff_Navia } from './娜维娅/TeamBuff.js'
import { TeamBuff_Gaming } from './嘉明/TeamBuff.js'
import { TeamBuff_Xian_Yun } from './闲云/TeamBuff.js'
import { TeamBuff_Chiori } from './千织/TeamBuff.js'
import { TeamBuff_Sigewinne } from './希格雯/TeamBuff.js'
import { TeamBuff_Arlecchino } from './阿蕾奇诺/TeamBuff.js'
import { TeamBuff_Sethos } from './赛索斯/TeamBuff.js'
import { TeamBuff_Clorinde } from './克洛琳德/TeamBuff.js'
import { TeamBuff_Emilie } from './艾梅莉埃/TeamBuff.js'
import { TeamBuff_Kachina } from './卡齐娜/TeamBuff.js'
import { TeamBuff_Mualani } from './玛拉妮/TeamBuff.js'
import { TeamBuff_Kinich } from './基尼奇/TeamBuff.js'
import { TeamBuff_Xilonen } from './希诺宁/TeamBuff.js'
import { TeamBuff_Ororon } from './欧洛伦/TeamBuff.js'
import { TeamBuff_Chasca } from './恰斯卡/TeamBuff.js'
import { TeamBuff_Citlali } from './茜特菈莉/TeamBuff.js'
import { TeamBuff_Mavuika } from './玛薇卡/TeamBuff.js'
import { TeamBuff_Lan_Yan } from './蓝砚/TeamBuff.js'
import { TeamBuff_Mizuki } from './梦见月瑞希/TeamBuff.js'
import { TeamBuff_Iansan } from './伊安珊/TeamBuff.js'
import { TeamBuff_Varesa } from './瓦雷莎/TeamBuff.js'
import { TeamBuff_Escoffier } from './爱可菲/TeamBuff.js'
import { TeamBuff_Ifa } from './伊法/TeamBuff.js'

let TeamBuff = {
  TeamBuff_Kamisato_Ayaka,
  TeamBuff_Jean,
  TeamBuff_Lisa,
  TeamBuff_Barbara,
  TeamBuff_Kaeya,
  TeamBuff_Diluc,
  TeamBuff_Razor,
  TeamBuff_Amber,
  TeamBuff_Venti,
  TeamBuff_Xiang_Ling,
  TeamBuff_Bei_Dou,
  TeamBuff_Xing_Qiu,
  TeamBuff_Xiao,
  TeamBuff_Ning_Guang,
  TeamBuff_Klee,
  TeamBuff_Zhong_Li,
  TeamBuff_Fischl,
  TeamBuff_Bennett,
  TeamBuff_Tartaglia,
  TeamBuff_Noelle,
  TeamBuff_Qi_Qi,
  TeamBuff_Chong_Yun,
  TeamBuff_Gan_Yu,
  TeamBuff_Albedo,
  TeamBuff_Diona,
  TeamBuff_Mona,
  TeamBuff_Ke_Qing,
  TeamBuff_Sucrose,
  TeamBuff_Xin_Yan,
  TeamBuff_Rosaria,
  TeamBuff_Hu_Tao,
  TeamBuff_Kaedehara_Kazuha,
  TeamBuff_Yanfei,
  TeamBuff_Yoimiya,
  TeamBuff_Thoma,
  TeamBuff_Eula,
  TeamBuff_Raiden_Shogun,
  TeamBuff_Sayu,
  TeamBuff_Sangonomiya_Kokomi,
  TeamBuff_Gorou,
  TeamBuff_Kujou_Sara,
  TeamBuff_Arataki_Itto,
  TeamBuff_Yae_Miko,
  TeamBuff_Shikanoin_Heizou,
  TeamBuff_Ye_Lan,
  TeamBuff_Kirara,
  TeamBuff_Aloy,
  TeamBuff_Shen_He,
  TeamBuff_Yun_Jin,
  TeamBuff_Kuki_Shinobu,
  TeamBuff_Kamisato_Ayato,
  TeamBuff_Collei,
  TeamBuff_Dori,
  TeamBuff_Tighnari,
  TeamBuff_Nilou,
  TeamBuff_Cyno,
  TeamBuff_Candace,
  TeamBuff_Nahida,
  TeamBuff_Layla,
  TeamBuff_Wanderer,
  TeamBuff_Faruzan,
  TeamBuff_Yao_Yao,
  TeamBuff_Alhaitham,
  TeamBuff_Dehya,
  TeamBuff_Mika,
  TeamBuff_Kaveh,
  TeamBuff_Bai_Zhu,
  TeamBuff_Lynette,
  TeamBuff_Lyney,
  TeamBuff_Freminet,
  TeamBuff_Wriothesley,
  TeamBuff_Neuvillette,
  TeamBuff_Charlotte,
  TeamBuff_Furina,
  TeamBuff_Chevreuse,
  TeamBuff_Navia,
  TeamBuff_Gaming,
  TeamBuff_Xian_Yun,
  TeamBuff_Chiori,
  TeamBuff_Sigewinne,
  TeamBuff_Arlecchino,
  TeamBuff_Sethos,
  TeamBuff_Clorinde,
  TeamBuff_Emilie,
  TeamBuff_Kachina,
  TeamBuff_Mualani,
  TeamBuff_Kinich,
  TeamBuff_Xilonen,
  TeamBuff_Ororon,
  TeamBuff_Chasca,
  TeamBuff_Citlali,
  TeamBuff_Mavuika,
  TeamBuff_Lan_Yan,
  TeamBuff_Mizuki,
  TeamBuff_Iansan,
  TeamBuff_Varesa,
  TeamBuff_Escoffier,
  TeamBuff_Ifa
}

export { mainAttrData, ObTalentName, RankingKey, TeamBuff, TeamJson }
