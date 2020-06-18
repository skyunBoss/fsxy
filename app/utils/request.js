import store from '../store/index.js';

export const host = 'http://127.0.0.1:7001/api';
    
export default ({ url, method, data }) => {
	uni.showLoading({  
	    title: '加载中'  
	});
	
    return uni.request({
        url: `${host}${url}`,
        method,
        data,
        dataType: 'json',
        header: {
			uuid: store.state.uuid
		}
    }).then(res => {
		uni.hideLoading();
		
        if (res[1].data.code == 200) {
            return res[1].data.data;
        }
		
		throw res[1].data;
    }).catch(parmas => {
		uni.hideLoading();
		
		switch (parmas.code) {
			case 401:
				uni.clearStorageSync();
				break;
			default:
				uni.showToast({
					title: parmas.msg,
					icon: 'none'
				});
				return Promise.reject();
		}
　　});
}
