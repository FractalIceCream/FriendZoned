const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/FriendZonedDB';

connect(connectionString);

module.exports = connection;

// 2/12/24 nothing needed