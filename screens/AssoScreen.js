import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewAssociationForm from "../components/newAssociationForm";
import MyAssociations from "../components/myAssociations";
import React, { useState } from "react";

export default function AssoScreen({ navigation }) {

  const [typeContent, setTypeContent] = useState("default");

  const handleBackToDefault = () => {
    setTypeContent("default");
  }

  const handleTypeContent = () => {
    setTypeContent("form");
  }

  let content;

  if (typeContent == "default") {
    content = <MyAssociations handleTypeContent={handleTypeContent} />;
  } else if (typeContent == "form") {
    content = <NewAssociationForm handleBackToDefault={handleBackToDefault}/>;
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
