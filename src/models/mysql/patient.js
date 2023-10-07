import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'PSColme1997*00',
  database: 'patientsdb'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class PatientModel {
  static async getAll () {
    const [patients] = await connection.query(
      'SELECT BIN_TO_UUID(id) id, history_number, name, surname, dni, address, city, province, phone, email, tutor, comments from patient;'
    ) 
    return patients
  }

  static async getById ({ id }) {
    const [patients] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, history_number, name, surname, dni, address, city, province, phone, email, tutor, comments
        FROM patient WHERE id = UUID_TO_BIN(?);`,
      [id]
    )

    if (patients.length === 0) return null

    return patients[0]
  }

  static async create ({ input }) {
    const {
      name,
      surname,
      dni,
      address,
      city,
      province,
      phone,
      email,
      tutor,
      comments
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
          `INSERT INTO patient (id, name, surname, dni, address, city, province, phone, email, tutor, comments)
            VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [name, surname, dni, address, city, province, phone, email, tutor, comments]
      )
    } catch (e) {
      throw new Error('Error creating movie')
    }

    const [patient] = await connection.query(
      `SELECT BIN_TO_UUID(id) id, history_number, name, surname, dni, address, city, province, phone, email, tutor, comments
        FROM patient WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )

    if (patient.length === 0) return null

    return patient[0]
  }
}