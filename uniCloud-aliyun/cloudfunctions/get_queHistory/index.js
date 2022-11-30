'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	return db.collection('que_history').where({ phone: event.phone }).limit(4).orderBy('time', 'desc').get()
};
