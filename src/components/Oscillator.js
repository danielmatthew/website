import React from 'react';

export default () => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'square';
  oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  this.maxFreq = 6000;
  this.maxVol = 0.2;
  const initialFreq = 3000;
  const initialVol = 0.001;

  oscillator.detune.value = 100;
  oscillator.start(0);

  oscillator.onended = () => {
    console.log('your tone has now stopped playinh');
  };

  gainNode.gain.value = initialVol;
  gainNode.gain.minValue = initialVol;
  gainNode.gain.maxValue = initialVol;
};
