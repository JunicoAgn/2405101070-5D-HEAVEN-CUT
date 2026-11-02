// kontak.js - menyimpan pesan dari form kontak di beranda
// data disimpan di localStorage dengan nama 'dataPesan' (demo)

var formKontak = document.getElementById('form-kontak');

formKontak.addEventListener('submit', function (e) {
  e.preventDefault();

  // ambil pesan lama (kalau ada)
  var data = [];
  var tersimpan = localStorage.getItem('dataPesan');
  if (tersimpan) {
    data = JSON.parse(tersimpan);
  }

  // tambah pesan baru
  data.push({
    nama: document.getElementById('kontak-nama').value,
    telepon: document.getElementById('kontak-telepon').value,
    pesan: document.getElementById('kontak-pesan').value,
    waktu: new Date().toLocaleString('id-ID')
  });

  localStorage.setItem('dataPesan', JSON.stringify(data));

  alert('Terima kasih! Pesan Anda sudah terkirim.');
  formKontak.reset();
});
