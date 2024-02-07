import {
  Layout,
  Button,
  Input,
  Avatar,
  Modal,
  Card,
  Text,
} from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, AsyncStorage } from "react-native";
import { useNavigation } from '@react-navigation/native';


const HomeScreen = ({ globalState, setGlobalState }) => {
  const [visible, setVisible] = React.useState(false);
  const navigation = useNavigation();

  return (
    <Layout
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Text style={{ marginBottom: 20, fontWeight: "normal", fontSize: 30 }}>
        {globalState}
        {globalState.slice(-1).toLowerCase() === "s" ? "'" : "'s"} Todo
      </Text>
      <Input
        size="large"
        placeholder="Enter your name..."
        value={globalState}
        onChangeText={(nextValue) => setGlobalState(nextValue)}
      />

      <Button
        fullWidth={true}
        style={{ width: "100%", marginTop: 10 }}
        onPress={() => 
          navigation.navigate("ToDo")
        }
        status="primary"
      >
        CONTINUE
      </Button>

      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Text>{globalState} 😻</Text>
        </Card>
      </Modal>
    </Layout>
  );
};

export default HomeScreen;
