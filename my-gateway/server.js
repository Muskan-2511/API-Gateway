import expressGateway from 'express-gateway';
import path from 'path';
import app from '../index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __dirname = dirname(fileURLToPath(import.meta.url));

expressGateway({expressApp: app})
  .load(path.join(__dirname, 'config'))
  .run();