import mongoose from 'mongoose'
import 'dotenv/config'

const dbconnection=mongoose
// .connect (`mongodb://localhost:27017/Talabat_food_app`)
.connect(process.env.DB_URL)
.then(()=>{
    console.log('DB connected');
}).catch(()=>{
    console.log('DB failure to connect' );
})
export default dbconnection



