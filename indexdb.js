if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    alert('Don\'t use this app!');
}
var db, gTX;
var requestDB = indexedDB.open('year2020', 1);
requestDB.onerror = e => console.error;
requestDB.onsuccess = e => {
    db = e.target.result;
    gTX = db.transaction('year2020', 'readwrite');
};
requestDB.onupgradeneeded = function (e) {
    db = e.target.result;
    console.log(db);
    var RCObjectStore = db.createObjectStore('resolution-check');
    RCObjectStore.createIndex("month", "month", {
        unique: false
    });

    var tx = db.transaction('year2020', 'readwrite');
    tx.oncomplete = e => {
        console.log("tx complete");
    };
    gTX = tx;
    console.log(gTX);
}

function addToDB(data, callback) {
    var rc = gTX.objectStore('resolution-check');
    rc.add(data);
    callback({
        done: true
    });
}