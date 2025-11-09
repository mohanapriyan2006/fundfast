import { Image } from 'expo-image'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import { accent, primary } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import OtherHeader from '../OtherHeader'

const About = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ height: 500 }}>
                {/* Header */}
                <OtherHeader title='About' />

                {/* Content */}
                <View style={styles.content}>
                    {/* App Logo */}
                    <View style={styles.logoContainer}>
                        <Image source={require('../../assets/images/logo-name.png')} style={{ height: 50, width: 200, alignSelf: 'center' }} />
                        <Text style={styles.version}>Version 1.0.0</Text>
                    </View>

                    {/* Description */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About FundFast</Text>
                        <Text style={styles.description}>
                            FundFast is your trusted digital wallet solution that makes managing your finances simple, secure, and convenient. Send money, pay bills, track expenses, and manage multiple wallets all in one place.
                        </Text>
                    </View>

                    {/* Features */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Key Features</Text>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>Instant money transfers</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>Multiple wallet management</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>QR code payments</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>Transaction history & analytics</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <View style={styles.bullet} />
                            <Text style={styles.featureText}>Secure PIN protection</Text>
                        </View>
                    </View>

                    {/* Tech Stack */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Technology Stack</Text>

                        <Text style={styles.techCategory}>Frontend</Text>
                        <View style={styles.techGrid}>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>React Native</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>Expo</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>AsyncStorage</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>React Navigation</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>Expo Camera</Text>
                            </View>
                        </View>

                        <Text style={styles.techCategory}>Backend</Text>
                        <View style={styles.techGrid}>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>Java Spring Boot</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>Spring Security</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>JWT Auth</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>MySQL</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>REST API</Text>
                            </View>
                            <View style={styles.techChip}>
                                <Text style={styles.techText}>Swagger</Text>
                            </View>
                        </View>
                    </View>

                    {/* Developer */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Developer</Text>
                        <View style={styles.developerCard}>
                            <View style={styles.developerInfo}>
                                <Text style={styles.developerName}>Mohanapriyan M</Text>
                                <Text style={styles.developerRole}>Full Stack Developer</Text>
                            </View>

                            <View style={styles.developerLinks}>
                                <TouchableOpacity
                                    style={styles.devLinkButton}
                                    onPress={() => Linking.openURL('https://mohanapriyan.netlify.app/')}
                                >
                                    <Text style={styles.devLinkIcon}>🌐</Text>
                                    <Text style={styles.devLinkText}>Portfolio</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.devLinkButton}
                                    onPress={() => Linking.openURL('https://github.com/mohanapriyan2006')}
                                >
                                    <Text style={styles.devLinkIcon}>💻</Text>
                                    <Text style={styles.devLinkText}>GitHub</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Contact */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact & Links</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/mohanapriyan2006/fundfast')}>
                            <Text style={styles.link}>📦 View Source Code</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/mohanapriyan2006/fundfast/releases')}>
                            <Text style={styles.link}>📲 Download Latest APK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:mohanapriyan.dev@gmail.com')}>
                            <Text style={styles.link}>✉️ Email Support</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Copyright */}
                    <View style={styles.footer}>
                        <Text style={styles.copyright}>Made with ❤️ by Mohanapriyan</Text>
                        <Text style={styles.copyright}>© 2025 FundFast. All rights reserved.</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default About;

const styles = StyleSheet.create({
    backIcon: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 999,
    },

    headingContainer: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 50,
    },

    headingUnderLine: {
        width: 80,
        height: 2,
        backgroundColor: primary.DEFAULT,
        marginTop: 2,
    },

    content: {
        padding: 20,
        backgroundColor: accent.DEFAULT,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        top: -20,
    },

    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },

    version: {
        fontSize: 14,
        marginTop: 10,
        color: accent.darker,
    },

    section: {
        marginBottom: 25,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: primary.dark,
        marginBottom: 12,
    },

    description: {
        fontSize: 15,
        color: '#333',
        lineHeight: 22,
        textAlign: 'justify',
    },

    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },

    bullet: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: primary.DEFAULT,
        marginRight: 12,
    },

    featureText: {
        fontSize: 15,
        color: '#333',
    },

    link: {
        fontSize: 15,
        color: primary.DEFAULT,
        marginBottom: 8,
        textDecorationLine: 'underline',
    },

    footer: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'center',
    },

    copyright: {
        fontSize: 13,
        color: accent.darker,
        textAlign: 'center',
        marginBottom: 5,
    },

    techCategory: {
        fontSize: 16,
        fontWeight: '600',
        color: primary.dark,
        marginTop: 15,
        marginBottom: 10,
    },

    techGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 10,
    },

    techChip: {
        backgroundColor: primary.lighter,
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: primary.light,
    },

    techText: {
        fontSize: 13,
        color: 'white',
        fontWeight: '500',
    },

    developerCard: {
        backgroundColor: '#f8f9fa',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },

    developerInfo: {
        marginBottom: 15,
        alignItems: 'center',
    },

    developerName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primary.dark,
        marginBottom: 4,
    },

    developerRole: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },

    developerLinks: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
    },

    devLinkButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: primary.DEFAULT,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    devLinkIcon: {
        fontSize: 16,
        marginRight: 6,
    },

    devLinkText: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '600',
    },
})
