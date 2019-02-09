const { createCustomer, createLogin, getLoginStatus } = require('./index')

// createCustomer(3)

// createLogin('2452794', '---', '---', 'sabadell_es')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

getLoginStatus('4428890').then(res => console.log(res))
