require('dotenv').config()
const ElasticEmail = require('@elasticemail/elasticemail-client');
const { ELASTIC_KEY } = process.env;
const client = ElasticEmail.ApiClient.instance;
const apikey = client.authentications["apikey"];
apikey.apiKey = ELASTIC_KEY;

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