import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [result, setResult] = useState(null);
  function getResult({ type, data }) {
    setScanned(true);
    const newData = {
      type: type,
      data: data,
    };
    setResult(newData);
    setOpenCamera(false);
    setScanned(false);
  }
  function closeCamera() {
    setOpenCamera(false);
    setScanned(false);
  }
  async function openScanner() {
    if (hasPermission === null) {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setOpenCamera(true);
    } else {
      setOpenCamera(true);
    }
  }

  return (
    <View style={styles.container}>
      <Ionicons name="camera" size={50} color="green" onPress={openScanner} />
      <Text style={styles.text}>Tap camera icon for scanner.</Text>
      {openCamera && (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : getResult}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.closeButtonContainer}>
            <Button title="Close" onPress={closeCamera} color="green"></Button>
          </View>
        </>
      )}
      {result && openCamera == false ? (
        <Text style={styles.resultText}>
          Result type: {result.type} Result Data: {result.data}
        </Text>
      ) : null}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#161616",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
  },
  closeButtonContainer: {
    position: "absolute",
    bottom: 10,
  },
  resultText: {
    color: "green",
    fontSize: 14,
    marginTop: 10,
  },
});
