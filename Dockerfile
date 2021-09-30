FROM node:14

# Create work directory
WORKDIR /usr/src/app

# Copy app source to work directory
COPY . /usr/src/app

# Install app dependencies
RUN npm install

#Build React App
RUN npm run build
RUN npm install -g serve

# Build and run the app
CMD serve -s build
