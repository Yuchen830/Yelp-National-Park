const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Nationalpark = require('../models/nationalpark');

mongoose.connect('mongodb://localhost:27017/yelp-park', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:') );
db.once('open', function() {
    console.log("Database Connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Nationalpark.deleteMany({});
    for(let i = 0; i < 2; i++){
        const random1000 = Math.floor(Math.random() *1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const park = new Nationalpark ({
            author: '62eb3cab4ce0a2634974eedd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'The United States has 63 national parks, which are congressionally designated protected areas operated by the National Park Service, an agency of the Department of the Interior.',
            price: price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude, 
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dwjprltqz/image/upload/v1660019941/YelpPark/tz3ehewallwrokxsoebp.jpg',      filename: 'YelpPark/tz3ehewallwrokxsoebp',
                    filename: 'YelpPark/tz3ehewallwrokxsoebp'
                }
                // {
                //     url: 'https://res.cloudinary.com/dwjprltqz/image/upload/v1659987146/YelpPark/tnkt86gimvh8a1rkcejn.jpg',      filename: 'YelpPark/tnkt86gimvh8a1rkcejn', 
                //     filename: 'YelpPark/tnkt86gimvh8a1rkcejn'
                // }
            ]
        })
        await park.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})