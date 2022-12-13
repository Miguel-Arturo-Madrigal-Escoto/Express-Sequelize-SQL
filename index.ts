import { config } from 'dotenv';
import Server from './models/server';

config();

const server: Server = new Server();
server.listen();