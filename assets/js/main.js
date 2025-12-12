// ========== ALBUM IMAGES ==========
const albumImages = [
    'images/album01.png', 'images/album02.png', 'images/album03.png',
    'images/album04.png', 'images/album05.png', 'images/album06.png',
    'images/album07.png', 'images/album08.png', 'images/album09.png',
    'images/album10.png', 'images/album11.png', 'images/album12.png'
];
let currentImageIndex = 0;
let touchStartX = 0;
let touchEndX = 0;

// ========== GET GUEST NAME FROM URL ==========
function getGuestNameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
        const decoded = decodeURIComponent(name);
        const guestNameEl = document.getElementById('guestName');
        if (guestNameEl) guestNameEl.textContent = decoded;

        const nameInput = document.querySelector('input[name="name"]');
        if (nameInput) nameInput.value = decoded;
    }
}
getGuestNameFromURL();

// ========== STICKY HEADER ==========
const stickyHeader = document.getElementById('stickyHeader');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 300) {
        stickyHeader.classList.add('visible');
    } else {
        stickyHeader.classList.remove('visible');
    }
    
    lastScrollY = currentScrollY;
});

// ========== HAMBURGER MENU ==========
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

function closeMobileMenu() {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = '';
}
window.closeMobileMenu = closeMobileMenu; // để dùng trong HTML onclick

// ========== BOTTOM NAVIGATION ACTIVE STATE ==========
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            bottomNavItems.forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === sectionId) {
                    item.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', updateActiveNav);

// ========== SCROLL TO TOP BUTTON ==========
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== COUNTDOWN TIMER ==========
function updateCountdown() {
    const weddingDate = new Date('2025-12-26T18:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ========== MUSIC PLAYER (GIỐNG MẪU WEB) ==========
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  const icon = btn?.querySelector(".music-icon");

  if (!audio || !btn) return;

  audio.volume = 0.8;

  function startRotate() {
    btn.classList.add("playing");          // bạn đã có CSS quay icon rồi
  }
  function stopRotate() {
    btn.classList.remove("playing");
  }

  function setUIPlaying(isOn) {
    if (icon) icon.textContent = isOn ? "🎵" : "🔇";
    isOn ? startRotate() : stopRotate();
  }

  // Toggle play/pause khi bấm nút
  btn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().then(() => {
        setUIPlaying(true);
      }).catch(() => {
        // nếu bị chặn thì thôi
      });
    } else {
      audio.pause();
      setUIPlaying(false);
    }
  });

  // Autoplay khi user lần đầu tương tác
  function tryPlay() {
    if (audio.paused) {
      audio.play().then(() => {
        setUIPlaying(true);
      }).catch(() => {/* bị chặn thì thôi */});
    }
  }

  window.addEventListener("scroll", tryPlay, { passive: true, once: true });
  document.addEventListener("click", tryPlay, { once: true });
  document.addEventListener("touchstart", tryPlay, { passive: true, once: true });
});



// ========== FADE IN ON SCROLL ==========
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});

// ========== LIGHTBOX ==========
const photoGrid = document.getElementById('photoGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCurrent = document.getElementById('lightboxCurrent');
const lightboxTotal = document.getElementById('lightboxTotal');

if (lightboxTotal) {
    lightboxTotal.textContent = albumImages.length;
}

if (photoGrid) {
    photoGrid.addEventListener('click', (e) => {
        const photoItem = e.target.closest('.photo-item');
        if (photoItem) {
            currentImageIndex = parseInt(photoItem.dataset.index);
            openLightbox();
        }
    });
}

function openLightbox() {
    lightboxImg.src = albumImages[currentImageIndex];
    lightboxCurrent.textContent = currentImageIndex + 1;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}
window.closeLightbox = closeLightbox;

function navigateLightbox(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) currentImageIndex = albumImages.length - 1;
    if (currentImageIndex >= albumImages.length) currentImageIndex = 0;
    lightboxImg.src = albumImages[currentImageIndex];
    lightboxCurrent.textContent = currentImageIndex + 1;
}
window.navigateLightbox = navigateLightbox;

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Swipe on lightbox
if (lightbox) {
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            navigateLightbox(1);
        } else {
            navigateLightbox(-1);
        }
    }
}

// ========== RSVP FORM ==========
const rsvpForm = document.getElementById('rsvpForm');
const successMessage = document.getElementById('successMessage');

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz6tRKC6IvwSuBWY9hypsM7-x0bZ1bBoWppLV4_B9MMbQvyM-fSnCl2Qe0juPgUDHf5Iw/exec';

const wishListEl = document.getElementById('wishList');

function renderWishes(wishes) {
    if (!wishListEl) return;

    if (!wishes || wishes.length === 0) {
        wishListEl.innerHTML = '<p class="text-gray-400 text-sm">Chưa có lời chúc nào, hãy là người đầu tiên nhé 🥰</p>';
        return;
    }

    wishListEl.innerHTML = '';

    wishes.forEach(function(wish) {
        const item = document.createElement('div');
        item.className = 'bg-pink-50/60 rounded-lg px-3 py-2 sm:px-4 sm:py-3';
        item.innerHTML = `
            <p class="font-semibold text-gray-800 text-sm sm:text-base">${wish.name || 'Ẩn danh'}</p>
            <p class="text-gray-700 text-sm sm:text-base mt-1 whitespace-pre-line">${wish.message || ''}</p>
        `;
        wishListEl.appendChild(item);
    });
}

function loadWishes() {
    fetch(GOOGLE_SCRIPT_URL)
        .then(function(res) { return res.json(); })
        .then(function(data) {
            renderWishes(data);
        })
        .catch(function(err) {
            console.error('Không tải được lời chúc:', err);
        });
}

// Form submit
if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
                
        const formData = new FormData(rsvpForm);
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            guestType: formData.get('guestType'),
            attendance: formData.get('attendance'),
            message: formData.get('message')
        };

        console.log('RSVP Data:', data);

        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).catch(error => {
            console.error('Error sending to Google Script:', error);
        });

        // Hiệu ứng cảm ơn
        rsvpForm.style.opacity = '0';
        rsvpForm.style.transform = 'translateY(-20px)';
                
        setTimeout(() => {
            rsvpForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(20px)';
                    
            setTimeout(() => {
                successMessage.style.transition = 'all 0.5s ease';
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateY(0)';
            }, 50);
        }, 300);

        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Load lại lời chúc sau khi gửi (delay nhẹ cho chắc chắn đã ghi sheet)
        setTimeout(loadWishes, 1500);
    });
}

// Lần đầu mở trang: tải lời chúc + refresh mỗi 1 giây
loadWishes();
setInterval(loadWishes, 1000);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// ========== INITIAL ANIMATION FOR HERO ==========
window.addEventListener('load', function() {
    document.querySelectorAll('#hero .fade-in').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 * index);
    });
});

// ========== PREVENT ZOOM ON INPUT FOCUS (iOS) ==========
document.querySelectorAll('input, textarea, select').forEach(el => {
    el.addEventListener('focus', () => {
        document.querySelector('meta[name="viewport"]').setAttribute(
            'content', 
            'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
    });
    el.addEventListener('blur', () => {
        document.querySelector('meta[name="viewport"]').setAttribute(
            'content', 
            'width=device-width, initial-scale=1.0'
        );
    });
});

// ========== ORIENTATION CHANGE HANDLER ==========
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        window.scrollBy(0, 1);
    }, 100);
});

// ========== HEART FALL EFFECT ==========
document.addEventListener("DOMContentLoaded", function () {
    function createHeart() {
        const heart = document.createElement("div");
        heart.innerHTML = "💗";
        heart.classList.add("heart");

        const size = Math.random() * 8 + 4;
        heart.style.fontSize = size + "px";
        heart.style.left = Math.random() * 100 + "vw";

        const duration = Math.random() * 5 + 10;
        heart.style.animationDuration = duration + "s";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }

    setInterval(createHeart, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  const hint  = document.getElementById("musicHint");
  const audio = document.getElementById("bgMusic");

  if (!hint) return;

  // Ẩn hẳn sau 2s (đúng animation)
  setTimeout(() => {
    hint.style.display = "none";
  }, 4000);

  // Nếu nhạc bắt đầu phát → ẩn ngay
  audio?.addEventListener("play", () => {
    hint.style.display = "none";
  });
});

