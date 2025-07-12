# Étape de build
FROM maven:3.9.8-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Étape de run
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/GestionUser-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
