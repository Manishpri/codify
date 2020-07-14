const express = require('express');
const cors    = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 8888;
const app = express();

const routes = require('./api/route');


mongoose.connect("mongodb+srv://admin:AdminManish123@cluster0-kxtys.mongodb.net/021task?retryWrites=true&w=majority",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false,
    useUnifiedTopology : true 
}).then(()=>{
    console.log('Database connected successfully!!!');
}).catch(err=>{
    logger.logError({                
        "error": err,
    });
    console.log('Connection failed' + err);
});


app.use(cors());
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use('/agency',routes);

app.listen(port,()=>{
    console.log(`Server is ruinng on port ${port}`);
})
module.exports = app;
