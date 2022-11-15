'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log(event);
	let {id, ...otherinfo} = event
	return db.collection('user').doc(event.id).update({
		/*
		gender: event.gender,
		birth: event.birth,
		disease: event.diseaseList
		*/
	  ...otherinfo
	})
};
