class Visualizer {
  constructor() {
    this.step = 0;
    this.steps = 0;
    this.processes = {};
    this.data = [];
    this.lastKey = null;
    this.timeline = null;

    $('button.submit').on('click', this.perform.bind(this));
  }

  perform() {
    this.reset();
    while (this.steps > 0) {
      this.performStep();
    }
    this.showTimeline();
  }

  reset() {
    this.data = [];
    this.step = 0;
    this.lastKey = null;
    this.resetProcesses();
  }

  getProcessKey () {
    throw 'must extend';
  }

  resetProcesses() {
    let processes = {};

    $('.process').each(function(k){
      let $this = $(this);
      let params = {};

      $this.find('input').each(function() {
        params[this.name] = parseInt(this.value);
      });

      if (_.every(params, p => !isNaN(p))) {
        processes[k] = _.merge(params, {key: k});
      }
    });

    this.processes = processes;
    this.steps = _.reduce(this.processes, (sum, p) => { return sum + p.burst }, 0);
  }

  performStep() {
    let key = this.getProcessKey();

    if ( key != null ) {
      if ( key === this.lastKey ) {
        // just extend last interval
        this.data[this.data.length-1].end += 1;
      }
      else {
        let p = {
          start: this.step,
          end: this.step + 1,
          className: 'style--p' + (key+1),
          key: key,
          id: 'P' + (key+1)
        }
        this.data.push(p);
      }
      this.processes[key].burst -= 1;
      this.steps -= 1;
    }
    this.lastKey = key;
    this.step += 1;
  }

  previousProcess() {
    return this.processes[this.lastKey];
  }

  showTimeline() {
    let options = {
      phases: [
        { start: 0, end: this.step, indicatorsEvery: 1, share: 1 }
      ],
      barHeight: 40,
      fontSize: 16
    }

    let lines = _.groupBy(this.data, p => p.key);

    _.each(lines, (parts, key) => {
      lines[key].push({
        start: this.processes[key].arrival,
        end: _.maxBy(parts, "end").end,
        id: '',
        className: 'style--wait'
      });
    });

    let data = _.toArray(lines);

    if (!this.timeline) {
      let $timeline = $('#timeline').show();
      this.timeline = $timeline.simpleTimeline(options, data);
    }
    else {
      this.timeline.setTimelineOptions(options).setTimelineData(data).refreshTimeline();
    }

  }
}
