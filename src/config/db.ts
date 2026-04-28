import mysql from 'mysql2/promise'

const connection =mysql.createConnection({
    host:process.env.DB_HOST as string,
    user:process.env.DB_USER as string,
    password:process.env.DB_PASSWORD as string,
    database: process.env.DB_DATABASE as string
})

export default connection;