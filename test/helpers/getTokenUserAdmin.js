import bcrypt from 'bcryptjs'
import UserAdmin from '../../src/models/UserAdmin'
import { generateAdminJWT } from '../../src/helpers'

export const registerUserAdmin = async ({ name, email, password }) => {
  try {
    const userAdmin = new UserAdmin({ name, email, password })

    const passwordHash = await bcrypt.hash(password, 10)
    userAdmin.password = passwordHash

    const token = await generateAdminJWT(userAdmin.id, userAdmin.email)

    await userAdmin.save()

    return {
      name: userAdmin.name,
      email: userAdmin.email,
      token
    }
  } catch (error) {
    return new Error(error)
  }
}

export const deleteUserAdmin = async ({ email }) => {
  try {
    await UserAdmin.findOneAndDelete({ email })
  } catch (error) {
    return new Error(error)
  }
}
