mjt.require("MjtStorage", function()
{

	function MjtStorageWebSql()
	{
		this.db = null;
		console.log("type of this: " + this.constructor.name);
		this.init();
	}

	this.MjtStorageWebSql = MjtStorageWebSql; // needed because we are defining inside of a callback function;

	MjtStorageWebSql.prototype = new MjtStorage();

	MjtStorageWebSql.prototype.init = function init()
	{
		console.log("initing MjtStorageWebSql...");
		var o = this;
		var f = function(db)
		{
			o.createDatabase(db);
		};
		this.db = openDatabase('MjtStorageWebSqlDb', '1.0', 'MjtStorageWebSql Database', 2 * 1024 * 1024, f);
		console.log("MjtStorageWebSql initialized.");
	};

	MjtStorageWebSql.prototype.createDatabase = function createDatabase(db)
	{
		console.log("creating database...");
		db.transaction(function(tx)
		{
			tx.executeSql('CREATE TABLE strings (idx INTEGER PRIMARY KEY, value TEXT)');
			tx.executeSql('CREATE TABLE type_defs (idx INTEGER PRIMARY KEY, value INTEGER)');
			tx.executeSql('CREATE TABLE object_types (idx INTEGER PRIMARY KEY, value INTEGER)');
			tx.executeSql('CREATE TABLE arrays (idx INTEGER PRIMARY KEY, key_index INTEGER, value_type INTEGER, value_ref_idx INTEGER)');
			tx.executeSql('CREATE TABLE objects (idx INTEGER PRIMARY KEY, key_index INTEGER, value_type INTEGER, value_ref_idx INTEGER)');
		}, this.errorHandler);
		console.log("created database.");
	};

	MjtStorageWebSql.prototype.getStringIndex = function getStringIndex(text, callbackFunction)
	{
		this.db.transaction(function(tx)
				{
					tx.executeSql('SELECT idx FROM strings where value = ?', [text], callbackFunction, this.errorHandler);
				}, this.errorHandler);
	};
	
	MjtStorageWebSql.prototype.setStringIndex = function setStringIndex(idx, text, callbackFunction)
	{
		this.db.transaction(function(tx)
				{
					tx.executeSql('INSERT INTO strings(idx, value) VALUES(?, ?)', [idx, text], callbackFunction, this.errorHandler);
				}, this.errorHandler);
	};
	
	MjtStorageWebSql.prototype.serialize = function serialize(targetObject)
	{
		var parent = this.serialize;
		var typeName = targetObject.constructor.name;
		var f = function(tx, rs)
		{
			if(rs.rows.length == 0)
			{
				this.setStringIndex(2, typeName, f);
			}
			else
			{	
				var typeStringIdx = rs.rows.item(0);
				console.log("typeStringIdx: " + typeStringIdx);
			}
		};
		f.parent = this.serialize;
		this.getStringIndex(typeName, f);
	};

});