import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {LastTime} from './src/LastTime';

let timer = null;
let ultimoTempo = [];
let ss = 0;
let mn = 0;
let hh = 0;

export default function App() {
  const [numero, setNumero] = useState('00:00:00');
  const [botao, setBotao] = useState('vai');
  const [ultimo, setUltimo] = useState([]);

  function vai() {
    if (timer !== null) {
      clearInterval(timer);

      setBotao('VAI');
    } else {
      timer = setInterval(() => {
        ss++;
        if (ss === 60) {
          ss = 0;
          mn++;
        }
        if (mn === 60) {
          mn = 0;
          hh++;
        }
        let format =
          (hh < 10 ? '0' + hh : hh) +
          ':' +
          (mn < 10 ? '0' + mn : mn) +
          ':' +
          (ss < 10 ? '0' + ss : ss);

        setNumero(format);
      }, 1000);
      setBotao('PARAR');
    }
  }

  function limpar() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    ultimoTempo = [...ultimoTempo, numero];

    setUltimo(ultimoTempo);
    setNumero('00:00:00');
    ss = 0;
    mn = 0;
    hh = 0;
    setBotao('VAI');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />

      <Text style={styles.timer}>{numero}</Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}>{botao}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={limpar}
          disabled={timer === null ? true : false}>
          <Text style={styles.btnTexto}>Limpar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltima}>
        <View style={styles.ultimoTempo}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={ultimo}
            renderItem={({item}) => (
              <LastTime data={item} key={Math.random()} />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef',
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef',
  },
  areaUltima: {
    marginTop: 40,
    height: 200,
  },
  textoCorrida: {
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic',
    flexDirection: 'column',
  },
  ultimoTempo: {
    flexDirection: 'column',
  },
});
