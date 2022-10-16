import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function App() {
  //states
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [result, setResult] = useState(null);
  //
  function getResult({ type, data }) {
    //If the barcode is scanned successfully, its values are thrown into the state as an object and then updated on the screen.
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
      //If there is no permission when the camera button is tapped, the user is asked first.
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setOpenCamera(true);
    } else {
      //If the camera is allowed, direct guidance is made.
      setOpenCamera(true);
    }
  }

  return (
    <View style={styles.container}>
      {/*Camera button and text*/}
      <Ionicons name="camera" size={50} color="green" onPress={openScanner} />
      <Text style={styles.text}>Tap camera icon for scanner.</Text>
      {/*Scanner component*/}
      {openCamera && (
        <>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : getResult}
            style={StyleSheet.absoluteFillObject}
          />
          {/*Close button*/}
          <View style={styles.closeButtonContainer}>
            <Button title="Close" onPress={closeCamera} color="green"></Button>
          </View>
        </>
      )}
      {/*If there is a result after the scan, it is shown on the screen with this text. */}
      {result && openCamera === false ? (
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
