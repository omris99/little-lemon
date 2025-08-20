import {Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from "../components/Header";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Onboarding({ navigation }) {
    const [firstName, setFirstName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const handleLogin = async () => {
        if (!firstName || !email) {
            Alert.alert("Missing Input");
            return;
        }

        try {
            // נשמור ב־AsyncStorage
            await AsyncStorage.setItem('onboardingComplete', 'true');
            await AsyncStorage.setItem('userFirstName', firstName);
            await AsyncStorage.setItem('userEmail', email);

            // ננווט למסך פרופיל
            navigation.replace('Profile');
        } catch (e) {
            Alert.alert("Error saving data", e.message);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.container}>
                <Header/>
                <View style={styles.login}>
                    <Text style={styles.title}>Let us get to know you</Text>
                    <View style={styles.form}>
                        <Text style={styles.text}>First Name</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setFirstName}
                            value={firstName}
                        />
                        <Text style={styles.text}>Email</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmail}
                            value={email}
                            keyboardType="email-address"
                        />
                    </View>
                </View>
                <Pressable style={styles.button}
                onPress={handleLogin}>
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>
            </View>

        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    input: {
        width: '80%',
        padding: 15,
        margin: 15,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: '#364A56',
        borderRadius: 15,
    },
    login: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: "#CBD2D9",
        alignItems: "center",
        height: '60%',
        paddingVertical: 20,

    },
    text: {
        fontSize: 24,
    },
    title: {
        fontSize: 26,
        marginTop: 60,
    },
    form: {
        alignItems: "center",
        width: '90%',
    },
    button: {
        backgroundColor: '#CBD2D9',
        width: 120,
        height: 50,
        alignSelf: 'flex-end',
        margin: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    buttonText: {
        fontSize: 24,
        color: "#364A56",
    }
})