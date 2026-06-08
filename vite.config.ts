import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { spawn, ChildProcess } from "child_process";
import net from "net";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Disable default public dir to prevent public/node_modules from shadowing real deps
  publicDir: false,
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Shopping sub-app → customer backend (port 5001)
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      },
      // All uploaded images come from the admin server (port 5000)
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      // Admin panel → admin backend (port 5000)
      '/admin-api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(/^\/admin-api/, '/api'),
      },
      '/admin-uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(/^\/admin-uploads/, '/uploads'),
      },
    },
    // Shopping sub-app served from public/shopping/ (static build)
  },
  plugins: [
    react(),
    // Auto-start backend servers when running dev
    {
      name: "auto-start-backends",
      apply: "serve",
      configureServer(server) {
        const servers: { name: string; process: ChildProcess }[] = [];

        const startServer = (name: string, cwd: string, script: string) => {
          const isRunning = (port: number): Promise<boolean> =>
            new Promise((resolve) => {
              const tester = net.createServer()
                .once("error", () => resolve(true))
                .once("listening", () => { tester.close(); resolve(false); })
                .listen(port);
            });

          const port = name === "Shopping Backend" ? 5001 : 5000;
          isRunning(port).then((running) => {
            if (running) {
              console.log(`\x1b[32m✅ ${name} already running on port ${port}\x1b[0m`);
              return;
            }
            console.log(`\x1b[36m🚀 Starting ${name} on port ${port}...\x1b[0m`);
            const proc = spawn("node", [script], {
              cwd,
              stdio: "pipe",
              shell: false,
            });
            proc.stdout?.on("data", (d: Buffer) => {
              const line = d.toString().trim();
              if (line) console.log(`\x1b[33m[${name}]\x1b[0m ${line}`);
            });
            proc.stderr?.on("data", (d: Buffer) => {
              const line = d.toString().trim();
              if (line) console.error(`\x1b[31m[${name} ERR]\x1b[0m ${line}`);
            });
            proc.on("exit", (code) => {
              console.log(`\x1b[33m[${name}]\x1b[0m process exited with code ${code}`);
            });
            servers.push({ name, process: proc });
          });
        };

        // Start backends after Vite server is ready
        server.httpServer?.once('listening', () => {
          setTimeout(() => {
            startServer(
              "Shopping Backend",
              path.resolve(__dirname, "public/server"),
              path.resolve(__dirname, "public/server/index.js")
            );
            startServer(
              "Admin Backend",
              path.resolve(__dirname, "public/ecommerce_admin/server"),
              path.resolve(__dirname, "public/ecommerce_admin/server/index.js")
            );
          }, 100);
        });

        // Cleanup on exit
        const cleanup = () => {
          servers.forEach(({ name, process: proc }) => {
            console.log(`\x1b[33m[${name}]\x1b[0m stopping...`);
            proc.kill("SIGTERM");
          });
        };
        process.on("exit", cleanup);
        process.on("SIGINT", () => { cleanup(); process.exit(0); });
        process.on("SIGTERM", () => { cleanup(); process.exit(0); });
      },
    },
    // Custom middleware: serve sub-apps from public/ for their respective routes
    {
      name: "sub-app-middleware",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || '';
          const cleanUrl = url.split('?')[0];
          const ext = cleanUrl.split('.').pop()?.toLowerCase();
          const isStaticAsset = ext && ['js', 'css', 'png', 'jpg', 'jpeg', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'eot', 'gz', 'map', 'json', 'webp'].includes(ext);

          // Helper: serve a static file from a sub-app's dist directory
          const serveStatic = (basePath: string, distDir: string) => {
            const relativePath = cleanUrl.replace(basePath, '') || '/';
            const filePath = path.resolve(distDir, relativePath.replace(/^\//, ''));
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const mimeTypes: Record<string, string> = {
                js: 'application/javascript', css: 'text/css', png: 'image/png',
                jpg: 'image/jpeg', jpeg: 'image/jpeg', svg: 'image/svg+xml',
                ico: 'image/x-icon', webp: 'image/webp', json: 'application/json',
                woff: 'font/woff', woff2: 'font/woff2', ttf: 'font/ttf',
              };
              const mime = (ext && mimeTypes[ext]) || 'application/octet-stream';
              res.setHeader('Content-Type', mime);
              res.end(fs.readFileSync(filePath));
              return true;
            }
            return false;
          };

          // Admin panel sub-app (must be before /shopping to match /shopping/admin first)
          if (url === '/shopping/admin' || url === '/shopping/admin/' || url.startsWith('/shopping/admin/')) {
            const distDir = path.resolve(__dirname, 'public/ecommerce_admin/dist');
            if (isStaticAsset && serveStatic('/shopping/admin', distDir)) return;
            const adminIndex = path.resolve(distDir, 'index.html');
            if (fs.existsSync(adminIndex)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(fs.readFileSync(adminIndex, 'utf-8'));
              return;
            }
          }

          // Shopping sub-app
          if (url === '/shopping' || url === '/shopping/' || url.startsWith('/shopping/')) {
            const distDir = path.resolve(__dirname, 'public/vite-project/dist');
            if (isStaticAsset && serveStatic('/shopping', distDir)) return;
            const shoppingIndex = path.resolve(distDir, 'index.html');
            if (fs.existsSync(shoppingIndex)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(fs.readFileSync(shoppingIndex, 'utf-8'));
              return;
            }
          }

          // Job Portal sub-app
          if (url === '/job-portal' || url === '/job-portal/' || url.startsWith('/job-portal/')) {
            const distDir = path.resolve(__dirname, 'public/Job Portal/dist');
            if (isStaticAsset && serveStatic('/job-portal', distDir)) return;
            const jobPortalIndex = path.resolve(distDir, 'index.html');
            if (fs.existsSync(jobPortalIndex)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(fs.readFileSync(jobPortalIndex, 'utf-8'));
              return;
            }
          }

          // Multi-vendor admin sub-app
          if (url === '/multi-vendor-admin' || url === '/multi-vendor-admin/' || url.startsWith('/multi-vendor-admin/')) {
            const distDir = path.resolve(__dirname, 'public/multi-vendor admin/dist');
            if (isStaticAsset && serveStatic('/multi-vendor-admin', distDir)) return;
            const multiVendorIndex = path.resolve(distDir, 'index.html');
            if (fs.existsSync(multiVendorIndex)) {
              res.setHeader('Content-Type', 'text/html; charset=utf-8');
              res.end(fs.readFileSync(multiVendorIndex, 'utf-8'));
              return;
            }
          }

          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
