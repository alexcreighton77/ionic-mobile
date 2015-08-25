'use strict';

//TODO:
//  -- Protect against SQL injection

angular.module('IonicMobileAppTemplate.Core.services', [])

	.factory('AppSettingsServ', ['$cordovaSQLite', function($cordovaSQLite){
		
		var db;

		return {

			init: function(database){
				db = database;

			    // create and save settings table
			    var settingsTableSql = 'CREATE TABLE IF NOT EXISTS settings (\
					SettingId INTEGER PRIMARY KEY AUTOINCREMENT, \
					ItemSelect INTEGER NOT NULL DEFAULT 0, \
					SliderBar INTEGER NOT NULL DEFAULT 0, \
					Radio INTEGER NOT NULL DEFAULT 0, \
					Switch1 INTEGER NOT NULL DEFAULT 0, \
					Switch2 INTEGER NOT NULL DEFAULT 0, \
					Check1 INTEGER NOT NULL DEFAULT 0, \
					Check2 INTEGER NOT NULL DEFAULT 0, \
					Check3 INTEGER NOT NULL DEFAULT 0)';

			    $cordovaSQLite.execute(db, settingsTableSql).then(function(res){
			    	console.log('DB - Settings table check...');

			    	// insert the defaul values into the first row if it does not exist
				    var rowCheckSql = 'SELECT * FROM settings';
					$cordovaSQLite.execute(db, rowCheckSql).then(function(res){
						
						if(res.rows.length == 0){ // does not exist yet

							// sql for inserting the settings row, uses all defaults
							var insertSql = 'INSERT INTO settings (ItemSelect) VALUES (0)';
							$cordovaSQLite.execute(db, insertSql).then(function(res){
								console.log('DB - Creating default settings row...');
								console.log('DB - Settings table setup complete');
							}, function(err){
								console.log(err);
							});

						} else if (res.rows.length == 1){
							console.log('DB - Settings table setup complete');
						} else {
							console.log('Too many settings rows!!', res.rows);
						}

					}, function(err){
						console.log(err);
					});


			    }, function(err){
			    	console.log(err);
			    });
				
			},
			setSetting: function(setting, value) {
				// set settings
			},
			getSetting: function(setting) {
				return true;
			},
			setAllSettings: function(settings) {
				var sql = 'UPDATE settings SET Radio=' + settings.radio +
					', ItemSelect=' + settings.itemSelect +
					', SliderBar=' + settings.sliderBar +
					', Switch1=' + (settings.switch1 ? 1 : 0) +
					', Switch2=' + (settings.switch2 ? 1 : 0) +
					', Check1=' + (settings.check1 ? 1 : 0) +
					', Check2=' + (settings.check2 ? 1 : 0) +
					', Check3=' + (settings.check3 ? 1 : 0) +
					' WHERE SettingId=1';
				console.log('sql',sql);
				$cordovaSQLite.execute(db, sql).then(function (res) {
					console.log('rowsAffected', res.rowsAffected);
				}, function(err){
					console.log(err);
				});
			},
			getAllSettings: function(callback) {
				// set all settings

				var sql = 'SELECT * FROM settings WHERE SettingId=1';
				$cordovaSQLite.execute(db, sql).then(function(res){
					var settings = {
						itemSelect: res.rows.item(0).ItemSelect,
						sliderBar: res.rows.item(0).SliderBar,
						radio: res.rows.item(0).Radio,
						switch1: res.rows.item(0).Switch1 ? true : false,
						switch2: res.rows.item(0).Switch2 ? true : false,
						check1: res.rows.item(0).Check1 ? true : false,
						check2: res.rows.item(0).Check2 ? true : false,
						check3: res.rows.item(0).Check3 ? true : false
					};

					return callback(null, settings);

				}, function(err){
					return callback(err);
				});				
			}
		}
	}])

	.factory('$localstorage', ['$window', function($window){
		return {
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			}
		}
	}]);
