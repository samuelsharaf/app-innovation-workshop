const chai = require('chai')
chai.use(require('chai-http'))
const expect = chai.expect

const sendgrid = require('../lib/sendgrid')

sendgrid.sendEmail = false

describe("Tasks", () => {

})
