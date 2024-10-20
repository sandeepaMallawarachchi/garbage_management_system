import React from 'react';
import { Document, Page, Text, View, Image, StyleSheet } from '@react-pdf/renderer';
import logo from '../images/logo.png';
import pdfbg from '../images/pdfbg.png';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#fff',
        padding: 30,
        backgroundImage: `url(${pdfbg})`,
        backgroundSize: 'cover',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 12,
        marginBottom: 10,
    },
});

const WasteReportPDF = ({ wasteLevels }) => {
    const { organic, recyclable, eWaste } = wasteLevels;

    let wasteComment = '';

    if (organic > recyclable && organic > eWaste) {
        wasteComment = 'Organic waste management is critical for sustainability. High levels of organic waste indicate a strong commitment to composting and reducing landfill waste, which benefits the environment. Regular monitoring and responsible disposal practices will ensure continued progress.';
    } else if (recyclable > organic && recyclable > eWaste) {
        wasteComment = 'Recyclable waste levels indicate a moderate awareness of sustainable practices. It’s essential to continue educating the community about recycling and its benefits to reduce overall waste and promote environmental responsibility.';
    } else {
        wasteComment = 'E-waste presents a significant challenge for waste management. High levels of e-waste can lead to environmental hazards if not disposed of properly. Awareness campaigns and proper recycling programs are necessary to mitigate this issue and promote responsible disposal.';
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image src={logo} style={styles.logo} />
                    <Text style={styles.title}>Waste Management Report</Text>
                </View>
                <Text style={styles.paragraph}>
                    Organic Waste: {organic} kg
                </Text>
                <Text style={styles.paragraph}>
                    Recyclable Waste: {recyclable} kg
                </Text>
                <Text style={styles.paragraph}>
                    E-Waste: {eWaste} kg
                </Text>
                <Text style={styles.paragraph}>{wasteComment}</Text>
            </Page>
        </Document>
    );
};

export default WasteReportPDF;
