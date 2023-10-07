import { validatePatient } from "../schemas/patient.js"

export class PatientController {
    constructor ({ patientModel }) {
      this.patientModel = patientModel
    }
  
    getAll = async (req, res) => {
      const patients = await this.patientModel.getAll()
      res.json(patients)
    }

    getById = async (req, res) => {
      const { id } = req.params
      const patient = await this.patientModel.getById({ id })
      if (patient) return res.json(patient)
      res.status(404).json({ message: 'Patient not found' })
    }

    create = async (req, res) => {
      const result = validatePatient(req.body)
      if (!result.success) {
      // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
      }
      const newPatient = await this.patientModel.create({ input: result.data })
  
      res.status(201).json(newPatient)
    }
}