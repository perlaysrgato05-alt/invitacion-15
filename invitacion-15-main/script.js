const FECHA_EVENTO = "August 22, 2026 17:00:00"; 
const TELEFONO_WHATSAPP = "573126346291"; 

function actualizarCuentaRegresiva() {
    const meta = new Date(FECHA_EVENTO).getTime();
    const ahora = new Date().getTime();
    const diferencia = meta - ahora;

    if (diferencia <= 0) return;

    const d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const h = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diferencia % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(d).padStart(2, '0');
    document.getElementById('hours').innerText = String(h).padStart(2, '0');
    document.getElementById('minutes').innerText = String(m).padStart(2, '0');
    document.getElementById('seconds').innerText = String(s).padStart(2, '0');
}

setInterval(actualizarCuentaRegresiva, 1000);
actualizarCuentaRegresiva();

const audio = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');

if (musicBtn && audio) {
    musicBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => console.log("Reproducción bloqueada"));
            musicIcon.className = "fa-solid fa-pause";
        } else {
            audio.pause();
            musicIcon.className = "fa-solid fa-play";
        }
    });
}

const modal = document.getElementById('confirm-modal');

function toggleModal(show) {
    if (!modal) return;
    if (show) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

const form = document.getElementById('rsvp-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nombre = document.getElementById('guest-name').value.trim();
        const estado = document.getElementById('attendance-status').value;
        const mensaje = document.getElementById('guest-message').value.trim();

        let texto = `✨ *CONFIRMACIÓN XV AÑOS — MARÍA ISABEL* ✨\n\n`;
        texto += `*Nombre:* ${nombre}\n`;
        texto += `*Asistencia:* ${estado}\n`;
        if (mensaje) texto += `*Mensaje:* "${mensaje}"\n`;

        const url = `https://api.whatsapp.com/send?phone=${TELEFONO_WHATSAPP}&text=${encodeURIComponent(texto)}`;
        window.open(url, '_blank');
        toggleModal(false);
        form.reset();
    });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
    if (lightbox && lightboxImg) {
        lightboxImg.src = src;
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    if (lightbox) {
        lightbox.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

window.toggleModal = toggleModal;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;