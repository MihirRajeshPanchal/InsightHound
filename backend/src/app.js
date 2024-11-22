
  import {config} from "dotenv"
  import express from 'express';
  import cookieParser from 'cookie-parser';
  import cors from 'cors';

  config({
      path: '.env'
  })
  const app = express();
  app.use(express.json());
  app.use(cookieParser()); 
  app.use(cors());

  // Route for user
  import userRouter from './routes/user.js';
  app.use('/user', userRouter);
  // Route for company
  import companyRouter from './routes/company.js';
  app.use('/company', companyRouter);
  
  const port = process.env.PORT || 3000
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });
  