import mongoose  from 'mongoose';

const Connection = async (username = 'usercode', password = 'codeforinterview') => {

    mongoose.set('strictQuery', false);
    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successful!"))
    .catch((err) => {
      console.log(err);
    });
}

export default Connection;