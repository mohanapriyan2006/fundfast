import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import { primary } from '../theme/colors';

const MobileOnlyWrapper = ({ children }) => {
    const { width } = Dimensions.get('window');
    const isWeb = Platform.OS === 'web';
    const isMobileSize = width < 768;

    // On web with large screen, show mobile-only message
    if (isWeb && !isMobileSize) {
        return (
            <View style={styles.mobileContainer}>
                <Text style={styles.message}>This application is designed exclusively for 📱 mobile devices.</Text>
                <View style={styles.mobileViewport}>
                    {children}
                </View>
                <Text style={styles.message}>Please access from a mobile phone or resize your browser window to 📱 mobile dimensions.</Text>
            </View>
        );
    }

    // Native mobile - render normally
    return <>{children}</>;
};

const styles = StyleSheet.create({
    messageBox: {
        backgroundColor: '#ffffff',
        padding: 40,
        borderRadius: 16,
        maxWidth: 500,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    icon: {
        fontSize: 64,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    message: {
        fontSize: 20,
        fontWeight: '600',
        color: primary.dark,
        textAlign: 'center',
        marginBottom: 12,
        lineHeight: 24,
    },
    subMessage: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        lineHeight: 20,
    },
    mobileContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    mobileViewport: {
        width: '100%',
        maxWidth: 428, // iPhone 14 Pro Max width
        height: '100vh',
        maxHeight: 926, // iPhone 14 Pro Max height
        backgroundColor: '#fff',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    },
});

export default MobileOnlyWrapper;