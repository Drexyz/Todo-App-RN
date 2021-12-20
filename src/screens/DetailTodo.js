import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Input , Stack, Button, TextArea, Switch, Box, Center, ArrowBackIcon } from "native-base";

// Import Axios
import axios from "axios";

const DetailTodo = ({navigation, route}) => {
  const [title, setTitle] = useState(route.params.title);
  const [textAreaValue, setTextAreaValue] = useState(route.params.desc);
  const [id, setId] = useState(route.params.id)
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (event) => setTitle(event.target.value);
  const demoValueControlledTextArea = (e) => {
    setTextAreaValue(e.target.value)
  }

  const editTask = () => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const inputForm = {
      title : title,
      desc : textAreaValue
    }

    // Convert form data to string 
    const body = JSON.stringify(inputForm);

    axios
      .patch(`http://localhost:5000/api/v1/todo/${id}`, body, config)
      .then((res) => {
        console.log(res)
        navigation.navigate("Todos")
      })
      .catch(() => {
        alert("Error Fetch Data");
        setIsLoading(false);
      });
  }
  const deleteTask = () => {
    axios
    .delete(`http://localhost:5000/api/v1/todo/${id}`)
    .then((res) => {
      //console.log(res)
      navigation.navigate("Todos")
    })
    .catch(() => {
      alert("Error Fetch Data");
      setIsLoading(false);
    });
  }
  
  return (
    <View style={style.container}>
      <Stack direction="column" mb="2.5" mt="8" space={3} w={{ base: "85%" }}>
        <Button width="14%" onPress={() => navigation.navigate("Todos")}>
          <ArrowBackIcon size="4" color="white" />
        </Button>
        <Input
          value={title}
          onChange={handleChange}
          placeholder="Title Task"
          backgroundColor="white"
          size="lg"
        />
        <TextArea
          value={textAreaValue}
          onChange={demoValueControlledTextArea}
          backgroundColor='white'
          placeholder="Task Description"
          size="lg"
          totalLines={12}
        />
        <Button style={style.edit} onPress={editTask}>Edit Task</Button>
        <Button style={style.delete} onPress={deleteTask}>Delete Task</Button>
      </Stack>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#74b9ff",
    alignItems: "center",
  },
  delete: {
    backgroundColor: "#e74c3c"
  },
  edit: {
    backgroundColor: "#1abc9c"
  }
});

export default DetailTodo;