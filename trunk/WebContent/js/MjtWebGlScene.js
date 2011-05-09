mjt.require("MjtWebGlBlock", "MjtStorageLocal", function defineMjtWebGlSceneCallback()
{

	MjtWebGlScene = function MjtWebGlScene()
	{
		this.x = 1;
		this.y = 1;
		this.i = 0;
		this.j = 0;

	};

	MjtWebGlScene.prototype.createHorizon = function createHorizon()
	{
		var h = 1000;
		var block = new MjtWebGlBlock([ -h / 2, -10, -h / 2 ], null, [ h, 0.1, h ]);
		block.topColor = [ 255 / 255, 223 / 255, 128 / 255, 1 ];
		block.textureImageURL = "img/test_texture.jpg";
		MjtWebGlToolkit.getInstance().geometricObjects.push(block);
	};

	MjtWebGlScene.prototype.createNew = function createNew()
	{
		this.x = 10;
		this.y = 10;
		this.addNextCubeset();
		// var cube = new MjtWebGlCube(mjtWebGlToolkit.gl, [0,0,90]);
		// mjtWebGlToolkit.geometricObjects.push(cube);
		// document.getElementById("cubeCount").innerHTML = "Cube Count: " + mjtWebGlToolkit.geometricObjects.length;
	};

	MjtWebGlScene.prototype.clear = function clear()
	{
		var store = MjtStorageLocal.getInstance();
		MjtWebGlToolkit.getInstance().geometricObjects = [];
	};

	MjtWebGlScene.prototype.save = function save()
	{
		var store = MjtStorageLocal.getInstance();
		store.clear();
		// console.log("persisting: " + MjtWebGlToolkit.getInstance().geometricObjects)
		for ( var i in MjtWebGlToolkit.getInstance().geometricObjects)
		{
			var geometricObject = MjtWebGlToolkit.getInstance().geometricObjects[i];
			store.set(geometricObject);
		}
	};

	MjtWebGlScene.prototype.load = function load()
	{
		this.createHorizon();
		var store = MjtStorageLocal.getInstance();
		var lastResult = null;
		store.get([ MjtWebGlBlock.prototype.constructor.name, [] ], function(result)
		{
			MjtWebGlToolkit.getInstance().geometricObjects.push(result);
			document.getElementById("cubeCount").innerHTML = "Cube Count: " + MjtWebGlToolkit.getInstance().geometricObjects.length;
			// console.log("Got result: ");
			// console.log(JSON.stringify(result));
			// console.log(result);
			// resultArray.push(result);
			lastResult = result;
		}, function(matchCount)
		{
			console.log("matchCount: " + matchCount)
			console.log(lastResult);
			// console.log("resultArray.length: " + resultArray.length)
			// console.log(resultArray);
		});

	};

	MjtWebGlScene.prototype.addNextCubeset = function addNextCubeset()
	{
		var o = this;
		function f()
		{
			o._addNextCubeset();
		}
		;
		f();
		// setTimeout(f, 1);
	};

	MjtWebGlScene.prototype._addNextCubeset = function _addNextCubeset()
	{
		this.i = -this.x;
		this.j = -this.y;

		this.x += 5;
		this.y += 5;

		// this.geometricObjects = [];

		for (; this.j <= this.y; this.j++)
		{
			console.log("j=" + this.j);
			for (this.i = -this.x; this.i <= this.x; this.i++)
			{
				var f = function(i, j, x)
				{
					return function g()
					{
						// try
						{
							var block = new MjtWebGlBlock([ i * 2.5, j * 2.5, Math.random() * x * 5 ]);
							MjtWebGlToolkit.getInstance().geometricObjects.push(block);
							document.getElementById("cubeCount").innerHTML = "Cube Count: " + MjtWebGlToolkit.getInstance().geometricObjects.length;
						}
						// catch (e)
						// {
						// console.log(e)
						// }
					};
				};
				f(this.i, this.j, this.x)();

				// setTimeout(f(this.i, this.j, this.x), Math.random() * 10000);
			}
		}

	};

	MjtWebGlScene.prototype.createTerrain = function createTerrain()
	{
		var y = 1;
		var b = [];
		for ( var i = 0; i < 200; i += 2)
		{
			var d = 1;
			for ( var j = 0; j < 200; j += 2)
			{
				var c = b[j];
				if (!c)
				{
					c = 1;
				}
				var x = i;
				var z = j;
				var w = c + d;
				y = (Math.random() * w) - w + 1;
				b[j] = y;
				d = y;

				var f = function(x,y,z)
				{
					return function()
					{
						var block = new MjtWebGlBlock([ x, y, z ], null, [1,y,1]);
						MjtWebGlToolkit.getInstance().geometricObjects.push(block);
						if(y<0)
						{
							block.textureImageURL = "img/block_texture.png";
						}
						else
						{
							block.setSolidColor([0.5/(y+1),1/(y+1),0.2/(y+1),1]);
						}	
						document.getElementById("cubeCount").innerHTML = "Cube Count: " + MjtWebGlToolkit.getInstance().geometricObjects.length;
					};
				};
				setTimeout(f(x,y,z), (i+j) *100);
			}
		}
	}

	mjt.singletonify(MjtWebGlScene);

});