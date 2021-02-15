if (localStorage['mods.smallsearch'] === undefined) localStorage['mods.smallsearch'] = 'false';
if (localStorage['mods.nosearch'] === undefined) localStorage['mods.nosearch'] = 'false';
if (localStorage['mods.keyreload'] === undefined) localStorage['mods.keyreload'] = 'false';
if (localStorage['mods.keynavigate'] === undefined) localStorage['mods.keynavigate'] = 'false';

var style = document.createElement('style');
style.innerHTML = '.popover-left-rail .left-rail-z-index { z-index: 2147483646 } .mod-menu-hide { opacity: 0; pointer-events: none; } .mod-smallsearch { position: fixed; top: 9px; left: 68px; z-index: 500 } .mod-hide { display: none }';
document.getElementsByTagName('head')[0].appendChild(style);
var target = document.querySelector('.app-list-item');
var menu = document.createElement('div');
menu.classList.add('app-bar-link');
menu.innerHTML = `
<button id="mod-menu-toggle" class="discover-apps-button" style="padding: 0px">
<img draggable="false" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAA4AgMAAAA5nbabAAAADFBMVEVHcEz///////////8Gn9AKAAAAA3RSTlMALs/6qhLTAAAANElEQVQoz2NgGAUDChhDQ0NRRdj////vQECEbdWqVQ4k20WMyZgixABM9xBjMqbfRwGNAQDXkh1liBgRFQAAAABJRU5ErkJggg">
</button>
<div id="mod-menu" class="popover mod-menu-hide" tabindex="0" style="position: fixed; padding: 20px; left: 76px; top: unset; bottom: 8px; display: unset; background-color: #464775; color: white; transition: 200ms; z-index: 2147483647;">
<center>Teams Mods</center>
<hr style="margin-top: 10px; margin-bottom: 10px;">
<label><input id="mod-menu-option-smallsearch" style="vertical-align: top;" type="checkbox" tabindex="-1"><span>&nbsp;&nbsp;&nbsp;&nbsp;Small search bar</span></label>
<hr style="margin-top: 10px; margin-bottom: 10px;">
<label><input id="mod-menu-option-nosearch" style="vertical-align: top;" type="checkbox" tabindex="-1"><span>&nbsp;&nbsp;&nbsp;&nbsp;Remove search bar</span></label>
<hr style="margin-top: 10px; margin-bottom: 10px;">
<label><input id="mod-menu-option-keyreload" style="vertical-align: top;" type="checkbox" tabindex="-1"><span>&nbsp;&nbsp;&nbsp;&nbsp;Reload with Ctrl+R</span></label>
<hr style="margin-top: 10px; margin-bottom: 10px;">
<label><input id="mod-menu-option-keynavigate" style="vertical-align: top;" type="checkbox" tabindex="-1"><span>&nbsp;&nbsp;&nbsp;&nbsp;Navigate with ᐊ Alt ᐅ</span></label>
<hr style="margin-top: 10px; margin-bottom: 10px;">
<center><a style="color: #a6a7dc" href="https://github.com/pipipear/teams-mods" rel="noreferrer noopener" target="_blank" tabindex="-1">Github - pipipear</a></center>
</div>`;
target.parentNode.insertBefore(menu, target);


visual_mods();
function visual_mods() {
  if (localStorage['mods.smallsearch'] === 'true') {
    document.querySelector('#mod-menu-option-smallsearch').checked = true;
    document.querySelector('.app-top-power-bar').classList.add('mod-smallsearch');
    document.querySelector('.app-top-power-bar').classList.add('app-left-rail-width');
  } else if (localStorage['mods.smallsearch'] === 'false') {
    document.querySelector('#mod-menu-option-smallsearch').checked = false;
    document.querySelector('.app-top-power-bar').classList.remove('mod-smallsearch');
    document.querySelector('.app-top-power-bar').classList.remove('app-left-rail-width');
  }

  if (localStorage['mods.nosearch'] === 'true') {
    document.querySelector('#mod-menu-option-nosearch').checked = true;
    document.querySelector('.app-top-power-bar').classList.add('mod-hide');
  } else if (localStorage['mods.nosearch'] === 'false') {
    document.querySelector('#mod-menu-option-nosearch').checked = false;
    document.querySelector('.app-top-power-bar').classList.remove('mod-hide');
  }

  if (localStorage['mods.keyreload'] === 'true') {
    document.querySelector('#mod-menu-option-keyreload').checked = true;
  } else if (localStorage['mods.keyreload'] === 'false') {
    document.querySelector('#mod-menu-option-keyreload').checked = false;
  }

  if (localStorage['mods.keynavigate'] === 'true') {
    document.querySelector('#mod-menu-option-keynavigate').checked = true;
  } else if (localStorage['mods.keynavigate'] === 'false') {
    document.querySelector('#mod-menu-option-keynavigate').checked = false;
  }
}


document.querySelector('#mod-menu-toggle').onclick = () => {
  document.querySelector('#mod-menu').classList.toggle('mod-menu-hide');
  document.querySelector('#mod-menu').focus();
};
document.querySelector('#mod-menu').onblur = () => {
  setTimeout(() => {
    if (document.activeElement.parentElement.parentElement == document.querySelector('#mod-menu')) {
      document.querySelector('#mod-menu').focus();
    } else if (document.activeElement.parentElement == document.querySelector('#mod-menu').parentElement) { } else {
      document.querySelector('#mod-menu').classList.add('mod-menu-hide');
    }
  }, 1);
};
document.querySelector('#mod-menu').addEventListener('keydown', (e) => {
  if (e.key = 'Escape') {
    document.querySelector('#mod-menu').blur();
    document.body.classList.remove('acc-keyboard-mode')
  }
});

document.querySelector('#mod-menu-option-smallsearch').onchange = () => { topt('smallsearch'); };
document.querySelector('#mod-menu-option-nosearch').onchange = () => { topt('nosearch'); };
document.querySelector('#mod-menu-option-keyreload').onchange = () => { topt('keyreload'); };
document.querySelector('#mod-menu-option-keynavigate').onchange = () => { topt('keynavigate'); };

function topt(id) {
  localStorage[`mods.${id}`] = document.querySelector(`#mod-menu-option-${id}`).checked;
  visual_mods();
}

document.addEventListener('keydown', (e) => {
  if (localStorage['mods.keyreload'] == 'true' && e.key == 'r' && e.ctrlKey) {
    console.log('reload-[unqid]');
    location.reload();
  }
  if (localStorage['mods.keynavigate'] == 'true' && e.key == 'ArrowLeft' && e.altKey) {
    document.activeElement.blur();
    console.log('back');
    document.querySelector('#navigation-buttons').children[0].click();
    document.body.classList.remove('acc-keyboard-mode')
  }
  if (localStorage['mods.keynavigate'] == 'true' && e.key == 'ArrowRight' && e.altKey) {
    document.activeElement.blur();
    console.log('foward');
    document.querySelector('#navigation-buttons').children[1].click();
    document.body.classList.remove('acc-keyboard-mode')
  }
});
