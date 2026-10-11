# Stage 1: Build JAR using Maven & JDK 21
FROM maven:3.9.9-eclipse-temurin-21-alpine AS build
WORKDIR /app

# Cache dependencies layer
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build jar without running tests
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Minimal Production Runtime
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create a non-root system user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy generated jar from the build stage
COPY --from=build /app/target/*.jar app.jar

# Backend runs on port 9090 as per application.yaml
EXPOSE 9090

ENTRYPOINT ["java", "-jar", "app.jar"]