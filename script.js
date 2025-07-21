// Charger les éléments sauvegardés ou créer un tableau vide
let items = JSON.parse(localStorage.getItem('items')) || [];

// Fonction pour sauvegarder dans localStorage
function saveToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

// Fonction pour afficher la liste dans la page
function displayItems() {
  const list = document.getElementById('list');
  list.innerHTML = ''; // Vide la liste avant de la remplir

  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  });
}

// Fonction pour ajouter un nouvel élément
function addItem() {
  const input = document.getElementById('input-item');
  const newItem = input.value.trim();

  if (newItem !== '') {
    items.push(newItem);          // Ajouter au tableau
    saveToLocalStorage();         // Sauvegarder dans localStorage
    input.value = '';             // Vider le champ
    displayItems();               // Rafraîchir l’affichage
  }
}

// Événement bouton Ajouter
document.getElementById('btn-add').addEventListener('click', addItem);

// Événement touche Entrée dans le champ
document.getElementById('input-item').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addItem();
});

// Afficher la liste au chargement de la page
displayItems();

//pour la recherche
function displayItems() {
  const list = document.getElementById('list');
  const searchInput = document.getElementById('search-item');
  const searchValue = searchInput ? searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : '';
  list.innerHTML = '';

  items.forEach((item, index) => {
    const normalizedItem = item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalizedItem.includes(searchValue)) {
      const li = document.createElement('li');
      li.textContent = item;
      list.appendChild(li);
    }
  });
}

// Recherche en temps réel
document.getElementById('search-item').addEventListener('input', displayItems);