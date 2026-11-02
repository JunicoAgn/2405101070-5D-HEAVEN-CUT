// auth.js - login dan daftar
// CATATAN: ini cuma demo, data disimpan di localStorage browser

// ambil semua user yang sudah daftar
function ambilUser() {
  var data = localStorage.getItem('daftarUser');
  if (data) {
    return JSON.parse(data);
  }
  return [];
}

// tampilkan pesan
function tampilPesan(teks, sukses) {
  var pesan = document.getElementById('pesan');
  pesan.textContent = teks;
  if (sukses) {
    pesan.className = 'pesan sukses';
  } else {
    pesan.className = 'pesan error';
  }
}

// proses daftar
function prosesDaftar(e) {
  e.preventDefault();

  var nama = document.getElementById('nama').value;
  var email = document.getElementById('email').value;
  var sandi = document.getElementById('sandi').value;
  var ulangi = document.getElementById('ulangi').value;

  if (sandi.length < 6) {
    tampilPesan('Kata sandi minimal 6 karakter', false);
    return;
  }

  if (sandi != ulangi) {
    tampilPesan('Kata sandi tidak sama', false);
    return;
  }

  var users = ambilUser();

  // cek email sudah dipakai atau belum
  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      tampilPesan('Email sudah terdaftar', false);
      return;
    }
  }

  users.push({ nama: nama, email: email, sandi: sandi });
  localStorage.setItem('daftarUser', JSON.stringify(users));

  tampilPesan('Berhasil daftar! Silakan masuk...', true);

  setTimeout(function () {
    location.href = 'login.html';
  }, 1000);
}

// proses login
function prosesLogin(e) {
  e.preventDefault();

  var email = document.getElementById('email').value;
  var sandi = document.getElementById('sandi').value;
  var users = ambilUser();

  for (var i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].sandi == sandi) {
      localStorage.setItem('userLogin', JSON.stringify({ nama: users[i].nama, email: email }));
      tampilPesan('Berhasil masuk...', true);

      setTimeout(function () {
        location.href = '../index.html';
      }, 800);
      return;
    }
  }

  tampilPesan('Email atau kata sandi salah', false);
}
