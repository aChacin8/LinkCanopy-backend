import { CorsOptions} from 'cors';

const CORS = process.env.CORS_ORIGIN || 'http://localhost:5000';

export const corsConfig : CorsOptions = {
    origin: CORS
}
