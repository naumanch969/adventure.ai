import { Login } from "@/components";
import { auth } from "@/configs/firebase";
import { Redirect } from "expo-router";
import { View } from "react-native";

export default function Index() {

  const user = auth?.currentUser

  return (
    <View style={{ flex: 1 }} >
      {
        user
          ?
          <Redirect href={'/mytrip'} />
          :
          <Login />
      }
    </View>
  );
}
