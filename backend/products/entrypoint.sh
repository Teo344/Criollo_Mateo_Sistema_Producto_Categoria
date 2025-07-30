#!/bin/sh

echo "⏳ Esperando a que la base de datos esté lista..."

# Espera activa hasta que el puerto 3306 de MySQL esté disponible
while ! nc -z mysql-db 3306; do
  echo "⏳ Aún esperando a MySQL..."
  sleep 2
done

echo "✅ Base de datos disponible. Iniciando Categories..."

exec java -jar products-0.0.1-SNAPSHOT.jar
