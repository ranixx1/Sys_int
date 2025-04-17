const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const cartCounter = document.getElementById("cart-count");
const addressInput = document.getElementById("address");
const addressWarn = document.getElementById("address-warn");
const productModal = document.getElementById('productModal');

// Variáveis globais
let cart = [];
let selectedColor = '';
let selectedSize = '';
let quantity = 1;

// Funções de Modal
function openModal(modal) {
    modal.classList.remove('hidden');
    modal.classList.add('animate-fade-in');
    modal.classList.remove('animate-fade-out');
}

function closeModal(modal) {
    modal.classList.add('animate-fade-out');
    modal.classList.remove('animate-fade-in');
    setTimeout(() => modal.classList.add('hidden'), 200);
}

function closeAllModals() {
    closeModal(cartModal);
    closeModal(productModal);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#productModal .close').addEventListener('click', closeAllModals);
    document.getElementById('close-modal').addEventListener('click', closeAllModals);
    
    document.addEventListener('click', (e) => {
        if (e.target === cartModal || e.target === productModal) closeAllModals();
    });
});

// Controle de Quantidade
document.getElementById('increment')?.addEventListener('click', () => {
    quantity = Math.min(quantity + 1, 10);
    document.getElementById('quantity').value = quantity;
});

document.getElementById('decrement')?.addEventListener('click', () => {
    quantity = Math.max(quantity - 1, 1);
    document.getElementById('quantity').value = quantity;
});

document.getElementById('quantity')?.addEventListener('change', (e) => {
    quantity = Math.min(Math.max(parseInt(e.target.value) || 1, 1), 10);
    e.target.value = quantity;
});

// Seleção de Tamanho e Cor
document.querySelectorAll('.size-option').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.size-option').forEach(btn => {
            btn.classList.remove('bg-emerald-600', 'text-white', 'border-emerald-700');
        });
        this.classList.add('bg-emerald-600', 'text-white', 'border-emerald-700');
        selectedSize = this.textContent;
    });
});

document.querySelectorAll('.color-option').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.classList.remove('selected', 'ring-2', 'ring-emerald-600', 'scale-110');
        });
        this.classList.add('selected', 'ring-2', 'ring-emerald-600', 'scale-110');
        selectedColor = this.dataset.color;
    });
});

// Abrir Modais
cartBtn.addEventListener("click", () => {
    openModal(cartModal);
    updateCartModal();
});

document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', (e) => {
        // Resetar seleções anteriores
        selectedColor = '';
        selectedSize = '';
        quantity = 1;
        document.querySelectorAll('.size-option, .color-option').forEach(btn => {
            btn.classList.remove(
                'bg-emerald-600', 
                'text-white', 
                'border-emerald-700',
                'selected',
                'ring-2',
                'ring-emerald-600',
                'scale-110'
            );
        });
        document.getElementById('quantity').value = 1;

        // Carregar dados do produto
        const img = product.querySelector('img').src;
        const title = product.querySelector('p.font-bold').textContent;
        const price = parseFloat(product.querySelector('p.font-bold.text-lg').textContent.replace('R$ ', ''));
        const description = product.querySelector('p.text-sm').textContent;

        document.getElementById('modalImage').src = img;
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalPrice').textContent = `R$ ${price.toFixed(2)}`;
        document.getElementById('modalDescription').textContent = description;

        openModal(productModal);
    });
});

// Carrinho
document.querySelector('.add-to-cart-modal').addEventListener('click', () => {
    if (!selectedSize || !selectedColor) {
        showToast('Selecione o tamanho e a cor!');
        return;
    }

    const title = document.getElementById('modalTitle').textContent;
    const price = parseFloat(document.getElementById('modalPrice').textContent.replace('R$ ', ''));
    const quantity = parseInt(document.getElementById('quantity').value);

    addToCart({
        name: `${title} - Cor: ${selectedColor} - Tamanho: ${selectedSize}`,
        price: price,
        quantity: quantity,
        color: selectedColor,
        size: selectedSize
    });

    closeAllModals();
});

function addToCart(newItem) {
    const existingItem = cart.find(item => 
        item.name === newItem.name &&
        item.color === newItem.color &&
        item.size === newItem.size
    );

    if (existingItem) {
        existingItem.quantity += newItem.quantity;
    } else {
        cart.push(newItem);
    }
    updateCartModal();
}

function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex justify-between items-center mb-4 gap-4 p-3 bg-white rounded-lg shadow-sm';
        itemElement.innerHTML = `
            <div class="flex items-center gap-4 flex-1">
                <div class="${getColorClass(item.color)} w-6 h-6 rounded-full border-2"></div>
                <div>
                    <p class="font-medium">${item.name.split(' - ')[0]}</p>
                    <div class="text-sm text-gray-600">
                        <p>Tamanho: ${item.size}</p>
                        <p>Cor: ${item.color}</p>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <p class="font-medium">${item.quantity}x</p>
                <p class="text-emerald-600 font-medium">R$ ${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-from-cart-btn mt-2 text-red-500 hover:text-red-700 text-sm" 
                        data-name="${item.name}">
                    Remover
                </button>
            </div>
        `;

        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
        totalItems += item.quantity;
    });

    cartTotal.textContent = total.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL' 
    });
    cartCounter.textContent = totalItems;
}

// Funções Auxiliares
function getColorClass(color) {
    const colorMap = {
        'Branco': 'bg-white border-gray-300',
        'Preto': 'bg-black border-black',
        'Vermelho': 'bg-red-600 border-red-700',
        'Azul': 'bg-blue-600 border-blue-700'
    };
    return colorMap[color] || 'bg-gray-200 border-gray-300';
}

cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-from-cart-btn')) {
        const itemName = e.target.dataset.name;
        cart = cart.filter(item => item.name !== itemName);
        updateCartModal();
    }
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        showToast('Seu carrinho está vazio!');
        return;
    }

    if (!addressInput.value.trim()) {
        addressWarn.classList.remove('hidden');
        addressInput.classList.add('border-red-500');
        return;
    }

    const message = cart.map(item => 
        `${item.name} - ${item.quantity}x | R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const phone = "5584996535977"; // Número de telefone do WhatsApp
    const encodedMessage = encodeURIComponent(`${message}\n\nEndereço: ${addressInput.value}`);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');

    cart = [];
    addressInput.value = '';
    updateCartModal();
    closeAllModals();
});

function showToast(text) {
    Toastify({
        text: text,
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { 
            background: "#ef4444",
            borderRadius: "8px",
            fontWeight: "500"
        }
    }).showToast();
}