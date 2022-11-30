'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(event);
	let {id, ...otherinfo} = event
	return db.collection('user').doc(event.id).update({
	  ...otherinfo
	})
};
