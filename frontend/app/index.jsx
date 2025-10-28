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
      <Text className="text-lg font-bold text-green-600">Edit app/index.tsx to edit this screen.</Text>
      <Text className="text-lg font-bold text-green-600 border-b border-green-600">Example</Text>
    </View>
  );
}
