
onmessage = function(message)
{
	message.console.log("received message: " + message);
	message.console.log(message);
	
	message.context.uniformMatrix4fv(message.mjtWebGlToolkit.u_modelViewMatrixLoc, false, message.modelViewMatrixFloat32);
	message.context.drawElements(message.context.TRIANGLES, message.mjtWebGlToolkit.protoCube.numIndices, message.context.UNSIGNED_BYTE, 0);
}

function done()
{
	postMessage(typeof Float32Array);
}
