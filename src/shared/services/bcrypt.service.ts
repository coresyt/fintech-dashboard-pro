import bcrypt from 'bcrypt'

class BcryptService {
  static async encryptPassword(password: string) {
    const saltRounds = await bcrypt.genSalt()
    return await bcrypt.hash(password, saltRounds)
  }
  
  static async comparePassword(
    { hashedPassword, password }: { password: string, hashedPassword: string }
  ) {
    return await bcrypt.compare(password, hashedPassword)
  }
}

export default BcryptService
