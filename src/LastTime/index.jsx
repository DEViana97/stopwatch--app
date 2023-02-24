import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export function LastTime({data}) {
  return <Text style={styles.textoCorrida}>Ultimo tempo: {data}</Text>;
}

const styles = StyleSheet.create({
  textoCorrida: {git
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic',
    flexDirection: 'column',
  },
});
