import { StatusBar } from "react-native";
import { StyleSheet, Text, View} from "react-native";


export default function App(){
  return (
    <View style={styles.container}>
      <Text>Reiniciando a bagaça</Text>
      <StatusBar  />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});