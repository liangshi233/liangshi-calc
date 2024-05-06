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
  /*
		  {
			reg: '^#?(知更鸟(极限面板|面板100000000)|极限知更鸟)$',
			fnc: 'zgn'
		  }
  */
  /*
		  ,
		  {
			reg: '^#?(波提欧(极限面板|面板100000000)|极限波提欧)$',
			fnc: 'bto'
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
//  /*
		  ,
		  {
			reg: '^#?((开拓者·同谐|开拓者•同谐|开拓者同谐|同谐开拓者|虚数开拓者|开拓者虚数|同谐主)(极限面板|面板100000000))$',
			fnc: 'txktz'
		  }
//  */
  /*
		  ,
		  {
			reg: '^#?((克洛琳德|克洛琳|克洛|琳德|决斗代理人|克罗|林德|克罗琳德|Clorinde|clorinde)(极限面板|面板100000000))$',
			fnc: 'klld'
		  }
  */
  /*
		  ,
		  {
			reg: '^#?((希格雯|格雯|希格|护士长|美露辛|小美露辛|希格文|希格问|希个雯|Sigewinne|sigewinne)(极限面板|面板100000000))$',
			fnc: 'xgw'
		  }
  */
  /*
		  ,
		  {
			reg: '^#?((赛索斯|索斯|赛索|赛锁斯|赛索丝|塞索斯|小赛诺|Sethos|sethos)(极限面板|面板100000000))$',
			fnc: 'sss'
		  }
  */
		]
	  })
	}

 async zgn(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/1.bmp`))
  return
 }

 async bto(e) {
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

 async txktz(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/5.bmp`))
  return
 }

 async klld(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/10.bmp`))
  return
 }

 async xgw(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/11.bmp`))
  return
 }

 async sss(e) {
  e.reply(segment.image(`file:///${_path}/plugins/liangshi-calc/resources/12.bmp`))
  return
 }

}

