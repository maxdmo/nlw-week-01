import React, { useState, useEffect, useCallback } from 'react';
import { View, ImageBackground,Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import axios from 'axios';

const Home = () => {

    const [ufs, setUfs] = useState<Item[]>([]);
    const [cities, setCities] = useState<Item[]>([]);
    const [selectedUf, setSelectedUf] = useState(0);
    const [selectedCity, setSelectedCity] = useState(0);

    const navigation = useNavigation();

    function handleNavigateToPoints() {
      navigation.navigate('Points', {
        selectedUf,
        selectedCity
      });
    };

    useEffect(() => {
      async function loadUfs(): Promise<void> {
        const { data } = await axios.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
        );
  
        const parsedUfs = data.map((uf: any) => {
          return {
            key: uf.id,
            value: uf.sigla,
            label: uf.sigla,
          };
        });
  
        setUfs(parsedUfs);
      }
  
      loadUfs();
    }, []);
  
    useEffect(() => {
      async function loadCity(): Promise<void> {
        const { data } = await axios.get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
        );
  
        const parsedCities = data.map((city: City) => {
          return {
            key: city.id,
            value: city.nome,
            label: city.nome,
          };
        });
  
        setCities(parsedCities);
      }
  
      loadCity();
    }, [selectedUf]);
  
    const handleSelectUf = useCallback((value: number) => {
      setSelectedUf(value);
    }, []);
  
    const handleSelectCity = useCallback((value: number) => {
      setSelectedCity(value);
    }, []);

    return (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
            <ImageBackground 
                source={require('../../assets/home-background.png')} 
                style={styles.container}
                imageStyle={{ width: 274, height: 368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />
                    <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                    <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
                </View>

                <View style={styles.footer}>
                  {/* <TextInput 
                    style={styles.input} 
                    placeholder="Digite a UF"
                    onChangeText={setUf}
                    maxLength={2}
                    autoCapitalize="characters"
                    autoCorrect={false}
                  ></TextInput>
                  <TextInput 
                    style={styles.input} 
                    placeholder="Digite a Cidade"
                    autoCorrect={false}
                    onChangeText={setCity}
                  ></TextInput> */}

                  <RNPickerSelect
                    placeholder={{
                      label: 'Selecione um Estado',
                    }}
                    onValueChange={value => handleSelectUf(value)}
                    items={ufs}
                    style={{
                      inputIOSContainer: {
                        height: 60,
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        marginBottom: 20,
                      },
                      iconContainer: { right: 20, top: 20 },
                      placeholder: {
                        color: '#6c6c80',
                        fontSize: 16,
                        fontFamily: 'Roboto_400Regular',
                      },
                      inputIOS: {
                        fontSize: 20,
                        color: '#322153',
                        fontWeight: 'bold',
                      },
                      inputAndroid: {
                        fontSize: 20,
                        color: '#322153',
                        fontWeight: 'bold',
                        height: 60,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        marginBottom: 20,
                      },
                    }}
                    value={selectedUf}
                    Icon={() => (
                      <Icon name="chevron-down" size={24} color="#6c6c80" />
                    )}
                  />

                  <RNPickerSelect
                    disabled={!selectedUf}
                    placeholder={{
                      label: 'Selecione uma Cidade',
                    }}
                    onValueChange={value => handleSelectCity(value)}
                    items={cities}
                    style={{
                      inputIOSContainer: {
                        height: 60,
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        marginBottom: 20,
                      },
                      inputAndroidContainer: {
                        height: 60,
                        backgroundColor: '#fff',
                        borderRadius: 8,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        marginBottom: 20,
                      },
                      iconContainer: { right: 20, top: 20 },
                      placeholder: {
                        color: '#6c6c80',
                        fontSize: 16,
                        fontFamily: 'Roboto_400Regular',
                      },
                      inputIOS: {
                        fontSize: 20,
                        color: '#322153',
                        fontWeight: 'bold',
                      },
                      inputAndroid: {
                        fontSize: 20,
                        color: '#322153',
                        fontWeight: 'bold',
                        height: 60,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        justifyContent: 'center',
                        paddingHorizontal: 20,
                        marginBottom: 20,
                      },
                    }}
                    value={selectedCity}
                    Icon={() => (
                      <Icon name="chevron-down" size={24} color="#6c6c80" />
                    )}
                  />

                  <RectButton style={styles.button} onPress={ handleNavigateToPoints }>
                    <View style={styles.buttonIcon}>
                      <Text>
                        <Icon name="arrow-right" color="#FFF" size={24}></Icon>
                      </Text>
                    </View>
                    <Text style={styles.buttonText}>
                      Entrar
                    </Text>
                  </RectButton>
                </View>
            </ImageBackground>
          </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;