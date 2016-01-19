var brfPhoneGapApp = angular.module('brfPhoneGapApp', ['ngRoute']); //Boostrap
var db; //Database Global Variable

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();

        //Move to DeviceReady Event
        db = window.openDatabase('BRF', '1.0', 'BRF', 200000);     

        db.transaction(function(tx) {

            /*
            tx.executeSql('DROP TABLE IF EXISTS Channel');
            tx.executeSql('DROP TABLE IF EXISTS Customer');
            tx.executeSql('DROP TABLE IF EXISTS CustomerType');
            tx.executeSql('DROP TABLE IF EXISTS Seller');
            tx.executeSql('DROP TABLE IF EXISTS Module');
            tx.executeSql('DROP TABLE IF EXISTS ModuleChannels');
            tx.executeSql('DROP TABLE IF EXISTS ModuleUserRoles');
            tx.executeSql('DROP TABLE IF EXISTS Category');
            tx.executeSql('DROP TABLE IF EXISTS CategoryChannels');
            tx.executeSql('DROP TABLE IF EXISTS CategoryImage');
            tx.executeSql('DROP TABLE IF EXISTS Question');*/

            tx.executeSql('CREATE TABLE IF NOT EXISTS Channel(id integer primary key, channelId integer, name text)'); 
            tx.executeSql('CREATE TABLE IF NOT EXISTS Customer(id integer primary key, customerId integer,companyName text, cuit text, address text)'); 
            tx.executeSql('CREATE TABLE IF NOT EXISTS CustomerType(id integer primary key, customerTypeId, name text)'); 
            tx.executeSql('CREATE TABLE IF NOT EXISTS Seller(id integer primary key, sellerId integer, name text)'); 

            tx.executeSql('CREATE TABLE IF NOT EXISTS Module(id integer primary key, moduleId integer, behavior text, modName text, categoryType integer, color text, icon text)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS ModuleChannels(id integer primary key, moduleId integer, channelId integer)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS ModuleUserRoles(id integer primary key, moduleId integer, roleId integer)');

            tx.executeSql('CREATE TABLE IF NOT EXISTS Category(id integer primary key, categoryId integer, type integer, name text)');
            tx.executeSql('CREATE TABLE IF NOT EXISTS CategoryChannels(id integer primary key, categoryId, channelId)');

            tx.executeSql('CREATE TABLE IF NOT EXISTS CategoryImage(id integer primary key, imageId integer, idMod integer, idCat integer, image text, icon text)'); 
            tx.executeSql('CREATE TABLE IF NOT EXISTS Question(id integer primary key, questionId integer, categoryId integer, pdvFilter integer, render text, answer text, title text, data text, helper text, big text, thumb text)');          
        });           
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');           

        //db = window.openDatabase('BRF', '1.0', 'BRF', 200000);         
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
