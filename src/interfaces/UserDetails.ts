import { IsEmail, MinLength, Contains } from "class-validator"
import { Field, InputType } from "type-graphql"

export type tLoginUserInput = {
  login: string
  password: string
}

@InputType()
export class LoginUserInput implements tLoginUserInput {
  @Field()
  login!: string

  @Field()
  password!: string
}

export type tRegisterUserInput = {
  email: string
  username: string
  password: string
  repassword: string
}

@InputType()
export class RegisterUserInput implements tRegisterUserInput {
  @Field()
  email!: string

  @Field()
  username!: string

  @Field()
  password!: string

  @Field()
  repassword!: string
}
