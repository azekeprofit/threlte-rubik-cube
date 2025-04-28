import { useTask } from "@threlte/core";

export class Pulse {
  value = $state(0);
  task = useTask((delta: any) => {
    this.value += delta*this.speed;
    if(this.speed>0 && this.value>this.end){
        this.speed=-this.speed;
        this.value=this.end;
    }
    if(this.speed<0 && this.value<this.start){
        this.speed=-this.speed;
        this.value=this.start;
    }

  });
  speed = 0;
  period = 1;
  start = 0;
  end=0;

  constructor(start: number, end:number, speed: number) {
    this.start = start;
    this.end = end;
    this.speed = speed;
    this.value=start;
  }
}
