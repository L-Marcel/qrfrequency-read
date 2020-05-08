import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

import user from '../../config/entity/user';
import db from '../../services/db';

export default function QRRead(){

    //Navigation
    const navigation = useNavigation();

    //Status da Camera
    const [permissao, setPermissao] = useState(null);
    const [scaneado, setScaneado] = useState(false);
    

    //Navegar para perfil
    function navigationToProfile(){
        navigation.navigate('Profile');
    }

    //Scannear qrCode
    const handleScanear = async({ type, data }) => {

        //Informar que já foi Scanneado
        setScaneado(true);
        try {

            //Transforma os dados do qrCode em JSON
            const dataRes = JSON.parse(data);
            
            //Checar se é válido
            if(dataRes.id == null ||
                dataRes.nome == null ||
                dataRes.entradaMin == null ||
                dataRes.entradaMax == null){
                alert("Erro inesperado!");
                navigationToProfile();
            }

            //Coletar data local
            var dateMin = new Date();
            var dateMax = new Date();
            var date = new Date();

            //Coletar horas MAX e MIN
            var hMin = dataRes.entradaMin.split(":");
            var hMax = dataRes.entradaMax.split(":");

            //Salvar horas coletadas
            dateMin.setHours(hMin[0], hMin[1], hMin[2]);
            dateMax.setHours(hMax[0], hMax[1], hMax[2]);

            //Checar se está no intervalo permitido pela atividade
            if(date >= dateMin && date <= dateMax){

                //Formulário
                var form = new FormData();
                form.append('matricula', user.matricula);
                form.append('idAtividade', dataRes.id);

                //Request (Enviar para o banco de dados o registro de ENTRADA/SAIDA)
                const responseDB = await db({
                    method: 'post',
                    url: 'frequencias/salvarAppMobile',
                    data: form,
                    headers: {'Content-Type': 'multipart/form-data' }
                });

                alert(responseDB.data);
            }else{
                alert(`Esta atividade não está no seu horário de funcionamento!\nAbre as: ${hMin[0] + ":" + hMin[1] + ":" + hMin[2]}\nFecga as: ${hMax[0] + ":" + hMax[1] + ":" + hMax[2]}`);
            }

        } catch(Err) {
            alert("Erro ao ler o QRCode." + Err);
        }

        navigationToProfile();
    };

    //Pedir permissão de camera
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setPermissao(status === 'granted');
        })();
    }, []);


    if (permissao === null) {

        //Render enquanto não informado
        return(
            <View style={styles.container}></View>
        );

    }else if(permissao === false){

        //Informar que o App não recebeu a permissão
        alert("O QRFrequency não recebeu permissão para usar a camera!");
        navigationToProfile();
        
    }

    //Render
    return (<View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scaneado? undefined:handleScanear}
          style={styles.scanner}
        />
        <AntDesign
            style={styles.scannerMark} 
            name={"scan1"}
            size={250} 
            color={"red"}/>
        <TouchableOpacity style={styles.scannerButton} onPress={navigationToProfile}>
            <Text style={styles.scannerButtonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>);
}