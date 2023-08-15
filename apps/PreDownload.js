import plugin from "../../../lib/plugins/plugin.js";
import fetch from "node-fetch";

export class PreDownload extends plugin {
  constructor() {
    super({
      name: "原神预下载占用",
      dsc: "展示各平台当预下载需要预留储存情况",
      event: "message",
      priority: 20000,
      rule: [{
        reg: "^#(原神)+(预下载|预下载占用|预下载空间占用|预下载储存占用)$",
        fnc: "PreDownload",
      }],
    });
  }

  async PreDownload() {
    //暂时使用文字版展示，后续将根据使用情况确定是否修改为图片版
    await this.reply(`4.0.0版本预下载\n开放时间:2023年8月14日12：00（UTC+8）\n PC（桌面端）\n 34.06GB（4语音） \n Android （移动端） \n 10.54GB （4语音） \n IOS （移动端） \n 10.20GB （4语音）  \n PlayStation 5 （主机端）\n 该平台不支持预下载 \n PlayStation 4 Pro （主机端）\n 该平台不支持预下载 \n PlayStation 4 （主机端）\n 该平台不支持预下载 `)
    return true
  }
}
