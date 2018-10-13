const axios = require('axios')
require('dotenv').config()

const saltedge = axios.create({
  baseURL: 'https://www.saltedge.com/api/v4/',
  timeout: 1000,
  headers: {
    'App-Id': process.env.APP_ID,
    'Secret': process.env.SECRET
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

const createLogin = async (customerId, username, password) => {
  try {
    const { data: { data }} =  await saltedge.post('logins', {
      data: {
        customer_id: customerId,
        country_code: 'ES',
        provider_code: 'sabadell_es',
        fetch_scopes: [ 'accounts', 'transactions' ],
        credentials: { login: username, password },
        daily_refresh: true
      }
    })
    return data
  }
  catch(err) {
    const { status, data: { error_class, error_message} } = err.response
    throw { status, error_class, error_message }
  }
}

// createCustomer(1).then(res => console.log('res', res)).catch(err => console.error('err', err))
// createLogin(2452332, '', '').then(res => console.log('res', res)).catch(err => console.error('err', err))
