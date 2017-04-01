class Srtf extends Visualizer{
  getProcessKey() {
    let key = null;
    let step = this.step;
    let justArrived = _.filter(this.processes, p => p.arrival === step);
    let previousProcess = this.previousProcess();

    if ( !previousProcess || previousProcess.burst === 0 ) {
      let waiting = _.filter(this.processes, p => { return p.arrival <= step && p.burst > 0 });
      let shortest =  _.orderBy(waiting, 'burst')[0];
      key = shortest ? shortest.key : null;
    }
    else if ( justArrived.length ) {
      var shortest = _.orderBy(justArrived, 'burst')[0];
      if ( this.lastKey === null || shortest.burst < previousProcess.burst ) {
        key = shortest.key;
      }
      else{
        key = this.lastKey;
      }
    }
    else {
      key = this.lastKey;
    }

    return key;
  }
}

var vis = new Srtf();
