var srtf = {
  step: 0,
  steps: 0,
  processes: [],
  data: [],
  lastKey: null,
  $timeline: $('#timeline'),

  perform() {
    this.reset();
    for (var i=0; i < this.steps; i++) {
      this.performStep();
    }
    this.showTimeline();
  },

  reset() {
    this.data = [];
    this.step = 0;
    this.steps = 0;
    this.lastKey = null;
    this.resetProcesses();
  },

  resetProcesses() {
    steps = 0;
    this.processes = $('.process').map(function(k){
      var $this = $(this);
      var burst = parseInt($this.find('.burst')[0].value);
      steps += burst;

      return {
        arrival: parseInt($this.find('.arrival')[0].value),
        burst: burst,
        key: k
      }
    });

    this.steps = steps;
  },

  performStep() {
    var key = this.getProcessKey();

    if ( key != null ) {
      if ( key === this.lastKey ) {
        this.data[this.data.length-1].end += 1;
      }
      else {
        var p = {
          start: this.step,
          end: this.step + 1,
          className: 'style--p' + (key+1),
          id: 'P' + (key+1)
        }
        this.data.push(p);
      }
      this.processes[key].burst -= 1;
    }
    this.lastKey = key;
    this.step += 1;
  },

  getProcessKey() {
    var key = null;
    var step = this.step;
    var justArrived = _.filter(this.processes, function(p) {
      return p.arrival === step;
    });

    if ( justArrived.length ) {
      var shortest = _.orderBy(justArrived, 'burst')[0];
      if ( this.lastKey === null || shortest.burst < this.process().burst ) {
        key = shortest.key;
      }
    }
    else if ( this.process().burst === 0 ) {
      nextProcess = _.filter(this.processes, function(p) { return p.arrival < step && p.burst > 0 })[0];
      key = nextProcess ? nextProcess.key : null;
    }
    else {
      key = this.lastKey;
    }

    return key;
  },

  process() {
    return this.processes[this.lastKey];
  },

  showTimeline() {
    var options = {
      phases: [
        { start: 0, end: this.steps, indicatorsEvery: 1, share: 1 },
      ],
      barHeight: 45,
      fontSize: 16
    }

    console.table(this.data);

    this.$timeline.show();
    this.$timeline.simpleTimeline(options, [this.data]);
  }
}

$('button').on('click', function(){
  srtf.perform();
});
