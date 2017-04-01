class Rr extends Visualizer{
  reset() {
    super.reset();
    this.quantum = parseInt($('[name="quantum"]').val()) || 1;
    this.queue = [];
  }

  perform() {
    this.reset();
    while (this.steps > 0 && this.step < 20) {
      this.performStep();
    }
    this.showTimeline();
  }

  getProcessKey() {
    let justArrived = _.filter(this.processes, p => p.arrival === this.step);
    let previousProcess = this.previousProcess();
    let lastPeriod = this.data.slice(-1)[0];

    this.queue = [...this.queue, ...justArrived.map(p => p.key)];

    if (previousProcess) {
      let lastPeriodLength = lastPeriod.end - lastPeriod.start;

      // take next in queue
      if (previousProcess.burst === 0 || lastPeriodLength >= this.quantum ) {
        this.queue.shift();

        // enqueue this process at end
        if (previousProcess.burst > 0) {
          this.queue.push(previousProcess.key);
        }
      }
    }

    return this.queue[0];
  }
}

var vis = new Rr();
