// Data Training (untuk halaman utama)
const trainings = [
  { id: 1, name: "Welder 3G (SMAW)", category: "welding", price: 3500000, duration: "5 Hari", cert: "BNSP", slug: "welder-3g-smaw" },
  { id: 2, name: "Welder 4G (SMAW)", category: "welding", price: 3800000, duration: "5 Hari", cert: "BNSP", slug: "welder-4g-smaw" },
  { id: 3, name: "Welder 6G (SMAW/GTAW)", category: "welding", price: 5500000, duration: "7 Hari", cert: "BNSP + Internasional", slug: "welder-6g-smaw-gtaw" },
  { id: 4, name: "Welding Inspector (CSWIP)", category: "welding", price: 12500000, duration: "10 Hari", cert: "CSWIP", slug: "welding-inspector-cswip" },
  { id: 5, name: "BOSIET (OPITO)", category: "offshore", price: 8500000, duration: "3 Hari", cert: "OPITO", slug: "bosit-opito" },
  { id: 6, name: "FOET (OPITO)", category: "offshore", price: 6500000, duration: "2 Hari", cert: "OPITO", slug: "foet-opito" },
  { id: 7, name: "H2S & BA", category: "offshore", price: 3200000, duration: "1 Hari", cert: "Internasional", slug: "h2s-ba" },
  { id: 8, name: "Project Management Professional", category: "management", price: 7500000, duration: "5 Hari", cert: "PMP Based", slug: "project-management-pmp" },
  { id: 9, name: "Autocad 2D & 3D", category: "engineering", price: 2800000, duration: "4 Hari", cert: "Sertifikat", slug: "autocad-2d-3d" },
  { id: 10, name: "Pipe Fitter", category: "engineering", price: 4200000, duration: "6 Hari", cert: "BNSP", slug: "pipe-fitter" },
  { id: 11, name: "Crane Operator", category: "heavy", price: 4800000, duration: "5 Hari", cert: "Kemenaker", slug: "crane-operator" },
  { id: 12, name: "Forklift Operator", category: "heavy", price: 3500000, duration: "4 Hari", cert: "Kemenaker", slug: "forklift-operator" },
  { id: 13, name: "Scaffolding Erector", category: "engineering", price: 3900000, duration: "4 Hari", cert: "BNSP", slug: "scaffolding-erector" },
  { id: 14, name: "Rigging & Slinging", category: "heavy", price: 3200000, duration: "3 Hari", cert: "BNSP", slug: "rigging-slinging" },
  { id: 15, name: "Safety Officer (AK3 Umum)", category: "management", price: 5500000, duration: "8 Hari", cert: "Kemnaker", slug: "safety-officer-ak3" },
  { id: 16, name: "NDT Level II (UT/MT/PT)", category: "engineering", price: 9800000, duration: "10 Hari", cert: "ASNT", slug: "ndt-level-ii" },
  { id: 17, name: "Offshore Medic", category: "offshore", price: 7200000, duration: "5 Hari", cert: "Internasional", slug: "offshore-medic" },
  { id: 18, name: "Heavy Equipment Mechanic", category: "heavy", price: 5800000, duration: "8 Hari", cert: "BNSP", slug: "heavy-equipment-mechanic" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize AOS
AOS.init({ once: true, duration: 800 });

// Render Training Cards
function renderTrainings() {
  const currentFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
  
  let filtered = trainings.filter(t => {
    if (currentFilter !== 'all' && t.category !== currentFilter) return false;
    if (searchTerm && !t.name.toLowerCase().includes(searchTerm)) return false;
    return true;
  });
  
  const grid = document.getElementById('trainingGrid');
  if (!grid) return;
  
  grid.innerHTML = filtered.map(t => `
    <div class="training-card" onclick="location.href='training/${t.slug}.html'">
      <div class="card-body">
        <div class="card-category">${t.category.toUpperCase()} | ${t.cert}</div>
        <h3>${t.name}</h3>
        <div class="card-duration"><i class="far fa-calendar-alt"></i> ${t.duration}</div>
        <div class="card-price">Rp ${t.price.toLocaleString()}</div>
        <button class="add-to-cart" data-id="${t.id}" onclick="event.stopPropagation(); addToCart(${t.id}, '${t.name}', ${t.price})">+ Tambah ke Keranjang</button>
      </div>
    </div>
  `).join('');
  
  attachCartButtons();
}

function attachCartButtons() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.removeEventListener('click', handleCartClick);
    btn.addEventListener('click', handleCartClick);
  });
}

function handleCartClick(e) {
  e.stopPropagation();
  const id = parseInt(this.dataset.id);
  const training = trainings.find(t => t.id === id);
  if (training) {
    addToCart(training.id, training.name, training.price);
  }
}

function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }
  updateCartUI();
  showToast(`${name} ditambahkan ke keranjang`);
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElem = document.getElementById('cartCount');
  if (cartCountElem) cartCountElem.innerText = count;
  renderCartModal();
}

function renderCartModal() {
  const cartDiv = document.getElementById('cartItems');
  if (!cartDiv) return;
  
  if (cart.length === 0) {
    cartDiv.innerHTML = '<p style="text-align:center;">Keranjang kosong</p>';
    document.getElementById('cartTotal').innerHTML = '';
    return;
  }
  
  cartDiv.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div><strong>${item.name}</strong><br>Rp ${item.price.toLocaleString()} x ${item.quantity}</div>
      <div>
        <button class="qty-btn" data-id="${item.id}" data-change="-1">-</button>
        <span style="margin:0 12px;">${item.quantity}</span>
        <button class="qty-btn" data-id="${item.id}" data-change="1">+</button>
      </div>
    </div>
  `).join('');
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  document.getElementById('cartTotal').innerHTML = `Total: Rp ${total.toLocaleString()}`;
  
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      const change = parseInt(btn.dataset.change);
      const item = cart.find(i => i.id === id);
      if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
          cart = cart.filter(i => i.id !== id);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
      }
    });
  });
}

function showToast(msg) {
  let toast = document.createElement('div');
  toast.innerText = msg;
  toast.style.cssText = `
    position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
    background: #854836; color: white; padding: 12px 24px;
    border-radius: 40px; z-index: 3000; font-weight: 500;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Filter Event Listeners
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTrainings();
    });
  });
  
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => renderTrainings());
  }
}

// Cart Modal
function initCartModal() {
  const cartIcon = document.getElementById('cartIcon');
  const cartModal = document.getElementById('cartModal');
  const closeCart = document.getElementById('closeCart');
  const checkoutBtn = document.getElementById('checkoutWA');
  
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      renderCartModal();
      cartModal.style.display = 'flex';
    });
  }
  
  if (closeCart) {
    closeCart.addEventListener('click', () => cartModal.style.display = 'none');
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.style.display = 'none';
  });
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Keranjang masih kosong');
        return;
      }
      let msg = "Halo Training Center,%0A%0ASaya ingin mendaftar program berikut:%0A%0A";
      cart.forEach(item => {
        msg += `📌 ${item.name} - ${item.quantity} x Rp ${item.price.toLocaleString()}%0A`;
      });
      const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      msg += `%0A*Total: Rp ${total.toLocaleString()}*%0A%0ATolong informasikan jadwal dan prosedur pembayaran.`;
      window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
      cartModal.style.display = 'none';
    });
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderTrainings();
  initFilters();
  initCartModal();
  updateCartUI();
});
