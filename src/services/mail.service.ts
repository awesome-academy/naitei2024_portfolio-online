import { AppDataSource } from '~/config/data-source'
import PendingVerification from '~/entity/pending_verification.entity'
import nodemailer = require('nodemailer')
import User from '~/entity/user.entity'
import * as dotenv from 'dotenv'
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' })

class MailService {
  private verificationRepository = AppDataSource.getRepository(PendingVerification)
  private userRepository = AppDataSource.getRepository(User)

  randomConfirmDigit(n: number): string {
    let result = ''
    for (let i = 0; i < n; i++) {
      result += Math.floor(Math.random() * 10)
    }
    return result
  }

  async getVerificationById(id: number): Promise<PendingVerification | null> {
    return this.verificationRepository.findOne({ where: { id } })
  }

  async sendMail(
    email: string,
    subject: string = 'Verification',
    text: string = this.randomConfirmDigit(6)
  ): Promise<PendingVerification> {
    let pending_verification = await this.verificationRepository.findOne({ where: { email } })
    if (pending_verification) {
      pending_verification.digitVerification = text
      await this.verificationRepository.update({ email }, pending_verification)
    } else {
      pending_verification = new PendingVerification({ email, digitVerification: text })
      pending_verification = await this.verificationRepository.save(pending_verification)
    }
    return new Promise((resolve, reject) => {
      const transporter = nodemailer.createTransport({
        host: process.env.VERIFICATION_MAIL_HOST,
        port: parseInt(process.env.VERIFICATION_MAIL_PORT || ''),
        auth: {
          user: process.env.VERIFICATION_MAIL_USER,
          pass: process.env.VERIFICATION_MAIL_PASS
        }
      })
      const mailOptions = {
        from: process.env.VERIFICATION_MAIL_OPTION_FROM,
        to: email,
        subject: subject,
        text: text
      }
      transporter.sendMail(mailOptions, function (error: any, info: { response: string }) {
        if (error) {
          reject(error)
        } else {
          resolve(pending_verification)
        }
      })
    })
  }

  async verifyEmail(email: string, digit: string): Promise<boolean> {
    const pending_verification = await this.verificationRepository.findOne({ where: { email } })
    if (pending_verification && pending_verification.digitVerification === digit) {
      this.userRepository.update({ email }, { emailVerified: true })
      return true
    }
    return false
  }
}
const mailService = new MailService()
export default mailService
