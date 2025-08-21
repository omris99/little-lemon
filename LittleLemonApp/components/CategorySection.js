// CategorySection.js
import {View, Text, Pressable, StyleSheet, ScrollView} from "react-native";
import React from "react";

export default function CategorySection({selectedCategories, onToggleCategory}) {
    const categories = ["Starters", "Mains", "Desserts", "Drinks"];

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scroll}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {categories.map((cat) => {
                    const normalized = cat.toLowerCase(); // 👈 normalize
                    const isSelected = selectedCategories.includes(normalized);
                    return(
                        <Pressable
                            key={cat}
                            onPress={() => onToggleCategory(cat)}
                            style={[
                                styles.category,
                                isSelected && styles.categorySelected,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    isSelected && styles.categoryTextSelected,
                                ]}
                            >
                                {cat}
                            </Text>
                        </Pressable>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {marginHorizontal: 8},
    category: {
        marginTop: 20,
        marginBottom: 30,
        marginRight: 10,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#EDEFEE",
    },
    categorySelected: {
        backgroundColor: "#495E57",
    },
    categoryText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#495E57",
    },
    categoryTextSelected: {
        color: "white",
    },
});