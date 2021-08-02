window.onload = function() { // после загрузки страницы

    var scrollUp = document.getElementById('scrollup'); // найти элемент
  
    scrollUp.onmouseover = function() { // добавить прозрачность
      scrollUp.style.opacity=0.3;
      scrollUp.style.filter  = 'alpha(opacity=20)';
    };
  
    scrollUp.onmouseout = function() { //убрать прозрачность
      scrollUp.style.opacity = 0.5;
      scrollUp.style.filter  = 'alpha(opacity=20)';
    };
  
    scrollUp.onclick = function() { //обработка клика
      window.scrollTo(0,0);
      window.scrollBy({ behavior: 'smooth'});
      

    };
  
  // show button
  
    window.onscroll = function () { // при скролле показывать и прятать блок
      if ( window.pageYOffset > 0 ) {
        scrollUp.style.display = 'block';
      } else {
        scrollUp.style.display = 'none';
      }
    };
  };