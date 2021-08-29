import { User } from "@entities/User"
import { Context } from "@interfaces/context"
import { RegisterUserInput } from "@interfaces/UserDetails"
import {
  FieldError,
  RegisterErrors,
  RegisterResult,
} from "@interfaces/UserResponse"
import { PasswordValidatorFactory } from "@utils/PasswordValidator"
import { readErrors } from "@utils/readErrors"
import { plainToClass } from "class-transformer"
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql"
import isEmail from "validator/lib/isEmail"
import argon from "argon2"

@Resolver(User)
export class UserResolver {
  @Mutation(() => RegisterResult)
  async register(
    @Arg("input") input: RegisterUserInput,
    @Ctx() { prisma }: Context
  ): Promise<typeof RegisterResult> {
    const passwordValidator = PasswordValidatorFactory()
    const errors: FieldError[] = []

    if (!isEmail(input.email)) {
      errors.push({ field: "email", message: "email is not a valid email" })
    }

    if (!passwordValidator.test(input.password))
      errors.push(
        ...readErrors(passwordValidator).map((el) => ({
          field: "password",
          message: el,
        }))
      )

    if (input.password !== input.repassword) {
      errors.push({ field: "repassword", message: "Passwords do not match" })
    }

    if (!!errors.length) return plainToClass(RegisterErrors, { errors })

    const { repassword, ...userData } = input

    userData.password = await argon.hash(userData.password)

    try {
      let user = await prisma.user.create({
        data: userData,
      })

      return plainToClass(User, user)
    } catch (err) {
      errors.push({ field: "email", message: "Email already in use" })
      return plainToClass(RegisterErrors, { errors })
    }
  }

  @Query(() => User)
  async me(@Ctx() { req, prisma }: Context): Promise<User | null> {
    return prisma.user.findUnique({ where: { id: 1 } })
  }
}
