const google = require('./google');
const mongodb = require('./mongodb');

const create = async (seasonId) => {
    const season = await mongodb.createSeason(seasonId);
    console.log('fine', season)
}

function delay(ms) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, ms);
    });
}

const setNominations = async (seasonId) => {
    const nominationsInfo = await google.getNominations('s');

    // const data = await Promise.all(
    //     nominationsInfo.map(async nominationInfo => {
    //         const nomination = await google.getNomination(nominationInfo.driveId)

            const photos = await google.getPhotos(nominationsInfo[1].driveId)

            console.log(photos)
            // const photos = await Promise.all(
            //     nomination.photosId.map(async photoId => {
            //         const photo = await google.getPhoto(photoId);
            //         await delay(2000);
            //         return photo;
            //     })
            // )
            // return {
            //     name: nominationInfo.name,
            //     id: nominationInfo.id,
            //     photos: photos
            // }
    //     })
    // )
    // console.log(data);
    
    console.log('End');

}

setNominations('asdas');