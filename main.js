document.addEventListener("DOMContentLoaded", () => {
    let unicycle = new UnicycleRangeSlider("#unicycle1");
  });
  
  class UnicycleRangeSlider {
    constructor(el) {
      this.wheel = document.querySelector(`${el} input[type=range]`);
      this.marker = document.querySelector(`${el} .unicycle__marker`);
      this.flag = document.querySelector(`${el} .unicycle__flag`);
  
      this.updateBodyPos();
      this.wheel.addEventListener("input", () => {this.updateBodyPos();});
    }
    updateBodyPos() {
      let max = this.wheel.max,
      min = this.wheel.min,
      realValue = this.wheel.value,
      ticks = max - min,
      relValue = realValue - min,
      percent = relValue / ticks,
      revs = 1,
      left = percent * 100,
      emAdjust = percent * 1.5,
      pedalRot = percent * (360 * revs),
      period = 1 / (ticks / revs / 2) * relValue * Math.PI,
      rightLegRot = -22.5 * Math.sin(period + 1.85 * Math.PI) - 22.5,
      rightLowerLegRot = 45 * Math.sin(period + 0 * Math.PI) + 45,
      leftLegRot = -22.5 * Math.sin(period + 2.85 * Math.PI) - 22.5,
      leftLowerLegRot = 45 * Math.sin(period + 1 * Math.PI) + 45,
      cssVars = {
        "--pedalRot": `${pedalRot}deg`,
        "--rightLegRot": `${rightLegRot}deg`,
        "--rightLowerLegRot": `${rightLowerLegRot}deg`,
        "--leftLegRot": `${leftLegRot}deg`,
        "--leftLowerLegRot": `${leftLowerLegRot}deg` };
  
      // position stick figure and unicycle body
      this.marker.style.left = `calc(${left}% - ${emAdjust}em)`;
      // update the variables in CSS
      for (let v in cssVars)
      this.marker.style.setProperty(v, cssVars[v]);
      // number in the flag
      this.flag.innerHTML = realValue;
    }}