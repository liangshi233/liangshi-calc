import plugin from '../../../lib/plugins/plugin.js';
import fs from 'node:fs';
import path from 'path'

const _path = process.cwd()

export class allSetting extends plugin {
    constructor() {
        super({
            name: '插件初始化',
            dsc: '初始化',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: '^#?梁氏([，,])?启动([！!])?$',
                    fnc: 'liangshiStart'
                },
                {
                    reg: '^#?梁氏(恢复|复)(原|原有|原来的)?配置(文件)?$',
                    fnc: 'liangshiByebye'
                },
                {
                    reg: '^#?(梁氏|liangshi)?(刷新|重置|初始化|更新)预设面板$',
                    fnc: 'panelStart'
                }/*,
                {
                    reg: '^#?(梁氏|liangshi)开启(武器|weapon|额外武器|测试武器)拓展$',
                    fnc: 'weaponStart'
                },
                {
                    reg: '^#?(梁氏|liangshi)开启(主角|角色|元素主角)拓展$',
                    fnc: 'ysStart'
                }*/
            ]
        })
    }
    async liangshiStart() {
        /** 不是主人则阻挡不再往下执行 */
        if (!this.e.isMaster) { return true }
        /** 备份原文件，防止后悔 */
        const liangshiData = path.join(`${_path}/data`, `liangshiData`)
        if (!fs.existsSync(liangshiData)) {
            fs.mkdirSync(liangshiData)
        }
        /** 定义 */
        const miaoFile0 = path.join(`${_path}/plugins/miao-plugin/config`, `cfg.js`)
        const miaoFile1 = path.join(`${_path}/plugins/miao-plugin/config/system`, `cfg_system.js`)
        const miaoFile2 = path.join(`${_path}/plugins/miao-plugin/models`, `ProfileDmg.js`)
        /** 定义 */
        const dataFile0 = path.join(`${_path}/data/liangshiData`, `cfg.js`)
        const dataFile1 = path.join(`${_path}/data/liangshiData`, `cfg_system.js`)
        const dataFile2 = path.join(`${_path}/data/liangshiData`, `ProfileDmg.js`)
        /** 检查是否已经备份过原文件(cv from Useless-Plugin) */
        if (!fs.existsSync(dataFile1)) {
            /** 备份文件 */
            fs.copyFile(miaoFile0, dataFile0, (err) => {
                if (err) throw err;
            })
            fs.copyFile(miaoFile1, dataFile1, (err) => {
                if (err) throw err;
            })
            fs.copyFile(miaoFile2, dataFile2, (err) => {
                if (err) throw err;
            })
            /** 定义 */
            const liangshiFile1 = path.join(`${_path}/plugins/liangshi-calc/replace`, `cfg_system.js`)
            const liangshiFile2 = path.join(`${_path}/plugins/liangshi-calc/replace`, `ProfileDmg.js`)
            /** 写入新配置 */
            fs.copyFile(liangshiFile1, miaoFile1, (err) => {
                if (err) throw err;
            })
            fs.copyFile(liangshiFile2, miaoFile2, (err) => {
                if (err) throw err;
            })
            await this.e.reply(`已保存原配置文件至云崽根目录/data/liangshiData内！\n请重启机器人以启用梁氏！\n重启后发送【#喵喵设置】查看新设置！\n如果反悔了想恢复原来的请发送\n【#梁氏恢复配置】`, true)
            return true
        } else {
            await this.e.reply(`已经备份过了！请勿重复备份！`, true)
            return true
        }
        /** 写入开关 */
        /* byd跟着readme多写的东西👇👇👇
        fs.readFile(`${_path}/plugins/miao-plugin/config/cfg.js`, 'utf8', function (err, data) {
            if (err) throw err;
            const teamLiang = `\n// 梁氏开关\nexport const teamLiang = true`;
            const position = data.indexOf('export const artisNumber = ');
            const endPosition = data.indexOf('\n', position);
            const newData = data.slice(0, endPosition + 1) + teamLiang + '\n' + data.slice(endPosition + 1);
            fs.writeFile(`${_path}/plugins/miao-plugin/config/cfg.js`, newData, function (err) {
                if (err) throw err;
            })
        })
        */
    }
    async liangshiByebye() {
        /** 不是主人则阻挡不再往下执行 */
        if (!this.e.isMaster) { return true }
        /** 检查是否已备份 */
        const liangshiData = path.join(`${_path}/data`, `liangshiData`)
        if (!fs.existsSync(liangshiData)) {
            await this.e.reply(`你似乎还没备份过哦~`, true)
            return true
        }
        /** 定义 */
        const miaoFile0 = path.join(`${_path}/plugins/miao-plugin/config`, `cfg.js`)
        const miaoFile1 = path.join(`${_path}/plugins/miao-plugin/config/system`, `cfg_system.js`)
        const miaoFile2 = path.join(`${_path}/plugins/miao-plugin/models`, `ProfileDmg.js`)
        /** 定义 */
        const dataFile0 = path.join(`${_path}/data/liangshiData`, `cfg.js`)
        const dataFile1 = path.join(`${_path}/data/liangshiData`, `cfg_system.js`)
        const dataFile2 = path.join(`${_path}/data/liangshiData`, `ProfileDmg.js`)
        /** 写入原文件 */
        if (fs.existsSync(dataFile1)) {
            fs.copyFile(dataFile0, miaoFile0, (err) => {
                if (err) throw err;
            })
            fs.copyFile(dataFile1, miaoFile1, (err) => {
                if (err) throw err;
            })
            fs.copyFile(dataFile2, miaoFile2, (err) => {
                if (err) throw err;
            })
            /** 删除liangshiData */
            const liangshiData = path.join(`${_path}/data`, `liangshiData`);
            if (fs.existsSync(liangshiData) && fs.lstatSync(liangshiData).isDirectory()) {
                const files = fs.readdirSync(liangshiData);
                /** 因文件夹内存在文件，不能直接删除，需采用递归删除法 */
                files.forEach(file => {
                    const currentPath = path.join(liangshiData, file);
                    if (fs.lstatSync(currentPath).isDirectory()) {
                        const subFiles = fs.readdirSync(currentPath);
                        subFiles.forEach(subFile => {
                            const subFilePath = path.join(currentPath, subFile);
                            fs.unlinkSync(subFilePath);
                        });
                        fs.rmdirSync(currentPath);
                    } else {
                        fs.unlinkSync(currentPath);
                    }
                });
                /** 删除liangshiData文件夹 */
                fs.rmdirSync(liangshiData);
                await this.e.reply(`梁氏要跟你说拜拜啦~`, true);
                return true
            }
        }
        await this.e.reply(`你似乎还没有过任何备份呢？`, true)
        return true
    }
    async panelStart() {
        /** 不是主人则阻挡不再往下执行 */
        if (!this.e.isMaster) { return true }
        /** 定义 */
//      const miaoFile0 = path.join(`${_path}/data/UserData`, `100000000.json`)
        const miaoFile1 = path.join(`${_path}/data/UserData`, `100000001.json`)
        const miaoFile2 = path.join(`${_path}/data/UserData`, `100000002.json`)
        const miaoFile3 = path.join(`${_path}/data/UserData`, `100000003.json`)
        const miaoFile4 = path.join(`${_path}/data/UserData`, `100000004.json`)
        const miaoFile5 = path.join(`${_path}/data/UserData`, `100000005.json`)
        const miaoFile6 = path.join(`${_path}/data/PlayerData/sr`, `100000000.json`)
        const miaoFile7 = path.join(`${_path}/plugins/example`, `预设面板.js`)
        const miaoFile8 = path.join(`${_path}/plugins/example`, `预设替换.js`)
//      const liangshiFile0 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000000.json`)
        const liangshiFile1 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000001.json`)
        const liangshiFile2 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000002.json`)
        const liangshiFile3 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000003.json`)
        const liangshiFile4 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000004.json`)
        const liangshiFile5 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/UserData`, `100000005.json`)
        const liangshiFile6 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01/PlayerData/sr`, `100000000.json`)
        const liangshiFile7 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01`, `预设面板.js`)
        const liangshiFile8 = path.join(`${_path}/plugins/liangshi-calc/replace/data/01`, `预设替换.js`)
        /** 写入新配置 */
            fs.copyFile(liangshiFile1, miaoFile1, (err) => {
                if (err) throw err;
            })
            fs.copyFile(liangshiFile2, miaoFile2, (err) => {
                if (err) throw err;
            })
            fs.copyFile(liangshiFile3, miaoFile3, (err) => {
              if (err) throw err;
            })
            fs.copyFile(liangshiFile4, miaoFile4, (err) => {
              if (err) throw err;
            })
            fs.copyFile(liangshiFile5, miaoFile5, (err) => {
              if (err) throw err;
            })
            fs.copyFile(liangshiFile6, miaoFile6, (err) => {
              if (err) throw err;
            })
            fs.copyFile(liangshiFile7, miaoFile7, (err) => {
              if (err) throw err;
            })
            fs.copyFile(liangshiFile8, miaoFile8, (err) => {
              if (err) throw err;
            })
            await this.e.reply(`预设面板刷新完成发送[#预设面板]查看预设面板指令`, true)
            return true
        }
}