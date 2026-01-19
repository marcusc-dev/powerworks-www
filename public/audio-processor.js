/**
 * AudioWorklet Processor for Gemini Live API
 * Handles microphone input downsampling from browser's native rate (typically 44.1/48kHz) to 16kHz
 * and converts Float32 samples to Int16 PCM format required by Gemini
 */

class AudioProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.bufferSize = 2048;
    this.inputBuffer = [];
    this.inputSampleRate = sampleRate; // From AudioWorkletGlobalScope
    this.outputSampleRate = 16000;
    this.resampleRatio = this.inputSampleRate / this.outputSampleRate;
  }

  /**
   * Downsample audio from input sample rate to 16kHz
   */
  downsample(inputBuffer) {
    const outputLength = Math.floor(inputBuffer.length / this.resampleRatio);
    const output = new Float32Array(outputLength);

    for (let i = 0; i < outputLength; i++) {
      // Simple linear interpolation for downsampling
      const inputIndex = i * this.resampleRatio;
      const index = Math.floor(inputIndex);
      const fraction = inputIndex - index;

      if (index + 1 < inputBuffer.length) {
        output[i] = inputBuffer[index] * (1 - fraction) + inputBuffer[index + 1] * fraction;
      } else {
        output[i] = inputBuffer[index];
      }
    }

    return output;
  }

  /**
   * Convert Float32 (-1 to 1) to Int16 PCM
   */
  float32ToInt16(float32Array) {
    const int16Array = new Int16Array(float32Array.length);

    for (let i = 0; i < float32Array.length; i++) {
      // Clamp value between -1 and 1
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      // Convert to Int16
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }

    return int16Array;
  }

  /**
   * Process audio input
   */
  process(inputs, outputs, parameters) {
    const input = inputs[0];

    if (input && input.length > 0 && input[0].length > 0) {
      // Get mono channel (first channel)
      const channelData = input[0];

      // Add to buffer
      for (let i = 0; i < channelData.length; i++) {
        this.inputBuffer.push(channelData[i]);
      }

      // Process when we have enough samples
      if (this.inputBuffer.length >= this.bufferSize) {
        // Extract buffer
        const bufferToProcess = new Float32Array(this.inputBuffer.splice(0, this.bufferSize));

        // Downsample to 16kHz
        const downsampled = this.downsample(bufferToProcess);

        // Convert to Int16 PCM
        const pcmData = this.float32ToInt16(downsampled);

        // Send to main thread
        this.port.postMessage({
          type: 'audio',
          audio: pcmData.buffer,
        }, [pcmData.buffer]);
      }
    }

    return true; // Keep processor alive
  }
}

registerProcessor('audio-processor', AudioProcessor);
