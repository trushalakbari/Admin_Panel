import axios from "axios"

class ApiHelper {
    constructor() {
        this.BaseURL = `http://localhost:5001`
    }

    async fetchUser() {
        return axios.get(`${this.BaseURL}/admin/getuser`)
    }

    async AdminLogin(data) {
        return axios.post(`${this.BaseURL}/admin/login`, data)
    }

    async InsertUser(userDetails) {
        return axios.post(`${this.BaseURL}/admin/adduser`, userDetails)
    }

    async UpdateUser(id, data) {
        return axios.put(`${this.BaseURL}/admin/update/${id}`, data)
    }

    async DeleteUser(id) {
        return axios.delete(`${this.BaseURL}/admin/remove/${id}`)
    }

    async VerifyOtp(data) {
        return axios.post(`${this.BaseURL}/admin/verify`, data)
    }

    async fetchMedia() {
        return axios.get(`${this.BaseURL}/admin/getmedia`,)
    }



}

const apiHelper = new ApiHelper()
export default apiHelper