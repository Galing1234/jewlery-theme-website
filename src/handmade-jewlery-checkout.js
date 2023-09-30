document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main') ;
  const checkoutItemsArticle = document.querySelector('.checkout-items-article') ;
  const checkoutDetailsArticle = document.querySelector('.checkout-details') ;
  const checkoutTotalArticle = document.querySelector('.checkout-total') ;

  const cartQuantity = JSON.parse(localStorage.getItem('cart-quantity')) ;
  const totalQuantity = JSON.parse(localStorage.getItem('total-quantity')) ;

  let checkoutItemsHTML = `` ;
  let checkoutItemsIndex = 0 ;
  let checkoutItemsTotalPrice = 0 ;
  let checkoutDetailsArticleHTML = `` ;
  let checkoutTotalArticleHTML = `` ;

  if (totalQuantity === 0) {
    main.innerHTML = 'Your cart is empty.' ;
    main.style.fontSize = '50px' ;

    return ;
  }

  console.log(cartQuantity) ;

  for (const item in cartQuantity) {
    checkoutItemsTotalPrice += (products[checkoutItemsIndex].priceCents / 100) * cartQuantity[item].toFixed(2) ;

    if (item && cartQuantity[item] > 0) {
      checkoutItemsHTML += `
        <div class="checkout-items-div">
          <div>
            <div>
              ${item}: ${cartQuantity[item]}
            </div>

            <div>
              $${((products[checkoutItemsIndex].priceCents / 100) * cartQuantity[item]).toFixed(2)}
            </div>
          </div>

          <img src="${products[checkoutItemsIndex].image}" alt="${products[checkoutItemsIndex].alt}" class="checkout-items-image">
        </div>
      ` ;

      checkoutDetailsArticleHTML += `
        <div>
          <span class="item-name-details">${item}</span>: $${((products[checkoutItemsIndex].priceCents / 100) * cartQuantity[item]).toFixed(2)}
        </div>
      `
    }

    checkoutItemsIndex++ ;
  }

  checkoutTotalArticleHTML += `
    <div>
      TOTAL: $${checkoutItemsTotalPrice.toFixed(2)}
    </div>
  `

  checkoutItemsArticle.innerHTML = checkoutItemsHTML ;
  checkoutDetailsArticle.innerHTML = checkoutDetailsArticleHTML ;
  checkoutTotalArticle.innerHTML = checkoutTotalArticleHTML ;
}) ;