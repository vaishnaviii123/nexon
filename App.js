import React from 'react';
import {View,Text} from 'react-native';
import TodoList from './src/components/TodoList';
import FetchedData from './src/components/FetchedData';

const App = () =>{
  return (
    <View>
      <FetchedData/>
      {/* <TodoList/> */}
    </View>
  )
}

const style=styles.create({
  container:{
    flex:1,
  }
})
export default App;