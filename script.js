// Input alanındaki içeriği tutacak değişken
let input = '';

// Operatorlerin tıklanma işlemleri
const operators = document.querySelectorAll('.operators div');
operators.forEach(operator => {
  operator.addEventListener('click', () => {
    // Son karakter operatör ise eklemeyi engelle
    if (isLastCharacterOperator(input)) return;
    
    input += operator.textContent.trim(); // Operatörü inputa ekle
    document.getElementById('input').textContent = input; // Input alanını güncelle
  });
});

// Rakamların tıklanma işlemleri
const numbers = document.querySelectorAll('.numbers .button');
numbers.forEach(number => {
  number.addEventListener('click', () => {
    input += number.textContent.trim(); // Rakamı inputa ekle
    document.getElementById('input').textContent = input; // Input alanını güncelle
  });
});

// Temizleme (Clear) işlemi
document.getElementById('clear').addEventListener('click', () => {
  input = ''; // Inputu sıfırla
  document.getElementById('input').textContent = ''; // Input alanını temizle
});

// Hesaplama işlemi
document.getElementById('result').addEventListener('click', () => {
  try {
    let result = evaluateInput(input); // Güvenli olarak ifadeyi değerlendir
    document.getElementById('input').textContent = result; // Sonucu göster
    input = result.toString(); // Sonucu inputa ekle (gelecek işlemler için)
  } catch (error) {
    document.getElementById('input').textContent = 'Error'; // Hata durumunda Error göster
    input = ''; // Hata durumunda inputu sıfırla
  }
});

// İfadeyi güvenli bir şekilde değerlendirme fonksiyonu
function evaluateInput(input) {
  // Operatörlerin ardışık kullanımını engelle
  if (endsWithOperator(input)) {
    throw 'Invalid input';
  }
  
  // Güvenli bir şekilde değerlendir
  return Function(`'use strict'; return (${input})`)();
}

// Input ifadesinin sonunda operatör olup olmadığını kontrol eden fonksiyon
function isLastCharacterOperator(input) {
  const operators = ['+', '-', '*', '/'];
  const lastChar = input[input.length - 1];
  return operators.includes(lastChar);
}

// Input ifadesinin sonunda operatör olup olmadığını kontrol eden fonksiyon
function endsWithOperator(input) {
  const operators = ['+', '-', '*', '/'];
  const lastChar = input[input.length - 1];
  return operators.includes(lastChar);
}
