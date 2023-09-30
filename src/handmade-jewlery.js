document.addEventListener('DOMContentLoaded', () => {
  const totalQuantityDiv = document.querySelector('.total-quantity') ;
  
  let quantities = {} ;
  let main = document.querySelector('.main') ;
  let productHTML = '' ;
  let totalQuantityGeneral = JSON.parse(localStorage.getItem('total-quantity')) ;
  let cartQuantityGeneral = JSON.parse(localStorage.getItem('cart-quantity')) ;

  totalQuantityDiv.innerHTML = totalQuantityGeneral ;
  
  const cartQuantityGeneralName = Object.keys(cartQuantityGeneral) ;
  cartQuantityGeneralName.forEach((name, index) => {
    const numberOfItems = cartQuantityGeneral[name] ;

    quantities[products[index].name] = numberOfItems ;
  }) ;

  products.forEach((product) => {
    productHTML += `
      <section class="main-item">
        <div class="main-item-image-div">
          <img src="${product.image}" alt="${product.alt}" class="main-item-image">
        </div>

        <div class="main-item-info">
          ${product.name}
        </div>

        <div class="main-item-price">
          $${product.priceCents / 100}
        </div>

        <form class="item-select-form">
          <select class="item-select" name="item-select">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        </form>

        <button class="add-to-cart">
          Add to Cart
        </button>
      </section>
    ` ;
  }) ;

  main.innerHTML += productHTML ;

  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const quantitySelect = document.querySelectorAll('.item-select')[index] ;
      const quantity = parseInt(quantitySelect.value, 10) ;

      quantities[products[index].name] = quantities[products[index].name] || 0 ;
      quantities[products[index].name] += quantity ;

      console.log(quantities) ;

      localStorage.setItem('cart-quantity', JSON.stringify(quantities)) ;
      localStorage.setItem('total-quantity', JSON.stringify(calculateTotalQuantities(quantities))) ;

      totalQuantityDiv.innerHTML = JSON.parse(localStorage.getItem('total-quantity')) ;

      console.log(totalQuantityDiv.innerHTML.length) ;

      if (totalQuantityDiv.innerHTML.length === 1) {
        totalQuantityDiv.style.right = '30px' ;
      } else if (totalQuantityDiv.innerHTML.length === 2) {
        totalQuantityDiv.style.right = '25px' ;
      } else {
        totalQuantityDiv.style.right = '20px' ;
      }
    }) ;
  }) ;

  function calculateTotalQuantities(quantities) {
    let totalQuantity = 0 ;

    for (const productName in quantities) {
      if (quantities.hasOwnProperty(productName)) {
        totalQuantity += quantities[productName] ;
      }
    }

    return totalQuantity ;
  }
}) ;