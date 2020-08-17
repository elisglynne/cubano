import Mongoose from 'mongoose';
import chalk from 'chalk';

const connectToDB = async () => {
  try {
    await Mongoose.connect(process.env.DB_URL as string,
    { useNewUrlParser: true, useUnifiedTopology: true});
    chalk.green('Connected to db 💽')
  }
  catch (err) {
    chalk.red('Failed to connect', err); 
  }
}

export default connectToDB;
