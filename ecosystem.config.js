module.exports = {
    apps: [
        {
            name: 'safsafah',
            script: 'npm',
            args: 'start',
            cwd: '/var/www/AmrProjects/safsafah-react-frontend/',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3010,
            },
            error_file: '/var/www/AmrProjects/safsafah-react-frontend//logs/pm2-error.log',
            out_file: '/var/www/AmrProjects/safsafah-react-frontend//logs/pm2-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        },
    ],
};
