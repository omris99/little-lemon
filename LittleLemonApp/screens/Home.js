import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import * as SQLite from "expo-sqlite";
import ProfileHeader from "../components/ProfileHeader";
import HeroSection from "../components/HeroSection";
import CategorySection from "../components/CategorySection";

export default function Home({ navigation }) {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);
    const [db, setDb] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [searchText, setSearchText] = useState("");

    const toggleCategory = (category) => {
        const normalized = category.toLowerCase();
        setSelectedCategories((prev) =>
            prev.includes(normalized)
                ? prev.filter((c) => c !== normalized)
                : [...prev, normalized]
        );
    };

    // open/create DB and load menu
    useEffect(() => {
        (async () => {
            const database = await SQLite.openDatabaseAsync("little_lemon_updated.db");

            await database.execAsync(`
        CREATE TABLE IF NOT EXISTS menu
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price REAL,
            description TEXT,
            image TEXT,
            category TEXT
        );
      `);

            setDb(database);
            await loadMenu(database);
        })();
    }, []);

    // load menu from DB or fetch from server
    const loadMenu = async (database) => {
        const rows = await database.getAllAsync("SELECT * FROM menu");
        if (rows.length > 0) {
            setMenu(rows);
            setLoading(false);
        } else {
            await fetchMenuFromServer(database);
        }
    };

    // fetch menu from server
    const fetchMenuFromServer = async (database) => {
        try {
            const response = await fetch(
                "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
            );
            const data = await response.json();
            const items = data.menu;

            for (const item of items) {
                await database.runAsync(
                    "INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)",
                    [
                        item.name,
                        item.price,
                        item.description,
                        item.image,
                        item.category.toLowerCase(),
                    ]
                );
            }

            // reload menu from DB
            const rows = await database.getAllAsync("SELECT * FROM menu");
            setMenu(rows);
        } catch (error) {
            console.error("Error fetching menu:", error);
        } finally {
            setLoading(false);
        }
    };

    // render each item, filter by category and search
    const renderItem = ({ item }) => {
        const itemCategory = item.category ? item.category.toLowerCase() : "";
        if (
            (selectedCategories.length > 0 &&
                !selectedCategories.includes(itemCategory)) ||
            (searchText && !item.name.toLowerCase().includes(searchText.toLowerCase()))
        ) {
            console.log(item.category);
            return null;
        }

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
            <ProfileHeader showBack={false} />
            <HeroSection searchText={searchText} setSearchText={setSearchText} />
            <Text style={styles.textAboveCategories}>ORDER FOR DELIVERY!</Text>
            <CategorySection
                selectedCategories={selectedCategories}
                onToggleCategory={toggleCategory}
            />
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
    container: { flex: 1, backgroundColor: "#fff" },
    loading: { marginTop: 20, textAlign: "center" },
    card: { flexDirection: "row", padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
    image: { width: 80, height: 80, marginRight: 10 },
    name: { fontSize: 16, fontWeight: "bold" },
    description: { fontSize: 12, color: "#555" },
    price: { fontSize: 14, marginTop: 5 },
    textAboveCategories: { fontSize: 20, fontWeight: "800", marginTop: 40, marginLeft: 25 },
});
