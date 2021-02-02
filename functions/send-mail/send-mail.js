const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST, { origin: 'https://api.eu.sparkpost.com:443' });
/*
client.transmissions.send({
  content: {
    from: 'kundservice@mail.villmindre.com',
    subject: 'Hello, World!',
    html:'<html><body><p>hej kompis. jag ska skotta idag</p></body></html>'
  },
  recipients: [
    {address: 'bjorn.yttergren@gmail.com'}
  ]
})
.then(data => {
  console.log('Woohoo! You just sent your first mailing!');
  console.log(data);
})
.catch(err => {
  console.log('Whoops! Something went wrong');
  console.log(err);
});*/


exports.handler = function (event, context, callback) {
  client.transmissions.send({
    content: {
      from: 'kundservice@mail.villmindre.com',
      subject: 'Hello, World!',
      html:'<html><body><p>hej kompis. jag ska skotta idag</p></body></html>'
    },
    recipients: [
      {address: 'bjorn.yttergren@gmail.com'}
    ]
  })
  .then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });
}