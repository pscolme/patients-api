import express, { json } from 'express' // require -> commonJS
import { createPatientRouter } from './src/routes/patients.js'
import { corsMiddleware } from './src/middlewares/cors.js'
import 'dotenv/config'

export const createApp = ({ patientModel }) => {
    const app = express()
    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')

    app.use('/patients', createPatientRouter({ patientModel }))

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`)
    })
}
