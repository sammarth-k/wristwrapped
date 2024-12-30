function downloadIG() {
  document.getElementById("igstory").style.display = "block";
  var svg = document.getElementById("igsvg");
  var svgData = new XMLSerializer().serializeToString(svg);
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var img = new Image();
  img.onload = function () {
    var scaleFactor = 10; // Increase this value for higher resolution
    canvas.width = img.width * scaleFactor;
    canvas.height = img.height * scaleFactor;
    ctx.scale(scaleFactor, scaleFactor);

    // Fill the canvas with white color
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0, img.width, img.height);
    var imgsrc = canvas.toDataURL("image/png");
    document.getElementById("igstoryimg").src = imgsrc; // Send image to #igstory img
  };
  img.src = "data:image/svg+xml;base64," + btoa(svgData);
}

document.getElementById("igpngbutton").addEventListener("click", downloadIG);

document.getElementById("igstoryclose").addEventListener("click", function () {
  document.getElementById("igstory").style.display = "none";
});

document.getElementById("igdownload").addEventListener("click", function () {
  var a = document.createElement("a");
  a.href = document.getElementById("igstoryimg").src;
  a.download = "wristwrapped.png";
  a.click();
});
