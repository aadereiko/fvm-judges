const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const uri = 'mongodb+srv://fvmMajor:FVMspring20201@judgesinfo.9yzop.mongodb.net/JudgesInfo?retryWrites=true&w=majority';

const connectDB = async (callback) => {
    let connectData = await new Promise((res, rej) => {
        let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect(async err => {
            if (err) throw err;
            console.log("Connected correctly to server");

            let respData = await callback(client);
            await client.close();
            res(respData);
            rej(err);
        })
    }).catch(err => console.log('Error:', err));

    return connectData;
}

const createSeason = async (fvmId) => {
    const season = await createCollections(fvmId, ['participants', 'nominations', 'users']);

    return season;
}

const createCollections = async (dbName, collectionNames) => {
    let collections = await Promise.all(
        collectionNames.map(async name => {
            const isCollectionExist = await checkCollection(dbName, name);
            if(!isCollectionExist){
                await createCollection(dbName, name)
            }
            else{
                console.log(`Collection ${name} exist!`)
            }

            return true
        })
    )

    return collections;
}

const createCollection = async (dbName, collectionName) => {
    let data = await connectDB(async (client) => {
            const db = await client.db(dbName).createCollection(collectionName, function (err, result) {
                if (err) throw err;
                console.log(`Collection ${collectionName} created!`);
            })
            
            return db;
    });

    return data;
}
const checkCollection = async (dbName, collectionName) => {
    let data = await connectDB(async (client) => {
        const collections = await client.db(dbName).listCollections({name: collectionName}, {nameOnly: true}).toArray();
        if(collections.length)
            return true
        else   
            return false
    })

    return data
}

const addDocumentToCollection = async (dbName, collectionName, document) => {
    let data = await connectDB(async (client) => {
        let collection = await client.db(dbName).collection(collectionName).insertOne(document);

        return collection;
    });

    return data;
}

// async function test() {
//     addDocumentToCollection('asdasd','users',{id:1, name: 'sasdasd'})
// }

// test()

module.exports.connectDB = connectDB;
module.exports.createSeason = createSeason;
module.exports.addDocumentToCollection = addDocumentToCollection;

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