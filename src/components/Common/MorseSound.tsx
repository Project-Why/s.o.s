import { useAppSelector } from 'hooks';

import { selectMode } from 'store/mode';

import { MorseCode } from 'common/morse';

import React, { CSSProperties, useEffect, useRef, useState } from 'react';

const MorseSound: React.FC<CSSProperties> = ({ ...cssProps }) => {
  const dotTime = 80; // ms
  const dashTime = dotTime * 3;
  const blankTime = dotTime;

  const audioContextRef = useRef<AudioContext | null>(null);
  const sineGainNodeRef = useRef<GainNode | null>(null);
  const noiseGainNodeRef = useRef<GainNode | null>(null);
  const sineOscillatorRef = useRef<OscillatorNode | null>(null);
  const noiseOscillatorRef = useRef<OscillatorNode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCodeIndex, setCurrentCodeIndex] = useState<number>(0);
  const mode = useAppSelector(selectMode);

  const createAudioContext = () => {
    // Create AudioContext
    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    // Create a GainNode
    if (!sineGainNodeRef.current) {
      sineGainNodeRef.current = audioContextRef.current.createGain();
      sineGainNodeRef.current.gain.setValueAtTime(
        0.3,
        audioContextRef.current.currentTime,
      ); // Set gain to 30%
      sineGainNodeRef.current.connect(audioContextRef.current.destination);
    }
    if (!noiseGainNodeRef.current) {
      noiseGainNodeRef.current = audioContextRef.current.createGain();
      noiseGainNodeRef.current.gain.setValueAtTime(
        0.005,
        audioContextRef.current.currentTime,
      ); // Set gain to 0.5%
      noiseGainNodeRef.current.connect(audioContextRef.current.destination);
    }
    return {
      audioContext: audioContextRef.current,
      sineGainNode: sineGainNodeRef.current,
      noiseGainNode: noiseGainNodeRef.current,
    };
  };

  const playSineWave = (duration: number) => {
    const { audioContext, sineGainNode } = createAudioContext();

    // Create a sine wave oscillator
    sineOscillatorRef.current = audioContext.createOscillator();
    sineOscillatorRef.current.type = 'sine'; // Sine wave
    sineOscillatorRef.current.frequency.setValueAtTime(
      440,
      audioContext.currentTime,
    ); // A4 (440 Hz)
    sineOscillatorRef.current.connect(sineGainNode);
    sineOscillatorRef.current.start();

    // Stop the sine wave after the specified duration
    sineOscillatorRef.current.stop(audioContext.currentTime + duration / 1000);
  };

  const playNoise = () => {
    const { audioContext, noiseGainNode } = createAudioContext();

    // Create a noise oscillator
    noiseOscillatorRef.current = audioContext.createOscillator();
    noiseOscillatorRef.current.type = 'square'; // Square wave for noise effect
    noiseOscillatorRef.current.frequency.setValueAtTime(
      50,
      audioContext.currentTime,
    ); // Low frequency (50 Hz)
    noiseOscillatorRef.current.connect(noiseGainNode);
    noiseOscillatorRef.current.start();
  };

  const PauseNoise = () => {
    if (noiseOscillatorRef.current) {
      noiseOscillatorRef.current.stop();
      noiseOscillatorRef.current.disconnect();
      noiseOscillatorRef.current = null;
    }
    if (sineOscillatorRef.current) {
      sineOscillatorRef.current.stop();
      sineOscillatorRef.current.disconnect();
      sineOscillatorRef.current = null;
    }
  };

  const playCode = async (code: MorseCode) => {
    setIsPlaying(true);

    let totalTime = dotTime;

    // Play Code
    Array.from(code).forEach(async (symbol) => {
      if (symbol === '.') {
        setTimeout(() => playSineWave(dotTime), totalTime);
        totalTime += dotTime + blankTime;
      } else if (symbol === '-') {
        setTimeout(() => playSineWave(dashTime), totalTime);
        totalTime += dashTime + blankTime;
      }
    });

    setTimeout(() => {
      setIsPlaying(false);
    }, totalTime);
  };

  useEffect(() => {
    if (
      !isPlaying &&
      mode.decryptingState.code &&
      currentCodeIndex !== mode.decryptingState.codeIndex
    ) {
      setCurrentCodeIndex(mode.decryptingState.codeIndex);
      playCode(mode.decryptingState.code);
    }
  }, [mode.decryptingState.code, mode.decryptingState.codeIndex, isPlaying]);

  useEffect(() => {
    if (mode.currentMode === 'Decrypting') {
      playNoise();
    } else {
      PauseNoise();
    }
  }, [mode.currentMode]);

  return <div id='Morse Code Sound' style={{ ...cssProps }} />;
};

export default MorseSound;
