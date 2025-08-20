import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from "react";
import Button from "./Button";

export default function ProfileHeader() {
    return (
        <View style={styles.container}>
            <Button title="Profile" onPress={() => {}}>B</Button>
            <Image source={require(("../assets/images/Logo.png"))} style={styles.image} />

            <Image style={styles.profileImg} source={require('../assets/images/Profile.png')} />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        backgroundColor: '#ffffff',
        width: "100%",
        height: 80,
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    image: {
        resizeMode: "contain",
        width: 200,
    },
    profileImg: {
        width: 50,
        height: 50,
    },

})
