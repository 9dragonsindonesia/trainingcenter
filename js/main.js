// Data Training dengan gambar yang relevan
const trainings = [
  { id: 1, name: "Welder 3G (SMAW)", category: "welding", price: 3500000, duration: "5 Hari", cert: "BNSP", slug: "welder-3g-smaw", image: "https://images.unsplash.com/photo-1605256801695-5551e77183d9?w=500&h=300&fit=crop" },
  { id: 2, name: "Welder 4G (SMAW)", category: "welding", price: 3800000, duration: "5 Hari", cert: "BNSP", slug: "welder-4g-smaw", image: "https://images.unsplash.com/photo-1731397979866-e6ed085d434b?w=500&h=300&fit=crop" },
  { id: 3, name: "Welder 6G (SMAW/GTAW)", category: "welding", price: 5500000, duration: "7 Hari", cert: "BNSP + Internasional", slug: "welder-6g-smaw-gtaw", image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&h=300&fit=crop" },
  { id: 4, name: "Welding Inspector (CSWIP)", category: "welding", price: 12500000, duration: "10 Hari", cert: "CSWIP", slug: "welding-inspector-cswip", image: "https://images.unsplash.com/photo-1774680395523-15ecad3a78ae?w=500&h=300&fit=crop" },
  { id: 5, name: "BOSIET (OPITO)", category: "offshore", price: 8500000, duration: "3 Hari", cert: "OPITO", slug: "bosit-opito", image: "https://images.unsplash.com/photo-1774681075003-6a350330ff30?w=500&h=300&fit=crop" },
  { id: 6, name: "FOET (OPITO)", category: "offshore", price: 6500000, duration: "2 Hari", cert: "OPITO", slug: "foet-opito", image: "https://images.unsplash.com/photo-1632914146475-bfe6fa6b2a12?w=500&h=300&fit=crop" },
  { id: 7, name: "H2S & BA", category: "offshore", price: 3200000, duration: "1 Hari", cert: "Internasional", slug: "h2s-ba", image: "https://images.unsplash.com/photo-1582139323114-bfc5c7b2a2a1?w=500&h=300&fit=crop" },
  { id: 8, name: "Project Management Professional", category: "management", price: 7500000, duration: "5 Hari", cert: "PMP Based", slug: "project-management-pmp", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop" },
  { id: 9, name: "Autocad 2D & 3D", category: "engineering", price: 2800000, duration: "4 Hari", cert: "Sertifikat", slug: "autocad-2d-3d", image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=500&h=300&fit=crop" },
  { id: 10, name: "Pipe Fitter", category: "engineering", price: 4200000, duration: "6 Hari", cert: "BNSP", slug: "pipe-fitter", image: "https://images.unsplash.com/photo-1582441814869-a262426017f9?w=500&h=300&fit=crop" },
  { id: 11, name: "Crane Operator", category: "heavy", price: 4800000, duration: "5 Hari", cert: "Kemenaker", slug: "crane-operator", image: "https://images.unsplash.com/photo-1772338542560-7c8423fd21e5?w=500&h=300&fit=crop" },
  { id: 12, name: "Forklift Operator", category: "heavy", price: 3500000, duration: "4 Hari", cert: "Kemenaker", slug: "forklift-operator", image: "https://images.unsplash.com/photo-1687203920859-c87cb0955630?w=500&h=300&fit=crop" },
  { id: 13, name: "Scaffolding Erector", category: "engineering", price: 3900000, duration: "4 Hari", cert: "BNSP", slug: "scaffolding-erector", image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=500&h=300&fit=crop" },
  { id: 14, name: "Rigging & Slinging", category: "heavy", price: 3200000, duration: "3 Hari", cert: "BNSP", slug: "rigging-slinging", image: "https://images.unsplash.com/photo-1574781339824-9b0b2b2b5b5b?w=500&h=300&fit=crop" },
  { id: 15, name: "Safety Officer (AK3 Umum)", category: "management", price: 5500000, duration: "8 Hari", cert: "Kemnaker", slug: "safety-officer-ak3", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=300&fit=crop" },
  { id: 16, name: "NDT Level II (UT/MT/PT)", category: "engineering", price: 9800000, duration: "10 Hari", cert: "ASNT", slug: "ndt-level-ii", image: "https://images.unsplash.com/photo-1581092335871-5c5f4e2b5a2b?w=500&h=300&fit=crop" },
  { id: 17, name: "Offshore Medic", category: "offshore", price: 7200000, duration: "5 Hari", cert: "Internasional", slug: "offshore-medic", image: "https://images.unsplash.com/photo-1579684385127-1ef15d5084bc?w=500&h=300&fit=crop" },
  { id: 18, name: "Heavy Equipment Mechanic", category: "heavy", price: 5800000, duration: "8 Hari", cert: "BNSP", slug: "heavy-equipment-mechanic", image: "https://images.unsplash.com/photo-1574781339824-9b0b2b2b5b5b?w=500&h=300&fit=crop" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render Training Cards
function renderTrainings() {
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';
  const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
  
  let filtered = trainings.filter(t => {
    if (activeFilter !== 'all' && t.category !== activeFilter) return false;
    if (searchTerm && !t.name.toLowerCase().includes(searchTerm)) return false;
    return true;
  });
  
  const grid = document.getElementById('trainingGrid');
  if (!grid) return;
  
  grid.innerHTML = filtered.map(t => `
    <div class="bg-white rounded-2xl overflow-hidden shadow-md card-hover cursor-pointer" onclick="location.href='training/${t.slug}.html'">
      <img src="${t.image}" alt="${t.name}" class="w-full h-48 object-cover">
      <div class="p-5">
        <div class="text-xs font-semibold text-[#854836] uppercase tracking-wide">${t.category.toUpperCase()} | ${t.cert}</div>
        <h3 class="text-xl font-bold mt-1 mb-2">${t.name}</h3>
        <div class="flex items-center gap-2 text-gray-500 text-sm mb-3"><i class="far fa-calendar-alt"></i> ${t.duration}</div>
        <div class="text-2xl font-bold text-[#FFB22C] mb-4">Rp ${t.price.toLocaleString()}</div>
        <button class="add-to-cart w-full bg-black text-white font-semibold py-2 rounded-full hover:bg-[#FFB22C] hover:text-black transition" data-id="${t.id}" data-name="${t.name}" data-price="${t.price}">+ Tambah ke Keranjang</button>
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
  const name = this.dataset.name;
  const price = parseInt(this.dataset.price);
  addToCart(id, name, price);
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
    cartDiv.innerHTML = '<p class="text-center text-gray-500">Keranjang kosong</p>';
    document.getElementById('cartTotal').innerHTML = '';
    return;
  }
  
  cartDiv.innerHTML = cart.map(item => `
    <div class="flex justify-between items-center py-3 border-b border-gray-100">
      <div><strong class="text-gray-800">${item.name}</strong><br><span class="text-sm text-gray-500">Rp ${item.price.toLocaleString()} x ${item.quantity}</span></div>
      <div class="flex items-center gap-2">
        <button class="qty-btn bg-gray-200 w-7 h-7 rounded-full hover:bg-gray-300" data-id="${item.id}" data-change="-1">-</button>
        <span class="w-6 text-center">${item.quantity}</span>
        <button class="qty-btn bg-gray-200 w-7 h-7 rounded-full hover:bg-gray-300" data-id="${item.id}" data-change="1">+</button>
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
  toast.className = 'fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-[#854836] text-white px-6 py-3 rounded-full shadow-lg z-50 font-medium';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Filter Event
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTrainings();
    });
  });
  // Set default active
  if (document.querySelector('.filter-btn')) {
    document.querySelector('.filter-btn').classList.add('active');
  }
  
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
      cartModal.classList.add('show');
    });
  }
  
  if (closeCart) {
    closeCart.addEventListener('click', () => cartModal.classList.remove('show'));
  }
  
  window.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.classList.remove('show');
  });
  
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        alert('Keranjang masih kosong');
        return;
      }
      let msg = "Halo Training Center,\n\nSaya ingin mendaftar program berikut:\n\n";
      cart.forEach(item => {
        msg += `${item.name} - ${item.quantity} x Rp ${item.price.toLocaleString()}\n`;
      });
      const total = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
      msg += `\n*Total: Rp ${total.toLocaleString()}*\n\nTolong informasikan jadwal dan prosedur pembayaran.`;
      window.open(`https://wa.me/6285260839456?text=${encodeURIComponent(msg)}`, '_blank');
      cartModal.classList.remove('show');
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
