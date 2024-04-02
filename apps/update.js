import { exec, execSync } from "child_process"
import common from "../../../lib/common/common.js"

const _path = process.cwd();
const plugin1 = 'liangshi-calc';
const pluginPath = `${_path}/plugins/${plugin1}`

export class updateMora extends plugin {
  constructor() {
    super({
      name: '[伤害计算拓展]更新',
      event: 'message',
      priority: 5000,
      rule: [
        {
          reg: "^#*梁氏(计算|插件)?(强制)?更新$",
          fnc: 'update'
        },
        {
          reg: '^#*梁氏(计算|插件)?更新日志$',
          fnc: 'updateLog'
        }
      ]
    })
  }

  async update(e) {
    let timer;
    if (!await this.checkAuth(e)) {
      return true;
    }
    let isForce = e.msg.includes("强制");
    let command = "git pull --no-rebase";
    if (isForce) {
      command = "git checkout . && git pull --no-rebase";
      e.reply("正在执行强制更新操作，请稍等");
    } else {
      e.reply("正在执行更新操作，请稍等");
    }
    exec(command, {
      cwd: pluginPath
    }, function(error, stdout, stderr) {
      //console.log(stdout);
      if (/Already up[ -]to[ -]date/.test(stdout)||stdout.includes("最新")) {
        e.reply("目前已经是最新版伤害计算拓展插件了~");
        return true;
      }
      if (error) {
        e.reply("更新失败：伤害计算拓展插件！\nError code: " + error.code + "\n" + error.stack + "\n 请稍后重试。");
        return true;
      }
      e.reply("伤害计算拓展插件更新成功，尝试重新启动Yunzai以应用更新...");
      timer && clearTimeout(timer);
      redis.set("mora:restart-msg", JSON.stringify({
        msg: "重启成功，新版伤害计算拓展插件已经生效",
        qq: e.user_id
      }), {
        EX: 30
      });
      timer = setTimeout(function() {
        let command = `npm run start`;
        if (process.argv[1].includes("pm2")) {
          command = `npm run restart`;
        }
        exec(command, function(error, stdout, stderr) {
          if (error) {
            e.reply("自动重启失败，请手动重启以应用新版伤害计算拓展插件。\nError code: " + error.code + "\n" +
              error.stack + "\n");
            Bot.logger.error('重启失败\n${error.stack}');
            return true;
          } else if (stdout) {
            Bot.logger.mark("重启成功，运行已转为后台，查看日志请用命令：pnpm run log");
            Bot.logger.mark("停止后台运行命令：npm stop");
            process.exit();
          }
        })
      }, 1000);
  
    });
    return true;
  }


  /**
   * 获取插件更新日志
   * @param {string} plugin 插件名称
   * @returns
   */
  async getLog(plugin = 'liangshi-calc') {
    let cm = 'git log  -20 --oneline --pretty=format:"%h||[%cd]  %s" --date=format:"%F %T"'
    if (plugin) {
      cm = `cd ./plugins/${plugin}/ && ${cm}`
    }

    let logAll
    try {
      logAll = await execSync(cm, { encoding: 'utf-8', windowsHide: true })
    } catch (error) {
      logger.error(error.toString())
      this.reply(error.toString())
    }

    if (!logAll) return false

    logAll = logAll.split('\n')

    let log = []
    for (let str of logAll) {
      str = str.split('||')
      if (str[0] == this.oldCommitId) break
      if (str[1].includes('Merge branch')) continue
      log.push(str[1])
    }
    let line = log.length
    log = log.join('\n\n')

    if (log.length <= 0) return ''

    let end = '更多详细信息，请前往gitee查看\nhttps://gitee.com/liangshi233/liangshi-calc'

    log = await common.makeForwardMsg(this.e, [log, end], `${plugin}更新日志，共${line}条`)

    return log
  }

  /*
   *更新日志的方法
   */
  async updateLog() {
    let log = await this.getLog()
    await this.reply(log)
  }

  async checkAuth(e) {
    return await e.checkAuth({
      auth: "master",
      replyMsg: `哒咩，你可不是老娘的master
      (*/ω＼*)`
    });
  }
}



