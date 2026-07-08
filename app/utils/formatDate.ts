// 日付を「YYYY/MM/DD」形式（日本ロケール・日本時間）で整形する。
export const formatDate = (value?: string | number | Date): string => {
  if (!value) {
    return ''
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toLocaleDateString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}
