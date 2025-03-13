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
import AddressDropdown from "../addressDropdown";
import categoriesList from "../../assets/categoriesList";
import languagesListFrench from "../../assets/languagesList";
import DatePickerInput from "./dateTimePicker";
import InternalDataSetDropdown from "../internalDataSetDropdown";
import PhoneInput from "./phoneInput";
import MessageModal from "../messageModal";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { addAssociation } from "../../reducers/user";
import { BACKEND_ADDRESS } from "../../assets/url";

export default function NewAssociationForm({ handleBackToDefault }) {
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

  // Récupération infos utilisateur
  const user = useSelector((state) => state.user.value);

  // Initialisation du dispatch
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
      setErrorEmail("Email incomplet ou invalide");
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
  const newAsso = {
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

  // Envoi des données de l'association au backend et affichage de la modale
  const handleRegistrationSubmit = () => {
    if (
      !name ||
      !description ||
      !nationality ||
      !category ||
      !residenceCountry
    ) {
      setMessage(
        `Veuillez compléter tous les champs de la section "Identification de l'association".`
      );
      setIsSuccess(false);
      setModalVisible(true);
      return;
    }

    fetch(`${BACKEND_ADDRESS}/associations/creation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(newAsso),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setMessage("Association créée avec succès !");
          setIsSuccess(true);
          dispatch(addAssociation(data.newAssociation));
        } else {
          setMessage("Une association du même nom existe déjà.");
          setIsSuccess(false);
        }
        setModalVisible(true); // Afficher la modale
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
          <Text style={styles.bigTitle}>Enregistrer</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.subSectionHeader}>
          Identification de l'association
        </Text>
        <View style={styles.firstSubSectionContainer}>
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

        <Text style={styles.subSectionHeader}>Informations de contact</Text>
        <View style={styles.subSectionContainer}>
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
                  fontSize: 12,
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
        <Text style={styles.subSectionHeader}>Informations légale</Text>
        <View style={styles.subSectionContainer}>
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
        <Text style={styles.subSectionHeader}>Autres informations</Text>
        <View style={styles.subSectionContainer}>
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
                  fontSize: 12,
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
                    fontSize: 12,
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
      </ScrollView>
      <View style={styles.bottomBorder} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleRegistrationSubmit()}
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
  },
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
  backButton: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#FFF5E6",
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    marginTop: 10,
  },
  buttonNew: {
    width: "auto",
    height: "auto",
    backgroundColor: "transparent",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "flex-start",
  },
  firstSubSectionContainer: {
    width: "100%",
    gap: 10,
  },
  subSectionContainer: {
    width: "100%",
    gap: 10,
  },
  subSectionHeader: {
    fontWeight: "bold",
    fontWeight: 600,
    fontSize: 20,
    marginTop: 10,
  },
  buttonContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    marginTop: 15,
  },
  button: {
    backgroundColor: "#FF6C02",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 17,
    shadowColor: "#FF6C02",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
    marginBottom: 5,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  inputContainer: {
    width: "100%",
    marginVertical: 10,
  },
  title: {
    color: "#FF6C02",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  input: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#bbbbbb",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 100,
  },
  inputText: {
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    marginLeft: 8,
  },
  dataSelected: {
    fontSize: 5,
    color: "red",
    flexDirection: "row",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
