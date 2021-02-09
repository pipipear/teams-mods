document.addEventListener('keydown', (e) => {
  if (e.key == 'r' && e.ctrlKey) {
    console.log('reload-[unqid]')
    location.reload()
  }
});

document.getElementsByClassName('app-top-power-bar')[0].style.position = 'fixed';
document.getElementsByClassName('app-top-power-bar')[0].style.top = '9px';
document.getElementsByClassName('app-top-power-bar')[0].style.left = '68px';
document.getElementsByClassName('app-top-power-bar')[0].classList.add('app-left-rail-width');
document.getElementsByClassName('app-top-power-bar')[0].style.zIndex = 5;