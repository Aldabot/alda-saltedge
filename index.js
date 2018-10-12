const axios = require('axios')

const saltedge = axios.create({
  baseURL: 'https://www.saltedge.com/api/v4/',
  timeout: 1000,
  headers: {
    'App-Id': '8cZAsydKcx5ToQiWf0wsnN8CZfd2W0dzHoOLNZMTmaY',
    'Secret': 'on4ipqMGZ6x16FJtEakjYvar3GAAzmZMo-oSBxzYniI'
  }
})

const createCustomer = async (identifier) => {
  try {
    const { data: { data }} =  await saltedge.post('customers', {
      data: { identifier }
    })
    return data
  }
  catch(err) {
    const { status, data: { error_class, error_message} } = err.response
    throw { status, error_class, error_message }
  }
}

createCustomer(1).then(res => console.log('res', res)).catch(err => console.error('err', err))
