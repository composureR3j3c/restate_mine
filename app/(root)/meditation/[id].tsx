import { meditations } from '@/app/data';
import audio from '@/assets/meditations/audio1.mp3';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

import AnimatedBackground from '@/app/(root)/components/AnimatedBackground';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";


export default function MeditationDetails() {
    const { id } = useLocalSearchParams();
    const player = useAudioPlayer(audio);
    const status = useAudioPlayerStatus(player);

    const { top } = useSafeAreaInsets()
    const meditation = meditations.find(m => m.id === Number(id));
    const formatSeconds = (milliseconds?: number) => {
        if (!milliseconds || milliseconds < 0) return '0:00';
        milliseconds = milliseconds * 1000;
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };
    if (!meditation) {
        return <Text className="text-2xl font-bold p-5 bg-white">Meditation not found</Text>;
    }
    return (
        <SafeAreaView className="flex-1 bg-gray-400 p-2 justify-between">
            <AnimatedBackground />
            {/* Page content */}
            <View className="flex-1">

                <View className="flex-1">
                    {/* header */}
                    <View className="flex-row items-center justify-between p-10" style={{ marginTop: top }}>
                        <AntDesign name="infocirlceo" size={24} color="black"
                        />
                        <View className="bg-zinc-800 p-2 rounded-md">
                            <Text className="text-zinc-100 font-semibold">Today's Meditation</Text></View>
                        <Link href="../" asChild>
                            <AntDesign name="close" size={26} color="black"
                            // onPress={() => router.back()}
                            />
                        </Link>
                    </View>
                    <Text className="text-3xl mt-10 text-center font-semibold text-zinc-800">{meditation?.title}</Text>
                </View>
                {/* Play/Pause Button */}
                <Pressable
                    onPress={() => (player.playing ? player.pause() : player.play())}
                    className="bg-zinc-800 self-center w-20 aspect-square rounded-full items-center justify-center"
                >
                    <FontAwesome6
                        name=
                        {status.playing ?
                            'pause'
                            : 'play'}
                        size={24}
                        color="snow"
                    />
                </Pressable>
                {/* Bottom part of the screen */}
                <View className="flex-1">
                    {/* Footer: Player */}
                    <View className="p-5 mt-auto gap-5">
                        <View className="flex-row justify-between">
                            <MaterialIcons name="airplay" size={24} color="#3A3937" />
                            <MaterialCommunityIcons
                                name="cog-outline"
                                size={24}
                                color="#3A3937"
                            />
                        </View>
                        {/* Playback indicator */}
                        <Slider
                            style={{ width: '100%', height: 3 }}
                            value={status.currentTime / status.duration}
                            onSlidingComplete={(value) =>
                                player.seekTo(value * status.duration)

                            }
                            minimumValue={0}
                            maximumValue={1}
                            maximumTrackTintColor="#3A393755"
                            minimumTrackTintColor="#3A3937"
                            thumbTintColor="#3A3937"
                        />
                        {/* Times */}
                        <View className="flex-row justify-between">
                            <Text> {status.duration ? formatSeconds(status.currentTime) : '--:--'}</Text>
                            <Text>
                                {status.duration ? formatSeconds(status.duration) : '--:--'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        </SafeAreaView>)
}