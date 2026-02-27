export default {
  apps: [
    {
      name: "ecom",
      script: "pnpm",
      args: "start",
      cwd: new URL(".", import.meta.url).pathname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      node_args: "--max-old-space-size=896",
      env: {
        NODE_ENV: "production",
        PORT: 3005,
      },
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
