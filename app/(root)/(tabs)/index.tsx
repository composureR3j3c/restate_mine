import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-4xl font-bold my-4">
      Welcome to restate!</Text>
      <Link href="/profile">
        <Text>Profile</Text>
      </Link>
       <Link href="/explore">
        <Text>explore</Text>
      </Link>
      <Link href="/property/[id]" asChild>
        <Text>PPt</Text>
      </Link>
      <Link href="/sign-in">
        <Text>Sign In</Text>
        </Link>
    </View>
  );
}
