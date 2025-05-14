import { CityIds } from './types/Shared';

export const currencies = [
  {
    label: 'AED',
    value: 'aed',
  },
  {
    label: 'USD',
    value: 'usd',
  },
  {
    label: 'EUR',
    value: 'eur',
  },
];

export const cities = [
  {
    label: 'Abu Dhabi',
    value: CityIds.ABU_DHABI,
    key: 'ABU_DHABI',
  },
  {
    label: 'Ajman',
    value: CityIds.AJMAN,
    key: 'AJMAN',
  },
  {
    label: 'Al Ain',
    value: CityIds.AL_AIN,
    key: 'AL_AIN',
  },
  {
    label: 'Dubai',
    value: CityIds.DUBAI,
    key: 'DUBAI',
  },
  {
    label: 'Fujairah',
    value: CityIds.FUJAIRAH,
    key: 'FUJAIRAH',
  },
  {
    label: 'Ras Al Khaimah',
    value: CityIds.RAS_AL_KHAIMAH,
    key: 'RAS_AL_KHAIMAH',
  },
  {
    label: 'Sharjah',
    value: CityIds.SHARJAH,
    key: 'SHARJAH',
  },
  {
    label: 'Umm Al Quwain',
    value: CityIds.UMM_AL_QUWAIN,
    key: 'UMM_AL_QUWAIN',
  },
];


export const unitRateMapping: Record<string, string> = {
  "Hot Deals": "hot_deal",
  "Higher ROI": "higher_roi",
  "Luxury": "luxury",
  "Most liked": "most_liked",
  "Featured": "featured",
  "Ready to Move": "ready_to_move",
};

export const floorHeight = {
  'High': 63775,
  'Mid': 63776,
  'Low': 63777,
  'Any': null
}

export const villaLocationData = {
  'Location Corner': 70029,
  'Next To Community': 70030,
  'Beach Front': 70032,
  'Lake': 70031
}

export const officeTypeData ={
  'Fitted out': 70033,
  'Sim fitted out': 70034,
  'Shell and Core': 70035,
}

export const furnishingValues = { "Furnished": 0, "Unfurnished": 1, "Partly furnished": 2 };
export const othersItems = [
  "24 hour maintenance",
  "24 hour security",
  "Basketball court",
  "BBQ & Fire Pits",
  "Beach & Private Beach",
  "Central Location",
  "Children's play area",
  "Childrens Swimming Pool",
  "Coffee Shop",
  "Fitness club",
  "Gym",
  "Health Club",
  "Infinity pool",
  "Kids Pool",
  "Lady's Gym",
  "Soccer",
  "Laundry Service",
  "Leisure and Lap pool",
  "Retails",
  "Marina",
  "Prayer Area",
  "Sky Pod",
  "Private Cinema",
  "Retail and F&B outlets",
  "Sauna & steam rooms",
  "Valet services",
  "Private Pier",
  "Visitor parking",
  "Swimming pool",
  "Valet Parking",
];

export const propertyTypesItems = [
  { name: "Apartment", category: "RESIDENTIAL", id: 411 },
  { name: "Villa", category: "RESIDENTIAL", id: 413 },
  { name: "Townhouse", category: "RESIDENTIAL", id: 422 },
  { name: "Retail", category: "RESIDENTIAL", id: 416 },
  { name: "Plot", category: "RESIDENTIAL", id: 419 },
  { name: "Penthouse", category: "RESIDENTIAL", id: 426 },
  { name: "Mixed Used Building", category: "RESIDENTIAL", id: 21966 },
  { name: "Mixed Used Plots", category: "RESIDENTIAL", id: 421 },
  { name: "Duplex", category: "RESIDENTIAL", id: 62114 },
  { name: "Compound", category: "RESIDENTIAL", id: 21965 },
  { name: "Building", category: "RESIDENTIAL", id: 21963 },
  { name: "Farm", category: "RESIDENTIAL", id: 428 },
  { name: "Hotel Apartment", category: "RESIDENTIAL", id: 63599 },
  { name: "Mansion", category: "RESIDENTIAL", id: 62060 },
  { name: "Residential Floor", category: "RESIDENTIAL", id: 21968 },
  { name: "Terraced Apartment", category: "RESIDENTIAL", id: 63563 },
  { name: "Furnished Apartment", category: "RESIDENTIAL", id: 412 },
  { name: "Simplex", category: "RESIDENTIAL", id: 70022 },
  { name: "Office", category: "COMMERCIAL", id: 417 },
  { name: "Retail", category: "COMMERCIAL", id: 416 },
  { name: "Shop", category: "COMMERCIAL", id: 70024 },
  { name: "Warehouse", category: "COMMERCIAL", id: 414 },
  { name: "Showroom", category: "COMMERCIAL", id: 70025 },
  { name: "Commercial Building", category: "COMMERCIAL", id: 21964 },
  { name: "Commercial Villa", category: "COMMERCIAL", id: 418 },
  { name: "Commercial Floor", category: "COMMERCIAL", id: 424 },
  { name: "Common Area", category: "COMMERCIAL", id: 427 },
  { name: "Mixed Used Building", category: "COMMERCIAL", id: 21966 },
  { name: "Mixed Used Plots", category: "COMMERCIAL", id: 421 },
  { name: "Storage", category: "COMMERCIAL", id: 429 },
  { name: "Business Center", category: "COMMERCIAL", id: 425 },
  { name: "Commercial Plot", category: "COMMERCIAL", id: 420 },
];


export const propertyViewIds = {
  "Sea View": 57838,
  "City View": 18182,
  "Garden View": 18188,
  "Meera": 57858,
  "Pool": 57846,
  "NMC": 57851,
  "Ain Dubai": 63955,
  "Beach View": 18179,
  "Boulevard View": 18180,
  "Burj View": 63998,
  "C53 View": 57857,
  "Canal View": 18181,
  "Community centre View": 58220,
  "Community View": 18183,
  "Compound View": 61954,
  "Corner view": 58221,
  "Cornich View": 18184,
  "Courtyard View": 18185,
  "Desert View": 18186,
  "Dubai Eye": 64034,
  "Emirates Palace": 18187,
  "Entrance View": 58222,
  "External road view": 63555,
  "Gate view": 58223,
  "Golf course view": 57840,
  "Hill view": 63565,
  "Internal road view": 63554,
  "Island View": 57849,
  "Landscape View": 63566,
  "Louvre View": 60626,
  "Main Road view": 58224,
  "Mall View": 57850,
  "Mangrove View": 57847,
  "Marina view": 57839,
  "Marina/Sea view": 57843,
  "Open water view": 63564,
  "Panoramic": 57845,
  "Park view": 57842,
  "Partial marina view": 58232,
  "Partial park view": 58230,
  "Partial sea view": 58231,
  "Penthouse view": 58227,
  "Private garden view": 57841,
  "Reem Island": 57852,
  "Saadiyat Island": 57854,
  "School View": 63553,
  "Sea Side view": 58228,
  "Sh. Khalifa Bridge": 57855,
  "Sheikh Zayed Museum": 62040,
  "Shopping mall View": 57848,
  "Side view": 58226,
  "single row view": 58225,
  "Sky Tower": 57859,
  "Street view": 57844,
  "Yas Island": 57853,
  "Yasmina/ Sea View": 57856
};

export const propertyMapping = {
  
  //Unit Features 
  'Maid Room': 70004, 
  'Driver Room': 70005, 
  'Private Swimming Pool': 70003,
  'Store Room': 70007,
  'Terrace': 70008,

  // From 'In The Property'
  'Built in Wardrobes': 70009,
  'Kitchen Appliances': 70010,
  'Networked': 70011,
  'Private Gym': 70012,
  'Study Room': 70013,
  'Private Jacuzzi': 70014,
  'View of Landmark': 70015,
  'Walk-in Closet': 70016,

  // From 'Popular'
  'Balcony': 70006,
  'Parking': 22052,
  'Gym': 62147,
  "Maids Room": 70004,
  'Storage Room': 70007,
  'Private Pool': 70003,

  // From 'Building/Community'
  "Children's Play Area Outside": 22032,
  'Concierge': 70017,
  "Children's Pool, Beach Access": 22033,
  'Pantry': 57880,
  'Conference Room': 70018,
  'Covered Parking': 63747,
  'Dining In Building': 70019,
  'Lobby In Building': 63651,
  'Maid Service': 70020,
  'Security': 22026,
  'Shared Gym': 61939,
  'Shared Pool': 57860,
  'Beach Access': 22030,

  // From 'Outdoor / Garden'
  'Private Garden': 70021,
  'Barbecue Area': 62144,

  // From 'Others'
  '24 hour maintenance': 22025,
  'Basketball court': 22028,
  'Beach & Private Beach': 57891,
  "Children's play area": 22031,
  "Childrens Swimming Pool": 22033,
  'Coffee Shop': 22034,
  'Fitness club': 22038,
  'Health Club': 57861,
  'Infinity pool': 63805,
  'Kids Pool': 57865,
  "Lady's Gym": 22044,
  'Soccer': 57867,
  'Laundry Service': 22046,
  'Leisure and Lap pool': 63648,
  'Retail': 63616,
  'Marina': 22047,
  'Prayer Area': 22053,
  'Sky Pod': 22061,
  'Private Cinema': 62142,
  'Retail And F&B Outlets': 63636,
  'Sauna & steam rooms': 63649,
  'Valet services': 22066,
  'Private Pier': 57892,
  'Visitor parking': 22067,
  'Swimming pool': 22064,
  'Valet Parking': 63801
};


export const Locations = {
  "Abu Dhabi": 26792,
  "Ajman": 26658,
  "Al Ain": 26827,
  "Dubai": 26786,
  "Fujairah": 26659,
  "Ras Al Khaimah": 58467,
  "Sharjah": 26953,
  "Umm Al Quwain": 64208
};