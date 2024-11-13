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
            data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return request.data
    }

    async get (path, searchParams = {}) {
        return await this.perform(`${path}?${qs.stringify(searchParams)}`)
    }

    async post (path, payload) {
        return await this.perform(path, {
            method: 'POST',
            data: payload
        })
    }

    async put (path, payload) {
        return await this.perform(path, {
            method: 'PUT',
            data: payload
        })
    }

    async delete (path) {
        return await this.perform(path, {
            method: 'DELETE'
        })
    }
}

export default new ApiCall(DOMAIN)