import React from "react";
import {
    pdf,
    Document,
    Page,
    Text,
    View,
    PDFViewer,
} from "@react-pdf/renderer";
import axios from "axios";
import { StyleSheet } from "@react-pdf/renderer";
const PdfView = () => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: "row",
            backgroundColor: "#7ec8e3",
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
    });
    const MyPDFDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>What the Hell?</Text>
                    <Text>PDF CONVERTED</Text>
                </View>
            </Page>
        </Document>
    );
    // http://192.168.0.106:8080/public/save/upload
    const generatePDF = async () => {
        const blob = await pdf(<MyPDFDocument />).toBlob();
        console.log(blob);
        const file = new File([blob], 'filename.pdf', { type: 'application/pdf' });
        const formData = new FormData();
        console.log(file)
        formData.append("file", file);
        formData.append("email", "mamun@bhuski.com");
        formData.append("subject", "Biology");
        formData.append("topic", "Gay gene");
        console.log(formData);
        try {
            const response = await axios.post(
                "http://192.168.0.106:8080/public/save/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            console.log('success')
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <button
            className="bg-blue-100 border p-4 flex justify-center "
            onClick={generatePDF}
        >
            CLick
        </button>
    );
};

export default PdfView;
