import { Router } from 'express'
import { PatientController } from '../controllers/patients.js'

export const createPatientRouter = ({ patientModel }) => {
  const patientRouter = Router()

  const patientController = new PatientController({ patientModel })

  patientRouter.get('/', patientController.getAll)
  patientRouter.post('/', patientController.create)
  patientRouter.get('/:id', patientController.getById)

  return patientRouter
}