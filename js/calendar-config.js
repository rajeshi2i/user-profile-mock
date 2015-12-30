var codropsEvents = {
	'12-23-2015' : {
		"status" : "p"
	},
	'12-24-2015' : {
		"status" : "cl"
	}
	},

	dropDownData = [
	{
		"key" : "p",
		"label" : "Present"
	},{
		"key" : "cl",
		"label" : "Casual Leave"
	},{
		"key" : "wfh",
		"label" : "Work from Home"
	},{
		"key" : "od",
		"label" : "On Duty"
	}]



	
$(function() {

	var transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		$wrapper = $( '#custom-inner' ),
		$calendar = $( '#calendar' ),
		cal = $calendar.calendario( {
			onDayClick : showDropdown,
			caldata : codropsEvents,
			displayWeekAbbr : true
		} ),
		$month = $( '#custom-month' ).html( cal.getMonthName() ),
		$year = $( '#custom-year' ).html( cal.getYear() );
		cal.setData(codropsEvents);
	$( '#custom-next' ).on( 'click', function() {
		cal.gotoNextMonth( updateMonthYear );
	} );
	$( '#custom-prev' ).on( 'click', function() {
		cal.gotoPreviousMonth( updateMonthYear );
	} );
	function updateMonthYear() {				
		$month.html( cal.getMonthName() );
		$year.html( cal.getYear() );
	}

	
	/**
	 * Shows dropdown for each day when clicking on it.
	 */
	function showDropdown( event, el, contentEl, fcDate ) {

		var	date = [fcDate.month,fcDate.day,fcDate.year].join("-"),
			dayProperty = cal.getData()[date] || {};


		/**
		 * Get template for dropdown 
		 */
		var getTemplate = function(dayProps){
			var elm = $($.parseHTML(["<div class=\"fc-popup\">",
									"<ul class=\"collection with-header\">",
									"<li class=\"collection-header\"><h5>"+fcDate.day+", "+fcDate.monthname+" "+fcDate.year+"</h5></li>",
								    "</ul>",
									"</div>"].join("")));

			for(var i=0;i<dropDownData.length;i++){

				if(dayProps.status && dayProps.status ==dropDownData[i].key ){
					elm.find('ul.collection').append("<li class=\"collection-item\" data-key=\""+dropDownData[i].key+"\">"+dropDownData[i].label+"<i class=\"mdi mdi-check\"</li>")
				}else{
					elm.find('ul.collection').append("<li class=\"collection-item\" data-key=\""+dropDownData[i].key+"\">"+dropDownData[i].label+"</li>");
				}
			}
			return elm;
		}	

		/**
		 * Compute positions for dropdown
		 */
		var computePosition = function(event, elm){
	        var css={},
	        	window = $(self);
	        
	        if(window.height() < (event.clientY+elm.height())){
	        	css.top = event.pageY - elm.height()+"px";
	        }else{
	        	 css.top = event.pageY+"px";
	        }

	        css.left = event.clientX+"px";
	        return css;
      	};

      	var dropdown = getTemplate(dayProperty);

      	
		$('body').append(dropdown);
		dropdown.css(computePosition(event, dropdown));
		dropdown.slideDown();

		/**
		 * Event for clicking item in dropdown and setting value in calendar date
		 */
		dropdown.find("li.collection-item").click(function(){
			var key = date,
				data = {};

			data[key] = {
				"status" : $(this).data().key
			};

			cal.setData(data);
			dropdown.remove();
		});
		
		/**
		 * Event for hiding dropdown
		 * Event Handler is mapped inside timeout to avoid hiding of dropdown
		 *   at the time of creation.
		 */
		setTimeout(function(){
			$(document).on("click", function(e){
				if (!dropdown.is(e.target) // if the target of the click isn't the container...
	            && dropdown.has(e.target).length === 0) {
					dropdown.remove();
					$(document).off("click");
	            }
			})
		},100);


		
	}

});
		