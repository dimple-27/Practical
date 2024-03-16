import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import { color } from '../utils/colors';

const StripScreen = props => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.titleStyle}>Test Strip</Text>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex:1}}>
          <View style={{height:'100%',width:40,borderRadius:10,borderWidth:1}}>
            {color.map(item => {
              return (
                <View
                  key={item.color}
                  style={{height:100,alignItems:'center',justifyContent:'center'}}
                  onPress={() => {}}>
                  <TouchableOpacity style={{backgroundColor:'cadetblue',width:40,height:20}}/>
                </View>
              );
            })}
          </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding:20
  },
  titleStyle:{
    fontSize:28,
    fontWeight:'bold',
    color:'blue',
    marginTop:30
  }
 
});

export default StripScreen;
