let replace_list = {
	//预设面板
	'极限': '极限',
	'核爆': '核爆',
	'辅助': '辅助',
	'平民': '平民',
	'毕业': '毕业',
	'试用': '试用',
/*
    下面的是为了方便替换圣遗物的，可根据需要进行删改
	'极限': '100000000',
*/
	// '核爆面板': '100000001',
	// '辅助面板': '100000002',
	// '平民面板': '100000003',
	// '毕业面板': '100000004',
	// '试用面板': '100000005',
};

export class xiaofei_input_replace extends plugin {
	constructor() {
		super({
			name: '输入替换',
			dsc: '',
			event: 'message',
			priority: -10000
		})
	}
	async accept(e) {
		for (let key in replace_list) {
			try {
				let reg = RegExp(key);
				if (!reg.test(e.msg)) continue;
				let msg = e.msg.split('换')
				console.log(msg[0],msg[1],msg[2])
				if (msg.length > 1) {
                 let msgone = await set(e,msg[0], true)
				 let msgtwo = await set(e,msg[1], false)
				 e.msg = msgone + '换' + msgtwo
				} else{
				e.msg = await set(e,e.msg, true)
				}
			} catch (err) { }
		}
		return false;
	}
}

async function set(e,msg, s) {
    msg = msg.replace(/#|极限|核爆|辅助|平民|毕业|试用|详情|详细/g, '')
    let mb = `${msg}${e.msg.includes('伤害') ? '': e.msg.includes('圣遗物') ? '' : 
	e.msg.includes('武器') ? '' : e.msg.includes('面板') ? '' : '面板'}`
    if (/极限/.test(e.msg)) {    
	        if (s)
	        msg =  `#${mb}100000000`
	        else
	        msg = `100000000${msg}`
	    }
    if (/核爆/.test(e.msg)) {    
		    if (s)
		    msg =  `#${mb}100000001`
	        else
		    msg = `100000001${msg}`
	    }
    if (/辅助/.test(e.msg)) {    
		    if (s)
		    msg =  `#${mb}100000002`
	        else
		    msg = `100000002${msg}`
	    }
    if (/平民/.test(e.msg)) {    
		    if (s)
		    msg =  `#${mb}100000003`
	        else
		    msg = `100000003${msg}`
	    }
    if (/毕业/.test(e.msg)) {    
		    if (s)
		    msg =  `#${mb}100000004`
	        else
		    msg = `100000004${msg}`
	    }
    if (/试用/.test(e.msg)) {
		    if (s)
		    msg =  `#${mb}100000005`
	        else
		    msg = `100000005${msg}`
	    }
    return msg
    }
