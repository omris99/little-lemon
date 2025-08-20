import { StyleSheet, Text, View } from 'react-native';
import Onboarding from "./screens/Onboarding";
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from "./screens/Profile";
import SplashScreen from "./screens/SplashScreen";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';


function HomeScreen() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
    const [state, setState] = React.useState(
        {isLoading: true,  isOnboardingCompleted: false});

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const value = await AsyncStorage.getItem('onboardingComplete');
                setState({
                    isLoading: false,
                    isOnboardingCompleted: value === 'true'
                });
            } catch (e) {
                setState({ isLoading: false, isOnboardingCompleted: false });
            }
        };
        checkOnboarding();
    }, []);

    if (state.isLoading) {
        // We haven't finished reading from AsyncStorage yet
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {state.isOnboardingCompleted ? (
                    // Onboarding completed, user is signed in
                    <Stack.Screen name="Profile" component={Profile} />
                ) : (
                    // User is NOT signed in
                    <Stack.Screen name="Onboarding" component={Onboarding} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
