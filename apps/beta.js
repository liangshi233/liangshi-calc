const _path = process.cwd();
export class example extends plugin {
	constructor () {
	  super({
		name: '测试角色极限面板',
		dsc: '测试角色极限面板',
		event: 'message',
		priority: -1,
		rule: [
// 每个角色已分开，不需要此功能或不需要的角色请将对应的两个 // 删除
//  /*
		  {
			reg: '^#?(知更鸟(极限面板|面板100000000)|极限知更鸟)$',
			fnc: 'mb'
		  }
//  */
/*
		  ,
		  {
			reg: '^#?(知更鸟(极限伤害|伤害100000000))$',
			fnc: 'sh'
		  }
*/
//  /*
		  ,
		  {
			reg: '^#?((开拓者·毁灭|开拓者•毁灭|开拓者毁灭|毁灭开拓者|物理开拓者|开拓者物理|毁灭主|物理主|物主)(极限面板|面板100000000))$',
			fnc: 'wlktz'
		  }
//  */
//  /*
		  ,
		  {
			reg: '^#?((开拓者·存护|开拓者•存护|开拓者存护|存护开拓者|火开拓者|开拓者火|存护主)(极限面板|面板100000000))$',
			fnc: 'chktz'
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

 async wlktz(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/3.bmp`))
  return
 }

 async chktz(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/4.bmp`))
  return
 }

}

