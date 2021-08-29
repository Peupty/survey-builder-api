import { ObjectType, Field, ID, Int } from "type-graphql"
import { IsEmail, MinLength } from "class-validator"

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number

  @Field(() => String)
  username!: string

  @Field(() => String)
  password!: String

  @Field(() => String)
  email!: string

  @Field(() => Date)
  createdAt!: Date

  @Field()
  updatedAt!: Date
}
