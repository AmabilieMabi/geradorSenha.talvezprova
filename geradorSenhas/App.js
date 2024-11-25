import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';
 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
 
import SavedPasswords from './src/img/screens/SavedPasswords.js';
import { ModalPassword } from './src/components/modal/index.js';
 
let charset = "abcdefghijklmnopqrstuvwxyz!@#$#&$*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
 
const Stack = createStackNavigator();
 
function HomeScreen({ navigation }) {
  const [senhaGerada, setSenhaGerada] = useState("") //muda o estado da variável
  const [modalVisible, setModalVisible] = useState(false) // esta definindo q o estado inicial da variável é zero
  const [savedPasswords, setSavedPasswords] = useState([]);
 
  function gerarSenha() {
 
    let senha = ""; //variável vazia
 
    for (let i = 0, n = charset.length; i < 10; i++) { //length transforma em número
      senha += charset.charAt(Math.floor(Math.random() * n)); //vai 'juntar as coisas' //random ->
    }
 
    setSenhaGerada(senha);
    setModalVisible(true);
 
  }

  function salvarSenha() {
    setSavedPasswords(prevPasswords => {
        const updatedPasswords = [...prevPasswords, senhaGerada]; // Adiciona a nova senha
        setModalVisible(false);
        // Passa as senhas salvas para a tela SavedPasswords de forma mais segura
        navigation.navigate('SavedPasswords', { savedPasswords: updatedPasswords });
        return updatedPasswords;
    });
}
 
  return (
    <View style={styles.container}>
      <Image
        source={require("./src/img/gatito.png")}
        style={styles.logo}
      />
 
      <Text style={styles.title}> LockGen </Text>
 
      <TouchableOpacity style={styles.button} onPress={gerarSenha}>
        <Text style={styles.textButton}> Gerar Senha </Text>
      </TouchableOpacity>
      <br></br>
 
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SavedPasswords', { savedPasswords })}>
  <Text style={styles.textButton}> Senhas Salvas </Text>
</TouchableOpacity>
 
 
      <Modal visible={modalVisible} animationType='fade' transparent={true}>
        <ModalPassword senha={senhaGerada} fecharModal={() => setModalVisible(false)} salvarSenha={salvarSenha} />
      </Modal>
 
    </View>
  );
}
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SavedPasswords" component={SavedPasswords} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1BB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#333',
    width: '70%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 6,
  },
  textButton: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  senha: {
    marginTop: 20,
    color: '#333',
    fontSize: 15,
    fontWeight: 'bold',
  },
});