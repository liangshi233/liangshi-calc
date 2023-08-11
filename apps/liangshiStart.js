import plugin from '../../../lib/plugins/plugin.js';
import fs from 'node:fs';
import path from 'path'

const _path = process.cwd()

export class allSetting extends plugin {
    constructor() {
        super({
            name: '[for plugin]启动梁氏',
            dsc: '玩原神玩的',
            event: 'message',
            priority: 10,
            rule: [
                {
                    reg: '^#?梁氏([，,])?启动([！!])?$',
                    fnc: 'liangshiStart'
                },
                {
                    reg: '^#?梁氏(恢复|复)(原|原有|原来的)?配置(文件)?$',
                    fnc: 'liangshiByebye'
                }
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
            /** 下面这里其实是多此一举？算了，还是加上吧，水点行数也行啊 */
            const configLines = fs.readFileSync(`${miaoFile1}`, 'utf8').split('\n').length;
            const defLines = fs.readFileSync(`${dataFile1}`, 'utf8').split('\n').length;
            if (configLines > defLines) {
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
            /** 下面这里其实是多此一举？算了，还是加上吧，水点行数也行啊 */
            const configLines = fs.readFileSync(`${miaoFile1}`, 'utf8').split('\n').length;
            const defLines = fs.readFileSync(`${dataFile1}`, 'utf8').split('\n').length;
            if (configLines === defLines) {
                await this.e.reply(`不是，你都已经恢复过了还恢复呢？？！！`, true)
                return true
            } else {
                fs.copyFile(dataFile0, miaoFile0, (err) => {
                    if (err) throw err;
                })
                fs.copyFile(dataFile1, miaoFile1, (err) => {
                    if (err) throw err;
                })
                fs.copyFile(dataFile2, miaoFile2, (err) => {
                    if (err) throw err;
                })
                await this.e.reply(`梁氏要跟你说拜拜了哦~\n请重启恢复原文件！`, true)
                return true
            }
        }
    }
}