module.exports = {
  apps: [{
    name:          'msctutor',
    script:        'node_modules/.bin/next',
    args:          'start',
    cwd:           '/home/msctutor',
    instances:     2,
    exec_mode:     'cluster',
    autorestart:   true,
    watch:         false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT:     3000,
    },
    error_file:    '/var/log/msctutor/error.log',
    out_file:      '/var/log/msctutor/output.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
  }]
}
