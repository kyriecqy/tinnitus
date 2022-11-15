'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection('diagnosis').where({
		phone: db.command.eq(event.phone)
	}).get()
	if(res.affectedDocs == 0) {
		return {
			isDia: false
		}
	}else {
		console.log(res); //{"affectedDocs":1,"data":[{"_id":"63723a978917140001985f9f","phone":"15869142931","level":["low"]}]}
		let level = res.data[0].level
		let treat_music = await db.collection('treat').where({
			title: db.command.eq(level[0]).or(db.command.eq(level[1]))
		}).get()
		//console.log(treat_music);
		return {
			isDia: true,
			music_list: treat_music.data
		}
	}
};
