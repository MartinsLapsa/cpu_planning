function submit_ps(e){

	e.preventDefault();

	var p1_burst = parseInt($('#p1_burst').val()),
	p2_burst = parseInt($('#p2_burst').val()),
	p3_burst = parseInt($('#p3_burst').val()),
	p4_burst = parseInt($('#p4_burst').val()),
	p5_burst = parseInt($('#p5_burst').val()),
	burst_sum = p1_burst+p2_burst+p3_burst+p4_burst+p5_burst;


	var p1_priority= parseInt($('#p1_priority').val()),
	p2_priority = parseInt($('#p2_priority').val()),
	p3_priority = parseInt($('#p3_priority').val()),
	p4_priority = parseInt($('#p4_priority').val()),
	p5_priority = parseInt($('#p5_priority').val());


	var pList = [
	    { id: 'P1', priority: p1_priority, burst: p1_burst, start: 0, end: 0, className: 'style--p1'  },
	    { id: 'P2', priority: p2_priority, burst: p2_burst, start: 0, end: 0, className: 'style--p2'  },
	    { id: 'P3', priority: p3_priority, burst: p3_burst, start: 0, end: 0, className: 'style--p3'  },
	    { id: 'P4', priority: p4_priority, burst: p4_burst, start: 0, end: 0, className: 'style--p4'  },
	    { id: 'P5', priority: p5_priority, burst: p5_burst, start: 0, end: 0, className: 'style--p5'  },
	];


	pList.sort(function(a, b) {
	    return a.priority - b.priority;
	});


	console.log(pList);

	$(pList).each(function(key, val){
		var prev = pList[key-1]
		var curr = val;

		if(prev == undefined){
			curr.start = 0;
			curr.end = curr.burst;
			return;
		}
		else {
			curr.start = prev.end;
			curr.end = prev.end + curr.burst;
		}

	})

	var options = {
	    phases: [
	      { start: 0, end: burst_sum, indicatorsEvery: 1, share: 1 },
	    ],    
	    barHeight: 45,
	    fontSize: 16
	  };

  var data = [pList];


	console.log(data);

  var timeline = $('#timeline');
    timeline.show();
  timeline.simpleTimeline(options, data);    



}