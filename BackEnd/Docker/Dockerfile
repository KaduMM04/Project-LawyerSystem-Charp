# See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

# This stage is used when running from VS in fast mode (Default for Debug configuration)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /app

# Copy the root project to folder container
COPY Project-LawyerSystem-CharpApi/Project-LawyerSystem-CharpApi.csproj ./Project-LawyerSystem-CharpApi/
RUN dotnet restore ./Project-LawyerSystem-CharpApi/Project-LawyerSystem-CharpApi.csproj


# Copy the rest of the code until in container
COPY Project-LawyerSystem-CharpApi/ ./Project-LawyerSystem-CharpApi/
WORKDIR /app/Project-LawyerSystem-CharpApi
RUN dotnet build -c $BUILD_CONFIGURATION -o /app/build


# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
RUN dotnet publish -c $BUILD_CONFIGURATION -o /app/publish --no-restore /p:UseAppHost=false


# This stage is used in production or when running from VS in regular mode (Default when not using the Debug configuration)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Project-LawyerSystem-CharpApi.dll"]
