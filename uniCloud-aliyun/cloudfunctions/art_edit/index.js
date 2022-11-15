'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	console.log('zzz', event.artItem);
	let { _id } = event.artItem
	return await db.collection('art').doc(_id).update({
		title: event.artItem.title,
		content: event.artItem.content,
		time: event.artItem.time,
		author: event.artItem.author,
		picList: event.artItem.picList
	})
};
