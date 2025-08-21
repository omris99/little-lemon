import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

export default function Checkbox({ label, value, onToggle }) {
    return (
        <Pressable style={styles.row} onPress={onToggle}>
            <View style={[styles.box, value && styles.checked]} />
            <Text style={styles.label}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginLeft: 10, marginTop: 10 },
    box: { width: 20, height: 20, borderWidth: 2, borderColor: '#364A56', borderRadius: 5, marginRight: 10 },
    checked: { backgroundColor: '#364A56' },
    label: { fontSize: 15 },
});
