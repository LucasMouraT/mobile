import React, { useState, useEffect} from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

export default function App(){
  const [ paises, setPaises ] = useState([]);
  const [ carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarCidades();
  }, []);

  const carregarPaises = async () => {
    try{
      const response = await fetch('https://servicodados.ibge.gov.br/api/v1/paises/indicadores/{indicadores}');
      const data = await response.json();
      setCidades(data);
    }catch (error){
      console.error('Erro ao carregar cidades: ', error);
    } finally{
      setCarregando(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cidades</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#0000ff"/>
      ) : (
        <FlatList
        data={cidades}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style = {styles.item}>
            <Text style={styles.text}>{item.nome}</Text>
          </View>
        )}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding:20,
    justifyContent: 'center',
    backgroundColor:'#f4f4f4',
  },
  title:{
    fontSize:22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  text: {
    fontSize: 18,
  },
});
