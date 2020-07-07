const axios = require('axios')
const omdURL = 'http://www.omdbapi.com/?apikey=157f34ed&'

export const getData = async (searchParams = '') => {
    try {
        return await axios.get(`${omdURL}${searchParams}`)
    }
    catch (error) {
        console.log(error)
        return error
    }
}
