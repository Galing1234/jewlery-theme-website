document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo') ;
  const headerRightSection = document.querySelector('.header-right-section') ;

  const searchBox = document.querySelector('.header-search-box') ;
  const searchBoxIcon = document.querySelector('.search-icon-svg') ;
  const resultsContainer = document.querySelector('.input-autocomplete-results') ;

  const totalQuantity = JSON.parse(localStorage.getItem('total-quantity')) ;
  const totalQuantityDiv = document.querySelector('.total-quantity') ;

  const progressBar = document.getElementById('progressBar') ;

  logo.addEventListener('click', () => {
    location.href = 'handmade-jewlery-home.html' ;
  }) ;

  headerRightSection.addEventListener('click', () => {
    location.href = 'handmade-jewlery-checkout.html' ;
  }) ;

  totalQuantityDiv.innerHTML = `${totalQuantity}` ;

  if (totalQuantityDiv.innerHTML.length === 1) {
    totalQuantityDiv.style.right = '30px' ;
  } else if (totalQuantityDiv.innerHTML.length === 2) {
    totalQuantityDiv.style.right = '25px' ;
  } else {
    totalQuantityDiv.style.right = '20px' ;
  }

  const words = [] ;

  for (let i = 0 ; i < products.length ; i++) {
    words.push(products[i].name) ;
  }

  searchBox.addEventListener('input', () => {
    searchBoxValue = searchBox.value.toLowerCase() ;
    const filteredWords = words.filter(word =>
      word.toLowerCase().includes(searchBoxValue)
    ) ;

    resultsContainer.innerHTML = '' ;

    if (searchBoxValue !== '') {
      filteredWords.forEach(word => {
        const listItem = document.createElement('li') ;

        listItem.textContent = word ;
        listItem.addEventListener('click', () => {
          resultsContainer.style.display = 'none' ;
          searchBox.value = word.toLowerCase() ;
          searchBoxValue = word.toLowerCase() ;
          localStorage.setItem('search-bar-value', searchBoxValue) ;
          location.href = 'handmade-jewlery-search.html' ;
        }) ;

        resultsContainer.appendChild(listItem) ;
      }) ;

      resultsContainer.style.display = 'block' ;

      searchBox.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
          localStorage.setItem('search-bar-value', searchBoxValue) ;
          location.href = 'handmade-jewlery-search.html' ;
        }
      }) ;

      searchBoxIcon.addEventListener('click', () => {
        localStorage.setItem('search-bar-value', searchBoxValue) ;
        location.href = 'handmade-jewlery-search.html' ;
      }) ;
    } else {
      resultsContainer.style.display = 'none' ;
    }
  });

  document.addEventListener('click', (e) => {
    if (!resultsContainer.contains(e.target) && e.target !== searchBox) {
      resultsContainer.style.display = 'none';
    }
  });

  function updateProgressBar() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.scrollY / scrollableHeight) * 100;
    progressBar.style.width = `${scrolledPercentage}%`;
  }

  window.addEventListener('scroll', updateProgressBar);
}) ;