'use strict';
import express from "express";
import cors from 'cors';
import path from 'path';
import superheroesRoutes from './routes/superheroesRoute.js';
import { Superhero } from "./models/Superhero.js";

export function createServer() {
  Superhero.sync()
  const app = express();
  app.use('/uploads', express.static(path.resolve('uploads')));
  app.use(cors());
  app.use(express.json());
  app.use(superheroesRoutes);

  return app
}