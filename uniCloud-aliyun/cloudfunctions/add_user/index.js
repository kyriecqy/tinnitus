'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('event', event);
	return await db.collection('user').add({...event})
};
