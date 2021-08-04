const select = document.querySelector('.switch_3');

select.addEventListener('change', (e) => {
  e.preventDefault();
  if (localStorage.getItem('theme') === 'dark-theme') {
    localStorage.setItem('theme', 'light-theme');
  }
  else {
    localStorage.setItem('theme', 'dark-theme');
  }
  addDarkTheme();
});

function addDarkTheme() {
  if (localStorage.getItem('theme') === 'dark-theme') {
    document.querySelector('.main').classList.add('dark-theme');
    document.querySelector('.footer').classList.add('dark-theme');
    document.querySelector('.tui-pagination').classList.add('dark-theme');
    select.setAttribute('checked', true);
  }
  else {
    document.querySelector('.main').classList.remove('dark-theme');
    document.querySelector('.footer').classList.remove('dark-theme');
    document.querySelector('.tui-pagination').classList.remove('dark-theme');
  }
}
addDarkTheme();
