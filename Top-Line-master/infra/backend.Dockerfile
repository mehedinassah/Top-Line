FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn -q -e -B -DskipTests dependency:go-offline
COPY backend/src ./src
RUN mvn -q -e -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]

