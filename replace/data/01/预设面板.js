
const _path = process.cwd();

 export class example extends plugin {
	constructor () {
	  super({
		/** 功能名称 */
		name: '预设面板',
		/** 功能描述 */
		dsc: '预设面板',
		event: 'message',
		/** 优先级，数字越小等级越高 */
		priority: 1,
		rule: [
		  {
			/** 命令正则匹配 */
			  reg: '^#*(预设面板)$', //匹配消息正则，命令正则
			/** 执行方法 */
			fnc: 'ysmb'
		  }
		]
	  })
	}
  


 async ysmb(e) {
	 let arr = ['【预设面板使用帮助】\n#**极限面板\n查看该角色理论最高期望伤害面板\n#**核爆面板\n查看该角色理论最高伤害面板\n#**辅助面板\n查看该角色理论最高辅助能力面板\n#**平民面板\n查看该角色约20个有效词条的基本参考面板\n#**毕业面板(咕咕中，尽快完成）\n查看该角色约28个有效词条的基本毕业面板\n#**试用面板(咕咕中，尽快完成）\n查看该角色在试用秘境中的面板\n不输入角色名称可查看该指令已支持的角色',
	];
        let RandomJd = arr[Math.floor(Math.random() * arr.length)];
        let msg = [
            RandomJd
        ];
        //发送消息
        e.reply(msg);
    return true; //返回true 阻挡消息不再往下
}

}

