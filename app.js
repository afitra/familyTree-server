const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'familyTree';

const express = require('express'),
    app = express(),
    routerUser = require('./routes/routerUser'),
    routerFamily = require('./routes/routerFamily'),
    routerGallery = require('./routes/routerGallery'),
    routerEvent = require('./routes/routerEvent'),
    port = 3000,
    cors = require('cors'),
    mongoose = require('mongoose');
mongoose.set('findAndUpdate', false)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
    useNewUrlParser: true
})
// mongoose.connect('mongodb+srv://afitra:afitra@lamaran-anzh1.mongodb.net/test?retryWrites=true', {
//     useNewUrlParser: true
// })

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extends: false
}))
app.use('/user', routerUser)
app.use('/family', routerFamily)
app.use('/gallery', routerGallery)
app.use('/event', routerEvent)

module.exports = app

app.listen(port, function () {
    console.log(`live on port ${port} ######*******`);
    console.log(`connect data base on ${dbName}  ######*******`);
})