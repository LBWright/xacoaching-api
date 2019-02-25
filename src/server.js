import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import config from './config'
import { connect } from './utils/db'

import { privateRouter, publicRouter } from './resources/router'

export const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

// privateRouter(app)
publicRouter(app)

export const start = async () => {
    try {
        await connect()
        app.listen(config.port, () => {
            console.log('-------------------------')
            console.log(`Server running on ${config.port}`)
            console.log('-------------------------')
        })
    } catch (err) {
        console.error(err)
    }
}