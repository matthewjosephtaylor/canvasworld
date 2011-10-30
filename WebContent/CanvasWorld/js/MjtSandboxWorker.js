
onmessage = function(e)
{
	if (e.data == "start")
	{
		done();
	}

}

function done()
{
	postMessage("done");
}
