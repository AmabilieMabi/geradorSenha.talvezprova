import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native';

import { NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from 'react-navigation/stack';

import SavedPasswords from './src/screens/SavedPasswords'; 
import { ModalPassword } from './src/components/modal/index';


let charset = "abcdefghijklmnopqrstuvwxyz@123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
const [senhaGerada, setSenhaGerada] = useState("");
const [modalVisible, setModalVisible] = useState(false);
const [SavedPasswords, setSavedPasswords] = useState([]);

function gerarSenha() {

let senha = "";

for (let i = 0, n = charset.length; i < 10; i++){
senha += charset.charAt(Math.floor(Math.random() * n));
}

setSenhaGerada(senha);
setModalVisible(true);

}

function salvarSenha() {
    setSavedPasswords(prevPasswords => {
        const updatePasswords = [...prevPasswords, senhaGerada];
        setModalVisible(false);
        navigation.navigate('SavedPasswords', {SavedPasswords:  updatePasswords});
        return updatePasswords;
    });
}

return (
    <View style={styles.container}>
    <Image
    source={require("./src/img/logo.png")}
    style={styles.logo}
    />

    <Text style={styles.title}>LockGen</Text>

    <TouchableOpacity style={styles.button} onPress={gerarSenha}>
    <Text style={styles.textButton}> Gerar Senha </Text>
    </TouchableOpacity>

    <Modal visible={modalvisible} animationType="fade" transparent={true} >

    <ModalPassword senha={senhagerada} handleClose={()=> setModalVisible(false)} salvarSenha={salvarSenha}>
    </Modal>
    <Text style={styles.senha}>{senhaGerada}</Text>
    </View>
    );
    