import express from 'express'
//import data from './data.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js'


dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(() =>{console.log('Connected to db')}).catch(err => {
	console.log(err.message)
})

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const port = process.env.PORT || 5000; 

app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);


app.use((err, req, res, next) => {
	res.status(500).send({messasge: err.message})
})

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});