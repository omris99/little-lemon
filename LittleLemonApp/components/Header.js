import { StyleSheet, Text, View, Image } from 'react-native';

export default function Header() {
    return (
        <View style={styles.container}>
            <Image source={require(("../assets/images/Logo.png"))} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#DEE3E9',
        width: "100%",
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        resizeMode: "contain",
        width: 300,
        height: 200,
    }
})
