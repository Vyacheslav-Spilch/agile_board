import axios from "axios"

import qs from  'query-string'

export const DOMAIN = "http://localhost:3001"

class ApiCall {
    constructor (domain) {
        this.domain = domain
    }

    async perform (url, data, config) {
        const request = await axios(`${this.domain}/${url}`, {
            ...config,
            method: config?.method,
            data,
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return await request.data
    }

    async get (path, searchParams = {}) {
        return await this.perform(`${path}?${qs.stringify(searchParams)}`)
    }

    async post (path, payload) {
        return await this.perform(path, payload, {
            method: 'post',
        })
    }

    async put (path, payload) {
        return await this.perform(path, payload, {
            method: 'put',
        })
    }

    async delete (path) {
        return await this.perform(path, {
            method: 'delete'
        })
    }
}

export default new ApiCall(DOMAIN)