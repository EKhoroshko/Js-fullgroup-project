export const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
  };
  
  const select = document.querySelector('.switch_3');
  
  select.addEventListener('change', (e) => {
    if (localStorage.getItem('theme') === Theme.LIGHT) {
        localStorage.setItem('theme', Theme.DARK);
    }
    else {
        localStorage.setItem('theme', Theme.LIGHT);
    }
    addDarkTheme();
  });
  
  function addDarkTheme() {
    if (localStorage.getItem('theme') === Theme.LIGHT) {
        document.querySelector('body').classList.add(Theme.LIGHT);
        select.setAttribute('checked', true);
    }
    else {
        document.querySelector('body').classList.remove(Theme.LIGHT);
    }
  }
  addDarkTheme();

  console.log()