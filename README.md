# Ionic-mobile

This is a template application for the [Ionic Framework](http://ionicframework.com/). It was originally generated using this [Yeoman](http://yeoman.io/) [Ionic generator](https://github.com/diegonetto/generator-ionic) version 0.6.1 on January 29th, 2015. It is meant to be a template and starting point for Ionic mobile applications. This project was originally sponsored and supported by [Alex Creighton].

Features:
* Core module which includes applicaion settings
* A Sample Module for demonstration
* Persisting local storage through SQLite
* Facebook and Twitter social media syncronization
* GPS location information


# Setup Instructions

## Android

Install Java [SDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) and [Apache Ant](http://mirror.tcpdiag.net/apache//ant/binaries/apache-ant-1.9.4-bin.zip) if you dont already have them and add their respective '/bin' folders to your PATH variable.

Install the [Android SDK](http://developer.android.com/sdk/index.html) and add '/sdk/platform-tools/' and '/sdk/tools/' to the PATH variable.

Run
```bash
android
```
...and install a new version of Android.



Update the local package list and download GIT, Node.js, and Node Package Manager

```bash
sudo apt-get update
sudo apt-get install -y git
sudo apt-get install -y nodejs
sudo apt-get install -y npm
```

Create a symbolic link between nodejs and node (some older programs that use node call it through 'node' instead of 'nodejs')

```bash
sudo ln -s /usr/bin/nodejs /usr/bin/node
```

Install Ionic and Cordova
```bash
npm install -g ionic
npm install -g cordova
```


Install Bower Web Package Manager and Grunt Task Runner

```bash
npm install -g bower
npm install -g grunt-cli
```


Clone the project and navigate into it

```bash
git clone https://github.com/castlewhitehall/ionic-mobile-app-template.git
cd ionic-mobile-app-template/
```


Download required libraries

```bash
npm install
bower install
```


Initialize the project

```bash
grunt init
```


Install Android platform

```bash
cordova platform add android
```


Run on attached Android device


```bash
grunt run:android
```

Host locally to debug/develop in browser (Note: cordova plugins and social media will not work in browser)


```bash
grunt serve
```


