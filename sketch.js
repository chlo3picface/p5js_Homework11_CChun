async function setup(){
  createCanvas(1000,600);
  describe('The sketch displays the frequency spectrum and waveform of the sound that plays.');
  soundFile = await loadSound('/assets/music.wav')

  //create a new 32-band fft analysis object
  fft = new p5.FFT(32);
    soundFile.connect(fft);
}

function draw(){
  background(155, 200, 232);

  // Visualize the frequency spectrum
  let spectrum = fft.analyze();
  noStroke();
  push();
  fill(0, 9, 179);
  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);     
    let h = -height + map(spectrum[i], 0, 0.1, height, -1000);
    rect(x, height, width / spectrum.length, h )
  }
  pop();

  // Visualize the waveform
  let waveform = fft.waveform();
  push();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();
  pop();

  textAlign(CENTER);
  text('Click to start, click to stop!', width/2, 20);
}

function mousePressed() {
  if (!soundFile.isPlaying()) {
    soundFile.play();
  }
  else {
    soundFile.stop();
  }
}