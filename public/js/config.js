const BASE_URL = '';

async function getUserNo(){
    const response = await axios.get(`${BASE_URL}/auth/userinfo`, { withCredentials: true})
    const userNo = parseInt(response.data.user_no);
    return userNo
}
