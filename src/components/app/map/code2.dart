import 'package:flutter/material.dart';

bool canSaveSearch = false;

String? handoverDateFrom;
String? handoverDateTo;

final List<int> residentialId = [];
final Map<int, String> typeResidentialType = {
  411: 'Apartment',
  413: 'Villa',
  422: 'Townhouse',
  416: 'Retail',
  419: 'Plot',
  426: 'Penthouse',
  21966: 'Mixed Used Building',
  421: 'Mixed Used Plots',
  62114: 'Duplex',
  21965: 'Compound',
  21963: 'Building',
  428: 'Farm',
  63599: 'Hotel Apartment',
  62060: 'Mansion',
  21968: 'Residential Floor',
  63563: 'Terraced Apartment',
  412: 'Furnished Apartment',
  70022: 'Simplex',
};

final List<int> commercialId = [];
final Map<int, String> typeCommercialType = {
  417: 'Office',
  416: 'Retail',
  70024: 'Shop',
  414: 'Warehouse',
  70025: 'Showroom',
  21964: 'Commercial Building',
  418: 'Commercial Villa',
  424: 'Commercial Floor',
  427: 'Common Area',
  21966: 'Mixed Used Building',
  421: 'Mixed Used Plots',
  429: 'Storage',
  425: 'Business Center',
  420: 'Commercial Plot',
};

int? selectedTypeVilla;
final Map<int, String> typeVilla = {
  70029: 'Location Corner',
  70030: 'Next To Community',
  70032: 'Beach Front',
  70031: 'Lake'
};

final List<int> amenitiesId = [];
final Map<String, Map<int, String>> amenitiesTypeSelect = {
  'Popular': {
    70006: 'Balcony',
    22052: 'Parking',
    62147: 'Gym',
    70004: "Maid's Room",
    70007: 'Storage Room',
    70003: 'Private Pool',
  },
  'In The Property': {
    70009: 'Built-In Wardrobes',
    70010: 'Kitchen Appliances',
    70011: 'Networked',
    70012: 'Private Gym',
    70013: 'Study Room',
    70014: 'Private Jacuzzi',
    70015: 'View Of Landmark',
    70016: 'Walk-In Closet',
  },
  'Building/Community': {
    22032: "Children's Play Area Outside",
    70017: 'Concierge',
    22033: "Children's Pool, Beach Access",
    57880: 'Pantry',
    70018: 'Conference Room',
    63747: 'Covered Parking',
    70019: 'Dining In Building',
    63651: 'Lobby In Building',
    70020: 'Maid Service',
    22026: 'Security',
    61939: 'Shared Gym',
    57860: 'Shared Pool',
    22030: 'Beach Access',
  },
  'Outdoor / Garden': {
    70021: 'Private Garden',
    62144: 'Barbecue Area',
  },
  'Others': {
    22025: '24 Hour Maintenance',
    22028: 'Basketball Court',
    57891: 'Beach & Private Beach',
    22031: "Children's Play Area Inside",
    22033: "Children's Swimming Pool",
    22034: 'Coffee Shop',
    22038: 'Fitness Club',
    57861: 'Health Club',
    63805: 'Infinity Pool',
    57865: 'Kids Pool',
    22044: "Lady's Gym",
    57867: 'Soccer',
    22046: 'Laundry Service',
    63648: 'Leisure And Lap Pool',
    63616: 'Retail',
    22047: 'Marina',
    22053: 'Prayer Area',
    22061: 'Sky Pod',
    62142: 'Private Cinema',
    63636: 'Retail And F&B Outlets',
    63649: 'Sauna & Steam Rooms',
    22066: 'Valet Services',
    57892: 'Private Pier',
    22067: 'Visitor Parking',
    22064: 'Swimming Pool',
    63801: 'Valet Parking',
  },
};

final List<String> selectedBedRooms = [];
final List<String> typeBedRooms = [
  'studio',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '+7'
];

final List<String> selectedBathRooms = [];
final List<String> typeBathRooms = ['1', '2', '3', '4', '5', '6', '+7'];

final List<int> selectedOfficeType = [];

final Map<int, String> typeOfficeType = {
  70033: 'Fitted out',
  70034: 'Sim Fitted',
  70035: 'Sheel and Core'
};

final Map<int, String> typeUnitFeaturesType = {
  70004: 'Maid Room',
  70005: 'Driver Room',
  70003: 'Private Swimming Pool',
  70006: 'Balcony',
  70007: 'Storage room',
  70008: 'Terrace',
};

final List<int> selectedPropertyViewsType = [];
final Map<int, String> typePropertyViewsType = {
  57838: 'Sea View',
  18182: 'City View',
  18188: 'Garden View',
  57858: 'Meera',
  57846: 'Pool',
  57851: 'NMC',
  63955: 'Ain Dubai',
  18179: 'Beach View',
  18180: 'Boulevard View',
  63998: 'Burj View',
  57857: 'C53 View',
  18181: 'Canal View',
  58220: 'Community centre View',
  18183: 'Community View',
  61954: 'Compound View',
  58221: 'Corner view',
  18184: 'Cornich View',
  18185: 'Courtyard View',
  18186: 'Desert View',
  64034: 'Dubai Eye',
  18187: 'Emirates Palace',
  58222: 'Entrance View',
  63555: 'External road view',
  58223: 'Gate view',
  57840: 'Golf course view',
  63565: 'Hill view',
  63554: 'Internal road view',
  57849: 'Island View',
  63566: 'Landscape View',
  60626: 'Louvre View',
  58224: 'Main Road view',
  57850: 'Mall View',
  57847: 'Mangrove View',
  57839: 'Marina view',
  57843: 'Marina/Sea view',
  63564: 'Open water view',
  57845: 'Panoramic',
  57842: 'Park view',
  58232: 'Partial marina view',
  58230: 'Partial park view',
  58231: 'Partial sea view',
  58229: 'Partial sea view',
  58227: 'Penthouse view',
  57841: 'Private garden view',
  57852: 'Reem Island',
  57854: 'Saadiyat Island',
  63553: 'School View',
  58228: 'Sea Side view',
  57855: 'Sh. Khalifa Bridge',
  62040: 'Sheikh Zayed Museum',
  57848: 'Shopping mall View',
  58226: 'Side view',
  58225: 'single row view',
  57859: 'Sky Tower',
  57844: 'Street view',
  57853: 'Yas Island',
  57856: 'Yasmina/ Sea View'
};
final Map<int, String> typePropertyViewsSecType = {
  18183: 'Community View',
  57838: 'Sea View',
  57846: 'Pool View',
  18182: 'City',
  18188: 'Garden View',
  57858: 'Meera',
  57851: 'NMC',
  63955: 'Ain Dubai',
  18179: 'Beach View',
  18180: 'Boulevard View',
  63998: 'Burj View',
  57857: 'C53 View',
  18181: 'Canal View',
  58220: 'Community centre View',
  61954: 'Compound View',
  58221: 'Corner view',
  18184: 'Cornich View',
  18185: 'Courtyard View',
  18186: 'Desert View',
  64034: 'Dubai Eye',
  18187: 'Emirates Palace',
  58222: 'Entrance View',
  63555: 'External road view',
  58223: 'Gate view',
  57840: 'Golf course view',
  63565: 'Hill view',
  63554: 'Internal road view',
  57849: 'Island View',
  63566: 'Landscape View',
  60626: 'Louvre View',
  58224: 'Main Road view',
  57850: 'Mall View',
  57847: 'Mangrove View',
  57839: 'Marina view',
  57843: 'Marina/Sea view',
  63564: 'Open water view',
  57845: 'Panoramic',
  57842: 'Park view',
  58232: 'Partial marina view',
  58230: 'Partial park view',
  58231: 'Partial sea view',
  58229: 'Partial sea view',
  58227: 'Penthouse view',
  57841: 'Private garden view',
  57852: 'Reem Island',
  57854: 'Saadiyat Island',
  63553: 'School View',
  58228: 'Sea Side view',
  57855: 'Sh. Khalifa Bridge',
  62040: 'Sheikh Zayed Museum',
  57848: 'Shopping mall View',
  58226: 'Side view',
  58225: 'single row view',
  57859: 'Sky Tower',
  57844: 'Street view',
  57853: 'Yas Island',
  57856: 'Yasmina/ Sea View'
};

final List<String> selectedNumbersFloors = [];
final List<String> typeNumbersFloors = ['1', '2', '3', '+4'];

int? selectedCompletion;
final List<String> typeCompletion = ['Off-Plan', 'Ready'];

int? selectedCompletionForMap;
final List<String> typeCompletionForMap = ['Off-Plan', 'Ready'];

int? selectedFurnishing;
final List<String> typeFurnishing = [
  'Furnished',
  'unFurnishing',
  //'Partly Furnished'
];

int? selectedFloorHeight;
final Map<int, String> typeFloorHeight = {
  63775: 'High',
  63776: 'Medium',
  63777: 'Low',
};

String? selectedOption;

final formKeyFilters = GlobalKey<FormState>();

TextEditingController priceFrom = TextEditingController();
TextEditingController priceTo = TextEditingController();

TextEditingController propertySizeFrom = TextEditingController();
TextEditingController propertySizeTo = TextEditingController();

TextEditingController plotSizeFrom = TextEditingController();
TextEditingController plotSizeTo = TextEditingController();

double priceFromValue = 0.0;
double priceToValue = 50000000;

double propertySizeFromValue = 0.0;
double propertySizeToValue = 1000;

double plotSizeFromValue = 0.0;
double plotSizeToValue = 10000;

int selectedCategories = 0;
final List<String> typeCategories = ['Residential', 'Commercial'];
final List<String> typePropertyUsage = ['RESIDENTIAL', 'COMMERCIAL'];

int selectedPrimarySecondary = 0;
final List<String> typePrimarySecondary = ['Primary', 'Secondary'];

List<int> selectedLabelTypes = [];

final Map<String, bool?> typeLabelStatus = {
  'Hot Deals': null,
  'Higher ROI': null,
  'Most Liked': null,
  'Featured': null,
  'Ready to move': null
};

final Map<String, String?> typeLabelType = {
  'Hot Deals': 'HOT_DEALS',
  'Higher ROI': 'HIGHER_ROI',
  'Most Liked': 'MOST_LIKED',
  'Featured': 'FEATURED',
  'Ready to Move': 'READY_TO_MOVE'
};

final Map<String, String?> typeLabelTypeTwo = {
  'Hot Deals': 'HOT_DEALS',
  'Most Liked': 'MOST_LIKED',
  'Featured': 'FEATURED',
  'Ready to Move': 'READY_TO_MOVE'
};

/// For MapView filter
String? handoverMapDateFrom;
String? handoverMapDateTo;
final List<int> searchResidentialId = [];
final Map<int, String> searchTypeResidentialType = {
  411: 'Apartment',
  413: 'Villa',
  422: 'Townhouse',
  416: 'Retail',
  419: 'Plot',
  426: 'Penthouse',
  21966: 'Mixed Used Building',
  421: 'Mixed Used Plots',
  62114: 'Duplex',
  21965: 'Compound',
  21963: 'Building',
  428: 'Farm',
  63599: 'Hotel Apartment',
  62060: 'Mansion',
  21968: 'Residential Floor',
  63563: 'Terraced Apartment',
  412: 'Furnished Apartment',
  70022: 'Simplex',
};

final List<int> searchCommercialId = [];
final Map<int, String> searchTypeCommercialType = {
  417: 'Office',
  416: 'Retail',
  70024: 'Shop',
  414: 'Warehouse',
  70025: 'Showroom',
  21964: 'Commercial Building',
  418: 'Commercial Villa',
  424: 'Commercial Floor',
  427: 'Common Area',
  21966: 'Mixed Used Building',
  421: 'Mixed Used Plots',
  429: 'Storage',
  425: 'Business Center',
  420: 'Commercial Plot',
};

int? searchSelectedTypeVilla;
final Map<int, String> searchTypeVilla = {
  70029: 'Location Corner',
  70030: 'Next To Community',
  70032: 'Beach Front',
  70031: 'Lake'
};

final List<int> searchAmenitiesId = [];
final Map<String, Map<int, String>> searchAmenitiesTypeSelect = {
  'Popular': {
    70006: 'Balcony',
    22052: 'Parking',
    62147: 'Gym',
    70004: "Maid's Room",
    70007: 'Storage Room',
    70003: 'Private Pool',
  },
  'In The Property': {
    70009: 'Built-In Wardrobes',
    70010: 'Kitchen Appliances',
    70011: 'Networked',
    70012: 'Private Gym',
    70013: 'Study Room',
    70014: 'Private Jacuzzi',
    70015: 'View Of Landmark',
    70016: 'Walk-In Closet',
  },
  'Building/Community': {
    22032: "Children's Play Area Outside",
    70017: 'Concierge',
    22033: "Children's Pool, Beach Access",
    57880: 'Pantry',
    70018: 'Conference Room',
    63747: 'Covered Parking',
    70019: 'Dining In Building',
    63651: 'Lobby In Building',
    70020: 'Maid Service',
    22026: 'Security',
    61939: 'Shared Gym',
    57860: 'Shared Pool',
    22030: 'Beach Access',
  },
  'Outdoor / Garden': {
    70021: 'Private Garden',
    62144: 'Barbecue Area',
  },
  'Others': {
    22025: '24 Hour Maintenance',
    22028: 'Basketball Court',
    57891: 'Beach & Private Beach',
    22031: "Children's Play Area Inside",
    22033: "Children's Swimming Pool",
    22034: 'Coffee Shop',
    22038: 'Fitness Club',
    57861: 'Health Club',
    63805: 'Infinity Pool',
    57865: 'Kids Pool',
    22044: "Lady's Gym",
    57867: 'Soccer',
    22046: 'Laundry Service',
    63648: 'Leisure And Lap Pool',
    63616: 'Retail',
    22047: 'Marina',
    22053: 'Prayer Area',
    22061: 'Sky Pod',
    62142: 'Private Cinema',
    63636: 'Retail And F&B Outlets',
    63649: 'Sauna & Steam Rooms',
    22066: 'Valet Services',
    57892: 'Private Pier',
    22067: 'Visitor Parking',
    22064: 'Swimming Pool',
    63801: 'Valet Parking',
  },
};

final List<String> searchSelectedBedRooms = [];
final List<String> searchTypeBedRooms = [
  'studio',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '+7'
];

final List<String> searchSelectedBathRooms = [];
final List<String> searchTypeBathRooms = ['1', '2', '3', '4', '5', '6', '+7'];

final List<int> searchSelectedOfficeType = [];
final Map<int, String> searchTypeOfficeType = {
  70033: 'Fitted out',
  70034: 'Sim Fitted',
  70035: 'Sheel and Core'
};

final Map<int, String> searchTypeUnitFeaturesType = {
  70004: 'Maid Room',
  70005: 'Driver Room',
  70003: 'Private Swimming Pool',
  70006: 'Balcony',
  70007: 'Storage room',
  70008: 'Terrace',
};

final List<int> searchSelectedPropertyViewsType = [];
final Map<int, String> searchTypePropertyViewsType = {
  57838: 'Sea View',
  18182: 'City View',
  18188: 'Garden View',
  18179: 'Beach View',
  18181: 'Canal View',
  18183: 'Community View',
  57839: 'Marina View',
  57840: 'Golf Course View',
  57842: 'Park View',
  57843: 'Marina/Sea View',
  57844: 'Street View',
  57845: 'Panoramic',
  57846: 'Pool View',
  57847: 'Mangrove View',
  57849: 'Island View',
  57850: 'Mall View',
  58221: 'Corner View',
  58229: 'Partial Sea View',
  58230: 'Partial Park View',
  58232: 'Partial Marina View',
  63566: 'Landscape View',
  70072: 'Landmark View',
};

final Map<int, String> searchTypePropertyViewsSecType = {
  18183: 'Community View',
  57838: 'Sea View',
  57846: 'Pool View',
  18179: 'Beach View',
  18181: 'Canal View',
  18182: 'City View',
  18188: 'Garden View',
  57839: 'Marina View',
  57840: 'Golf Course View',
  57842: 'Park View',
  57843: 'Marina/Sea View',
  57844: 'Street View',
  57845: 'Panoramic',
  57847: 'Mangrove View',
  57849: 'Island View',
  57850: 'Mall View',
  58221: 'Corner View',
  58229: 'Partial Sea View',
  58230: 'Partial Park View',
  58232: 'Partial Marina View',
  63566: 'Landscape View',
  70072: 'Landmark View',
};

final List<String> searchSelectedNumbersFloors = [];
final List<String> searchTypeNumbersFloors = ['1', '2', '3', '+4'];

int? searchSelectedCompletion;
final List<String> searchTypeCompletion = ['Off-Plan', 'Ready'];

int? searchSelectedFurnishing;
final List<String> searchTypeFurnishing = [
  'Furnished',
  'unFurnishing',
  //'Partly Furnished'
];

int? searchSelectedFloorHeight;
final Map<int, String> searchTypeFloorHeight = {
  63775: 'High',
  63776: 'Medium',
  63777: 'Low',
};

String? searchSelectedOption;

final searchFormKeyFilters = GlobalKey<FormState>();

TextEditingController searchPriceFrom = TextEditingController();
TextEditingController searchPriceTo = TextEditingController();

TextEditingController searchPropertySizeFrom = TextEditingController();
TextEditingController searchPropertySizeTo = TextEditingController();

TextEditingController searchPlotSizeFrom = TextEditingController();
TextEditingController searchPlotSizeTo = TextEditingController();

double searchPriceFromValue = 0.0;
double searchPriceToValue = 50000000;
double searchToPriceValue = 0.0;
double searchPropertySizeFromValue = 0.0;
double searchPropertySizeToValue = 1000;
double searchPropertyToSizeValue = 0.0;

double searchPlotSizeFromValue = 0.0;
double searchPlotSizeToValue = 10000;

int searchSelectedCategories = 0;
final List<String> searchTypeCategories = ['Residential', 'Commercial'];
final List<String> searchTypePropertyUsage = ['RESIDENTIAL', 'COMMERCIAL'];

int searchSelectedPrimarySecondary = 0;
final List<String> searchTypePrimarySecondary = ['Primary', 'Secondary'];

List<int> searchSelectedLabelTypes = [];

final Map<String, bool?> searchTypeLabelStatus = {
  'Hot Deals': null,
  'Higher ROI': null,
  'Most Liked': null,
  'Featured': null,
  'Ready to Move': null
};

final Map<String, String?> searchTypeLabelType = {
  'Hot Deals': 'HOT_DEALS',
  'Higher ROI': 'HIGHER_ROI',
  'Most Liked': 'MOST_LIKED',
  'Featured': 'FEATURED',
  'Ready to Move': 'READY_TO_MOVE'
};

final Map<String, String?> searchTypeLabelTypeTwo = {
  'Hot Deals': 'HOT_DEALS',
  'Most Liked': 'MOST_LIKED',
  'Featured': 'FEATURED',
  'Ready to Move': 'READY_TO_MOVE'
};
