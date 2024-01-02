/** ************ 【Yunzai功能（开启使用喵喵版功能）】 ************* */
// #角色 #UID
export const avatarList = false

// #刻晴 #老婆
export const avatarCard = true

// #深渊
export const uploadAbyssData = true

// #练度统计
export const profileStat = true

// #帮助 #菜单
export const help = true

// #抽卡分析 #抽卡统计
export const gachaStat = true

// 戳一戳展示角色卡片
export const avatarPoke = false

/** ************ 【角色面板相关设置】 ************* */
// 面板查询
export const avatarProfile = true

// 面板替换
export const profileChange = true

// 群内的面板伤害及圣遗物排名与查看功能，默认关闭。请根据群友心理素质自行决定是否开启
export const groupRank = true

// 参与排名的限制条件：1:无限制 2:有CK 3:有16个角色或有CK 4:有御三家(安柏&凯亚&丽莎)或有CK 5:有16个角色+御三家或有CK。 若改变设置请根据情况决定是否需要【#重置排名】
export const groupRankLimit = 4

// 可选值5~30，建议15。设置高排名人数会提高图片的长度，图片较大可能会影响渲染与发送速度
export const rankNumber = 10

// 面板服务选择：0:自动，1:喵Api(需具备Token)， 2:Enka-API， 3:MiniGG-Api, 4:Hutao-Enka代理。如设置三位数字则为分服务器设置，按顺序分别为 国服/B服/外服，例如112代表国服B服Miao,国外Enka
export const profileServer = 343

//星铁面板服务选择：0:自动，1:喵Api(需具备Token)， 2:Mihomo， 3:Avocado(鳄梨), 4:EnkaHSR。如设置三位数字则为分服务器设置，按顺序分别为 国服/B服/外服，例如114代表国服B服Miao,国外Enka
export const srProfileServer = 0

// 开启彩蛋图（三皇冠/ACE/满命）及自定义面板图，关闭使用官方立绘
export const costumeSplash = true

// 伤害计算包含组队Buff。目前为测试阶段，数据可能不准确，请慎重开启。数据为固定Buff而非真实面板数据，最终计算数值可能有偏差。开启后请重启喵喵
export const teamCalc = true

// liangshi版的伤害计算展示。开启后请重启喵喵
export const calcLiang = true

// liangshi版超全伤害计算展示。开启后请重启喵喵
export const calcLiangQ = false

// liangshi版圣遗物评分展示。开启后请重启喵喵
export const artisLiang = false

// liangshi版自适应评分展示。开启后请重启喵喵
export const artisLiang = false

// 可选值4~100，建议28，最终圣遗物数量取决于面板内圣遗物数量。设置高圣遗物数量会提高图片的长度，图片较大可能会影响渲染与发送速度
export const artisNumber = 100

/** ************ 【角色资料与信息查询】 ************* */
// #刻晴图鉴 的图鉴信息
export const charWiki = true

// #刻晴天赋/#刻晴命座 的天赋信息
export const charWikiTalent = true

// 未实装角色数据
export const notReleasedData = true

// 角色图片
export const charPic = true

// Q版角色头像
export const qFace = false

// 启用后会启用角色图及增量包中的小清新图像，勇士啊，你准备好了吗
export const charPicSe = false

/** ************ 【系统设置】 ************* */
// 可选值50~200，建议100。设置高精度会提高图片的精细度，但因图片较大可能会影响渲染与发送速度
export const renderScale = 100

// 允许获取原图，0:不允许, 1:仅允许角色图, 2:仅允许面板图, 3:开启
export const originalPic = 0

// 根据语言习惯设置数字分组，如千位组设为3，万位组设为4
export const commaGroup = 3
