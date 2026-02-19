const slider = document.querySelector('.product-slider');
let isDown = false;
let startX;
let scrollLeft;

if (slider) {
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; 
    slider.scrollLeft = scrollLeft - walk;
  });
}


const toggleButton = document.createElement('button');
toggleButton.textContent = "🌙";
toggleButton.style.position = 'fixed';
toggleButton.style.top = '1rem';
toggleButton.style.left = '1rem';
toggleButton.style.padding = '0.5rem 1rem';
toggleButton.style.backgroundColor = '#ffb6c1';
toggleButton.style.border = 'none';
toggleButton.style.borderRadius = '20px';
toggleButton.style.cursor = 'pointer';
toggleButton.style.zIndex = '999';
document.body.appendChild(toggleButton);

let isDark = false;

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  isDark = !isDark;
  toggleButton.textContent = isDark ? "☀️" : "🌙";
});


window.addEventListener('DOMContentLoaded', () => {
    fetch('products.xml')
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, 'application/xml');
        const perfumes = xml.getElementsByTagName('perfume');
  
        const slider = document.querySelector('.product-slider');
        if (!slider) return;
  
        Array.from(perfumes).forEach(perfume => {
          const name = perfume.getElementsByTagName('name')[0].textContent;
          const scent = perfume.getElementsByTagName('scent')[0].textContent;
          const price = perfume.getElementsByTagName('price')[0].textContent;
          const image = perfume.getElementsByTagName('image')[0].textContent;
  
          const card = document.createElement('div');
          card.classList.add('product-card');
  
          card.innerHTML = `
            <img src="${image}" alt="${name} perfume bottle">
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Scent:</strong> ${scent}</li>
              <li><strong>Price:</strong> ${price}</li>
            </ul>
          `;
  
          slider.appendChild(card);
        });
      })
      .catch(err => console.error('Failed to load XML:', err));
  });
  
