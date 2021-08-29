import { User } from "@entities/User"
import { Field, ObjectType, createUnionType } from "type-graphql"

@ObjectType()
export class FieldError {
  @Field()
  field!: string

  @Field()
  message!: string
}

@ObjectType()
export class RegisterErrors {
  @Field(() => [FieldError])
  errors!: FieldError[]
}

export const RegisterResult = createUnionType({
  name: "RegisterResult",
  types: () => [User, RegisterErrors],
})
