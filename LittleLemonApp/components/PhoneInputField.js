import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {MaskedTextInput} from "react-native-mask-text";

export default function PhoneInputField({label, value, onChangeText, keyboardType}) {
    return (
        //     <View style={styles.container}>
        //         <Text style={styles.label}>{label}</Text>
        //         <TextInput
        //             style={styles.input}
        //             value={value}
        //             onChangeText={onChangeText}
        //             keyboardType={keyboardType}
        //         />
        //     </View>
        // );
        <View style={styles.container}>
            <Text style={styles.label}>Phone number</Text>
            <MaskedTextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                mask="999-999-9999"
                keyboardType={keyboardType}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {marginBottom: 20},
    label: {fontSize: 13, color: 'gray', marginBottom: 5},
    input: {
        width: '100%',
        padding: 10,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#a3a3a3',
        borderRadius: 10,
    },
});
