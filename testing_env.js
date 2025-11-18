require('dotenv').config();

const env_variables = [
    'BOT_TOKEN',
    'CLIENT_ID',
    'BOT_STATUS',
    'ACTIVITY_TYPE',
    'ACTIVITY_NAME',
    'YT_TOKEN',
]


for (const property of env_variables) {
    console.log(`Property: ${property}\n\tValue: ${process.env[property]}`);
}