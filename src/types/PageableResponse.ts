export interface PageableResponse<T> {
  content: T[]
  pageable: Pageable
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  first: boolean
  empty: boolean
}

export interface Pageable {
  sort: Sort
  offset: number
  pageSize: number
  pageNumber: number
  paged: boolean
  unpaged: boolean
}

export interface Sort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}
