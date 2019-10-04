const config = {
  // criar a config
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.DATABASE_URL ,
  dialect: 'postgres'
}

module.exports = {
  dev: {
    ...config
  },
  development: {
    ...config
  },
  test: {
    ...config
  },
  production: {
    ...config
  }
}