'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	return await db.collection('art').limit(6).skip(event.skip).orderBy('time', 'desc').get()
};
