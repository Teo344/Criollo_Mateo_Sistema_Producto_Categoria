FROM openjdk:17-jdk-alpine as builder

WORKDIR /app

COPY ./pom.xml /app
COPY ./.mvn ./.mvn
COPY ./mvnw ./mvnw
COPY ./pom.xml ./pom.xml

#Aqui me salto el proceso de pruebas de Maven
RUN ./mvnw clean package -Dmaven.test.skip -Dmaven.main.skip -Dspring-boot.repackage.skip && rm -r ./target/
#RUN ./mvnw dependency:go-offline
COPY ./src ./src

RUN ./mvnw clean package -DskipTests

# Segunda etapa: imagen final
FROM openjdk:17-jdk-alpine

WORKDIR /app

# Crear carpeta para logs si es necesario
RUN mkdir ./logs

# Copiar JAR
COPY --from=builder /app/target/categories-0.0.1-SNAPSHOT.jar .

# Copiar entrypoint y darle permisos
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Exponer puerto definido por variable de entorno
EXPOSE $PORT

# Usar entrypoint que espera la DB
ENTRYPOINT ["./entrypoint.sh"]