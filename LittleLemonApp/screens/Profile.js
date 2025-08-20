import {Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from "../components/Header";
import React, {useEffect, useState} from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileImage from "../components/ProfileImage";
import Button from "../components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MaskedTextInput} from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import InputField from "../components/InputField";
import PhoneInputField from "../components/PhoneInputField";
import Checkbox from "../components/CheckBox";
import {CommonActions} from "@react-navigation/native";


export default function Profile({navigation}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [avatar, setAvatar] = useState(null); // null = no image
    const [orderStatuses, setOrderStatuses] = useState(false);
    const [passwordChanges, setPasswordChanges] = useState(false);
    const [specialOffers, setSpecialOffers] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Onboarding' }],
                })
            );
        } catch (e) {
            Alert.alert('Error logging out', e.message);
        }
    };


    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedName = await AsyncStorage.getItem('userFirstName');
                const storedEmail = await AsyncStorage.getItem('userEmail');
                const storedLastName = await AsyncStorage.getItem('userLastName');
                const storedPhoneNumber = await AsyncStorage.getItem('userPhone');

                if (storedName) setFirstName(storedName);
                if (storedEmail) setEmail(storedEmail);
            } catch (e) {
                console.log('Error loading user data', e);
            }
        };

        loadUserData();
    }, []);

    const handleSave = async () => {
        try {
            await AsyncStorage.setItem('userFirstName', lastName);
            await AsyncStorage.setItem('userLastName', lastName);
            await AsyncStorage.setItem('userEmail', email);
            await AsyncStorage.setItem('userPhone', phoneNumber);
            await AsyncStorage.setItem('userAvatar', avatar || '');
            Alert.alert('Profile saved successfully!');
        } catch (e) {
            Alert.alert('Error saving profile', e.message);
        }
    };

    return (
        <View style={styles.container}>
            <ProfileHeader/>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Personal information</Text>
                <Text style={styles.subHeader}>Avatar</Text>
                <View style={styles.avatarChangeSection}>
                    <ProfileImage dim={{height: 60, width: 80}}/>
                    <Button
                        style={{backgroundColor: "#495E57", height: 45, width: 100, borderRadius: 10}}>Change</Button>
                    <Button style={{
                        backgroundColor: "white",
                        borderColor: '#495E57',
                        borderWidth: 2,
                        height: 45,
                        width: 100,
                        borderRadius: 5
                    }}
                            buttonText={{color: '#495E57'}}>Remove</Button>
                </View>

                <InputField
                    label="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                />

                <InputField
                    label="Last Name"
                    value={lastName}
                    onChangeText={setLastName}
                />

                <InputField
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                />

                <PhoneInputField
                    label="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <Text style={styles.header}>Email notifications</Text>

                <Checkbox
                    label="Order statuses"
                    value={orderStatuses}
                    onToggle={() => setOrderStatuses(!orderStatuses)}
                />

                <Checkbox
                    label="Password changes"
                    value={passwordChanges}
                    onToggle={() => setPasswordChanges(!passwordChanges)}
                />

                <Checkbox
                    label="Special Offers"
                    value={specialOffers}
                    onToggle={() => setSpecialOffers(!specialOffers)}
                />

                <Checkbox
                    label="Newsletter"
                    value={newsletter}
                    onToggle={() => setNewsletter(!newsletter)}
                />

                <Button
                    style={{
                        backgroundColor: '#F4CE14',
                        width: '100%',
                        borderColor: '#B99312',
                        borderWidth: 2,
                        borderRadius: 10,
                        alignSelf: "center",
                        marginBottom: 30
                    }}
                    buttonText={{color: 'black', fontWeight: 'bold'}}
                    onPress={handleLogout}
                >Log out</Button>
                <View style={styles.endButtons}>
                    <Button style={{
                        backgroundColor: "white",
                        borderColor: '#495E57',
                        borderWidth: 2,
                        height: 45,
                        width: 160,
                        borderRadius: 5
                    }}
                            buttonText={{color: '#495E57'}}>Discard changes</Button>
                    <Button style={{height: 45, width: 150, borderRadius: 10}}
                    onPress={handleSave}
                    >Save changes</Button>

                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subHeader: {
        fontSize: 13,
        color: 'gray',
    },
    avatarChangeSection: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
    input: {
        width: '90%',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        marginLeft: 5,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#a3a3a3',
        borderRadius: 10,

    },
    endButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 15,
        marginBottom: 50
    },
})