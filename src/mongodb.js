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

const getNominations = async (dbName) => {
    let data = await connectDB(async (client) => {
        let collection = await client.db(dbName).collection('nominations').find({}).toArray();

        return collection;
    })
    
    return data || {};
}

const getNomination = async (dbName, id) => {
    let data = await connectDB(async (client) => {
        let collection = await client.db(dbName).collection('nominations').findOne({id: +id});

        return collection;
    })

    return data || {};
}


const getParticipants = async (dbName) => {
    let data = await connectDB(async (client) => {
        let collection = await client.db(dbName).collection('participants').find({}).toArray();

        return collection;
    })
    
    return data || {};
}

const getParticipant = async (dbName, id) => {
    let data = await connectDB(async (client) => {
        let collection = await client.db(dbName).collection('participants').findOne({id: +id});

        return collection;
    })

    return data || {};
}

const getPhoto = async (dbName, nominationId, participantId) => {
    let nomination = await getNomination(dbName, nominationId);
    let photo = nomination.photos.filter(photo => photo.name.split('_')[0] == participantId)[0];

    return photo || {};
}

async function test() {
    getParticipant('1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk', 5);
}

// test()

module.exports.connectDB = connectDB;
module.exports.createSeason = createSeason;
module.exports.addDocumentToCollection = addDocumentToCollection;
module.exports.getNomination = getNomination;
module.exports.getNominations = getNominations;
module.exports.getParticipant = getParticipant;
module.exports.getParticipants = getParticipants;
module.exports.getPhoto = getPhoto;

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