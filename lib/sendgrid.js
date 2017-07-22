const sendgrid = require('sendgrid')

module.exports = {
    sendEmail: true,
    send
}

async function send(task) {
  if (!module.exports.sendEmail) return

  if (!process.env.SENDGRID_API_KEY) {
    return console.log("Skipping email because SENDGRID_API_KEY is not defined")
  }

  if (!process.env.FROM_EMAIL) {
    return console.log("Skipping email because EMAIL_FROM is not defined")
  }

  console.log("Sending email")

  const helper = sendgrid.mail;
  const from_email = new helper.Email(process.env.FROM_EMAIL);
  const to_email = new helper.Email('sam@heroku.com');
  const subject = `Someone created a task: ${task.name}`;
  const content = new helper.Content('text/plain', 'You should go complete that 😉');
  const mail = new helper.Mail(from_email, subject, to_email, content);

  const client = sendgrid(process.env.SENDGRID_API_KEY);
  const request = client.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });

  return await client.API(request)
}