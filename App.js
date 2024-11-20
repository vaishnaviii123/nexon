import React from 'react';
import {View,Text} from 'react-native';
import TodoList from './src/components/TodoList';

const App = () =>{
  return (
    <View>
      <TodoList/>
    </View>
  )
}

const style=styles.create({
  container:{
    flex:1,
  }
})
export default App;