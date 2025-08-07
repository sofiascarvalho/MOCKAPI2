'use strict';

let slideIndex = 0;
let totalSlides = 0;

async function buscarImagens() {
    const url = `http://localhost:3000/fotos`;
    const response = await fetch(url);
    return await response.json();
}

function adicionarFotos(link) {
    const carrossel = document.getElementById('carrossel');

    const slide = document.createElement('div');
    slide.classList.add('slide');

    const img = document.createElement('img');
    img.src = link.imagem;

    const legenda = document.createElement('div');
    legenda.classList.add('descricao');
    legenda.textContent = link.legenda;

    slide.appendChild(img);
    slide.appendChild(legenda);
    carrossel.appendChild(slide);
}

function mostrarSlide(index) {
    const carrossel = document.getElementById('carrossel');
    carrossel.style.transform = `translateX(-${index * 100}vw)`;
}

function configurarNavegacao() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        slideIndex = (slideIndex === 0) ? totalSlides - 1 : slideIndex - 1;
        mostrarSlide(slideIndex);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        slideIndex = (slideIndex === totalSlides - 1) ? 0 : slideIndex + 1;
        mostrarSlide(slideIndex);
    });
}

async function preencherCarrossel() {
    const fotos = await buscarImagens();
    totalSlides = fotos.length;

    const carrossel = document.getElementById('carrossel');
    carrossel.replaceChildren('');

    fotos.forEach(adicionarFotos); // Corrigido aqui

    // Espera um pequeno tempo para garantir que o DOM atualize
    setTimeout(() => {
        mostrarSlide(slideIndex);
        configurarNavegacao();
    }, 100);
}

preencherCarrossel();
