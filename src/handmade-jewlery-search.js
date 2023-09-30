document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main') ;
  const searchBox = document.querySelector('.header-search-box') ;

  document.title = `
    Handmade Jewlery - ${localStorage.getItem('search-bar-value') || ''}
  ` ;

  searchBoxValue = localStorage.getItem('search-bar-value') || '' ;
  searchBox.value = searchBoxValue ;

  const words = [] ;

  for (let i = 0 ; i < products.length ; i++) {
    words.push(products[i].name) ;
  }

  const filteredWords = words.filter(word =>
    word.toLowerCase().includes(searchBoxValue)
  ) ;

  if (filteredWords.length === 0) {
    main.innerHTML = 'No results found. Please try again' ;
  }

  filteredWords.forEach(word => {
    const filteredProduct = products.find(item =>
      item.name === word
    ) ;

    if (filteredProduct) {
      const listItem = document.createElement('div') ;
      listItem.classList.add('search-result') ;

      listItem.innerHTML = `
        <div class="search-result-title">
          ${word}
        </div>

        <div class="search-result-info">
          <div class="search-result-image-div">
            <img src="${filteredProduct.image}" alt=${filteredProduct.alt} class="search-result-image">
          </div>

          <div class="search-result-manufacturer">
            <span class="search-result-manufacturer-title">Manufacturer</span>: ${filteredProduct.manufacturer} <br>
            <span class="search-result-manufacturer-title">Country of manufacturer</span>: ${filteredProduct.manufacturerCountry}
          </div>
        </div>
      ` ;

      main.appendChild(listItem) ;
    }
  }) ;
}) ;