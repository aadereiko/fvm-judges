const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri ='mongodb+srv://fvmMajor:FVMspring20201@judgesinfo.9yzop.mongodb.net/JudgesInfo?retryWrites=true&w=majority';

const connectDB = async (callback) => {
    let connectData = await new Promise((res, rej) => {
        let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            if(err) throw err;
            console.log("Connected correctly to server");

            let respData = await callback(client);
            await client.close();
            res(respData);
            rej(err);
        })
    }).catch(err => console.log('Error:', err));

    return connectData;
}

const createParticipant = async (client, id, fvmId) => {
    const fvmColection = await client.db("Telegram").collection("Users");
}

const createDb = async (client, dbName, collectionNames) => {
   const db = await client.db(dbName).createCollection(collectionNames, function (err, result) {
       if(err) throw err;
       console.log("database and Collection created!");
       console.log(err)
   })
}

async function test() {
   let data = await connectDB(async (client) => {
        await createDb(client, 'Test').then().catch(err => console.log(err))
    }).then().catch(err => console.log(err))
}

test()
module.exports.connectDB = connectDB;

let participant = {
    id: 1,
    nominations: {
        id: {
            img: ''
        }
    }
}

let nominations = {
    id: 1,
    name: '',
    imgs: []
}

let user = {
    login: '',
    marks: {
        nominationId: {
            participantId: {
                idea: 1,
                look: 1
            }
        }
    }
}