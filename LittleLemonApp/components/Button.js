import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from "react";

export default function Button({style, buttonText, children}) {
    return (
        <Pressable>
            <View style={[styles.button, style]}>
                <Text style={[styles.buttonText, buttonText]}>{children}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: '#495E57',
        borderRadius: 50,
        height:45,
        width: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    buttonText: {
        fontSize: 18,
        fontWeight:'medium',
        color: 'white',
    }
})