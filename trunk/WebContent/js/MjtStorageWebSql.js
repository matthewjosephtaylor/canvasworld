mjt.require("MjtStorage", function()
{

	MjtStorageWebSql function MjtStorageWebSql(version)
	{
		this.db = null;
		console.log("type of this: " + this.constructor.name);
		this.init(version);
	}


	MjtStorageWebSql.prototype = MjtStorage.getInstance();

	MjtStorageWebSql.prototype.init = function init(version)
	{
		console.log("initing MjtStorageWebSql...");
		var o = this;
		var f = function(db)
		{
			o.createDatabase(db);
		};
		this.db = openDatabase('MjtStorageWebSqlDb_' + version, version, 'MjtStorageWebSql Database', 2 * 1024 * 1024, f);
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
	
	MjtStorageWebSql.prototype._createInsertParameterObject = function _createInsertParameterObject(criteria)
	{
		var result = {};
		result.parameterPlaceholders = new Array();
		result.parameterNames = new Array();
		result.parameterValues = new Array();
		result.parameterNamesAndPlaceholders = new Array();
		
		for(var i in criteria)
		{
			result.parameterNames.push(i);
			result.parameterPlaceholders.push("?");
			result.parameterValues.push(criteria[i]);
		}

		return result;
	};

	MjtStorageWebSql.prototype._createSelectParameterObject = function _createSelectParameterObject(criteria)
	{
		var result = {};
		result.parameterPlaceholders = new Array();
		result.parameterNames = new Array();
		result.parameterValues = new Array();
		result.parameterNamesAndPlaceholders = new Array();
		

		for(var i in criteria.equals)
		{
			result.parameterNamesAndPlaceholders.push(i + " = ?");
			result.parameterValues.push(criteria[i]);
		}

		for(var i in criteria.notEquals)
		{
			result.parameterNamesAndPlaceholders.push(i + " <> ?");
			result.parameterValues.push(criteria[i]);
		}
		return result;
	};
	
	MjtStorageWebSql.prototype._getInsertStatementStringAndParameters = function _getInsertStatementStringAndParameters(tableName, values)
	{
		var result = {};
		var parameterObject = this._createInsertParameterObject(values);
		result.parameterValues = parameterObject.parameterValues;
		result.statementString = 'INSERT INTO ' + tableName + '(' +parameterObject.parameterNames.join(",") + ') VALUES('+parameterObject.parameterPlaceholders.join(",")+')';
		return result;
	};
	
	MjtStorageWebSql.prototype._getSelectStatementStringAndParameters = function _getSelectStatementStringAndParameters(tableName, criteria)
	{
		var result = {};
		var parameterObject = this._createSelectParameterObject(criteria);
		result.parameterValues = parameterObject.parameterValues;
		result.statementString = 'SELECT * FROM ' + tableName + ' WHERE ' + parameterObject.parameterNamesAndPlaceholders.join(" AND ");
		return result;
	};

	MjtStorageWebSql.prototype._performSelect = function _performInsert(tableName, criteria, callbackFunction)
	{
		var sql = this._getSelectStatementStringAndParameters(tableName, criteria);
		this.db.transaction(function(tx)
		{
			console.log("execing SQL:")
			console.log(sql)
			tx.executeSql(sql.statementString, sql.parameterValues, callbackFunction, this.errorHandler);
		}, this.errorHandler);
	};

	
	MjtStorageWebSql.prototype._performInsert = function _performInsert(tableName, valuesMap, callbackFunction)
	{
		var sql = this._getInsertStatementStringAndParameters(tableName, valuesMap);
		this.db.transaction(function(tx)
		{
			console.log("execing SQL:")
			console.log(sql)
			tx.executeSql(sql.statementString, sql.parameterValues, callbackFunction, this.errorHandler);
		}, this.errorHandler);
	};
	
	MjtStorageWebSql.prototype.setStringIndex = function setStringIndex(idx, text, callbackFunction)
	{
		this.db.transaction(function(tx)
				{
					tx.executeSql('INSERT INTO strings(idx, value) VALUES(?, ?)', [idx, text], callbackFunction, this.errorHandler);
				}, this.errorHandler);
	};
	
//	MjtStorageWebSql.prototype.persistExplodedObject = function persistExplodedObject(targetObject, )
//	{
//		this.db.transaction(function(tx)
//				{
//					tx.executeSql('INSERT INTO strings(idx, value) VALUES(?, ?)', [idx, text], callbackFunction, this.errorHandler);
//				}, this.errorHandler);
//	}
	
	MjtStorageWebSql.prototype.serialize = function serialize(targetObject)
	{
		
		var serializer = new MjtFunction(function()
		{
			
		});
		
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

	mjt.singletonify(MjtStorageWebSql);
	
});