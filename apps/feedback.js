export class example extends plugin {
	constructor () {
	  super({
		name: '反馈',
		dsc: '反馈',
		event: 'message',
		priority: 8000,
		rule: [
		  {
			reg: '^#*(伤害计算拓展|伤害计算|计算|梁氏|liangshi)(插件)?(反馈|错误|有问题|不对)$',
			fnc: 'fk'
		  }
		]
	  })
	}

 async fk(e) {
 let msg = ['若 角色伤害计算/角色圣遗物评分/预设面板 出现问题或错误可点击下方链接留言反馈\nhttps://gitee.com/liangshi233/liangshi-calc/board\n如果您对 角色伤害计算/角色圣遗物评分/预设面板 有改进的意见也欢迎点击链接进行留言\n【使用方法：点击链接后选择[新建lssue]，在标题处填入你的 问题/建议 主题，在下方输入详细内容】\n【您提交的内容会在3小时内进行处理】'];
 e.reply(msg);
 return true;
}

}
