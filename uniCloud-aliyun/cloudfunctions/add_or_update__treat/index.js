'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection('diagnosis').where({
		phone: db.command.eq(event.phone)
	}).get()
	console.log(res)
	if(res.affectedDocs == 0) { //表示还没有治疗记录，新增记录
		return await db.collection('diagnosis').add({...event})
	}else { //已经有治疗记录，更新记录
		return await db.collection('diagnosis').where({
			phone: db.command.eq(event.phone)
		}).update({
			level: event.level
		})
	}
};
