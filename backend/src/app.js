
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

  import userRouter from './routes/user.js';
  app.use('/user', userRouter);

  import companyRouter from './routes/company.js';
  app.use('/company', companyRouter);

  import apiRouter from './routes/api.js';
  app.use('/api', apiRouter);
  
  const port = process.env.PORT || 3000
  app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  });
  