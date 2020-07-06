const axios = require('axios')
const URL = 'http://www.omdbapi.com/?apikey=157f34ed&'

export const getData = async (searchParams = '') => {
    try {
        const response = await axios.get(`${URL}${searchParams}`)
        return response
    }
    catch (error) {
        console.log(error)
        return error
    }
}
