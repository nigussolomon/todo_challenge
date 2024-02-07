import React, { useState } from "react";
import { Layout, Button, Input, Text, Divider, List, ListItem, Modal } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const ToDo = ({ globalState }) => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const renderItem = ({ item, index }) => (
    <ListItem
      title={`${item.title}`}
      accessoryRight={() => (
        <>
          <Button appearance="ghost" onPress={() => editTask(index)}>🖊</Button>
          <Button appearance="ghost" onPress={() => deleteTask(index)}>🗑</Button>
        </>
      )}
    />
  );

  const editTask = (index) => {
    setEditingTask(index);
    setEditedTask(tasks[index].title);
    setVisible(true);
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const saveEditedTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingTask] = { ...updatedTasks[editingTask], title: editedTask };
    setTasks(updatedTasks);
    setVisible(false);
  };

  return (
    <Layout style={{ flex: 1, padding: 10 }}>
      <Text category="h5" style={{ marginBottom: 20 }}>
        {globalState}'s Todo List
      </Text>
      <Layout style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Input
          size="large"
          style={{ flex: 1, marginRight: 10 }}
          placeholder="Enter your task..."
          value={task}
          onChangeText={setTask}
        />
        <Button
          onPress={() => {
            if (task.trim() !== "") {
              setTasks([...tasks, { title: task, description: "" }]);
              setTask("");
            }
          }}
        >
          ADD
        </Button>
      </Layout>
      <Divider style={{ marginVertical: 10 }} />
      <List
        style={{ flex: 1 }}
        data={tasks}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
      <Modal visible={visible} backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} onBackdropPress={() => setVisible(false)}>
        <Layout style={{ backgroundColor: "white", padding: 10 }}>
          <Text category="h6">Edit Task</Text>
          <Input
            placeholder="Enter edited task..."
            value={editedTask}
            onChangeText={(text) => setEditedTask(text)}
          />
          <Layout style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={saveEditedTask}>Save</Button>
          </Layout>
        </Layout>
      </Modal>
    </Layout>
  );
};

export default ToDo;
