"use client";

import { usePdfDocumentSettingStore } from "@/hooks/usePdfDocumentSettingStore";
import { Document, Font, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

Font.register({
    family: "Times-New-Roman-Regular",
    src: "/fonts/times-new-roman/Regular.ttf",
});

Font.register({
    family: "Times-New-Roman-Italic",
    src: "/fonts/times-new-roman/Italic.ttf",
});

Font.register({
    family: "Times-New-Roman-Bold",
    src: "/fonts/times-new-roman/Bold.ttf",
});

Font.register({
    family: "Times-New-Roman-BoldItalic",
    src: "/fonts/times-new-roman/BoldItalic.ttf",
});

const styles = StyleSheet.create({
    page: {
        paddingTop: 40,
        paddingRight: 80,
        paddingBottom: 30,
        paddingLeft: 80,
        fontSize: 10,
        fontFamily: "Times-New-Roman-Regular",
    },
    header: {
        textAlign: "center",
        marginBottom: 10,
    },
    title: {
        fontFamily: "Times-New-Roman-Bold",
        fontSize: 12,
        fontWeight: "bold",
    },
    subtitle: {
        fontFamily: "Times-New-Roman-BoldItalic",
        fontSize: 10,
        marginTop: 2,
    },

    sectionTitle: {
        fontFamily: "Times-New-Roman-Bold",
        fontSize: 10,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 4,
    },

    line: {
        width: "100%",
        height: 2,
        display: "flex",
        backgroundColor: "black",
        marginBottom: 16,
    },

    table: {
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 8,
    },

    tableRow: {
        flexDirection: "row",
        alignItems: "stretch",
    },

    tableCol: {
        textAlign: "left",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 3,
    },

    tableColHeader: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
    },

    bold: {
        fontFamily: "Times-New-Roman-Bold",
    },

    number: {
        textAlign: "center",
    },
});

export const ExampleReportPdf = () => {
    const { organization_type, organization_name, organization_address, document_title } = usePdfDocumentSettingStore();

    const documentTitleLines = document_title.replace(/\\n/g, '\n').split("\n");
    
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.title}>{organization_type}</Text>
                    <Text style={styles.title}>{organization_name}</Text>
                    <Text style={styles.subtitle}>{organization_address}</Text>
                </View>

                <View style={styles.line}></View>

                <View style={{ width: "100%", display: "flex", flexDirection: "column", textAlign: "center", marginBottom: 6 }}>
                    {documentTitleLines.map((title, index) => (
                        <Text key={`${title}-${index}`} style={[styles.bold]}>{title}</Text>
                    ))}
                </View>

                {/* PEMASUKAN */}
                        <Text style={styles.sectionTitle}>• PEMASUKAN</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "6%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>NO</Text>
                                </View>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "20%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>TANGGAL</Text>
                                </View>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "30%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>NAMA</Text>
                                </View>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "22%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>JENIS</Text>
                                    <Text style={[styles.bold, { width: "100%" }]}>PENGIRIMAN</Text>
                                </View>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "22%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>NOMINAL</Text>
                                </View>
                            </View>

                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableCol, { width: "6%" }, styles.number]}>1</Text>
                                    <Text style={[styles.tableCol, { width: "20%" }]}>10-10-2004</Text>

                                    <Text style={[styles.tableCol, { width: "30%" }]}>Anonymous</Text>

                                    <Text style={[styles.tableCol, { width: "22%" }]}>Bank</Text>

                                    <Text style={[styles.tableCol, { width: "22%" }]}>Rp 200.000</Text>
                                </View>

                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCol, { width: "78%", textAlign: "center" }, styles.bold]}>
                                    JUMLAH
                                </Text>
                                <Text style={[styles.tableCol, { width: "22%" }, styles.bold]}>
                                    Rp 200.000
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>• PENGELUARAN</Text>
                        <View style={styles.table}>
                            <View style={styles.tableRow}>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "6%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>NO</Text>
                                </View>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "30%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>TANGGAL</Text>
                                </View>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "54%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>JENIS PENGELUARAN</Text>
                                </View>
                                <View style={[styles.tableCol, styles.tableColHeader, { width: "20%" }, styles.bold]}>
                                    <Text style={[styles.bold, { width: "100%" }]}>NOMINAL</Text>
                                </View>
                            </View>

                                <View  style={styles.tableRow}>
                                    <Text style={[styles.tableCol, { width: "6%" }, styles.number]}>1</Text>
                                    <Text style={[styles.tableCol, { width: "30%" }]}>10-10-2003</Text>
                                    <Text style={[styles.tableCol, { width: "54%" }]}>
                                        Perkakas
                                    </Text>
                                    <Text style={[styles.tableCol, { width: "20%" }]}>100.000</Text>
                                </View>

                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCol, { width: "90%", textAlign: "center" }, styles.bold]}>
                                    JUMLAH
                                </Text>
                                <Text style={[styles.tableCol, { width: "20%" }, styles.bold]}>
                                    Rp 100.000
                                </Text>
                            </View>
                        </View>

                {/* SALDO AKHIR */}
                <Text style={styles.sectionTitle}>• SALDO AKHIR</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCol, { width: "6%" }, styles.bold]}>NO</Text>
                        <Text style={[styles.tableCol, { width: "74%" }, styles.bold]}>TOTAL SALDO AKHIR</Text>
                        <Text style={[styles.tableCol, { width: "20%" }, styles.bold]}>NOMINAL</Text>
                    </View>

                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCol, { width: "6%" }, styles.bold]}>1</Text>
                                <Text style={[styles.tableCol, { width: "74%" }]}>SALDO YANG ADA</Text>
                                <Text style={[styles.tableCol, { width: "20%" }]}>Rp 1.000.000</Text>
                            </View>

                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCol, { width: "6%" }, styles.bold]}>2</Text>
                                <Text style={[styles.tableCol, { width: "74%" }]}>PEMASUKAN</Text>
                                <Text style={[styles.tableCol, { width: "20%" }]}>Rp 200.000</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={[styles.tableCol, { width: "6%" }, styles.bold]}>3</Text>
                                <Text style={[styles.tableCol, { width: "74%" }]}>PENGELUARAN</Text>
                                <Text style={[styles.tableCol, { width: "20%", color: "red" }]}>
                                    Rp 100.000
                                </Text>
                            </View>

                    <View style={styles.tableRow}>
                        <Text style={[styles.tableCol, { width: "80%", textAlign: "center" }, styles.bold]}>
                            SALDO AKHIR
                        </Text>
                        <Text style={[styles.tableCol, { width: "20%" }, styles.bold]}>Rp 1.100.000</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );
};
