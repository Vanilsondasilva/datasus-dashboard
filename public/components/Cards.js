export function Card({ title, value, icon }) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-icon">${icon || ''}</div>
    <div class="card-title">${title}</div>
    <div class="card-value">${value}</div>
  `;
  return card;
}