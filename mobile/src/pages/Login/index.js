import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, Switch, TouchableOpacity, AsyncStorage } from 'react-native';

import db from '../../services/db';
import user from '../../config/entity/user';
import configLogin from '../../config/files/configLogin';
import suap from '../../services/suap';

export default function Login(){

    //Navigation
    const navigation = useNavigation();

    //Dados do usuário
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //Configuração de Login
    const [remember, setRemember] = useState(false);
    var switchOption = remember;

    //Carregar configurações do App dentro do dispositivo
    retrieveConfig();

    //Voltar para o perfil
    function navigateToProfile(){
        navigation.navigate('Profile');
    }

    //Atualizar escolha do usuário
    async function updateRemember(){
        switchOption = !switchOption;
        setRemember(switchOption);

        //Salvar configuração
        setConfig();
    }

    //Salvar configuração dentro do dispositivo
    async function setConfig(){
        try {
            await AsyncStorage.setItem('qrFrequency@configLoginDefRemember', `${switchOption}`);
            if(switchOption){
                await AsyncStorage.setItem('qrFrequency@configLoginDefUser', `${username}`);
                await AsyncStorage.setItem('qrFrequency@configLoginDefPass', `${password}`);
            }else{
                await AsyncStorage.setItem('qrFrequency@configLoginDefUser', ``);
                await AsyncStorage.setItem('qrFrequency@configLoginDefPass', ``);
            }
        } catch (error) {
          console.log(error);
        }
    };

    //Carregar configuração dentro do dispositivo
    async function retrieveConfig(){
        try {
            configLogin.def_remember = await AsyncStorage.getItem('qrFrequency@configLoginDefRemember');
            var us = await AsyncStorage.getItem('qrFrequency@configLoginDefUser');
            var pa = await AsyncStorage.getItem('qrFrequency@configLoginDefPass');
            if(configLogin.def_remember == "true" && configLogin.def_remember != null && us != null && pa != null){        
                configLogin.def_user = us;
                configLogin.def_pass = pa;
                setRemember(true);      
                if(username == ''){
                    setUsername(configLogin.def_user);
                    setPassword(configLogin.def_pass);
                }else{
                    setConfig();
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    //Logar com SUAP
    async function handleLogin(){

        //Salvar configuração
        setConfig();
        try {

            //Request de Login com SUAP (Informa o Token)
            const response = await suap.post('autenticacao/token/', { username, password });
            
            //Formulário
            var form = new FormData(form);
            form.append('matricula', username);
            form.append('senha', password);

            //Request do Banco de Dados (Informa se um usuário novo se conectou)
            const responseDB  = await db({
                method: 'post',
                url: 'logins/autenticarsuapapp',
                data: form,
                headers: {'Content-Type': 'multipart/form-data' }
            });

            //Caso o JSON não sera retornado
            if(responseDB == 0){
                alert("Erro inesperado.");
                return;
            }
            
            //Salvar token temporário do usuário
            user.token = 'JWT ' + response.data.token;

            //Request de dados do SUAP (Informa os dados do usuário)
            const dados = await suap.get('minhas-informacoes/meus-dados/', {
                headers: {Authorization: user.token}
            });

            //Salvar dados temporários do usuário
            user.nome = dados.data.nome_usual;
            user.id = responseDB.data.id;
            user.matricula = username;

            //Atualizar interface
            setUsername('');
            setPassword('');
            navigationToProfile();
        } catch(Err) {
            alert(`Erro: cheque os dadosinformados ou sua conexão com a internet.`);
        }
    }

    //Render
    return (<View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={[styles.title, {color: 'red'}]}>QR</Text>
            <Text style={styles.title}>Frequency - Read</Text>
        </View>
        <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Entrar com SUAP</Text>
            <View style={styles.inputContainer}>
                <AntDesign 
                    style={styles.userLogo} 
                    name={"user"}
                    size={28} 
                    color={"black"}/>
                <TextInput
                    keyboardType={"numeric"}
                    placeholder={"Matricula"}
                    placeholderTextColor={"#878686"}
                    style={styles.input}
                    maxLength={ 14 } 
                    value={username}
                    onChangeText={username =>setUsername(username)}
                    selectionColor={"#ff8080"}
                />
            </View>
            <View style={styles.inputContainer}>
                <MaterialCommunityIcons
                    style={styles.passLogo} 
                    name={"textbox-password"} 
                    size={28} 
                    color={"black"}/>
                <TextInput
                    secureTextEntry={true}
                    placeholder={"Senha do SUAP"}
                    placeholderTextColor={"#878686"}
                    style={styles.input}
                    value={password}
                    onChangeText={password =>setPassword(password)}
                    selectionColor={"#ff8080"}
                />
            </View>
            <View style={styles.switchContainer}>
                <Switch 
                    ios_backgroundColor={'#820303'}
                    trackColor={{false: '#820303', true: '#e60000'}}
                    thumbColor={'#ff0000'}
                    onChangeValue={switchOption}
                    onChange={updateRemember}
                    value={remember}
                    style={styles.switch}/>
                <Text style={styles.switchText}>Sempre usar esses dados? {switchOption? "Sim.":"Não."}</Text>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Entrar</Text>
            </TouchableOpacity>
        </View>
    </View>);
}