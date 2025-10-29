import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { primary } from '../theme/colors';
import DataContext from '../context/DataContext';

const RoundMenuHeader = () => {

    const { activeModal } = useContext(DataContext);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>{activeModal}</Text>
            </View>
        </View>
    )
}

export default RoundMenuHeader;

const styles = StyleSheet.create({
    outerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 80,
        zIndex: 99,
        alignItems: 'center',
        // Shadow
        shadowColor: primary.light,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 12,
    },
    container: {
        padding: 8,
        backgroundColor: primary.DEFAULT,
        borderWidth: 1,
        borderColor: primary.light,
        borderRadius: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
})