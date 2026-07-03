# ---- Build stage: compile & package with Maven on JDK 21 ----
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
# Cache dependencies first
COPY pom.xml .
RUN mvn -q -B -DskipTests dependency:go-offline
# Then build
COPY src ./src
RUN mvn -q -B -DskipTests package

# ---- Run stage: slim JRE with just the jar ----
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Railway/hosts inject $PORT; Spring reads it via application.yml (server.port=${PORT:8080})
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
