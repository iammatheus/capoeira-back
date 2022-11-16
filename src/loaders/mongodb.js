const mongoose = require('mongoose');

async function startDB(){
    await mongoose.connect('mongodb+srv://matheusferreira:a1b2c3d4e5@capoeiracluster.lsudwbw.mongodb.net/test');
}

module.exports = startDB;