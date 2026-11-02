// booking.js - form reservasi barbershop
// data disimpan di localStorage (demo)

var form = document.getElementById('form-booking');
var daftar = document.getElementById('daftar-booking');
var pesan = document.getElementById('pesan');

// isi pilihan jam dari 09:00 sampai 20:00
var pilihJam = document.getElementById('jam');

for (var j = 9; j <= 20; j++) {
  var opsi = document.createElement('option');
  var teksJam = j + ':00';
  if (j < 10) {
    teksJam = '0' + teksJam;
  }
  opsi.value = teksJam;
  opsi.textContent = teksJam;
  pilihJam.appendChild(opsi);
}

// tanggal tidak boleh sebelum hari ini
var hariIni = new Date().toISOString().split('T')[0];
document.getElementById('tanggal').min = hariIni;

// kalau sudah login, isi nama otomatis
var user = JSON.parse(localStorage.getItem('userLogin'));
if (user) {
  document.getElementById('nama').value = user.nama;
}

// ambil data booking
function ambilBooking() {
  var data = localStorage.getItem('dataBooking');
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// tampilkan daftar booking
function tampilBooking() {
  var data = ambilBooking();
  daftar.innerHTML = '';

  if (data.length == 0) {
    daftar.textContent = 'Belum ada reservasi.';
    return;
  }

  for (var i = 0; i < data.length; i++) {
    var item = document.createElement('div');
    item.className = 'item-booking';

    var info = document.createElement('div');
    var judul = document.createElement('strong');
    judul.textContent = data[i].layanan;
    var detail = document.createElement('small');
    detail.textContent = data[i].tanggal + ' - ' + data[i].jam + ' - Barber ' + data[i].barber;
    var pemesan = document.createElement('small');
    pemesan.textContent = 'a.n. ' + data[i].nama + ' (' + data[i].telepon + ')';

    info.appendChild(judul);
    info.appendChild(detail);
    info.appendChild(pemesan);

    var tombol = document.createElement('button');
    tombol.textContent = 'Batal';
    tombol.className = 'btn-batal';
    tombol.setAttribute('data-index', i);
    tombol.addEventListener('click', hapusBooking);

    item.appendChild(info);
    item.appendChild(tombol);
    daftar.appendChild(item);
  }
}

// batalkan booking
function hapusBooking() {
  var index = this.getAttribute('data-index');
  var data = ambilBooking();
  data.splice(index, 1);
  localStorage.setItem('dataBooking', JSON.stringify(data));
  tampilBooking();
}

// saat form dikirim
form.addEventListener('submit', function (e) {
  e.preventDefault();

  var baru = {
    nama: document.getElementById('nama').value,
    telepon: document.getElementById('telepon').value,
    layanan: document.getElementById('layanan').value,
    barber: document.getElementById('barber').value,
    tanggal: document.getElementById('tanggal').value,
    jam: document.getElementById('jam').value
  };

  var data = ambilBooking();

  // cek apakah jam sudah dipesan
  for (var i = 0; i < data.length; i++) {
    if (data[i].barber == baru.barber && data[i].tanggal == baru.tanggal && data[i].jam == baru.jam) {
      pesan.textContent = 'Jam itu sudah dipesan, pilih jam atau barber lain.';
      pesan.className = 'pesan error';
      return;
    }
  }

  data.push(baru);
  localStorage.setItem('dataBooking', JSON.stringify(data));

  pesan.textContent = 'Booking berhasil! Sampai jumpa, ' + baru.nama;
  pesan.className = 'pesan sukses';

  form.reset();
  if (user) {
    document.getElementById('nama').value = user.nama;
  }
  tampilBooking();
});

tampilBooking();

```javascript
// ===== SISTEM BOOKING KINGS CUT =====

var formBooking = document.getElementById('form-booking');
var daftarBooking = document.getElementById('daftar-booking');
var pesan = document.getElementById('pesan');

// Mengambil data booking
function ambilBooking() {
    return JSON.parse(localStorage.getItem('daftarBooking')) || [];
}

// Menyimpan data booking
function simpanBooking(data) {
    localStorage.setItem('daftarBooking', JSON.stringify(data));
}

// Membuat pilihan jam
var pilihanJam = document.getElementById('jam');

if (pilihanJam && pilihanJam.options.length === 0) {
    for (var jam = 9; jam <= 20; jam++) {
        var waktu = String(jam).padStart(2, '0') + ':00';

        var option = document.createElement('option');
        option.value = waktu;
        option.textContent = waktu;

        pilihanJam.appendChild(option);
    }
}

// Minimal tanggal hari ini
var inputTanggal = document.getElementById('tanggal');

if (inputTanggal) {
    var hariIni = new Date();
    var tahun = hariIni.getFullYear();
    var bulan = String(hariIni.getMonth() + 1).padStart(2, '0');
    var tanggal = String(hariIni.getDate()).padStart(2, '0');

    inputTanggal.min = tahun + '-' + bulan + '-' + tanggal;
}

// Menampilkan booking milik pelanggan
function tampilkanBooking() {
    if (!daftarBooking) return;

    var data = ambilBooking();

    var user = JSON.parse(localStorage.getItem('userLogin'));

    daftarBooking.innerHTML = '';

    var bookingUser = data.filter(function(item) {
        return !user || item.nama === user.nama;
    });

    if (bookingUser.length === 0) {
        daftarBooking.innerHTML = '<p>Belum ada reservasi.</p>';
        return;
    }

    bookingUser.forEach(function(item) {
        var div = document.createElement('div');
        div.className = 'item-booking';

        var info = document.createElement('div');
        var nama = document.createElement('strong');
        nama.textContent = item.layanan;

        var detail = document.createElement('small');
        detail.textContent =
            item.barber + ' | ' + item.tanggal + ' | ' + item.jam;

        info.appendChild(nama);
        info.appendChild(detail);

        var batal = document.createElement('button');
        batal.className = 'btn-batal';
        batal.textContent = 'Batal';

        batal.addEventListener('click', function() {
            var terbaru = ambilBooking();

            terbaru = terbaru.filter(function(b) {
                return b.id !== item.id;
            });

            simpanBooking(terbaru);
            tampilkanBooking();
        });

        div.appendChild(info);
        div.appendChild(batal);

        daftarBooking.appendChild(div);
    });
}

// Proses booking baru
if (formBooking) {
    formBooking.addEventListener('submit', function(e) {
        e.preventDefault();

        var data = ambilBooking();

        var bookingBaru = {
            id: Date.now(),
            nama: document.getElementById('nama').value.trim(),
            telepon: document.getElementById('telepon').value.trim(),
            layanan: document.getElementById('layanan').value,
            barber: document.getElementById('barber').value,
            tanggal: document.getElementById('tanggal').value,
            jam: document.getElementById('jam').value
        };

        // Cek jadwal barber agar tidak bentrok
        var bentrok = data.some(function(item) {
            return item.barber === bookingBaru.barber &&
            item.tanggal === bookingBaru.tanggal &&
            item.jam === bookingBaru.jam;
        });

        if (bentrok) {
            pesan.textContent = 'Jadwal barber sudah dipesan!';
            pesan.className = 'pesan error';
            return;
        }

        data.push(bookingBaru);
        simpanBooking(data);

        pesan.textContent = 'Booking berhasil disimpan!';
        pesan.className = 'pesan sukses';

        formBooking.reset();

        tampilkanBooking();
    });
}

tampilkanBooking();
```