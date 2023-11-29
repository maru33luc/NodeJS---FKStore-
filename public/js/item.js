
const add = document.querySelector('#add');
const substract = document.querySelector('#substract');
const quantity = document.querySelector('#quantity');

if (isNaN(parseInt(quantity.value)) || quantity.value === null) {
    quantity.value = 0;
}

add.addEventListener('click', () => {
    quantity.value = parseInt(quantity.value) + 1;
});

substract.addEventListener('click', () => {
    if(quantity.value > 0){
        quantity.value = parseInt(quantity.value) - 1;
    }
});

const btnAddCart = document.querySelector('#btn-add-Cart');

// ---------------LOGICA CARRITO LOCAL ---------------------

const dbName = 'cartDB';
const storeName = 'carts';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    // Si la base de datos no existe, la crea y establece el esquema.
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'itemId' });
      }
    };
  });
}

async function addCart(idItem, quantity) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  if (idItem !== undefined && idItem !== null) {
    await store.add({ itemId: idItem, quantity: parseInt(quantity) });
  } else {
    console.error('Error: El valor de id es indefinido o nulo.');
  }
  transaction.oncomplete = () => db.close();
}

 async function updateCart(itemId, quantity) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readwrite');
  const store = transaction.objectStore(storeName);
  await store.put({ itemId, quantity: parseInt(quantity) });
  transaction.oncomplete = () => db.close();
}

async function getCart(itemId) {
  const db = await openDB();
  const transaction = db.transaction(storeName, 'readonly');
  const store = transaction.objectStore(storeName);
  const request = store.get(itemId);

  return new Promise((resolve) => {
    request.onsuccess = () => {
      resolve(request.result);
      db.close();
    };
  });
}

async function deleteItemCart(itemId) {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    await store.delete(itemId);
    transaction.oncomplete = () => db.close();
    }

// -----------------------------


btnAddCart.addEventListener('click', async (e) => {
    if(e.target.dataset.userId == null){
       const id = e.target.dataset.itemId;
       const item = await getCart(id);
       if(item && id && quantity.value > 0){
           updateCart(id, quantity.value);
         }
         else{
            if(id && quantity.value > 0){
                addCart(id, quantity.value);
            }   
        }
    }else{
        const id = e.target.dataset.itemId;
    const userId = e.target.dataset.userId;
    const url = `/shop/item/${id}/add?quantity=${quantity.value}`;
    window.location.href = url;  
    }
    
});



