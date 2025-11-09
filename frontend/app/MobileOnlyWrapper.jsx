import React from 'react';
import { View, Text, StyleSheet, Platform, Dimensions, Linking, TouchableOpacity, Image } from 'react-native';
import { primary } from '../theme/colors';

const MobileOnlyWrapper = ({ children }) => {
    const { width } = Dimensions.get('window');
    const isWeb = Platform.OS === 'web';
    const isMobileSize = width < 768;

    const openLink = (url) => {
        if (isWeb) {
            window.open(url, '_blank');
        } else {
            Linking.openURL(url);
        }
    };

    // On web with large screen, show mobile-only message
    if (isWeb && !isMobileSize) {
        return (
            <View style={styles.desktopContainer}>
                <View style={styles.leftPanel}>
                    <View style={styles.headerSection}>
                        <Image style={styles.appIcon} source={require('../assets/images/logo-name.png')} />
                        <Text style={styles.tagline}>Lightning-fast E-Wallet for Modern Living</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.sectionTitle}>📱 Mobile-First Design</Text>
                        <Text style={styles.description}>
                            This application is designed exclusively for mobile devices. 
                            Experience seamless wallet management, instant transfers, and real-time transaction tracking.
                        </Text>
                    </View>

                    <View style={styles.featureSection}>
                        <Text style={styles.sectionTitle}>✨ Features</Text>
                        <View style={styles.featureList}>
                            <Text style={styles.featureItem}>💳 Multiple Wallets</Text>
                            <Text style={styles.featureItem}>⚡ Instant Transfers</Text>
                            <Text style={styles.featureItem}>📊 Transaction History</Text>
                            <Text style={styles.featureItem}>🔒 Secure PIN Protection</Text>
                            <Text style={styles.featureItem}>📈 Financial Statistics</Text>
                        </View>
                    </View>

                    <View style={styles.linksSection}>
                        <Text style={styles.sectionTitle}>🔗 Quick Links</Text>
                        <TouchableOpacity 
                            style={styles.linkButton}
                            onPress={() => openLink('https://github.com/mohanapriyan2006/fundfast')}
                        >
                            <Text style={styles.linkIcon}>📦</Text>
                            <Text style={styles.linkText}>View on GitHub</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.linkButton}
                            onPress={() => openLink('https://github.com/mohanapriyan2006/fundfast/releases/latest')}
                        >
                            <Text style={styles.linkIcon}>📲</Text>
                            <Text style={styles.linkText}>Download APK</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.linkButton}
                            onPress={() => openLink('https://mohanapriyan.netlify.app')}
                        >
                            <Text style={styles.linkIcon}>👨‍💻</Text>
                            <Text style={styles.linkText}>Developer Portfolio</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.demoSection}>
                        <Text style={styles.demoTitle}>🎮 Demo Credentials</Text>
                        <View style={styles.credentialBox}>
                            <Text style={styles.credentialLabel}>Username:</Text>
                            <Text style={styles.credentialValue}>demo</Text>
                        </View>
                        <View style={styles.credentialBox}>
                            <Text style={styles.credentialLabel}>Password:</Text>
                            <Text style={styles.credentialValue}>Demo123</Text>
                        </View>
                        <View style={styles.credentialBox}>
                            <Text style={styles.credentialLabel}>PIN:</Text>
                            <Text style={styles.credentialValue}>1234</Text>
                        </View>
                    </View>

                    <View style={styles.footerSection}>
                        <Text style={styles.footerText}>
                            Made with ❤️ by Mohanapriyan
                        </Text>
                        <Text style={styles.techStack}>
                            React Native · Expo · AsyncStorage
                        </Text>
                    </View>
                </View>

                <View style={styles.rightPanel}>
                    <View style={styles.mobileViewport}>
                        {children}
                    </View>
                    <Text style={styles.viewportLabel}>
                        👆 Preview Mode · Best viewed on mobile
                    </Text>
                </View>
            </View>
        );
    }

    // Native mobile - render normally
    return <>{children}</>;
};

const styles = StyleSheet.create({
    desktopContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#0a0e27',
        minHeight: '100vh',
    },
    leftPanel: {
        flex: 1,
        padding: 60,
        paddingTop: 40,
        paddingBottom: 40,
        backgroundColor: '#0f1419',
        borderRightWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.1)',
        overflowY: 'auto',
    },
    rightPanel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#0a0e27',
    },
    headerSection: {
        marginBottom: 40,
        alignItems: 'center',
    },
    appIcon: {
        width: 260,
        height: 80,
        marginBottom: 16,
    },
    appName: {
        fontSize: 48,
        fontWeight: 'bold',
        color: primary.DEFAULT,
        marginBottom: 12,
        letterSpacing: -1,
    },
    tagline: {
        fontSize: 18,
        color: '#a0aec0',
        textAlign: 'center',
        fontStyle: 'italic',
    },
    infoSection: {
        marginBottom: 32,
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 24,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: primary.DEFAULT,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#ffffff',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#cbd5e0',
        lineHeight: 24,
    },
    featureSection: {
        marginBottom: 32,
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 24,
        borderRadius: 12,
    },
    featureList: {
        gap: 8,
    },
    featureItem: {
        fontSize: 16,
        color: '#e2e8f0',
        paddingVertical: 6,
        paddingLeft: 8,
    },
    linksSection: {
        marginBottom: 32,
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 24,
        borderRadius: 12,
    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(46, 204, 113, 0.1)',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'rgba(46, 204, 113, 0.3)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    linkIcon: {
        fontSize: 20,
        marginRight: 12,
    },
    linkText: {
        fontSize: 16,
        fontWeight: '600',
        color: primary.DEFAULT,
    },
    demoSection: {
        marginBottom: 32,
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        padding: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(52, 152, 219, 0.3)',
    },
    demoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#3498db',
        marginBottom: 16,
        textAlign: 'center',
    },
    credentialBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: 12,
        borderRadius: 6,
        marginBottom: 8,
    },
    credentialLabel: {
        fontSize: 14,
        color: '#a0aec0',
        fontWeight: '500',
    },
    credentialValue: {
        fontSize: 14,
        color: '#ffffff',
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    footerSection: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        color: '#718096',
        marginBottom: 8,
    },
    techStack: {
        fontSize: 12,
        color: '#4a5568',
        fontStyle: 'italic',
    },
    mobileViewport: {
        width: 428,
        height: '90dvh',
        maxHeight: 926,
        backgroundColor: '#fff',
        borderRadius: 40,
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 12px #1a1f2e, 0 0 0 14px rgba(255,255,255,0.1)',
        border: '12px solid #1a1f2e',
    },
    viewportLabel: {
        marginTop: 24,
        fontSize: 14,
        color: '#718096',
        fontStyle: 'italic',
        textAlign: 'center',
    },
});

export default MobileOnlyWrapper;