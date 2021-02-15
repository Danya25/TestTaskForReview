FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build

WORKDIR /src
COPY MentalstackTestTask.csproj MentalstackTestTask/
COPY  ../MentalstackTestTask.Common/MentalstackTestTask.Common.csproj MentalstackTestTask.Common/
COPY ../MentalstackTestTask.DAL/MentalstackTestTask.DAL.csproj MentalstackTestTask.DAL/
COPY ../MentalstackTestTask.Domain/MentalstackTestTask.Domain.csproj MentalstackTestTask.Domain/
COPY ../MentalstackTestTask.Services/MentalstackTestTask.Services.csproj MentalstackTestTask.Services/


RUN dotnet restore MentalstackTestTask.csproj

COPY . .
WORKDIR /src/MentalstackTestTask
RUN dotnet build MentalstackTestTask.csproj -c Release -o /app


FROM build AS publish
RUN dotnet publish MentalstackTestTask.csproj -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .

EXPOSE 80

ENTRYPOINT ["dotnet", "MentalstackTestTask.dll"]