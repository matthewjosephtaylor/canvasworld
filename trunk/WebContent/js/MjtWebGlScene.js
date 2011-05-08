mjt.require("MjtWebGlBlock", function defineMjtWebGlSceneCallback()
{

	MjtWebGlScene = function MjtWebGlScene()
	{
		this.x = 1;
		this.y = 1;
		this.i = 0;
		this.j = 0;

	}

	MjtWebGlScene.prototype.load = function load()
	{
		this.x = 10;
		this.y = 10;
		this.addNextCubeset();
		// var cube = new MjtWebGlCube(mjtWebGlToolkit.gl, [0,0,90]);
		// mjtWebGlToolkit.geometricObjects.push(cube);
		// document.getElementById("cubeCount").innerHTML = "Cube Count: " + mjtWebGlToolkit.geometricObjects.length;
	}

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
	}

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
							var cube = new MjtWebGlBlock([ i * 2.5, j * 2.5, Math.random() * x * 5 ]);
							MjtWebGlToolkit.getInstance().geometricObjects.push(cube);
							document.getElementById("cubeCount").innerHTML = "Cube Count: " + MjtWebGlToolkit.getInstance().geometricObjects.length;
						}
						// catch (e)
						// {
						// console.log(e)
						// }
					};
				};
				setTimeout(f(this.i, this.j, this.x), Math.random() * 10000);
			}
		}

	};

});