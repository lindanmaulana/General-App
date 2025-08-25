"use client"

import { incomes } from "@/app/api/_lib/models/incomes"
import { handleParseDate, handleParsePrice } from "@/lib/helpers/parsing"
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer"

interface ExpensesDocumentProps {
    period: string
    data: incomes[] | []
}

export const ExpensesDocument = ({period, data}: ExpensesDocumentProps) => {
    const reportDate = handleParseDate(new Date(), "YYYY-MM-DD")

    const styles = StyleSheet.create({
            page: {
                flexDirection: 'column',
                backgroundColor: '#E4E4E4',
                padding: 30,
            },
    
            report_heading: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
                margin: 10,
                padding: 10,
            },
    
            report_heading_logo: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 4
            },
    
            report_heading_logo_image: {
                width: 15,
                height: 15
            },
    
            report_heading_logo_text: {
                fontSize: 10
            },
    
            report_heading_title: {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            },
    
            report_heading_title_text: {
                fontSize: 16,
                textAlign: 'center',
            },
    
            report_heading_period: {
                fontSize: 12
            },
            
            report_heading_date: {
                fontSize: 12
            },
    
            text: {
                fontSize: 12,
            },
            tableContainer: {
                flexDirection: 'column',
                width: 'auto',
                border: '1px solid #E0E0E0',
                marginBottom: 20
            },
            headerContainer: {
                flexDirection: 'row',
                backgroundColor: '#EF4444',
                borderBottom: '1px solid #E0E0E0',
            },
            headerCell: {
                padding: 8,
                fontSize: 10,
                fontWeight: 'bold',
                color: '#fff',
                textAlign: 'center',
            },
            rowContainer: {
                flexDirection: 'row',
                borderBottom: '1px solid #E0E0E0',
                backgroundColor: '#f5f5f5',
            },
            bodyCell: {
                padding: 8,
                fontSize: 10,
                textAlign: 'left',
            },
    
            footer: {
                display: "flex",
                flexDirection: "column",
                gap: 2
            },
    
            footer_total_balance: {
                fontSize: 10
            },
    
            footer_total_balance_price: {
                color: '#EF4444'
            },
            // Untuk warna baris bergantian
            rowEven: {
                backgroundColor: '#fff',
            },
        })
        
        const totalBalance = data.reduce((acc, call) => acc + call.amount, 0)
        const reportTotalBalance = handleParsePrice(totalBalance)

        return (
                <Document>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.report_heading}>
                            <View style={styles.report_heading_logo}>
                                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                                <Image src={'/images/logo/general.png'}  style={styles.report_heading_logo_image}/>
                                <Text style={styles.report_heading_logo_text}>Alhidayah (General) Muncangela</Text>
                            </View>
    
                            <View style={styles.report_heading_title}>
                                <Text style={styles.report_heading_title_text}> LAPORAN PENGELUARAN BULANAN</Text>
                            </View>
    
                            <View style={styles.report_heading_period}>
                                <Text>Periode: {period}</Text>
                            </View>
    
                            <View style={styles.report_heading_date}>
                                <Text>Dicetak: {reportDate}</Text>
                            </View>
                        </View>
    
                        <View style={styles.tableContainer}>
                            <View style={styles.headerContainer}>
                                <Text style={[styles.headerCell, { flex: 0.8 }]}>Tanggal</Text>
                                <Text style={[styles.headerCell, { flex: 1 }]}>Acara</Text>
                                <Text style={[styles.headerCell, { flex: 2 }]}>Sumber Pendapatan</Text>
                                <Text style={[styles.headerCell, { flex: 1.5 }]}>Deskripsi</Text>
                                <Text style={[styles.headerCell, { flex: 1.5 }]}>Akun</Text>
                                <Text style={[styles.headerCell, { flex: 1.2, textAlign: 'right' }]}>Jumlah</Text>
                            </View>
    
                            {data.map((item: incomes, index: number) => {
                                let date: string = "-"
                                let eventName: string = "-"
                                let description: string = "-"
                                let accountName: string = "-"
    
                                if(item.date) date = handleParseDate(item.date, "YYYY-MM-DD")
                                if(item.events?.name) eventName = item.events.name
                                if(item.note) description = item.note
                                if(item.fund_accounts?.name) accountName = item.fund_accounts.name
    
                                return (
                                <View key={item.id} style={[styles.rowContainer, index % 2 === 0 ? styles.rowEven : {}]}>
                                    <Text style={[styles.bodyCell, { flex: 0.8 }]}>{date}</Text>
                                    <Text style={[styles.bodyCell, { flex: 1 }]}>{eventName}</Text>
                                    <Text style={[styles.bodyCell, { flex: 2 }]}>{item.source}</Text>
                                    <Text style={[styles.bodyCell, { flex: 1.5 }]}>{description}</Text>
                                    <Text style={[styles.bodyCell, { flex: 1.5 }]}>{accountName}</Text>
                                    <Text style={[styles.bodyCell, { flex: 1.2, textAlign: 'right' }]}>{handleParsePrice(item.amount)}</Text>
                                </View>
                            )})}
                        </View>
    
                        <View style={styles.footer} >
                            <Text style={styles.footer_total_balance}>Ringkasan Bulan {period}</Text>
                            <Text style={styles.footer_total_balance}>Total Pengeluaran: <Text style={styles.footer_total_balance_price}>{reportTotalBalance}</Text></Text>
                        </View>
                    </Page> 
                </Document>
        )
}