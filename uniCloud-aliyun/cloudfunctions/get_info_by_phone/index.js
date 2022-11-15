'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let res = await db.collection('user').where({
		phone: db.command.eq(event.phone)
	}).get()
	//console.log('res', res);
	if(res.affectedDocs == 0) {
		let info = await uniCloud.callFunction({
			name: 'add_user',
			data: {
				phone: event.phone,
				gender: '',
				birth: '',
				diseaseList: [],
				avatar: '',
				name: '默认用户名'
			}
		}).then(result => {
			return {
				isRegister: true,
				data: result.result.id
			}
		})
		//console.log('info', info);
		return {
			...info
		}
	}else {
		return {
			isRegister: false,
			data: res.data[0]
		}
	}
};
