export interface PatrimonyDetails {
  id: string
  heritageResolutions: HeritageResolution[]
  denomination: string
  classification: string
  currentUsage: string
  originalUsage: string
  type: string
  construction: Construction
  addressLot: AddressLot
  description: Description
  photographicDocumentation: Graphic[]
  graphic: Graphic[]
  createdBy: string
  createdAt: string
  updatedAt: string
  updatedBy: string
}

export interface AddressLot {
  type: string
  title: string
  street: string
  number: string
  district: string
  regionalHall: string
  sector: string
  block: string
  lot: string
}

export interface Construction {
  constructionYear: string
  author: string
  constructor: string
  architecturalStyle: string
  constructiveTechnique: string
  floorQuantity: number
  constructedArea: number
  heritageLevel: string
  modificationLevel: string
  modificationLevelComment: string
  conservationLevel: string
  conservationLevelComment: string
  floorObservation: string
}

export interface Description {
  historicalData: string
  architecturalData: string
  ambienceData: string
  bibliographicSource: string
  otherInfo: string
  observation: string
}

export interface Graphic {
  id: number
  image: string
}

export interface HeritageResolution {
  resolution: string
  institution: string
  year: string
}
