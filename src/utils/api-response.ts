export function apiResponse<T>(
  data: T | null = null,
  meta: Meta | null = null,
  error: Error | null = null,
) {
  return {data, meta, error}
}

export function successResponse<T>(data: T, meta?: Meta) {
  return apiResponse(data, meta)
}

export function errorResponse(error: Error, meta?: Meta) {
  return apiResponse(null, meta, error)
}

type Meta = Record<string, unknown>
interface Error {
  code: string
  message?: string
  details?: Record<string, unknown>
}
