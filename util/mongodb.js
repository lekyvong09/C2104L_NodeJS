const mongodb = require('mongodb');

let _mongoConnectionPool;

const mongoConnect = (callbackFunction) => {
    mongodb.MongoClient.connect('mongodb+srv://root:ab123456..@cluster0.pgeminn.mongodb.net/c2104l_nodejs?retryWrites=true&w=majority')
        .then(result => {
            _mongoConnectionPool = result.db();
            console.log('connected to MongoDB');
            callbackFunction();
        })
        .catch(err => console.log(err));
}

const getDb = () => {
    if (_mongoConnectionPool) {
        return _mongoConnectionPool;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;