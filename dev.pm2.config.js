module.exports = {
  apps: [
    {
      name: "User Service",
      script: "npm",
      args: "run dev",
      cwd: "./apis/user-service",
      watch: true,
    },
    {
      name: "Product Service",
      script: "npm",
      args: "run dev",
      cwd: "./apis/product-service",
      watch: true,
    },
  ],
};
