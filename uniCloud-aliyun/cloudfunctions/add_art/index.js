'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	return await db.collection('art').add({
		...event.artItem
	})
};
