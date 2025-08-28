import { CorsOptions} from 'cors';

const allowedOrigins = [
  "http://localhost:5173", 
  process.env.CORS_ORIGIN  
];

export const corsConfig: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};

