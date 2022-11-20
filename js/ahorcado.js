String.prototype.replaceAt = function (index, character) {
  return (
    this.substr(0, index) + character + this.substr(index + character.length)
  );
};

const section = document.querySelector('section'),
  overlay = document.querySelector('.overlay'),
  playAgain = document.querySelector('.play-again');

overlay.addEventListener('click', () => section.classList.remove('active'));

const linea = document.querySelector('div p');
const fallos = document.querySelector('#fallos');
let arrFallos = new Array();
const newArray = document.createElement('p');
const palabras = ['casa', 'perro', 'gato', 'elefante', 'sacapuntas', 'teclado'];
const palabra = palabras[Math.floor(Math.random() * palabras.length)];
let palabraConGuiones = palabra.replace(/./g, '_ ');
let contadorFallos = 0;

document.querySelector('#output').innerHTML = palabraConGuiones;

document.querySelector('#calcular').addEventListener('click', () => {
  const letra = document.querySelector('#letra').value;

  if (letra == '') {
    return;
  }

  let haFallado = true;

  for (const i in palabra) {
    if (letra == palabra[i]) {
      palabraConGuiones = palabraConGuiones.replaceAt(i * 2, letra);
      haFallado = false;
    }
  }

  if (haFallado) {
    contadorFallos++;
    arrFallos.push(letra);

    newArray.textContent = arrFallos;
    fallos.append(newArray);

    document.querySelector('#imagen').src = `img/img${contadorFallos}.png`;

    if (contadorFallos == 6) {
      const baphomet = document.createElement('img');
      baphomet.src = '/img/Isaac.lose(Baphomet).png';
      linea.append(baphomet);

      const lose = document.createElement('p');
      lose.textContent = `Has perdido, la palabra era ${palabra}.`;
      linea.append(lose);

      section.classList.add('active');

      document.getElementById('calcular').disabled = true;
    }
  } else {
    if (palabraConGuiones.indexOf('_') < 0) {
      const uriel = document.createElement('img');
      uriel.src = '/img/Isaac.win(Uriel).png';
      linea.append(uriel);

      const win = document.createElement('p');
      win.textContent = `Has ganado.`;
      linea.append(win);

      section.classList.add('active');

      document.getElementById('calcular').disabled = true;
    }
  }

  document.querySelector('#output').innerHTML = palabraConGuiones;
  document.querySelector('#letra').value = '';
  document.querySelector('#letra').focus();
});

playAgain.addEventListener('click', (e) => {
  window.location.reload();
});
