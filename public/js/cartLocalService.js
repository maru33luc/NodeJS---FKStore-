const dbName = 'cartDB';
const storeName = 'carts';

export function openDB() {
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

export async function addCart(idItem, quantity) {
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

export async function updateCart(itemId, quantity) {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    await store.put({ itemId, quantity: parseInt(quantity) });
    transaction.oncomplete = () => db.close();
}

export async function getCart(itemId) {
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

export async function deleteItemCart(itemId) {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    await store.delete(itemId);
    transaction.oncomplete = () => db.close();
}

export async function getCartAll() {
    const db = await openDB();
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();
    return new Promise((resolve) => {
        request.onsuccess = () => {
            resolve(request.result);
            db.close();
        };
    });
}

