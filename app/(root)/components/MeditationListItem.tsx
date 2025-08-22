import { meditations } from '@/app/data';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";

const meditation = meditations[0];
export function MeditationListItem(props: { meditation: typeof meditation }) {
  const meditation = props.meditation;
  return (
    <Link href={`/meditation/${meditation.id}`} asChild  >
      <Pressable>
        <View className="flex-row items-center gap-3 ">
          <View className="bg-green-700 p-2 rounded-full">
            <FontAwesome5 name="check" size={16} color="white" />
          </View>
          <View className="flex-1 p-5 py-8 border-2 border-gray-300 rounded-2xl">
            <Text className="font-semibold text-2xl mb-2">{meditation.title}</Text>
            <View className={"flex-row items-center gap-2"}>
              <FontAwesome5 name="clock" size={16} color="#687280" />
              <Text className="text-gray-600">{meditation.duration} min</Text>
            </View>


          </View>
        </View>
      </Pressable>
    </Link>
  );
}