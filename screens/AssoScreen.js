import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewAssociationForm from "../components/assoScreen/newAssociationForm";
import MyAssociations from "../components/assoScreen/myAssociations";
import UpdateAssociationInfo from "../components/assoScreen/updateAssociationInfo"
import { saveAssociationForUpdate } from "../reducers/user";
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


export default function AssoScreen({ navigation }) {
   const dispatch = useDispatch();

   const user = useSelector((state) => state.user.value);

  const [typeContent, setTypeContent] = useState("default");

  const handleBackToDefault = () => {
    setTypeContent("default");
    dispatch(saveAssociationForUpdate(null))
  }

  const handleTypeContent = () => {
    setTypeContent("NewAssociationForm");
  }

  // GESTION DE L'AFFICHAGE
  let content;

  useEffect (() => {
    user.associationBeingUpdated && setTypeContent("UpdateAssociationForm")
  }, [user.associationBeingUpdated])

  if (typeContent == "default") {
    content = <MyAssociations handleTypeContent={handleTypeContent} />;
  } else if (typeContent == "NewAssociationForm") {
    content = <NewAssociationForm handleBackToDefault={handleBackToDefault}/>;
  } else if (typeContent == "UpdateAssociationForm") {
    content = <UpdateAssociationInfo handleBackToDefault={handleBackToDefault}/>
  }

  return (
    <View style={{ flex: 1 }}>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: 'green'
  },
});
