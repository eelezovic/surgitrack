FROM node 

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .


RUN npm run build


# Set the working directory in the container
WORKDIR /usr/src/app/backend

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install


# Expose the port on which your app runs
EXPOSE 8000

# Command to run your application
CMD ["npm", "start"]