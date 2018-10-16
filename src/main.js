const setPosition = function (x, y, elId) {
  const obj = document.getElementById(elId);
  obj.style.top = y + "px";
  obj.style.left = x + "px";
  // console.log(obj.style.left)

}


const addMarker = function (x, y) {
  var marker = document.createElement('div')
  marker.classList.add('blueBall')
  marker.style.left = x + 'px'
  marker.style.top = y + 'px';
  document.getElementById('view').appendChild(marker);
}

var angularFreqSlider = document.getElementById('angularFreqSlider');
var amplitudeSlider = document.getElementById('amplitudeSlider');
var description = document.getElementById('description')

const animate = function () {
  let a = 200;
  let w = .1;
  const del = 0;
  let t = 0;
  let x = 0;
  offsetX = a;
  let m = 1;
  let v = 0;
  addMarker(offsetX, 0); // midpoint
  // addMarker(offsetX - a, 0); // lefttrima 
  // addMarker(offsetX + a, 0); // rightrima
  EPBar = document.getElementById('EP');
  EKBar = document.getElementById('EK');


  setInterval(function () {
    t += 1;
    w = angularFreqSlider.value / 200;
    a = amplitudeSlider.value;
    x = a * Math.sin(w * t + del);
    v = a * w * Math.cos(w * t + del);
    Ek = .5 * m * v * v;
    Ep = .5 * m * w*w * x*x;
    acceleration = -a * w * w * Math.sin(w * t + del);
    //console.log(v, Ek, acceleration);
    setPosition(x + offsetX, 0, 'ball');
    EPBar.style.width = Ep+'px';
    EKBar.style.width = Ek+'px';
  }, 100);

  setInterval(function(){
    description.innerHTML =
    `প্রতি মূহুর্তে বেগ, v = ${Math.round(v * 100) / 100} <br/>
    প্রতি মূহুর্তে ত্বরণ = ${Math.round(acceleration * 100) / 100} <br/>
    প্রতি মূহুর্তে বিভব শক্তি, (1/2)m w^2 x^2 = ${Math.round(Ek * 100) / 100} <br/>
    প্রতি মূহুর্তে গতিশক্তি, (1/2) m v^2 = ${Math.round(Ep * 100) / 100} <br/>
    প্রতি মূহুর্তে মোট শক্তি, H = ${Math.round((Ek+Ep) * 100) / 100}
    `
  }, 200)
}

animate()