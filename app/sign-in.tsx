import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Signin = () => {

    const { refetch, loading, isLogged } = useGlobalContext();

    if (!loading && isLogged) return <Redirect href="/" />;

    const handleLogin = async () => {
        const result = await login();
        if (result) {
        // console.log("Login successful");
            <Redirect href="/" />
            refetch();
        } else {
            Alert.alert("Error", "Failed to login");
        }
    };

    return (

        <SafeAreaView className='h-full bg-white'>
            <ScrollView contentContainerClassName="h-full">
                <Image source={require('@/assets/images/onboarding.png')} className='h-4/6 w-full'
                    style={{ width: '100%', height: '66%' }}
                    resizeMode='contain' />
                <View className='px-10'>
                    <Text className='text-base text-center text-black-200 mt-4 mb-2 font-rubik uppercase'>Welcome to Restate</Text>
                    {/* font-rubik'>Welcome to Restate</Text> */}
                    <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
                        Let's Get You Closer To {"\n"}
                        <Text className="text-primary-300">Your Ideal Home</Text>
                    </Text>
                    <Text className="text-lg font-rubik text-black-200 text-center mt-12">
                        Login to Real Scout with Google
                    </Text>

                    <TouchableOpacity
                        onPress={handleLogin}
                        className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
                    >
                        <View className="flex flex-row items-center justify-center">
                            <Image
                                source={require("@/assets/icons/google.png")}
                                className="w-5 h-5"
                                style={{ width: 20, height: 20 }}
                                resizeMode="contain"
                            />
                            <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
};

export default Signin;
