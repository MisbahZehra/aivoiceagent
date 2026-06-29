import dotenv from 'dotenv';

dotenv.config();

import http from 'http';
import app from './app';
import { config } from './config/env';
import { setupStreamingServer } from './services/streamService';

const server = http.createServer(app);
setupStreamingServer(server);

server.listen(config.port, () => {
  console.log(`Backend running on http://localhost:${config.port}`);
});
