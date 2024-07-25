const mongoose = require('mongoose');

const uri = 'mongodb+srv://wzhengjie99:NMlsMiUPMGt9cgqB@smart-home-inventory-ma.junk7lr.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(uri, {
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
