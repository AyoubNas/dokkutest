#base image

FROM igawi22/node 

#create app directory and make it the working directory

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies

COPY package.json /usr/src/app/
RUN npm install
RUN rm /data/db/mongod.lock

# Bundle app source
COPY . /usr/src/app

# expose port 8080 to be accessible from your computer
EXPOSE 3000

#command to run at container startup
CMD [ "mongod"]




