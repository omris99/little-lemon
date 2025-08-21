import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from "react";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileImage({dim, avatar, firstName, lastName, onChange}) {

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            onChange(result.assets[0].uri); // pass the picked image back to parent
        }
    };

    return (
        <Pressable onPress={pickImage} style={[styles.container, dim]}>
            {avatar ? (
                <Image style={[styles.image, dim]} source={{uri: avatar}} />
            ) : (
                <View style={[styles.placeholder, dim]}>
                    <Text style={styles.initials}>
                        {(firstName?.[0] || '') + (lastName?.[0] || '')}
                    </Text>
                </View>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        resizeMode: 'cover',
    },
    placeholder: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        backgroundColor: '#364A56',
        alignItems: 'center',
        justifyContent: 'center',
    },
    initials: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
