import axios from 'axios'
import { API_URL } from '../Constants'

const config = {
    headers: {'auth-token': sessionStorage.getItem('USER_TOKEN')}
};

class AccountService {

    async retrieveInfo() {
        let res = await axios.get(`${API_URL}/user`, config);
        return res;
    }

    async getAllUser() {
        let res = await axios.get(`${API_URL}/user/all`, config);
        return res;
    }

    async uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('owner', sessionStorage.getItem('USER_ID'));

        let res = await axios.post(`${API_URL}/user/upload`, formData, {
            'auth-token': sessionStorage.getItem('USER_TOKEN'),
            'content-type': 'multipart/form-data',
        });
        return res;
    }

    async shareFile(fileId, userList) {
        let res = await axios.patch(`${API_URL}/user/share/${fileId}`, userList, config);
        return res;
    }

}

export default new AccountService();