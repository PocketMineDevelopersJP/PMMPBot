module.exports = {
  apps: [{
    name: 'PMMPBot',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G'
  }]
}
