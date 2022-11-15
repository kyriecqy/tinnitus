'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await uniCloud.getPhoneNumber({
		appid: '__UNI__1511104',// 在manifest.json里面可以找到
		provider: 'univerify',
		apiKey: '0a7f6763b067ae3f49202351d36e9489',// 在DCloud开发者中心开通一键登录基础服务时自动生成的
		apiSecret: 'e3683af8ff0220171acf165030d753ac',// 开通一键登录基础服务时自动生成的
		access_token: event.access_token,
		openid: event.openid
	});
	//console.log(res,"res"); // res里的数据格式	{ code: 0, success: true, phoneNumber: '186*****078' }
	let totle_res = ''
	totle_res = await uniCloud.callFunction({
		name: 'get_info_by_phone',
		data: {
			phone: res.phoneNumber
		}
	}).then(result => {
		console.log('result', result);
		return result.result
	})
	totle_res.phone = res.phoneNumber
	console.log('totle', totle_res);
	//return encodeURIComponent(JSON.stringify(totle_res))
	return totle_res
}