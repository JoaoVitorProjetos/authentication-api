import mongoose from 'mongoose'

const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;

function db(){mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@authjwt.i4skxmu.mongodb.net/Authjwt?retryWrites=true&w=majority`).then(() => {
    console.log('db connected')  
}).catch((e) => {
    console.log('db is not connected')
})
}

export default db