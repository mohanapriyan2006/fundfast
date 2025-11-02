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
            <ScrollView style={{ flex: 1 }}>
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

                    {/* Contact */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact Us</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:support@fundfast.com')}>
                            <Text style={styles.link}>support@fundfast.com</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.fundfast.com')}>
                            <Text style={styles.link}>www.fundfast.com</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Copyright */}
                    <View style={styles.footer}>
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
    },
})
