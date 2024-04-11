export interface ResponseBase<T> {
  data: T
  msg: string
  code: number
}
