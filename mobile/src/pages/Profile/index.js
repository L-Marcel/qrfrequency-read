import React from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

import db from '../../services/db';
import user from '../../config/entity/user';
import responseFalta from '../Justify/responseFalta';

export default function Profile(){

    //Navigation
    const navigation = useNavigation();

    //Navegar para o leitor de qrCode
    function qrRead(){
        navigation.navigate('Read');
    }
    
    //Navegar/Carregar página de justificar faltas
    async function navigateToJustify(){

        //Carregar lista de faltas
        var response = await loadFaltas();
        
        //Remover todos os null do JSON (recebe em formato de String)
        for(var i in response){
            if(response[i].mensagem == "null"){
                response[i].mensagem = "";
            }
            if(response[i].assunto == "null"){
                response[i].assunto = "";
            }

            //Salvar todas as faltas temporáriamente
            responseFalta.todasFaltas[i] = response[i];
        }

        //Checar se existe faltas pendentes
        if(responseFalta.todasFaltas == []){
            alert("Você não tem nenhuma falta registrada!");
            navigateToProfile();
        }else{
            navigation.navigate('Justify');
        }
    }
    
    //Carregar lista de faltas
    async function loadFaltas(){

        //Request 
        let responseDB = await db({
            method: 'get',
            url: 'faltas/listarPorUsuarioMobile?id=' + user.id,
            headers: {'Content-Type': 'multipart/form-data' }
        });

        return responseDB.data;
    }

    //Apagar dados temporários
    function logout(){
        user.id = 0,
        user.token = '',
        user.matricula = '',
        user.nome = '',
        navigation.navigate('Login');
    }

    //Render
    return (<View style={styles.container}>
        <View style={styles.nameContainer}>
            <Text style={[styles.name, {color: 'red'}]}>{user.nome.split(" ")[0]}</Text>
            <Text style={styles.name}>{user.nome.split(" ")[1]}</Text>
        </View>
        <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.option} onPress={qrRead}>
                <Text style={styles.optionText}>Registrar entrada/saida</Text>
                <MaterialCommunityIcons
                style={styles.optionLogo} 
                name={"qrcode-scan"}
                size={28} 
                color={"red"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={navigateToJustify}>
            <Text style={styles.optionText}>Justificar falta</Text>
                <AntDesign
                style={styles.optionLogo} 
                name={"form"}
                size={28} 
                color={"red"}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={logout}>
            <Text style={styles.optionText}>Sair</Text>
                <AntDesign
                style={styles.optionLogo} 
                name={"close"}
                size={28} 
                color={"red"}/>
            </TouchableOpacity>
        </View>
    </View>);
}