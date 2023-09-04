import plugin from '../../../lib/plugins/plugin.js';
import fs from 'node:fs';
import path from 'path'

const _path = process.cwd()

export class allSetting extends plugin {
    constructor() {
        super({
            name: '重置预设面板',
            dsc: '初始化',
            event: 'message',
            priority: 50000,
            rule: [
                {
                    reg: '^#?(梁氏|liangshi)?(刷新|重置|初始化|更新)预设面板$',
                    fnc: 'ysStart'
                }
            ]
        })
    }
    async ysStart() {
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
