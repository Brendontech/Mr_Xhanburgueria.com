let cartTotal = 0;
let cartItems = [];

window.onload = function() {
    if(localStorage.getItem('cartItems')) {
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
        cartTotal = parseFloat(localStorage.getItem('cartTotal'));
        updateCartDisplay();
        updateTotalDisplay();
    } else {
        updateTotalDisplay(); // Exibir o valor total inicialmente como 0
    }
}

function addToCart(item, price) {
    if (cartItems.length === 0) {
        cartTotal = 0; // Resetar o valor total para 0 se não houver itens no carrinho
    }
    cartItems.push({ item, price, quantity: 1 });
    console.log("Item adicionado ao carrinho:", item, price);
    updateCartDisplay();
    cartTotal += price; // Adiciona apenas o preço do item ao carrinho
    console.log("Total do carrinho após adicionar:", cartTotal);
    updateTotalDisplay();
    saveCartToLocalStorage();
}

function removeFromCart(index) {
    const removedItem = cartItems.splice(index, 1)[0];
    console.log("Item removido do carrinho:", removedItem.item, removedItem.price);
    updateCartDisplay();
    cartTotal -= removedItem.price * removedItem.quantity; // Corrigido: Subtrai o preço do item multiplicado pela quantidade
    console.log("Total do carrinho após remover:", cartTotal);
    updateTotalDisplay();
    saveCartToLocalStorage();
}

function increaseQuantity(index) {
    cartItems[index].quantity++;
    console.log("Quantidade do item aumentada:", cartItems[index].item);
    updateCartDisplay();
    cartTotal += cartItems[index].price; // Adiciona apenas o preço do item ao carrinho
    console.log("Total do carrinho após aumentar a quantidade:", cartTotal);
    updateTotalDisplay();
    saveCartToLocalStorage();
}

function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        console.log("Quantidade do item diminuída:", cartItems[index].item);
        updateCartDisplay();
        cartTotal -= cartItems[index].price; // Subtrai apenas o preço do item do carrinho
        console.log("Total do carrinho após diminuir a quantidade:", cartTotal);
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
    document.getElementById('total').textContent = 'Total: R$ ' + Math.max(cartTotal, 0).toFixed(2);
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', cartTotal.toFixed(2));
}

