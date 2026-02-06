import type { Express } from "express";
import type { Server } from "http";

import path from "path";
import express from "express";
export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
      // Serve static files from client/public
  app.use(express.static(path.resolve("client", "public")));
    // Handle SPA routing if necessary, but for this version index.html is sufficient
  app.get("/", (_req, res) => {
    res.sendFile(path.resolve("client", "public", "index.html"));
  });
  return httpServer;