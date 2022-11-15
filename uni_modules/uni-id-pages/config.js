export default {
	//调试模式
	"debug": true,
	/*
		登录类型 未列举到的或运行环境不支持的，将被自动隐藏。
		如果需要在不同平台有不同的配置，直接用条件编译即可
	*/
	"isAdmin": false, // 区分管理端与用户端
	"loginTypes": [
		"smsCode"
	],
	//政策协议
	"agreements": {
		"serviceUrl": "", //用户服务协议链接
		"privacyUrl": "", //隐私政策条款链接
		// 哪些场景下显示，1.注册（包括登录并注册，如：微信登录、苹果登录、短信验证码登录）、2.登录（如：用户名密码登录）
		"scope": []
	},
	/**
	 * 密码强度
	 * super（超强：密码必须包含大小写字母、数字和特殊符号，长度范围：8-16位之间）
	 * strong（强: 密密码必须包含字母、数字和特殊符号，长度范围：8-16位之间）
	 * medium (中：密码必须为字母、数字和特殊符号任意两种的组合，长度范围：8-16位之间)
	 * weak（弱：密码必须包含字母和数字，长度范围：6-16位之间）
	 * 为空或false则不验证密码强度
	 */
	"passwordStrength":"medium"
}
