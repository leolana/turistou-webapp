FROM node:14

# Create work directory
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json

# Install app dependencies
RUN npm install

# Copy app source to work directory
COPY . /usr/src/app

#Build React App
RUN npm run build
RUN npm install -g serve

# Build and run the app
CMD serve -s build
