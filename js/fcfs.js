function submit_fcfs(e){

	e.preventDefault();

	var p1_burst = parseInt($('#p1_burst').val()),
	p2_burst = parseInt($('#p2_burst').val()),
	p3_burst = parseInt($('#p3_burst').val()),
	p4_burst = parseInt($('#p4_burst').val()),
	p5_burst = parseInt($('#p5_burst').val()),
	burst_sum = p1_burst+p2_burst+p3_burst+p4_burst+p5_burst;

	var p1_obj = {
		burst : p1_burst,
		start : 0,
		end   : p1_burst
	};

	var p2_obj = {
		burst : p2_burst,
		start : p1_obj.end,
		end   : p1_obj.end + p2_burst
	};

	var p3_obj = {
		burst : p3_burst,
		start : p2_obj.end,
		end   : p2_obj.end + p3_burst
	};

	var p4_obj = {
		burst : p4_burst,
		start : p3_obj.end,
		end   : p3_obj.end + p4_burst
	};

	var p5_obj = {
		burst : p5_burst,
		start : p4_obj.end,
		end   : p4_obj.end + p5_burst
	};

	var options = {
	    phases: [
	      { start: 0, end: burst_sum, indicatorsEvery: 1, share: 1 },
	    ],    
	    barHeight: 45,
	    fontSize: 16
	  };

  var data = [
    [

      { id: 'P1', start: p1_obj.start, end: p1_obj.end, className: 'style--p1'},
      { id: 'P2', start: p2_obj.start, end: p2_obj.end, className: 'style--p2'},
      { id: 'P3', start: p3_obj.start, end: p3_obj.end, className: 'style--p3'},
      { id: 'P4', start: p4_obj.start, end: p4_obj.end, className: 'style--p4'},
	  { id: 'P5', start: p5_obj.start, end: p5_obj.end, className: 'style--p5'},



    ]
  ];

  var timeline = $('#timeline');
    timeline.show();
  timeline.simpleTimeline(options, data);    



}