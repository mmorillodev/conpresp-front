export interface CreatePatrimony {
  resolutionItem: string
  denomination: string
  classification: string
  currentUsage: string
  type: string
  originalUsage: string
  heritageResolutions: HeritageResolution[]
  addressLot: AddressLot
  construction: Construction
  description: Description
  graphic: Graphic[]
  photographicDocumentation: Graphic[]
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
  author: string
  constructor: string
  approximateDate: boolean
  constructionYear: string
  architecturalStyle: string
  constructiveTechnique: string
  floorQuantity: number
  areaLot: number
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
  image: string
  imageName: string
}

export interface HeritageResolution {
  resolution: string
  institution: string
  year: number
}
