
let replace_list = {
	'极限面板': '面板100000000',
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
};

export class xiaofei_input_replace extends plugin {
	constructor () {
		super({
			/** 功能名称 */
			name: '输入替换',
			/** 功能描述 */
			dsc: '',
			/** https://oicqjs.github.io/oicq/#events */
			event: 'message',
			/** 优先级，数字越小等级越高 */
			priority: -10
		});
	}
	
	accept(e){
		for(let key in replace_list){
			try{
				let reg = RegExp(key);
				if(!reg.test(e.msg)) continue;
				e.msg = e.msg.replace(reg,replace_list[key]);
			}catch(err){}
		}
	}
}