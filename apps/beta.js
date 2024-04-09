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
			reg: '^#?(知更鸟(极限面板|面板100000000)|极限知更鸟)$',
			fnc: 'mb'
		  }
//  */
/*
		  ,
		  {
			reg: '^#?(知更鸟(极限面板|面板100000000)|极限知更鸟)$',
			fnc: 'sh'
		  }
*/
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

