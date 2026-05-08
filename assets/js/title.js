const text = document.querySelectorAll('div.wave label');
text.forEach(label =>{
    label.innerHTML = label.textContent.split('').map((text, wave) => `<span style="transition-delay: ${wave * 25}ms">${text}</span>`).join('');
});