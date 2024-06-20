<template>
    <div>
      <audio-recorder
        :upload-url="uploadUrl"
        :attempts="attempts"
        :time="time"
        :headers="headers"
        @before-recording="callback"
        @pause-recording="callback"
        @after-recording="callback"
        @select-record="callback"
        @before-upload="callback"
        @successful-upload="callback"
        @failed-upload="callback"
      />
    </div>
  </template>
  
  <script setup>
  import AudioRecorder from 'vue3-mic-recorder';
  
  const uploadUrl = import.meta.env.VITE_FIRE_BASE_STORAGE_BUCKET;
  const attempts = 3;
  const time = 2;
  const headers = {
    
  };
  
  const callback = (data) => {
    console.debug(data);
  };
  </script>

<style lang="">
    
</style>