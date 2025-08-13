function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }
  
  function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  function addToCart(name, price) {
    const cart = getCart();
    cart.push({ name, price });
    saveCart(cart);
    alert(`${name} added to cart!`);
  }
  
  if (document.getElementById("cart-items")) {
    const cart = getCart();
    const list = document.getElementById("cart-items");
    let total = 0;
  
    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ₹${item.price}`;
      list.appendChild(li);
      total += item.price;
    });
  
    document.getElementById("total").textContent = `Total: ₹${total}`;
  }
  
  function submitCheckout(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
  
    const data = {
      name,
      address,
      phone,
      cart: getCart(),
    };
  
    localStorage.setItem("invoice", JSON.stringify(data));
    localStorage.removeItem("cart");
    window.location.href = "invoice.html";
  }
  
  if (window.location.pathname.includes("invoice.html")) {
    const data = JSON.parse(localStorage.getItem("invoice") || "{}");
  
    document.getElementById("inv-name").textContent = data.name || "";
    document.getElementById("inv-address").textContent = data.address || "";
    document.getElementById("inv-phone").textContent = data.phone || "";
  
    const list = document.getElementById("inv-items");
    let total = 0;
  
    (data.cart || []).forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name} - ₹${item.price}`;
      list.appendChild(li);
      total += item.price;
    });
  
    document.getElementById("inv-total").textContent = `₹${total}`;
  }
  