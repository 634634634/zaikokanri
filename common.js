// 共通設定・関数

// GASのウェブアプリURL
const API_URL = 'https://script.google.com/macros/s/AKfycbwiMX9rD1Vd9XhrnRZaAzuYtFgg611a1vDrIHvhHdluiX8E54nc4jtdBcABdUF8BXGq/exec';

// 日付フォーマット (MM/DD HH:mm)
function formatDateShort(dateStr) {
    if (!dateStr || dateStr === '---') return '---';
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
}

// 基準在庫数の取得
function getThreshold(product, month) {
    if (product.monthlyOverrides && product.monthlyOverrides[month] !== undefined) {
        return product.monthlyOverrides[month];
    }
    return product.defaultThreshold;
}

// 在庫不足判定
function isLowStock(product, month) {
    const threshold = getThreshold(product, month);
    return product.stock < threshold;
}
