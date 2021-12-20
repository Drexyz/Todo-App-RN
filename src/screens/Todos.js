import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Input, Stack, Button, Switch, Box, Center, Checkbox, 
        CloseIcon, AddIcon, Pressable, Fab, Heading} from "native-base";

// Import Axios
import axios from "axios";

const Todos = ({ navigation }) => {
  //state
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState([]);
  const [fab, setFab] = useState(true)

  //get todo from DB
  const getTodo = () => {
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/v1/todos")
      .then((res) => {
        setTodo(res.data.data.todos);
        setShow(res.data.data.todos);
        //console.log(res.data.data.todos)
        setIsLoading(false);
      })
      .catch(() => {
        alert("Error Fetch Data");
        setIsLoading(false);
      });
  };

  // did mount -> getTodo
  React.useEffect(() => {
    const alertas = navigation.addListener('focus', () => {
      // Screen was focused
      // Do something
      getTodo()
      setFab(true)
    });

    return alertas;
  }, [navigation]);

  //change status task/ todo
  const statusTask = (status) => {
    if (status === 'true') {return true}
    else if (status === 'false') {return false}
  }
  const changeStatus = (item) => {
    console.log(`id = ${item.id}`);
    
    //======prepare to edit data in database======//
    const changeTo = (item.completed === 'true') ? ('false') : ('true');
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const inputForm = { completed : changeTo }
    // Convert form data to string 
    const body = JSON.stringify(inputForm);

    //========edit data in database=======//
    axios
      .patch(`http://localhost:5000/api/v1/todo/${item.id}`, body, config)
      .then((res) => {
        console.log(res)
      })
      .catch(() => {
        alert("Error Fetch Data");
        setIsLoading(false);
      });
    
    //=======edit show state========//
    const temp = show.map( (el) => {
      if (el.id === item.id) {
        if (el.completed === 'true') {
          el.completed = 'false'
        } else if (el.completed === 'false') {
          el.completed = 'true'
        }
      }
      return el
    } )
    setShow(temp)
  }
  const deleteTask = (id) => {
    console.log(`id = ${id}`)
    //========edit data in database=======//
    axios
      .delete(`http://localhost:5000/api/v1/todo/${id}`)
      .then((res) => {
        console.log(res)
      })
      .catch(() => {
        alert("Error Fetch Data");
        setIsLoading(false);
      });

    //=======edit show state========//
    const temp = show.filter( el => el.id !== id )
    setShow(temp)
  }

  const _renderItem = ({ item }) => {
    //console.log(item)
    return item.completed === "true" ? (
      <Box
        bg="#2ecc71"
        shadow={2}
        borderWidth="2"
        borderColor="#27ae60"
        p="4"
        width="100%"
        rounded="lg"
        style={style.todo}
      >
        <Stack direction="row" flex={1} alignItems="center" space={3}>
          <Checkbox isChecked={statusTask(item.completed)} onChange={() => changeStatus(item)}/>
            <TouchableWithoutFeedback
              onPress={() => {navigation.navigate("DetailTodo", item); setFab(false)}}
            >
              <Center
                rounded="lg"
                width="48"
                _text={{
                  color: "warmGray.50",
                  fontSize: "md",
                  fontWeight: "medium",
                  textAlign: "center",
                  strikeThrough: "true",
                }}
              >
                {item.title}
              </Center>
            </TouchableWithoutFeedback>
          <Pressable onPress={() => deleteTask(item.id)}><CloseIcon size="4" color="white"/></Pressable>
        </Stack>
      </Box>
    ) : (
      <Box
        bg="#34495e"
        shadow={2}
        borderWidth="2"
        borderColor="cyan.500"
        p="4"
        width="100%"
        rounded="lg"
        style={style.todo}
      >
        <Stack direction="row" flex={1} alignItems="center" space={3}>
        <Checkbox isChecked={statusTask(item.completed)} onChange={() => changeStatus(item)}/>
          <TouchableWithoutFeedback
            onPress={() => {navigation.navigate("DetailTodo", item); setFab(false)}}
          >
            <Center
              rounded="lg"
              width="48"
              _text={{
                color: "warmGray.50",
                fontSize: "md",
                fontWeight: "medium",
                textAlign: "center",
              }}
            >
              {item.title}
            </Center>
          </TouchableWithoutFeedback>
        <Pressable onPress={() => deleteTask(item.id)}><CloseIcon size="4" color="white"/></Pressable>
        </Stack>
      </Box>
    );
  };

  return (
    <View style={style.container}>

      <Heading textAlign="center" mb="10" style={style.head} shadow="2">To Do List</Heading>
      <Stack direction="column" mb="2.5" mt="3" space={3} w={{ base: "85%" }}>
        <FlatList
          data={show}
          renderItem={_renderItem}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={getTodo}
          refreshing={isLoading}
        />
      </Stack>
      {fab ? (
        <Fab
        position="absolute"
        size="sm"
        icon={<AddIcon size="4" color="white"/>}
        placement= 'bottom-left'
        onPress={() => {navigation.navigate("Add"); setFab(false)}}
        />
      ) : (<></>)}  
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#74b9ff",
    alignItems: "center",
  },
  add: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  todo: {
    marginBottom: 10,
  },
  head: {
    backgroundColor: "#0984e3",
    color: "white",
    width: "100%",
    height: 80,
    paddingTop: 30
  }
});

export default Todos;
