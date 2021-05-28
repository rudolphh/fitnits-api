// db initialization
import dotenv from 'dotenv'; dotenv.config();
import mongoose, { Connection } from 'mongoose';

/// db and models setup
const dbHost = process.env.DB_HOST, dbName = process.env.DB_NAME,
    dbUser = process.env.DB_USER, dbPass = process.env.DB_PASS;

class MongoDB {
    private static instance : Connection;

    private constructor () {}

    static getInstance () {
        if(!this.instance){
            const dbHost = process.env.DB_HOST, dbName = process.env.DB_NAME,
            dbUser = process.env.DB_USER, dbPass = process.env.DB_PASS; 
            
            (async () => {
                const db = await mongoose.connect(dbHost + '/' + dbName, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    user: dbUser,
                    pass: dbPass
                });
                this.instance = db.connection;
            })();

        }
        return this.instance
    }

}

export default MongoDB;


//db.createUser({ user: 'ru', pwd: 'NJT61wJvjrGtTT1H', roles: [{ role: 'readWrite', db: 'portfolio' }] });