<template>
  <div>
    <div class=""></div>
    <div class="terminal crt">
      Test! 123
    </div>
  </div>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
  .terminal {
    font-family: Share Tech Mono;
    font-size: 150%;
    color: #1bd9db;
    background-color: #222;
    height: 100vh;
    padding: 5px;
  }
@keyframes flicker {
  @for $i from 1 through 20 {
    #{($i*5%)} {
      opacity: random(10000) / 10000;
    }
  }
}
@keyframes textShadow {
  @for $i from 1 through 20 {
    #{($i*5%)} {
      $random1: random(10000) / 10000;
      $random2: random(40) / 10;
      text-shadow: ($random1 + $random2) * 1px 0 1px rgba(0,30,255,0.5), -($random1 + $random2) * 1px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
  }
}
.crt::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(18, 16, 16, 0.15);
  opacity: 0;
  z-index: 2;
  pointer-events: none;
  animation: flicker 0.15s infinite;
}
.crt::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
  z-index: 2;
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}
.crt {
  animation: textShadow 1.6s infinite;
}

</style>
