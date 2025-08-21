import React from 'react';
import { Image, View, Text, StyleSheet, TextInput } from 'react-native';
import { useFonts, MarkaziText_400Regular } from '@expo-google-fonts/markazi-text';
import { Karla_400Regular } from '@expo-google-fonts/karla';
import { Ionicons } from '@expo/vector-icons';

export default function HeroSection({ searchText, setSearchText }) {
    const [fontsLoaded] = useFonts({
        MarkaziText_400Regular,
        Karla_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.about}>
                <View style={styles.restuarentName}>
                    <Text style={styles.displayTitle}>Little Lemon</Text>
                    <Text style={styles.subTitle}>Chicago</Text>
                    <Text style={styles.leadText}>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </Text>
                </View>
                <Image source={require('../assets/images/Hero image.png')} style={styles.image}/>
            </View>

            {/* Search bar with icon */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#555" style={styles.icon}/>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search dishes..."
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#495E57',
    },
    restuarentName: {
        marginTop: 10,
        marginBottom: 20,
    },
    displayTitle: {
        fontSize: 64,
        fontWeight: '500',
        color: '#F4CE14',
        fontFamily: 'MarkaziText_400Regular',
        lineHeight: 64,
    },
    subTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'MarkaziText_400Regular',
        color: '#f4f4f4',
        lineHeight: 40,
    },
    leadText: {
        height: 105,
        width: 242,
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'Karla_400Regular',
        color: '#f4f4f4',
        lineHeight: 24,
        marginTop: 20,
    },
    about: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginLeft: 15,
    },
    image: {
        resizeMode: 'cover',
        height: 150,
        width: 100,
        borderRadius: 20,
        marginTop: 50,
        marginRight: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        marginHorizontal: 15,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 6,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
        color: '#333',
    },
});
