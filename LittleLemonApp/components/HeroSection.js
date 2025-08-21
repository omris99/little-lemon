import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {useFonts, MarkaziText_400Regular} from '@expo-google-fonts/markazi-text';
import {Karla_400Regular} from '@expo-google-fonts/karla';
import {Ionicons} from '@expo/vector-icons'; // or any icon set


import Button from "./Button";

export default function HeroSection() {
    const [fontsLoaded] = useFonts({
        MarkaziText_400Regular, Karla_400Regular,
    });

    if (!fontsLoaded) {
        return null; // or <AppLoading /> if you prefer
    }

    return (
        <View style={styles.container}>
            <View style={styles.about}>
                <View style={styles.restuarentName}>
                    <Text style={styles.displayTitle}>Little Lemon</Text>
                    <Text style={styles.subTitle}>Chicago</Text>
                    <Text style={styles.leadText}>We are a family owned Mediterranean restaurant,
                        focused on traditional recipes served with a modern twist.</Text>
                </View>
                <Image source={require('../assets/images/Hero image.png')} style={styles.image}/>
            </View>
            <Button
                style={styles.searchButton}
            >
                <Ionicons name="search" size={25} color="#555" style={styles.icon}/>
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#495E57',
    },
    restuarentName: {
        marginTop: 10, // push down from top if needed
        marginBottom: 20, // space between title and lead text
    },
    displayTitle: {
        fontSize: 64,
        fontWeight: 'medium',
        color: '#F4CE14',
        fontFamily: 'MarkaziText_400Regular', // must match the loaded font key
        lineHeight: 64, // match font size to remove extra space

    },
    subTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'MarkaziText_400Regular',
        color: '#f4f4f4',
        lineHeight: 40, // match font size to remove extra space

    },
    leadText: {
        height: 105,
        width: 242,
        fontSize: 18,
        fontWeight: 'medium',
        fontFamily: 'Karla_400Regular',
        color: '#f4f4f4',
        lineHeight: 24, // adjust for readability
        marginTop: 20

    },
    about: {
        flexDirection: 'row',       // horizontal
        alignItems: 'center',       // vertically center text and image
        justifyContent: 'flex-end', // optional: push image to right
        marginLeft: 15

    },
    image: {
        resizeMode: 'cover',  // or 'contain'
        height: 150,
        width: 100,           // adjust as needed
        borderRadius: 20,     // this rounds the corners
        marginTop: 50,
        marginRight: 10
    },
    searchButton: {
        backgroundColor: 'white',
        borderRadius: 100,
        marginBottom:20,
    }
});
