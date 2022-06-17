module.exports = {
  apps: [{
    name: "app",
    script: "./Controller/express.js",
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
