const ElasticEmail = require('@elasticemail/elasticemail-client');
const { ELASTIC_KEY } = process.env;
const client = ElasticEmail.ApiClient.instance;
const apikey = client.authentications["apikey"];
require('dotenv').config()
apikey.apiKey = ELASTIC_KEY;
console.log(ELASTIC_KEY);
// apikey.apiKey = 'EAA9DE32403E8ADB4551579E5BA42840AEB12279D38C9EEC9DF38F106207585A91314FB891568B407FAABFDB156B9769'

const emailApi = new ElasticEmail.EmailsApi();

const callback = (e) => {
    if (e) {
        console.error(e);
    } else {
        console.log("Email sent successfully");
    }
}

const sendEmail = async (body) => {
    emailApi.emailsPost(body, callback);
}

module.exports = sendEmail;