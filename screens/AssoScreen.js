import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewAssociationForm from "../components/newAssociationForm";
import MyAssociations from "../components/myAssociations";
import UpdateAssociationInfo from "../components/updateAssociationInfo"
import React, { useState } from "react";

export default function AssoScreen({ navigation }) {

  const [typeContent, setTypeContent] = useState("default");

  const handleBackToDefault = () => {
    setTypeContent("default");
  }

  const handleTypeContent = () => {
    setTypeContent("NewAssociationForm");
  }

  let content;

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
