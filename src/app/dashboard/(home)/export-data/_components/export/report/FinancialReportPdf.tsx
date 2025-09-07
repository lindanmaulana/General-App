"use client"

import { handleParsePrice } from '@/lib/helpers/parsing';
import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { formatDataForExport } from '../helpers/formatDataForExport';
import { initialData } from '../types/initial-data';

Font.register({
  family: 'Times-New-Roman-Regular',
  src: '/fonts/times-new-roman/Regular.ttf',
});

Font.register({
  family: 'Times-New-Roman-Italic',
  src: '/fonts/times-new-roman/Italic.ttf',
});

Font.register({
  family: 'Times-New-Roman-Bold',
  src: '/fonts/times-new-roman/Bold.ttf',
});

Font.register({
  family: 'Times-New-Roman-BoldItalic',
  src: '/fonts/times-new-roman/BoldItalic.ttf',
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingRight: 80,
    paddingBottom: 30,
    paddingLeft: 80,
    fontSize: 10,
    fontFamily: 'Times-New-Roman-Regular',
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Times-New-Roman-Bold',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    fontFamily: 'Times-New-Roman-BoldItalic',
    fontSize: 10,
    marginTop: 2,
  },

  sectionTitle: {
    fontFamily: 'Times-New-Roman-Bold',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },

  line: {
    width: '100%',
    height: 2,
    display: 'flex',
    backgroundColor: 'black',
    marginBottom: 16,
  },

  table: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 8,
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },

  tableCol: {
    textAlign: 'left',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
  },

  tableColHeader: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },

  bold: {
    fontFamily: 'Times-New-Roman-Bold',
  },

  number: {
    textAlign: "center"
  }
});

export const FinancialReportPdf = ({ incomes, expenses, totalBalance }: initialData) => {
  const data = formatDataForExport({ incomes, expenses });

  const totalBalanceNumber: number = totalBalance ?? 0
  const totalIncomesNumber: number = incomes.length > 0 ? incomes.reduce((acc, call) => acc += call.amount, 0) : 0
  const totalExpensesNumber: number = expenses.length > 0 ? expenses.reduce((acc, call) => acc += call.amount, 0) : 0
  const totalBeginningBalanceNumber = totalBalanceNumber + totalExpensesNumber - totalIncomesNumber

  const totalRupiahBalance: string = handleParsePrice(totalBalanceNumber)
  const totalRupiahBeginningBalance: string = handleParsePrice(totalBeginningBalanceNumber)
  const totalRupiahIncomes: string = handleParsePrice(totalIncomesNumber)
  const totalRupiahExpenses: string = handleParsePrice(totalExpensesNumber)

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>DEWAN KEMAKMURAN MASJID (DKM)</Text>
          <Text style={styles.title}>
            MUSHOLA {'"'}AL HIDAYAH{'"'}
          </Text>
          <Text style={styles.subtitle}>lingkungan Al hidayah RT 006/RW 003 Desa Muncangela Kecamatan Cipicung Kabupaten Kuningan Jawa Barat 45592</Text>
        </View>

        <View style={styles.line}></View>

        <View style={{ textAlign: 'center', marginBottom: 6 }}>
          <Text style={styles.bold}>
            CATATAN KEUANGAN{'\n'}DEWAN KEMAKMURAN MASJID{'\n'}MUSHOLA AL HIDAYAH
          </Text>
        </View>

        {/* PEMASUKAN */}
        {incomes.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>• PEMASUKAN</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '6%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>NO</Text>
                </View>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '20%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>TANGGAL</Text>
                </View>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '30%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>NAMA</Text>
                </View>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '22%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>JENIS</Text>
                  <Text style={[styles.bold, { width: '100%' }]}>PENGIRIMAN</Text>
                </View>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '22%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>NOMINAL</Text>
                </View>
              </View>

              {data.incomesData.map((incomes) => (
                <View key={incomes.No} style={styles.tableRow}>
                  <Text style={[styles.tableCol, { width: '6%' }, styles.number]}>
                    {incomes.No}
                  </Text>
                  <Text style={[styles.tableCol, { width: '20%' }]}>
                    {incomes.Tanggal}
                  </Text>

                  <Text style={[styles.tableCol, { width: '30%' }]}>
                    {incomes.Sumber_Pendapatan}
                  </Text>

                  <Text style={[styles.tableCol, { width: '22%' }]}>
                    {incomes.Tipe_Akun}
                  </Text>

                  <Text style={[styles.tableCol, { width: '22%' }]}>
                    {incomes.Jumlah_Rupiah}
                  </Text>
                </View>
              ))}

              <View style={styles.tableRow}>
                <Text style={[styles.tableCol, { width: '78%', textAlign: 'center' }, styles.bold]}>JUMLAH</Text>
                <Text style={[styles.tableCol, { width: '22%' }, styles.bold]}>{totalRupiahIncomes}</Text>
              </View>
            </View>
          </>
        )}

        {expenses.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>• PENGELUARAN</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '6%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>NO</Text>
                </View>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '30%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>TANGGAL</Text>
                </View>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '54%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>JENIS PENGELUARAN</Text>
                </View>
                <View style={[styles.tableCol, styles.tableColHeader, { width: '20%' }, styles.bold]}>
                  <Text style={[styles.bold, { width: '100%' }]}>NOMINAL</Text>
                </View>
              </View>

              {data.expensesData.map((expense) => (
                <View key={expense.No} style={styles.tableRow}>
                  <Text style={[styles.tableCol, { width: '6%' }, styles.number]}>{expense.No}</Text>
                  <Text style={[styles.tableCol, { width: '30%' }]}>{expense.Tanggal}</Text>
                  <Text style={[styles.tableCol, { width: '54%' }]}>{expense.Kategori_Pengeluaran}</Text>
                  <Text style={[styles.tableCol, { width: '20%' }]}>{expense.Jumlah_Rupiah}</Text>
                </View>
              ))}

              <View style={styles.tableRow}>
                <Text style={[styles.tableCol, { width: '90%', textAlign: 'center' }, styles.bold]}>JUMLAH</Text>
                <Text style={[styles.tableCol, { width: '20%' }, styles.bold]}>{totalRupiahExpenses}</Text>
              </View>
            </View>
          </>
        )}

        {/* SALDO AKHIR */}
        <Text style={styles.sectionTitle}>• SALDO AKHIR</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: '6%' }, styles.bold]}>NO</Text>
            <Text style={[styles.tableCol, { width: '74%' }, styles.bold]}>TOTAL SALDO AKHIR</Text>
            <Text style={[styles.tableCol, { width: '20%' }, styles.bold]}>NOMINAL</Text>
          </View>

          {incomes.length > 0 && expenses.length > 0 && (
            <>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCol, { width: '6%' }, styles.bold]}>1</Text>
                <Text style={[styles.tableCol, { width: '74%' }]}>SALDO YANG ADA</Text>
                <Text style={[styles.tableCol, { width: '20%' }]}>{totalRupiahBeginningBalance}</Text>
              </View>

              <View style={styles.tableRow}>
                <Text style={[styles.tableCol, { width: '6%' }, styles.bold]}>2</Text>
                <Text style={[styles.tableCol, { width: '74%' }]}>PEMASUKAN</Text>
                <Text style={[styles.tableCol, { width: '20%' }]}>{totalRupiahIncomes}</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={[styles.tableCol, { width: '6%' }, styles.bold]}>3</Text>
                <Text style={[styles.tableCol, { width: '74%' }]}>PENGELUARAN</Text>
                <Text style={[styles.tableCol, { width: '20%', color: 'red' }]}>{totalRupiahExpenses}</Text>
              </View>
            </>
          )}

          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { width: '80%', textAlign: 'center' }, styles.bold]}>SALDO AKHIR</Text>
            <Text style={[styles.tableCol, { width: '20%' }, styles.bold]}>{totalRupiahBalance}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
