import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Pressable,
  TextInput,
} from "react-native";
import Input from "../input";
import CountryDropdown from "../countryDropdown";
import AddressDropdown from "./addressDropdown";
import categoriesList from "../../assets/categoriesList";
import languagesListFrench from "../../assets/languagesList";
import DatePickerInput from "./dateTimePicker";
import InternalDataSetDropdown from "./internalDataSetDropdown";
import PhoneInput from "./phoneInput";
import MessageModal from "./messageModal";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addAssociation } from "../../reducers/user";
import { BACKEND_ADDRESS } from "../../assets/url";

export default function UpdateAssociationInfo({ handleBackToDefault }) {
  //Etats pour les données de l'association
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nationality, setNationality] = useState("");
  const [residenceCountry, setResidenceCountry] = useState("");
  const [category, setCategory] = useState("");
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState("");
  const [streetNumberAndLabel, setStreetNumberAndLabel] = useState("");
  const [zipcode, setZipcode] = useState(null);
  const [city, setCity] = useState("");
  const [department, setDepartment] = useState("");
  const [country, setCountry] = useState("");
  const [languages, setLanguages] = useState([]);
  const [interventionZone, setInterventionZone] = useState([]);
  const [creationDate, setCreationDate] = useState(null);
  const [lastDeclarationDate, setlastDeclarationDate] = useState(null);
  const [legalNumber, setLegalNumber] = useState("");
  const [members, setMembers] = useState([]);
  const [socialNetworks, setSocialNetworks] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [history, setHistory] = useState([]);
  const [missions, setMissions] = useState([]);
  const [associationID, setAssociationID] = useState("test");

  // Récupération infos utilisateur
  const user = useSelector((state) => state.user.value);

  // Initialisation du dispatch
  const dispatch = useDispatch();

  // Etats et fonction pour dynamisation du formulaire d'enregistrement d'une association

  // Champs d'identification de l'association
  const categoriesDataSet = categoriesList.map((category, i) => ({
    id: `${i}`,
    title: category,
  }));

  const selectResidenceCountry = (country) => {
    if (country) {
      setResidenceCountry(country);
      setCountry(country);
    }
  };

  const resetResidenceCountry = () => {
    setResidenceCountry("");
    setCountry("");
  };

  const selectNationality = (country) => {
    if (country) {
      setNationality(country);
    }
  };

  const resetNationality = () => {
    setNationality("");
  };

  const selectCategory = (category) => {
    if (category) {
      setCategory(category);
    }
  };

  // CHAMPS CONTACT

  // Numéro de téléphone
  const addPhoneNumber = (phoneNumber) => {
    if (phoneNumber) {
      setPhone((phone) => [...phone, phoneNumber]);
    }
  };

  const handleChangePhoneNumber = (text, index) => {
    setPhone((prev) => {
      const updated = [...prev];
      updated[index] = text;
      return updated;
    });
  };

  const removePhoneNumber = (index) => {
    const inputs = phone;
    const newInputs = inputs.filter((_, i) => i !== index);
    setPhone(newInputs);
  };

  //Vérificationd de l'email
  const [errorEmail, setErrorEmail] = useState("");
  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  useEffect(() => {
    if (email?.length == 0) {
      setErrorEmail("");
    } else if (EMAIL_REGEX.test(email)) {
      setErrorEmail("");
    } else {
      setErrorEmail("email incomplet ou invalide");
    }
  }, [email]);

  const updateAddressProperties = (data) => {
    if (
      data &&
      data.features &&
      data.features[0] &&
      data.features[0].properties
    ) {
      setStreetNumberAndLabel(data.features[0].properties.name);
      setZipcode(data.features[0].properties.postcode);
      setCity(data.features[0].properties.city);
      setDepartment(data.features[0].properties.context.slice(0, 2));
    } else {
      console.error("Invalid address data:", data);
    }
  };

  // Champs informations légales
  const selectCreationDate = (date) => {
    if (date) {
      setCreationDate(date);
    }
  };

  const selectLastDeclarationDate = (date) => {
    if (date) {
      setlastDeclarationDate(date);
    }
  };

  // CHAMPS AUTRES INFORMATIONS

  // Langues parlées
  const languagesListFrenchDataSet = languagesListFrench.map((language, i) => ({
    id: `${i}`,
    title: language,
  }));

  const selectLanguages = (language) => {
    if (language) {
      setLanguages((languages) => [...languages, language]);
    }
  };

  const handleChangeLanguages = (text, index) => {
    setLanguages((prev) => {
      const updated = [...prev];
      updated[index] = text;
      return updated;
    });
  };

  const removeLanguage = (index) => {
    const inputs = languages;
    const newInputs = inputs.filter((_, i) => i !== index);
    setLanguages(newInputs);
  };

  //Zone d'intervention

  const selectInterventionZone = (country) => {
    if (!country) return; // Empêche d'ajouter undefined
    setInterventionZone((interventionZone) => [...interventionZone, country]);
  };

  const resetInterventionZone = () => {
    // fonction vide car valide une propriété destinée aux champs d'input qui alimentent des états de type String (pas les états de type Array)
  };

  const handleChangeInterventionZone = (text, index) => {
    setInterventionZone((prev) => {
      const updated = [...prev];
      updated[index] = text;
      return updated;
    });
  };

  const removeInterventionZone = (index) => {
    const inputs = interventionZone;
    const newInputs = inputs.filter((_, i) => i !== index);
    setInterventionZone(newInputs);
  };

  // Récupération des données de l'association dans les états
  const updatedData = {
    name,
    description,
    residenceCountry,
    nationality,
    category,
    address: {
      street: streetNumberAndLabel,
      zipcode,
      city,
      department,
      country,
    },
    phone,
    email,
    members,
    socialNetworks,
    languages,
    interventionZone,
    lastDeclarationDate,
    creationDate,
    legalNumber,
    gallery,
    history,
    missions,
    _id: associationID,
  };

  // Etats pour affichage de la modale (message de confirmation)
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);

  const handleClose = () => {
    if (isSuccess) {
      setModalVisible(false);
      handleBackToDefault();
    } else {
      setModalVisible(false);
    }
  };

  // MISE A JOUR DES INFORMATIONS DE L'ASSOCIATION

  // Etat pour stocker l'ID de l'association modifiée

  // Variable pour mettre à jour tous les états sans appeler les setters individuellement
  const setters = {
    name: setName,
    description: setDescription,
    nationality: setNationality,
    residenceCountry: setResidenceCountry,
    category: setCategory,
    phone: setPhone,
    email: setEmail,
    streetNumberAndLabel: setStreetNumberAndLabel,
    zipcode: setZipcode,
    city: setCity,
    department: setDepartment,
    country: setCountry,
    languages: setLanguages,
    interventionZone: setInterventionZone,
    creationDate: setCreationDate,
    lastDeclarationDate: setlastDeclarationDate,
    legalNumber: setLegalNumber,
    members: setMembers,
    socialNetworks: setSocialNetworks,
    gallery: setGallery,
    history: setHistory,
    missions: setMissions,
    _id: setAssociationID,
  };

  // Fonction pour mise à jour de plusieurs états en une fois
  const updateStates = (newValues) => {
    Object.entries(newValues).forEach(([key, value]) => {
      if (setters[key]) {
        setters[key](value); // Appelle le setter correspondant à la clé
      }
    });
  };

  // Chargement des données de l'asso dans le formulaire
  useEffect(() => {
    fetch(
      `${BACKEND_ADDRESS}/associations/associationBeingUpdated/${user.associationBeingUpdated}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        updateStates(data.AssociationData);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération :", error)
      );
  }, []);

  // Envoi des données au backend pour mise à jour
  const handleUpdateSubmit = () => {

    if (
      !name ||
      !description ||
      !nationality ||
      !category ||
      !residenceCountry
    ) {
      setMessage("❌ Une erreur s'est produite, veuillez réessayer.");
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    fetch(`${BACKEND_ADDRESS}/associations/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMessage("✅ Données mises à jour avec succès !");
          setIsSuccess(true);
          dispatch(addAssociation(data.newAssociation));
        } else {
          setMessage("❌ Une erreur s'est produite, veuillez réessayer.");
          setIsSuccess(false);
        }
        setModalVisible(true);
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setMessage("⚠️ Une erreur s'est produite, veuillez réessayer.");
        setIsSuccess(false);
        setModalVisible(true);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.fakeModal}>
        <View style={styles.newResearch}>
          <View style={styles.buttonNew}>
            <TouchableOpacity
              onPress={handleBackToDefault}
              style={styles.backButton}
            >
              <FontAwesome name="arrow-left" size={24} color="#FF6C02" />
            </TouchableOpacity>
          </View>
          <Text style={styles.bigTitle}>Mettre à jour</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.safeAreaContainer}>
          <View style={styles.firstSubSectionContainer}>
            <Text style={styles.subSectionHeader}>
              Identification de l'association
            </Text>
            <Input
              title="Nom de l'association"
              placeholder="Nom de l'association"
              value={name}
              onChangeText={(value) => {
                if (value.length <= 150) {
                  setName(value);
                }
              }}
              secureTextEntry={false}
              icon="pencil"
            />
            <Input
              title="Description"
              placeholder="Objet de l'association"
              value={description}
              onChangeText={(value) => {
                if (value.length <= 1000) {
                  setDescription(value);
                }
              }}
              secureTextEntry={false}
              icon="pencil"
            />
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Pays de résidence de l'asso"
                placeholder={residenceCountry || "Choisir un pays"}
                onSelectCountry={selectResidenceCountry}
                selectedCountry={residenceCountry}
                resetInput={() => resetResidenceCountry()}
              />
            </View>
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Pays d'origine des membres"
                placeholder={nationality || "Choisir un pays"}
                onSelectCountry={selectNationality}
                selectedCountry={nationality}
                resetInput={() => resetNationality()}
              />
            </View>
            <InternalDataSetDropdown
              title="Secteurs d'activité"
              dataSet={categoriesDataSet}
              placeholder={category || "Choisir un secteur"}
              value={category}
              onSelectItem={(item) => {
                selectCategory(item?.title);
              }}
            />
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Informations de contact</Text>
            <Input
              title="Email"
              keyboardType="email-address"
              placeholder="Email"
              value={email}
              onChangeText={(value) => {
                if (value.length <= 100) {
                  setEmail(value);
                }
              }}
              secureTextEntry={false}
              icon="pencil"
            />
            {errorEmail ? (
              <Text style={styles.errorText}>{errorEmail}</Text>
            ) : null}
            <PhoneInput
              title="Téléphone(s)"
              placeholder="06..."
              value={phone}
              onChangeText={addPhoneNumber}
              secureTextEntry={false}
            />
            {phone.map((value, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    padding: 10,
                    marginVertical: 10,
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    borderColor: "#bbbbbb",
                    fontSize: 14,
                  }}
                  value={phone[index] || ""}
                  onChangeText={(text) => handleChangePhoneNumber(text, index)}
                  placeholder={`Phone ${index + 1}`}
                />
                <TouchableOpacity
                  onPress={() => removePhoneNumber(index)}
                  style={{
                    width: 40,
                    height: 40,
                    marginLeft: 10,
                    padding: 10,
                    backgroundColor: "#FF6C02",
                    borderRadius: 180,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <FontAwesome
                    name={"minus"}
                    size={25}
                    color="#ffffff"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.dropdown}>
              <AddressDropdown
                title="Numéro et libellé de la voie"
                placeholder="Ex: 35 Avenue des Champs Elysées"
                onSelectAddress={setZipcode}
                selectedAddress={streetNumberAndLabel}
                updateAddressProperties={updateAddressProperties}
              />
            </View>
            <Input
              title="Code postal"
              placeholder="Exemple: 75008"
              value={zipcode}
              onChangeText={(value) => {
                if (value.length <= 20) {
                  setZipcode(value);
                }
              }}
              secureTextEntry={false}
            />
            <Input
              title="Ville"
              placeholder="Exemple: Paris"
              value={city}
              onChangeText={(value) => {
                if (value.length <= 150) {
                  setCity(value);
                }
              }}
              secureTextEntry={false}
            />
            <Input
              title="N° de département"
              placeholder="Exemple: 75"
              value={department}
              onChangeText={(value) => {
                if (value.length <= 150) {
                  setDepartment(value);
                }
              }}
              secureTextEntry={false}
            />
            <Input
              title="Pays"
              placeholder="Exemple: France"
              value={country}
              onChangeText={(value) => {
                if (value.length <= 150) {
                  setCountry(value);
                }
              }}
              secureTextEntry={false}
            />
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Informations légale</Text>
            <DatePickerInput
              title="Date de création"
              value={creationDate}
              selectDate={selectCreationDate}
            />
            <Input
              title="Numéro d'identification"
              placeholder="Exemple: W111000000"
              value={legalNumber}
              onChangeText={(value) => {
                if (value.length <= 150) {
                  setLegalNumber(value);
                }
              }}
              secureTextEntry={false}
              icon="pencil"
            />
            <DatePickerInput
              title="Date dernière déclaration"
              value={lastDeclarationDate}
              selectDate={selectLastDeclarationDate}
            />
          </View>
          <View style={styles.subSectionContainer}>
            <Text style={styles.subSectionHeader}>Autres informations</Text>
            <InternalDataSetDropdown
              title="Langues parlées"
              dataSet={languagesListFrenchDataSet}
              placeholder="Choisir une ou plusieurs langues"
              value={languages}
              onSelectItem={(item) => {
                selectLanguages(item?.title);
              }}
            />
            {languages.map((value, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <TextInput
                  style={{
                    flex: 1,
                    borderWidth: 1,
                    padding: 10,
                    marginVertical: 10,
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    borderColor: "#bbbbbb",
                    fontSize: 14,
                  }}
                  value={languages[index] || ""}
                  onChangeText={(text) => handleChangeLanguages(text, index)}
                  placeholder={`Language ${index + 1}`}
                />
                <TouchableOpacity
                  onPress={() => removeLanguage(index)}
                  style={{
                    width: 40,
                    height: 40,
                    marginLeft: 10,
                    padding: 10,
                    backgroundColor: "#FF6C02",
                    borderRadius: 180,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <FontAwesome
                    name={"minus"}
                    size={20}
                    color="#ffffff"
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <View style={styles.dropdown}>
              <CountryDropdown
                title="Zone d'intervention"
                placeholder="Sélectionner un ou plusieurs pays"
                onSelectCountry={selectInterventionZone}
                resetInput={() => resetInterventionZone()}
              />
              {interventionZone.map((value, index) => (
                <View
                  key={index}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <TextInput
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      padding: 10,
                      marginVertical: 10,
                      backgroundColor: "#ffffff",
                      borderRadius: 8,
                      borderColor: "#bbbbbb",
                      fontSize: 14,
                    }}
                    value={interventionZone[index] || ""}
                    onChangeText={(text) =>
                      handleChangeInterventionZone(text, index)
                    }
                    placeholder={`interventionZone ${index + 1}`}
                  />
                  <TouchableOpacity
                    onPress={() => removeInterventionZone(index)}
                    style={{
                      width: 40,
                    height: 40,
                    marginLeft: 10,
                    padding: 10,
                    backgroundColor: "#FF6C02",
                    borderRadius: 180,
                    justifyContent: 'center',
                    alignItems: 'center'
                    }}
                  >
                    <FontAwesome
                      name={"minus"}
                      size={20}
                      color="#ffffff"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleUpdateSubmit()}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.textButton}>Valider</Text>
        </TouchableOpacity>
      </View>
      <MessageModal
        visible={modalVisible}
        message={message}
        isSuccess={isSuccess}
        onClose={() => handleClose()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5F5",
  },
  fakeModal: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  newResearch: {
    width: "90%",
    height: "auto",
    alignItems: "flex-start",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 30,
  },
  bigTitle: {
    fontWeight: "600",
    fontSize: 30,
    marginTop: 10,
  },
  buttonNew: {
    width: "auto",
    height: "auto",
    backgroundColor: "transparent",
  },
  headerContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#333",
  },
  scrollContainer: {
    flexGrow: 1,
    width: "90%",
    paddingVertical: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    color: "#444",
  },
  inputContainer: {
    width: "100%",
    marginTop: 10,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "white",
    fontSize: 16,
  },
  dropdown: {
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "#FF6C02",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    width: "90%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  multiInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  subSectionHeader: {
    fontWeight: "bold",
    fontWeight: 600,
    fontSize: 20,
    marginTop: 10,
  },
  removeButton: {
    width: 40,
    height: 40,
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#FF6C02",
    borderRadius: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  removeIcon: {
    color: "white",
    fontSize: 18,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
});
