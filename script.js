// ŞİFRE KONTROLÜ
let girilenSifre = prompt("Lütfen giriş şifresini yazınız:");
if (girilenSifre !== "temcidpilavı") { 
    alert("Hatalı şifre!");
    document.body.innerHTML = "<div style='background-color:#1a1a2e; height:100vh; color:white; display:flex; justify-content:center; align-items:center;'><h1>Yetkisiz Erişim!</h1></div>";
    throw new Error("Sifre yanlis");
}

let oyunDevamEdiyor = false;
let atlananSekerSayisi = 0;
let mevcutSeker = 1;

const karakter = document.getElementById('karakter');
const seker = document.getElementById('seker');
const baslaEkrani = document.getElementById('basla-ekrani');
const finalEkrani = document.getElementById('final-ekrani');
const oyunAlani = document.getElementById('oyun-alani');
const skorTablosu = document.getElementById('skor-tablosu');
const ses = document.getElementById('ziplama-sesi');

function zipla() {
    if (!oyunDevamEdiyor) return;
    if (karakter.classList.contains('ziplama-animasyonu')) return;
    if (ses) { ses.currentTime = 0; ses.play(); }
    karakter.classList.add('ziplama-animasyonu');
    setTimeout(() => { karakter.classList.remove('ziplama-animasyonu'); }, 900);
}

// MOBİL VE PC KONTROLLERİ
oyunAlani.addEventListener('touchstart', (e) => {
    if (oyunDevamEdiyor) {
        e.preventDefault();
        zipla();
    }
}, { passive: false });

oyunAlani.addEventListener('mousedown', () => {
    if (oyunDevamEdiyor) zipla();
});

function oyunuBaslat(event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation(); // Diğer katmanlara geçmesini engeller
    }
    
    atlananSekerSayisi = 0;
    mevcutSeker = 1;
    skorTablosu.innerText = "Atlanan Şeker: 0/3";
    seker.style.backgroundImage = "url('seker1.png')";
    oyunDevamEdiyor = true;
    
    baslaEkrani.classList.add('gizli');
    finalEkrani.classList.add('gizli');
    seker.classList.add('seker-animasyonu');
}

seker.addEventListener('animationiteration', () => {
    if (oyunDevamEdiyor) {
        atlananSekerSayisi++;
        skorTablosu.innerText = "Atlanan Şeker: " + atlananSekerSayisi + "/3";
        if (atlananSekerSayisi >= 3) {
            oyunDevamEdiyor = false;
            seker.classList.remove('seker-animasyonu');
            finalEkrani.classList.remove('gizli');
            konfetiPatlat();
        } else {
            mevcutSeker++;
            seker.style.backgroundImage = "url('seker" + mevcutSeker + ".png')";
        }
    }
});

let carpismaInterval = setInterval(() => {
    if (!oyunDevamEdiyor) return;
    let karKutu = karakter.getBoundingClientRect();
    let sekKutu = seker.getBoundingClientRect();
    if (karKutu.right > sekKutu.left + 100 && karKutu.left < sekKutu.right - 100 && karKutu.bottom > sekKutu.top + 60) {
        oyunDevamEdiyor = false;
        seker.classList.remove('seker-animasyonu');
        alert("Eyvah! Bayram şekeri çarptı.");
        baslaEkrani.classList.remove('gizli');
    }
}, 10);

function konfetiPatlat() {
    const konfetiAlani = document.getElementById('konfeti-alani');
    konfetiAlani.innerHTML = '';
    const renkler = ['#ff69b4', '#ffeb3b', '#00bcd4', '#4caf50', '#ff5722', '#9c27b0', '#ffffff'];
    for (let i = 0; i < 80; i++) {
        let konfeti = document.createElement('div');
        konfeti.classList.add('konfeti-parcasi');
        konfeti.style.left = Math.random() * 100 + 'vw';
        konfeti.style.backgroundColor = renkler[Math.floor(Math.random() * renkler.length)];
        konfeti.style.animation = `dusme ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s forwards`;
        konfetiAlani.appendChild(konfeti);
    }
}

function oyundanCik(event) {
    if (event) event.preventDefault();
    document.body.innerHTML = "<div style='background-color:#1a1a2e; height:100vh; color:white; display:flex; flex-direction:column; justify-content:center; align-items:center; font-family:\"Press Start 2P\", cursive; text-align:center;'><h2>İyi Bayramlar!</h2><p>Sekmeyi kapatabilirsin.</p></div>";
}