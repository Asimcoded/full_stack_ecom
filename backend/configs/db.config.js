import mongoose from "mongoose";
import "dotenv/config";

export default async function dbConnection() {
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName : process.env.DB_NAME
        })
        
    }catch(err){
        console.error(`DB Fail to connect  :  ${err}`);
        process.exit(1)
        
    }
}
