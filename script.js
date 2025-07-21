// Charger les éléments sauvegardés ou créer un tableau vide
let items = JSON.parse(localStorage.getItem('items')) || [];

// Fonction pour sauvegarder dans localStorage
function saveToLocalStorage() {
  localStorage.setItem('items', JSON.stringify(items));
}

// Fonction pour afficher la liste dans la page avec un bouton supprimer pour chacun
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

      // Création du bouton supprimer
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Supprimer';
      deleteBtn.style.marginLeft = '10px';

      // Quand on clique sur supprimer, on enlève cet élément du tableau
      deleteBtn.addEventListener('click', () => {
        items.splice(index, 1);
        saveToLocalStorage();
        displayItems();
      });

      // On ajoute le bouton à la ligne <li>
      li.appendChild(deleteBtn);

      // Puis on ajoute la ligne dans la liste
      list.appendChild(li);
    }
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

/*
//Pour la recherche
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
document.getElementById('search-item').addEventListener('input', displayItems);*/