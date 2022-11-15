'use strict';
exports.main = async (event, context) => {
	return await uniCloud.deleteFile({
	    fileList: [
	        event.filesUrl
	    ]
	});
};
