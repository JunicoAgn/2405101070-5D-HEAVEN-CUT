// ===================================
// JAM REALTIME KINGS CUT
// ===================================

document.addEventListener("DOMContentLoaded", function () {

    // Membuat elemen jam otomatis
    const clock = document.createElement("div");
    clock.className = "realtime-clock";

    clock.innerHTML = `
        <div class="clock-icon">◷</div>
        <div class="clock-info">
            <div id="jam">00:00:00</div>
            <div id="tanggal">Memuat tanggal...</div>
        </div>
    `;

    document.body.appendChild(clock);

    // Membuat tampilan jam
    const style = document.createElement("style");

    style.textContent = `
        .realtime-clock {
            position: fixed;
            bottom: 22px;
            right: 22px;
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 18px;
            background: #171717;
            border: 1px solid #b99a62;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            color: #fff;
        }

        .clock-icon {
            font-size: 30px;
            color: #b99a62;
        }

        #jam {
            font-family: 'Bebas Neue', sans-serif;
            font-size: 25px;
            letter-spacing: 2px;
            color: #b99a62;
        }

        #tanggal {
            font-family: 'Inter', sans-serif;
            font-size: 10px;
            color: #ccc;
        }

        @media (max-width: 600px) {
            .realtime-clock {
                bottom: 12px;
                right: 12px;
                padding: 9px 13px;
            }

            #jam {
                font-size: 21px;
            }
        }
    `;

    document.head.appendChild(style);

    // Memperbarui jam
    function updateJam() {
        const sekarang = new Date();

        document.getElementById("jam").textContent =
            sekarang.toLocaleTimeString("id-ID", {
                timeZone: "Asia/Jakarta",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            });

        document.getElementById("tanggal").textContent =
            sekarang.toLocaleDateString("id-ID", {
                timeZone: "Asia/Jakarta",
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });
    }

    updateJam();
    setInterval(updateJam, 1000);

});