# Baza danych

Odpalenie:

```bash
# lokalnie
./db/pocketbase serve --http="localhost:8090"
# na dockerze
docker-compose up -d
```

Docker

```bash
# buildowanie obrazu z Dockerfile
docker build -t pocketbase ./db
# żeby wejść do terminalu dockera
docker exec -it pocketbase sh
# kopiowanie wszystkich danych z pliku do dockera
docker cp -a ./pb_data/. pocketbase:/usr/local/bin/pb_data
```
