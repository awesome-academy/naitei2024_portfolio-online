declare namespace Express {
  export interface Request {
    validationErrors?: Array<{ field: string; msg: string }>
  }
}
