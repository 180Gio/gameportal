![](/public/GamePortal.png)

# GamePortal - Un portale nel mondo dei videogiochi

![](https://img.shields.io/badge/build-pass-green?style=for-the-badge&logo=react&color=lightgreen)

Benvenuto in **GamePortal**, un portale web per gli appassionati di videogiochi che ti permetterà di:

- Visualizzare i prossimi giochi in arrivo e registrarti per ricevere una notifica il giorno di uscita
- Visualizzare le ultime notizie dal mondo videoludico
- Visualizzare le statistiche del tuo profilo Steam
- Cercare informazioni sui giochi presenti su Steam

Il progetto è sviluppato usando React e JavaScript e utilizza le API di Steam e di RAWG per il recupero delle
informazioni sui giochi.

## Esecuzione

### Prerequisiti

Per prima cosa sarà necessario creare un progetto [Firebase](https://console.firebase.google.com/u/0/) e ottenere le API
Key
di [Steam](https://steamcommunity.com/dev/apikey)
e [RAWG](https://rawg.io/apidocs)

### Installazione

Per poter installare il portale dovrai:

- Clonare il progetto eseguendo nel terminale `git clone https://github.com/180Gio/gameportal.git`
- Installare le dipendenze usando il comando `npm install`
- Creare il file `.env` all'interno della cartella base del progetto:
    - Il file dovrà avere questo contenuto:
    ```
    VITE_FIREBASE_API_KEY=
    VITE_FIREBASE_AUTH_DOMAIN=
    VITE_FIREBASE_PROJECT_ID=
    VITE_FIREBASE_STORAGE_BUCKET=
    VITE_FIREBASE_MESSAGING_SENDER_ID=
    VITE_FIREBASE_APP_ID=
    VITE_FIREBASE_MEASUREMENT_ID=
    VITE_STEAM_API_KEY=
    VITE_RAWG_API_KEY=
    VITE_DEFAULT_GAMES_ID='[{"appid":730,"name": "Counter Strike: 2"},{"appid":2357570, "name": "Overwatch® 2"},{"appid":440, "name": "Team Fortress 2"},{"appid":1145350, "name": "Hades II"},{"appid":2531310, "name": "The Last of Us™ Part II Remastered"},{"appid":553850, "name": "HELLDIVERS™ 2"},{"appid":227300, "name": "Euro Truck Simulator 2"},{"appid":1601580, "name": "Frostpunk 2"},{"appid":813780, "name": "Age of Empires II: Definitive Edition"},{"appid":1659040, "name": "HITMAN World of Assassination"}]'
    ```

### Utilizzo

Per eseguire il server, è necessario eseguire il comando `npm run dev`

All'avvio, sarà possibile registrarsi usando il proprio account Google oppure tramite email e password. Una volta creato
l'account, sarà possibile usare il portale in ogni sua funzionalità.
