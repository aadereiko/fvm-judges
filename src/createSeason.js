const google = require('./google');
const mongodb = require('./mongodb');

const create = async (seasonId) => {
    const season = await mongodb.createSeason(seasonId);
    const nominations = await setNominations(seasonId);
    const participants = await setParticipants(seasonId, nominations);
    console.log('fine')
}

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    });
}

const setNominations = async (seasonId) => {
    const nominationsInfo = await google.getNominations(seasonId);
    const data = await Promise.all(
        nominationsInfo.map(async nominationInfo => {
            const nomination = await google.getNomination(nominationInfo.driveId)

            const photos = [];
            for (const photoId of nomination.photosId) {
                const photo = await google.getPhoto(photoId);
                await delay(500);
                photos.push(photo)
            }
            // await mongodb.addDocumentToCollection(seasonId, 'nominations', {
            //     name: nominationInfo.name,
            //     id: nominationInfo.id,
            //     photos: photos
            // })
            return {
                name: nominationInfo.name,
                id: nominationInfo.id,
                photos: photos
            }
        })
    )

    return data;
}

const setParticipants = async (seasonId, nominations) => {
    let participants = {}
    let admin = {
        login: 'admin',
        marks: {

        }
    }

    nominations.map(nomination => {
        nomination.photos.map(photo => {
            let participantName = +photo.name.split('.jpg')[0].split('_')[0];
            if (!participants[participantName]) {
                participants[participantName] = {
                    id: participantName,
                    nominations: {}
                }
            }
            if (!participants[participantName].nominations[nomination.id]) {
                participants[participantName].nominations[nomination.id] = {
                    photo: []
                }
            }
            participants[participantName].nominations[nomination.id].photo.push(photo);
            if(!admin.marks[nomination.id]) admin.marks[nomination.id] = {};
            admin.marks[nomination.id][participantName] = {
                idea: null,
                look: null
            };
        })
    })
    console.log(admin)
    let user = await mongodb.addDocumentToCollection(seasonId, 'users', admin);
    // let data = await Promise.all(Object.keys(participants).map(async participantId => {
    //     let participant = await mongodb.addDocumentToCollection(seasonId, 'participants', participants[participantId]);
        
    //     return participant;
    // }))

    // return data;
}



create('1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk');