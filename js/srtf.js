class Srtf extends Visualizer{
  getProcessKey() {
    var key = null;
    var step = this.step;
    var justArrived = _.filter(this.processes, function(p) {
      return p.arrival === step;
    });
    var previousProcess = this.previousProcess();

    if ( !previousProcess || previousProcess.burst === 0 ) {
      var waiting = _.filter(this.processes, function(p) { return p.arrival <= step && p.burst > 0 });
      var shortest =  _.orderBy(waiting, 'burst')[0];
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
