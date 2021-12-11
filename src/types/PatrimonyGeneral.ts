// Generated by https://quicktype.io

export interface PatrimonyGeneral {
  id: string
  denomination: string
  resolutions: Resolution[]
  type: string
  addressStreet: string
  conservationLevel: string
  conservationLevelComment: string
}

export interface Resolution {
  resolution: string
  institution: string
  year: string
}
