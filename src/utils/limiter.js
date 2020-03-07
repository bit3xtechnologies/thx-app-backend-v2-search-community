import Bottleneck from "bottleneck";

export const limiter = new Bottleneck({
  maxConcurrent: 25,
  minTime: 40
});
