const _path = process.cwd();
export class example extends plugin {
	constructor () {
	  super({
		name: '测试角色极限面板',
		dsc: '测试角色极限面板',
		event: 'message',
		priority: -1,
		rule: [
// 不需要此功能请将下方两个 // 删除
//  /*
		  {
			  reg: '^#?(阿蕾奇诺|黑化优菈|黑优菈|黑暗优菈|仆人|arlecchino|Arlecchino|10000096)(面板100000000|极限面板)?$',
			fnc: 'mb'
		  },
		  {
			  reg: '^#?(阿蕾奇诺|黑化优菈|黑优菈|黑暗优菈|仆人|arlecchino|Arlecchino|10000096)(伤害100000000|极限伤害)?$',
			fnc: 'sh'
		  }
//  */
		]
	  })
	}

 async mb(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/1.bmp`))
  return
 }

 async sh(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/2.bmp`))
  return
 }

}

