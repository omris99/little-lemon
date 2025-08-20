import {StyleSheet, Text, View} from 'react-native';
import Header from "../components/Header";
import React from "react";

export default function Profile({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Loading...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    header: {
        fontSize: 24,
    },
})