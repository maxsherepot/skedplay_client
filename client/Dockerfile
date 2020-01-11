FROM mhart/alpine-node as build

# Set the working directory, copy dependency management files to the working directory,
# and install the dependencies
WORKDIR /usr/src

COPY package.json ./

RUN npm install -g forever
RUN npm install

# Copy all files to the working directly, build the application
# and purge the development dependencies
COPY . .

RUN npm run build

EXPOSE 3000

# Start the server for Next.js using Node.js
#CMD ["npm", "start"]
