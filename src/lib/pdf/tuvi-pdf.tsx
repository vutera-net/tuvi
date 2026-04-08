import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer'
import type { TuViChart } from '@/types'
import { THIEN_CAN, DIA_CHI } from '@/data/can-chi'

// Register a font that supports Vietnamese — fallback to built-in Helvetica
// (swap out for a custom TTF if needed for full diacritic support)
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 9,
    padding: 32,
    backgroundColor: '#FFFFFF',
  },
  // --- Header ---
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#C41E3A',
    paddingBottom: 10,
    marginBottom: 14,
  },
  appName: {
    fontSize: 11,
    color: '#C41E3A',
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    color: '#1A1A1A',
    marginTop: 4,
  },
  subLine: {
    fontSize: 9,
    color: '#666666',
    marginTop: 3,
  },
  // --- Info row ---
  infoRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  infoCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
    padding: 8,
  },
  infoLabel: {
    fontSize: 7,
    color: '#9CA3AF',
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#1A1A1A',
  },
  infoSub: {
    fontSize: 8,
    color: '#6B7280',
    marginTop: 2,
  },
  // --- Section ---
  sectionTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#C41E3A',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#FEE2E2',
    paddingBottom: 3,
  },
  // --- Grid ---
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginBottom: 14,
  },
  palaceCell: {
    width: '24%',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 3,
    padding: 5,
    minHeight: 60,
  },
  palaceLifeCell: {
    borderColor: '#C41E3A',
    backgroundColor: '#FFF5F5',
  },
  palaceSoulCell: {
    borderColor: '#D97706',
    backgroundColor: '#FFFBEB',
  },
  palaceName: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#374151',
    marginBottom: 2,
  },
  palaceDiaChi: {
    fontSize: 7,
    color: '#9CA3AF',
    marginBottom: 3,
  },
  starGood: {
    fontSize: 7,
    color: '#1D4ED8',
    marginBottom: 1,
  },
  starBad: {
    fontSize: 7,
    color: '#9CA3AF',
    marginBottom: 1,
  },
  palaceTag: {
    fontSize: 6,
    color: '#C41E3A',
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  // --- Table ---
  table: {
    marginBottom: 14,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 3,
    padding: 5,
    marginBottom: 1,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 5,
  },
  tableRowActive: {
    backgroundColor: '#FFF5F5',
  },
  th: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: '#6B7280',
    textTransform: 'uppercase',
  },
  td: {
    fontSize: 8,
    color: '#374151',
  },
  col1: { width: '20%' },
  col2: { width: '25%' },
  col3: { width: '25%' },
  col4: { width: '15%' },
  col5: { width: '15%' },
  // --- Footer ---
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 32,
    right: 32,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    color: '#9CA3AF',
  },
})

const BRIGHTNESS_LABEL: Record<string, string> = {
  mieu:    'Mieu',
  vuong:   'Vuong',
  dacDia:  'Dac',
  binhHoa: 'Binh',
  hamDia:  'Ham',
}

interface Props {
  chart: TuViChart
  generatedAt?: string
}

export function TuViPdfDocument({ chart, generatedAt }: Props) {
  const canChiYear = `${THIEN_CAN[chart.birthDate.canYear]} ${DIA_CHI[chart.birthDate.chiYear]}`
  const canChiDay  = `${THIEN_CAN[chart.birthDate.canDay]} ${DIA_CHI[chart.birthDate.chiDay]}`
  const now = generatedAt ?? new Date().toLocaleDateString('vi-VN')
  const currentYear = new Date().getFullYear()

  return (
    <Document
      title={`La So Tu Vi - ${chart.label}`}
      author="Harmony Tu Vi"
      subject="Tu Vi Dau So"
    >
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appName}>Harmony Tu Vi</Text>
          <Text style={styles.chartTitle}>La So Tu Vi Dau So</Text>
          <Text style={styles.subLine}>
            {chart.label} • {chart.gender === 'male' ? 'Nam' : 'Nu'} • Xuat ngay {now}
          </Text>
        </View>

        {/* Info cards */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Ngay sinh am lich</Text>
            <Text style={styles.infoValue}>
              {chart.birthDate.day}/{chart.birthDate.month}/{chart.birthDate.year}
              {chart.birthDate.isLeapMonth ? ' (Nhuan)' : ''}
            </Text>
            <Text style={styles.infoSub}>Gio {chart.birthHourName} • {canChiDay}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Nam sinh can chi</Text>
            <Text style={styles.infoValue}>{canChiYear}</Text>
            <Text style={styles.infoSub}>Menh: {chart.menh} • {chart.napAm}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Cuc</Text>
            <Text style={styles.infoValue}>{chart.cuc}</Text>
            <Text style={styles.infoSub}>Dai Han: {chart.cucNumber} nam/van</Text>
          </View>
        </View>

        {/* 12 Cung grid */}
        <Text style={styles.sectionTitle}>12 Cung Tu Vi</Text>
        <View style={styles.grid}>
          {chart.palaces.map((palace) => (
            <View
              key={palace.index}
              style={[
                styles.palaceCell,
                palace.isLifePalace ? styles.palaceLifeCell : {},
                palace.isSoulPalace ? styles.palaceSoulCell : {},
              ]}
            >
              {(palace.isLifePalace || palace.isSoulPalace) && (
                <Text style={styles.palaceTag}>
                  {palace.isLifePalace ? '[Menh]' : '[Than]'}
                </Text>
              )}
              <Text style={styles.palaceName}>{palace.name}</Text>
              <Text style={styles.palaceDiaChi}>{palace.diaChi}</Text>
              {palace.mainStars.map((star) => (
                <Text
                  key={star.name}
                  style={star.isGood ? styles.starGood : styles.starBad}
                >
                  {star.name} ({BRIGHTNESS_LABEL[star.brightness] ?? star.brightness})
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Dai Han table */}
        <Text style={styles.sectionTitle}>Dai Han ({chart.cucNumber} nam/van)</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.th, styles.col1]}>Tuoi</Text>
            <Text style={[styles.th, styles.col2]}>Nam bat dau</Text>
            <Text style={[styles.th, styles.col3]}>Cung</Text>
            <Text style={[styles.th, styles.col4]}>Chi</Text>
          </View>
          {chart.daiHan.slice(0, 9).map((dh, i) => {
            const isActive =
              currentYear >= dh.startYear &&
              currentYear <= dh.startYear + chart.cucNumber - 1
            return (
              <View
                key={i}
                style={[styles.tableRow, isActive ? styles.tableRowActive : {}]}
              >
                <Text style={[styles.td, styles.col1]}>
                  {dh.startAge} - {dh.endAge}
                </Text>
                <Text style={[styles.td, styles.col2]}>{dh.startYear}</Text>
                <Text style={[styles.td, styles.col3]}>{dh.palaceName}</Text>
                <Text style={[styles.td, styles.col4]}>{dh.diaChi}</Text>
              </View>
            )
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>harmonytuvivi.com</Text>
          <Text style={styles.footerText}>
            La so Tu Vi: {chart.label} • {chart.menh} • {chart.napAm}
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Trang ${pageNumber}/${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  )
}
