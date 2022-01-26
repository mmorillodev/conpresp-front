import { CreatePatrimony } from '../types/CreatePatrimony'

const initialState: CreatePatrimony = {
  resolutionItem: '',
  denomination: '',
  classification: '',
  currentUsage: '',
  type: '',
  originalUsage: '',
  heritageResolutions: [],
  addressLot: {
    type: '',
    title: '',
    street: '',
    number: '',
    district: '',
    regionalHall: '',
    sector: '',
    block: '',
    lot: '',
  },
  construction: {
    author: '',
    constructor: '',
    approximateDate: false,
    constructionYear: '',
    architecturalStyle: '',
    constructiveTechnique: '',
    floorQuantity: 0,
    areaLot: 0,
    constructedArea: 0,
    heritageLevel: '',
    modificationLevel: '',
    modificationLevelComment: '',
    conservationLevel: '',
    conservationLevelComment: '',
    floorObservation: '',
  },
  description: {
    historicalData: '',
    architecturalData: '',
    ambienceData: '',
    bibliographicSource: '',
    otherInfo: '',
    observation: '',
  },
  graphic: [],
  photographicDocumentation: [],
}

export default initialState