FROM node:22-slim

WORKDIR /app

# Copie fichiers de config
COPY package*.json ./

# Installation des dépendances
RUN npm install

COPY . .

# On expose le port 3007
EXPOSE 3007

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]