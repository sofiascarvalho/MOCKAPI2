'use strict';

async function buscarImagens() {
    const url = `http://localhost:3000/fotos`;
    const response = await fetch(url);
    return await response.json();
}

async function adicionarFotos(link) {
    const carrossel = document.getElementById('carrossel');
    const img = document.createElement('img');
    img.src = link.imagem;
    carrossel.appendChild(img);
}

async function preencherCarrossel() {
    const fotos = await buscarImagens();
    const carrossel = document.getElementById('carrossel');
    carrossel.replaceChildren('');
    fotos.forEach(adicionarFotos);
}

preencherCarrossel();
