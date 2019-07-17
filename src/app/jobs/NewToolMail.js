const Mail = require('../services/Mail')

class NewToolMail {
  get key () {
    return 'NewToolMail'
  }

  async handle (job, done) {
    const { user, tool } = job.data

    await Mail.sendMail({
      from: '"Noreply" <noreply@application.com>',
      to: 'admin@application.com',
      subject: 'New tool added',
      template: 'newtool',
      context: { user, tool }
    })

    return done()
  }
}

module.exports = new NewToolMail()
