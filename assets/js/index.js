let cartTotal = 0;
let cartItems = [];

window.onload = function() {
    if(localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        cartTotal = parseFloat(localStorage.getItem('cartTotal'));
        updateCartDisplay();
        updateTotalDisplay();
    } else {
        updateTotalDisplay();
    }
}

function addToCart(item, price) {
    if (cartItems.length === 0) {
        cartTotal = 0;
    }
    cartItems.push({ item, price, quantity: 1 });
    updateCartDisplay();
    cartTotal += price;
    updateTotalDisplay();
    saveCartToLocalStorage();
}

function removeFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    updateCartDisplay();
    cartTotal -= removedItem.price * removedItem.quantity;
    updateTotalDisplay();
    saveCartToLocalStorage();
}

function increaseQuantity(index) {
    cartItems[index].quantity++;
    updateCartDisplay();
    cartTotal += cartItems[index].price;
    updateTotalDisplay();
    saveCartToLocalStorage();
}

function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        updateCartDisplay();
        cartTotal -= cartItems[index].price;
        updateTotalDisplay();
        saveCartToLocalStorage();
    }
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById('cartItems');
    cartItemsElement.innerHTML = '';

    cartItems.forEach((item, index) => {
        const newItem = document.createElement('li');
        newItem.textContent = item.item + ' (R$ ' + item.price.toFixed(2) + ') - Quantidade: ' + item.quantity;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => removeFromCart(index));
        newItem.appendChild(deleteButton);

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => increaseQuantity(index));
        newItem.appendChild(increaseButton);

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => decreaseQuantity(index));
        newItem.appendChild(decreaseButton);

        cartItemsElement.appendChild(newItem);
    });
}

function updateTotalDisplay() {
    document.getElementById('total').textContent = ' R$ ' + Math.max(cartTotal, 0).toFixed(2);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal.toFixed(2));
}

function toggleSelection(itemId, item, price) {
    var itemElement = document.getElementById(itemId);
    if (itemElement.classList.contains('selected')) {
        itemElement.classList.remove('selected');
        removeFromCartByItem(item); // Remove o item do carrinho
    } else {
        itemElement.classList.add('selected');
        addToCart(item, price); // Adiciona o item ao carrinho
    }
}

function removeFromCartByItem(item) {
    const index = cartItems.findIndex(cartItem => cartItem.item === item);
    if (index !== -1) {
        const removedItem = cartItems.splice(index, 1)[0];
        cartTotal -= removedItem.price * removedItem.quantity;
        updateCartDisplay();
        updateTotalDisplay();
        saveCartToLocalStorage();
        console.log
    }
    
}
