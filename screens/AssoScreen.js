import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewAssociationForm from "../components/newAssociationForm";
import MyAssociations from "../components/myAssociations";
import UpdateAssociationInfo from "../components/updateAssociationInfo"
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
    user.AssociationUpdated && setTypeContent("UpdateAssociationForm")
  }, [user.AssociationUpdated])

  if (typeContent == "default") {
    content = <MyAssociations handleTypeContent={handleTypeContent} />;
  } else if (typeContent == "NewAssociationForm") {
    content = <NewAssociationForm handleBackToDefault={handleBackToDefault}/>;
  } else if (typeContent == "UpdateAssociationForm") {
    content = <UpdateAssociationInfo handleBackToDefault={handleBackToDefault}/>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
});
