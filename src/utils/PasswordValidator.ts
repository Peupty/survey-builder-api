import { aErrorable } from "@interfaces/Errorable"

export class PasswordValidator extends aErrorable<string> {
  private _minLength: number | boolean
  private _maxLength: number | boolean
  private _validations: Function[]
  protected _errors: string[]

  constructor(minLength: number = 0, maxLength: number = 0) {
    super()
    this._minLength = minLength > 0 && minLength
    this._maxLength = maxLength > 0 && maxLength
    this._validations = []
    this._errors = []
  }

  private _testLength(password: string) {
    if (this._minLength && password.length <= this._minLength) {
      this._errors.push(
        `password should be at least ${this._minLength} characters long`
      )
    }
    if (this._maxLength && password.length > this._maxLength) {
      this._errors.push(`password should be shorter than ${this._maxLength}`)
    }
  }

  contains(regExp: RegExp | string, errorMessage?: string) {
    const msg = errorMessage || `password should contain ${regExp}`

    this._validations.push((password: string): void => {
      if (!password.match(regExp)) this._errors.push(msg)
    })

    return this
  }

  test(password: string) {
    this._testLength(password)
    this._validations.forEach((fn) => fn(password))

    return !this._errors.length
  }

  get errors() {
    return this._errors
  }
}

export const PasswordValidatorFactory = () => {
  return new PasswordValidator(8)
    .contains(/\W/, "password should contain at least one special character")
    .contains(/\d/, "password should contain at least one number")
}
