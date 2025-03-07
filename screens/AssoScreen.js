import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NewAssociationForm from "../components/newAssociationForm";
import MyAssociations from "../components/myAssociations";
import React, { useState } from "react";

export default function AssoScreen() {

  const [typeContent, setTypeContent] = useState("default");

  const handleTypeContent = (type) => {
    setTypeContent(type);
  }

  let content;

  if (typeContent == "default") {
    content = <MyAssociations handleTypeContent={handleTypeContent} />;
  } else if (typeContent == "form") {
    content = <NewAssociationForm />;
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
