import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
const API_URL = 'https://reqres.in/api/users?page=2';

const FetchedData = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const fetchApi=async()=>{
      const response=await fetch(API_URL);
      const data=await response.json();
      setData(data.data)
    }
    fetchApi(data);
  },[])

  const renderItem = ({item}) => (
    <View style={styles.box}>
      <Text>{item.id} </Text>
      <Text>{item.email} </Text>
      <Text>{item.first_name} </Text>
      <Text>{item.last_name} </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.text}>favorite item</Text>
      <FlatList
        data={data}
        keyExtractor={item => item?.id?.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  list:{
  flex:1,
   backgroundColor:'red',
   alignItems:'center'
  },
  box:{
    flexDirection:"row",
    width:'90%',
    borderWidth:1,
    borderColor:'#ccc',
    borderRadius:2,
    marginVertical:10
  }

});
export default FetchedData;
