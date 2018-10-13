const { createCustomer, createLogin } = require('./index')

// createCustomer(3)
createLogin('2452794', '---', '---', 'sabadell_es')
  .then(res => console.log(res))
  .catch(err => console.log(err))
