const mongoose = require('mongoose');
const configuration = require('./config');
const APPLICATION_SHUT_DOWN_NUMBER = 2;
async function init(){
    try{
        if(!init.Connectioncounter){
            init.Connectioncounter = 0;
        }
        if(APPLICATION_SHUT_DOWN_NUMBER===init.Connectioncounter){
            process.exit(0);
        }
        const connection = await mongoose.connect(configuration.MONGODB_URI);
        if(connection){
            console.info("Connected to MonogoDB Successfuly")
        }
        init.Connectioncounter++;
    }catch(error){
        console.error(`Application Tried to connect to MongoDB Database for ${init.Connectioncounter} time`);
        console.error(error)
        init();
    } 
}
init()