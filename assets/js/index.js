onclick(enviar), {
    alert: "enviar"
}
let cartTotal = 0;

function addToCart(item, price) {
    // Adiciona o item ao carrinho
    const cartItems = document.getElementById('cartItems');
    const newItem = document.createElement('li');
    newItem.textContent = item + ' (R$ ' + price.toFixed(2) + ')';
    cartItems.appendChild(newItem);

    // Atualiza o total do carrinho
    cartTotal += price;
    document.getElementById('total').textContent = 'Total: R$ ' + cartTotal.toFixed(2);
}
