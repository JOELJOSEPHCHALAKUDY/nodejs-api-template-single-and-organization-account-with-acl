# Nodejs REST API Startup template with Single and Organization account authenticaton with ACL ( Access Control List)
Nodejs REST API  startup template with  Single and Organization account login and authenticaton  with ACL ( Access Control List) using ( Express, Mongoose, Mongodb, jwt , passport ) 

Account Type:

* Single (default)
* Organization (can be switched to from type single)

Permission based route control for each user is controled by using custom authorization middleware in /helpers  folder


The main purpose of this repository is to show a good end-to-end project setup and workflow for writing Node REST API in dealing with  Single and Organization accounts.
I will try to keep this as up-to-date as possible, but community contributions and recommendations for improvements are encouraged and will be most welcome. 


# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/JOELJOSEPHCHALAKUDY/nodejs-api-template-single-and-organization-account-with-acl
```
- Install dependencies
```
cd <project_name>
yarn install
```
- Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db
```
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Run the project
```
nodemon
```
> **Note!** Make sure you have already have  installed nodemon as global dependency or dev dependency `yarn global add nodemon` othewise you may encounter following error:- nodemon is not recognized as internal or external command, operable program or batch file


Finally, navigate to `http://localhost:8081` and you should see the template being served and rendered locally!

# Deploying the app
There are many ways to deploy an Node app, and in general, nothing about the deployment process changes here 


