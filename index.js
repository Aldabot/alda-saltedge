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
    console.error(err)
    const { status, data: { error_class, error_message} } = err.response
    throw { status, error_class, error_message }
  }
}

const createLogin = async (customerId, username, password, provider) => {
  try {
    const { data: { data }} =  await saltedge.post('logins', {
      data: {
        customer_id: customerId,
        country_code: 'ES',
        provider_code: provider,
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

const getLoginStatus = async(loginId) => {
  // status can be success, failed, or attempting
  // should add attemtps-stages: https://docs.saltedge.com/account_information/v4/#attempts-stages
  try {
    const {
      data: {
        data: {
          last_attempt: { finished, fail_at, success_at }
        }
      }
    } = await saltedge.get(`logins/${loginId}`)

    if(!finished) {
      return 'attempting'
    } else if(success_at) {
      return 'success'
    }
    return 'failed'
  } catch(err) {
    console.error(err)
  }
}

module.exports = {
  createCustomer,
  createLogin,
  getLoginStatus
}
