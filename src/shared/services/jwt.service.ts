import jwt from 'jsonwebtoken'
import { JwtSchema, JwtPayload } from '../types/jwt.js'
import { Env } from '../config/env.js'
import { JwtError } from '../errors/jwt.error.js'

const secretKey = Env.SECRET_KEY

class JwtService {
  static async generate(user: JwtPayload): Promise<String> {
    const verifyToken = JwtSchema.safeParse(user)
    
    if (verifyToken.error) {
      throw new JwtError('Token is not valid!!!')
    }

    const token = jwt.sign(
      verifyToken, secretKey, {algorithm: 'HS512' }
    )
    
    return token
  }
  
  static async decode(token: string): Promise<JwtPayload> {
    const decodedToken = jwt.verify(
      token, secretKey, { complete: true }
    )
    const parsedToken = JwtSchema.safeParse(decodedToken)
    
    if (parsedToken.error) {
      throw new JwtError('Token is not valid!!!')
    }

    return parsedToken.data
  }
}

export default JwtService
