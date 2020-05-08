import React, { useState } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Picker} from 'react-native';

import db from '../../services/db';
import user from '../../config/entity/user';
import responseFalta from './responseFalta';

export default function Justify(){
    
    //Navigation
    const navigation = useNavigation();

    //Index padrão de exibição
    const [ind, setInd] = useState(0);

    //Dados coletados
    const [assunto, setAssunto] = useState(responseFalta.todasFaltas[ind].assunto);
    const [mensagem, setMensagem] = useState(responseFalta.todasFaltas[ind].mensagem);

    //Voltar para o perfil
    function navigateToProfile(){
        navigation.navigate('Profile');
    }

    //Enviar justificativa de falta
    async function send(){
        try {

            //Formulário
            var form = new FormData();
            form.append('id', Number(responseFalta.todasFaltas[ind].id));
            form.append('falta.assunto', assunto);
            form.append('falta.mensagem', mensagem);


            //Request
            const enviarFalta = await db({
                method: 'post',
                url: 'faltas/registrarmobile',
                data: form,
                headers: {'Content-Type': 'multipart/form-data' }
            });
            
            alert('Enviado com sucesso!');
            navigateToProfile();
        } catch(Err) {
            alert('Erro ao enviar!');
        }
    }

    //Atualizar atravez do Index
    async function update(x, i){
        responseFalta.todasFaltas[i] = x;
        setMensagem(responseFalta.todasFaltas[i].mensagem);
        setAssunto(responseFalta.todasFaltas[i].assunto);
        setInd(i); 
    }

    //Render
    return (<View style={styles.container}>
        <View style={styles.nameContainer}>
            <Text style={[styles.name, {color: 'red'}]}>{user.nome.split(" ")[0]}</Text>
            <Text style={styles.name}>{user.nome.split(" ")[1]}</Text>
        </View>
        <ScrollView>
        <View style={styles.optionContainer}>
            <TouchableOpacity style={styles.option} onPress={navigateToProfile}>
            <Text style={styles.optionText}>Cancelar</Text>
                <AntDesign
                style={styles.optionLogo} 
                name={"close"}
                size={28} 
                color={"red"}/>
            </TouchableOpacity>
            <View style={[styles.option, { flexDirection: "column"}]}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}>
                    <Text style={styles.optionText}>Falta referente:</Text>
                    <FontAwesome
                    style={styles.optionLogo} 
                    name={"calendar"}
                    size={28} 
                    color={"red"}/>
                </View>
                <View style={styles.textInputPickerView}>
                    <Picker
                        selectedValue={responseFalta.todasFaltas[ind]}
                        style={styles.textInputPicker}
                        onValueChange={(itemValue, itemIndex) => {update(itemValue, itemIndex)}}
                        >
                        {responseFalta.todasFaltas.map((item, index) => {
                        return (<Picker.Item label={item.atividade} value={item} key={index}/>) 
                        })}
                    </Picker>
                </View>
            </View>
            <View style={[styles.option, {flexDirection: 'column'}]}>
            <Text style={styles.optionText}>Assunto</Text>
                <TextInput
                    value={assunto}
                    onChangeText={(value) => {setAssunto(value)}}
                    style={styles.textInputMult}
                    maxLength={25}
                ></TextInput>
            </View>
            <View style={[styles.option, {flexDirection: 'column'}]}>
            <Text style={styles.optionText}>Sua Justificativa</Text>
                <TextInput multiline
                    value={mensagem}
                    onChangeText={(value) => {setMensagem(value)}}
                    numberOfLines={10}
                    editable
                    style={styles.textInputMult}
                ></TextInput>
            </View>
            <TouchableOpacity style={styles.option} onPress={send}>
            <Text style={styles.optionText}>Enviar</Text>
                <FontAwesome
                style={styles.optionLogo} 
                name={"send-o"}
                size={28} 
                color={"red"}/>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </View>);
}