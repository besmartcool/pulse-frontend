import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import CityDropdown from "../cityDropdown";
import CountryDropdown from "../countryDropdown";

export default function SearchFilters({
  handleBackToDefault,
  handleFilteredSearch,
  originCountry,
  setOriginCountry,
  destinationCountry,
  setDestinationCountry,
  destinationCity,
  setDestinationCity,
  associationsCategories,
  criteriasView,
  toggleCriterias,
  handleShowResult,
}) {
  return (
    <View style={styles.fakeModal}>
      <View style={styles.research}>
        <View style={styles.top}>
          <TouchableOpacity onPress={handleBackToDefault} style={styles.backButton}>
            <FontAwesome name="arrow-left" size={24} color="#FF6C02" />
          </TouchableOpacity>
        </View>

        <View style={styles.allInputs}>
          <View style={styles.dropdown}>
            <CountryDropdown
              title="Pays d'origine"
              placeholder="Sélectionner un pays"
              selectedCountry={originCountry}
              onSelectCountry={setOriginCountry}
            />
          </View>

          <View style={styles.dropdown}>
            <CountryDropdown
              title="Pays de destination"
              placeholder="Sélectionner un pays"
              selectedCountry={destinationCountry}
              onSelectCountry={(country) => {
                setDestinationCountry(country);
                handleFilteredSearch(country, destinationCity);
              }}
            />
          </View>

          <View style={styles.dropdown}>
            <CityDropdown
              title="Ville de destination"
              placeholder="Sélectionner une ville"
              selectedCity={destinationCity}
              onSelectCity={(city) => {
                setDestinationCity(city);
                handleFilteredSearch(destinationCountry, city);
              }}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          contentContainerStyle={styles.categoriesContainer}
          showsHorizontalScrollIndicator={false}
        >
          {associationsCategories}
        </ScrollView>

        {criteriasView && (
          <View style={styles.criteriasContainer}>
            <TouchableOpacity style={styles.criteria}>
              <Text style={styles.criteriaText}>A-Z</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.criteria}>
              <Text style={styles.criteriaText}>Date de création</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.criteria}>
              <Text style={styles.criteriaText}>Statut</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.validateButton} onPress={toggleCriterias}>
            <FontAwesome name="filter" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.validateButton} onPress={handleShowResult}>
            <FontAwesome name="angle-up" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fakeModal: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderBottomRightRadius: 36,
    borderBottomLeftRadius: 36,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  research: {
    width: "90%",
    height: "auto",
    marginTop: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#FFF5E6",
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: "auto",
    height: "auto",
  },
  allInputs: {
    width: "100%",
    marginTop: 10,
  },
  dropdown: {
    width: "100%",
    marginBottom: 10,
    height: 70,
  },
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  validateButton: {
    height: 55,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C02",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  criteriasContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 8,
    justifyContent: "flex-start",
  },
  criteria: {
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#FF6C02",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#FFF5E6",
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  criteriaText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6C02",
  },
});
