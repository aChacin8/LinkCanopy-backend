import { CorsOptions} from 'cors';

const allowedOrigins = [
  "http://localhost:5173", // frontend dev
  process.env.CORS_ORIGIN  // frontend producción
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

