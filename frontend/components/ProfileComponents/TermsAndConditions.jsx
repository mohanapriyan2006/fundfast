import { Image } from 'expo-image'
import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { accent, primary } from '../../theme/colors'
import { useNavigation } from '@react-navigation/native'
import OtherHeader from '../OtherHeader'

const TermsAndConditions = () => {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, backgroundColor: accent.DEFAULT, paddingBottom: 40 }}>
            <ScrollView style={{ flex: 1 }}>

                {/* Header */}
                <OtherHeader title='Terms & Conditions' />

                {/* Content */}
                <View style={styles.content}>

                    {/* Heading */}
                    <View style={styles.headingContainer}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, zIndex: 99 }}>Terms & Conditions</Text>
                        <View style={styles.headingUnderLine}></View>
                    </View>

                    <Text style={styles.lastUpdated}>Last Updated: November 2, 2025</Text>

                    {/* App Logo */}
                    <Image source={require('../../assets/images/logo-name.png')} style={{ height: 50, width: 200, alignSelf: 'center' }} />


                    {/* Introduction */}
                    <View style={styles.section}>
                        <Text style={styles.paragraph}>
                            Welcome to FundFast. By using our e-wallet application, you agree to be bound by these Terms and Conditions. Please read them carefully before using our services.
                        </Text>
                    </View>

                    {/* Section 1 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                        <Text style={styles.paragraph}>
                            By creating an account and using FundFast, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy.
                        </Text>
                    </View>

                    {/* Section 2 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>2. Account Registration</Text>
                        <Text style={styles.paragraph}>
                            • You must be at least 18 years old to use FundFast{'\n'}
                            • You must provide accurate and complete information during registration{'\n'}
                            • You are responsible for maintaining the confidentiality of your account credentials{'\n'}
                            • You must notify us immediately of any unauthorized access to your account
                        </Text>
                    </View>

                    {/* Section 3 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>3. Use of Services</Text>
                        <Text style={styles.paragraph}>
                            FundFast provides digital wallet services including:{'\n'}
                            • Money transfers and payments{'\n'}
                            • Wallet management{'\n'}
                            • Transaction tracking and analytics{'\n'}
                            • QR code payment services
                        </Text>
                    </View>

                    {/* Section 4 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>4. User Responsibilities</Text>
                        <Text style={styles.paragraph}>
                            You agree to:{'\n'}
                            • Use the service only for lawful purposes{'\n'}
                            • Not engage in fraudulent activities{'\n'}
                            • Maintain accurate account information{'\n'}
                            • Comply with all applicable laws and regulations{'\n'}
                            • Not attempt to hack or compromise system security
                        </Text>
                    </View>

                    {/* Section 5 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>5. Fees and Charges</Text>
                        <Text style={styles.paragraph}>
                            FundFast may charge fees for certain services. All applicable fees will be clearly displayed before you complete a transaction. We reserve the right to modify our fee structure with prior notice.
                        </Text>
                    </View>

                    {/* Section 6 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>6. Security</Text>
                        <Text style={styles.paragraph}>
                            We implement industry-standard security measures to protect your account and transactions. However, you are responsible for:{'\n'}
                            • Keeping your PIN and password secure{'\n'}
                            • Using the app on secure devices{'\n'}
                            • Logging out after each session{'\n'}
                            • Reporting any suspicious activity immediately
                        </Text>
                    </View>

                    {/* Section 7 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>7. Transaction Limits</Text>
                        <Text style={styles.paragraph}>
                            We may impose transaction limits for security purposes. These limits may vary based on account verification level and transaction history.
                        </Text>
                    </View>

                    {/* Section 8 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>8. Refunds and Disputes</Text>
                        <Text style={styles.paragraph}>
                            All transactions are final once completed. In case of errors or disputes, please contact our support team within 48 hours of the transaction. We will investigate and resolve disputes in accordance with our policies.
                        </Text>
                    </View>

                    {/* Section 9 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>9. Termination</Text>
                        <Text style={styles.paragraph}>
                            We reserve the right to suspend or terminate your account if you violate these Terms and Conditions or engage in suspicious or fraudulent activities.
                        </Text>
                    </View>

                    {/* Section 10 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>10. Limitation of Liability</Text>
                        <Text style={styles.paragraph}>
                            FundFast shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability is limited to the amount of fees paid by you in the last 12 months.
                        </Text>
                    </View>

                    {/* Section 11 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>11. Privacy</Text>
                        <Text style={styles.paragraph}>
                            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                        </Text>
                    </View>

                    {/* Section 12 */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>12. Changes to Terms</Text>
                        <Text style={styles.paragraph}>
                            We may update these Terms and Conditions from time to time. We will notify you of any material changes through the app or via email. Continued use of FundFast after changes constitutes acceptance of the updated terms.
                        </Text>
                    </View>

                    {/* Contact */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>13. Contact Information</Text>
                        <Text style={styles.paragraph}>
                            If you have any questions about these Terms and Conditions, please contact us at:{'\n\n'}
                            Email: support@fundfast.com{'\n'}
                            Website: www.fundfast.com
                        </Text>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            By using FundFast, you acknowledge that you have read and understood these Terms and Conditions.
                        </Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default TermsAndConditions;

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
        marginVertical: 10,
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

    lastUpdated: {
        fontSize: 13,
        color: accent.darker,
        fontStyle: 'italic',
        marginBottom: 20,
    },

    section: {
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: primary.dark,
        marginBottom: 8,
    },

    paragraph: {
        fontSize: 14,
        color: '#333',
        lineHeight: 22,
        textAlign: 'justify',
    },

    footer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: primary.light,
        borderRadius: 8,
        marginBottom: 20,
    },

    footerText: {
        fontSize: 13,
        color: primary.dark,
        textAlign: 'center',
        fontWeight: '500',
    },
})
