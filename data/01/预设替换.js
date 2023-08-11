let replace_list = {
	'极限': '极限',
	// '极限面板': '面板100000000',
	'极限伤害': '伤害100000000',
	'核爆面板': '面板100000001',
	'核爆伤害': '伤害100000001',
	'辅助面板': '面板100000002',
	'辅助伤害': '伤害100000002',
	'平民面板': '面板100000003',
	'平民伤害': '伤害100000003',
	'毕业面板': '面板100000004',
	'毕业伤害': '伤害100000004',
	'试用面板': '面板100000005',
	'试用伤害': '伤害100000005',
/*
    下面的是为了方便替换圣遗物的，可根据需要进行删改
	'极限': '100000000',
*/
	'核爆': '100000001',
	'辅助': '100000002',
	'平民': '100000003',
	'毕业': '100000004',
	'试用': '100000005',
};

export class xiaofei_input_replace extends plugin {
	constructor() {
		super({
			name: '输入替换',
			dsc: '',
			event: 'message',
			priority: -10
		})
	}
	accept(e) {
		for (let key in replace_list) {
			try {
				let reg = RegExp(key);
				if (!reg.test(e.msg)) continue;
				if (/极限/.test(e.msg)) {
                    e.msg = e.msg.replace(/极限|面板/g, '');
					e.msg =  `${e.msg}面板100000000`
				}

				e.msg = e.msg.replace(reg, replace_list[key]);
			} catch (err) { }
		}
		return false;
	}
}
