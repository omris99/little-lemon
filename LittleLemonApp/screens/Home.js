import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import {Text, View, StyleSheet, FlatList, Image} from "react-native";
import * as SQLite from "expo-sqlite";
import HeroSection from "../components/HeroSection";

export default function Home({ navigation }) {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [db, setDb] = useState(null);

    useEffect(() => {
        (async () => {
            const database = await SQLite.openDatabaseAsync("little_lemon.db");

            // create table
            await database.execAsync(`
                CREATE TABLE IF NOT EXISTS menu
                (
                    id
                    INTEGER
                    PRIMARY
                    KEY
                    AUTOINCREMENT,
                    name
                    TEXT,
                    price
                    REAL,
                    description
                    TEXT,
                    image
                    TEXT
                );
            `);

            setDb(database);

            // load menu
            await loadMenu(database);
        })();
    }, []);

    const loadMenu = async (database) => {
        const rows = await database.getAllAsync("SELECT * FROM menu");

        if (rows.length > 0) {
            // already in DB
            setMenu(rows);
            setLoading(false);
        } else {
            // fetch and insert
            await fetchMenuFromServer(database);
        }
    };

    const fetchMenuFromServer = async (database) => {
        try {
            const response = await fetch(
                "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
            );
            const data = await response.json();
            const items = data.menu;

            // insert each item
            for (const item of items) {
                await database.runAsync(
                    "INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?)",
                    [item.name, item.price, item.description, item.image]
                );
            }

            setMenu(items);
        } catch (error) {
            console.error("Error fetching menu:", error);
        } finally {
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => {
        const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`;
        return (
            <View style={styles.card}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.price}>${item.price}</Text>
                </View>
                <Image source={{ uri: imageUrl }} style={styles.image} />

            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ProfileHeader showBack={false}/>
            <HeroSection/>
            {loading ? (
                <Text style={styles.loading}>Loading menu...</Text>
            ) : (
                <FlatList
                    data={menu}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    loading: {
        marginTop: 20,
        textAlign: "center",
    },
    card: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    description: {
        fontSize: 12,
        color: "#555",
    },
    price: {
        fontSize: 14,
        marginTop: 5,
    },
});
