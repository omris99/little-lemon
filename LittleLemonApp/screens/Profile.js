import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import Header from "../components/Header";
import React from "react";
import ProfileHeader from "../components/ProfileHeader";
import ProfileImage from "../components/ProfileImage";
import Button from "../components/Button";

export default function Profile({ navigation }) {
    return (
        <View style={styles.container}>
            <ProfileHeader/>
            <Text style={styles.header}>Personal information</Text>
            <Text style={styles.subHeader}>Avatar</Text>
            <View style={styles.avatarChangeSection}>
                <ProfileImage dim={{height:60, width: 80}}/>
                <Button style={{backgroundColor:"#495E57", height: 45, width: 100, borderRadius: 10}}>Change</Button>
                <Button style={{backgroundColor:"white", borderColor:'#495E57', borderWidth: 2 ,height: 45, width: 100, borderRadius: 5}}
                buttonText={{color: '#495E57'}}>Remove</Button>
            </View>

            <Text style={styles.subHeader}>First name</Text>
            <TextInput style={styles.input} />

            <Text style={styles.subHeader}>Last name</Text>
            <TextInput style={styles.input} />

            <Text style={styles.subHeader}>Email</Text>
            <TextInput style={styles.input} />

            <Text style={styles.subHeader}>Phone number</Text>
            <TextInput style={styles.input} />

            <Text style={styles.header}>Email notifications</Text>

            <Button style={{backgroundColor:'#F4CE14', width: '90%', borderColor:'#B99312', borderWidth: 2 , borderRadius: 10, alignSelf:"center", marginBottom: 30}} buttonText={{color:'black', fontWeight:'bold'}}>Log out</Button>
            <View style={styles.endButtons}>
                <Button style={{backgroundColor:"white", borderColor:'#495E57', borderWidth: 2 ,height: 45, width: 160, borderRadius: 5}}
                        buttonText={{color: '#495E57'}}>Discard changes</Button>
                <Button style={{height: 45, width: 150, borderRadius: 10}}>Save changes</Button>

            </View>
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
    endButtons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 15
    }
})