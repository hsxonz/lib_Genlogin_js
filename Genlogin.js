const axios = require('axios')
const LOCAL_URL = 'http://localhost:55550/backend/profiles'

class Genlogin {

    constructor(api_key) {
        this.api_key = api_key
    }

    async getProfile(id) {
        const url = LOCAL_URL + `/${id}`;
        const res = await axios.get(url).then(res =>
            res.data.data
        ).catch(err =>
            err.response.data
        );
        return res
    }

    async getProfiles(offset = 0, limit = 1000) {
        const url = LOCAL_URL;
        const res = await axios.get(`${url}?limit=${limit}&offset=${offset}`).then(res =>
        ({
            profiles: res.data.data.items,
            pagination: res.data.data.pagination
        })

        ).catch(err => err.response.data);
        return res
    }

    async getWsEndpoint(id) {
        const url = LOCAL_URL + `/${id}/ws-endpoint`;
        const res = await axios.get(url).then(res =>
            res.data
        ).catch(err =>
            err.response.data
        );
        return res
    }

    async runProfile(id) {
        const resEndpoint = await this.getWsEndpoint(id);
        if (resEndpoint.data.wsEndpoint != '') return { success: true, ...resEndpoint.data }
        else {
            const url = LOCAL_URL + `/${id}/start`;
            const res = await axios.put(url).then(res =>
                res.data
            ).catch(err =>
                err.response.data
            );
            if (res.wsEndpoint) return { success: true, wsEndpoint: res.wsEndpoint }
            else return {
                success: false,
                message: "Profile is running in another device"
            }
        }

    }

    async stopProfile(id) {
        const url = LOCAL_URL + `/${id}/stop`;
        const res = await axios.put(url).then(res =>
            res.data
        ).catch(err =>
            err.response.data
        );
        return res
    }

    async getProfilesRunning() {
        const url = LOCAL_URL + `/running`;
        const res = await axios.get(url).then(res =>
            res.data
        ).catch(err =>
            err.response.data
        );
        return res
    }

};

module.exports = Genlogin

