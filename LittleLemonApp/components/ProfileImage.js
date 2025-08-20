import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from "react";
import Button from "./Button";

export default function ProfileImage({dim}) {
    return (
            <Image style={[styles.profileImg, dim]} source={require('../assets/images/Profile.png')} />
    )
}

const styles = StyleSheet.create({
    profileImg: {
        resizeMode: "contain",
        width: 50,
    },

})
