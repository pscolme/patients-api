import { createApp } from '../../app.js'

import { PatientModel } from '../models/mysql/patient.js'

createApp({ patientModel: PatientModel })