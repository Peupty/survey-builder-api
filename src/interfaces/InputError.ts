import { Field, ObjectType } from "type-graphql"

export interface iInputError {
  input: string
  messages: string[]
}

@ObjectType()
export class InputError implements iInputError {
  @Field()
  input!: string

  @Field(() => [String])
  messages!: string[]
}
