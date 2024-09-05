import { AppDataSource } from '~/config/data-source'
import mailService from '~/services/mail.service'
import { clearDatabase } from './util'
import PendingVerification from '~/entity/pending_verification.entity'
import { mockPendingVerification } from './mockdatas/mail.mockdata'

describe('Mail Service', () => {
  beforeAll(async () => {
    await AppDataSource.initialize()
    await clearDatabase(PendingVerification)
    const pendingVerification = new PendingVerification(mockPendingVerification)
    await AppDataSource.getRepository(PendingVerification).save(pendingVerification)
  })

  afterAll(async () => {
    await clearDatabase(PendingVerification)
  })

  describe('Random Confirm Digit', () => {
    const code = mailService.randomConfirmDigit(6)
    it('should return a string of 6 digits', () => {
      expect(code.length).toBe(6)
    })
  })

  describe('Get Verification By Id', () => {
    it('should return a verification by id', async () => {
      const pendingVerification = new PendingVerification(mockPendingVerification)
      const result = await mailService.getVerificationById(pendingVerification.id)
      expect(result).toBeInstanceOf(PendingVerification)
      expect(result?.id).toBe(pendingVerification.id)
      expect(result?.email).toBe(pendingVerification.email)
      expect(result?.digitVerification).toBe(pendingVerification.digitVerification)
    })
  })

  describe('Send Mail', () => {
    const pendingVerification = new PendingVerification(mockPendingVerification)
    const email = pendingVerification.email
    const subject = 'Test'
    const text = pendingVerification.digitVerification

    it('should send a mail', async () => {
      const result = await mailService.sendMail(email, subject, text)
      expect(result).toBeInstanceOf(PendingVerification)
      expect(result.email).toBe(email)
      expect(result.digitVerification).toBe(text)
    }, 10000)
  })

  describe('Verify email', () => {
    const pendingVerification = new PendingVerification(mockPendingVerification)
    const email = pendingVerification.email
    const digitVerification = pendingVerification.digitVerification
    it('should verify email and return true', async () => {
      const result = await mailService.verifyEmail(email, digitVerification)
      expect(result).toBe(true)
    })
  })
})
