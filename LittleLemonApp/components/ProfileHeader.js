import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from "react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";

export default function ProfileHeader({avatar, firstName, lastName, updateProfile, showBack}) {
    return (
        <View style={styles.container}>
            {showBack && <Button title="Back" onPress={() => {
            }}>←</Button>
            }
            <Image source={require(("../assets/images/Logo.png"))} style={styles.image}/>

            <ProfileImage
                dim={{width: 50, height: 50}}
                avatar={avatar}
                firstName={firstName}
                lastName={lastName}
                onChange={(uri) => updateProfile('avatar', uri)}
            />
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
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        gap: 30
    },
    image: {
        marginTop: 6,
        resizeMode: "contain",
        width: 200,
    },
    profileImg: {
        width: 50,
        height: 50,
    },

})
