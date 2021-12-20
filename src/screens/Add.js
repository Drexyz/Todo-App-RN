import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Input , Stack, Button, Switch, Box, Center, TextArea, ArrowBackIcon } from "native-base";

// Import Axios
import axios from "axios";

const Add = ({navigation}) => {
  const [title, setTitle] = React.useState("")
  const [textAreaValue, setTextAreaValue] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => setTitle(event.target.value);
  const demoValueControlledTextArea = (e) => {
    setTextAreaValue(e.target.value)
  }

  const addTask = () => {
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
      .post("http://localhost:5000/api/v1/todo", body, config)
      .then((res) => {
        console.log(res)
        navigation.navigate("Todos")
      })
      .catch(() => {
        alert("Error Fetch Data");
        setIsLoading(false);
      });
  }
  
  return (
    <View style={style.container}>
      <Stack direction="column" mb="2.5" mt="16" space={3} w={{ base: "85%" }}>
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
          totalLines={12}
          size="lg"
        />
        <Button onPress={addTask} style={style.add}>Add Task</Button>
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
  add: {
    backgroundColor: "#1abc9c"
  },
});

export default Add;