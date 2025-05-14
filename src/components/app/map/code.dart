void callGetSearchFilter() {
  getSearchFilter(
    cityId: cityNameSearching == null ? cityName : cityNameSearching,
    propertyId: propertyIdSearching,
    communityId: communityIdSearching,

    operationType: operationType,

    unitType: selectedCategories == 0
        ? (residentialId.isEmpty ? null : residentialId.join(','))
        : (commercialId.isEmpty ? null : commercialId.join(',')),
    completion: (operationType == OperationTypeEnum.RENT)
        ? null
        : selectedCompletion == null
            ? null
            : getCompletion(typeCompletion[selectedCompletion ?? 0]),
    priceFrom: priceFromValue == 0.0
        ? null
        : double.parse(priceFromValue.toString()).toInt(),
    priceTo: priceToValue == 0.0 || priceToValue == 50000000
        ? null
        : double.parse(priceToValue.toString()).toInt(),
    unitSizeFrom: propertySizeFromValue == 0.0
        ? null
        : double.parse(propertySizeFromValue.toString()).toInt(),
    unitSizeTo: propertySizeToValue == 0.0 || propertySizeToValue == 1000
        ? null
        : double.parse(propertySizeToValue.toString()).toInt(),
    bathrooms: selectedBathRooms.isEmpty
        ? null
        : selectedBathRooms.join(',').replaceAll('+', ''),
    bedrooms: selectedBedRooms.isEmpty
        ? null
        : selectedBedRooms.join(',').replaceAll('+', '').replaceAll('studio', '0'),
    amenities: amenitiesId.isEmpty ? null : amenitiesId.join(','),
    furnishing: selectedFurnishing == null
        ? null
        : selectedFurnishing == 0
            ? '1'
            : '2',
    perPage: 100,
    sortBy: selectedFilters == null ? null : getSorting(selectedFilters ?? ''),
    propertyUsage: typePropertyUsage[selectedCategories],
    featured: typeLabelStatus['Featured'],
    mostLiked: typeLabelStatus['Most Liked'],
    higherRoi: typeLabelStatus['Higher ROI'],
    readyToMove: typeLabelStatus['Ready to Move'],
    hotDeal: typeLabelStatus['Hot Deals'],
    floorHeight: selectedFloorHeight,
    locationFeatures: selectedTypeVilla,
    petsAllowed: selectedOption == null
        ? null
        : selectedOption == 'yes'
            ? true
            : false,
    numberOfFloors: selectedNumbersFloors.isEmpty
        ? null
        : selectedNumbersFloors.join(',').replaceAll('+', ''),
    plotSizeFrom: plotSizeFromValue == 0.0
        ? null
        : double.parse(plotSizeFromValue.toString()).toInt(),
    plotSizeTo: plotSizeToValue == 0.0 || plotSizeToValue == 10000
        ? null
        : double.parse(plotSizeToValue.toString()).toInt(),
    primaryViews: selectedPrimarySecondary == 0
        ? (selectedPropertyViewsType.isEmpty ? null : selectedPropertyViewsType.join(','))
        : null,
    secondaryViews: selectedPrimarySecondary == 1
        ? (selectedPropertyViewsType.isEmpty ? null : selectedPropertyViewsType.join(','))
        : null,
    unitRefNo: propertyIdController.text.isEmpty ? null : propertyIdController.text,
    handoverDateFrom: handoverDateFrom,
    handoverDateTo: handoverDateTo,
  );
}
